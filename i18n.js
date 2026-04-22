const LANGS = {
  fr: {
    // NAV
    nav_brand_sub: "Expression Écrite",
    nav_dashboard: "Dashboard",
    nav_admin: "Admin",
    nav_exam: "Examen",

    // GATE
    gate_title: "Accès à l'examen",
    gate_sub: "Entrez le code d'accès fourni par votre enseignant.",
    gate_placeholder: "Code d'accès",
    gate_btn: "Accéder",
    gate_verifying: "Vérification…",
    gate_error_empty: "Veuillez entrer un code.",
    gate_error_wrong: "Code incorrect. Réessayez.",
    gate_error_conn: "Erreur de connexion. Réessayez.",

    // LANDING
    hero_badge: "Simulateur officiel",
    hero_title_1: "Préparez votre",
    hero_title_2: "TCF Canada",
    hero_sub: "Entraînez-vous aux trois tâches d'expression écrite dans des conditions réelles d'examen — minuterie, interface épurée, soumission en un clic.",
    hero_cta: "Commencer l'examen",
    feat_label: "Pourquoi ce simulateur",
    feat_title: "Tout ce qu'il vous faut pour réussir",
    feat1_title: "Minuterie réelle", feat1_desc: "60 minutes chronométrées comme lors du vrai examen. Alerte visuelle dans les 5 dernières minutes.",
    feat2_title: "Sujets variés", feat2_desc: "Plusieurs séries de sujets couvrant différents thèmes — vie quotidienne, éducation, environnement et plus.",
    feat3_title: "Soumission directe", feat3_desc: "Vos réponses sont envoyées directement à votre enseignant à la fin de l'examen.",
    feat4_title: "Tous appareils", feat4_desc: "Interface optimisée pour ordinateur, tablette et mobile.",
    feat5_title: "Compteur de mots", feat5_desc: "Suivez en temps réel le nombre de mots rédigés.",
    feat6_title: "Sans distraction", feat6_desc: "Un environnement sobre conçu pour vous laisser vous focaliser sur l'écriture.",
    tasks_label: "Structure de l'examen",
    tasks_title: "Trois tâches d'écriture",
    task1_name: "Tâche 1 — Message personnel", task1_desc: "Répondez à un message ou un courriel en donnant des informations, des conseils ou des opinions personnelles.",
    task2_name: "Tâche 2 — Article ou texte formel", task2_desc: "Rédigez un article ou un texte argumentatif sur un sujet donné (150–200 mots).",
    task3_name: "Tâche 3 — Expression d'opinion", task3_desc: "Exprimez et justifiez votre point de vue sur une question de société.",
    cta_title: "Prêt à vous entraîner ?",
    cta_sub: "Choisissez un sujet et commencez votre simulation dès maintenant.",
    cta_btn: "Accéder à l'examen",

    // EXAM
    exam_title: "TCF — Expression Écrite",
    timer_label: "TEMPS RESTANT",
    subject_label: "SUJET",
    subject_placeholder: "— Choisir un sujet —",
    btn_start: "Commencer",
    btn_submit: "Soumettre",
    task1: "Tâche 1", task2: "Tâche 2", task3: "Tâche 3",
    consigne_label: "CONSIGNE",
    consigne_default: "Sélectionnez un sujet pour commencer.",
    textarea_placeholder: "Rédigez votre réponse…",
    word_zero: "0 mot",
    word_one: "1 mot",
    word_many: "{n} mots",

    // WARNINGS
    warn30_title: "⏱ 30 minutes restantes",
    warn30_msg: "Vous avez utilisé la moitié du temps imparti. Pensez à vérifier vos réponses.",
    warn10_title: "⚠ 10 minutes restantes",
    warn10_msg: "Il ne vous reste plus que 10 minutes. Assurez-vous d'avoir répondu aux trois tâches.",
    warn0_title: "⏰ Temps écoulé",
    warn0_msg: "Votre temps est écoulé. Veuillez soumettre votre copie maintenant.",
    warn_continue: "Continuer",

    // MODAL
    modal_label: "IDENTIFICATION",
    modal_title: "Entrez votre nom complet",
    modal_placeholder: "Nom et prénom",
    modal_cancel: "Annuler",
    modal_submit: "Soumettre",
    modal_error_name: "Veuillez entrer votre nom.",
    submit_error: "Erreur de soumission. Le serveur est-il en marche ?",

    // RESULTS
    results_sub_title: "Résultats",
    results_success: "Copie soumise !",
    results_sub: "Bravo {name} — votre copie a été transmise à votre enseignant.",
    results_total_words: "Mots au total",
    results_tasks: "Tâches rédigées",
    results_time: "Temps utilisé",
    results_back: "Retour à l'accueil",
    results_new: "Nouvel examen",
    results_no_answer: "Aucune réponse rédigée.",
  },

  en: {
    nav_brand_sub: "Written Expression",
    nav_dashboard: "Dashboard",
    nav_admin: "Admin",
    nav_exam: "Exam",
    gate_title: "Exam Access",
    gate_sub: "Enter the access code provided by your teacher.",
    gate_placeholder: "Access code",
    gate_btn: "Enter",
    gate_verifying: "Verifying…",
    gate_error_empty: "Please enter a code.",
    gate_error_wrong: "Incorrect code. Please try again.",
    gate_error_conn: "Connection error. Please try again.",
    hero_badge: "Official Simulator",
    hero_title_1: "Prepare for your",
    hero_title_2: "TCF Canada",
    hero_sub: "Practice all three written expression tasks under real exam conditions — timer, distraction-free interface, one-click submission.",
    hero_cta: "Start the exam",
    feat_label: "Why this simulator",
    feat_title: "Everything you need to succeed",
    feat1_title: "Real timer", feat1_desc: "60 minutes timed just like the real exam. Visual warning in the last 5 minutes.",
    feat2_title: "Varied topics", feat2_desc: "Multiple topic sets covering different themes — daily life, education, environment and more.",
    feat3_title: "Direct submission", feat3_desc: "Your answers are sent directly to your teacher at the end of the exam.",
    feat4_title: "All devices", feat4_desc: "Optimised for desktop, tablet and mobile.",
    feat5_title: "Word counter", feat5_desc: "Track your word count in real time.",
    feat6_title: "Distraction-free", feat6_desc: "A clean environment designed to keep you focused on writing.",
    tasks_label: "Exam structure",
    tasks_title: "Three writing tasks",
    task1_name: "Task 1 — Personal message", task1_desc: "Reply to a message or email giving information, advice or personal opinions.",
    task2_name: "Task 2 — Formal text", task2_desc: "Write an article or argumentative text on a given topic (150–200 words).",
    task3_name: "Task 3 — Opinion", task3_desc: "Express and justify your point of view on a social issue.",
    cta_title: "Ready to practise?",
    cta_sub: "Choose a topic set and start your simulation now.",
    cta_btn: "Go to exam",
    exam_title: "TCF — Written Expression",
    timer_label: "TIME REMAINING",
    subject_label: "TOPIC",
    subject_placeholder: "— Choose a topic set —",
    btn_start: "Start",
    btn_submit: "Submit",
    task1: "Task 1", task2: "Task 2", task3: "Task 3",
    consigne_label: "INSTRUCTIONS",
    consigne_default: "Select a topic set to begin.",
    textarea_placeholder: "Write your answer here…",
    word_zero: "0 words",
    word_one: "1 word",
    word_many: "{n} words",
    warn30_title: "⏱ 30 minutes remaining",
    warn30_msg: "You have used half the allotted time. Consider reviewing your completed tasks.",
    warn10_title: "⚠ 10 minutes remaining",
    warn10_msg: "Only 10 minutes left. Make sure you have answered all three tasks.",
    warn0_title: "⏰ Time is up",
    warn0_msg: "Your time is up. Please submit your paper now.",
    warn_continue: "Continue",
    modal_label: "IDENTIFICATION",
    modal_title: "Enter your full name",
    modal_placeholder: "First and last name",
    modal_cancel: "Cancel",
    modal_submit: "Submit",
    modal_error_name: "Please enter your name.",
    submit_error: "Submission error. Is the server running?",
    results_sub_title: "Results",
    results_success: "Paper submitted!",
    results_sub: "Well done {name} — your paper has been sent to your teacher.",
    results_total_words: "Total words",
    results_tasks: "Tasks completed",
    results_time: "Time used",
    results_back: "Back to home",
    results_new: "New exam",
    results_no_answer: "No answer provided.",
  },

  ru: {
    nav_brand_sub: "Письменное выражение",
    nav_dashboard: "Панель",
    nav_admin: "Админ",
    nav_exam: "Экзамен",
    gate_title: "Доступ к экзамену",
    gate_sub: "Введите код доступа, выданный вашим преподавателем.",
    gate_placeholder: "Код доступа",
    gate_btn: "Войти",
    gate_verifying: "Проверка…",
    gate_error_empty: "Пожалуйста, введите код.",
    gate_error_wrong: "Неверный код. Попробуйте снова.",
    gate_error_conn: "Ошибка подключения. Попробуйте снова.",
    hero_badge: "Официальный симулятор",
    hero_title_1: "Подготовьтесь к",
    hero_title_2: "TCF Canada",
    hero_sub: "Тренируйтесь по всем трём заданиям письменного выражения в реальных условиях экзамена — таймер, чистый интерфейс, отправка в один клик.",
    hero_cta: "Начать экзамен",
    feat_label: "Почему этот симулятор",
    feat_title: "Всё что нужно для успеха",
    feat1_title: "Настоящий таймер", feat1_desc: "60 минут, как на реальном экзамене. Визуальное предупреждение в последние 5 минут.",
    feat2_title: "Разные темы", feat2_desc: "Несколько наборов тем — повседневная жизнь, образование, окружающая среда и другие.",
    feat3_title: "Прямая отправка", feat3_desc: "Ваши ответы отправляются преподавателю сразу после завершения экзамена.",
    feat4_title: "Все устройства", feat4_desc: "Оптимизировано для компьютера, планшета и мобильного.",
    feat5_title: "Счётчик слов", feat5_desc: "Отслеживайте количество слов в реальном времени.",
    feat6_title: "Без отвлечений", feat6_desc: "Чистый интерфейс, созданный для концентрации на письме.",
    tasks_label: "Структура экзамена",
    tasks_title: "Три письменных задания",
    task1_name: "Задание 1 — Личное сообщение", task1_desc: "Ответьте на сообщение или письмо, дав информацию, советы или личное мнение.",
    task2_name: "Задание 2 — Официальный текст", task2_desc: "Напишите статью или аргументированный текст на заданную тему (150–200 слов).",
    task3_name: "Задание 3 — Выражение мнения", task3_desc: "Выразите и обоснуйте свою точку зрения по общественному вопросу.",
    cta_title: "Готовы тренироваться?",
    cta_sub: "Выберите тему и начните симуляцию прямо сейчас.",
    cta_btn: "Перейти к экзамену",
    exam_title: "TCF — Письменное выражение",
    timer_label: "ОСТАЛОСЬ ВРЕМЕНИ",
    subject_label: "ТЕМА",
    subject_placeholder: "— Выберите набор тем —",
    btn_start: "Начать",
    btn_submit: "Отправить",
    task1: "Задание 1", task2: "Задание 2", task3: "Задание 3",
    consigne_label: "ИНСТРУКЦИЯ",
    consigne_default: "Выберите набор тем для начала.",
    textarea_placeholder: "Напишите ваш ответ здесь…",
    word_zero: "0 слов",
    word_one: "1 слово",
    word_many: "{n} слов",
    warn30_title: "⏱ Осталось 30 минут",
    warn30_msg: "Вы использовали половину отведённого времени. Проверьте уже выполненные задания.",
    warn10_title: "⚠ Осталось 10 минут",
    warn10_msg: "Осталось всего 10 минут. Убедитесь, что вы ответили на все три задания.",
    warn0_title: "⏰ Время истекло",
    warn0_msg: "Ваше время истекло. Пожалуйста, отправьте работу сейчас.",
    warn_continue: "Продолжить",
    modal_label: "ИДЕНТИФИКАЦИЯ",
    modal_title: "Введите ваше полное имя",
    modal_placeholder: "Имя и фамилия",
    modal_cancel: "Отмена",
    modal_submit: "Отправить",
    modal_error_name: "Пожалуйста, введите ваше имя.",
    submit_error: "Ошибка отправки. Сервер запущен?",
    results_sub_title: "Результаты",
    results_success: "Работа отправлена!",
    results_sub: "Отлично, {name} — ваша работа передана преподавателю.",
    results_total_words: "Всего слов",
    results_tasks: "Выполнено заданий",
    results_time: "Использовано времени",
    results_back: "На главную",
    results_new: "Новый экзамен",
    results_no_answer: "Ответ не предоставлен.",
  },

  uz: {
    nav_brand_sub: "Yozma Ifoda",
    nav_dashboard: "Panel",
    nav_admin: "Admin",
    nav_exam: "Imtihon",
    gate_title: "Imtihonga kirish",
    gate_sub: "O'qituvchingiz bergan kirish kodini kiriting.",
    gate_placeholder: "Kirish kodi",
    gate_btn: "Kirish",
    gate_verifying: "Tekshirilmoqda…",
    gate_error_empty: "Iltimos, kodni kiriting.",
    gate_error_wrong: "Noto'g'ri kod. Qayta urinib ko'ring.",
    gate_error_conn: "Ulanish xatosi. Qayta urinib ko'ring.",
    hero_badge: "Rasmiy simulyator",
    hero_title_1: "Tayyorlaning",
    hero_title_2: "TCF Canada",
    hero_sub: "Uchta yozma ifoda topshirig'ini haqiqiy imtihon sharoitida mashq qiling — taymer, sof interfeys, bir bosish bilan topshirish.",
    hero_cta: "Imtihonni boshlash",
    feat_label: "Nega bu simulyator",
    feat_title: "Muvaffaqiyat uchun kerak bo'lgan hamma narsa",
    feat1_title: "Haqiqiy taymer", feat1_desc: "Haqiqiy imtihondek 60 daqiqa. Oxirgi 5 daqiqada vizual ogohlantirish.",
    feat2_title: "Turli mavzular", feat2_desc: "Kundalik hayot, ta'lim, atrof-muhit va boshqa mavzular bo'yicha bir nechta to'plam.",
    feat3_title: "To'g'ridan-to'g'ri topshirish", feat3_desc: "Javoblaringiz imtihon tugagandan so'ng o'qituvchingizga yuboriladi.",
    feat4_title: "Barcha qurilmalar", feat4_desc: "Kompyuter, planshet va mobil uchun optimallashtirilgan.",
    feat5_title: "So'z hisoblagich", feat5_desc: "Yozilgan so'zlar sonini real vaqtda kuzating.",
    feat6_title: "Chalg'itmasdan", feat6_desc: "Yozishga to'liq e'tibor qaratish uchun yaratilgan toza interfeys.",
    tasks_label: "Imtihon tuzilishi",
    tasks_title: "Uchta yozma topshiriq",
    task1_name: "1-topshiriq — Shaxsiy xabar", task1_desc: "Xabar yoki elektron pochta xatiga ma'lumot, maslahat yoki shaxsiy fikr bildiring.",
    task2_name: "2-topshiriq — Rasmiy matn", task2_desc: "Berilgan mavzu bo'yicha maqola yoki argumentli matn yozing (150–200 so'z).",
    task3_name: "3-topshiriq — Fikr bildirish", task3_desc: "Ijtimoiy masala bo'yicha o'z nuqtai nazaringizni bildiring va asoslang.",
    cta_title: "Mashq qilishga tayyormisiz?",
    cta_sub: "Mavzu tanlang va simulyatsiyani hoziroq boshlang.",
    cta_btn: "Imtihonga o'tish",
    exam_title: "TCF — Yozma Ifoda",
    timer_label: "QOLGAN VAQT",
    subject_label: "MAVZU",
    subject_placeholder: "— Mavzu to'plamini tanlang —",
    btn_start: "Boshlash",
    btn_submit: "Topshirish",
    task1: "1-topshiriq", task2: "2-topshiriq", task3: "3-topshiriq",
    consigne_label: "KO'RSATMA",
    consigne_default: "Boshlash uchun mavzu tanlang.",
    textarea_placeholder: "Javobingizni shu yerga yozing…",
    word_zero: "0 so'z",
    word_one: "1 so'z",
    word_many: "{n} so'z",
    warn30_title: "⏱ 30 daqiqa qoldi",
    warn30_msg: "Ajratilgan vaqtning yarmini sarfladingiz. Bajarilgan topshiriqlarni tekshiring.",
    warn10_title: "⚠ 10 daqiqa qoldi",
    warn10_msg: "Atigi 10 daqiqa qoldi. Uchala topshiriqqa ham javob berganingizni tekshiring.",
    warn0_title: "⏰ Vaqt tugadi",
    warn0_msg: "Vaqtingiz tugadi. Iltimos, ishingizni hozir topshiring.",
    warn_continue: "Davom etish",
    modal_label: "IDENTIFIKATSIYA",
    modal_title: "To'liq ismingizni kiriting",
    modal_placeholder: "Ism va familiya",
    modal_cancel: "Bekor qilish",
    modal_submit: "Topshirish",
    modal_error_name: "Iltimos, ismingizni kiriting.",
    submit_error: "Topshirishda xato. Server ishlaydimi?",
    results_sub_title: "Natijalar",
    results_success: "Ish topshirildi!",
    results_sub: "Barakalla {name} — ishingiz o'qituvchingizga yuborildi.",
    results_total_words: "Jami so'zlar",
    results_tasks: "Bajarilgan topshiriqlar",
    results_time: "Sarflangan vaqt",
    results_back: "Bosh sahifaga",
    results_new: "Yangi imtihon",
    results_no_answer: "Javob berilmagan.",
  }
};

