import { ApiClient } from "../ApiClient";
import { AxiosApiClient } from "./AxiosApiClient";

const apiBaseUrl = (import.meta as any).env.API_BASE_URL || "/api";
const apiKey = (import.meta as any).env.API_KEY || "";

export const apiClient: ApiClient = new AxiosApiClient(apiBaseUrl, apiKey);
