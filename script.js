document.addEventListener("DOMContentLoaded", () => {

  // =======================
  // TIMER SETUP (60 MIN)
  // =======================
  let timeLeft = 3600;
  let timer;
  let isRunning = false;

  function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").textContent =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  updateDisplay();

  // =======================
  // START TIMER
  // =======================
  window.startTimer = function () {
    if (isRunning) return;
    isRunning = true;

    const areas = document.querySelectorAll("textarea");
    const startBtn = document.getElementById("startBtn");

    areas.forEach(area => area.disabled = false);

    areas[0].focus();
    if (startBtn) startBtn.disabled = true;

    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(timer);
        areas.forEach(area => area.disabled = true);
        alert("Time is up!");
      }
    }, 1000);
  };

  // =======================
  // SAVE WRITING
  // =======================
  window.saveWriting = async function () {
    const student = prompt("Enter your name:");

    if (!student) {
      alert("Name is required");
      return;
    }

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
  };

  // =======================
  // WORD COUNTS (PER TASK)
  // =======================
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
  // DARK MODE
  // =======================
  const toggleBtn = document.getElementById("themeToggle");

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

  // =======================
  // TASK SELECTION
  // =======================
  const tasks = document.querySelectorAll(".task");

  tasks.forEach(task => {
    task.addEventListener("click", () => {
      tasks.forEach(t => t.classList.remove("active"));
      task.classList.add("active");

      const textarea = task.querySelector("textarea");
      textarea.focus();
    });
  });

});