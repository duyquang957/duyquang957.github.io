"use strict";

document.documentElement.classList.add("js");

// Paste the verified public listing URLs here when the stores approve the game.
// Empty values intentionally keep the honest “coming soon” interaction.
const STORE_URLS = Object.freeze({
  appStore: "",
  googlePlay: "",
});

const translations = {
  en: {
    meta: {
      title: "Trophybound Manager — Build the team. Control the match.",
      description: "Build your squad, shape the tactics and take control in every playable 3D match.",
    },
    a11y: {
      skip: "Skip navigation",
      mainNav: "Main navigation",
      mobileNav: "Mobile navigation",
      footerNav: "Footer navigation",
      language: "Choose language",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      brandHome: "Trophybound Manager — Home",
      storeLinks: "Store links",
      matchModes: "Match modes",
      featuredMatch: "Featured match",
      scroll: "Scroll to explore",
      highlights: "Game highlights",
      gameplayTabs: "Gameplay gallery",
      gameLanguages: "In-game languages",
      trophyScroller: "Trophy list — use the arrow keys to scroll",
    },
    nav: {
      game: "Game",
      features: "Features",
      trophies: "Trophies",
      languages: "Languages",
      download: "Download",
    },
    hero: {
      eyebrow: "NEXT-GENERATION FOOTBALL MANAGEMENT",
      title: "BUILD THE TEAM",
      titleAccent: "CONTROL THE MATCH",
      description: "Build your squad, shape the tactics and take control in every playable 3D match.",
      modeControl: "Control",
      modeWatch: "Watch",
      modeQuick: "Quick Sim",
      matchday: "MATCHDAY",
      yourCall: "The decision is yours",
      explore: "EXPLORE",
    },
    store: {
      coming: "COMING SOON ON",
      available: "AVAILABLE ON",
      pending: "Store links will be added when the game is officially released.",
      toast: "The official store link is not live yet. It will be added here at release.",
    },
    metrics: {
      competitions: "competitions in the pathway",
      locales: "in-game locales",
      matchModes: "ways to experience a match",
      fictional: "original football world",
    },
    ticker: {
      squad: "BUILD THE SQUAD",
      tactics: "SHAPE THE TACTICS",
      match: "OWN THE MATCH",
      glory: "CHASE THE GLORY",
    },
    overview: {
      eyebrow: "YOUR FOOTBALL STORY",
      title: "MORE THAN LIFE ON",
      titleAccent: "THE TOUCHLINE",
      description: "Trophybound Manager combines management depth with playable 3D football. Every call made before kickoff shows up when the ball starts moving.",
      teamRating: "TEAM RATING",
      formation: "FORMATION",
      balanced: "Balanced",
      p1Title: "Think like a coach",
      p1Body: "Set roles, tempo, pressure and attacking intent for every challenge.",
      p2Title: "Deliver on the pitch",
      p2Body: "Control the 3D match, watch AI versus AI, or Quick Sim at your pace.",
      p3Title: "Build like a director",
      p3Body: "Grow finances, fans, the academy, practice yard and stadium.",
    },
    features: {
      eyebrow: "THE CLUB BLUEPRINT",
      title: "EVERY DECISION",
      titleAccent: "SHAPES THE SEASON",
      description: "From the tactics room to the final whistle, the whole journey is yours.",
      squadTitle: "BUILD YOUR XI",
      squadBody: "Choose the starters, organize the bench, manage fitness and give every player the right role.",
      tacticsTitle: "DEFINE YOUR STYLE",
      tacticsBody: "Tune formation, tempo, passing, pressure and attacking intent.",
      matchTitle: "TAKE CONTROL IN 3D",
      matchBody: "Play the match, watch AI versus AI, or use Quick Sim to keep the season moving.",
      transferTitle: "RECRUIT WITH PURPOSE",
      transferBody: "Scout the market, compare attributes and find the profile your system needs.",
      trophyTitle: "CHASE EVERY TROPHY",
      trophyBody: "Climb the league and fight through every round of the cup.",
      clubTitle: "BUILD THE WHOLE CLUB",
      clubBody: "Manage finances, grow the fanbase and upgrade the academy, practice yard and stadium.",
    },
    showcase: {
      eyebrow: "REAL IN-GAME EXPERIENCE",
      title: "YOU MAKE THE PLAN.",
      titleAccent: "THE TEAM DELIVERS.",
      description: "Explore the squad, playable 3D match, tactics, transfer market and cup journey.",
    },
    screens: {
      caption: "IN GAME",
      matchTab: "3D Match",
      squadTab: "Squad",
      tacticsTab: "Tactics",
      transfersTab: "Transfers",
      competitionsTab: "Competitions",
      matchTitle: "Take control",
      matchBody: "Make the calls from the touchline, then create the difference on the pitch.",
      matchAlt: "Trophybound Manager playable 3D match screen",
      squadTitle: "Build your best XI",
      squadBody: "Balance roles, fitness, the starting team and the bench around your football idea.",
      squadAlt: "Trophybound Manager squad management screen",
      tacticsTitle: "Define your style",
      tacticsBody: "Adjust mentality, tempo, passing, pressure, the defensive line and attacking focus.",
      tacticsAlt: "Trophybound Manager tactics screen",
      transfersTitle: "Find the missing piece",
      transfersBody: "Compare available talent and recruit the right profile for your squad.",
      transfersAlt: "Trophybound Manager transfer market screen",
      competitionsTitle: "Chase every trophy",
      competitionsBody: "Follow the bracket, prepare for each round and keep the season alive.",
      competitionsAlt: "Trophybound Manager competition bracket screen",
    },
    trophies: {
      eyebrow: "THE TROPHY PATH",
      title: "FROM DOMESTIC GLORY",
      titleAccent: "TO THE WORLD STAGE",
      description: "League and National Cup are playable now. The Competition Hub also maps the qualification path toward bigger stages.",
      playable: "PLAYABLE NOW",
      path: "UNLOCK PATH",
      playableShort: "PLAY NOW",
      pathShort: "PATHWAY",
    },
    cups: {
      national: "NATIONAL CUP",
      nationalDesc: "14 clubs · Knockout",
      nationalAlt: "National Cup trophy",
      super: "NATIONAL SUPER CUP",
      superDesc: "Two title holders · One match",
      superAlt: "National Super Cup trophy",
      regional: "REGIONAL CHAMPIONS CUP",
      regionalDesc: "8 clubs · Road to the continent",
      regionalAlt: "Regional Champions Cup trophy",
      continental: "CONTINENTAL CHAMPIONS CUP",
      continentalDesc: "8 clubs · Ticket to the world",
      continentalAlt: "Continental Champions Cup trophy",
      challenge: "CONTINENTAL CHALLENGE CUP",
      challengeDesc: "8 clubs · Second continental tier",
      challengeAlt: "Continental Challenge Cup trophy",
      world: "CLUB WORLD CHAMPIONSHIP",
      worldDesc: "8 champions · The final summit",
      worldAlt: "Club World Championship trophy",
    },
    languages: {
      eyebrow: "FOOTBALL WITHOUT BORDERS",
      title: "EXPERIENCE IT IN",
      titleAccent: "YOUR LANGUAGE",
      description: "The game and this website are fully available in all 15 supported locales.",
      note: "All 15 languages can be selected directly on this website.",
    },
    download: {
      eyebrow: "THE DRESSING ROOM IS WAITING",
      title: "READY TO",
      titleAccent: "TAKE CHARGE?",
      description: "Choose your platform and start writing your football story.",
      note: "Store buttons are waiting for the verified release URLs.",
    },
    footer: {
      tagline: "Your club. Your tactics. Your story.",
      privacy: "Privacy",
      terms: "Terms",
      accountDeletion: "Account deletion",
      disclaimer: "All clubs, competitions and players in Trophybound Manager were created for the game.",
      rights: "All rights reserved.",
    },
  },

  vi: {
    meta: {
      title: "Trophybound Manager — Dẫn dắt CLB theo cách của bạn",
      description: "Game quản lý bóng đá nơi bạn xây đội hình, chọn chiến thuật và trực tiếp thi đấu trong các trận bóng đá 3D.",
    },
    a11y: {
      skip: "Bỏ qua điều hướng",
      mainNav: "Điều hướng chính",
      mobileNav: "Điều hướng di động",
      footerNav: "Điều hướng chân trang",
      language: "Chọn ngôn ngữ",
      openMenu: "Mở menu",
      closeMenu: "Đóng menu",
      brandHome: "Trophybound Manager — Trang chủ",
      storeLinks: "Liên kết cửa hàng",
      matchModes: "Chế độ trận đấu",
      featuredMatch: "Trận đấu nổi bật",
      scroll: "Cuộn để khám phá",
      highlights: "Thông tin nổi bật",
      gameplayTabs: "Thư viện gameplay",
      gameLanguages: "Ngôn ngữ trong game",
      trophyScroller: "Danh sách cúp — dùng phím mũi tên để cuộn",
    },
    nav: {
      game: "Tổng quan",
      features: "Tính năng",
      trophies: "Danh hiệu",
      languages: "Ngôn ngữ",
      download: "Tải game",
    },
    hero: {
      eyebrow: "QUẢN LÝ BÓNG ĐÁ THẾ HỆ MỚI",
      title: "CLB CỦA BẠN",
      titleAccent: "BẠN QUYẾT ĐỊNH",
      description: "Xây đội hình, chọn chiến thuật và trực tiếp thi đấu trong các trận bóng đá 3D.",
      modeControl: "Điều khiển",
      modeWatch: "Xem trận",
      modeQuick: "Chơi nhanh",
      matchday: "NGÀY THI ĐẤU",
      yourCall: "Quyết định là của bạn",
      explore: "KHÁM PHÁ",
    },
    store: {
      coming: "SẮP CÓ TRÊN",
      available: "TẢI TRÊN",
      pending: "Liên kết cửa hàng sẽ được cập nhật khi game phát hành chính thức.",
      toast: "Liên kết cửa hàng chính thức chưa hoạt động. Nút tải sẽ được cập nhật ngay khi game phát hành.",
    },
    metrics: {
      competitions: "giải đấu trong lộ trình",
      locales: "locale trong game",
      matchModes: "cách trải nghiệm trận đấu",
      fictional: "thế giới bóng đá nguyên bản",
    },
    ticker: {
      squad: "XÂY ĐỘI HÌNH",
      tactics: "ĐỊNH HÌNH CHIẾN THUẬT",
      match: "LÀM CHỦ TRẬN ĐẤU",
      glory: "CHINH PHỤC VINH QUANG",
    },
    overview: {
      eyebrow: "CÂU CHUYỆN CỦA BẠN",
      title: "KHÔNG CHỈ ĐỨNG NGOÀI",
      titleAccent: "ĐƯỜNG BIÊN",
      description: "Trophybound Manager kết hợp chiều sâu quản lý với sức nóng sân cỏ 3D. Mỗi quyết định trước trận đều hiện hữu khi bóng lăn.",
      teamRating: "CHỈ SỐ ĐỘI",
      formation: "SƠ ĐỒ",
      balanced: "Cân bằng",
      p1Title: "Tư duy của HLV",
      p1Body: "Chọn vai trò, nhịp độ, pressing và hướng tấn công cho từng thử thách.",
      p2Title: "Bản lĩnh trên sân",
      p2Body: "Điều khiển trận 3D, theo dõi AI hoặc mô phỏng nhanh theo nhịp chơi của bạn.",
      p3Title: "Tầm nhìn của nhà quản lý",
      p3Body: "Phát triển tài chính, người hâm mộ, học viện, sân tập và sân vận động.",
    },
    features: {
      eyebrow: "BẢN THIẾT KẾ CÂU LẠC BỘ",
      title: "MỌI QUYẾT ĐỊNH",
      titleAccent: "ĐỊNH HÌNH MÙA GIẢI",
      description: "Từ phòng chiến thuật đến tiếng còi mãn cuộc — bạn làm chủ toàn bộ hành trình.",
      squadTitle: "XÂY ĐỘI HÌNH CỦA BẠN",
      squadBody: "Chọn đội hình xuất phát, quản lý thể lực và đặt từng cầu thủ vào đúng vai trò.",
      tacticsTitle: "ĐỊNH HÌNH LỐI CHƠI",
      tacticsBody: "Tinh chỉnh sơ đồ, nhịp độ, chuyền bóng, pressing và ý đồ tấn công.",
      matchTitle: "LÀM CHỦ TRẬN ĐẤU 3D",
      matchBody: "Tự điều khiển, quan sát AI đấu AI hoặc dùng Quick Sim để đi tiếp.",
      transferTitle: "CHIÊU MỘ CÓ CHỦ ĐÍCH",
      transferBody: "Scout thị trường, so sánh năng lực và tìm đúng mảnh ghép hệ thống cần.",
      trophyTitle: "CHINH PHỤC DANH HIỆU",
      trophyBody: "Bám đuổi ngôi đầu giải VĐQG và chiến đấu qua từng vòng cúp.",
      clubTitle: "PHÁT TRIỂN TOÀN DIỆN CLB",
      clubBody: "Quản lý tài chính, xây cộng đồng và nâng cấp học viện, sân tập, sân vận động.",
    },
    showcase: {
      eyebrow: "TRẢI NGHIỆM THẬT TRONG GAME",
      title: "BẠN LẬP KẾ HOẠCH.",
      titleAccent: "ĐỘI BÓNG THỰC THI.",
      description: "Khám phá đội hình, trận 3D, chiến thuật, chuyển nhượng và hành trình cúp.",
    },
    screens: {
      caption: "TRONG GAME",
      matchTab: "Trận đấu 3D",
      squadTab: "Đội hình",
      tacticsTab: "Chiến thuật",
      transfersTab: "Chuyển nhượng",
      competitionsTab: "Giải đấu",
      matchTitle: "Làm chủ trận đấu",
      matchBody: "Đưa ra quyết định bên đường biên, rồi trực tiếp tạo khác biệt trên sân.",
      matchAlt: "Màn hình trận đấu 3D của Trophybound Manager",
      squadTitle: "Xây đội hình tốt nhất",
      squadBody: "Cân bằng vai trò, thể lực, đội hình xuất phát và ghế dự bị theo triết lý của bạn.",
      squadAlt: "Màn hình quản lý đội hình của Trophybound Manager",
      tacticsTitle: "Định hình lối chơi",
      tacticsBody: "Chỉnh tâm lý, nhịp độ, chuyền bóng, pressing, hàng thủ và hướng tấn công.",
      tacticsAlt: "Màn hình chiến thuật của Trophybound Manager",
      transfersTitle: "Tìm mảnh ghép còn thiếu",
      transfersBody: "So sánh tài năng trên thị trường và chiêu mộ đúng hồ sơ đội bóng cần.",
      transfersAlt: "Màn hình thị trường chuyển nhượng của Trophybound Manager",
      competitionsTitle: "Chinh phục mọi danh hiệu",
      competitionsBody: "Theo dõi nhánh đấu, chuẩn bị từng vòng và giữ mùa giải luôn rộng mở.",
      competitionsAlt: "Màn hình nhánh đấu cúp của Trophybound Manager",
    },
    trophies: {
      eyebrow: "HÀNH TRÌNH DANH HIỆU",
      title: "TỪ VINH QUANG QUỐC NỘI",
      titleAccent: "ĐẾN ĐỈNH CAO THẾ GIỚI",
      description: "Giải VĐQG và Cúp Quốc gia hiện có thể thi đấu. Competition Hub còn vạch ra điều kiện để hướng tới các đấu trường lớn hơn.",
      playable: "HIỆN CÓ THỂ THI ĐẤU",
      path: "LỘ TRÌNH MỞ KHÓA",
      playableShort: "CHƠI NGAY",
      pathShort: "LỘ TRÌNH",
    },
    cups: {
      national: "CÚP QUỐC GIA",
      nationalDesc: "14 CLB · Loại trực tiếp",
      nationalAlt: "Cúp Quốc gia",
      super: "SIÊU CÚP QUỐC GIA",
      superDesc: "Hai nhà vô địch · Một trận",
      superAlt: "Siêu cúp Quốc gia",
      regional: "CÚP VÔ ĐỊCH KHU VỰC",
      regionalDesc: "8 CLB · Con đường châu lục",
      regionalAlt: "Cúp Vô địch Khu vực",
      continental: "CÚP VÔ ĐỊCH CHÂU LỤC",
      continentalDesc: "8 CLB · Vé đến thế giới",
      continentalAlt: "Cúp Vô địch Châu lục",
      challenge: "CÚP THÁCH THỨC CHÂU LỤC",
      challengeDesc: "8 CLB · Đấu trường hạng hai",
      challengeAlt: "Cúp Thách thức Châu lục",
      world: "GIẢI VÔ ĐỊCH CLB THẾ GIỚI",
      worldDesc: "8 nhà vô địch · Đỉnh cao cuối cùng",
      worldAlt: "Giải Vô địch CLB Thế giới",
    },
    languages: {
      eyebrow: "BÓNG ĐÁ KHÔNG BIÊN GIỚI",
      title: "TRẢI NGHIỆM BẰNG",
      titleAccent: "NGÔN NGỮ CỦA BẠN",
      description: "Game và website đều hỗ trợ đầy đủ 15 locale để người chơi khám phá bằng ngôn ngữ của mình.",
      note: "Cả 15 ngôn ngữ đều có thể chọn ngay trên website.",
    },
    download: {
      eyebrow: "PHÒNG THAY ĐỒ ĐANG CHỜ",
      title: "SẴN SÀNG",
      titleAccent: "TIẾP QUẢN CLB?",
      description: "Chọn nền tảng và bắt đầu viết câu chuyện bóng đá của riêng bạn.",
      note: "Store links đang chờ URL phát hành chính thức.",
    },
    footer: {
      tagline: "CLB của bạn. Chiến thuật của bạn. Câu chuyện của bạn.",
      privacy: "Quyền riêng tư",
      terms: "Điều khoản",
      accountDeletion: "Xóa tài khoản",
      disclaimer: "Các CLB, giải đấu và cầu thủ trong Trophybound Manager được sáng tạo riêng cho game.",
      rights: "Đã đăng ký bản quyền.",
    },
  },

  ja: {
    meta: {
      title: "Trophybound Manager — チームを築き、試合を支配せよ",
      description: "スカッドを編成し、戦術を磨き、3Dマッチを自らプレイして勝利をつかもう。",
    },
    a11y: {
      skip: "ナビゲーションをスキップ", mainNav: "メインナビゲーション", mobileNav: "モバイルナビゲーション",
      footerNav: "フッターナビゲーション", language: "言語を選択", openMenu: "メニューを開く", closeMenu: "メニューを閉じる",
      brandHome: "Trophybound Manager — ホーム", storeLinks: "ストアリンク", matchModes: "試合モード",
      featuredMatch: "注目の試合", scroll: "スクロールして探索", highlights: "ゲームの特徴",
      gameplayTabs: "ゲームプレイギャラリー", gameLanguages: "ゲーム内言語", trophyScroller: "トロフィー一覧 — 矢印キーでスクロール",
    },
    nav: { game: "ゲーム", features: "特徴", trophies: "トロフィー", languages: "言語", download: "ダウンロード" },
    hero: {
      eyebrow: "次世代のサッカーマネジメント",
      title: "チームを築け",
      titleAccent: "試合を支配せよ",
      description: "スカッドを編成し、戦術を磨き、3Dマッチを自らプレイして勝利をつかもう。",
      modeControl: "操作", modeWatch: "観戦", modeQuick: "クイックシミュレーション",
      matchday: "マッチデー", yourCall: "決断するのはあなた", explore: "探索する",
    },
    store: {
      coming: "近日配信",
      available: "ダウンロード",
      pending: "ゲームの正式リリース後にストアリンクを追加します。",
      toast: "公式ストアリンクはまだ公開されていません。リリース時に追加されます。",
    },
    metrics: { competitions: "大会への道", locales: "ゲーム内ロケール", matchModes: "試合の楽しみ方", fictional: "オリジナルのサッカー世界" },
    ticker: { squad: "スカッドを作る", tactics: "戦術を磨く", match: "試合を支配する", glory: "栄光をつかむ" },
    overview: {
      eyebrow: "あなたのサッカーストーリー", title: "タッチラインの外だけでは", titleAccent: "終わらない",
      description: "奥深いクラブ運営とプレイ可能な3Dサッカーを融合。キックオフ前の決断が、ピッチ上の結果を変えます。",
      teamRating: "チーム評価", formation: "フォーメーション", balanced: "バランス",
      p1Title: "監督として考える", p1Body: "役割、テンポ、プレス、攻撃方針を試合ごとに設定。",
      p2Title: "ピッチで結果を出す", p2Body: "3D操作、AI観戦、クイックシミュレーションを自由に選択。",
      p3Title: "クラブ全体を築く", p3Body: "財務、ファン、アカデミー、練習場、スタジアムを成長。",
    },
    features: {
      eyebrow: "クラブの設計図", title: "すべての決断が", titleAccent: "シーズンを変える",
      description: "戦術室から試合終了の笛まで、すべてはあなたの手に。",
      squadTitle: "理想のイレブンを築け", squadBody: "先発、ベンチ、コンディション、役割を最適に管理。",
      tacticsTitle: "自分のスタイルを貫け", tacticsBody: "布陣、テンポ、パス、プレス、攻撃方針を調整。",
      matchTitle: "3Dマッチを支配", matchBody: "直接操作、AI観戦、クイックシミュレーションを選択。",
      transferTitle: "狙いを定めて補強", transferBody: "能力を比較し、戦術に必要な選手を獲得。",
      trophyTitle: "すべてのタイトルを狙え", trophyBody: "リーグを駆け上がり、カップ戦を勝ち抜こう。",
      clubTitle: "クラブ全体を成長", clubBody: "財務とファンを管理し、施設をアップグレード。",
    },
    showcase: {
      eyebrow: "実際のゲーム画面", title: "戦略を立てるのはあなた。", titleAccent: "実行するのはチーム。",
      description: "スカッド、3Dマッチ、戦術、移籍市場、カップへの道をチェック。",
    },
    screens: {
      caption: "ゲーム内", matchTab: "3Dマッチ", squadTab: "スカッド", tacticsTab: "戦術", transfersTab: "移籍", competitionsTab: "大会",
      matchTitle: "試合を支配せよ", matchBody: "采配を振るい、ピッチ上でも自ら違いを生み出そう。", matchAlt: "Trophybound Managerの3Dマッチ画面",
      squadTitle: "最高のイレブンを編成", squadBody: "役割、体力、先発、ベンチを自分の哲学に合わせよう。", squadAlt: "Trophybound Managerのスカッド画面",
      tacticsTitle: "自分のスタイルを形に", tacticsBody: "メンタリティ、テンポ、パス、プレス、守備ライン、攻撃を調整。", tacticsAlt: "Trophybound Managerの戦術画面",
      transfersTitle: "必要な選手を見つける", transfersBody: "獲得可能な選手を比較し、スカッドに合う才能を迎えよう。", transfersAlt: "Trophybound Managerの移籍市場画面",
      competitionsTitle: "すべてのトロフィーへ", competitionsBody: "組み合わせを確認し、各ラウンドに備え、勝ち進もう。", competitionsAlt: "Trophybound Managerの大会画面",
    },
    trophies: {
      eyebrow: "トロフィーへの道", title: "国内の栄光から", titleAccent: "世界の頂点へ",
      description: "リーグとナショナルカップは現在プレイ可能。大会ハブでは、さらに大きな舞台への出場条件も確認できます。",
      playable: "プレイ可能", path: "解放ルート", playableShort: "プレイ可能", pathShort: "ルート",
    },
    cups: {
      national: "ナショナルカップ", nationalDesc: "14クラブ・ノックアウト", nationalAlt: "ナショナルカップのトロフィー",
      super: "ナショナルスーパーカップ", superDesc: "2王者・1試合", superAlt: "ナショナルスーパーカップのトロフィー",
      regional: "地域チャンピオンズカップ", regionalDesc: "8クラブ・大陸への道", regionalAlt: "地域チャンピオンズカップのトロフィー",
      continental: "大陸チャンピオンズカップ", continentalDesc: "8クラブ・世界への切符", continentalAlt: "大陸チャンピオンズカップのトロフィー",
      challenge: "大陸チャレンジカップ", challengeDesc: "8クラブ・大陸第2層", challengeAlt: "大陸チャレンジカップのトロフィー",
      world: "クラブ世界選手権", worldDesc: "8王者・最後の頂点", worldAlt: "クラブ世界選手権のトロフィー",
    },
    languages: {
      eyebrow: "国境のないサッカー", title: "あなたの言葉で", titleAccent: "サッカーを体験",
      description: "ゲームとこのウェブサイトは、対応する15ロケールすべてで利用できます。",
      note: "15言語すべてをこのウェブサイトから直接選択できます。",
    },
    download: {
      eyebrow: "ロッカールームが待っている", title: "クラブを率いる", titleAccent: "準備はできたか？",
      description: "プラットフォームを選び、あなただけの物語を始めよう。", note: "正式な配信URLの公開をお待ちください。",
    },
    footer: {
      tagline: "あなたのクラブ。あなたの戦術。あなたの物語。", privacy: "プライバシー",
      terms: "利用規約", accountDeletion: "アカウント削除",
      disclaimer: "Trophybound Managerに登場するクラブ、大会、選手は、すべて本作のために制作されています。", rights: "All rights reserved.",
    },
  },

  ko: {
    meta: {
      title: "Trophybound Manager — 팀을 완성하고 경기를 지배하세요",
      description: "스쿼드를 구성하고 전술을 다듬어, 3D 경기를 직접 플레이하며 승리를 이끄세요.",
    },
    a11y: {
      skip: "탐색 건너뛰기", mainNav: "기본 탐색", mobileNav: "모바일 탐색", footerNav: "바닥글 탐색",
      language: "언어 선택", openMenu: "메뉴 열기", closeMenu: "메뉴 닫기", brandHome: "Trophybound Manager — 홈",
      storeLinks: "스토어 링크", matchModes: "경기 모드", featuredMatch: "주요 경기", scroll: "스크롤하여 살펴보기",
      highlights: "게임 주요 정보", gameplayTabs: "게임플레이 갤러리", gameLanguages: "게임 내 언어", trophyScroller: "트로피 목록 — 화살표 키로 스크롤",
    },
    nav: { game: "게임", features: "주요 기능", trophies: "트로피", languages: "언어", download: "다운로드" },
    hero: {
      eyebrow: "차세대 축구 경영", title: "팀을 완성하라", titleAccent: "경기를 지배하라",
      description: "스쿼드를 구성하고 전술을 다듬어, 3D 경기를 직접 플레이하며 승리를 이끄세요.",
      modeControl: "직접 플레이", modeWatch: "관전", modeQuick: "빠른 시뮬레이션",
      matchday: "매치데이", yourCall: "결정은 당신의 몫", explore: "살펴보기",
    },
    store: {
      coming: "출시 예정", available: "다운로드",
      pending: "게임이 정식 출시되면 스토어 링크가 추가됩니다.",
      toast: "공식 스토어 링크가 아직 공개되지 않았습니다. 출시 시 이곳에 추가됩니다.",
    },
    metrics: { competitions: "대회 로드맵", locales: "게임 내 로케일", matchModes: "경기를 즐기는 방식", fictional: "독창적인 축구 세계" },
    ticker: { squad: "스쿼드 구성", tactics: "전술 완성", match: "경기 장악", glory: "영광을 향해" },
    overview: {
      eyebrow: "당신의 축구 이야기", title: "터치라인 밖에만", titleAccent: "머물지 마세요",
      description: "깊이 있는 클럽 운영과 직접 플레이하는 3D 축구를 결합했습니다. 킥오프 전의 모든 결정이 경기장에서 드러납니다.",
      teamRating: "팀 평가", formation: "포메이션", balanced: "균형",
      p1Title: "감독처럼 생각하세요", p1Body: "역할, 템포, 압박, 공격 성향을 경기마다 설정하세요.",
      p2Title: "경기장에서 증명하세요", p2Body: "3D 직접 플레이, AI 관전, 빠른 시뮬레이션 중 선택하세요.",
      p3Title: "클럽 전체를 만드세요", p3Body: "재정, 팬, 아카데미, 훈련장, 경기장을 성장시키세요.",
    },
    features: {
      eyebrow: "클럽 청사진", title: "모든 선택이", titleAccent: "시즌을 바꿉니다",
      description: "전술실에서 종료 휘슬까지, 모든 여정을 직접 이끄세요.",
      squadTitle: "나만의 베스트 11", squadBody: "선발, 벤치, 체력, 역할을 알맞게 관리하세요.",
      tacticsTitle: "나만의 스타일 완성", tacticsBody: "포메이션, 템포, 패스, 압박, 공격 성향을 조정하세요.",
      matchTitle: "3D 경기를 장악하세요", matchBody: "직접 플레이하거나 AI를 관전하고, 빠르게 결과를 확인하세요.",
      transferTitle: "계획에 맞게 영입", transferBody: "능력을 비교하고 전술에 필요한 선수를 찾으세요.",
      trophyTitle: "모든 트로피에 도전", trophyBody: "리그 순위를 올리고 컵 대회의 모든 라운드를 돌파하세요.",
      clubTitle: "클럽 전체를 성장", clubBody: "재정과 팬을 관리하고 아카데미, 훈련장, 경기장을 강화하세요.",
    },
    showcase: {
      eyebrow: "실제 게임 화면", title: "계획은 당신이.", titleAccent: "실행은 팀이.",
      description: "스쿼드, 3D 경기, 전술, 이적 시장, 컵 여정을 확인하세요.",
    },
    screens: {
      caption: "게임 화면", matchTab: "3D 경기", squadTab: "스쿼드", tacticsTab: "전술", transfersTab: "이적", competitionsTab: "대회",
      matchTitle: "경기를 장악하세요", matchBody: "터치라인에서 지시하고 경기장에서 직접 차이를 만드세요.", matchAlt: "Trophybound Manager 3D 경기 화면",
      squadTitle: "최고의 11명을 구성하세요", squadBody: "철학에 맞춰 역할, 체력, 선발, 벤치를 균형 있게 관리하세요.", squadAlt: "Trophybound Manager 스쿼드 화면",
      tacticsTitle: "스타일을 완성하세요", tacticsBody: "성향, 템포, 패스, 압박, 수비 라인, 공격 방향을 조정하세요.", tacticsAlt: "Trophybound Manager 전술 화면",
      transfersTitle: "필요한 선수를 찾으세요", transfersBody: "영입 가능한 선수를 비교해 스쿼드에 맞는 인재를 찾으세요.", transfersAlt: "Trophybound Manager 이적 시장 화면",
      competitionsTitle: "모든 트로피에 도전", competitionsBody: "대진표를 확인하고 매 라운드를 준비해 계속 전진하세요.", competitionsAlt: "Trophybound Manager 대회 화면",
    },
    trophies: {
      eyebrow: "트로피 로드맵", title: "국내 정상에서", titleAccent: "세계 무대까지",
      description: "현재 리그와 내셔널 컵을 플레이할 수 있습니다. 대회 허브에서 더 큰 무대로 가는 참가 조건도 확인하세요.",
      playable: "지금 플레이 가능", path: "해금 경로", playableShort: "플레이 가능", pathShort: "로드맵",
    },
    cups: {
      national: "내셔널 컵", nationalDesc: "14개 클럽 · 토너먼트", nationalAlt: "내셔널 컵 트로피",
      super: "내셔널 슈퍼컵", superDesc: "두 우승팀 · 단판", superAlt: "내셔널 슈퍼컵 트로피",
      regional: "지역 챔피언스컵", regionalDesc: "8개 클럽 · 대륙 무대로", regionalAlt: "지역 챔피언스컵 트로피",
      continental: "대륙 챔피언스컵", continentalDesc: "8개 클럽 · 세계 무대 티켓", continentalAlt: "대륙 챔피언스컵 트로피",
      challenge: "대륙 챌린지컵", challengeDesc: "8개 클럽 · 대륙 2부", challengeAlt: "대륙 챌린지컵 트로피",
      world: "클럽 월드 챔피언십", worldDesc: "8개 챔피언 · 최종 정상", worldAlt: "클럽 월드 챔피언십 트로피",
    },
    languages: {
      eyebrow: "국경 없는 축구", title: "당신의 언어로", titleAccent: "축구를 즐기세요",
      description: "게임과 이 웹사이트는 지원되는 15개 로케일 모두에서 이용할 수 있습니다.",
      note: "15개 언어를 모두 이 웹사이트에서 바로 선택할 수 있습니다.",
    },
    download: {
      eyebrow: "라커룸이 기다립니다", title: "클럽을 이끌", titleAccent: "준비가 됐나요?",
      description: "플랫폼을 선택하고 나만의 축구 이야기를 시작하세요.", note: "공식 출시 URL이 공개되면 링크가 활성화됩니다.",
    },
    footer: {
      tagline: "당신의 클럽. 당신의 전술. 당신의 이야기.", privacy: "개인정보 보호",
      terms: "이용약관", accountDeletion: "계정 삭제",
      disclaimer: "Trophybound Manager의 모든 클럽, 대회, 선수는 게임을 위해 제작되었습니다.", rights: "All rights reserved.",
    },
  },

  es: {
    meta: {
      title: "Trophybound Manager — Forma el equipo. Domina el partido.",
      description: "Forma tu plantilla, define la táctica y juega cada partido en 3D.",
    },
    a11y: {
      skip: "Saltar navegación", mainNav: "Navegación principal", mobileNav: "Navegación móvil", footerNav: "Navegación del pie",
      language: "Elegir idioma", openMenu: "Abrir menú", closeMenu: "Cerrar menú", brandHome: "Trophybound Manager — Inicio",
      storeLinks: "Enlaces de las tiendas", matchModes: "Modos de partido", featuredMatch: "Partido destacado",
      scroll: "Desplázate para explorar", highlights: "Aspectos destacados", gameplayTabs: "Galería de jugabilidad",
      gameLanguages: "Idiomas del juego", trophyScroller: "Lista de trofeos — usa las flechas para desplazarte",
    },
    nav: { game: "Juego", features: "Funciones", trophies: "Trofeos", languages: "Idiomas", download: "Descargar" },
    hero: {
      eyebrow: "GESTIÓN DE FÚTBOL DE NUEVA GENERACIÓN", title: "FORMA EL EQUIPO", titleAccent: "DOMINA EL PARTIDO",
      description: "Forma tu plantilla, define la táctica y juega cada partido en 3D.",
      modeControl: "Controlar", modeWatch: "Ver", modeQuick: "Simulación rápida",
      matchday: "DÍA DE PARTIDO", yourCall: "Tú tomas la decisión", explore: "EXPLORAR",
    },
    store: {
      coming: "PRÓXIMAMENTE EN", available: "DISPONIBLE EN",
      pending: "Los enlaces de las tiendas se añadirán cuando el juego se publique oficialmente.",
      toast: "El enlace oficial aún no está disponible. Se añadirá aquí durante el lanzamiento.",
    },
    metrics: { competitions: "competiciones en la ruta", locales: "configuraciones regionales", matchModes: "formas de vivir el partido", fictional: "mundo de fútbol original" },
    ticker: { squad: "CREA LA PLANTILLA", tactics: "DEFINE LA TÁCTICA", match: "DOMINA EL PARTIDO", glory: "PERSIGUE LA GLORIA" },
    overview: {
      eyebrow: "TU HISTORIA DE FÚTBOL", title: "MÁS QUE VIVIR EN", titleAccent: "LA BANDA",
      description: "Trophybound Manager une una gestión profunda con fútbol 3D jugable. Cada decisión previa se refleja cuando empieza el partido.",
      teamRating: "VALOR DEL EQUIPO", formation: "FORMACIÓN", balanced: "Equilibrada",
      p1Title: "Piensa como entrenador", p1Body: "Define roles, ritmo, presión e intención ofensiva para cada reto.",
      p2Title: "Responde en el campo", p2Body: "Controla el partido 3D, mira a la IA o usa la simulación rápida.",
      p3Title: "Construye todo el club", p3Body: "Haz crecer las finanzas, la afición, la academia y el estadio.",
    },
    features: {
      eyebrow: "EL PLANO DEL CLUB", title: "CADA DECISIÓN", titleAccent: "DEFINE LA TEMPORADA",
      description: "Desde la sala táctica hasta el pitido final, todo el viaje es tuyo.",
      squadTitle: "CREA TU ONCE", squadBody: "Elige titulares, organiza el banquillo, cuida la forma y asigna cada rol.",
      tacticsTitle: "DEFINE TU ESTILO", tacticsBody: "Ajusta formación, ritmo, pases, presión e intención ofensiva.",
      matchTitle: "TOMA EL CONTROL EN 3D", matchBody: "Juega, mira a la IA o usa la simulación rápida para avanzar.",
      transferTitle: "FICHA CON UN PLAN", transferBody: "Compara atributos y encuentra el perfil que necesita tu sistema.",
      trophyTitle: "LUCHA POR CADA TROFEO", trophyBody: "Sube en la liga y supera todas las rondas de copa.",
      clubTitle: "HAZ CRECER TODO EL CLUB", clubBody: "Gestiona finanzas y afición, y mejora academia, campo de entrenamiento y estadio.",
    },
    showcase: {
      eyebrow: "EXPERIENCIA REAL DEL JUEGO", title: "TÚ CREAS EL PLAN.", titleAccent: "EL EQUIPO RESPONDE.",
      description: "Descubre la plantilla, los partidos 3D, la táctica, el mercado y la ruta de copas.",
    },
    screens: {
      caption: "EN EL JUEGO", matchTab: "Partido 3D", squadTab: "Plantilla", tacticsTab: "Táctica", transfersTab: "Fichajes", competitionsTab: "Competiciones",
      matchTitle: "Toma el control", matchBody: "Decide desde la banda y crea la diferencia directamente en el campo.", matchAlt: "Pantalla de partido 3D de Trophybound Manager",
      squadTitle: "Construye tu mejor once", squadBody: "Equilibra roles, forma, titulares y banquillo según tu idea de fútbol.", squadAlt: "Pantalla de plantilla de Trophybound Manager",
      tacticsTitle: "Define tu estilo", tacticsBody: "Ajusta mentalidad, ritmo, pases, presión, línea defensiva y ataque.", tacticsAlt: "Pantalla de tácticas de Trophybound Manager",
      transfersTitle: "Encuentra la pieza que falta", transfersBody: "Compara el talento disponible y ficha el perfil adecuado.", transfersAlt: "Mercado de fichajes de Trophybound Manager",
      competitionsTitle: "Lucha por cada trofeo", competitionsBody: "Sigue el cuadro, prepara cada ronda y mantén viva la temporada.", competitionsAlt: "Cuadro de competición de Trophybound Manager",
    },
    trophies: {
      eyebrow: "LA RUTA DE LOS TROFEOS", title: "DE LA GLORIA NACIONAL", titleAccent: "A LA CIMA MUNDIAL",
      description: "La Liga y la Copa Nacional ya se pueden jugar. El Centro de Competiciones también muestra la ruta hacia escenarios mayores.",
      playable: "YA DISPONIBLE", path: "RUTA DE DESBLOQUEO", playableShort: "JUGAR", pathShort: "RUTA",
    },
    cups: {
      national: "COPA NACIONAL", nationalDesc: "14 clubes · Eliminatoria", nationalAlt: "Trofeo de la Copa Nacional",
      super: "SUPERCOPA NACIONAL", superDesc: "Dos campeones · Un partido", superAlt: "Trofeo de la Supercopa Nacional",
      regional: "COPA DE CAMPEONES REGIONALES", regionalDesc: "8 clubes · Camino continental", regionalAlt: "Trofeo regional",
      continental: "COPA DE CAMPEONES CONTINENTALES", continentalDesc: "8 clubes · Billete al mundo", continentalAlt: "Trofeo continental",
      challenge: "COPA DESAFÍO CONTINENTAL", challengeDesc: "8 clubes · Segundo nivel", challengeAlt: "Trofeo del Desafío Continental",
      world: "CAMPEONATO MUNDIAL DE CLUBES", worldDesc: "8 campeones · La cima final", worldAlt: "Trofeo del Mundial de Clubes",
    },
    languages: {
      eyebrow: "FÚTBOL SIN FRONTERAS", title: "VÍVELO EN", titleAccent: "TU IDIOMA",
      description: "El juego y esta web están disponibles en las 15 configuraciones regionales compatibles.",
      note: "Los 15 idiomas se pueden elegir directamente en esta web.",
    },
    download: {
      eyebrow: "EL VESTUARIO TE ESPERA", title: "¿LISTO PARA", titleAccent: "TOMAR EL MANDO?",
      description: "Elige tu plataforma y empieza a escribir tu historia de fútbol.", note: "Los botones esperan las URL oficiales de lanzamiento.",
    },
    footer: {
      tagline: "Tu club. Tu táctica. Tu historia.", privacy: "Privacidad",
      terms: "Términos", accountDeletion: "Eliminar cuenta",
      disclaimer: "Todos los clubes, competiciones y jugadores de Trophybound Manager han sido creados para el juego.", rights: "Todos los derechos reservados.",
    },
  },
};

