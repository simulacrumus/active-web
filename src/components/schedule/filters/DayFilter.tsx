import { useSchedules } from "@hooks/useSchedules";
import { Dropdown } from "@components/common/Dropdown";
import { useTranslation } from "react-i18next";
import { DayOfWeek } from "@types";
import { CircleX } from "lucide-react";

export function DayFilter() {
  const { filters, filterOptions, setSelectedDayOfWeek } = useSchedules();

  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {t("dayOfWeek.title")}
        </label>
        {filters.selectedDayOfWeek !== null && (
          <button
            type="button"
            onClick={() => setSelectedDayOfWeek(null)}
            className="text-gray-400 transition"
            aria-label={t("dayOfWeek.clear")}
          >
            <CircleX size={20} />
          </button>
        )}
      </div>
      <Dropdown
        availableItems={
          filterOptions.daysOfWeek
            ? filterOptions.daysOfWeek.map((day: DayOfWeek) => ({
                ...day,
                title: t(day.title),
              }))
            : []
        }
        selected={filters.selectedDayOfWeek}
        onSelectionChange={setSelectedDayOfWeek}
        placeholder={t("dayOfWeek.select")}
        inputPlaceholder={t("common.search")}
        getKey={(dayOfWeek: DayOfWeek) => dayOfWeek.id}
        getLabel={(dayOfWeek: DayOfWeek) => dayOfWeek.title}
      />
    </div>
  );
}
