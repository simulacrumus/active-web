import { useSchedules } from "@hooks/useSchedules";
import { Dropdown } from "@components/common/Dropdown";
import { useTranslation } from "react-i18next";
import { HourOfDay } from "@types";
import { CircleX } from "lucide-react";

export function HourFilter() {
  const { filters, filterOptions, setSelectedHour } = useSchedules();

  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {t("hourOfDay.title")}
        </label>
        {filters.selectedHour !== null && (
          <button
            type="button"
            onClick={() => setSelectedHour(null)}
            className="text-gray-400 transition"
            aria-label={t("hourOfDay.clear")}
          >
            <CircleX size={20} />
          </button>
        )}
      </div>
      <Dropdown
        availableItems={
          filterOptions.hoursOfDay
            ? filterOptions.hoursOfDay.map((hour: HourOfDay) => ({
                ...hour,
                title: t(hour.title),
              }))
            : []
        }
        selected={filters.selectedHour}
        onSelectionChange={setSelectedHour}
        placeholder={t("hourOfDay.select")}
        inputPlaceholder={t("common.search")}
        getKey={(hourOfDay: HourOfDay) => hourOfDay.id}
        getLabel={(hourOfDay: HourOfDay) => hourOfDay.title}
      />
    </div>
  );
}
