const BASE_URL = "https://agriconnectbackend-production-c9b1.up.railway.app";
const TOKEN_KEY = "agriconnect_jwt";

export function saveToken(token: string) {
  if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY);
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`${res.status}: ${text}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export type AuthResponse = { accessToken: string; tokenType: string };

export type CooperativeStatus = "PENDING" | "APPROVED" | "REJECTED";

export type CooperativeResponse = {
  cooperativeId: string;
  name: string;
  registrationNumber: string;
  province: string;
  district: string;
  sector: string;
  status: CooperativeStatus;
};

export async function apiLogin(email: string, password: string): Promise<AuthResponse> {
  return request<AuthResponse>("POST", "/api/auth/login", { email, password });
}

export async function apiRegister(payload: {
  fullName: string; phoneNumber: string; nationalId: string;
  email: string; password: string; confirmPassword: string;
  cooperativeName: string; registrationNumber: string;
  province: string; district: string; sector: string;
  contactInfo: string; description?: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("POST", "/api/auth/register", payload);
}

export async function apiGetAllCooperatives(): Promise<CooperativeResponse[]> {
  return request<CooperativeResponse[]>("GET", "/api/admin/cooperatives");
}

export async function apiGetPendingCooperatives(): Promise<CooperativeResponse[]> {
  return request<CooperativeResponse[]>("GET", "/api/admin/cooperatives/pending");
}

export async function apiApproveCooperative(id: string): Promise<CooperativeResponse> {
  return request<CooperativeResponse>("PATCH", `/api/admin/cooperatives/${id}/approve`);
}

export async function apiRejectCooperative(id: string): Promise<CooperativeResponse> {
  return request<CooperativeResponse>("PATCH", `/api/admin/cooperatives/${id}/reject`);
}

export async function apiDeleteCooperative(id: string): Promise<void> {
  return request<void>("DELETE", `/api/admin/cooperatives/${id}`);
}
