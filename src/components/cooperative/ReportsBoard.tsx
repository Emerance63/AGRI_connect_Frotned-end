"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { useBuyers } from "@/lib/buyers";
import { useCooperativeData } from "@/lib/cooperative-data";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";


const revenueData = [
  { month: "Aug", revenue: 6.8 },
  { month: "Sep", revenue: 7.4 },
  { month: "Oct", revenue: 8.1 },
  { month: "Nov", revenue: 9.6 },
  { month: "Dec", revenue: 10.2 },
  { month: "Jan", revenue: 11.2 },
];


const topProducts = [
  { name: "Beans", value: 38, color: "#16a34a" },
  { name: "Rice", value: 27, color: "#22c55e" },
  { name: "Vegetables", value: 21, color: "#4ade80" },
  { name: "Maize", value: 9, color: "#86efac" },
  { name: "Other", value: 5, color: "#bbf7d0" },
];


type Action =
  | "preview"
  | "export"
  | "share";



export default function ReportsBoard() {
const { buyers } = useBuyers();
const { products, inventory, orders } = useCooperativeData();


const [action,setAction] =
useState<Action>("preview");
const [notice, setNotice] = useState("");



const reportData = {

  cooperative:
  "AGRI Connect Cooperative",

  generated:
  new Date().toLocaleDateString(),

  totalProducts:products.length,

  totalStock:`${inventory.reduce((sum, item) => sum + Number(item.available.replace(" kg", "")), 0)} kg`,

  totalOrders:orders.length,

  revenue:`RWF ${buyers.reduce((sum, buyer) => sum + Number(buyer.spend.replace(/[^0-9]/g, "")), 0).toLocaleString()}`,

};

const activeBuyers = buyers.filter((buyer) => buyer.active);
const bestBuyer = buyers.reduce<
  (typeof buyers)[number] | null
>(
  (top, buyer) => {
    if (!top || buyer.reliability > top.reliability) {
      return buyer;
    }

    return top;
  },
  buyers[0] ?? null
);





function downloadPDF(){

setAction("preview");


const doc =
new jsPDF();



doc.setFontSize(18);


doc.text(
"AGRI Connect Cooperative Report",
20,
20
);



doc.setFontSize(12);



doc.text(
`Generated: ${reportData.generated}`,
20,
40
);


doc.text(
`Total Products: ${reportData.totalProducts}`,
20,
55
);



doc.text(
`Total Stock: ${reportData.totalStock}`,
20,
70
);



doc.text(
`Total Orders: ${reportData.totalOrders}`,
20,
85
);



doc.text(
`Revenue: ${reportData.revenue}`,
20,
100
);



doc.save(
"agri-report.pdf"
);

setNotice("PDF report downloaded.");


}




function downloadCSV(){

setAction("export");


const rows = [

[
"Report",
"Value"
],


[
"Cooperative",
reportData.cooperative
],


[
"Generated",
reportData.generated
],


[
"Total Products",
reportData.totalProducts
],


[
"Total Stock",
reportData.totalStock
],


[
"Total Orders",
reportData.totalOrders
],


[
"Revenue",
reportData.revenue
]

];



const csv =
rows
.map(row=>row.join(","))
.join("\n");



const blob =
new Blob(
[csv],
{
type:"text/csv"
}
);



const url =
URL.createObjectURL(blob);



const link =
document.createElement("a");


link.href=url;

link.download=
"agri-report.csv";


link.click();


URL.revokeObjectURL(url);

setNotice("CSV report downloaded.");

}

async function shareReport() {
const shareData = { title: "AGRI Connect Cooperative Report", text: `Cooperative report generated ${reportData.generated}. Revenue: ${reportData.revenue}.` };
setAction("share");
try {
  if (navigator.share) {
    await navigator.share(shareData);
    setNotice("Report share sheet opened.");
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(shareData.text);
    setNotice("Report summary copied to your clipboard.");
  } else {
    setNotice("Sharing is unavailable in this browser.");
  }
} catch (error) {
  if ((error as DOMException).name !== "AbortError") setNotice("Unable to share the report. Please try again.");
}
}


const actionCopy: Record<
Action,
{
title:string;
body:string;
}
> = {


preview:{

title:"Preview PDF",

body:
"This panel shows the report summary before downloading.",

},


export:{

title:"Export CSV",

body:
"This panel contains spreadsheet export information.",

},


share:{

title:"Share Report",

body:
"This panel shows report sharing information.",

},


};



return (

<div className="space-y-5">


<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">


<div>

<p className="text-xs text-gray-400 dark:text-green-100/50">

Export and share cooperative performance reports

</p>


<h1 className="text-lg font-bold text-gray-900 dark:text-white">

Reports

</h1>


</div>


<div className="flex flex-wrap gap-2">


<button

onClick={downloadPDF}

className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-green-100/70 dark:hover:bg-white/5"

>

Download PDF

</button>


<button

onClick={downloadCSV}

className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-green-100/70 dark:hover:bg-white/5"

>

Download CSV

</button>


<button

onClick={shareReport}

className="rounded-lg bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-700"

>

↑ Share Report

</button>


</div>


</div>
      <div className="rounded-xl border border-green-100 bg-green-50/80 px-4 py-3 text-sm text-green-900 dark:border-green-500/20 dark:bg-green-500/10 dark:text-green-100">

        {notice || `${actionCopy[action].title} is ready. Your report can now be downloaded as PDF or CSV.`}

      </div>




      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">


        {/* Revenue Chart */}

        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5 dark:bg-[#112d1a] dark:ring-white/10">


          <h2 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white">

            Revenue Trend

          </h2>



          <ResponsiveContainer
            width="100%"
            height={180}
          >

            <LineChart data={revenueData}>


              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />


              <XAxis
                dataKey="month"
                tick={{fontSize:11}}
                tickLine={false}
                axisLine={false}
              />


              <YAxis
                tick={{fontSize:11}}
                tickLine={false}
                axisLine={false}
                unit="M"
              />


              <Tooltip
                formatter={(value:number)=>
                  [
                    `RWF ${value}M`,
                    "Revenue"
                  ]
                }
              />


              <Line

                type="monotone"

                dataKey="revenue"

                stroke="#16a34a"

                strokeWidth={2.5}

                dot={{
                  r:4,
                  fill:"#16a34a"
                }}

              />


            </LineChart>


          </ResponsiveContainer>



        </div>





        {/* Pie Chart */}


        <div className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5 dark:bg-[#112d1a] dark:ring-white/10">


          <h2 className="mb-4 text-sm font-semibold text-gray-800 dark:text-white">

            Top Selling Products

          </h2>



          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">


            <ResponsiveContainer
              width="100%"
              height={180}
            >


              <PieChart>


                <Pie

                  data={topProducts}

                  cx="50%"

                  cy="50%"

                  innerRadius={50}

                  outerRadius={80}

                  dataKey="value"

                >

                  {topProducts.map(
                    (product,index)=>(

                    <Cell

                      key={index}

                      fill={product.color}

                    />

                  ))}


                </Pie>


              </PieChart>


            </ResponsiveContainer>



            <ul className="w-full space-y-2 text-xs sm:w-auto">


              {topProducts.map(product=>(


                <li

                  key={product.name}

                  className="flex items-center gap-2"

                >

                  <span

                    className="h-2.5 w-2.5 rounded-full"

                    style={{
                      background:product.color
                    }}

                  />


                  <span className="text-gray-600 dark:text-green-100/70">

                    {product.name}

                  </span>


                  <span className="ml-auto font-semibold text-gray-900 dark:text-white">

                    {product.value}%

                  </span>


                </li>


              ))}


            </ul>



          </div>



        </div>


      </div>





      {/* Summary */}


      <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">


        <h2 className="text-sm font-semibold text-gray-800 dark:text-white">

          {actionCopy[action].title}

        </h2>



        <p className="mt-1 text-sm text-gray-500 dark:text-green-100/60">

          {actionCopy[action].body}

        </p>



        <div className="mt-4 grid gap-4 text-sm sm:grid-cols-3">


          <div>

            <p className="text-gray-400 dark:text-green-100/50">

              Best buyer

            </p>


            <p className="font-semibold text-gray-900 dark:text-white">

              {bestBuyer?.name ?? "No buyers yet"}

            </p>


          </div>



          <div>

            <p className="text-gray-400 dark:text-green-100/50">

              Top revenue

            </p>


            <p className="font-semibold text-gray-900 dark:text-white">

              RWF 11.2M

            </p>


          </div>




          <div>

            <p className="text-gray-400 dark:text-green-100/50">

              Active buyers

            </p>


            <p className="font-semibold text-gray-900 dark:text-white">

              {activeBuyers.length}

            </p>


          </div>


        </div>


      </div>





      {/* Mobile Buyers */}


      <div className="space-y-3 md:hidden">


        {buyers.map((buyer)=>(


          <article

            key={buyer.name}

            className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10"

          >


            <p className="font-semibold text-gray-900 dark:text-white">

              {buyer.name}

            </p>



            <p className="text-xs text-gray-400">

              {buyer.location}

            </p>



            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">


              <div>

                <p className="text-gray-400">

                  Orders

                </p>


                <p className="font-semibold">

                  {buyer.orders}

                </p>


              </div>



              <div>

                <p className="text-gray-400">

                  Spend

                </p>


                <p className="font-semibold">

                  {buyer.spend}

                </p>


              </div>


            </div>


          </article>


        ))}


      </div>





      {/* Desktop Table */}


      <div className="hidden overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10 md:block">


        <table className="min-w-[820px] w-full text-sm">


          <thead>

            <tr className="border-b border-gray-100 text-xs text-gray-500 dark:border-white/10 dark:text-green-100/50">


              <th className="px-5 py-3 text-left">

                Buyer

              </th>


              <th className="px-5 py-3 text-left">

                Location

              </th>


              <th className="px-5 py-3 text-left">

                Orders

              </th>


              <th className="px-5 py-3 text-left">

                Spend

              </th>


              <th className="px-5 py-3 text-left">

                Reliability

              </th>


            </tr>


          </thead>



          <tbody>


          {buyers.map((buyer)=>(


            <tr

              key={buyer.name}

              className="border-b border-gray-50 dark:border-white/5"

            >


              <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">

                {buyer.name}

              </td>


              <td className="px-5 py-3">

                {buyer.location}

              </td>


              <td className="px-5 py-3">

                {buyer.orders}

              </td>


              <td className="px-5 py-3">

                {buyer.spend}

              </td>


              <td className="px-5 py-3">

                {buyer.reliability}%

              </td>


            </tr>


          ))}


          </tbody>


        </table>


      </div>




    </div>

  );

}