Object.assign(translations, window.TROPHYBOUND_EXTRA_TRANSLATIONS ?? {});

const LOCALE_REGISTRY = Object.freeze({
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

const DEFAULT_LANGUAGE = "vi";

const screenAssets = Object.freeze({
  match: { file: "match", title: "screens.matchTitle", body: "screens.matchBody", alt: "screens.matchAlt" },
  squad: { file: "squad", title: "screens.squadTitle", body: "screens.squadBody", alt: "screens.squadAlt" },
  tactics: { file: "tactics", title: "screens.tacticsTitle", body: "screens.tacticsBody", alt: "screens.tacticsAlt" },
  transfers: { file: "transfers", title: "screens.transfersTitle", body: "screens.transfersBody", alt: "screens.transfersAlt" },
  competitions: { file: "competitions", title: "screens.competitionsTitle", body: "screens.competitionsBody", alt: "screens.competitionsAlt" },
});

const supportedLanguages = Object.keys(LOCALE_REGISTRY);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let currentLanguage = DEFAULT_LANGUAGE;
let currentScreen = "squad";
let toastTimer = 0;

function deepValue(object, path) {
  return path.split(".").reduce((value, key) => value?.[key], object);
}

function textFor(path, language = currentLanguage) {
  return deepValue(translations[language], path) ?? deepValue(translations.en, path) ?? path;
}

function resolveSupportedLanguage(language) {
  if (!language) return null;
  const normalized = String(language).trim().toLowerCase().replace("_", "-");
  const exact = supportedLanguages.find((candidate) => candidate.toLowerCase() === normalized);
  if (exact) return exact;

  const [base, region] = normalized.split("-");
  const regionalDefaults = {
    en: region === "sg" ? "en-SG" : "en",
    pt: region === "pt" ? "pt-PT" : "pt-BR",
    id: "id-ID",
    hi: "hi-IN",
  };
  const preferred = regionalDefaults[base] ?? base;
  return supportedLanguages.includes(preferred) ? preferred : null;
}

function safelyReadLanguage() {
  try {
    const stored = localStorage.getItem("trophybound-language");
    const resolvedStored = resolveSupportedLanguage(stored);
    if (resolvedStored) return resolvedStored;
  } catch {
    // Storage can be unavailable in strict privacy contexts; browser language still works.
  }

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const browserLanguage of browserLanguages) {
    const resolved = resolveSupportedLanguage(browserLanguage);
    if (resolved) return resolved;
  }
  return DEFAULT_LANGUAGE;
}

function safelyStoreLanguage(language) {
  try {
    localStorage.setItem("trophybound-language", language);
  } catch {
    // Language switching should never depend on storage being writable.
  }
}

function updateMetadata() {
  document.title = textFor("meta.title");
  const description = document.querySelector('meta[name="description"]');
  const openGraphTitle = document.querySelector('meta[property="og:title"]');
  const openGraphDescription = document.querySelector('meta[property="og:description"]');
  if (description) description.content = textFor("meta.description");
  if (openGraphTitle) openGraphTitle.content = textFor("meta.title");
  if (openGraphDescription) openGraphDescription.content = textFor("meta.description");
}

function updateStoreLinks() {
  document.querySelectorAll("[data-store-link]").forEach((link) => {
    const store = link.dataset.storeLink;
    const url = STORE_URLS[store]?.trim();
    const storeName = store === "appStore" ? "App Store" : "Google Play";
    const kicker = link.querySelector("[data-store-kicker]");

    if (kicker) kicker.textContent = textFor(url ? "store.available" : "store.coming");
    link.dataset.pending = String(!url);
    link.setAttribute("aria-label", `${storeName}: ${textFor(url ? "store.available" : "store.pending")}`);

    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-describedby");
    } else {
      link.href = "#download";
      link.removeAttribute("target");
      link.removeAttribute("rel");
      link.setAttribute("aria-describedby", "store-note");
    }
  });
}

