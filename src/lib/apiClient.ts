const BASE_URL = ""; // Empty = use local Next.js proxy routes (avoids CORS)
const BACKEND_URL = "https://agriconnectbackend-production-c9b1.up.railway.app"; // used only for non-proxied public calls
const TOKEN_KEY = "agriconnect_jwt";

// ─── Token helpers ────────────────────────────────────────────────────────────

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

// ─── Core fetch helper ────────────────────────────────────────────────────────

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

// Direct (non-proxied) for public endpoints
async function requestDirect<T>(method: string, path: string): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, { method });
  if (!res.ok) throw new Error(`${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

// ─── Types ────────────────────────────────────────────────────────────────────

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
  fullName: string;
  phoneNumber: string;
  nationalId: string;
  email: string;
  password: string;
  confirmPassword: string;
  cooperativeName: string;
  registrationNumber: string;
  province: string;
  district: string;
  sector: string;
  contactInfo: string;
  description?: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("POST", "/api/auth/register", payload);
}

// ─── Admin ────────────────────────────────────────────────────────────────────

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

// ─── Members ─────────────────────────────────────────────────────────────────

export type MemberStatusApi = "ACTIVE" | "INACTIVE" | "PENDING";

export type ApiMember = {
  id: string;
  name: string;
  phoneNumber: string;
  village: string;
  cropType: string;
  status: MemberStatusApi;
};

export type CreateMemberPayload = {
  name: string;
  phoneNumber: string;
  village: string;
  cropType: string;
  status?: MemberStatusApi;
};

export type UpdateMemberPayload = Partial<CreateMemberPayload>;

export async function apiGetMembers(): Promise<ApiMember[]> {
  return request<ApiMember[]>("GET", "/api/members");
}

export async function apiCreateMember(data: CreateMemberPayload): Promise<ApiMember> {
  return request<ApiMember>("POST", "/api/members", data);
}

export async function apiUpdateMember(id: string, data: UpdateMemberPayload): Promise<ApiMember> {
  return request<ApiMember>("PUT", `/api/members/${id}`, data);
}

export async function apiDeactivateMember(id: string): Promise<void> {
  return request<void>("DELETE", `/api/members/${id}`);
}

export async function apiReactivateMember(id: string): Promise<ApiMember> {
  return request<ApiMember>("PATCH", `/api/members/${id}/reactivate`);
}

// ─── Products ─────────────────────────────────────────────────────────────────

export type ApiProduct = {
  id: string;
  name: string;
  category: string;
  pricePerUnit: number;
  unit: string;
  stockQuantity: number;
  description: string;
  status: "AVAILABLE" | "LOW_STOCK" | "OUT_OF_STOCK";
  visible: boolean;
  imageUrl?: string;
};

export type CreateProductPayload = {
  name: string;
  category: string;
  pricePerUnit: number;
  unit: string;
  stockQuantity: number;
  description?: string;
  imageUrl?: string;
};

export type UpdateProductPayload = Partial<CreateProductPayload>;

export async function apiGetProducts(): Promise<ApiProduct[]> {
  return request<ApiProduct[]>("GET", "/api/cooperative/products");
}

export async function apiCreateProduct(data: CreateProductPayload): Promise<ApiProduct> {
  return request<ApiProduct>("POST", "/api/cooperative/products", data);
}

export async function apiUpdateProduct(id: string, data: UpdateProductPayload): Promise<ApiProduct> {
  return request<ApiProduct>("PUT", `/api/cooperative/products/${id}`, data);
}

export async function apiDeleteProduct(id: string): Promise<void> {
  return request<void>("DELETE", `/api/cooperative/products/${id}`);
}

export async function apiSetProductVisibility(id: string, visible: boolean): Promise<ApiProduct> {
  return request<ApiProduct>("PATCH", `/api/cooperative/products/${id}/visibility`, { visible });
}

// ─── Stock ────────────────────────────────────────────────────────────────────

export type ApiStockEntry = {
  id: string;
  productId: string;
  productName: string;
  quantityAdded: number;
  unit: string;
  recordedAt: string;
  notes?: string;
};

export type ApiCurrentStock = {
  productId: string;
  productName: string;
  currentQuantity: number;
  unit: string;
};

export type PagedResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export type RecordStockPayload = {
  productId: string;
  quantityAdded: number;
  notes?: string;
};

export async function apiGetStockHistory(
  page = 0,
  size = 20
): Promise<PagedResponse<ApiStockEntry>> {
  return request<PagedResponse<ApiStockEntry>>(
    "GET",
    `/api/cooperative/stock?page=${page}&size=${size}`
  );
}

export async function apiRecordStock(data: RecordStockPayload): Promise<ApiStockEntry> {
  return request<ApiStockEntry>("POST", "/api/cooperative/stock", data);
}

export async function apiGetCurrentStock(productId: string): Promise<ApiCurrentStock> {
  return request<ApiCurrentStock>("GET", `/api/cooperative/stock/product/${productId}/current`);
}

// ─── Sales ────────────────────────────────────────────────────────────────────

export type ApiSale = {
  id: string;
  productId: string;
  productName: string;
  customerId?: string;
  customerName?: string;
  quantitySold: number;
  unit: string;
  totalAmount: number;
  currency: string;
  soldAt: string;
  notes?: string;
};

export type RecordSalePayload = {
  productId: string;
  customerId?: string;
  quantitySold: number;
  totalAmount: number;
  notes?: string;
};

export type RevenueResponse = {
  totalRevenue: number;
  currency: string;
};

export async function apiGetSales(
  page = 0,
  size = 20
): Promise<PagedResponse<ApiSale>> {
  return request<PagedResponse<ApiSale>>(
    "GET",
    `/api/cooperative/sales?page=${page}&size=${size}`
  );
}

export async function apiRecordSale(data: RecordSalePayload): Promise<ApiSale> {
  return request<ApiSale>("POST", "/api/cooperative/sales", data);
}

export async function apiGetTotalRevenue(): Promise<RevenueResponse> {
  return request<RevenueResponse>("GET", "/api/cooperative/sales/revenue");
}

// ─── Customers ───────────────────────────────────────────────────────────────

export type ApiCustomer = {
  id: string;
  name: string;
  phoneNumber?: string;
  location?: string;
  email?: string;
  active: boolean;
};

export type CreateCustomerPayload = {
  name: string;
  phoneNumber?: string;
  location?: string;
  email?: string;
};

export type UpdateCustomerPayload = Partial<CreateCustomerPayload>;

export async function apiGetCustomers(): Promise<ApiCustomer[]> {
  return request<ApiCustomer[]>("GET", "/api/cooperative/customers");
}

export async function apiCreateCustomer(data: CreateCustomerPayload): Promise<ApiCustomer> {
  return request<ApiCustomer>("POST", "/api/cooperative/customers", data);
}

export async function apiUpdateCustomer(
  id: string,
  data: UpdateCustomerPayload
): Promise<ApiCustomer> {
  return request<ApiCustomer>("PUT", `/api/cooperative/customers/${id}`, data);
}

export async function apiDeleteCustomer(id: string): Promise<void> {
  return request<void>("DELETE", `/api/cooperative/customers/${id}`);
}

// ─── Staff ────────────────────────────────────────────────────────────────────

export type InviteStaffPayload = {
  email: string;
  role: string;
  name?: string;
};

export type StaffInviteResponse = {
  id: string;
  email: string;
  role: string;
  status: "PENDING" | "ACCEPTED";
};

export async function apiInviteStaff(data: InviteStaffPayload): Promise<StaffInviteResponse> {
  return request<StaffInviteResponse>("POST", "/api/cooperative/staff/invite", data);
}

// ─── SMS ──────────────────────────────────────────────────────────────────────

export type ApiSmsRecord = {
  id: string;
  recipient: string;
  message: string;
  sentAt: string;
  status: "DELIVERED" | "FAILED" | "PENDING";
};

export type SendSmsPayload = {
  recipient: string;
  message: string;
};

export async function apiGetSmsHistory(
  page = 0,
  size = 20
): Promise<PagedResponse<ApiSmsRecord>> {
  return request<PagedResponse<ApiSmsRecord>>(
    "GET",
    `/api/cooperative/sms?page=${page}&size=${size}`
  );
}

export async function apiSendSms(data: SendSmsPayload): Promise<ApiSmsRecord> {
  return request<ApiSmsRecord>("POST", "/api/cooperative/sms", data);
}

// ─── Public ───────────────────────────────────────────────────────────────────

export type PublicProduct = {
  id: string;
  name: string;
  category: string;
  pricePerUnit: number;
  unit: string;
  stockQuantity: number;
  description?: string;
  imageUrl?: string;
  cooperativeName: string;
};

export async function apiGetPublicProducts(cooperativeId: string): Promise<PublicProduct[]> {
  return requestDirect<PublicProduct[]>(
    "GET",
    `/api/public/cooperatives/${cooperativeId}/products`
  );
}
