export const apiFetch = async (url, options = {}) => {
  let response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  if (response.status === 401) {
    const refreshResponse = await fetch(
      "https://life-rpg-6jie.onrender.com/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (refreshResponse.ok) {
      response = await fetch(url, {
        ...options,
        credentials: "include",
      });
    }
  }

  return response;
};