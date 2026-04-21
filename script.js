let timeLeft = 600; // 10 minutes in seconds
let timer;

function startTimer() {
  document.getElementById("writingArea").disabled = false;

  timer = setInterval(() => {
    timeLeft--;

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("writingArea").disabled = true;
      alert("Time is up!");
    }
  }, 1000);
}
async function saveWriting() {
  const content = document.getElementById("writingArea").value;
  const student = prompt("Enter your name:");

  await fetch("http://localhost:3000/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ student, content })
  });

  alert("Saved!");
}
function startTimer() {
  document.querySelector("button").disabled = true;
  document.getElementById("writingArea").disabled = false;

  timer = setInterval(() => {
    timeLeft--;

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("writingArea").disabled = true;
      alert("Time is up!");
    }
  }, 1000);
}
document.getElementById("writingArea").focus();

const textarea = document.getElementById("writingArea");

textarea.addEventListener("input", () => {
  const words = textarea.value.trim().split(/\s+/).filter(Boolean);
  document.getElementById("wordCount").textContent =
    `${words.length} words`;
});

const toggleBtn = document.getElementById("themeToggle");

// load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);
updateButtonText(savedTheme);

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");

  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");

  const newTheme = isDark ? "light" : "dark";
  localStorage.setItem("theme", newTheme);

  updateButtonText(newTheme);
});

function updateButtonText(theme) {
  toggleBtn.textContent =
    theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode";
}

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (!localStorage.getItem("theme")) {
  const defaultTheme = prefersDark ? "dark" : "light";
  document.body.classList.add(defaultTheme);
}