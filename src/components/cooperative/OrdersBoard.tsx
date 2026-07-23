"use client";

import { useMemo, useState } from "react";
import { useCooperativeData } from "@/lib/cooperative-data";
import { useLanguage } from "@/lib/LanguageContext";

type OrderStatus = "Delivered" | "Dispatched" | "Preparing";

type OrderItem = {
  id: string;
  buyer: string;
  product: string;
  amount: string;
  date: string;
  status: OrderStatus;
  steps: string[];
  current: number;
};

const statusColor = {
  Delivered: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  Dispatched: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  Preparing: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
};

export default function OrdersBoard() {
  const { t } = useLanguage();
  const { orders } = useCooperativeData();

  const [selectedOrder, setSelectedOrder] = useState<OrderItem>(orders[0]!);
  const [panel, setPanel] = useState<"invoice" | "track">("invoice");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.buyer.toLowerCase().includes(search.toLowerCase());
      const matchStatus = filter === "All" || order.status === filter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, filter]);

  const total = orders.length;
  const preparing = orders.filter((o) => o.status === "Preparing").length;
  const dispatched = orders.filter((o) => o.status === "Dispatched").length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;

  const statusLabel: Record<string, string> = {
    Preparing: t.orders.statusPreparing,
    Dispatched: t.orders.statusDispatched,
    Delivered: t.orders.statusDelivered,
  };

  function selectInvoice(order: OrderItem) {
    setSelectedOrder(order);
    setPanel("invoice");
  }

  function selectTrack(order: OrderItem) {
    setSelectedOrder(order);
    setPanel("track");
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <p className="text-sm text-gray-400 dark:text-green-100/50">
          {t.orders.subtitle}
        </p>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t.orders.title}
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {([
          [t.orders.statTotal, total],
          [t.orders.statPreparing, preparing],
          [t.orders.statDispatched, dispatched],
          [t.orders.statDelivered, delivered],
        ] as [string, number][]).map(([title, value]) => (
          <div
            key={title}
            className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10"
          >
            <p className="text-sm text-gray-400 dark:text-green-100/50">{title}</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{value}</h2>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t.orders.searchPlaceholder}
          className="flex-1 rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-green-600 dark:border-white/10 dark:bg-[#112d1a] dark:text-white"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-200 px-4 py-3 outline-none focus:border-green-600 dark:border-white/10 dark:bg-[#112d1a] dark:text-white"
        >
          <option value="All">{t.orders.filterAll}</option>
          <option value="Preparing">{t.orders.filterPreparing}</option>
          <option value="Dispatched">{t.orders.filterDispatched}</option>
          <option value="Delivered">{t.orders.filterDelivered}</option>
        </select>
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {filteredOrders.length === 0 && (
          <div className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:text-green-100/60 dark:ring-white/10">
            {t.orders.noOrders}
          </div>
        )}

        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10"
          >
            <div className="flex flex-col gap-3 md:flex-row md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-gray-900 dark:text-white">{order.id}</h2>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[order.status]}`}>
                    {statusLabel[order.status]}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-green-100/50">
                  {order.buyer} · {order.product}
                </p>
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{order.amount}</p>
                <p className="text-xs text-gray-400">{order.date}</p>
              </div>
            </div>

            {/* Progress steps */}
            <div className="mt-5 overflow-x-auto">
              <div className="flex min-w-[500px] items-center">
                {order.steps.map((step, index) => (
                  <div key={step} className="flex flex-1 items-center">
                    <div className="text-center">
                      <div
                        className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                          index <= order.current
                            ? "bg-green-600 text-white"
                            : "bg-gray-200 text-gray-400 dark:bg-white/10"
                        }`}
                      >
                        {index <= order.current ? "✓" : index + 1}
                      </div>
                      <p className="mt-1 text-[10px] text-gray-400">{step}</p>
                    </div>
                    {index < order.steps.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 ${
                          index < order.current ? "bg-green-600" : "bg-gray-200 dark:bg-white/10"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => selectInvoice(order)}
                className="text-sm font-semibold text-green-600 dark:text-green-400"
              >
                {t.orders.invoice}
              </button>
              <button
                onClick={() => selectTrack(order)}
                className="text-sm font-semibold text-green-600 dark:text-green-400"
              >
                {t.orders.track}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          {panel === "invoice" ? t.orders.invoicePreview : t.orders.trackingDetails}
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-gray-400">{t.orders.labelOrder}</p>
            <p className="font-semibold text-gray-900 dark:text-white">{selectedOrder.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t.orders.labelBuyer}</p>
            <p className="font-semibold text-gray-900 dark:text-white">{selectedOrder.buyer}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">{t.orders.labelAmount}</p>
            <p className="font-semibold text-gray-900 dark:text-white">{selectedOrder.amount}</p>
          </div>
        </div>

        {panel === "invoice" ? (
          <div className="mt-5 rounded-lg bg-gray-50 p-4 text-sm dark:bg-white/5">
            <div className="flex justify-between">
              <span className="text-gray-400">{t.orders.labelOrderTotal}</span>
              <span className="font-semibold text-gray-900 dark:text-white">{selectedOrder.amount}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-gray-400">{t.orders.labelItem}</span>
              <span className="font-semibold text-gray-900 dark:text-white">{selectedOrder.product}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <span className="text-gray-400">{t.orders.labelInvoiceStatus}</span>
              <span className="font-semibold text-gray-900 dark:text-white">{statusLabel[selectedOrder.status]}</span>
            </div>
          </div>
        ) : (
          <div className="mt-5 rounded-lg bg-gray-50 p-4 dark:bg-white/5">
            <p className="text-xs text-gray-400">{t.orders.labelCurrentStage}</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {selectedOrder.steps[selectedOrder.current]}
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
