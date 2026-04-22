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

    // Lock all first
    areas.forEach(area => area.disabled = true);

    // Enable current visible task
    const visibleBox = document.querySelector(".task:not([style*='display: none']) textarea");

    if (visibleBox) {
      visibleBox.disabled = false;
      visibleBox.focus();
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
  // WORD COUNT
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
  // THEME TOGGLE (SUN/MOON)
  // =======================
  const lightBtn = document.getElementById("lightMode");
  const darkBtn = document.getElementById("darkMode");

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

    const buttons = document.querySelectorAll(".task-buttons button");

    // Hide all
    boxes.forEach(box => box.style.display = "none");

    // Show selected
    boxes[num - 1].style.display = "block";

    // Update question
 document.getElementById("questionText").textContent = questions[num - 1];   document.getElementById("questionText").textContent = questions[num - 1];

    // Button highlight
    buttons.forEach(b => b.classList.remove("active"));
    buttons[num - 1].classList.add("active");

    // Disable all
    areas.forEach(a => a.disabled = true);

    // Enable if timer started
    if (isRunning) {
      areas[num - 1].disabled = false;
      areas[num - 1].focus();
    }
  };

  // =======================
  // FULLSCREEN
  // =======================
  const fullscreenBtn = document.getElementById("fullscreenBtn");

  if (fullscreenBtn) {
    fullscreenBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  }

  document.addEventListener("fullscreenchange", () => {
    if (!fullscreenBtn) return;

    if (document.fullscreenElement) {
      fullscreenBtn.textContent = "⤫";
    } else {
      fullscreenBtn.textContent = "⛶";
    }
  });

});

// =======================
// QUESTIONS PER TASK
// =======================
const questions = [
  "Tâche 1: You received an email from a friend. Reply and give advice.",
  "Tâche 2: Write an article about the importance of education.",
  "Tâche 3: Express your opinion on technology in modern life."
];
