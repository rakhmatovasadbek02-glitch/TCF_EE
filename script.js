document.addEventListener("DOMContentLoaded", () => {

  let timeLeft = 3600;
  let timer;
  let isRunning = false;
  let questions = ["", "", ""];

  // ========================
  // LOAD QUESTION SETS
  // ========================
  async function loadQuestionSets() {
    try {
      const res = await fetch("/questions");
      const data = await res.json();
      const sets = data.sets || [];

      const select = document.getElementById("setSelect");
      select.innerHTML = '<option value="">— Choisir un sujet —</option>';
      sets.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s.id;
        opt.textContent = s.name;
        select.appendChild(opt);
      });

      select.addEventListener("change", () => {
        const chosen = sets.find(s => s.id === select.value);
        if (!chosen) return;
        questions = [chosen.tasks.task1, chosen.tasks.task2, chosen.tasks.task3];
        document.getElementById("questionText").textContent = questions[0];
        document.getElementById("setStatus").textContent = "✔ " + chosen.name;
      });

    } catch (err) {
      document.getElementById("setStatus").textContent = "⚠ Impossible de charger les sujets.";
    }
  }

  loadQuestionSets();

  // ========================
  // TIMER DISPLAY
  // ========================
  function updateDisplay() {
    let m = Math.floor(timeLeft / 60);
    let s = timeLeft % 60;
    const el = document.getElementById("timer");
    el.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
    // Warning color under 5 minutes
    if (timeLeft <= 300) el.classList.add("warning");
    else el.classList.remove("warning");
  }

  updateDisplay();

  // ========================
  // START TIMER
  // ========================
  window.startTimer = function () {
    if (isRunning) return;

    const select = document.getElementById("setSelect");
    if (!select.value) {
      select.style.outline = "2px solid #C9A84C";
      setTimeout(() => select.style.outline = "", 800);
      return;
    }

    isRunning = true;

    const areas = document.querySelectorAll("textarea");
    areas.forEach(a => a.disabled = true);

    const visible = document.querySelector(".task-area:not([style*='none']) textarea");
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
        alert("Le temps est écoulé !");
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
      const startBtn = document.querySelector(".btn--start");
      if (startBtn) {
        startBtn.style.transform = "scale(1.1)";
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
    const tabs = document.querySelectorAll(".task-tab");

    boxes.forEach(b => b.style.display = "none");
    boxes[num - 1].style.display = "flex";

    tabs.forEach(t => t.classList.remove("active"));
    tabs[num - 1].classList.add("active");

    document.getElementById("questionText").textContent = questions[num - 1];

    areas.forEach(a => a.disabled = true);
    areas[num - 1].disabled = false;
    areas[num - 1].focus();
  };

  // ========================
  // WORD COUNT
  // ========================
  function countWords(t) {
    const trimmed = t.trim();
    if (!trimmed) return "0 mot";
    const count = trimmed.split(/\s+/).length;
    return count === 1 ? "1 mot" : `${count} mots`;
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
      const startBtn = document.querySelector(".btn--start");
      if (startBtn) {
        startBtn.style.transform = "scale(1.1)";
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
      background: rgba(0,35,149,0.55); display: flex;
      align-items: center; justify-content: center; z-index: 999;
      backdrop-filter: blur(3px);
    `;

    modal.innerHTML = `
      <div style="
        background: white; color: #1a1a2e; padding: 36px 32px;
        border-radius: 8px; display: flex; flex-direction: column;
        gap: 14px; min-width: 320px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.25);
        border-top: 4px solid #002395;
      ">
        <div style="font-family:'Playfair Display',serif; font-size:18px; font-weight:700; color:#002395;">
          Identification du candidat
        </div>
        <div style="font-size:13px; color:#666; margin-top:-6px;">Entrez votre nom complet avant de soumettre.</div>
        <input id="studentNameInput" type="text" placeholder="Nom et prénom"
          style="padding: 10px 14px; border-radius: 4px; border: 1px solid #ccc;
                 font-size: 14px; font-family:'Source Sans 3',sans-serif; outline:none;" />
        <div style="display:flex; gap:10px; justify-content: flex-end; margin-top:4px;">
          <button id="cancelSubmit" style="padding: 8px 18px; border-radius:4px; border:1px solid #ddd;
            cursor:pointer; background:white; font-family:'Source Sans 3',sans-serif; font-size:13px;">
            Annuler
          </button>
          <button id="confirmSubmit" style="padding: 8px 20px; border-radius:4px; border:none;
            cursor:pointer; background:#C1272D; color:white; font-weight:600;
            font-family:'Source Sans 3',sans-serif; font-size:13px;">
            Soumettre
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    const input = document.getElementById("studentNameInput");
    input.focus();

    function submitModal() {
      const student = input.value.trim();
      if (!student) { input.style.borderColor = "#C1272D"; return; }

      const content = {
        task1: document.getElementById("task1").value,
        task2: document.getElementById("task2").value,
        task3: document.getElementById("task3").value
      };

      stopTimer();
      document.querySelectorAll("textarea").forEach(a => a.disabled = true);
      document.body.removeChild(modal);

      fetch("/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student, content })
      })
        .then(res => res.json())
        .then(() => alert("Copie soumise avec succès !"))
        .catch(() => alert("Erreur de soumission. Le serveur est-il en marche ?"));
    }

    document.getElementById("cancelSubmit").onclick = () => document.body.removeChild(modal);
    document.getElementById("confirmSubmit").onclick = submitModal;
    input.addEventListener("keydown", e => { if (e.key === "Enter") submitModal(); });
  };

});