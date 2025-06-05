import apiInstance from "./apiInstance";

export interface LanguageStat {
  name: string;
  color: string;
  size: number;
}

export interface StatsResponse {
  commits: number;
  forks: number;
  issues: number;
  languages: LanguageStat[];
}

export const getStats = async (username: string): Promise<StatsResponse> => {
  try {
    const response = await apiInstance.get<StatsResponse>(`/stats/${username}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    throw error;
  }
}