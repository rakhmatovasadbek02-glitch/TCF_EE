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
  const writingArea = document.getElementById("writingArea");
  const startBtn = document.querySelector(".controls button");

  writingArea.disabled = false;
  writingArea.focus();
  startBtn.disabled = true;

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      writingArea.disabled = true;
      alert("Time is up!");
    }
  }, 1000);
}

// =======================
// SAVE WRITING (BACKEND)
// =======================
async function saveWriting() {
  const content = document.getElementById("writingArea").value;
  const student = prompt("Enter your name:");

  if (!content.trim()) {
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
const textarea = document.getElementById("writingArea");
const wordCountEl = document.getElementById("wordCount");

if (textarea && wordCountEl) {
  textarea.addEventListener("input", () => {
    const words = textarea.value.trim().split(/\s+/).filter(Boolean);
    wordCountEl.textContent = `${words.length} words`;
  });
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