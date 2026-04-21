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

function updateWordCount() {
  let totalText = "";

  areas.forEach(area => {
    totalText += area.value + " ";
  });

  const words = totalText.trim().split(/\s+/).filter(Boolean);
  wordCountEl.textContent = `${words.length} words (total)`;
}
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