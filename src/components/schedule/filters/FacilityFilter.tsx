import { useSchedules } from "@hooks/useSchedules";
import { Dropdown } from "@components/common/Dropdown";
import { useTranslation } from "react-i18next";
import { Facility } from "@types";
import { CircleX } from "lucide-react";
import { useMemo } from "react";

export function FacilityFilter() {
  const { filters, filterOptions, setSelectedFacility } = useSchedules();
  const { t } = useTranslation();

  const availableFacilities = filterOptions.facilities ?? [];
  const selectedFacility = filters.selectedFacility;

  const disabledItems = useMemo(() => {
    const availableIds = new Set(
      availableFacilities.map((f: Facility) => f.id)
    );
    return filterOptions.initialFacilities.filter(
      (f: Facility) => !availableIds.has(f.id)
    );
  }, [availableFacilities, filterOptions.initialFacilities]);

  const handleClear = () => setSelectedFacility(null);

  return (
    <div>
      <div className="flex items-center justify-between gap-2 mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {t("facility.title")}
        </label>
        {selectedFacility && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 transition"
            aria-label={t("facility.clear")}
          >
            <CircleX size={20} />
          </button>
        )}
      </div>

      <Dropdown
        availableItems={availableFacilities}
        disabledItems={disabledItems}
        selected={selectedFacility}
        onSelectionChange={setSelectedFacility}
        placeholder={t("facility.select")}
        inputPlaceholder={t("common.search")}
        getKey={(facility: Facility) => facility.id}
        getLabel={(facility: Facility) => facility.title}
      />
    </div>
  );
}
