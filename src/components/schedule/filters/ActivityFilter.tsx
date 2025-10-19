import { useSchedules } from "@hooks/useSchedules";
import { Dropdown } from "@components/common/Dropdown";
import { useTranslation } from "react-i18next";
import { Activity } from "@types";
import { CircleX } from "lucide-react";

export function ActivityFilter() {
  const { filters, filterOptions, setSelectedActivity } = useSchedules();

  const { t } = useTranslation();

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {t("activity.title")}
        </label>
        {filters.selectedActivity !== null && (
          <button
            type="button"
            onClick={() => setSelectedActivity(null)}
            className="text-gray-400 transition"
            aria-label={t("activity.clear")}
          >
            <CircleX size={20} />
          </button>
        )}
      </div>
      <Dropdown
        availableItems={filterOptions.activities}
        disabledItems={filterOptions.initialActivities.filter(
          (initialActivity: Activity) =>
            !filterOptions.activities.some(
              (activity: Activity) => activity.id === initialActivity.id
            )
        )}
        selected={filters.selectedActivity}
        onSelectionChange={setSelectedActivity}
        placeholder={t("activity.select")}
        inputPlaceholder={t("common.search")}
        getKey={(activity: Activity) => activity.id}
        getLabel={(activity: Activity) => activity.title}
      />
    </div>
  );
}
