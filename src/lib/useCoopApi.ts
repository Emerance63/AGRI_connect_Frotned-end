"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getToken,
  apiGetProducts,
  apiCreateProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  apiSetProductVisibility,
  apiGetMembers,
  apiCreateMember,
  apiUpdateMember,
  apiDeactivateMember,
  type ApiProduct,
  type ApiMember,
  type CreateProductPayload,
  type UpdateProductPayload,
  type CreateMemberPayload,
  type UpdateMemberPayload,
} from "@/lib/apiClient";

// ─── Types ────────────────────────────────────────────────────────────────────

export type { ApiProduct, ApiMember };

export type CoopApiState = {
  products: ApiProduct[];
  members: ApiMember[];
  loading: boolean;
  error: string | null;
  // Product actions
  createProduct: (data: CreateProductPayload) => Promise<ApiProduct | null>;
  updateProduct: (id: string, data: UpdateProductPayload) => Promise<ApiProduct | null>;
  deleteProduct: (id: string) => Promise<boolean>;
  setProductVisibility: (id: string, visible: boolean) => Promise<ApiProduct | null>;
  // Member actions
  createMember: (data: CreateMemberPayload) => Promise<ApiMember | null>;
  updateMember: (id: string, data: UpdateMemberPayload) => Promise<ApiMember | null>;
  deactivateMember: (id: string) => Promise<boolean>;
  // Refresh
  refreshProducts: () => Promise<void>;
  refreshMembers: () => Promise<void>;
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * API-backed hook for cooperative products and members.
 * All mutations optimistically update local state and fall back gracefully
 * when the API call fails.
 */
export function useCoopApi(): CoopApiState {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [members, setMembers] = useState<ApiMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ── Fetch helpers ──────────────────────────────────────────────────────────

  const fetchProducts = useCallback(async () => {
    if (!getToken()) return;
    try {
      const data = await apiGetProducts();
      setProducts(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load products.";
      setError(msg);
    }
  }, []);

  const fetchMembers = useCallback(async () => {
    if (!getToken()) return;
    try {
      const data = await apiGetMembers();
      setMembers(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to load members.";
      setError(msg);
    }
  }, []);

  // ── On mount ───────────────────────────────────────────────────────────────

  useEffect(() => {
    let active = true;

    async function loadAll() {
      if (!getToken()) return;
      setLoading(true);
      setError(null);
      try {
        const [fetchedProducts, fetchedMembers] = await Promise.allSettled([
          apiGetProducts(),
          apiGetMembers(),
        ]);
        if (!active) return;
        if (fetchedProducts.status === "fulfilled") setProducts(fetchedProducts.value);
        if (fetchedMembers.status === "fulfilled") setMembers(fetchedMembers.value);
        if (
          fetchedProducts.status === "rejected" ||
          fetchedMembers.status === "rejected"
        ) {
          setError("Some data could not be loaded from the server.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadAll();
    return () => {
      active = false;
    };
  }, []);

  // ── Product mutations ──────────────────────────────────────────────────────

  const createProduct = useCallback(
    async (data: CreateProductPayload): Promise<ApiProduct | null> => {
      if (!getToken()) return null;
      try {
        const created = await apiCreateProduct(data);
        setProducts((prev) => [...prev, created]);
        return created;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to create product.";
        setError(msg);
        return null;
      }
    },
    []
  );

  const updateProduct = useCallback(
    async (id: string, data: UpdateProductPayload): Promise<ApiProduct | null> => {
      if (!getToken()) return null;
      try {
        const updated = await apiUpdateProduct(id, data);
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return updated;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to update product.";
        setError(msg);
        return null;
      }
    },
    []
  );

  const deleteProduct = useCallback(async (id: string): Promise<boolean> => {
    if (!getToken()) return false;
    try {
      await apiDeleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to delete product.";
      setError(msg);
      return false;
    }
  }, []);

  const setProductVisibility = useCallback(
    async (id: string, visible: boolean): Promise<ApiProduct | null> => {
      if (!getToken()) return null;
      try {
        const updated = await apiSetProductVisibility(id, visible);
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return updated;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to update visibility.";
        setError(msg);
        return null;
      }
    },
    []
  );

  // ── Member mutations ───────────────────────────────────────────────────────

  const createMember = useCallback(
    async (data: CreateMemberPayload): Promise<ApiMember | null> => {
      if (!getToken()) return null;
      try {
        const created = await apiCreateMember(data);
        setMembers((prev) => [...prev, created]);
        return created;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to create member.";
        setError(msg);
        return null;
      }
    },
    []
  );

  const updateMember = useCallback(
    async (id: string, data: UpdateMemberPayload): Promise<ApiMember | null> => {
      if (!getToken()) return null;
      try {
        const updated = await apiUpdateMember(id, data);
        setMembers((prev) => prev.map((m) => (m.id === id ? updated : m)));
        return updated;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Failed to update member.";
        setError(msg);
        return null;
      }
    },
    []
  );

  const deactivateMember = useCallback(async (id: string): Promise<boolean> => {
    if (!getToken()) return false;
    try {
      await apiDeactivateMember(id);
      setMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: "INACTIVE" as const } : m))
      );
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to deactivate member.";
      setError(msg);
      return false;
    }
  }, []);

  return {
    products,
    members,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    setProductVisibility,
    createMember,
    updateMember,
    deactivateMember,
    refreshProducts: fetchProducts,
    refreshMembers: fetchMembers,
  };
}
