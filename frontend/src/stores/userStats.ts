import { ContributionsResponse, getContributions, getStats, StatsResponse } from "@/api/stats";
import { create } from "zustand";

interface StatsState {
  stats: StatsResponse | null;
  contributions: ContributionsResponse | null;
  loading: {
    stats: boolean;
    contributions: boolean;
  };
  error: string | null;
  fetched: {
    stats: boolean;
    contributions: boolean;
  };
  fetchStats: (username: string) => Promise<void>;
  fetchContributions: (username: string) => Promise<void>;
  clearStats: () => void;
  clearContributions: () => void;
  resetAll: () => void;
}

export const useStatsStore = create<StatsState>((set, get) => ({
  stats: null,
  contributions: null,
  loading: {
    stats: false,
    contributions: false,
  },
  fetched: {
    stats: false,
    contributions: false,
  },
  error: null,

  fetchStats: async (username: string) => {
    const { fetched } = get();
    if (fetched.stats || get().loading.stats) return;

    set((state) => ({
      loading: { ...state.loading, stats: true },
      error: null,
    }));

    try {
      console.log("📊 Fetching stats for:", username);
      const data = await getStats(username);
      set((state) => ({
        stats: data,
        loading: { ...state.loading, stats: false },
        fetched: { ...state.fetched, stats: true },
      }));
    } catch (error) {
      console.error("❌ Failed to fetch stats:", error);
      set((state) => ({
        stats: null,
        loading: { ...state.loading, stats: false },
        fetched: { ...state.fetched, stats: false },
        error: "통계 정보를 불러오는 데 실패했습니다.",
      }));
    }
  },

  fetchContributions: async (username: string) => {
    const { fetched } = get();
    if (fetched.contributions  || get().loading.contributions) return;

    set((state) => ({
      loading: { ...state.loading, contributions: true },
      error: null,
    }));

    try {
      console.log("📊 Fetching contributions for:", username);
      const data = await getContributions(username);
      console.log("✅ Fetched contributions:", data);
      set((state) => ({
        contributions: data,
        loading: { ...state.loading, contributions: false },
        fetched: { ...state.fetched, contributions: true },
      }));
    } catch (error) {
      console.error("❌ Failed to fetch contributions:", error);
      set((state) => ({
        contributions: null,
        loading: { ...state.loading, contributions: false },
        fetched: { ...state.fetched, contributions: false },
        error: "기여 정보를 불러오는 데 실패했습니다.",
      }));
    }
  },

  clearStats: () => {
    set((state) => ({
      stats: null,
      loading: { ...state.loading, stats: false },
      fetched: { ...state.fetched, stats: false },
      error: null,
    }));
  },

  clearContributions: () => {
    set((state) => ({
      contributions: null,
      loading: { ...state.loading, contributions: false },
      fetched: { ...state.fetched, contributions: false },
      error: null,
    }));
  },

  resetAll: () => {
    set(() => ({
      stats: null,
      contributions: null,
      loading: { stats: false, contributions: false },
      fetched: { stats: false, contributions: false },
      error: null,
    }));
  },
}));
