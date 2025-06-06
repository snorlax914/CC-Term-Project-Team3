import { getUserStats } from "@/api/stats";
import { User } from "@/types/user";
import { create } from "zustand";

interface StatsState {
  userStats: User | null;
  fetched: boolean;
  loading: boolean;
  error: string | null;
  fetchUserStats: (username: string) => Promise<void>;
  clearStats: () => void;
}

export const useStatsStore = create<StatsState>((set, get) => ({
  userStats: null,
  loading: false,
  fetched: false,
  error: null,

  fetchUserStats: async (username: string) => {
    const { fetched } = get();
    if (fetched || get().loading) return;

    set(() => ({
      loading: true,
      error: null,
    }));

    try {
      const data = await getUserStats(username);
      set(() => ({
        userStats: data,
        loading: false,
        fetched: true,
      }));
    } catch (error) {
      console.error("❌ Failed to fetch stats:", error);
      set(() => ({
        userStats: null,
        loading: false,
        fetched: false,
        error: "통계 정보를 불러오는 데 실패했습니다.",
      }));
    }
  },

  clearStats: () => {
    set(() => ({
      userStats: null,
      loading: false,
      fetched: false,
      error: null,
    }));
  }
}));
