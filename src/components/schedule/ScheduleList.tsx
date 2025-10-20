import React from "react";
import { useSchedules, useInfiniteScroll } from "@hooks";
import { ScheduleCard } from "./ScheduleCard";
import type { Schedule } from "@types";
import { ScheduleListHeader } from "./ScheduleListHeader";
import { useTranslation } from "react-i18next";

export const ScheduleList: React.FC = (): React.ReactElement => {
  const {
    schedules,
    loadMoreSchedules,
    hasMoreSchedules,
    isLoadingSchedules,
    isLoadingNextPageSchedules,
  } = useSchedules();

  const sentinelRef = useInfiniteScroll({
    onLoadMore: loadMoreSchedules,
    hasMore: hasMoreSchedules,
    isLoading: isLoadingNextPageSchedules,
    threshold: 200,
  });

  const { t } = useTranslation();

  const ScheduleListContent: React.FC<{
    isLoading: boolean;
    schedules: Schedule[];
  }> = ({ isLoading, schedules }) => {
    if (isLoading) {
      return (
        <div className="w-full text-center py-10 transition-all duration-200">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-4 text-gray-600">{t("schedule.loading")}</p>
        </div>
      );
    }

    return (
      <>
        {schedules.length === 0 && !isLoading && (
          <div className="text-center py-10 text-gray-600">
            {t("schedule.empty")}
          </div>
        )}
        {schedules.map((schedule: Schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))}
        {isLoadingNextPageSchedules && (
          <div className="text-center py-4">
            <span className="text-gray-500">{t("schedule.loadingMore")}</span>
          </div>
        )}
        {!hasMoreSchedules && schedules.length > 0 && (
          <div className="text-center py-4">
            <span className="text-gray-500">
              {t("schedule.noMoreSchedules")}
            </span>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="w-full items-center justify-center px-4 md:pr-8 py-4">
      <ScheduleListHeader />
      <div className="w-full flex flex-col gap-6">
        <ScheduleListContent
          isLoading={isLoadingSchedules}
          schedules={schedules}
        />
        <div ref={sentinelRef} className="h-4" />
      </div>
    </div>
  );
};
