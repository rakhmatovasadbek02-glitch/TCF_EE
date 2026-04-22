document.addEventListener("DOMContentLoaded", () => {

  // =======================
  // TIMER SETUP (60 MIN)
  // =======================
  let timeLeft = 3600;
  let timer;
  window.isRunning = false;

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

    // Lock all textareas first
    areas.forEach(area => area.disabled = true);

    // Enable only active task
    const activeTask = document.querySelector(".task.active textarea");

    if (activeTask) {
      activeTask.disabled = false;
      activeTask.focus();
    }

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
// THEME ICON TOGGLE
// =======================
const lightBtn = document.getElementById("lightMode");
const darkBtn = document.getElementById("darkMode");

// load saved theme
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.add(savedTheme);

if (lightBtn && darkBtn) {

  lightBtn.addEventListener("click", () => {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
  });

  darkBtn.addEventListener("click", () => {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  });

}

  // =======================
  // TASK SELECTION (REAL SWITCHING)
  // =======================
  const tasks = document.querySelectorAll(".task");
  const textareas = document.querySelectorAll("textarea");

  tasks.forEach(task => {
    task.addEventListener("click", () => {

      // Remove active from all
      tasks.forEach(t => t.classList.remove("active"));

      // Lock all textareas
      textareas.forEach(area => {
        area.disabled = true;
      });

      // Activate clicked task
      task.classList.add("active");

      // Enable only its textarea
      const textarea = task.querySelector("textarea");
      textarea.disabled = false;
      textarea.focus();
    });
  });

});

// =======================
// TASK SWITCH (TABS)
// =======================
window.selectTask = function (num) {
  const boxes = [
    document.getElementById("taskBox1"),
    document.getElementById("taskBox2"),
    document.getElementById("taskBox3")
  ];

  const areas = [
    document.getElementById("task1"),
    document.getElementById("task2"),
    document.getElementById("task3")
  ];

  // Hide all
  boxes.forEach(box => box.style.display = "none");

  // Show selected
  boxes[num - 1].style.display = "block";

  // Disable all textareas
  areas.forEach(a => a.disabled = true);

  // Enable selected ONLY if timer started
  if (isRunning) {
    areas[num - 1].disabled = false;
    areas[num - 1].focus();
  }
};