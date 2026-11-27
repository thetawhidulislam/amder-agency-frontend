const TOKEN_KEY = "aa_admin_token";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    return;
  }
}

export function clearToken(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    return;
  }
}

export function setSessionFlag(days: number): void {
  if (typeof window === "undefined") return;
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `aa_session=1; Path=/; SameSite=Lax; Max-Age=${days * 24 * 60 * 60}${secure}`;
  } catch {
    return;
  }
}

export function clearSessionFlag(): void {
  if (typeof window === "undefined") return;
  try {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `aa_session=; Path=/; SameSite=Lax; Max-Age=0${secure}`;
  } catch {
    return;
  }
}
