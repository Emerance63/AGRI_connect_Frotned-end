"use client";

import { useMemo, useState } from "react";

type OrderStatus =
  | "Delivered"
  | "Dispatched"
  | "Preparing";

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


const initialOrders: OrderItem[] = [
  {
    id: "ORD-001",
    buyer: "St. Joseph School",
    product: "Maize Flour · 1 kg",
    amount: "RWF 15,200",
    date: "Jul 1",
    status: "Delivered",
    steps:[
      "Pending",
      "Accepted",
      "Preparing",
      "Dispatched",
      "Delivered"
    ],
    current:4
  },

  {
    id:"ORD-002",
    buyer:"Kigali Serena Hotel",
    product:"Mixed Vegetables · 500 kg",
    amount:"RWF 420,000",
    date:"Jul 29",
    status:"Dispatched",
    steps:[
      "Pending",
      "Accepted",
      "Preparing",
      "Dispatched",
      "Delivered"
    ],
    current:3
  },

  {
    id:"ORD-003",
    buyer:"Rwanda Green Mart",
    product:"White Rice · 200 kg",
    amount:"RWF 360,000",
    date:"Aug 1",
    status:"Preparing",
    steps:[
      "Pending",
      "Accepted",
      "Preparing",
      "Dispatched",
      "Delivered"
    ],
    current:2
  }
];


const statusColor = {
 Delivered:
 "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400",

 Dispatched:
 "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400",

 Preparing:
 "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
};



export default function OrdersBoard(){

const [orders,setOrders]=useState(initialOrders);

const [selectedOrder,setSelectedOrder]=
useState<OrderItem>(initialOrders[0]);

const [panel,setPanel]=useState<
"invoice"|"track"
>("invoice");


const [search,setSearch]=useState("");

const [filter,setFilter]=
useState("All");



const filteredOrders = useMemo(()=>{

return orders.filter(order=>{

const matchSearch =
order.id.toLowerCase()
.includes(search.toLowerCase()) ||

order.buyer.toLowerCase()
.includes(search.toLowerCase());


const matchStatus =
filter==="All" ||
order.status===filter;


return matchSearch && matchStatus;

});


},[orders,search,filter]);



const total = orders.length;

const preparing =
orders.filter(o=>o.status==="Preparing").length;

const dispatched =
orders.filter(o=>o.status==="Dispatched").length;

const delivered =
orders.filter(o=>o.status==="Delivered").length;



function selectInvoice(order:OrderItem){

setSelectedOrder(order);
setPanel("invoice");

}


function selectTrack(order:OrderItem){

setSelectedOrder(order);
setPanel("track");

}



return (

<div className="space-y-6">


<div>

<p className="text-sm text-gray-400 dark:text-green-100/50">
Track your fulfilment from acceptance to delivery
</p>

<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
Orders
</h1>

</div>



{/* Statistics */}

<div className="grid grid-cols-2 gap-4 md:grid-cols-4">


{[
["Total",total],
["Preparing",preparing],
["Dispatched",dispatched],
["Delivered",delivered]

].map(([title,value])=>(

<div
key={title}
className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10"
>

<p className="text-sm text-gray-400 dark:text-green-100/50">
{title}
</p>

<h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
{value}
</h2>

</div>

))}

</div>





{/* Search */}


<div className="flex flex-col gap-3 md:flex-row">


<input

value={search}

onChange={(e)=>setSearch(e.target.value)}

placeholder="Search orders..."

className="rounded-lg border px-4 py-3 dark:bg-[#112d1a] dark:text-white"

/>


<select

value={filter}

onChange={(e)=>setFilter(e.target.value)}

className="rounded-lg border px-4 py-3 dark:bg-[#112d1a] dark:text-white"

>

<option>All</option>
<option>Preparing</option>
<option>Dispatched</option>
<option>Delivered</option>

</select>


</div>





{/* Orders */}


<div className="space-y-4">


{filteredOrders.map(order=>(


<div

key={order.id}

className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10"

>


<div className="flex flex-col gap-3 md:flex-row md:justify-between">


<div>

<div className="flex gap-2 items-center">

<h2 className="font-semibold text-gray-900 dark:text-white">
{order.id}
</h2>


<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[order.status]}`}
>
{order.status}
</span>


</div>


<p className="text-sm text-gray-500 dark:text-green-100/50">
{order.buyer} · {order.product}
</p>


</div>



<div>

<p className="font-bold text-gray-900 dark:text-white">
{order.amount}
</p>

<p className="text-xs text-gray-400">
{order.date}
</p>

</div>


</div>





<div className="mt-5 overflow-x-auto">

<div className="flex min-w-[500px] items-center">


{order.steps.map((step,index)=>(

<div
key={step}
className="flex flex-1 items-center"
>


<div className="text-center">

<div
className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
index<=order.current
?"bg-green-600 text-white"
:"bg-gray-200 text-gray-400 dark:bg-white/10"
}`}
>

{index<=order.current?"✓":index+1}

</div>


<p className="mt-1 text-[10px] text-gray-400">
{step}
</p>


</div>



{index < order.steps.length-1 &&

<div
className={`h-0.5 flex-1 ${
index < order.current
?"bg-green-600"
:"bg-gray-200 dark:bg-white/10"
}`}
/>

}


</div>


))}


</div>

</div>




<div className="mt-4 flex gap-4">

<button
onClick={()=>selectInvoice(order)}
className="text-sm font-semibold text-green-600 dark:text-green-400"
>
Invoice
</button>


<button
onClick={()=>selectTrack(order)}
className="text-sm font-semibold text-green-600 dark:text-green-400"
>
Track
</button>


</div>



</div>


))}


</div>






{/* Detail panel */}


<div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-[#112d1a] dark:ring-white/10">


<h2 className="font-semibold text-gray-900 dark:text-white">

{panel==="invoice"
?"Invoice Preview"
:"Tracking Details"}

</h2>



<div className="mt-5 grid gap-4 sm:grid-cols-3">


<div>
<p className="text-sm text-gray-400">
Order
</p>

<p className="font-semibold text-gray-900 dark:text-white">
{selectedOrder.id}
</p>

</div>


<div>
<p className="text-sm text-gray-400">
Buyer
</p>

<p className="font-semibold text-gray-900 dark:text-white">
{selectedOrder.buyer}
</p>

</div>


<div>
<p className="text-sm text-gray-400">
Amount
</p>

<p className="font-semibold text-gray-900 dark:text-white">
{selectedOrder.amount}
</p>

</div>


</div>



<div className="mt-5 rounded-lg bg-gray-50 p-4 dark:bg-white/5">

<p className="text-xs text-gray-400">
CURRENT STAGE
</p>

<p className="font-semibold text-gray-900 dark:text-white">

{selectedOrder.steps[selectedOrder.current]}

</p>

</div>


</div>



</div>

);


}