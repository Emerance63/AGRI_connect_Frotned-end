import { getStatus } from "@/lib/adminData";
import { apiLogin, apiRegister, saveToken, clearToken, getToken } from "@/lib/apiClient";

export type Account = {
  cooperativeName: string;
  email: string;
  password: string;
  district?: string;
};

const ACCOUNTS_KEY = "agriconnect_accounts";
const SESSION_KEY = "agriconnect_session";

// Demo account — always pre-approved, no registration needed
const DEMO_ACCOUNT: Account = {
  cooperativeName: "Green Valley Cooperative",
  email: "demo@coop.rw",
  password: "demo1234",
};

const DEMO_EMAILS = new Set([DEMO_ACCOUNT.email]);

const isBrowser = () => typeof window !== "undefined";

function getAccounts(): Account[] {
  if (!isBrowser()) return [DEMO_ACCOUNT];
  try {
    const stored = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? "[]") as Account[];
    const hasDemo = stored.some((a) => a.email === DEMO_ACCOUNT.email);
    return hasDemo ? stored : [DEMO_ACCOUNT, ...stored];
  } catch {
    return [DEMO_ACCOUNT];
  }
}

function saveAccounts(accounts: Account[]) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

/**
 * Register an account locally (localStorage fallback) and optionally via
 * the real API. Returns immediately after local registration so the UI
 * stays responsive; the API call is best-effort.
 */
export function registerAccount(account: Account): { ok: boolean; message?: string } {
  const accounts = getAccounts();
  const email = account.email.trim().toLowerCase();

  if (accounts.some((item) => item.email === email)) {
    return { ok: false, message: "An account already exists for this email address." };
  }

  saveAccounts([
    ...accounts,
    {
      ...account,
      cooperativeName: account.cooperativeName.trim(),
      email,
      district: account.district?.trim() || undefined,
    },
  ]);
  return { ok: true };
}

/**
 * Register via the real API. Stores JWT on success.
 * Callers should still call registerAccount() for local fallback.
 */
export async function registerAccountApi(payload: {
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
}): Promise<{ ok: boolean; message?: string }> {
  try {
    const response = await apiRegister(payload);
    if (response.accessToken) {
      saveToken(response.accessToken);
    }
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed.";
    return { ok: false, message };
  }
}

/**
 * Sign in synchronously against localStorage (always works for demo/offline).
 * Also attempts a real API login and stores the JWT on success.
 */
export function signIn(
  email: string,
  password: string
): { ok: boolean; message?: string; status?: "pending" | "rejected" | "suspended" } {
  const normalizedEmail = email.trim().toLowerCase();

  // Attempt real API login in the background — store JWT if it succeeds
  apiLogin(normalizedEmail, password)
    .then((res) => {
      if (res.accessToken) saveToken(res.accessToken);
    })
    .catch(() => {
      // API login failed — continue with localStorage session only
    });

  // Demo accounts always succeed without approval checks
  if (DEMO_EMAILS.has(normalizedEmail)) {
    const account = getAccounts().find(
      (item) => item.email === normalizedEmail && item.password === password
    );
    if (!account) return { ok: false, message: "Incorrect email or password." };
    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: normalizedEmail }));
    return { ok: true };
  }

  // Find the account in localStorage
  const account = getAccounts().find(
    (item) => item.email === normalizedEmail && item.password === password
  );

  if (!account) return { ok: false, message: "Incorrect email or password." };

  // Check admin approval status
  const approvalStatus = getStatus(normalizedEmail);

  if (approvalStatus === "Pending" || approvalStatus === null) {
    return {
      ok: false,
      status: "pending",
      message:
        "Your account is awaiting admin approval. You will be able to log in once approved.",
    };
  }

  if (approvalStatus === "Rejected") {
    return {
      ok: false,
      status: "rejected",
      message:
        "Your registration was not approved. Please contact support for more information.",
    };
  }

  if (approvalStatus === "Suspended") {
    return {
      ok: false,
      status: "suspended",
      message: "Your account has been suspended. Please contact the administrator.",
    };
  }

  // Approved — create local session
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email: normalizedEmail }));
  return { ok: true };
}

export function isAuthenticated() {
  if (!isBrowser()) return false;
  return Boolean(localStorage.getItem(SESSION_KEY));
}

export function signOut() {
  if (isBrowser()) {
    localStorage.removeItem(SESSION_KEY);
    clearToken();
  }
}

export function getCurrentAccount(): Account | null {
  if (!isBrowser()) return null;
  const sessionRaw = localStorage.getItem(SESSION_KEY);
  if (!sessionRaw) return null;
  try {
    const session = JSON.parse(sessionRaw);
    return getAccounts().find((a) => a.email === session.email) ?? null;
  } catch {
    return null;
  }
}

export function resetPassword(email: string, password: string) {
  const accounts = getAccounts();
  const normalizedEmail = email.trim().toLowerCase();
  const index = accounts.findIndex((a) => a.email === normalizedEmail);
  if (index === -1) return { ok: false, message: "No account was found for that email address." };
  accounts[index] = { ...accounts[index], password };
  saveAccounts(accounts);
  return { ok: true };
}

/** Returns true when a real JWT token is present (API is usable). */
export function hasApiToken(): boolean {
  return Boolean(getToken());
}
