document.addEventListener("DOMContentLoaded", () => {

  let timeLeft = 3600;
  let timer;
  let isRunning = false;
  let questions = ["", "", ""];
  let warningShown30 = false;
  let warningShown10 = false;

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
  // TIMER DISPLAY
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

  // ========================
  // TIMED WARNING MODAL
  // ========================
  function showWarning(title, message, color) {
    if (document.getElementById("warningModal")) return;
    const modal = document.createElement("div");
    modal.id = "warningModal";
    modal.style.cssText = `
      position:fixed;inset:0;background:rgba(0,0,0,0.6);
      display:flex;align-items:center;justify-content:center;z-index:999;
      backdrop-filter:blur(4px);animation:fadeIn 0.2s ease;
    `;
    modal.innerHTML = `
      <style>@keyframes fadeIn{from{opacity:0}to{opacity:1}}</style>
      <div style="
        background:#4D6691;border:1px solid rgba(255,255,255,0.2);
        border-top:3px solid ${color};
        border-radius:12px;padding:32px 28px;max-width:340px;width:90%;
        text-align:center;
      ">
        <div style="font-size:32px;margin-bottom:14px;">${title.split(' ')[0]}</div>
        <div style="font-family:'DM Serif Display',serif;font-size:22px;font-weight:400;color:#fff;margin-bottom:10px;">${title.split(' ').slice(1).join(' ')}</div>
        <p style="font-size:13px;font-weight:300;color:rgba(255,255,255,0.75);line-height:1.6;margin-bottom:24px;">${message}</p>
        <button onclick="document.getElementById('warningModal').remove()" style="
          background:#ffffff;color:#42587D;border:none;border-radius:6px;
          padding:10px 28px;font-family:'DM Sans',sans-serif;
          font-size:13px;font-weight:600;cursor:pointer;
        ">Continuer</button>
      </div>
    `;
    document.body.appendChild(modal);
  }

  // ========================
  // START TIMER
  // ========================
  window.startTimer = function () {
    if (isRunning) return;

    const select = document.getElementById("setSelect");
    if (!select.value) {
      select.style.borderColor = "#ffffff";
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

      // 30 minute warning
      if (timeLeft === 1800 && !warningShown30) {
        warningShown30 = true;
        showWarning("⏱ 30 minutes restantes", "Vous avez utilisé la moitié du temps imparti. Pensez à vérifier vos réponses pour les tâches déjà rédigées.", "#9FADCB");
      }

      // 10 minute warning
      if (timeLeft === 600 && !warningShown10) {
        warningShown10 = true;
        showWarning("⚠ 10 minutes restantes", "Il ne vous reste plus que 10 minutes. Assurez-vous d'avoir répondu aux trois tâches.", "#f4a0a0");
      }

      if (timeLeft <= 0) {
        clearInterval(timer);
        isRunning = false;
        document.querySelectorAll("textarea").forEach(a => a.disabled = true);
        showWarning("⏰ Temps écoulé", "Votre temps est écoulé. Veuillez soumettre votre copie maintenant.", "#f4a0a0");
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
      const btn = document.querySelector(".btn-start");
      if (btn) { btn.style.transform = "scale(1.08)"; setTimeout(() => btn.style.transform = "", 180); }
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
        background:#4D6691;border:1px solid rgba(255,255,255,0.2);
        border-radius:10px;padding:32px 28px;
        display:flex;flex-direction:column;gap:14px;
        min-width:300px;max-width:90vw;
      ">
        <div style="font-size:10px;font-weight:600;letter-spacing:0.2em;color:rgba(255,255,255,0.5);">IDENTIFICATION</div>
        <div style="font-family:'DM Serif Display',serif;font-size:20px;color:#fff;">Entrez votre nom complet</div>
        <input id="studentNameInput" type="text" placeholder="Nom et prénom"
          style="background:#fff;color:#1a2a3a;border:1px solid #dde3ec;border-radius:6px;
                 padding:10px 14px;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;width:100%;" />
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:4px;">
          <button id="cancelSubmit" style="padding:8px 18px;border-radius:6px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:rgba(255,255,255,0.6);font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;">Annuler</button>
          <button id="confirmSubmit" style="padding:8px 20px;border-radius:6px;border:none;background:#fff;color:#42587D;font-weight:600;font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;">Soumettre</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    const input = document.getElementById("studentNameInput");
    input.focus();

    function submitModal() {
      const student = input.value.trim();
      if (!student) { input.style.borderColor = "#f4a0a0"; return; }

      const content = {
        task1: document.getElementById("task1").value,
        task2: document.getElementById("task2").value,
        task3: document.getElementById("task3").value
      };

      const currentTimeLeft = timeLeft;
      stopTimer();
      document.querySelectorAll("textarea").forEach(a => a.disabled = true);
      document.body.removeChild(modal);

      fetch("/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student, content })
      })
        .then(r => r.json())
        .then(() => {
          // Save result to sessionStorage and redirect to results page
          sessionStorage.setItem("tcf_result", JSON.stringify({ student, content, timeUsed: currentTimeLeft }));
          window.location.href = "/results.html";
        })
        .catch(() => alert("Erreur de soumission. Le serveur est-il en marche ?"));
    }

    document.getElementById("cancelSubmit").onclick = () => document.body.removeChild(modal);
    document.getElementById("confirmSubmit").onclick = submitModal;
    input.addEventListener("keydown", e => { if (e.key === "Enter") submitModal(); });
  };

});