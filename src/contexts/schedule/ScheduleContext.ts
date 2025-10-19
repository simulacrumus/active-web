import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
  Context,
} from "react";
import {
  activityService,
  facilityService,
  scheduleService,
} from "@services/api";
import {
  Activity,
  Facility,
  Schedule,
  FilterState,
  FilterOptions,
  DayOfWeek,
  HourOfDay,
  ScheduleSort,
  // PageModel,
} from "@types";
import { PageModel } from "./../../types/Page";
import {
  DAYS_OF_WEEK,
  HOURS_OF_DAY,
} from "@components/schedule/filters/constants";
import { SCHEDULE_SORT_OPTIONS } from "@components/schedule/sort/constants";
import { useLocation } from "@hooks/useLocation";

export interface ScheduleContextValue {
  filters: FilterState;
  filterOptions: FilterOptions;
  sortOptions: ScheduleSort[];
  sort: ScheduleSort;
  schedules: Schedule[];
  isLoadingOptions: boolean;
  isLoadingSchedules: boolean;
  isLoadingNextPageSchedules: boolean;
  hasMoreSchedules: boolean;
  loadMoreSchedules: () => Promise<void>;
  setSelectedActivity: (activity: Activity | null) => void;
  setSelectedFacility: (facility: Facility | null) => void;
  setSelectedDayOfWeek: (day: DayOfWeek | null) => void;
  setSelectedHour: (hour: HourOfDay | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedSort: (sort: ScheduleSort) => void;
  resetFilters: () => void;
  isAnyFilterApplied: () => boolean;
}

export const ScheduleContext: Context<ScheduleContextValue | null> =
  createContext<ScheduleContextValue | null>(null);

const initialFilters: FilterState = {
  selectedActivity: null,
  selectedFacility: null,
  selectedDayOfWeek: null,
  selectedHour: null,
  searchQuery: "",
  pageNumber: 0,
};

interface ScheduleProviderProps {
  children: ReactNode;
}

export function ScheduleProvider({ children }: ScheduleProviderProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [sort, setSort] = useState<ScheduleSort>("Time");
  const [sortOptions] = useState<ScheduleSort[]>(SCHEDULE_SORT_OPTIONS);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    activities: [],
    facilities: [],
    initialActivities: [],
    initialFacilities: [],
    daysOfWeek: DAYS_OF_WEEK,
    hoursOfDay: HOURS_OF_DAY,
  });
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState<boolean>(false);
  const [isLoadingSchedules, setIsLoadingSchedules] = useState<boolean>(false);
  const [isLoadingNextPageSchedules, setIsLoadingNextPageSchedules] =
    useState<boolean>(false);
  const [hasMoreSchedules, setHasMoreSchedules] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const didLoadRef = useRef(false);
  const lastRequestRef = useRef<symbol | null>(null);
  const isInitialMount = useRef(true);

  const locationData = useLocation();

  const loadInitialFilterOptions = useCallback(async (): Promise<void> => {
    setIsLoadingOptions(true);
    try {
      const [initialActivities, initialFacilities] = await Promise.all([
        activityService.getActivities(),
        facilityService.getFacilities(),
      ]);

      setFilterOptions((prev: FilterOptions) => ({
        ...prev,
        activities: initialActivities,
        facilities: initialFacilities,
        initialActivities,
        initialFacilities,
      }));
    } catch (error) {
      console.error("Error loading filter options:", error);
    } finally {
      setIsLoadingOptions(false);
    }
  }, []);

  useEffect(() => {
    if (didLoadRef.current) return;
    didLoadRef.current = true;
    loadInitialFilterOptions();
  }, [loadInitialFilterOptions]);

  const handleActivityChange = useCallback(
    async (activity: Activity | null): Promise<void> => {
      setIsLoadingOptions(true);
      const token = Symbol();
      lastRequestRef.current = token;

      try {
        setFilters((prev: FilterState) => ({
          ...prev,
          selectedActivity: activity,
        }));

        const facilities = activity
          ? await facilityService.getFacilitiesByActivity(activity.id)
          : filterOptions.initialFacilities;

        if (lastRequestRef.current !== token) return;

        const availableIds = new Set(facilities.map((f: Facility) => f.id));

        const nextSelectedFacility =
          filters.selectedFacility &&
          availableIds.has(filters.selectedFacility.id)
            ? filters.selectedFacility
            : null;

        setFilterOptions((prev: FilterOptions) => ({
          ...prev,
          facilities,
          activities: prev.activities, // keep existing
        }));

        setFilters((prev: FilterState) => ({
          ...prev,
          selectedFacility: nextSelectedFacility,
        }));
      } catch (error) {
        console.error("Error updating facilities:", error);
      } finally {
        if (lastRequestRef.current === token) {
          setIsLoadingOptions(false);
        }
      }
    },
    [filterOptions.initialFacilities, filters.selectedFacility]
  );

  const handleFacilityChange = useCallback(
    async (facility: Facility | null): Promise<void> => {
      setIsLoadingOptions(true);
      const token = Symbol();
      lastRequestRef.current = token;

      try {
        // Update facility first
        setFilters((prev: FilterState) => ({
          ...prev,
          selectedFacility: facility,
        }));

        const activities = facility
          ? await activityService.getActivitiesByFacility(facility.id)
          : filterOptions.initialActivities;

        if (lastRequestRef.current !== token) return; // Ignore outdated requests

        const availableIds = new Set(activities.map((a: Activity) => a.id));

        const nextSelectedActivity =
          filters.selectedActivity &&
          availableIds.has(filters.selectedActivity.id)
            ? filters.selectedActivity
            : null;

        setFilterOptions((prev: FilterOptions) => ({
          ...prev,
          activities,
          facilities: nextSelectedActivity
            ? prev.facilities
            : prev.initialFacilities,
        }));

        setFilters((prev: FilterState) => ({
          ...prev,
          selectedActivity: nextSelectedActivity,
        }));
      } catch (error) {
        console.error("Error updating activities:", error);
      } finally {
        if (lastRequestRef.current === token) {
          setIsLoadingOptions(false);
        }
      }
    },
    [filterOptions.initialActivities, filters.selectedActivity]
  );

  const handleSortChange = useCallback(
    async (sort: ScheduleSort): Promise<void> => {
      if (sort === "Nearby") {
        if (!locationData.location) {
          if (locationData.permission === "denied") {
            alert(
              "Location access was denied. Please enable location permissions in your browser settings to use nearby sorting."
            );
            return;
          }

          const success = await locationData.requestLocation();

          if (!success) {
            alert(
              "Unable to get your location. Please enable location permissions in your browser settings to use nearby sorting."
            );
            return;
          }
        }
      }
      setSort(sort);
    },
    [locationData]
  );

  const setSelectedDayOfWeek = useCallback((day: DayOfWeek | null): void => {
    setFilters((prev: FilterState) => ({ ...prev, selectedDayOfWeek: day }));
  }, []);

  const setSelectedHour = useCallback((hour: HourOfDay | null): void => {
    setFilters((prev: FilterState) => ({ ...prev, selectedHour: hour }));
  }, []);

  const setSearchQuery = useCallback((query: string): void => {
    setFilters((prev: FilterState) => ({ ...prev, searchQuery: query }));
  }, []);

  const fetchSchedulesPageRef =
    useRef<(pageNumber: number, append: boolean) => Promise<void>>(undefined);

  useEffect(() => {
    fetchSchedulesPageRef.current = async (
      pageNumber: number = 0,
      append: boolean = false
    ): Promise<void> => {
      if (append) {
        setIsLoadingNextPageSchedules(true);
      } else {
        setIsLoadingSchedules(true);
      }
      try {
        const params: Record<string, string> = {};
        if (filters.selectedDayOfWeek)
          params["day"] = filters.selectedDayOfWeek.id.toString();
        if (filters.selectedHour)
          params["time"] = filters.selectedHour.id.toString();
        if (sort) params["sort"] = sort;
        if (sort === "Nearby" && locationData.location) {
          params["latitude"] = locationData.location.latitude.toString();
          params["longitude"] = locationData.location.longitude.toString();
        }
        if (filters.searchQuery && filters.searchQuery.trim() !== "")
          params["q"] = filters.searchQuery.trim();

        let schedules: Schedule[] = [];
        let page: PageModel<Schedule>;

        if (filters.selectedActivity && filters.selectedFacility) {
          page = await scheduleService.getSchedulesByActivityAndByFacility(
            { ...params, page: pageNumber.toString() },
            filters.selectedActivity.id,
            filters.selectedFacility.id
          );
        } else if (filters.selectedFacility) {
          page = await scheduleService.getSchedulesByFacility(
            { ...params, page: pageNumber.toString() },
            filters.selectedFacility.id
          );
        } else if (filters.selectedActivity) {
          page = await scheduleService.getSchedulesByActivity(
            { ...params, page: pageNumber.toString() },
            filters.selectedActivity.id
          );
        } else {
          page = await scheduleService.getSchedules({
            ...params,
            page: pageNumber.toString(),
          });
        }
        const pageData = new PageModel<Schedule>(page);
        schedules = pageData.content;
        setHasMoreSchedules(pageData.hasNext);
        setCurrentPage(pageNumber);

        if (append) {
          setSchedules((prev) => [...prev, ...schedules]);
        } else {
          setSchedules(schedules);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error);
      } finally {
        if (append) {
          setIsLoadingNextPageSchedules(false);
        } else {
          setIsLoadingSchedules(false);
        }
      }
    };
  });

  const loadMoreSchedules = useCallback(async (): Promise<void> => {
    if (!hasMoreSchedules || isLoadingNextPageSchedules || isLoadingSchedules)
      return;
    if (fetchSchedulesPageRef.current) {
      await fetchSchedulesPageRef.current(currentPage + 1, true);
    }
  }, [
    currentPage,
    hasMoreSchedules,
    isLoadingNextPageSchedules,
    isLoadingSchedules,
  ]);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setCurrentPage(0);
        setHasMoreSchedules(false);
        if (fetchSchedulesPageRef.current) {
          fetchSchedulesPageRef.current(0, false);
        }
      },
      filters.searchQuery ? 300 : 0
    );

    return () => clearTimeout(timeoutId);
  }, [filters, sort, locationData.location]);

  const resetFilters = useCallback((): void => {
    setFilters(initialFilters);
    loadInitialFilterOptions();
  }, [loadInitialFilterOptions]);

  const isAnyFilterApplied = useCallback((): boolean => {
    return (
      filters.selectedActivity !== null ||
      filters.selectedFacility !== null ||
      filters.selectedDayOfWeek !== null ||
      filters.selectedHour !== null ||
      (typeof filters.searchQuery === "string" &&
        filters.searchQuery &&
        filters.searchQuery.trim() !== "")
    );
  }, [filters]);

  const getApiParams = (): Record<string, string> => {
    const params: Record<string, string> = {};
    if (filters.pageNumber) params["page"] = filters.pageNumber.toString();
    if (filters.size) params["size"] = filters.size.toString();
    if (filters.selectedDayOfWeek)
      params["day"] = filters.selectedDayOfWeek.id.toString();
    if (filters.selectedHour)
      params["time"] = filters.selectedHour.id.toString();
    if (sort) params["sort"] = sort;
    if (sort === "Nearby" && locationData.location) {
      params["latitude"] = locationData.location.latitude.toString();
      params["longitude"] = locationData.location.longitude.toString();
    }
    if (filters.searchQuery && filters.searchQuery.trim() !== "")
      params["q"] = filters.searchQuery.trim();
    return params;
  };

  const value: ScheduleContextValue = {
    filters,
    filterOptions,
    sortOptions,
    sort,
    schedules,
    isLoadingOptions,
    isLoadingSchedules,
    isLoadingNextPageSchedules,
    hasMoreSchedules,
    loadMoreSchedules,
    setSelectedActivity: handleActivityChange,
    setSelectedFacility: handleFacilityChange,
    setSelectedDayOfWeek,
    setSelectedHour,
    setSearchQuery,
    setSelectedSort: handleSortChange,
    resetFilters,
    isAnyFilterApplied,
  };

  return React.createElement(ScheduleContext.Provider, { value }, children);
}
