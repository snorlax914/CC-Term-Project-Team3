import apiInstance from "./apiInstance"

interface SearchUser {
  id: string
  login: string
  avatar_url: string
  html_url: string
}

export type SearchUserResponse = SearchUser[]

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