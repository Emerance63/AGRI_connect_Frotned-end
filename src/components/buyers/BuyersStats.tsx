"use client";

type Buyer = {
  initials: string;
  name: string;
  location: string;
  orders: number;
  spend: string;
  reliability: number;
  active: boolean;
};

interface BuyersStatsProps {
  buyers: Buyer[];
}

export default function BuyersStats({ buyers }: BuyersStatsProps) {
  const totalBuyers = buyers.length;

  const activeBuyers = buyers.filter(
    (buyer) => buyer.active
  ).length;

  const totalOrders = buyers.reduce(
    (sum, buyer) => sum + buyer.orders,
    0
  );

  const averageReliability =
    buyers.length > 0
      ? Math.round(
          buyers.reduce(
            (sum, buyer) => sum + buyer.reliability,
            0
          ) / buyers.length
        )
      : 0;


  const stats = [
    {
      title: "Total Buyers",
      value: totalBuyers,
      description: "Registered buyers",
    },
    {
      title: "Active Buyers",
      value: activeBuyers,
      description: "Currently active",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      description: "Orders completed",
    },
    {
      title: "Reliability",
      value: `${averageReliability}%`,
      description: "Average score",
    },
  ];


  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10"
        >

          <p className="text-xs text-gray-400 dark:text-green-100/50">
            {stat.title}
          </p>


          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            {stat.value}
          </h2>


          <p className="mt-1 text-xs text-green-600 dark:text-green-400">
            {stat.description}
          </p>

        </div>
      ))}

    </div>
  );
}