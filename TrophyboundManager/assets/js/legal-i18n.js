"use strict";

(() => {
  const STORAGE_KEY = "trophybound-language";
  const SOURCE_LOCALE = "en";
  const DEFAULT_LOCALE = "vi";
  const VERSION = "20260826";
  const SUPPORT_EMAIL = "tkitfacn@gmail.com";

  const LOCALES = Object.freeze({
    vi: { label: "VI · Tiếng Việt", direction: "ltr" },
    en: { label: "EN · English", direction: "ltr" },
    "en-SG": { label: "EN-SG · English (Singapore)", direction: "ltr" },
    ja: { label: "JA · 日本語", direction: "ltr" },
    ko: { label: "KO · 한국어", direction: "ltr" },
    es: { label: "ES · Español", direction: "ltr" },
    de: { label: "DE · Deutsch", direction: "ltr" },
    fr: { label: "FR · Français", direction: "ltr" },
    it: { label: "IT · Italiano", direction: "ltr" },
    "pt-BR": { label: "PT-BR · Português (Brasil)", direction: "ltr" },
    "pt-PT": { label: "PT-PT · Português (Portugal)", direction: "ltr" },
    "id-ID": { label: "ID · Bahasa Indonesia", direction: "ltr" },
    "hi-IN": { label: "HI · हिन्दी", direction: "ltr" },
    th: { label: "TH · ไทย", direction: "ltr" },
    ar: { label: "AR · العربية", direction: "rtl" },
  });

  const UI = Object.freeze({
    en: {
      skip: "Skip to content", brandHome: "Trophybound Manager — Home", legalNav: "Legal pages",
      privacy: "Privacy", terms: "Terms", deletion: "Account deletion", back: "Back to game",
      language: "Choose language", onPage: "On this page", related: "Related legal pages",
      footerNav: "Footer navigation", features: "Features", trophies: "Trophies",
      tagline: "Your club. Your tactics. Your decisions.",
      disclaimer: "Clubs, competitions and players in Trophybound Manager are created for the game.",
      rights: "All rights reserved.",
    },
    "en-SG": {
      skip: "Skip to content", brandHome: "Trophybound Manager — Home", legalNav: "Legal pages",
      privacy: "Privacy", terms: "Terms", deletion: "Account deletion", back: "Back to game",
      language: "Choose language", onPage: "On this page", related: "Related legal pages",
      footerNav: "Footer navigation", features: "Features", trophies: "Trophies",
      tagline: "Your club. Your tactics. Your decisions.",
      disclaimer: "Clubs, competitions and players in Trophybound Manager are created for the game.",
      rights: "All rights reserved.",
    },
    vi: {
      skip: "Bỏ qua đến nội dung", brandHome: "Trophybound Manager — Trang chủ", legalNav: "Các trang pháp lý",
      privacy: "Quyền riêng tư", terms: "Điều khoản", deletion: "Xóa tài khoản", back: "Về trang game",
      language: "Chọn ngôn ngữ", onPage: "Trong trang này", related: "Các trang pháp lý liên quan",
      footerNav: "Điều hướng chân trang", features: "Tính năng", trophies: "Danh hiệu",
      tagline: "CLB của bạn. Chiến thuật của bạn. Quyết định của bạn.",
      disclaimer: "Các CLB, giải đấu và cầu thủ trong Trophybound Manager được sáng tạo riêng cho game.",
      rights: "Bảo lưu mọi quyền.",
    },
    ja: {
      skip: "本文へ移動", brandHome: "Trophybound Manager — ホーム", legalNav: "法的情報",
      privacy: "プライバシー", terms: "利用規約", deletion: "アカウント削除", back: "ゲーム紹介へ",
      language: "言語を選択", onPage: "このページの内容", related: "関連する法的情報",
      footerNav: "フッターナビゲーション", features: "機能", trophies: "トロフィー",
      tagline: "あなたのクラブ。あなたの戦術。あなたの決断。",
      disclaimer: "Trophybound Managerのクラブ、大会、選手はゲーム用に制作されています。",
      rights: "すべての権利を留保します。",
    },
    ko: {
      skip: "본문으로 이동", brandHome: "Trophybound Manager — 홈", legalNav: "법적 고지 페이지",
      privacy: "개인정보 보호", terms: "이용약관", deletion: "계정 삭제", back: "게임 소개로",
      language: "언어 선택", onPage: "페이지 목차", related: "관련 법적 고지",
      footerNav: "푸터 탐색", features: "기능", trophies: "트로피",
      tagline: "나의 클럽. 나의 전술. 나의 결정.",
      disclaimer: "Trophybound Manager의 클럽, 대회, 선수는 게임을 위해 제작되었습니다.",
      rights: "모든 권리 보유.",
    },
    es: {
      skip: "Ir al contenido", brandHome: "Trophybound Manager — Inicio", legalNav: "Páginas legales",
      privacy: "Privacidad", terms: "Términos", deletion: "Eliminar cuenta", back: "Volver al juego",
      language: "Elegir idioma", onPage: "En esta página", related: "Páginas legales relacionadas",
      footerNav: "Navegación del pie", features: "Funciones", trophies: "Trofeos",
      tagline: "Tu club. Tu táctica. Tus decisiones.",
      disclaimer: "Los clubes, las competiciones y los jugadores de Trophybound Manager se crearon para el juego.",
      rights: "Todos los derechos reservados.",
    },
    de: {
      skip: "Zum Inhalt", brandHome: "Trophybound Manager — Startseite", legalNav: "Rechtliche Seiten",
      privacy: "Datenschutz", terms: "Nutzungsbedingungen", deletion: "Konto löschen", back: "Zurück zum Spiel",
      language: "Sprache wählen", onPage: "Auf dieser Seite", related: "Weitere rechtliche Seiten",
      footerNav: "Navigation in der Fußzeile", features: "Features", trophies: "Trophäen",
      tagline: "Dein Klub. Deine Taktik. Deine Entscheidungen.",
      disclaimer: "Klubs, Wettbewerbe und Spieler in Trophybound Manager wurden für das Spiel erstellt.",
      rights: "Alle Rechte vorbehalten.",
    },
    fr: {
      skip: "Aller au contenu", brandHome: "Trophybound Manager — Accueil", legalNav: "Pages juridiques",
      privacy: "Confidentialité", terms: "Conditions", deletion: "Suppression du compte", back: "Retour au jeu",
      language: "Choisir la langue", onPage: "Sur cette page", related: "Pages juridiques associées",
      footerNav: "Navigation du pied de page", features: "Fonctionnalités", trophies: "Trophées",
      tagline: "Votre club. Votre tactique. Vos décisions.",
      disclaimer: "Les clubs, compétitions et joueurs de Trophybound Manager ont été créés pour le jeu.",
      rights: "Tous droits réservés.",
    },
    it: {
      skip: "Vai al contenuto", brandHome: "Trophybound Manager — Home", legalNav: "Pagine legali",
      privacy: "Privacy", terms: "Termini", deletion: "Elimina account", back: "Torna al gioco",
      language: "Scegli la lingua", onPage: "In questa pagina", related: "Pagine legali correlate",
      footerNav: "Navigazione a piè di pagina", features: "Funzioni", trophies: "Trofei",
      tagline: "Il tuo club. Le tue tattiche. Le tue decisioni.",
      disclaimer: "I club, le competizioni e i giocatori di Trophybound Manager sono stati creati per il gioco.",
      rights: "Tutti i diritti riservati.",
    },
    "pt-BR": {
      skip: "Ir para o conteúdo", brandHome: "Trophybound Manager — Início", legalNav: "Páginas legais",
      privacy: "Privacidade", terms: "Termos", deletion: "Excluir conta", back: "Voltar ao jogo",
      language: "Escolher idioma", onPage: "Nesta página", related: "Páginas legais relacionadas",
      footerNav: "Navegação do rodapé", features: "Recursos", trophies: "Troféus",
      tagline: "Seu clube. Suas táticas. Suas decisões.",
      disclaimer: "Os clubes, competições e jogadores de Trophybound Manager foram criados para o jogo.",
      rights: "Todos os direitos reservados.",
    },
    "pt-PT": {
      skip: "Saltar para o conteúdo", brandHome: "Trophybound Manager — Início", legalNav: "Páginas legais",
      privacy: "Privacidade", terms: "Termos", deletion: "Eliminar conta", back: "Voltar ao jogo",
      language: "Escolher idioma", onPage: "Nesta página", related: "Páginas legais relacionadas",
      footerNav: "Navegação do rodapé", features: "Funcionalidades", trophies: "Troféus",
      tagline: "O teu clube. A tua tática. As tuas decisões.",
      disclaimer: "Os clubes, competições e jogadores de Trophybound Manager foram criados para o jogo.",
      rights: "Todos os direitos reservados.",
    },
    "id-ID": {
      skip: "Lewati ke konten", brandHome: "Trophybound Manager — Beranda", legalNav: "Halaman hukum",
      privacy: "Privasi", terms: "Ketentuan", deletion: "Hapus akun", back: "Kembali ke game",
      language: "Pilih bahasa", onPage: "Di halaman ini", related: "Halaman hukum terkait",
      footerNav: "Navigasi footer", features: "Fitur", trophies: "Trofi",
      tagline: "Klubmu. Taktikmu. Keputusanmu.",
      disclaimer: "Klub, kompetisi, dan pemain di Trophybound Manager dibuat untuk game ini.",
      rights: "Hak cipta dilindungi.",
    },
    "hi-IN": {
      skip: "मुख्य सामग्री पर जाएँ", brandHome: "Trophybound Manager — होम", legalNav: "कानूनी पेज",
      privacy: "गोपनीयता", terms: "शर्तें", deletion: "खाता हटाएँ", back: "गेम पेज पर लौटें",
      language: "भाषा चुनें", onPage: "इस पेज पर", related: "संबंधित कानूनी पेज",
      footerNav: "फुटर नेविगेशन", features: "सुविधाएँ", trophies: "ट्रॉफियाँ",
      tagline: "आपका क्लब। आपकी रणनीति। आपके निर्णय।",
      disclaimer: "Trophybound Manager के क्लब, प्रतियोगिताएँ और खिलाड़ी इस गेम के लिए बनाए गए हैं।",
      rights: "सर्वाधिकार सुरक्षित।",
    },
    th: {
      skip: "ข้ามไปยังเนื้อหา", brandHome: "Trophybound Manager — หน้าหลัก", legalNav: "หน้าข้อมูลทางกฎหมาย",
      privacy: "ความเป็นส่วนตัว", terms: "ข้อกำหนด", deletion: "ลบบัญชี", back: "กลับไปหน้าเกม",
      language: "เลือกภาษา", onPage: "เนื้อหาในหน้านี้", related: "หน้าข้อมูลทางกฎหมายที่เกี่ยวข้อง",
      footerNav: "การนำทางส่วนท้าย", features: "ฟีเจอร์", trophies: "ถ้วยรางวัล",
      tagline: "สโมสรของคุณ แท็กติกของคุณ การตัดสินใจของคุณ",
      disclaimer: "สโมสร การแข่งขัน และผู้เล่นใน Trophybound Manager สร้างขึ้นสำหรับเกมนี้",
      rights: "สงวนลิขสิทธิ์",
    },
    ar: {
      skip: "الانتقال إلى المحتوى", brandHome: "Trophybound Manager — الرئيسية", legalNav: "الصفحات القانونية",
      privacy: "الخصوصية", terms: "الشروط", deletion: "حذف الحساب", back: "العودة إلى اللعبة",
      language: "اختيار اللغة", onPage: "في هذه الصفحة", related: "صفحات قانونية ذات صلة",
      footerNav: "التنقل في التذييل", features: "الميزات", trophies: "البطولات",
      tagline: "ناديك. خططك. قراراتك.",
      disclaimer: "تم إنشاء الأندية والبطولات واللاعبين في Trophybound Manager خصيصًا للعبة.",
      rights: "جميع الحقوق محفوظة.",
    },
  });

  const DELETE_EMAIL = Object.freeze({
    en: {
      subject: "Trophybound Manager Account Deletion Request",
      body: "Please delete my Trophybound Manager account and associated game data, including multiplayer and social records.\n\nPlayer ID:\nLinked email:\nSign-in method (Email/Google/Apple):\nPlatform (Android/iOS):\nManager or club name (optional):",
    },
    "en-SG": {
      subject: "Trophybound Manager Account Deletion Request",
      body: "Please delete my Trophybound Manager account and associated game data, including multiplayer and social records.\n\nPlayer ID:\nLinked email:\nSign-in method (Email/Google/Apple):\nPlatform (Android/iOS):\nManager or club name (optional):",
    },
    vi: {
      subject: "Yêu cầu xóa tài khoản Trophybound Manager",
      body: "Vui lòng xóa tài khoản Trophybound Manager của tôi và dữ liệu game liên quan, bao gồm dữ liệu nhiều người chơi và xã hội.\n\nPlayer ID:\nEmail liên kết:\nPhương thức đăng nhập (Email/Google/Apple):\nNền tảng (Android/iOS):\nTên huấn luyện viên hoặc CLB (không bắt buộc):",
    },
    ja: {
      subject: "Trophybound Manager アカウント削除リクエスト",
      body: "Trophybound Managerのアカウントと、マルチプレイおよびソーシャル記録を含む関連ゲームデータの削除をお願いします。\n\nPlayer ID:\n連携メールアドレス:\nログイン方法（Email/Google/Apple）:\nプラットフォーム（Android/iOS）:\n監督名またはクラブ名（任意）:",
    },
    ko: {
      subject: "Trophybound Manager 계정 삭제 요청",
      body: "멀티플레이 및 소셜 기록을 포함하여 Trophybound Manager 계정과 관련 게임 데이터를 삭제해 주세요.\n\nPlayer ID:\n연결된 이메일:\n로그인 방법(Email/Google/Apple):\n플랫폼(Android/iOS):\n감독 또는 클럽 이름(선택 사항):",
    },
    es: {
      subject: "Solicitud de eliminación de cuenta de Trophybound Manager",
      body: "Eliminen mi cuenta de Trophybound Manager y los datos de juego asociados, incluidos los registros multijugador y sociales.\n\nID de jugador:\nCorreo vinculado:\nMétodo de inicio de sesión (Email/Google/Apple):\nPlataforma (Android/iOS):\nNombre de mánager o club (opcional):",
    },
    de: {
      subject: "Antrag auf Löschung des Trophybound Manager-Kontos",
      body: "Bitte löschen Sie mein Trophybound Manager-Konto und die zugehörigen Spieldaten, einschließlich Multiplayer- und Social-Daten.\n\nSpieler-ID:\nVerknüpfte E-Mail-Adresse:\nAnmeldemethode (Email/Google/Apple):\nPlattform (Android/iOS):\nManager- oder Klubname (optional):",
    },
    fr: {
      subject: "Demande de suppression du compte Trophybound Manager",
      body: "Veuillez supprimer mon compte Trophybound Manager et les données de jeu associées, y compris les données multijoueur et sociales.\n\nID de joueur :\nAdresse e-mail associée :\nMéthode de connexion (Email/Google/Apple) :\nPlateforme (Android/iOS) :\nNom du manager ou du club (facultatif) :",
    },
    it: {
      subject: "Richiesta di eliminazione dell'account Trophybound Manager",
      body: "Eliminate il mio account Trophybound Manager e i dati di gioco associati, inclusi i dati multigiocatore e social.\n\nID giocatore:\nEmail collegata:\nMetodo di accesso (Email/Google/Apple):\nPiattaforma (Android/iOS):\nNome del manager o del club (facoltativo):",
    },
    "pt-BR": {
      subject: "Solicitação de exclusão da conta Trophybound Manager",
      body: "Excluam minha conta do Trophybound Manager e os dados de jogo associados, incluindo dados multijogador e sociais.\n\nID do jogador:\nE-mail vinculado:\nMétodo de login (Email/Google/Apple):\nPlataforma (Android/iOS):\nNome do técnico ou clube (opcional):",
    },
    "pt-PT": {
      subject: "Pedido de eliminação da conta Trophybound Manager",
      body: "Eliminem a minha conta Trophybound Manager e os dados de jogo associados, incluindo dados multijogador e sociais.\n\nID de jogador:\nE-mail associado:\nMétodo de início de sessão (Email/Google/Apple):\nPlataforma (Android/iOS):\nNome do treinador ou clube (opcional):",
    },
    "id-ID": {
      subject: "Permintaan penghapusan akun Trophybound Manager",
      body: "Mohon hapus akun Trophybound Manager saya beserta data game terkait, termasuk data multipemain dan sosial.\n\nPlayer ID:\nEmail tertaut:\nMetode masuk (Email/Google/Apple):\nPlatform (Android/iOS):\nNama manajer atau klub (opsional):",
    },
    "hi-IN": {
      subject: "Trophybound Manager खाता हटाने का अनुरोध",
      body: "कृपया मेरा Trophybound Manager खाता और उससे जुड़ा गेम डेटा हटाएँ, जिसमें मल्टीप्लेयर और सोशल रिकॉर्ड भी शामिल हैं।\n\nPlayer ID:\nलिंक किया गया ईमेल:\nसाइन-इन का तरीका (Email/Google/Apple):\nप्लेटफ़ॉर्म (Android/iOS):\nमैनेजर या क्लब का नाम (वैकल्पिक):",
    },
    th: {
      subject: "คำขอลบบัญชี Trophybound Manager",
      body: "โปรดลบบัญชี Trophybound Manager และข้อมูลเกมที่เกี่ยวข้องของฉัน รวมถึงข้อมูลผู้เล่นหลายคนและโซเชียล\n\nPlayer ID:\nอีเมลที่เชื่อมโยง:\nวิธีเข้าสู่ระบบ (Email/Google/Apple):\nแพลตฟอร์ม (Android/iOS):\nชื่อผู้จัดการหรือสโมสร (ไม่บังคับ):",
    },
    ar: {
      subject: "طلب حذف حساب Trophybound Manager",
      body: "يرجى حذف حسابي في Trophybound Manager وبيانات اللعبة المرتبطة به، بما في ذلك سجلات اللعب الجماعي والبيانات الاجتماعية.\n\nمعرّف اللاعب:\nالبريد الإلكتروني المرتبط:\nطريقة تسجيل الدخول (Email/Google/Apple):\nالمنصة (Android/iOS):\nاسم المدرب أو النادي (اختياري):",
    },
  });

  const pageId = document.body.dataset.legalPage;
  const article = document.querySelector(".legal-document");
  const selector = [
    "p",
    "h1",
    "h2",
    "h3",
    ".legal-toc > strong",
    ".legal-toc li",
    ".legal-sections li",
    ".legal-inline-nav a",
    ".legal-request-card > a.button",
  ].join(",");
  const contentNodes = article ? [...article.querySelectorAll(selector)] : [];
  const englishStrings = contentNodes.map((node) => node.innerHTML);
  const englishMetadata = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content ?? "",
  };
  const loadedLocales = new Map();
  let activeLocale = SOURCE_LOCALE;
  let requestId = 0;

  function resolveLocale(value) {
    if (!value) return null;
    const normalized = String(value).trim().toLowerCase().replace("_", "-");
    const exact = Object.keys(LOCALES).find((locale) => locale.toLowerCase() === normalized);
    if (exact) return exact;
    const [base, region] = normalized.split("-");
    if (base === "pt") return region === "pt" ? "pt-PT" : "pt-BR";
    if (base === "en") return region === "sg" ? "en-SG" : "en";
    if (base === "id") return "id-ID";
    if (base === "hi") return "hi-IN";
    return Object.hasOwn(LOCALES, base) ? base : null;
  }

  function readPreferredLocale() {
    try {
      const stored = resolveLocale(localStorage.getItem(STORAGE_KEY));
      if (stored) return stored;
    } catch {
      // A strict privacy context may block storage; browser language remains available.
    }
    const browserLocales = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const locale of browserLocales) {
      const resolved = resolveLocale(locale);
      if (resolved) return resolved;
    }
    return DEFAULT_LOCALE;
  }

  function storeLocale(locale) {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch {
      // Language switching does not depend on persistent storage.
    }
  }

  function updateUi(locale) {
    const strings = UI[locale] ?? UI.en;
    document.querySelectorAll("[data-legal-ui]").forEach((element) => {
      const value = strings[element.dataset.legalUi];
      if (value) element.textContent = value;
    });
    document.querySelectorAll("[data-legal-ui-aria]").forEach((element) => {
      const value = strings[element.dataset.legalUiAria];
      if (value) element.setAttribute("aria-label", value);
    });
    document.querySelectorAll(".legal-toc").forEach((element) => element.setAttribute("aria-label", strings.onPage));
    document.querySelectorAll(".legal-inline-nav").forEach((element) => element.setAttribute("aria-label", strings.related));
    const select = document.querySelector("[data-legal-language-select]");
    if (select) {
      select.value = locale;
      select.setAttribute("aria-label", strings.language);
    }
    const deletionEmail = document.querySelector("[data-legal-deletion-email]");
    const email = DELETE_EMAIL[locale] ?? DELETE_EMAIL[SOURCE_LOCALE];
    if (deletionEmail && email) {
      deletionEmail.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(email.subject)}&body=${encodeURIComponent(email.body)}`;
    }
  }

  function updateMetadata(metadata) {
    document.title = metadata.title;
    const description = document.querySelector('meta[name="description"]');
    const openGraphTitle = document.querySelector('meta[property="og:title"]');
    const openGraphDescription = document.querySelector('meta[property="og:description"]');
    if (description) description.content = metadata.description;
    if (openGraphTitle) openGraphTitle.content = metadata.title;
    if (openGraphDescription) openGraphDescription.content = metadata.description;
  }

  function restoreEnglish() {
    contentNodes.forEach((node, index) => {
      node.innerHTML = englishStrings[index];
    });
    updateMetadata(englishMetadata);
  }

  function loadLocale(locale) {
    if (loadedLocales.has(locale)) return Promise.resolve(loadedLocales.get(locale));
    const existing = window.TROPHYBOUND_LEGAL_TRANSLATIONS?.[locale];
    if (existing) {
      loadedLocales.set(locale, existing);
      return Promise.resolve(existing);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `assets/js/legal-locales/${locale}.js?v=${VERSION}`;
      script.async = true;
      script.addEventListener("load", () => {
        const translation = window.TROPHYBOUND_LEGAL_TRANSLATIONS?.[locale];
        if (!translation) {
          reject(new Error(`Translation file for ${locale} did not register its locale.`));
          return;
        }
        loadedLocales.set(locale, translation);
        resolve(translation);
      }, { once: true });
      script.addEventListener("error", () => reject(new Error(`Unable to load legal translation for ${locale}.`)), { once: true });
      document.head.append(script);
    });
  }

  async function applyLocale(requestedLocale, { persist = false } = {}) {
    const locale = resolveLocale(requestedLocale) ?? DEFAULT_LOCALE;
    const currentRequest = ++requestId;
    if (persist) storeLocale(locale);
    article?.setAttribute("aria-busy", "true");
    try {
      if (locale === SOURCE_LOCALE) {
        restoreEnglish();
      } else {
        const translation = await loadLocale(locale);
        if (currentRequest !== requestId) return;
        const page = translation.pages?.[pageId];
        if (!page || !Array.isArray(page.strings) || page.strings.length !== contentNodes.length) {
          throw new Error(`Legal translation ${locale}/${pageId} has ${page?.strings?.length ?? 0} strings; expected ${contentNodes.length}.`);
        }
        contentNodes.forEach((node, index) => {
          node.innerHTML = page.strings[index];
        });
        updateMetadata(page.meta);
      }
      if (currentRequest !== requestId) return;
      activeLocale = locale;
      document.documentElement.lang = locale;
      document.documentElement.dir = LOCALES[locale].direction;
      updateUi(locale);
    } catch (error) {
      if (currentRequest !== requestId) return;
      console.error(error);
      activeLocale = SOURCE_LOCALE;
      restoreEnglish();
      document.documentElement.lang = SOURCE_LOCALE;
      document.documentElement.dir = LOCALES[SOURCE_LOCALE].direction;
      updateUi(SOURCE_LOCALE);
      if (persist) storeLocale(SOURCE_LOCALE);
    } finally {
      if (currentRequest === requestId) article?.removeAttribute("aria-busy");
    }
  }

  function initializeSelector() {
    const select = document.querySelector("[data-legal-language-select]");
    if (!select) return;
    select.replaceChildren(...Object.entries(LOCALES).map(([value, locale]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = locale.label;
      option.lang = value;
      option.dir = "auto";
      return option;
    }));
    select.addEventListener("change", (event) => applyLocale(event.target.value, { persist: true }));
  }

  if (!pageId || !article) return;
  initializeSelector();
  updateUi(activeLocale);
  applyLocale(readPreferredLocale());
})();
