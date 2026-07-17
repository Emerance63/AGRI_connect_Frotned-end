"use client";

import { useState } from "react";

type OrderItem = {
  id: string;
  buyer: string;
  product: string;
  amount: string;
  date: string;
  status: "Delivered" | "Dispatched" | "Preparing";
  steps: string[];
  current: number;
};

const orders: OrderItem[] = [
  { id: "ORD-001", buyer: "St. Joseph School", product: "Maize Flour · 1 kg", amount: "RWF 15,200", date: "Jul 1", status: "Delivered", steps: ["Pending", "Accepted", "Preparing", "Dispatched", "Delivered"], current: 4 },
  { id: "ORD-002", buyer: "Kigali Serena Hotel", product: "Mixed Vegetables · 500 kg", amount: "RWF 420,000", date: "Jul 29", status: "Dispatched", steps: ["Pending", "Accepted", "Preparing", "Dispatched", "Delivered"], current: 3 },
  { id: "ORD-003", buyer: "Rwanda Green Mart", product: "White Rice · 200 kg", amount: "RWF 360,000", date: "Aug 1", status: "Preparing", steps: ["Pending", "Accepted", "Preparing", "Dispatched", "Delivered"], current: 2 },
];

const statusColor: Record<OrderItem["status"], string> = {
  Delivered: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",
  Dispatched: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",
  Preparing: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
};

export default function OrdersBoard() {
  const [selectedOrder, setSelectedOrder] = useState<OrderItem>(orders[0]);
  const [panel, setPanel] = useState<"invoice" | "track">("invoice");

  function showInvoice(order: OrderItem) {
    setSelectedOrder(order);
    setPanel("invoice");
  }

  function showTracking(order: OrderItem) {
    setSelectedOrder(order);
    setPanel("track");
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 dark:text-green-100/50">Track your fulfilment from acceptance to delivery</p>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Orders</h1>
        </div>
        <span className="text-xs text-gray-400 dark:text-green-100/50">Home</span>
      </div>

      <div className="rounded-xl border border-green-100 bg-green-50/80 px-4 py-3 text-sm text-green-900 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-100">
        Invoice and Track now show an order detail panel so the buttons do more than sit on the page.
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900 dark:text-white">{order.id}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusColor[order.status]}`}>{order.status}</span>
                </div>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-green-100/50">{order.buyer} · {order.product}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">{order.amount}</p>
                <p className="text-xs text-gray-400 dark:text-green-100/40">{order.date}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-0">
              {order.steps.map((step, stepIndex) => (
                <div key={step} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${stepIndex <= order.current ? "bg-green-600 text-white" : "bg-gray-200 text-gray-400 dark:bg-white/10 dark:text-green-100/30"}`}>
                      {stepIndex <= order.current ? "✓" : stepIndex + 1}
                    </div>
                    <span className="mt-1 text-[10px] text-gray-400 dark:text-green-100/40">{step}</span>
                  </div>
                  {stepIndex < order.steps.length - 1 && (
                    <div className={`mb-3 h-0.5 flex-1 ${stepIndex < order.current ? "bg-green-600" : "bg-gray-200 dark:bg-white/10"}`} />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-3">
              <button type="button" onClick={() => showInvoice(order)} className="text-xs font-medium text-green-600 hover:underline dark:text-green-400">
                Invoice
              </button>
              <button type="button" onClick={() => showTracking(order)} className="text-xs font-medium text-green-600 hover:underline dark:text-green-400">
                Track
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-white">{panel === "invoice" ? "Invoice Preview" : "Tracking Details"}</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-green-100/60">
          {panel === "invoice"
            ? "The Invoice button now points to a readable order summary below."
            : "The Track button now shows the current stage of the selected order."}
        </p>

        <div className="mt-4 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <p className="text-gray-400 dark:text-green-100/50">Order</p>
            <p className="font-semibold text-gray-900 dark:text-white">{selectedOrder.id}</p>
          </div>
          <div>
            <p className="text-gray-400 dark:text-green-100/50">Buyer</p>
            <p className="font-semibold text-gray-900 dark:text-white">{selectedOrder.buyer}</p>
          </div>
          <div>
            <p className="text-gray-400 dark:text-green-100/50">Amount</p>
            <p className="font-semibold text-gray-900 dark:text-white">{selectedOrder.amount}</p>
          </div>
        </div>

        <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-white/5">
          <p className="text-xs uppercase tracking-wider text-gray-400 dark:text-green-100/50">Current stage</p>
          <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">{selectedOrder.steps[selectedOrder.current]}</p>
        </div>
      </div>
    </div>
  );
}