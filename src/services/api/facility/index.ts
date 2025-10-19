import { apiClient } from "./../axios";
import { FacilityService } from "./FacilityService";
import { FacilityServiceImpl } from "./FacilityServiceImpl";

export const facilityService: FacilityService = new FacilityServiceImpl(
  apiClient
);