function getLang() {
  return localStorage.getItem("tcf_lang") || "fr";
}

function setLang(lang) {
  localStorage.setItem("tcf_lang", lang);
}

function t(key) {
  const lang = getLang();
  return (LANGS[lang] && LANGS[lang][key]) || (LANGS["fr"] && LANGS["fr"][key]) || key;
}

// Render language toggle buttons — call this on every page
const LANG_FLAGS = {
  fr: { flag: "🇫🇷", name: "Français" },
  en: { flag: "🇬🇧", name: "English" },
  ru: { flag: "🇷🇺", name: "Русский" },
  uz: { flag: "🇺🇿", name: "O'zbek" },
};

function renderLangToggle(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Inject styles once
  if (!document.getElementById("langDropdownStyle")) {
    const style = document.createElement("style");
    style.id = "langDropdownStyle";
    style.textContent = `
      .lang-dropdown { position: relative; display: inline-block; }
      .lang-current {
        display: flex; align-items: center; gap: 6px;
        background: rgba(255,255,255,0.12);
        border: 1px solid rgba(255,255,255,0.25);
        border-radius: 6px; padding: 5px 10px;
        cursor: pointer; font-family: inherit;
        font-size: 18px; line-height: 1;
        transition: background 0.15s;
        user-select: none;
      }
      .lang-current:hover { background: rgba(255,255,255,0.22); }
      .lang-current .lang-chevron {
        font-size: 9px; color: rgba(255,255,255,0.6);
        transition: transform 0.2s;
        margin-left: 2px;
      }
      .lang-current.open .lang-chevron { transform: rotate(180deg); }
      .lang-menu {
        display: none;
        position: absolute; top: calc(100% + 6px); right: 0;
        background: #4D6691;
        border: 1px solid rgba(255,255,255,0.2);
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        z-index: 1000;
        min-width: 140px;
        animation: dropIn 0.15s ease;
      }
      .lang-menu.open { display: block; }
      @keyframes dropIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
      .lang-option {
        display: flex; align-items: center; gap: 10px;
        padding: 10px 14px;
        cursor: pointer;
        font-size: 13px; font-weight: 400;
        color: rgba(255,255,255,0.85);
        font-family: inherit;
        background: none; border: none; width: 100%; text-align: left;
        transition: background 0.12s;
      }
      .lang-option:hover { background: rgba(255,255,255,0.1); color: #fff; }
      .lang-option.active { color: #fff; font-weight: 600; background: rgba(255,255,255,0.08); }
      .lang-option .lang-flag { font-size: 20px; line-height: 1; }
    `;
    document.head.appendChild(style);
  }

  const current = getLang();
  const currentFlag = LANG_FLAGS[current].flag;
  const id = "langDrop_" + containerId;

  container.innerHTML = `
    <div class="lang-dropdown" id="${id}">
      <button class="lang-current" onclick="toggleLangMenu('${id}')" id="${id}_btn">
        <span style="font-size:20px;line-height:1">${currentFlag}</span>
        <span class="lang-chevron">▼</span>
      </button>
      <div class="lang-menu" id="${id}_menu">
        ${Object.entries(LANG_FLAGS).map(([code, info]) => `
          <button class="lang-option ${code === current ? "active" : ""}" onclick="switchLang('${code}')">
            <span class="lang-flag">${info.flag}</span>
            <span>${info.name}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  // Close on outside click
  document.addEventListener("click", function closeMenu(e) {
    const drop = document.getElementById(id);
    if (drop && !drop.contains(e.target)) {
      const menu = document.getElementById(id + "_menu");
      const btn = document.getElementById(id + "_btn");
      if (menu) menu.classList.remove("open");
      if (btn) btn.classList.remove("open");
    }
  });
}

function toggleLangMenu(id) {
  const menu = document.getElementById(id + "_menu");
  const btn = document.getElementById(id + "_btn");
  if (!menu) return;
  const isOpen = menu.classList.contains("open");
  // Close all other open menus first
  document.querySelectorAll(".lang-menu.open").forEach(m => m.classList.remove("open"));
  document.querySelectorAll(".lang-current.open").forEach(b => b.classList.remove("open"));
  if (!isOpen) {
    menu.classList.add("open");
    btn.classList.add("open");
  }
}

function switchLang(lang) {
  setLang(lang);
  location.reload();
}