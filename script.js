document.addEventListener("DOMContentLoaded", () => {

  let timeLeft = 3600;
  let timer;
  let isRunning = false;

  // QUESTIONS
  const questions = [
    "Tâche 1: Reply to an email and give advice.",
    "Tâche 2: Write an article about education.",
    "Tâche 3: Give your opinion on technology."
  ];

  document.getElementById("questionText").textContent = questions[0];

  // ========================
  // TIMER DISPLAY
  // ========================
  function updateDisplay() {
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    document.getElementById("timer").textContent =
      `${m}:${s < 10 ? "0" : ""}${s}`;
  }

  updateDisplay();

  // ========================
  // START TIMER
  // ========================
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
        isRunning = false;
        areas.forEach(a => a.disabled = true);
        alert("Time is up!");
      }
    }, 1000);
  };

  // ========================
  // STOP TIMER
  // ========================
  function stopTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  // ========================
  // TASK SWITCH
  // ========================
  window.selectTask = function (num) {
    if (!isRunning) {
      // Pulse the Start button as a hint instead of blocking with an alert
      const startBtn = document.querySelector(".controls button");
      if (startBtn) {
        startBtn.style.transform = "scale(1.15)";
        setTimeout(() => startBtn.style.transform = "scale(1)", 200);
      }
      return;
    }

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

  // ========================
  // WORD COUNT
  // ========================
  function countWords(t) {
    const trimmed = t.trim();
    if (!trimmed) return "0 words";
    const count = trimmed.split(/\s+/).length;
    return count === 1 ? "1 word" : `${count} words`;
  }

  ["1", "2", "3"].forEach(n => {
    const t = document.getElementById("task" + n);
    t.addEventListener("input", () => {
      document.getElementById("count" + n).textContent = countWords(t.value);
    });
  });

  // ========================
  // SAVE WRITING
  // ========================
  window.saveWriting = function () {
    if (!isRunning && timeLeft === 3600) {
      const startBtn = document.querySelector(".controls button");
      if (startBtn) {
        startBtn.style.transform = "scale(1.15)";
        setTimeout(() => startBtn.style.transform = "scale(1)", 200);
      }
      return;
    }

    const existing = document.getElementById("nameModal");
    if (existing) return;

    const modal = document.createElement("div");
    modal.id = "nameModal";
    modal.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0,0,0,0.5); display: flex;
      align-items: center; justify-content: center; z-index: 999;
    `;

    modal.innerHTML = `
      <div style="
        background: white; color: #333; padding: 30px; border-radius: 16px;
        display: flex; flex-direction: column; gap: 12px; min-width: 280px;
      ">
        <h3 style="margin:0">Enter your name</h3>
        <input id="studentNameInput" type="text" placeholder="Your full name"
          style="padding: 10px; border-radius: 8px; border: 1px solid #ccc; font-size: 15px;" />
        <div style="display:flex; gap:10px; justify-content: flex-end;">
          <button id="cancelSubmit" style="padding: 8px 16px; border-radius:8px; border:none; cursor:pointer; background:#eee;">Cancel</button>
          <button id="confirmSubmit" style="padding: 8px 16px; border-radius:8px; border:none; cursor:pointer; background:#764ba2; color:white; font-weight:600;">Submit</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const input = document.getElementById("studentNameInput");
    input.focus();

    function submitModal() {
      const student = input.value.trim();
      if (!student) {
        alert("Please enter your name.");
        return;
      }

      const content = {
        task1: document.getElementById("task1").value,
        task2: document.getElementById("task2").value,
        task3: document.getElementById("task3").value
      };

      stopTimer();
      document.querySelectorAll("textarea").forEach(a => a.disabled = true);
      document.body.removeChild(modal);

      fetch("http://localhost:3000/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student, content })
      })
        .then(res => res.json())
        .then(() => alert("Submitted successfully!"))
        .catch(() => alert("Error submitting. Is the server running?"));
    }

    document.getElementById("cancelSubmit").onclick = () => {
      document.body.removeChild(modal);
    };

    document.getElementById("confirmSubmit").onclick = submitModal;

    // FIX 5: Enter key triggers submit in the modal
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") submitModal();
    });
  };

  // ========================
  // THEME
  // ========================
  document.getElementById("lightMode").onclick = () => {
    document.body.className = "light";
  };

  document.getElementById("darkMode").onclick = () => {
    document.body.className = "dark";
  };

  // ========================
  // FULLSCREEN
  // ========================
  document.getElementById("fullscreenBtn").onclick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

});