function applyTranslations(language, { persist = false } = {}) {
  currentLanguage = resolveSupportedLanguage(language) ?? DEFAULT_LANGUAGE;
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = LOCALE_REGISTRY[currentLanguage].direction;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = textFor(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    element.setAttribute("aria-label", textFor(element.dataset.i18nAria));
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.alt = textFor(element.dataset.i18nAlt);
  });

  const select = document.querySelector("[data-language-select]");
  if (select) select.value = currentLanguage;

  updateMetadata();
  updateStoreLinks();
  activateScreen(currentScreen, false);
  updateMenuLabel();
  if (persist) safelyStoreLanguage(currentLanguage);
}

function showToast(message) {
  const toast = document.querySelector("[data-toast]");
  if (!toast) return;
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3800);
}

function initializeStoreButtons() {
  document.querySelectorAll("[data-store-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (link.dataset.pending !== "true") return;
      event.preventDefault();
      showToast(textFor("store.toast"));
    });
  });
}

function activateScreen(name, animate = true) {
  const asset = screenAssets[name];
  const picture = document.querySelector("[data-screen-picture]");
  const image = document.querySelector("[data-screen-image]");
  const avif = document.querySelector("[data-screen-avif]");
  const webp = document.querySelector("[data-screen-webp]");
  const title = document.querySelector("[data-screen-title]");
  const body = document.querySelector("[data-screen-body]");
  const panel = document.querySelector("#gameplay-panel");
  if (!asset || !picture || !image || !avif || !webp || !title || !body || !panel) return;

  currentScreen = name;
  document.querySelectorAll("[data-screen]").forEach((tab) => {
    const active = tab.dataset.screen === name;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  panel.setAttribute("aria-labelledby", `tab-${name}`);

  const update = () => {
    avif.srcset = `assets/images/gameplay/${asset.file}-760.avif 760w, assets/images/gameplay/${asset.file}-1400.avif 1400w`;
    webp.srcset = `assets/images/gameplay/${asset.file}-760.webp 760w, assets/images/gameplay/${asset.file}-1400.webp 1400w`;
    image.src = `assets/images/gameplay/${asset.file}-1400.webp`;
    image.alt = textFor(asset.alt);
    title.textContent = textFor(asset.title);
    body.textContent = textFor(asset.body);

    const revealImage = () => picture.classList.remove("is-changing");
    if (image.decode) image.decode().catch(() => {}).finally(revealImage);
    else image.addEventListener("load", revealImage, { once: true });
    window.setTimeout(revealImage, 700);
  };

  if (animate && !reduceMotion.matches) {
    picture.classList.add("is-changing");
    window.setTimeout(update, 130);
  } else {
    update();
  }
}

function initializeShowcase() {
  const tabs = [...document.querySelectorAll("[data-screen]:not([hidden])")];
  tabs.forEach((tab) => tab.addEventListener("click", () => activateScreen(tab.dataset.screen)));

  const tablist = document.querySelector('[role="tablist"]');
  tablist?.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const currentIndex = tabs.findIndex((tab) => tab.dataset.screen === currentScreen);
    let nextIndex = currentIndex;
    const inlineStep = document.documentElement.dir === "rtl" ? -1 : 1;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + inlineStep + tabs.length) % tabs.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - inlineStep + tabs.length) % tabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = tabs.length - 1;
    activateScreen(tabs[nextIndex].dataset.screen);
    tabs[nextIndex].focus();
  });
}

