export function getAccessToken() {
  const raw = localStorage.getItem("accessToken");
  return raw ? JSON.parse(raw) : null;
}

export function getAuthUser() {
  const raw = localStorage.getItem("authUser");
  return raw ? JSON.parse(raw) : null;
}

export function setAuthSession(auth, token) {
  localStorage.setItem("authUser", JSON.stringify(auth));
  localStorage.setItem("accessToken", JSON.stringify(token));
  localStorage.setItem("login", "true");
}

export function getAuthHeaders() {
  return {
    Authorization: "Bearer " + getAccessToken(),
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
  };
}

export function isLoggedIn() {
  return localStorage.getItem("login") === "true";
}

export function clearAuthSession() {
  localStorage.removeItem("login");
  localStorage.removeItem("authUser");
  localStorage.removeItem("accessToken");
}
