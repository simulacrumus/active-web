import { apiClient } from "./../axios";
import { ScheduleService } from "./ScheduleService";
import { ScheduleServiceImpl } from "./ScheduleServiceImpl";

export const scheduleService: ScheduleService = new ScheduleServiceImpl(
  apiClient
);
