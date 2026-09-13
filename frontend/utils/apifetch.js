const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://life-rpg-6jie.onrender.com"
).replace(/\/+$/, "");

export const apiFetch = async (url, options = {}) => {
  const requestUrl = new URL(url, `${API_BASE_URL}/`).toString();

  let response = await fetch(requestUrl, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshResponse = await fetch(
      `${API_BASE_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (refreshResponse.ok) {
      response = await fetch(requestUrl, {
        ...options,
        credentials: "include",
      });
    }
  }

  return response;
};