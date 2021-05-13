import { resetParams, setKeyAndToken } from "../api";

export function isAuthenticated() {
  const key = window.localStorage.getItem("key");
  const token = window.localStorage.getItem("token");

  return (
    key !== undefined &&
    key !== "" &&
    key !== null &&
    token !== null &&
    token !== undefined &&
    token !== ""
  );
}

export function authenticate(key: string, token: string) {
  window.localStorage.setItem("key", key);
  window.localStorage.setItem("token", token);

  setKeyAndToken(key, token);
}

export function clearLocalStorage() {
  window.localStorage.clear();

  resetParams();
}
