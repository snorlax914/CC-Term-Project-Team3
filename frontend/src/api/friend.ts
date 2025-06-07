import apiInstance from "./apiInstance"

interface SearchUser {
  id: string
  login: string
  avatar_url: string
  html_url: string
}

export interface Friend {
  id: number
  github_id: string
  login: string
  avatar_url: string
  html_url: string
  repos_count: number
  stars: number
  forks: number
  commit_count: number
  pulls: number
  issues: number
  score: number
}

export type FriendListResponse = Friend[];

export type SearchUserResponse = SearchUser[]

export interface FriendRequest {
  request_id: number,
  from_user: {
          id: number,
          login: string,
          avatar_url: string,
      },
  status: string
}

export type FriendRequestResponse = FriendRequest[]

export const searchUser = async (query: string): Promise<SearchUserResponse> => {
  try {
    const res = await apiInstance.get("/search", {
      params: {
        query,
      },
    })
    console.log("Search user response:", res.data)
    return res.data
  } catch (error) {
    console.error("Error searching user:", error)
    throw error
  }
}

export const acceptFriendRequest = async (requestId: string): Promise<void> => {
  try {
    const res = await apiInstance.put(`/friends/requests/${requestId}/accept`)
    return res.data;
  } catch (error) {
    throw error
  }
}

export const rejectFriendRequest = async (requestId: string): Promise<void> => {
  try {
    const res = await apiInstance.put(`/friends/requests/${requestId}/reject`)
    return res.data;
  } catch (error) {
    throw error
  }
}

export const getFriendList = async (): Promise<FriendListResponse> => {
  try {
    const res = await apiInstance.get("/friends")
    console.log("Friend list response:", res.data)
    return res.data
  } catch (error) {
    console.error("Error fetching friend list:", error)
    throw error
  }
}

export const deleteFriend = async (friendId: number): Promise<void> => {
  try {
    const res = await apiInstance.delete(`/friends/${friendId}/delete`)
    return res.data
  } catch (error) {
    console.error("Error deleting friend:", error)
    throw error
  }
}

export const getFriendRequests = async (): Promise<FriendRequestResponse> => {
  try {
    const res = await apiInstance.get("/friends/requests")
    console.log("Friend requests response:", res.data)
    return res.data
  } catch (error) {
    console.error("Error fetching friend requests:", error)
    throw error
  }
}

export const sendFriendRequest = async (friendId: string): Promise<void> => {
  try {
    const res = await apiInstance.post("/friends/request", { friend_id: friendId })
    return res.data
  } catch (error) {
    console.error("Error sending friend request:", error)
    throw error
  }
}