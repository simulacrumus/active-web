import React from "react";
import { useSchedules } from "@hooks/useSchedules";
import { ScheduleSort } from "@types";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

export const ScheduleSortMenu: React.FC = (): React.ReactElement => {
  const { sort, sortOptions, setSelectedSort } = useSchedules();
  const { t } = useTranslation();
  return (
    <div className="mb-4 flex items-center gap-3">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        {t("schedule.sort.sortBy")}
      </label>
      <div className="relative">
        <select
          id="sort"
          className="appearance-none border border-gray-200 hover:bg-gray-50 rounded-lg px-4 py-2 pr-10 shadow-sm focus:outline-none transition-colors cursor-pointer text-sm"
          value={sort}
          onChange={(e) => {
            setSelectedSort(e.target.value as ScheduleSort);
          }}
        >
          {sortOptions.map((option: ScheduleSort) => (
            <option key={option} value={option}>
              {t(`schedule.sort.${String(option).toLowerCase()}`)}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
          <ChevronDown className="w-4 h-4" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};
