import { useAuthStore } from "@/stores/useAuthStore";

export const getToken = () => {
  return localStorage.getItem('token');
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token);
}

export const removeToken = () => {
  localStorage.removeItem('token');
}

export const isValidToken = () => {
  const accessToken = useAuthStore.getState().accessToken;
  if (!accessToken) return false;
  return accessToken.length > 0;
}
  