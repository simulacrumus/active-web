import { useSchedules } from "@hooks/useSchedules";
import { useTranslation } from "react-i18next";
import { CircleX } from "lucide-react";
import { SearchBar } from "@components/common/SearchBar";

export function SearchFilter() {
  const { filters, setSearchQuery } = useSchedules();

  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {t("common.search")}
        </label>
        {typeof filters.searchQuery === "string" &&
          filters.searchQuery &&
          filters.searchQuery.trim() !== "" && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-gray-400 transition"
              aria-label={t("search.clear")}
            >
              <CircleX size={20} />
            </button>
          )}
      </div>
      <SearchBar
        value={filters.searchQuery}
        onChange={setSearchQuery}
        placeholder={t("common.search")}
      />
    </div>
  );
}
