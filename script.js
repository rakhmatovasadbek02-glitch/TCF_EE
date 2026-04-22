document.addEventListener("DOMContentLoaded", () => {

  let timeLeft = 3600;
  let timer;
  let isRunning = false;
  let questions = ["", "", ""];
  let warningShown30 = false;
  let warningShown10 = false;

  // ── Apply translations ──────────────────────────────────
  function applyTranslations() {
    document.getElementById("pageTitle").textContent = t("exam_title");
    document.getElementById("t_brand_sub").textContent = t("nav_brand_sub");
    document.getElementById("t_timer_label").textContent = t("timer_label");
    document.getElementById("t_btn_start").textContent = t("btn_start");
    document.getElementById("t_btn_submit").textContent = t("btn_submit");
    document.getElementById("t_subject_label").textContent = t("subject_label");
    document.getElementById("t_task1").textContent = t("task1");
    document.getElementById("t_task2").textContent = t("task2");
    document.getElementById("t_task3").textContent = t("task3");
    document.getElementById("t_consigne_label").textContent = t("consigne_label");
    document.getElementById("questionText").textContent = t("consigne_default");
    document.querySelectorAll("textarea").forEach(ta => ta.placeholder = t("textarea_placeholder"));
    document.querySelectorAll(".wc").forEach(el => el.textContent = t("word_zero"));
    document.getElementById("setSelect").options[0].textContent = t("subject_placeholder");
    renderLangToggle("langToggle");
  }

  applyTranslations();

  // ── Load question sets ──────────────────────────────────
  async function loadQuestionSets() {
    try {
      const res = await fetch("/questions");
      const data = await res.json();
      const sets = data.sets || [];

      const select = document.getElementById("setSelect");
      // keep first placeholder option
      while (select.options.length > 1) select.remove(1);
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

    } catch {
      document.getElementById("setStatus").textContent = "⚠ " + t("gate_error_conn");
    }
  }

  loadQuestionSets();

  // ── Timer display ───────────────────────────────────────
  function updateDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    const el = document.getElementById("timer");
    el.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
    if (timeLeft <= 300) el.classList.add("warning");
    else el.classList.remove("warning");
  }

  updateDisplay();

  // ── Warning modal ───────────────────────────────────────
  function showWarning(titleKey, msgKey, color) {
    if (document.getElementById("warningModal")) return;
    const modal = document.createElement("div");
    modal.id = "warningModal";
    modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.6);display:flex;align-items:center;justify-content:center;z-index:999;backdrop-filter:blur(4px);`;
    modal.innerHTML = `
      <div style="background:#4D6691;border:1px solid rgba(255,255,255,0.2);border-top:3px solid ${color};border-radius:12px;padding:32px 28px;max-width:340px;width:90%;text-align:center;">
        <div style="font-family:'DM Serif Display',serif;font-size:22px;color:#fff;margin-bottom:10px;">${t(titleKey)}</div>
        <p style="font-size:13px;font-weight:300;color:rgba(255,255,255,0.75);line-height:1.6;margin-bottom:24px;">${t(msgKey)}</p>
        <button onclick="document.getElementById('warningModal').remove()" style="background:#fff;color:#42587D;border:none;border-radius:6px;padding:10px 28px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;">${t("warn_continue")}</button>
      </div>`;
    document.body.appendChild(modal);
  }

  // ── Start timer ─────────────────────────────────────────
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
      if (timeLeft === 1800 && !warningShown30) { warningShown30 = true; showWarning("warn30_title", "warn30_msg", "#9FADCB"); }
      if (timeLeft === 600  && !warningShown10) { warningShown10 = true; showWarning("warn10_title", "warn10_msg", "#f4a0a0"); }
      if (timeLeft <= 0) {
        clearInterval(timer); isRunning = false;
        document.querySelectorAll("textarea").forEach(a => a.disabled = true);
        showWarning("warn0_title", "warn0_msg", "#f4a0a0");
      }
    }, 1000);
  };

  function stopTimer() { clearInterval(timer); isRunning = false; }

  // ── Task switch ─────────────────────────────────────────
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
    boxes[num-1].style.display = "flex";
    tabs.forEach(t => t.classList.remove("active"));
    tabs[num-1].classList.add("active");
    document.getElementById("questionText").textContent = questions[num-1];
    areas.forEach(a => a.disabled = true);
    areas[num-1].disabled = false;
    areas[num-1].focus();
  };

  // ── Word count ──────────────────────────────────────────
  function countWords(text) {
    const trimmed = text.trim();
    if (!trimmed) return t("word_zero");
    const n = trimmed.split(/\s+/).length;
    if (n === 1) return t("word_one");
    return t("word_many").replace("{n}", n);
  }

  ["1","2","3"].forEach(n => {
    const ta = document.getElementById("task" + n);
    ta.addEventListener("input", () => {
      document.getElementById("count" + n).textContent = countWords(ta.value);
    });
  });

  // ── Submit ──────────────────────────────────────────────
  window.saveWriting = function () {
    if (!isRunning && timeLeft === 3600) {
      const btn = document.querySelector(".btn-start");
      if (btn) { btn.style.transform = "scale(1.08)"; setTimeout(() => btn.style.transform = "", 180); }
      return;
    }
    if (document.getElementById("nameModal")) return;

    const modal = document.createElement("div");
    modal.id = "nameModal";
    modal.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.75);display:flex;align-items:center;justify-content:center;z-index:999;backdrop-filter:blur(4px);`;
    modal.innerHTML = `
      <div style="background:#4D6691;border:1px solid rgba(255,255,255,0.2);border-radius:10px;padding:32px 28px;display:flex;flex-direction:column;gap:14px;min-width:300px;max-width:90vw;">
        <div style="font-size:10px;font-weight:600;letter-spacing:0.2em;color:rgba(255,255,255,0.5);">${t("modal_label")}</div>
        <div style="font-family:'DM Serif Display',serif;font-size:20px;color:#fff;">${t("modal_title")}</div>
        <input id="studentNameInput" type="text" placeholder="${t("modal_placeholder")}"
          style="background:#fff;color:#1a2a3a;border:1px solid #dde3ec;border-radius:6px;padding:10px 14px;font-size:14px;font-family:'DM Sans',sans-serif;outline:none;width:100%;" />
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:4px;">
          <button id="cancelSubmit" style="padding:8px 18px;border-radius:6px;border:1px solid rgba(255,255,255,0.2);background:transparent;color:rgba(255,255,255,0.6);font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;">${t("modal_cancel")}</button>
          <button id="confirmSubmit" style="padding:8px 20px;border-radius:6px;border:none;background:#fff;color:#42587D;font-weight:600;font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;">${t("modal_submit")}</button>
        </div>
      </div>`;

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
          sessionStorage.setItem("tcf_result", JSON.stringify({ student, content, timeUsed: currentTimeLeft }));
          window.location.href = "/results.html";
        })
        .catch(() => alert(t("submit_error")));
    }

    document.getElementById("cancelSubmit").onclick = () => document.body.removeChild(modal);
    document.getElementById("confirmSubmit").onclick = submitModal;
    input.addEventListener("keydown", e => { if (e.key === "Enter") submitModal(); });
  };

});