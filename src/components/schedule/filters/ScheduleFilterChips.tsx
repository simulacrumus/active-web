import React from "react";
import { useSchedules } from "@hooks/useSchedules";
import { Chip } from "@components/common/Chip";
import { useTranslation } from "react-i18next";

export const ScheduleFilterChips: React.FC = () => {
  const { t } = useTranslation();
  const {
    filters,
    isAnyFilterApplied,
    setSelectedFacility,
    setSelectedActivity,
    setSelectedDayOfWeek,
    setSelectedHour,
  } = useSchedules();

  const chips: React.ReactNode[] = [];

  if (filters.selectedActivity) {
    chips.push(
      <Chip
        key="activity"
        title={filters.selectedActivity.title}
        onRemove={() => setSelectedActivity(null)}
      />
    );
  }

  if (filters.selectedFacility) {
    chips.push(
      <Chip
        key="facility"
        title={filters.selectedFacility.title}
        onRemove={() => setSelectedFacility(null)}
      />
    );
  }
  if (filters.selectedDayOfWeek) {
    chips.push(
      <Chip
        key="dayOfWeek"
        title={t(`dayOfWeek.day.${filters.selectedDayOfWeek.id}.full`)}
        onRemove={() => setSelectedDayOfWeek(null)}
      />
    );
  }

  if (filters.selectedHour) {
    chips.push(
      <Chip
        key="hourOfDay"
        title={t(`hourOfDay.hour.${filters.selectedHour.id}`)}
        onRemove={() => setSelectedHour(null)}
      />
    );
  }
  if (!isAnyFilterApplied()) {
    return <div />;
  }

  return (
    <div className="w-full flex flex-wrap items-start gap-2 mb-4">{chips}</div>
  );
};
