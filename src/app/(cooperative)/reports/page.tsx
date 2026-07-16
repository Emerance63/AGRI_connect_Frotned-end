"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const revenueData = [
  { month: "Aug", revenue: 6.8 }, { month: "Sep", revenue: 7.4 },
  { month: "Oct", revenue: 8.1 }, { month: "Nov", revenue: 9.6 },
import ReportsBoard from "@/components/cooperative/ReportsBoard";

export const metadata = { title: "Reports" };

export default function ReportsPage() {
  return <ReportsBoard />;
}
