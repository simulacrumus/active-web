import { useSchedules } from "@hooks/useSchedules";
import { useTranslation } from "react-i18next";
import { ActivityFilter } from "./ActivityFilter";
import { FacilityFilter } from "./FacilityFilter";
import { DayFilter } from "./DayFilter";
import { HourFilter } from "./HourFilter";
import { SearchFilter } from "./SearchFilter";

export function FilterList() {
  const { t } = useTranslation();
  const {
    isLoadingOptions,
    isLoadingSchedules,
    resetFilters,
    isAnyFilterApplied,
  } = useSchedules();
  return (
    <div className="w-full flex items-center justify-center md:pl-8 md:py-4">
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {t("filters.title")}
          </h2>
          {isAnyFilterApplied() && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs rounded-full text-gray-700 transition hover:underline"
              aria-label={t("filters.reset")}
            >
              {t("schedule.filter.clearAll")}
            </button>
          )}
        </div>
        <fieldset
          disabled={isLoadingOptions || isLoadingSchedules}
          aria-busy={isLoadingOptions || isLoadingSchedules}
          className="space-y-6"
        >
          <SearchFilter />
          <ActivityFilter />
          <FacilityFilter />
          <DayFilter />
          <HourFilter />
        </fieldset>
      </div>
    </div>
  );
}
