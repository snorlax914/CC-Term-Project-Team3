import { User } from "@/types/user";
import apiInstance from "./apiInstance";

export const getUserStats = async (username: string): Promise<User> => {
  try {
    const response = await apiInstance.get(`/user/${username}`);
    console.log("User stats fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user stats:", error);
    throw error;
  }
}