function initializeMenu() {
  const header = document.querySelector("[data-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (!header || !toggle || !menu) return;

  const closeMenu = ({ restoreFocus = false } = {}) => {
    toggle.setAttribute("aria-expanded", "false");
    menu.classList.remove("is-open");
    header.classList.remove("is-menu-open");
    updateMenuLabel();
    if (restoreFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    header.classList.toggle("is-menu-open", open);
    updateMenuLabel();
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      closeMenu({ restoreFocus: true });
    }
  });
}

function updateMenuLabel() {
  const toggle = document.querySelector("[data-menu-toggle]");
  if (!toggle) return;
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-label", textFor(open ? "a11y.closeMenu" : "a11y.openMenu"));
}

function initializeHeader() {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  update();
  window.addEventListener("scroll", update, { passive: true });

  const navigationLinks = [...document.querySelectorAll("[data-nav-link]")];
  const sections = [...new Set(navigationLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean))];
  if (!("IntersectionObserver" in window)) return;

  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navigationLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-20% 0px -68%", threshold: [0, 0.2, 0.5] });

  sections.forEach((section) => sectionObserver.observe(section));
}

function initializeReveals() {
  const elements = [...document.querySelectorAll(".reveal")];
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.12 });

  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
    observer.observe(element);
  });
}

