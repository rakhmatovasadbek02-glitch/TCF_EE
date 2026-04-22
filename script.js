document.addEventListener("DOMContentLoaded", () => {

  let timeLeft = 3600;
  let timer;
  window.isRunning = false;

  // QUESTIONS
  const questions = [
    "Tâche 1: Reply to an email and give advice.",
    "Tâche 2: Write an article about education.",
    "Tâche 3: Give your opinion on technology."
  ];

  document.getElementById("questionText").textContent = questions[0];

  function updateDisplay() {
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;

    document.getElementById("timer").textContent =
      `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  updateDisplay();

  // START TIMER
  window.startTimer = function () {
    if (isRunning) return;
    isRunning = true;

    const areas = document.querySelectorAll("textarea");
    areas.forEach(a => a.disabled = true);

    const visible = document.querySelector(".task:not([style*='none']) textarea");

    if (visible) {
      visible.disabled = false;
      visible.focus();
    }

    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();

      if (timeLeft <= 0) {
        clearInterval(timer);
        areas.forEach(a => a.disabled = true);
        alert("Time is up!");
      }
    }, 1000);
  };

  // TASK SWITCH
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

    boxes.forEach(b => b.style.display = "none");
    boxes[num - 1].style.display = "block";

    buttons.forEach(b => b.classList.remove("active"));
    buttons[num - 1].classList.add("active");

    document.getElementById("questionText").textContent = questions[num - 1];

    areas.forEach(a => a.disabled = true);

    if (isRunning) {
      areas[num - 1].disabled = false;
      areas[num - 1].focus();
    }
  };

  // WORD COUNT
  function countWords(t) {
    return t.trim().split(/\s+/).filter(Boolean).length;
  }

  ["1","2","3"].forEach(n => {
    const t = document.getElementById("task"+n);
    t.addEventListener("input", () => {
      document.getElementById("count"+n).textContent =
        countWords(t.value) + " words";
    });
  });

  // THEME
  document.getElementById("lightMode").onclick = () => {
    document.body.className = "light";
  };

  document.getElementById("darkMode").onclick = () => {
    document.body.className = "dark";
  };

  // FULLSCREEN
  document.getElementById("fullscreenBtn").onclick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

});