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
  const token = getToken();
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch {
    removeToken();
    return false;
  }
}
  