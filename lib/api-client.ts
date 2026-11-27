import axios from "axios";
import { clearSessionFlag, clearToken, getToken } from "@/lib/auth-token";

/** Browser-side API client (contact form + admin panel). Sends the login cookie. */
export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"}/api/v1`,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (
      typeof window !== "undefined" &&
      axios.isAxiosError(err) &&
      err.response?.status === 401 &&
      !window.location.pathname.startsWith("/admin/login")
    ) {
      clearToken();
      clearSessionFlag();
      window.location.href = "/admin/login";
    }
    return Promise.reject(err);
  }
);

export function getErrorMessage(err: unknown, fallback = "Something went wrong. Please try again.") {
  if (axios.isAxiosError(err)) {
    if (!err.response) return "Cannot reach the server. Check that the API is running.";
    const data = err.response.data as
      | { message?: string; errors?: { path: string; message: string }[] }
      | undefined;
    if (data?.errors?.length) return data.errors.map((e) => `${e.path}: ${e.message}`).join(", ");
    if (data?.message) return data.message;
  }
  return fallback;
}
