import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const switchLanguage = () => {
    const newLang = i18n.language === "en" ? "fr" : "en";
    localStorage.setItem("language", newLang);
    i18n.changeLanguage(newLang).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="flex items-center justify-center py-2">
      <button
        onClick={switchLanguage}
        className="bg-white border border-gray-200 hover:bg-gray-50 shadow-sm px-3 py-1 rounded transition-colors"
      >
        <span className="text-sm tracking-wide">
          {(i18n.language === "en" ? "fr" : "en").toUpperCase()}
        </span>
      </button>
    </div>
  );
};

export default LanguageSwitcher;
