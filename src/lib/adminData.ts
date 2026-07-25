/**
 * adminData.ts
 * -----------
 * Single source of truth for all admin-related localStorage data:
 *   - Pending approval queue (cooperatives & buyers awaiting review)
 *   - Approved / suspended account statuses
 *
 * Cooperatives register themselves via the /register page.
 * Admins approve/reject via /admin/verification.
 * Status is reflected back to the cooperative auth layer.
 */

export type ApprovalStatus = "Pending" | "Approved" | "Rejected" | "Suspended";

export type PendingEntry = {
  id: string;           // unique — same as email
  name: string;         // cooperative / buyer name
  email: string;
  type: "Cooperative" | "Buyer";
  district: string;
  submittedAt: string;  // ISO date string
  status: ApprovalStatus;
  docs: number;         // number of documents submitted (default 0)
};

const ADMIN_KEY = "agriconnect.adminData";

type AdminState = {
  queue: PendingEntry[];
};

function read(): AdminState {
  if (typeof window === "undefined") return { queue: [] };
  try {
    const raw = localStorage.getItem(ADMIN_KEY);
    if (!raw) return { queue: [] };
    return JSON.parse(raw) as AdminState;
  } catch {
    return { queue: [] };
  }
}

function write(state: AdminState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADMIN_KEY, JSON.stringify(state));
}

// ── Public API ────────────────────────────────────────────────────────────────

/** Add a new cooperative/buyer registration to the approval queue. */
export function submitForApproval(entry: Omit<PendingEntry, "id" | "submittedAt" | "status" | "docs">) {
  const state = read();
  // Don't duplicate
  if (state.queue.some((e) => e.email === entry.email)) return;
  state.queue.push({
    id: entry.email,
    submittedAt: new Date().toISOString(),
    status: "Pending",
    docs: 0,
    ...entry,
  });
  write(state);
}

/** Get the full queue (all statuses). */
export function getQueue(): PendingEntry[] {
  return read().queue;
}

/** Get only entries with a given status. */
export function getByStatus(status: ApprovalStatus): PendingEntry[] {
  return read().queue.filter((e) => e.status === status);
}

/** Approve an entry by email. */
export function approveEntry(email: string) {
  const state = read();
  state.queue = state.queue.map((e) =>
    e.email === email ? { ...e, status: "Approved" } : e
  );
  write(state);
}

/** Reject an entry by email. */
export function rejectEntry(email: string) {
  const state = read();
  state.queue = state.queue.map((e) =>
    e.email === email ? { ...e, status: "Rejected" } : e
  );
  write(state);
}

/** Suspend an approved account. */
export function suspendEntry(email: string) {
  const state = read();
  state.queue = state.queue.map((e) =>
    e.email === email ? { ...e, status: "Suspended" } : e
  );
  write(state);
}

/** Get approval status for a specific email (null = not found). */
export function getStatus(email: string): ApprovalStatus | null {
  const entry = read().queue.find((e) => e.email === email);
  return entry?.status ?? null;
}

/** Total counts by status — used for admin stats. */
export function getCounts(): Record<ApprovalStatus, number> {
  const q = read().queue;
  return {
    Pending: q.filter((e) => e.status === "Pending").length,
    Approved: q.filter((e) => e.status === "Approved").length,
    Rejected: q.filter((e) => e.status === "Rejected").length,
    Suspended: q.filter((e) => e.status === "Suspended").length,
  };
}
