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
        document.getElementById("setStatus").textContent = "✓ " + chosen.name;
      });

    } catch (err) {
      document.getElementById("setStatus").textContent = "⚠ Impossible de charger les sujets.";
    }
  }

  loadQuestionSets();

  // ========================
  // TIMER
  // ========================
  function updateDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    const el = document.getElementById("timer");
    el.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
    if (timeLeft <= 300) el.classList.add("warning");
    else el.classList.remove("warning");
  }

  updateDisplay();

  window.startTimer = function () {
    if (isRunning) return;

    const select = document.getElementById("setSelect");
    if (!select.value) {
      select.style.borderColor = "#f0f0f0";
      setTimeout(() => select.style.borderColor = "", 800);
      return;
    }

    isRunning = true;
    document.querySelectorAll("textarea").forEach(a => a.disabled = true);

    const visible = document.querySelector(".task-area:not([style*='none']) textarea");
    if (visible) { visible.disabled = false; visible.focus(); }

    timer = setInterval(() => {
      timeLeft--;
      updateDisplay();
      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        document.querySelectorAll("textarea").forEach(a => a.disabled = true);
        alert("Le temps est écoulé !");
      }
    }, 1000);
  };

  function stopTimer() {
    clearInterval(timer);
    isRunning = false;
  }

  // ========================
  // TASK SWITCH
  // ========================
  window.selectTask = function (num) {
    if (!isRunning) {
      const btn = document.querySelector(".btn-start");
      if (btn) {
        btn.style.transform = "scale(1.08)";
        setTimeout(() => btn.style.transform = "", 180);
      }
      return;
    }

    const boxes = ["taskBox1","taskBox2","taskBox3"].map(id => document.getElementById(id));
    const areas = ["task1","task2","task3"].map(id => document.getElementById(id));
    const tabs  = document.querySelectorAll(".task-btn");

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
    const n = trimmed.split(/\s+/).length;
    return n === 1 ? "1 mot" : `${n} mots`;
  }

  ["1","2","3"].forEach(n => {
    const t = document.getElementById("task" + n);
    t.addEventListener("input", () => {
      document.getElementById("count" + n).textContent = countWords(t.value);
    });
  });

  // ========================
  // SUBMIT
  // ========================
  window.saveWriting = function () {
    if (!isRunning && timeLeft === 3600) {
      const btn = document.querySelector(".btn-start");
      if (btn) { btn.style.transform = "scale(1.08)"; setTimeout(() => btn.style.transform = "", 180); }
      return;
    }

    if (document.getElementById("nameModal")) return;

    const modal = document.createElement("div");
    modal.id = "nameModal";
    modal.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.75);
      display:flex;align-items:center;justify-content:center;z-index:999;
      backdrop-filter:blur(4px);
    `;

    modal.innerHTML = `
      <div style="
        background:#141414;border:1px solid #2a2a2a;
        border-radius:8px;padding:32px 28px;
        display:flex;flex-direction:column;gap:16px;
        min-width:300px;max-width:90vw;
      ">
        <div style="font-family:'DM Mono',monospace;font-size:11px;letter-spacing:0.2em;color:#555;">IDENTIFICATION</div>
        <div style="font-size:16px;font-weight:400;color:#e8e8e8;">Entrez votre nom complet</div>
        <input id="studentNameInput" type="text" placeholder="Nom et prénom"
          style="background:#1a1a1a;border:1px solid #2a2a2a;border-radius:4px;
                 padding:10px 14px;color:#e8e8e8;font-size:14px;
                 font-family:'DM Sans',sans-serif;outline:none;width:100%;" />
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:4px;">
          <button id="cancelSubmit" style="padding:8px 18px;border-radius:4px;
            border:1px solid #2a2a2a;background:transparent;color:#666;
            font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;">
            Annuler
          </button>
          <button id="confirmSubmit" style="padding:8px 20px;border-radius:4px;
            border:none;background:#f0f0f0;color:#0d0d0d;font-weight:600;
            font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;">
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
      if (!student) { input.style.borderColor = "#f87171"; return; }

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
        .then(r => r.json())
        .then(() => alert("Copie soumise avec succès !"))
        .catch(() => alert("Erreur de soumission. Le serveur est-il en marche ?"));
    }

    document.getElementById("cancelSubmit").onclick = () => document.body.removeChild(modal);
    document.getElementById("confirmSubmit").onclick = submitModal;
    input.addEventListener("keydown", e => { if (e.key === "Enter") submitModal(); });
  };

});