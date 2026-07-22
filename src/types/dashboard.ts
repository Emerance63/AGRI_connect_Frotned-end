export interface StatItem {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

export interface RevenueMonth {
  month: string;
  revenue: number; // millions RWF
}

export interface Buyer {
  id: number;
  name: string;
  location: string;
  reliability: number; // 0–100
}
