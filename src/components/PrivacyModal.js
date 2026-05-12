import React from "react";
import {
  X,
  ShieldCheck,
  Mail,
  Globe,
  Database,
  User,
  Lock,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const PrivacyModal = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();

  if (!isOpen) return null;

  const content = {
    ru: {
      title: "Политика конфиденциальности EcoSnap",
      sections: [
        {
          title: "Информация о проекте",
          icon: <Globe size={18} />,
          text: "EcoSnap (EcoTrack2026@outlook.com) работает только на территории Германии и Казахстана.",
        },
        {
          title: "Какие данные мы собираем",
          icon: <Database size={18} />,
          list: [
            "Аккаунт: имя пользователя, email, пароль (Firebase) или данные Google.",
            "Профиль: аватар, выбранный город и пользовательские настройки.",
            "Активность: история сканов, достижения, XP, уровни и инвентарь.",
            "Контент: изображения, загружаемые для AI-анализа.",
            "Технические данные: IP-адрес, браузер, устройство и логи ошибок.",
          ],
        },
        {
          title: "Как используются данные",
          icon: <ShieldCheck size={18} />,
          list: [
            "Работа аккаунта и авторизации.",
            "Анализ изображений через AI.",
            "Сохранение прогресса, достижений и статистики.",
            "Улучшение стабильности и безопасности сервиса.",
            "Предотвращение злоупотреблений и спама.",
          ],
        },
        {
          title: "Сторонние сервисы",
          icon: <ShieldCheck size={18} />,
          text: "EcoSnap использует Firebase, Google Gemini AI и Google Sign-In. Эти сервисы могут обрабатывать данные согласно своим собственным политикам конфиденциальности.",
        },
        {
          title: "Права пользователей",
          icon: <User size={18} />,
          text: "Вы можете запросить доступ, исправление или удаление своих данных, отправив запрос на: EcoTrack2026@outlook.com",
        },
        {
          title: "Безопасность",
          icon: <Lock size={18} />,
          text: "Мы используем разумные меры защиты пользовательских данных, однако ни один онлайн-сервис не может гарантировать абсолютную безопасность.",
        },
        {
          title: "Дети и возрастные ограничения",
          icon: <User size={18} />,
          text: "EcoSnap не предназначен для использования детьми младше возраста, разрешенного местным законодательством без согласия родителей.",
        },
        {
          title: "Обновления политики",
          icon: <ShieldCheck size={18} />,
          text: "Политика конфиденциальности может обновляться в будущем. Актуальная версия всегда публикуется внутри сервиса EcoSnap.",
        },
      ],
    },

    en: {
      title: "EcoSnap Privacy Policy",
      sections: [
        {
          title: "Project Information",
          icon: <Globe size={18} />,
          text: "EcoSnap (EcoTrack2026@outlook.com) currently operates only within Germany and Kazakhstan.",
        },
        {
          title: "Data We Collect",
          icon: <Database size={18} />,
          list: [
            "Account: username, email, password (Firebase) or Google account information.",
            "Profile: avatar, selected city and user customization settings.",
            "Activity: scan history, achievements, XP, levels, and inventory.",
            "Content: images uploaded for AI analysis.",
            "Technical data: IP address, browser, device information, and diagnostic logs.",
          ],
        },
        {
          title: "How We Use Data",
          icon: <ShieldCheck size={18} />,
          list: [
            "Providing account and authentication functionality.",
            "Analyzing uploaded images using AI.",
            "Saving user progress, achievements, and statistics.",
            "Improving service stability and security.",
            "Preventing abuse and spam activity.",
          ],
        },
        {
          title: "Third-Party Services",
          icon: <ShieldCheck size={18} />,
          text: "EcoSnap uses Firebase, Google Gemini AI, and Google Sign-In. These services may process data according to their own privacy policies.",
        },
        {
          title: "User Rights",
          icon: <User size={18} />,
          text: "Users may request access, correction, or deletion of their data by contacting: EcoTrack2026@outlook.com",
        },
        {
          title: "Security",
          icon: <Lock size={18} />,
          text: "We use reasonable measures to protect user data, but no online service can guarantee absolute security.",
        },
        {
          title: "Children's Privacy",
          icon: <User size={18} />,
          text: "EcoSnap is not intended for children below the minimum age required by local laws without parental permission.",
        },
        {
          title: "Policy Updates",
          icon: <ShieldCheck size={18} />,
          text: "This Privacy Policy may be updated in the future. The latest version will always be available within EcoSnap.",
        },
      ],
    },

    de: {
      title: "EcoSnap Datenschutzrichtlinie",
      sections: [
        {
          title: "Projektinformationen",
          icon: <Globe size={18} />,
          text: "EcoSnap (EcoTrack2026@outlook.com) ist derzeit nur in Deutschland und Kasachstan verfügbar.",
        },
        {
          title: "Welche Daten wir sammeln",
          icon: <Database size={18} />,
          list: [
            "Konto: Benutzername, E-Mail-Adresse, Passwort (Firebase) oder Google-Kontoinformationen.",
            "Profil: Avatar, ausgewählte Stadt und Benutzereinstellungen.",
            "Aktivität: Scanverlauf, Erfolge, XP, Level und Inventar.",
            "Inhalte: Bilder, die zur KI-Analyse hochgeladen werden.",
            "Technische Daten: IP-Adresse, Browser-, Geräteinformationen und Fehlerprotokolle.",
          ],
        },
        {
          title: "Wie wir Daten verwenden",
          icon: <ShieldCheck size={18} />,
          list: [
            "Bereitstellung von Konto- und Anmeldungsfunktionen.",
            "Analyse hochgeladener Bilder mit KI.",
            "Speicherung von Fortschritt, Erfolgen und Statistiken.",
            "Verbesserung der Stabilität und Sicherheit des Dienstes.",
            "Verhinderung von Missbrauch und Spam.",
          ],
        },
        {
          title: "Drittanbieter-Dienste",
          icon: <ShieldCheck size={18} />,
          text: "EcoSnap verwendet Firebase, Google Gemini AI und Google Sign-In. Diese Dienste können Daten gemäß ihren eigenen Datenschutzrichtlinien verarbeiten.",
        },
        {
          title: "Benutzerrechte",
          icon: <User size={18} />,
          text: "Benutzer können Zugriff, Korrektur oder Löschung ihrer Daten anfordern unter: EcoTrack2026@outlook.com",
        },
        {
          title: "Sicherheit",
          icon: <Lock size={18} />,
          text: "Wir verwenden angemessene Sicherheitsmaßnahmen zum Schutz der Nutzerdaten, jedoch kann kein Onlinedienst absolute Sicherheit garantieren.",
        },
        {
          title: "Datenschutz von Kindern",
          icon: <User size={18} />,
          text: "EcoSnap ist ohne Zustimmung der Eltern nicht für Kinder unter dem gesetzlich vorgeschriebenen Mindestalter bestimmt.",
        },
        {
          title: "Aktualisierungen der Richtlinie",
          icon: <ShieldCheck size={18} />,
          text: "Diese Datenschutzrichtlinie kann zukünftig aktualisiert werden. Die neueste Version ist jederzeit in EcoSnap verfügbar.",
        },
      ],
    },
  };

  const currentContent = content[language] || content.en;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-emerald-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              {currentContent.title}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full shadow-sm transition-all text-slate-400 hover:text-slate-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto custom-scrollbar text-slate-600 space-y-6">
          {currentContent.sections.map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-2 text-slate-800">
                {section.icon}
                <h3 className="font-bold">{section.title}</h3>
              </div>

              {section.text && (
                <p className="text-sm leading-relaxed pl-7">{section.text}</p>
              )}

              {section.list && (
                <ul className="space-y-2 pl-7 mt-2">
                  {section.list.map((item, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-emerald-400 rounded-full shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          <div className="p-4 bg-slate-50 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 mt-8">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Mail size={14} />
              EcoTrack2026@outlook.com
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <Globe size={14} />
              DE / KZ
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
          >
            {t("auth.privacyClose")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;
