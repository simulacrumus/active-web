import { apiClient } from "./../axios";
import { ActivityService } from "./ActivityService";
import { ActivityServiceImpl } from "./ActivityServiceImpl";

export const activityService: ActivityService = new ActivityServiceImpl(
  apiClient
);
