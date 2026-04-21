// =======================
// TIMER SETUP (60 MIN)
// =======================
let timeLeft = 3600; // 60 minutes
let timer;

// Update timer display
function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  document.getElementById("timer").textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

// Run once on load
updateDisplay();

// =======================
// START TIMER
// =======================
function startTimer() {
  const areas = document.querySelectorAll("textarea");
  const startBtn = document.querySelector(".controls button");

  areas.forEach(area => {
    area.disabled = false;
  });

  areas[0].focus();
  startBtn.disabled = true;

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      areas.forEach(area => area.disabled = true);
      alert("Time is up!");
    }
  }, 1000);
}

// =======================
// SAVE WRITING (BACKEND)
// =======================
async function saveWriting() {
  const student = prompt("Enter your name:");

  const content = {
    task1: document.getElementById("task1").value,
    task2: document.getElementById("task2").value,
    task3: document.getElementById("task3").value
  };

  if (!content.task1 && !content.task2 && !content.task3) {
    alert("Nothing to save!");
    return;
  }

  try {
    await fetch("http://localhost:3000/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ student, content })
    });

    alert("Saved successfully!");
  } catch (err) {
    alert("Error saving data.");
    console.error(err);
  }
}

// =======================
// WORD COUNTER
// =======================
const areas = document.querySelectorAll("textarea");
const wordCountEl = document.getElementById("wordCount");

areas.forEach(area => {
  area.addEventListener("input", updateWordCount);
});

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

const task1 = document.getElementById("task1");
const task2 = document.getElementById("task2");
const task3 = document.getElementById("task3");

task1.addEventListener("input", () => {
  document.getElementById("count1").textContent =
    countWords(task1.value) + " words";
});

task2.addEventListener("input", () => {
  document.getElementById("count2").textContent =
    countWords(task2.value) + " words";
});

task3.addEventListener("input", () => {
  document.getElementById("count3").textContent =
    countWords(task3.value) + " words";
});
// =======================
// DARK MODE TOGGLE
// =======================
const toggleBtn = document.getElementById("themeToggle");

// Load saved theme or default
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);
updateButtonText(savedTheme);

if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");

    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");

    const newTheme = isDark ? "light" : "dark";
    localStorage.setItem("theme", newTheme);

    updateButtonText(newTheme);
  });
}

function updateButtonText(theme) {
  if (!toggleBtn) return;

  toggleBtn.textContent =
    theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
}

const tasks = document.querySelectorAll(".task");

tasks.forEach(task => {
  task.addEventListener("click", () => {
    tasks.forEach(t => t.classList.remove("active"));
    task.classList.add("active");

    // focus textarea inside clicked task
    const textarea = task.querySelector("textarea");
    textarea.focus();
  });
});