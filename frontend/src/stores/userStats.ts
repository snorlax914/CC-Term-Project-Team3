import { getStats, StatsResponse } from "@/api/stats";
import { create } from "zustand";

interface StatsState {
  stats: StatsResponse | null;
  loading: boolean;
  error: string | null;
  fetched: boolean;
  fetchStats: (username: string) => Promise<void>;
  clearStats: () => void;
}

export const useStatsStore = create<StatsState>((set, get) => ({
  stats: null,
  loading: false,
  error: null,
  fetched: false,

  fetchStats: async (username: string) => {
    if (get().fetched || get().loading) return;

    set({ loading: true, error: null });
    try {
      console.log("📊 Fetching stats for:", username);
      const data = await getStats(username);
      set({
        stats: data,
        loading: false,
        fetched: true,
        error: null,
      });
    } catch (error) {
      console.error("❌ Failed to fetch stats for:", username, error);
      set({
        stats: null,
        loading: false,
        error: "통계 정보를 불러오는 데 실패했습니다.",
        fetched: false,
      });
    }
  },

  clearStats: () => {
    set({
      stats: null,
      loading: false,
      error: null,
      fetched: false,
    });
  }
}));
