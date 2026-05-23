// ============================================================
// translations.js
// Структура: ПЛОСКАЯ (все ключи через точку, без вложенных объектов)
//
// Разделы:
//   common.*        — общие слова
//   nav.*           — навигация
//   hero.*          — главный экран
//   footer.*        — подвал
//   features.*      — блок фич на главной
//   auth.*          — авторизация и регистрация
//   editProfile.*   — редактирование профиля
//   profile.*       — страница профиля
//   scanner.*       — сканер
//   slider.*        — слайдер советов
//   sidebar.*       — боковая панель
//   shop.*          — магазин
//   shopItems.*     — товары магазина
//   inventory.*     — инвентарь
//   achievements.*  — достижения (список + данные каждого)
//   activityHistory.* — история активности
//   feedback.*      — форма обратной связи
//   leagues.*       — лиги
//   about.*         — страница "О проекте"
// ============================================================

export const translations = {
  // ══════════════════════════════════════════════════════════
  // РУССКИЙ
  // ══════════════════════════════════════════════════════════
  ru: {
    // ── Общие слова ─────────────────────────────────────────
    "common.and": "и",
    "common.perScan": "за сканирование",
    "common.save": "Сохранить",
    "common.cancel": "Отмена",
    "common.edit": "редактировать",

    // ── Навигация ────────────────────────────────────────────
    "nav.profile": "Профиль",
    "nav.shop": "Магазин",
    "nav.logout": "Выход",
    "nav.login": "Войти",

    // ── Главный экран ────────────────────────────────────────
    "hero.loggedInTagline": "Система активна",
    "hero.tagline": "Система не активна",
    "hero.title": "Сделаем планету чище вместе",
    "hero.greeting": "Привет!",
    "hero.dashboard": "Эко-защитник",
    "hero.subtitle":
      "Используй AI для сканирования мусора и получай награды за экологичный образ жизни",
    "hero.cta": "Начать сканировать",
    "hero.signup": "Зарегистрироваться",
    "hero.welcome": "Рады видеть вас, уровень",

    // ── Подвал ───────────────────────────────────────────────
    "footer.about": "О нас",

    // ── Фичи на главной ─────────────────────────────────────
    "features.rules": "Эко-чек",
    "features.rulesEco": "Проверка правил в вашем регионе.",
    "features.progress": "Прогресс",
    "features.progressDesc": "Статистика твоего вклада в экологию.",
    "features.ai": "AI-Сканирование",
    "features.aiDesc":
      "Просто сфотографируй мусор через камеру, и наш AI скажет, как его правильно утилизировать",
    "features.rewards": "Получай награды",
    "features.rewardsDesc": "Каждый скан приносит эко-счёт и валюту O3",
    "features.community": "Сообщество экогероев",
    "features.communityDesc": "Соревнуйся в лигах и вдохновляй других",

    // ── Авторизация и регистрация ────────────────────────────
    "auth.title": "Присоединяйся к EcoSnap",
    "auth.subtitle": "Начни сканировать мусор и спасай планету",
    "auth.loginTitle": "Войти",
    "auth.loginSubtitle": "Начни сканировать",
    "auth.signupTitle": "Зарегистрироваться",
    "auth.signupSubtitle": "Начни сканировать",
    "auth.google": "Войти с Google",
    "auth.orMethod": "Google",
    "auth.loginPlaceholder": "Почта",
    "auth.password": "Пароль",
    "auth.login": "Войти",
    "auth.signup": "Создать аккаунт",
    "auth.alreadyHave": "Уже есть аккаунт?",
    "auth.noAccount": "Нет аккаунта?",
    "auth.forgotPassword": "Забыли пароль?",
    "auth.privacyPolicy": "Я ознакомлен и согласен с",
    "auth.privacyLink": "политикой конфиденциальности",
    "auth.privacyError":
      "Необходимо согласиться с политикой конфиденциальности для регистрации",
    "auth.privacyClose": "Понятно",

    // ── Редактирование профиля ───────────────────────────────
    "editProfile.title": "Редактировать профиль",
    "auth.nickname": "Никнейм",
    "auth.firstName": "Имя",
    "auth.lastName": "Фамилия",
    "auth.birthDate": "Дата рождения",
    "auth.country": "Страна",
    "auth.city": "Город",

    // ── Страница профиля ─────────────────────────────────────
    "profile.ecoScore": "Эко-счёт",
    "profile.ozone": "Валюта O3",
    "profile.ozoneShort": "O3",
    "profile.scans": "Сканы",
    "profile.level": "Уровень",
    "profile.achievements": "Достижения",
    "profile.inventory": "Инвентарь",
    "profile.stats": "Статистика",
    "profile.edit": "Эко-Профиль",
    "profile.levelReward": "Награда за уровень",
    "profile.scanRewards": "Награды за скан",
    "profile.nextLevel": "На уровне",
    "profile.allRewards": "Ты открыл все награды. Легенда!",
    "profile.notSpecified": "Не указан",
    "profile.earth": "Земля",
    "profile.rewardTable.level": "Уровень",
    "profile.rewardTable.ecoScore": "Награда эко-счёт",
    "profile.rewardTable.ozone": "Награда O3",
    "profile.stickerPack": "Стикеры:",
    "profile.badgeRecycle": "♻️ Эко",
    "profile.uploadPhoto": "Загрузить фото",
    "profile.uploadError": "Ошибка загрузки",

    // ── Сканер ───────────────────────────────────────────────
    "scanner.recyclable": "Перерабатываемый",
    "scanner.nonRecyclable": "Неперерабатываемый",
    "scanner.adviceTitle": "Совет по сортировке",
    "scanner.recommendedBin": "Рекомендуемый бак",

    "bins.paper": "Бак для бумаги",
    "bins.plastic": "Бак для пластика",
    "bins.glass": "Бак для стекла",
    "bins.metal": "Бак для металла",
    "bins.other": "Смешанные отходы",

    "scanner.title": "Сканер мусора",
    "scanner.hint": "Наведи камеру на предмет и нажми 'Сканировать'",
    "scanner.takePhoto": "Начать сканирование",
    "scanner.scan": "Сканировать",
    "scanner.advice-plastic":
      "Ополосните пластиковую бутылку, сожмите её для экономии места и снимите этикетку перед утилизацией.",
    "scanner.advice-glass":
      "Убедитесь, что стекло не разбито. Удалите металлические крышки и пробки.",
    "scanner.advice-metal":
      "Промойте жестяную банку от остатков пищи и аккуратно сожмите.",
    "scanner.advice-paper":
      "Очистите картон от скотча и масляных пятен, сложите его максимально плотно.",
    "scanner.advice-other":
      "Данный предмет относится к смешанным отходам. Поместите его в серый бак общего мусора.",
    "scanner.analysis": "Анализируем предмет...",
    "scanner.analysisError": "Не удалось связаться с сервером анализа.",
    "scanner.serverError": "Ошибка сервера при анализе.",
    "scanner.points": "Ты получил",
    "scanner.ecoScore": "эко-счёта",
    "scanner.ecoScoreLabel": "Eco Score",
    "scanner.ozone": "O3",
    "scanner.ozoneLabel": "Озон (O3)",
    "scanner.streak": "Стрик!",
    "scanner.close": "Закрыть",
    "scanner.finishButton": "Завершить и в профиль",
    "scanner.plastic": "Пластик (PET 01)",
    "scanner.unrecognizedTitle": "ПРЕДМЕТ НЕ РАСПОЗНАН",
    "scanner.unrecognizedInstructions":
      "Это не похоже на сортируемый мусор. Попробуйте отсканировать пластик, стекло, металл или бумагу.",
    "scanner.defaultBin": "соответствующий контейнер",
    "scanner.item": "предмет",
    "scanner.scannedPrefix": "Сканирован",
    "scanner.takeTo": "Отнести в",
    "scanner.regionAdvice": "Следуйте правилам сортировки вашего региона.",
    "scanner.harmPrefix": "Вред природе:",
    "scanner.harm.plastic":
      "Пластик разлагается сотни лет, загрязняя океаны и убивая морских животных.",
    "scanner.harm.glass":
      "Стекло безопасно, но его производство требует много энергии и ресурсов.",
    "scanner.harm.metal":
      "Металлы могут загрязнять почву и воду при неправильной утилизации, вызывая отравление.",
    "scanner.harm.paper":
      "Бумага из деревьев способствует вырубке лесов и потере биоразнообразия.",
    "scanner.harm.default":
      "Этот предмет может наносить вред окружающей среде при неправильной утилизации.",

    // ── Слайдер советов ──────────────────────────────────────
    "slider.tip.1":
      "Пластиковые бутылки разлагаются до 450 лет. Сдавай их на переработку!",
    "slider.tip.2":
      "Экономь энергию: выключай свет, когда выходишь из комнаты.",
    "slider.fact.1": "Переработка одной тонны бумаги спасает 17 деревьев.",
    "slider.motto.1": "Маленькие шаги ведут к большим переменам.",
    "slider.progress.prefix": "До уровня",
    "slider.progress.suffix": "осталось",
    "slider.progress.scans": "скана",
    "slider.stats.impact": "Твой вклад спас уже 5 виртуальных деревьев!",

    // ── Боковая панель ───────────────────────────────────────
    "sidebar.fight": "В БОЙ ЗА ЧИСТОТУ!",
    "sidebar.fightDesc": "Используй AI и получай награды",
    "sidebar.nextLevel": "Следующий уровень",
    "sidebar.league": "Эко-Рейтинг",
    "sidebar.leagueDesc": "Твой путь по лигам",
    "sidebar.yourLeague": "Твоя лига",
    "sidebar.ecoScoreLeague": "Эко-счёт",
    "sidebar.openLeagues": "Открыть лиги",
    "sidebar.leagueInfo":
      "Лиги - это способ соревноваться с другими игроками на основе вашего эко-счёта. Чем выше ваш счёт, тем выше лига и круче награды!",
    "sidebar.balance": "Твой баланс",
    "sidebar.marketplace": "Маркетплейс",
    "sidebar.exchange": "Обменяй энергию на награды",
    "sidebar.digitalGoods": "Цифровые товары",
    "sidebar.activatable": "Активируемые",
    "sidebar.regularGoods": "Обычные товары",
    "sidebar.collection": "Коллекция",
    "sidebar.logout": "Выйти",

    // ── Магазин — интерфейс ──────────────────────────────────
    "shop.title": "Магазин",
    "shop.back": "Назад",
    "shop.tabAll": "Все",
    "shop.tabDigital": "Цифровые",
    "shop.tabReal": "Реальные",
    "shop.tabCharity": "Благотворительность",
    "shop.active": "Активные",
    "shop.equip": "Применить",
    "shop.buy": "Купить",
    "shop.use": "Использовать",
    "shop.price": "Цена",
    "shop.description": "Описание",
    "shop.noMoney": "Недостаточно O3",

    // ── Магазин — товары ─────────────────────────────────────
    "shopItems.eco_sticker_pack.name": "Эко-стикеры",
    "shopItems.eco_sticker_pack.desc": "Набор стикеров для профиля",
    "shopItems.green_theme.name": "Зелёная тема",
    "shopItems.green_theme.desc": "Базовая эко-тема профиля",
    "shopItems.recycle_badge.name": "Бейдж переработки",
    "shopItems.recycle_badge.desc": "Показывает твою активность",
    "shopItems.animated_avatar.name": "Анимированный аватар",
    "shopItems.animated_avatar.desc": "Живой аватар для профиля",
    "shopItems.eco_trail.name": "Эко-эффект",
    "shopItems.eco_trail.desc": "След из листьев",
    "shopItems.nickname_color.name": "Цветной ник",
    "shopItems.nickname_color.desc": "Выделяйся среди других",
    "shopItems.golden_frame.name": "Золотая рамка",
    "shopItems.golden_frame.desc": "VIP рамка",
    "shopItems.profile_background_animated.name": "Анимированный фон",
    "shopItems.profile_background_animated.desc": "Двигающийся фон",
    "shopItems.eco_title.name": "Титул Эко-герой",
    "shopItems.eco_title.desc": "Особый статус",
    "shopItems.eco_tote.name": "Эко-сумка",
    "shopItems.eco_tote.desc": "Реальный мерч",
    "shopItems.tree_donation.name": "Посадка дерева",
    "shopItems.tree_donation.desc": "Помощь планете",
    "shopItems.eco_hoodie.name": "Эко-худи",
    "shopItems.eco_hoodie.desc": "Мерч для топов",
    "shopItems.forest_sponsor.name": "Спонсор леса",
    "shopItems.forest_sponsor.desc": "Посадка нескольких деревьев",
    "shopItems.founder_badge.name": "Бейдж основателя",
    "shopItems.founder_badge.desc": "Уникальный статус",

    // ── Инвентарь ────────────────────────────────────────────
    "inventory.title": "Инвентарь",
    "inventory.noItems": "Инвентарь пуст",
    "inventory.selected": "Сейчас выбрано",
    "inventory.noneActive": "Пока ничего не активировано",
    "inventory.active": "Активно",
    "inventory.noDesc": "Нет описания",
    "inventory.noDigital": "Цифровых улучшений пока нет",
    "inventory.autoOptimize": "Авто-оптимизировать",
    "inventory.apply": "Применить изменения",
    "inventory.regular_title": "Обычные товары",
    "inventory.close": "Закрыть",
    "inventory.saveError": "Ошибка сохранения, попробуйте ещё раз",

    // ── Достижения — интерфейс ───────────────────────────────
    "achievements.collection": "Коллекция достижений",
    "achievements.showAll": "Посмотреть все",
    "achievements.hide": "Скрыть",
    "achievements.Title": "Награда",
    "achievements.statusReceived": "Уже получено",
    "achievements.statusClosed": "Пока закрыто",
    "achievements.howToLabel": "Как получить",

    // ── Достижения — данные ──────────────────────────────────
    "achievements.streak_10.name": "10 дней",
    "achievements.streak_10.desc": "Вы с EcoSnap уже 10 дней подряд!",
    "achievements.streak_10.howTo":
      "Сканируй мусор 10 дней подряд без пропусков.",

    "achievements.streak_50.name": "Полгорода",
    "achievements.streak_50.desc": "50 дней активной заботы об экологии",
    "achievements.streak_50.howTo":
      "Сканируй мусор 50 дней подряд без пропусков.",

    "achievements.streak_100.name": "Центурион",
    "achievements.streak_100.desc": "100 дней! Вами гордится планета",
    "achievements.streak_100.howTo":
      "Сканируй мусор 100 дней подряд без пропусков.",

    "achievements.streak_300.name": "Эко-Бог",
    "achievements.streak_300.desc": "300 дней. Статус легенды достигнут",
    "achievements.streak_300.howTo":
      "Сканируй мусор 300 дней подряд без пропусков.",

    "achievements.first_scan.name": "Старт",
    "achievements.first_scan.desc": "Ваш первый вклад в чистоту планеты",
    "achievements.first_scan.howTo":
      "Сделай свой первый скан через экран сканера.",

    "achievements.plastic_10.name": "Пластик-стоп",
    "achievements.plastic_10.desc": "10 объектов спасено от свалки",
    "achievements.plastic_10.howTo": "Сканируй пластик 10 раз.",

    "achievements.glass_10.name": "Стеклянный глаз",
    "achievements.glass_10.desc": "10 стеклянных бутылок собрано",
    "achievements.glass_10.howTo": "Сканируй стекло 10 раз.",

    "achievements.paper_10.name": "Бумажный тигр",
    "achievements.paper_10.desc": "10 картонных упаковок переработано",
    "achievements.paper_10.howTo": "Сканируй бумагу 10 раз.",

    "achievements.metal_10.name": "Железный чел",
    "achievements.metal_10.desc": "10 жестяных банок в деле",
    "achievements.metal_10.howTo": "Сканируй металл 10 раз.",

    "achievements.rich_100.name": "Сотка",
    "achievements.rich_100.desc": "Вы заработали первые 100 O3",
    "achievements.rich_100.howTo": "Накопи минимум 100 O3.",

    "achievements.rich_1000.name": "Миллионер",
    "achievements.rich_1000.desc": "На вашем счету более 1000 O3",
    "achievements.rich_1000.howTo": "Накопи минимум 1000 O3.",

    "achievements.lvl_10.name": "Десятка",
    "achievements.lvl_10.desc": "Вы достигли 10 уровня прогресса",
    "achievements.lvl_10.howTo": "Достигни 10 уровня.",

    "achievements.lvl_50.name": "На Марс!",
    "achievements.lvl_50.desc": "Вы достигли 50 уровня!",
    "achievements.lvl_50.howTo": "Достигни 50 уровня.",

    "achievements.night_owl.name": "Сова",
    "achievements.night_owl.desc": "Сканирование мусора ночью",
    "achievements.night_owl.howTo": "Сделай скан после 22:00.",

    "achievements.early_bird.name": "Пташка",
    "achievements.early_bird.desc": "Сканирование мусора ранним утром",
    "achievements.early_bird.howTo": "Сделай скан до 08:00.",

    "achievements.traveler.name": "Турист",
    "achievements.traveler.desc": "Скан в другом городе или стране",
    "achievements.traveler.howTo": "Сканируй вне домашнего города.",

    "achievements.fast_scanner.name": "Скорость",
    "achievements.fast_scanner.desc": "3 скана менее чем за минуту",
    "achievements.fast_scanner.howTo": "Сделай 3 скана за минуту.",

    "achievements.eco_hero.name": "Герой",
    "achievements.eco_hero.desc": "Спасено более 10 виртуальных деревьев",
    "achievements.eco_hero.howTo": "Спаси 10 деревьев.",

    "achievements.perfect_profile.name": "Перфекционист",
    "achievements.perfect_profile.desc": "Все данные профиля заполнены",
    "achievements.perfect_profile.howTo": "Заполни весь профиль.",

    "achievements.inviter.name": "Друг",
    "achievements.inviter.desc": "Ваш реферальный код был использован",
    "achievements.inviter.howTo": "Пригласи друга.",

    // ── История активности ───────────────────────────────────
    "activityHistory.title": "История активности",
    "activityHistory.empty": "История активности пуста",

    // ── Обратная связь ───────────────────────────────────────
    "feedback.button": "Отзыв",
    "feedback.title": "Помоги нам стать лучше",
    "feedback.placeholder": "Опишите вашу идею или проблему...",
    "feedback.send": "Отправить",
    "feedback.success": "Спасибо! Эко-сообщество ценит ваш вклад.",
    "feedback.category.bug": "Ошибка",
    "feedback.category.idea": "Идея",
    "feedback.category.review": "Отзыв",

    // ── Лиги — интерфейс ─────────────────────────────────────
    "leagues.title": "Лиги EcoSnap",
    "leagues.currentLeague": "Текущая лига",
    "leagues.toNextLeague": "До",
    "leagues.maxReached":
      "Максимальная лига достигнута. Ты легенда экосистемы!",
    "leagues.threshold": "Порог",
    "leagues.points": "очков",

    // ── Лиги — данные ────────────────────────────────────────
    "leagues.seed.name": "Лига Семени",
    "leagues.seed.desc": "Первые шаги в экопривычках.",
    "leagues.sprout.name": "Лига Ростка",
    "leagues.sprout.desc": "Ты уже стабильно сканируешь и набираешь темп.",
    "leagues.forest.name": "Лига Леса",
    "leagues.forest.desc": "Твой вклад заметен, ты строишь зеленое будущее.",
    "leagues.ocean.name": "Лига Океана",
    "leagues.ocean.desc": "Сильный эко-игрок с большой ежедневной активностью.",
    "leagues.planet.name": "Лига Планеты",
    "leagues.planet.desc": "Ты вдохновляешь других и влияешь на экосообщество.",
    "leagues.legend.name": "Лига Легенд",
    "leagues.legend.desc": "Элитный защитник экологии. Максимальный ранг.",

    // ── О проекте ────────────────────────────────────────────
    "about.title": "О проекте EcoSnap",
    "about.subtitle": "Твой AI-помощник в сортировке отходов",

    "about.whoTitle": "Кто мы такие",
    "about.whoDesc":
      "Мы — команда разработчиков и энтузиастов, которым не всё равно, что происходит с окружающей средой.",
    "about.whoMission":
      "EcoSnap был создан как простой и удобный инструмент, который помогает людям правильно сортировать отходы без сложных правил.",

    "about.whyTitle": "Почему мы это делаем",
    "about.problems.1": "Не знают правил",
    "about.problems.2": "Путаются в категориях",
    "about.problems.3": "Тратят время на поиск",
    "about.solution": "Мы решили это исправить с помощью AI.",

    "about.howTitle": "Как это работает",
    "about.steps.1": "Наведи камеру",
    "about.steps.2": "AI определит тип",
    "about.steps.3": "Получи инструкцию",
    "about.steps.4": "Сделай вклад",

    "about.featuresTitle": "Особенности",
    "about.featuresList.1": "Мгновенное распознавание",
    "about.featuresList.2": "Умные подсказки",
    "about.featuresList.3": "Геймификация (эко-счёт)",
    "about.featuresList.4": "Реальное влияние",

    "about.aboutUsTitle": "Немного о нас",
    "about.aboutUsDesc":
      "Проект создан как современное решение для нового поколения, которое хочет жить осознанно и использовать технологии во благо.",
    "activityHistory.showMore": "Показать все",
    "activityHistory.showLess": "Свернуть",
  },

  // ══════════════════════════════════════════════════════════
  // АНГЛИЙСКИЙ
  // ══════════════════════════════════════════════════════════
  en: {
    // ── Общие слова ─────────────────────────────────────────
    "common.and": "and",
    "common.perScan": "per Scan",
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "edit",

    // ── Навигация ────────────────────────────────────────────
    "nav.profile": "Profile",
    "nav.shop": "Shop",
    "nav.logout": "Logout",
    "nav.login": "Login",

    // ── Главный экран ────────────────────────────────────────
    "hero.loggedInTagline": "System active",
    "hero.tagline": "System not active",
    "hero.title": "Let's make the planet cleaner together",
    "hero.greeting": "Hi!",
    "hero.dashboard": "Eco Defender",
    "hero.subtitle": "Use AI to scan waste and earn rewards",
    "hero.cta": "Start scanning",
    "hero.signup": "Sign up",
    "hero.welcome": "Welcome back, level",

    // ── Подвал ───────────────────────────────────────────────
    "footer.about": "About us",

    // ── Фичи на главной ─────────────────────────────────────
    "features.rules": "Eco Check",
    "features.rulesEco": "Check local recycling rules",
    "features.progress": "Progress",
    "features.progressDesc": "Your contribution stats",
    "features.ai": "AI Scanning",
    "features.aiDesc": "Take a photo and AI will classify the waste",
    "features.rewards": "Earn rewards",
    "features.rewardsDesc": "Every scan gives eco-score and O3",
    "features.community": "Eco Heroes",
    "features.communityDesc": "Compete and inspire others",

    // ── Авторизация и регистрация ────────────────────────────
    "auth.title": "Join EcoSnap",
    "auth.subtitle": "Start scanning waste",
    "auth.loginTitle": "Log In",
    "auth.loginSubtitle": "Start now",
    "auth.signupTitle": "Sign Up",
    "auth.signupSubtitle": "Start now",
    "auth.google": "Sign in with Google",
    "auth.orMethod": "Google",
    "auth.loginPlaceholder": "Email",
    "auth.password": "Password",
    "auth.login": "Login",
    "auth.signup": "Sign up",
    "auth.alreadyHave": "Already have an account?",
    "auth.noAccount": "No account?",
    "auth.forgotPassword": "Reset Password",
    "auth.privacyPolicy": "I have read and agree to the",
    "auth.privacyLink": "privacy policy",
    "auth.privacyError": "You must agree to the privacy policy to register",
    "auth.privacyClose": "Got it",

    // ── Редактирование профиля ───────────────────────────────
    "editProfile.title": "Edit Profile",
    "auth.nickname": "Nickname",
    "auth.firstName": "First Name",
    "auth.lastName": "Last Name",
    "auth.birthDate": "Date of Birth",
    "auth.country": "Country",
    "auth.city": "City",

    // ── Страница профиля ─────────────────────────────────────
    "profile.ecoScore": "Eco Score",
    "profile.ozone": "OZ Currency",
    "profile.ozoneShort": "OZ",
    "profile.scans": "Scans",
    "profile.level": "Level",
    "profile.achievements": "Achievements",
    "profile.inventory": "Inventory",
    "profile.stats": "Statistics",
    "profile.edit": "Eco Profile",
    "profile.levelReward": "Level Reward",
    "profile.scanRewards": "Scan Rewards",
    "profile.nextLevel": "At level",
    "profile.allRewards": "All rewards unlocked",
    "profile.notSpecified": "Not specified",
    "profile.earth": "Earth",
    "profile.rewardTable.level": "Level",
    "profile.rewardTable.ecoScore": "Eco Score Reward",
    "profile.rewardTable.ozone": "O3 Reward",
    "profile.stickerPack": "Stickers:",
    "profile.badgeRecycle": "♻️ Eco",
    "profile.uploadPhoto": "Upload Photo",
    "profile.uploadError": "Upload failed",

    // ── Сканер ───────────────────────────────────────────────
    "scanner.recyclable": "Recyclable",
    "scanner.nonRecyclable": "Non-Recyclable",
    "scanner.adviceTitle": "Sorting Advice",
    "scanner.recommendedBin": "Recommended Bin",
    "bins.paper": "Paper & Cardboard Bin",
    "bins.plastic": "Plastic Recycling Bin",
    "bins.glass": "Glass Container",
    "bins.metal": "Metal Recycling Bin",
    "bins.other": "General Waste Bin",
    "scanner.title": "Waste Scanner",
    "scanner.hint": "Point your camera at an item and press 'Scan'",
    "scanner.takePhoto": "Take Photo",
    "scanner.advice-plastic":
      "Rinse the plastic bottle, crush it to save space, and remove the label before disposal.",
    "scanner.advice-glass":
      "Make sure the glass is not broken. Remove metal caps and lids.",
    "scanner.advice-metal":
      "Rinse the tin can of food residue and gently crush it.",
    "scanner.advice-paper":
      "Remove tape and grease stains from cardboard, and fold it as flat as possible.",
    "scanner.advice-other":
      "This item belongs to mixed waste. Place it in the gray general waste bin.",
    "scanner.scan": "Scan",
    "scanner.analysis": "Analyzing item...",
    "scanner.analysisError": "Unable to contact the analysis server.",
    "scanner.serverError": "Server error during analysis.",
    "scanner.points": "You earned",
    "scanner.ecoScore": "eco-score",
    "scanner.ecoScoreLabel": "Eco Score",
    "scanner.ozone": "OZ",
    "scanner.ozoneLabel": "Ozone (O3)",
    "scanner.streak": "Streak!",
    "scanner.close": "Close",
    "scanner.finishButton": "Finish and go to Profile",
    "scanner.plastic": "Plastic (PET 01)",
    "scanner.unrecognizedTitle": "ITEM NOT RECOGNIZED",
    "scanner.unrecognizedInstructions":
      "This does not look like recyclable waste. Try scanning plastic, glass, metal, or paper.",
    "scanner.defaultBin": "the appropriate bin",
    "scanner.item": "item",
    "scanner.scannedPrefix": "Scanned",
    "scanner.takeTo": "Take it to",
    "scanner.regionAdvice": "Follow your region's recycling rules.",
    "scanner.harmPrefix": "Environmental harm:",
    "scanner.harm.plastic":
      "Plastic takes centuries to decompose, polluting oceans and harming wildlife.",
    "scanner.harm.glass":
      "Glass is safe, but its production consumes a lot of energy and resources.",
    "scanner.harm.metal":
      "Metals can contaminate soil and water if disposed of incorrectly.",
    "scanner.harm.paper":
      "Paper contributes to deforestation and biodiversity loss.",
    "scanner.harm.default":
      "This item may harm the environment if disposed of improperly.",

    // ── Слайдер советов ──────────────────────────────────────
    "slider.tip.1":
      "Plastic bottles take up to 450 years to decompose. Recycle them!",
    "slider.tip.2": "Save energy: turn off the lights when leaving a room.",
    "slider.fact.1": "Recycling one ton of paper saves 17 trees.",
    "slider.motto.1": "Small steps lead to big changes.",
    "slider.progress.prefix": "Only",
    "slider.progress.suffix": "scans left until level",
    "slider.progress.scans": "scans",
    "slider.stats.impact": "Your contribution saved 5 virtual trees!",

    // ── Боковая панель ───────────────────────────────────────
    "sidebar.fight": "FIGHT FOR CLEANLINESS!",
    "sidebar.fightDesc": "Use AI and earn rewards",
    "sidebar.nextLevel": "Next level",
    "sidebar.league": "Eco Ranking",
    "sidebar.leagueDesc": "Your league path",
    "sidebar.yourLeague": "Your league",
    "sidebar.ecoScoreLeague": "Eco Score",
    "sidebar.openLeagues": "Open leagues",
    "sidebar.leagueInfo":
      "Leagues are a way to compete with other players based on your eco-score. The higher your score, the higher the league and cooler rewards!",
    "sidebar.balance": "Your balance",
    "sidebar.marketplace": "Marketplace",
    "sidebar.exchange": "Exchange energy for rewards",
    "sidebar.digitalGoods": "Digital Goods",
    "sidebar.activatable": "Activatable",
    "sidebar.regularGoods": "Regular Goods",
    "sidebar.collection": "Collection",
    "sidebar.logout": "Logout",

    // ── Магазин — интерфейс ──────────────────────────────────
    "shop.title": "Shop",
    "shop.back": "Back",
    "shop.tabAll": "All",
    "shop.tabDigital": "Digital",
    "shop.tabReal": "Real",
    "shop.tabCharity": "Charity",
    "shop.active": "Active",
    "shop.equip": "Equip",
    "shop.equipLoading": "Equipping...",
    "shop.buy": "Buy",
    "shop.buyLoading": "Buying...",
    "shop.use": "Use",
    "shop.price": "Price",
    "shop.description": "Description",
    "shop.noMoney": "Not enough OZ",
    "shop.successBuy": "Purchase successful!",
    "shop.errorBuy": "Purchase failed",
    "shop.successEquip": "Item equipped!",
    "shop.errorEquip": "Equip failed",

    // ── Магазин — товары ─────────────────────────────────────
    "shopItems.eco_sticker_pack.name": "Eco Stickers",
    "shopItems.eco_sticker_pack.desc": "Sticker pack for profile",
    "shopItems.green_theme.name": "Green Theme",
    "shopItems.green_theme.desc": "Basic eco profile theme",
    "shopItems.recycle_badge.name": "Recycle Badge",
    "shopItems.recycle_badge.desc": "Shows your activity",
    "shopItems.animated_avatar.name": "Animated Avatar",
    "shopItems.animated_avatar.desc": "Live profile avatar",
    "shopItems.eco_trail.name": "Eco Trail",
    "shopItems.eco_trail.desc": "Leaf trail effect",
    "shopItems.nickname_color.name": "Colored Nickname",
    "shopItems.nickname_color.desc": "Stand out",
    "shopItems.golden_frame.name": "Golden Frame",
    "shopItems.golden_frame.desc": "VIP frame",
    "shopItems.profile_background_animated.name": "Animated Background",
    "shopItems.profile_background_animated.desc": "Moving background",
    "shopItems.eco_title.name": "Eco Hero Title",
    "shopItems.eco_title.desc": "Special status",
    "shopItems.eco_tote.name": "Eco Tote",
    "shopItems.eco_tote.desc": "Real merch",
    "shopItems.tree_donation.name": "Plant a Tree",
    "shopItems.tree_donation.desc": "Help the planet",
    "shopItems.eco_hoodie.name": "Eco Hoodie",
    "shopItems.eco_hoodie.desc": "Top user merch",
    "shopItems.forest_sponsor.name": "Forest Sponsor",
    "shopItems.forest_sponsor.desc": "Funds multiple trees",
    "shopItems.founder_badge.name": "Founder Badge",
    "shopItems.founder_badge.desc": "Unique status",

    // ── Инвентарь ────────────────────────────────────────────
    "inventory.title": "Inventory",
    "inventory.noItems": "Inventory is empty",
    "inventory.selected": "Currently selected",
    "inventory.noneActive": "Nothing activated yet",
    "inventory.active": "Active",
    "inventory.noDesc": "No description",
    "inventory.noDigital": "No digital upgrades yet",
    "inventory.autoOptimize": "Auto Optimize",
    "inventory.apply": "Apply Changes",
    "inventory.regular_title": "Regular Goods",
    "inventory.close": "Close",
    "inventory.saveError": "Save error, please try again",

    // ── Достижения — интерфейс ───────────────────────────────
    "achievements.collection": "Achievement Collection",
    "achievements.showAll": "Show all",
    "achievements.hide": "Hide",
    "achievements.Title": "Award",
    "achievements.statusReceived": "Already received",
    "achievements.statusClosed": "Closed",
    "achievements.howToLabel": "How to get",

    // ── Достижения — данные ──────────────────────────────────
    "achievements.streak_10.name": "10 Days",
    "achievements.streak_10.desc":
      "You've been with EcoSnap for 10 days in a row!",
    "achievements.streak_10.howTo":
      "Scan waste for 10 consecutive days without missing one.",

    "achievements.streak_50.name": "Half the City",
    "achievements.streak_50.desc": "50 days of active eco care",
    "achievements.streak_50.howTo": "Scan waste for 50 consecutive days.",

    "achievements.streak_100.name": "Centurion",
    "achievements.streak_100.desc": "100 days! The planet is proud of you",
    "achievements.streak_100.howTo": "Scan waste for 100 consecutive days.",

    "achievements.streak_300.name": "Eco God",
    "achievements.streak_300.desc": "300 days. Legendary status achieved",
    "achievements.streak_300.howTo": "Scan waste for 300 consecutive days.",

    "achievements.first_scan.name": "Start",
    "achievements.first_scan.desc":
      "Your first contribution to a cleaner planet",
    "achievements.first_scan.howTo":
      "Complete your first scan using the scanner.",

    "achievements.plastic_10.name": "Plastic Stop",
    "achievements.plastic_10.desc": "10 plastic items saved from landfill",
    "achievements.plastic_10.howTo": "Scan plastic 10 times.",

    "achievements.glass_10.name": "Glass Eye",
    "achievements.glass_10.desc": "10 glass bottles collected",
    "achievements.glass_10.howTo": "Scan glass 10 times.",

    "achievements.paper_10.name": "Paper Tiger",
    "achievements.paper_10.desc": "10 cardboard packages recycled",
    "achievements.paper_10.howTo": "Scan paper 10 times.",

    "achievements.metal_10.name": "Iron Hero",
    "achievements.metal_10.desc": "10 metal cans recycled",
    "achievements.metal_10.howTo": "Scan metal 10 times.",

    "achievements.rich_100.name": "First Hundred",
    "achievements.rich_100.desc": "You earned your first 100 O3",
    "achievements.rich_100.howTo": "Collect at least 100 O3.",

    "achievements.rich_1000.name": "Millionaire",
    "achievements.rich_1000.desc": "You have more than 1000 O3",
    "achievements.rich_1000.howTo": "Collect at least 1000 O3.",

    "achievements.lvl_10.name": "Level Ten",
    "achievements.lvl_10.desc": "You reached level 10",
    "achievements.lvl_10.howTo": "Reach level 10.",

    "achievements.lvl_50.name": "To Mars!",
    "achievements.lvl_50.desc": "You reached level 50!",
    "achievements.lvl_50.howTo": "Reach level 50.",

    "achievements.night_owl.name": "Night Owl",
    "achievements.night_owl.desc": "Scanning waste at night",
    "achievements.night_owl.howTo": "Complete a scan after 10 PM.",

    "achievements.early_bird.name": "Early Bird",
    "achievements.early_bird.desc": "Scanning waste early in the morning",
    "achievements.early_bird.howTo": "Complete a scan before 8 AM.",

    "achievements.traveler.name": "Traveler",
    "achievements.traveler.desc": "Scanned in another city or country",
    "achievements.traveler.howTo": "Scan outside your home city.",

    "achievements.fast_scanner.name": "Speedster",
    "achievements.fast_scanner.desc": "3 scans in under a minute",
    "achievements.fast_scanner.howTo": "Complete 3 scans within one minute.",

    "achievements.eco_hero.name": "Hero",
    "achievements.eco_hero.desc": "Saved more than 10 virtual trees",
    "achievements.eco_hero.howTo": "Save 10 trees.",

    "achievements.perfect_profile.name": "Perfectionist",
    "achievements.perfect_profile.desc": "All profile information completed",
    "achievements.perfect_profile.howTo": "Fill out your entire profile.",

    "achievements.inviter.name": "Friend",
    "achievements.inviter.desc": "Your referral code was used",
    "achievements.inviter.howTo": "Invite a friend.",

    // ── История активности ───────────────────────────────────
    "activityHistory.title": "Activity History",
    "activityHistory.empty": "Activity history is empty",

    // ── Обратная связь ───────────────────────────────────────
    "feedback.button": "Feedback",
    "feedback.title": "Help us improve",
    "feedback.placeholder": "Describe your idea or issue...",
    "feedback.send": "Send",
    "feedback.success": "Thanks! The eco-community values your input.",
    "feedback.category.bug": "Bug",
    "feedback.category.idea": "Idea",
    "feedback.category.review": "Review",

    // ── Лиги — интерфейс ─────────────────────────────────────
    "leagues.title": "EcoSnap Leagues",
    "leagues.currentLeague": "Current League",
    "leagues.toNextLeague": "Until",
    "leagues.maxReached":
      "Maximum league reached. You are an ecosystem legend!",
    "leagues.threshold": "Threshold",
    "leagues.points": "points",

    // ── Лиги — данные ────────────────────────────────────────
    "leagues.seed.name": "Seed League",
    "leagues.seed.desc": "Your first steps toward eco-friendly habits.",
    "leagues.sprout.name": "Sprout League",
    "leagues.sprout.desc":
      "You're scanning consistently and building momentum.",
    "leagues.forest.name": "Forest League",
    "leagues.forest.desc":
      "Your contribution is noticeable — you're building a greener future.",
    "leagues.ocean.name": "Ocean League",
    "leagues.ocean.desc": "A strong eco-player with impressive daily activity.",
    "leagues.planet.name": "Planet League",
    "leagues.planet.desc": "You inspire others and shape the eco-community.",
    "leagues.legend.name": "Legend League",
    "leagues.legend.desc":
      "An elite defender of the environment. The highest rank.",

    // ── О проекте ────────────────────────────────────────────
    "about.title": "About EcoSnap",
    "about.subtitle": "Your AI assistant for waste sorting",

    "about.whoTitle": "Who We Are",
    "about.whoDesc":
      "We are a team of developers and enthusiasts who care deeply about the environment.",
    "about.whoMission":
      "EcoSnap was created as a simple and convenient tool to help people sort waste correctly without complicated rules.",

    "about.whyTitle": "Why We Do This",
    "about.problems.1": "People don't know the rules",
    "about.problems.2": "They get confused by categories",
    "about.problems.3": "They waste time searching for answers",
    "about.solution": "We decided to solve this with AI.",

    "about.howTitle": "How It Works",
    "about.steps.1": "Point your camera",
    "about.steps.2": "AI identifies the waste type",
    "about.steps.3": "Get clear instructions",
    "about.steps.4": "Make an impact",

    "about.featuresTitle": "Features",
    "about.featuresList.1": "Instant recognition",
    "about.featuresList.2": "Smart recommendations",
    "about.featuresList.3": "Gamification (eco score)",
    "about.featuresList.4": "Real-world impact",

    "about.aboutUsTitle": "A Bit About Us",
    "about.aboutUsDesc":
      "This project was created as a modern solution for a new generation that wants to live consciously and use technology for good.",
    "activityHistory.showMore": "Show all",
    "activityHistory.showLess": "Show less",
  },

  // ══════════════════════════════════════════════════════════
  // НЕМЕЦКИЙ
  // ══════════════════════════════════════════════════════
  de: {
    // ── Общие слова ─────────────────────────────────────────
    "common.and": "und",
    "common.perScan": "pro Scan",
    "common.save": "Änderungen speichern",
    "common.cancel": "Abbrechen",
    "common.edit": "bearbeiten",

    // ── Навигация ────────────────────────────────────────────
    "nav.profile": "Profil",
    "nav.shop": "Shop",
    "nav.logout": "Abmelden",
    "nav.login": "Anmelden",

    // ── Главный экран ────────────────────────────────────────
    "hero.loggedInTagline": "System aktiv",
    "hero.tagline": "System nicht aktiv",
    "hero.title": "Lasst uns gemeinsam den Planeten sauberer machen",
    "hero.greeting": "Hallo!",
    "hero.dashboard": "Öko-Verteidiger",
    "hero.subtitle": "Nutze KI zum Müllscannen und sammle Belohnungen",
    "hero.cta": "Scannen starten",
    "hero.signup": "Registrieren",
    "hero.welcome": "Willkommen zurück, Stufe",

    // ── Подвал ───────────────────────────────────────────────
    "footer.about": "Über uns",

    // ── Фичи на главной ─────────────────────────────────────
    "features.rules": "Öko-Check",
    "features.rulesEco": "Regeln in deiner Region prüfen",
    "features.progress": "Fortschritt",
    "features.progressDesc": "Dein Umweltbeitrag",
    "features.ai": "KI-Scanning",
    "features.aiDesc": "Mache ein Foto und KI erkennt den Müll",
    "features.rewards": "Belohnungen verdienen",
    "features.rewardsDesc": "Jeder Scan bringt OZ",
    "features.community": "Öko-Helden",
    "features.communityDesc": "Tritt Ligen bei",

    // ── Авторизация и регистрация ────────────────────────────
    "auth.title": "Tritt EcoSnap bei",
    "auth.subtitle": "Starte jetzt",
    "auth.loginTitle": "Tritt EcoSnap bei",
    "auth.loginSubtitle": "Starte jetzt",
    "auth.signupTitle": "Registrieren",
    "auth.signupSubtitle": "Starte jetzt",
    "auth.google": "Mit Google anmelden",
    "auth.orMethod": "Google",
    "auth.loginPlaceholder": "E-Mail",
    "auth.password": "Passwort",
    "auth.login": "Anmelden",
    "auth.signup": "Registrieren",
    "auth.alreadyHave": "Schon ein Konto?",
    "auth.noAccount": "Noch kein Konto?",
    "auth.forgotPassword": "Passwort zurücksetzen",
    "auth.privacyPolicy": "Ich habe die",
    "auth.privacyLink": "Datenschutzrichtlinie",
    "auth.privacyError":
      "Sie müssen der Datenschutzrichtlinie zustimmen, um sich zu registrieren",
    "auth.privacyClose": "Verstanden",

    // ── Редактирование профиля ───────────────────────────────
    "editProfile.title": "Profil bearbeiten",
    "auth.nickname": "Benutzername",
    "auth.firstName": "Vorname",
    "auth.lastName": "Nachname",
    "auth.birthDate": "Geburtsdatum",
    "auth.country": "Land",
    "auth.city": "Stadt",

    // ── Страница профиля ─────────────────────────────────────
    "profile.ecoScore": "Öko-Punkte",
    "profile.ozone": "OZ-Währung",
    "profile.ozoneShort": "OZ",
    "profile.scans": "Scans",
    "profile.level": "Stufe",
    "profile.achievements": "Erfolge",
    "profile.inventory": "Inventar",
    "profile.stats": "Statistik",
    "profile.edit": "Öko-Profil",
    "profile.levelReward": "Level-Belohnung",
    "profile.scanRewards": "Scan-Belohnungen",
    "profile.nextLevel": "Auf Stufe",
    "profile.allRewards": "Alle Belohnungen freigeschaltet",
    "profile.notSpecified": "Nicht angegeben",
    "profile.earth": "Erde",
    "profile.rewardTable.level": "Ebene",
    "profile.rewardTable.ecoScore": "Vergeben Öko-Punkte",
    "profile.rewardTable.ozone": "Vergeben OZ-Währung",
    "profile.stickerPack": "Aufkleber:",
    "profile.badgeRecycle": "♻️ Öko",
    "profile.uploadPhoto": "Foto hochladen",
    "profile.uploadError": "Upload fehlgeschlagen",

    // ── Сканер ───────────────────────────────────────────────

    "scanner.recyclable": "Recycelbar",
    "scanner.nonRecyclable": "Nicht recycelbar",
    "scanner.adviceTitle": "Sortierhinweis",
    "scanner.recommendedBin": "Empfohlene Tonne",
    "bins.paper": "Papiertonne",
    "bins.plastic": "Wertstofftonne (Plastik)",
    "bins.glass": "Glascontainer",
    "bins.metal": "Metalltonne",
    "bins.other": "Restmülltonne",
    "scanner.title": "Müllscanner",
    "scanner.takePhoto": "Foto aufnehmen",
    "scanner.advice-plastic":
      "Plastikflasche ausspülen, zusammendrücken und Etikett vor der Entsorgung entfernen.",
    "scanner.advice-glass":
      "Sicherstellen, dass das Glas nicht zerbrochen ist. Metalldeckel und Verschlüsse entfernen.",
    "scanner.advice-metal":
      "Dose von Speiseresten ausspülen und vorsichtig zusammendrücken.",
    "scanner.advice-paper":
      "Klebeband und Fettflecken vom Karton entfernen und so flach wie möglich falten.",
    "scanner.advice-other":
      "Dieser Artikel gehört zum Restmüll. In die graue Restmülltonne werfen.",
    "scanner.hint":
      "Richte deine Kamera auf einen Artikel und drücke 'Scannen'",
    "scanner.scan": "Scannen",
    "scanner.analysis": "Analysiere Artikel...",
    "scanner.analysisError":
      "Server für die Analyse konnte nicht kontaktiert werden.",
    "scanner.serverError": "Serverfehler während der Analyse.",
    "scanner.points": "Du hast erhalten",
    "scanner.ecoScore": "Öko-Punkte",
    "scanner.ecoScoreLabel": "Öko-Punkte",
    "scanner.ozone": "OZ",
    "scanner.ozoneLabel": "Ozon (O3)",
    "scanner.streak": "Serie!",
    "scanner.close": "Schließen",
    "scanner.finishButton": "Fertig und zum Profil",
    "scanner.plastic": "Plastik (PET 01)",
    "scanner.unrecognizedTitle": "ARTIKEL NICHT ERKANNT",
    "scanner.unrecognizedInstructions":
      "Das sieht nicht wie recycelbarer Abfall aus. Versuche, Plastik, Glas, Metall oder Papier zu scannen.",
    "scanner.defaultBin": "den entsprechenden Container",
    "scanner.item": "Artikel",
    "scanner.scannedPrefix": "Gescannt",
    "scanner.takeTo": "Bringe es zu",
    "scanner.regionAdvice": "Befolge die Recyclingregeln deiner Region.",
    "scanner.harmPrefix": "Umweltschaden:",
    "scanner.harm.plastic":
      "Kunststoff braucht Jahrhunderte, um sich zu zersetzen, verschmutzt die Ozeane und schadet der Tierwelt.",
    "scanner.harm.glass":
      "Glas ist sicher, aber seine Herstellung verbraucht viel Energie und Ressourcen.",
    "scanner.harm.metal":
      "Metalle können Boden und Wasser verunreinigen, wenn sie falsch entsorgt werden.",
    "scanner.harm.paper":
      "Papier trägt zur Abholzung und zum Verlust der Artenvielfalt bei.",
    "scanner.harm.default":
      "Dieser Artikel kann der Umwelt schaden, wenn er unsachgemäß entsorgt wird.",

    // ── Слайдер советов ──────────────────────────────────────
    "slider.tip.1":
      "Plastikflaschen brauchen bis zu 450 Jahre, um zu verrotten. Recyceln!",
    "slider.tip.2": "Energie sparen: Licht aus, wenn du den Raum verlässt.",
    "slider.fact.1": "Das Recycling einer Tonne Papier rettet 17 Bäume.",
    "slider.motto.1": "Kleine Schritte führen zu großen Veränderungen.",
    "slider.progress.prefix": "Noch",
    "slider.progress.suffix": "Scans bis Level",
    "slider.progress.scans": "Scans",
    "slider.stats.impact": "Dein Beitrag hat bereits 5 Bäume gerettet!",

    // ── Боковая панель ───────────────────────────────────────
    "sidebar.fight": "KAMPF FÜR SAUBERKEIT!",
    "sidebar.fightDesc": "Nutze KI und verdiene Belohnungen",
    "sidebar.nextLevel": "Nächste Stufe",
    "sidebar.league": "Öko-Rangliste",
    "sidebar.leagueDesc": "Dein Weg durch die Ligen",
    "sidebar.yourLeague": "Deine Liga",
    "sidebar.ecoScoreLeague": "Öko-Punkte",
    "sidebar.openLeagues": "Ligen öffnen",
    "sidebar.leagueInfo":
      "Ligen bieten die Möglichkeit, sich mit anderen Spielern anhand eurer Öko-Punktzahl zu messen. Je höher eure Punktzahl, desto höher die Liga und desto besser die Belohnungen!",
    "sidebar.balance": "Dein Kontostand",
    "sidebar.marketplace": "Marktplatz",
    "sidebar.exchange": "Energie gegen Belohnungen tauschen",
    "sidebar.digitalGoods": "Digitale Güter",
    "sidebar.activatable": "Aktivierbar",
    "sidebar.regularGoods": "Normale Güter",
    "sidebar.collection": "Sammlung",
    "sidebar.logout": "Abmelden",

    // ── Магазин — интерфейс ──────────────────────────────────
    "shop.title": "Shop",
    "shop.back": "Zurück",
    "shop.tabAll": "Alle",
    "shop.tabDigital": "Digital",
    "shop.tabReal": "Echt",
    "shop.tabCharity": "Spende",
    "shop.active": "Aktiv",
    "shop.equip": "Aktivieren",
    "shop.equipLoading": "Aktiviere...",
    "shop.buy": "Kaufen",
    "shop.buyLoading": "Kaufe...",
    "shop.use": "Nutzen",
    "shop.price": "Preis",
    "shop.description": "Beschreibung",
    "shop.noMoney": "Nicht genug OZ",
    "shop.successBuy": "Kauf erfolgreich!",
    "shop.errorBuy": "Kauf fehlgeschlagen",
    "shop.successEquip": "Aktiviert!",
    "shop.errorEquip": "Aktivierung fehlgeschlagen",

    // ── Магазин — товары ─────────────────────────────────────
    "shopItems.eco_sticker_pack.name": "Öko-Sticker",
    "shopItems.eco_sticker_pack.desc": "Sticker für dein Profil",
    "shopItems.green_theme.name": "Grünes Design",
    "shopItems.green_theme.desc": "Basis-Profilthema",
    "shopItems.recycle_badge.name": "Recycling-Abzeichen",
    "shopItems.recycle_badge.desc": "Zeigt deine Aktivität",
    "shopItems.animated_avatar.name": "Animierter Avatar",
    "shopItems.animated_avatar.desc": "Lebendiger Avatar",
    "shopItems.eco_trail.name": "Öko-Effekt",
    "shopItems.eco_trail.desc": "Blätterspur",
    "shopItems.nickname_color.name": "Farbiger Name",
    "shopItems.nickname_color.desc": "Heb dich ab",
    "shopItems.golden_frame.name": "Goldener Rahmen",
    "shopItems.golden_frame.desc": "VIP-Rahmen",
    "shopItems.profile_background_animated.name": "Animierter Hintergrund",
    "shopItems.profile_background_animated.desc": "Bewegter Hintergrund",
    "shopItems.eco_title.name": "Öko-Held Titel",
    "shopItems.eco_title.desc": "Besonderer Status",
    "shopItems.eco_tote.name": "Öko-Tasche",
    "shopItems.eco_tote.desc": "Echter Merch",
    "shopItems.tree_donation.name": "Baumpflanzung",
    "shopItems.tree_donation.desc": "Hilf dem Planeten",
    "shopItems.eco_hoodie.name": "Öko-Hoodie",
    "shopItems.eco_hoodie.desc": "Merch für Top-Nutzer",
    "shopItems.forest_sponsor.name": "Wald-Sponsor",
    "shopItems.forest_sponsor.desc": "Mehrere Bäume pflanzen",
    "shopItems.founder_badge.name": "Gründer-Abzeichen",
    "shopItems.founder_badge.desc": "Einzigartiger Status",

    // ── Инвентарь ────────────────────────────────────────────
    "inventory.title": "Inventar",
    "inventory.noItems": "Inventar ist leer",
    "inventory.selected": "Aktuell ausgewählt",
    "inventory.noneActive": "Noch nichts aktiviert",
    "inventory.active": "Aktiv",
    "inventory.noDesc": "Keine Beschreibung",
    "inventory.noDigital": "Noch keine digitalen Upgrades",
    "inventory.autoOptimize": "Automatisch optimieren",
    "inventory.apply": "Änderungen anwenden",
    "inventory.regular_title": "Gemischte Waren",
    "inventory.close": "Schließen",
    "inventory.saveError": "Speicherfehler, bitte erneut versuchen",

    // ── Достижения — интерфейс ───────────────────────────────
    "achievements.collection": "Sammlung von Errungenschaften",
    "achievements.showAll": "Alle anzeigen",
    "achievements.hide": "Ausblenden",
    "achievements.Title": "Vergeben",
    "achievements.statusReceived": "Bereits erhalten",
    "achievements.statusClosed": "Geschlossen",
    "achievements.howToLabel": "Wie man erhält",

    // ── Достижения — данные ──────────────────────────────────
    "achievements.streak_10.name": "10 Tage",
    "achievements.streak_10.desc":
      "Du bist schon 10 Tage in Folge mit EcoSnap dabei!",
    "achievements.streak_10.howTo":
      "Scanne 10 Tage hintereinander ohne Unterbrechung.",

    "achievements.streak_50.name": "Halbe Stadt",
    "achievements.streak_50.desc": "50 Tage aktiver Einsatz für die Umwelt",
    "achievements.streak_50.howTo": "Scanne 50 Tage hintereinander.",

    "achievements.streak_100.name": "Zenturio",
    "achievements.streak_100.desc": "100 Tage! Der Planet ist stolz auf dich",
    "achievements.streak_100.howTo": "Scanne 100 Tage hintereinander.",

    "achievements.streak_300.name": "Öko-Gott",
    "achievements.streak_300.desc": "300 Tage. Legendären Status erreicht",
    "achievements.streak_300.howTo": "Scanne 300 Tage hintereinander.",

    "achievements.first_scan.name": "Start",
    "achievements.first_scan.desc":
      "Dein erster Beitrag für einen sauberen Planeten",
    "achievements.first_scan.howTo": "Führe deinen ersten Scan aus.",

    "achievements.plastic_10.name": "Plastik-Stopp",
    "achievements.plastic_10.desc":
      "10 Plastikobjekte vor der Deponie gerettet",
    "achievements.plastic_10.howTo": "Scanne 10-mal Plastik.",

    "achievements.glass_10.name": "Glasauge",
    "achievements.glass_10.desc": "10 Glasflaschen gesammelt",
    "achievements.glass_10.howTo": "Scanne 10-mal Glas.",

    "achievements.paper_10.name": "Papiertiger",
    "achievements.paper_10.desc": "10 Kartonverpackungen recycelt",
    "achievements.paper_10.howTo": "Scanne 10-mal Papier.",

    "achievements.metal_10.name": "Eisenheld",
    "achievements.metal_10.desc": "10 Metalldosen recycelt",
    "achievements.metal_10.howTo": "Scanne 10-mal Metall.",

    "achievements.rich_100.name": "Die Ersten 100",
    "achievements.rich_100.desc": "Du hast deine ersten 100 O3 verdient",
    "achievements.rich_100.howTo": "Sammle mindestens 100 O3.",

    "achievements.rich_1000.name": "Millionär",
    "achievements.rich_1000.desc": "Du besitzt mehr als 1000 O3",
    "achievements.rich_1000.howTo": "Sammle mindestens 1000 O3.",

    "achievements.lvl_10.name": "Zehner",
    "achievements.lvl_10.desc": "Du hast Level 10 erreicht",
    "achievements.lvl_10.howTo": "Erreiche Level 10.",

    "achievements.lvl_50.name": "Zum Mars!",
    "achievements.lvl_50.desc": "Du hast Level 50 erreicht!",
    "achievements.lvl_50.howTo": "Erreiche Level 50.",

    "achievements.night_owl.name": "Nachteule",
    "achievements.night_owl.desc": "Müll nachts gescannt",
    "achievements.night_owl.howTo": "Führe einen Scan nach 22 Uhr durch.",

    "achievements.early_bird.name": "Frühaufsteher",
    "achievements.early_bird.desc": "Müll früh am Morgen gescannt",
    "achievements.early_bird.howTo": "Führe einen Scan vor 8 Uhr durch.",

    "achievements.traveler.name": "Reisender",
    "achievements.traveler.desc":
      "In einer anderen Stadt oder einem anderen Land gescannt",
    "achievements.traveler.howTo": "Scanne außerhalb deiner Heimatstadt.",

    "achievements.fast_scanner.name": "Blitz",
    "achievements.fast_scanner.desc": "3 Scans in weniger als einer Minute",
    "achievements.fast_scanner.howTo":
      "Führe 3 Scans innerhalb einer Minute durch.",

    "achievements.eco_hero.name": "Held",
    "achievements.eco_hero.desc": "Mehr als 10 virtuelle Bäume gerettet",
    "achievements.eco_hero.howTo": "Rette 10 Bäume.",

    "achievements.perfect_profile.name": "Perfektionist",
    "achievements.perfect_profile.desc": "Alle Profildaten ausgefüllt",
    "achievements.perfect_profile.howTo": "Fülle dein gesamtes Profil aus.",

    "achievements.inviter.name": "Freund",
    "achievements.inviter.desc": "Dein Empfehlungscode wurde verwendet",
    "achievements.inviter.howTo": "Lade einen Freund ein.",

    // ── История активности ───────────────────────────────────
    "activityHistory.title": "Aktivitätsverlauf",
    "activityHistory.empty": "Aktivitätsverlauf ist leer",

    // ── Обратная связь ───────────────────────────────────────
    "feedback.button": "Feedback",
    "feedback.title": "Hilf uns besser zu werden",
    "feedback.placeholder": "Beschreiben Sie Ihre Idee oder Ihr Problem...",
    "feedback.send": "Senden",
    "feedback.success": "Danke! Die Eco-Community schätzt Ihren Beitrag.",
    "feedback.category.bug": "Fehler",
    "feedback.category.idea": "Idee",
    "feedback.category.review": "Bewertung",

    // ── Лиги — интерфейс ─────────────────────────────────────
    "leagues.title": "EcoSnap-Ligen",
    "leagues.currentLeague": "Aktuelle Liga",
    "leagues.toNextLeague": "Bis zur nächsten Liga",
    "leagues.maxReached":
      "Maximale Liga erreicht. Du bist eine Legende des Ökosystems!",
    "leagues.threshold": "Schwelle",
    "leagues.points": "Punkte",

    // ── Лиги — данные ────────────────────────────────────────
    "leagues.seed.name": "Samen-Liga",
    "leagues.seed.desc":
      "Deine ersten Schritte zu umweltfreundlichen Gewohnheiten.",
    "leagues.sprout.name": "Keimling-Liga",
    "leagues.sprout.desc": "Du scannst regelmäßig und gewinnst an Tempo.",
    "leagues.forest.name": "Wald-Liga",
    "leagues.forest.desc":
      "Dein Beitrag ist sichtbar – du baust eine grünere Zukunft.",
    "leagues.ocean.name": "Ozean-Liga",
    "leagues.ocean.desc":
      "Ein starker Öko-Spieler mit hoher täglicher Aktivität.",
    "leagues.planet.name": "Planeten-Liga",
    "leagues.planet.desc":
      "Du inspirierst andere und prägst die Umwelt-Community.",
    "leagues.legend.name": "Legenden-Liga",
    "leagues.legend.desc":
      "Ein elitärer Beschützer der Umwelt. Der höchste Rang.",

    // ── О проекте ────────────────────────────────────────────
    "about.title": "Über EcoSnap",
    "about.subtitle": "Dein KI-Assistent für Mülltrennung",

    "about.whoTitle": "Wer wir sind",
    "about.whoDesc":
      "Wir sind ein Team aus Entwicklern und Enthusiasten, denen die Umwelt nicht egal ist.",
    "about.whoMission":
      "EcoSnap wurde als einfaches und praktisches Tool entwickelt, um Menschen dabei zu helfen, Abfälle korrekt zu trennen – ohne komplizierte Regeln.",

    "about.whyTitle": "Warum wir das tun",
    "about.problems.1": "Viele kennen die Regeln nicht",
    "about.problems.2": "Kategorien sorgen für Verwirrung",
    "about.problems.3": "Die Suche nach Antworten kostet Zeit",
    "about.solution": "Wir haben beschlossen, dieses Problem mit KI zu lösen.",

    "about.howTitle": "So funktioniert es",
    "about.steps.1": "Richte die Kamera aus",
    "about.steps.2": "Die KI erkennt die Abfallart",
    "about.steps.3": "Erhalte klare Anweisungen",
    "about.steps.4": "Leiste deinen Beitrag",

    "about.featuresTitle": "Besondere Funktionen",
    "about.featuresList.1": "Sofortige Erkennung",
    "about.featuresList.2": "Intelligente Hinweise",
    "about.featuresList.3": "Gamification (Öko-Score)",
    "about.featuresList.4": "Echter Einfluss",

    "about.aboutUsTitle": "Ein bisschen über uns",
    "about.aboutUsDesc":
      "Dieses Projekt wurde als moderne Lösung für eine neue Generation entwickelt, die bewusst leben und Technologie sinnvoll einsetzen möchte.",
    "activityHistory.showMore": "Show all",
    "activityHistory.showLess": "Show less",  
  },
};

// ── Определение языка ────────────────────────────────────────
export const detectLanguage = () => {
  const stored = localStorage.getItem("language");
  if (stored) return stored;

  const browserLang = navigator.language.split("-")[0];
  const supportedLangs = ["ru", "en", "de"];

  return supportedLangs.includes(browserLang) ? browserLang : "en";
};
