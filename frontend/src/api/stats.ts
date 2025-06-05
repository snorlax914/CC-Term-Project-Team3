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

export interface ContributionDay {
  color: string;
  contributionCount: number;
  date: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export type ContributionsResponse = ContributionWeek[];



export const getStats = async (username: string): Promise<StatsResponse> => {
  try {
    const response = await apiInstance.get<StatsResponse>(`/stats/${username}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    throw error;
  }
}

export const getContributions = async (username: string): Promise<ContributionsResponse> => {
  try {
    const response = await apiInstance.get<ContributionsResponse>(`/contributions/${username}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch contributions:", error);
    throw error;
  }
}