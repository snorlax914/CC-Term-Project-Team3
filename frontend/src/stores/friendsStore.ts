import { FriendRequestResponse, getFriendList, getFriendRequests } from "@/api/friend";
import { getUserStats } from "@/api/stats";
import type { User } from "@/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./useAuthStore";

interface friendState {
  friends: User[];
  requests: FriendRequestResponse;
  loading: boolean;
  error: string | null;
  fetched: boolean;
  fetchFriends: () => Promise<void>;
  clearFriends: () => void;
}

export const friendsStore = create<friendState>()(
  persist(
    (set, get) => ({
      friends: [],
      requests: [],
      loading: false,
      error: null,
      fetched: false,

      fetchFriends: async () => {
        if (get().loading) return;

        set({
          fetched: false,
          loading: true,
          error: null,
        });

        try {
          const friendList = await getFriendList();
          const user = useAuthStore.getState().user;
          const myStats = user?.login ? await getUserStats(user.login) : null;
          const requestList = await getFriendRequests();

          const convertedFriends: User[] = friendList.map(friend => ({
            ...friend,
            created_at: "",
            commits: [],
            contributions: [],
            languages: [],
            friendship_status: "accepted"
          }));

          const allUsers = myStats ? [myStats, ...convertedFriends] : convertedFriends;

          set({
            friends: allUsers,
            requests: requestList,
            fetched: true,
            loading: false,
          });
        } catch (error) {
          console.error("❌ Failed to fetch friends:", error);
          set({
            friends: [],
            requests: [],
            fetched: false,
            loading: false,
            error: "친구 목록을 불러오는 데 실패했습니다.",
          });
        }
      },

      clearFriends: () => {
        set({
          friends: [],
          requests: [],
          loading: false,
          error: null,
          fetched: false,
        });
      },
    }),
    {
      name: "friends-storage",
      partialize: (state) => ({
        friends: state.friends,
        requests: state.requests,
        fetched: state.fetched,
      }),
    }
  )
);
