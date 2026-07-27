"use client";

import { useEffect, useState, useMemo } from "react";
import { useCooperativeData, type ProductItemType } from "@/lib/cooperative-data";
import { useLanguage } from "@/lib/LanguageContext";
import AddProductModal from "@/components/products/AddProductModal";
import ProductItem from "@/components/products/ProductItem";
import ProductPreview from "@/components/products/ProductPreview";
import {
  getToken,
  apiGetProducts,
  apiCreateProduct,
  apiSetProductVisibility,
  type ApiProduct,
} from "@/lib/apiClient";

// ─── Map API product → local ProductItemType ─────────────────────────────────
function toLocalProduct(p: ApiProduct): ProductItemType {
  let status: "Healthy" | "Low" | "Out" = "Healthy";
  if (p.status === "LOW_STOCK") status = "Low";
  else if (p.status === "OUT_OF_STOCK") status = "Out";

  return {
    // Use a stable numeric id derived from the UUID string so the existing
    // ProductItem / ProductPreview components (which expect number) still work.
    id: Math.abs(
      p.id
        .split("")
        .reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) | 0, 0)
    ),
    // Stash the real UUID as a data attribute so mutations can use it
    // We keep it in the name field but also expose it via a custom property.
    name: p.name,
    tag: p.category,
    price: `RWF ${p.pricePerUnit.toLocaleString()}/${p.unit}`,
    weight: `${p.stockQuantity} ${p.unit}`,
    description: p.description ?? "",
    status,
    published: p.visible,
    imageUrl: p.imageUrl,
    // Non-standard but harmless — lets us look up the real id for API calls
    _apiId: p.id,
  } as ProductItemType & { _apiId: string };
}

// ─── Parse a numeric price string like "RWF 5,000/kg" → number ───────────────
function parsePrice(priceStr: string): number {
  const digits = priceStr.replace(/[^0-9]/g, "");
  return parseInt(digits, 10) || 0;
}

// ─── Parse a quantity string like "250 kg" → { qty, unit } ──────────────────
function parseQuantity(weightStr: string): { qty: number; unit: string } {
  const match = weightStr.match(/^([\d.]+)\s*(.*)$/);
  if (!match) return { qty: 0, unit: "kg" };
  return { qty: parseFloat(match[1]) || 0, unit: match[2].trim() || "kg" };
}

export default function ProductsBoard() {
  const { t } = useLanguage();
  const {
    products: localProducts,
    addProduct: addLocalProduct,
    toggleProductPublish,
  } = useCooperativeData();

  // API-fetched products (null means not loaded yet / API unavailable)
  const [apiProducts, setApiProducts] = useState<(ProductItemType & { _apiId?: string })[] | null>(
    null
  );
  const [apiLoading, setApiLoading] = useState(false);

  // The active list — API data wins, falls back to localStorage
  const products = (apiProducts ?? localProducts) as (ProductItemType & { _apiId?: string })[];

  const [selectedProduct, setSelectedProduct] = useState<ProductItemType | null>(
    null
  );

  const [openModal, setOpenModal] = useState(false);
  const [messageKey, setMessageKey] = useState<
    "default" | "previewing" | "published" | "draft" | "added"
  >("default");
  const [messageName, setMessageName] = useState("");
  const [messagePublished, setMessagePublished] = useState(true);

  // ── Fetch products from API on mount ──────────────────────────────────────
  useEffect(() => {
    if (!getToken()) return;

    let active = true;
    setApiLoading(true);

    apiGetProducts()
      .then((data) => {
        if (!active) return;
        const mapped = data.map(toLocalProduct);
        setApiProducts(mapped);
        setSelectedProduct(mapped[0] ?? null);
      })
      .catch(() => {
        // API unavailable — silently fall back to localStorage products
        if (active) setSelectedProduct(localProducts[0] ?? null);
      })
      .finally(() => {
        if (active) setApiLoading(false);
      });

    return () => {
      active = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Initialise selectedProduct from local data when API isn't available
  useEffect(() => {
    if (apiProducts === null && selectedProduct === null && localProducts.length > 0) {
      setSelectedProduct(localProducts[0]);
    }
  }, [apiProducts, localProducts, selectedProduct]);

  // Recomputes when locale changes
  const message = useMemo(() => {
    switch (messageKey) {
      case "previewing":
        return `${t.productsBoard.previewing} ${messageName}`;
      case "published":
      case "draft":
        return `${messageName} ${
          messagePublished ? t.productsBoard.nowPublished : t.productsBoard.nowDraft
        }.`;
      case "added":
        return `${messageName} ${t.productsBoard.addedSuccess}.`;
      default:
        return t.productsBoard.defaultMessage;
    }
  }, [messageKey, messageName, messagePublished, t]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handlePreview(product: ProductItemType) {
    setSelectedProduct(product);
    setMessageKey("previewing");
    setMessageName(product.name);
  }

  async function handlePublish(id: number) {
    const current = products.find((item) => item.id === id);
    if (!current) return;

    const next = { ...current, published: !current.published };
    const apiId = (current as ProductItemType & { _apiId?: string })._apiId;

    // Try real API when token + apiId are available
    if (getToken() && apiId) {
      try {
        const updated = await apiSetProductVisibility(apiId, next.published);
        const mappedUpdated = toLocalProduct(updated);
        setApiProducts((prev) =>
          (prev ?? []).map((p) => (p.id === id ? mappedUpdated : p))
        );
        setSelectedProduct(mappedUpdated);
        setMessageKey(next.published ? "published" : "draft");
        setMessageName(current.name);
        setMessagePublished(next.published);
        return;
      } catch {
        // Fall through to localStorage fallback
      }
    }

    // localStorage fallback
    toggleProductPublish(id);
    setSelectedProduct(next);
    setMessageKey(next.published ? "published" : "draft");
    setMessageName(current.name);
    setMessagePublished(next.published);
    window.dispatchEvent(new Event("storage"));
  }

  async function handleAddProduct(product: ProductItemType) {
    const apiId = (product as ProductItemType & { _apiId?: string })._apiId;

    // Try real API when token is available
    if (getToken()) {
      try {
        const { qty, unit } = parseQuantity(product.weight);
        const created = await apiCreateProduct({
          name: product.name,
          category: product.tag,
          pricePerUnit: parsePrice(product.price),
          unit,
          stockQuantity: qty,
          description: product.description,
          imageUrl: product.imageUrl,
        });
        const mapped = toLocalProduct(created);
        setApiProducts((prev) => [...(prev ?? []), mapped]);
        setSelectedProduct(mapped);
        setMessageKey("added");
        setMessageName(product.name);
        return;
      } catch {
        // Fall through to localStorage fallback
      }
    }

    // localStorage fallback
    addLocalProduct(product);
    setSelectedProduct(product);
    setMessageKey("added");
    setMessageName(product.name);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">
            {t.productsBoard.subtitle}
          </p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t.productsBoard.title}
          </h1>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700"
        >
          {t.productsBoard.addProduct}
        </button>
      </div>

      {/* Status bar */}
      <div className="rounded-xl border border-green-100 bg-green-50/80 px-4 py-3 text-sm text-green-900 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-100">
        {apiLoading ? "Loading products from server…" : message}
      </div>

      {/* Product grid */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onPreview={() => handlePreview(product)}
            onPublish={() => handlePublish(product.id)}
          />
        ))}
      </div>

      {selectedProduct && <ProductPreview product={selectedProduct} />}

      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={(product) => {
          void handleAddProduct(product);
          setOpenModal(false);
        }}
      />
    </div>
  );
}
