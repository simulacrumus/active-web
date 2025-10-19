import React from "react";
import { ScheduleFilterChips } from "./filters/ScheduleFilterChips";
import { ScheduleSortMenu } from "./sort/ScheduleSortMenu";
import { useTranslation } from "react-i18next";

export const ScheduleListHeader: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-top transition-all duration-200">
        <h2 className="text-lg text-gray-800 font-semibold font-semibold">
          {t("schedule.schedules")}
        </h2>
        <ScheduleSortMenu />
      </div>
      <div className="flex justify-between items-center">
        <ScheduleFilterChips />
      </div>
    </div>
  );
};
