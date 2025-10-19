import React from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitch";

export const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-6xl flex items-center justify-between pl-4 md:px-8 py-3 md:py-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl text-sky-800 font-bold tracking-tight">
          {t("appTitle")}
        </h1>
        <p className="text-sm text-gray-600">{t("appSubtitle")}</p>
        <p className="text-xs text-gray-400">{t("signature")}</p>
      </div>
      <div>
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Header;
