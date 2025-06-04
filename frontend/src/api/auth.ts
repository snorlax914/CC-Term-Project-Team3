import apiInstance from "./apiInstance";

interface LoginResponse {
  oauth_url: string;
  state: string;
};


export const login = async (): Promise<LoginResponse> => {
  try {
    const response = await apiInstance.get('/login');
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};