function initializeCounters() {
  const counters = [...document.querySelectorAll("[data-counter]")];
  if (reduceMotion.matches || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.counter);
      const started = performance.now();
      const duration = 900;
      const tick = (now) => {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(element);
    });
  }, { threshold: 0.8 });

  counters.forEach((counter) => observer.observe(counter));
}

function initializeHeroMotion() {
  const hero = document.querySelector("[data-hero]");
  if (!hero || reduceMotion.matches || !window.matchMedia("(pointer: fine)").matches) return;

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    hero.style.setProperty("--hero-x", String(x * -9));
    hero.style.setProperty("--hero-y", String(y * -6));
  });
  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--hero-x", "0");
    hero.style.setProperty("--hero-y", "0");
  });
}

function initializeSpotlights() {
  if (reduceMotion.matches || !window.matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll("[data-spotlight]").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    });
  });
}

function initializeTrophyScroller() {
  const scroller = document.querySelector(".trophy-grid");
  if (!scroller) return;

  scroller.addEventListener("keydown", (event) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    if (event.key === "Home" || event.key === "End") {
      scroller.scrollTo({
        left: event.key === "Home" ? 0 : scroller.scrollWidth,
        behavior: reduceMotion.matches ? "auto" : "smooth",
      });
      return;
    }

    const firstCard = scroller.querySelector(".trophy-card");
    const styles = getComputedStyle(scroller);
    const gap = Number.parseFloat(styles.columnGap) || 0;
    const step = (firstCard?.getBoundingClientRect().width || scroller.clientWidth * 0.84) + gap;
    scroller.scrollBy({
      left: event.key === "ArrowRight" ? step : -step,
      behavior: reduceMotion.matches ? "auto" : "smooth",
    });
  });
}

function initializeLanguageSelector() {
  const select = document.querySelector("[data-language-select]");
  if (!select) return;

  const options = Object.entries(LOCALE_REGISTRY).map(([value, locale]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = locale.label;
    option.lang = value;
    option.dir = "auto";
    return option;
  });
  select.replaceChildren(...options);
  select.addEventListener("change", (event) => applyTranslations(event.target.value, { persist: true }));
}

function initialize() {
  const year = document.querySelector("[data-current-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  initializeStoreButtons();
  initializeShowcase();
  initializeMenu();
  initializeHeader();
  initializeReveals();
  initializeCounters();
  initializeHeroMotion();
  initializeSpotlights();
  initializeTrophyScroller();
  initializeLanguageSelector();
  applyTranslations(safelyReadLanguage());
}

initialize();
