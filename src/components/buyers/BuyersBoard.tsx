"use client";

import { useState } from "react";
import BuyerCard from "./BuyerCard";
import BuyersStats from "./BuyersStats";
import SearchBuyers from "./SearchBuyers";
import BuyerDetailsModal from "./BuyerDetailsModal";
import AddBuyerModal from "./AddBuyerModal";


export type Buyer = {
  initials: string;
  name: string;
  location: string;
  orders: number;
  spend: string;
  reliability: number;
  active: boolean;
};


const initialBuyers: Buyer[] = [
  {
    initials: "AR",
    name: "ABC Restaurant",
    location: "Kigali",
    orders: 12,
    spend: "RWF 1,148,000",
    reliability: 96,
    active: true,
  },

  {
    initials: "KS",
    name: "Kigali Serena Hotel",
    location: "Kigali",
    orders: 8,
    spend: "RWF 960,000",
    reliability: 88,
    active: true,
  },

  {
    initials: "SJ",
    name: "St. Joseph School",
    location: "Musanze",
    orders: 5,
    spend: "RWF 400,000",
    reliability: 91,
    active: true,
  },

  {
    initials: "RG",
    name: "Rwanda Green Mart",
    location: "Huye",
    orders: 21,
    spend: "RWF 2,120,000",
    reliability: 76,
    active: true,
  },

  {
    initials: "MH",
    name: "Horizon Hotel",
    location: "Rubavu",
    orders: 3,
    spend: "RWF 280,000",
    reliability: 61,
    active: false,
  },
];



export default function BuyersBoard() {


const [buyers, setBuyers] =
  useState<Buyer[]>(initialBuyers);
  const [showAddBuyer, setShowAddBuyer] =
  useState(false);


  const [search, setSearch] = useState("");


  const [filter, setFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");


  const [selectedBuyer, setSelectedBuyer] =
    useState<Buyer | null>(null);




  const filteredBuyers = buyers.filter((buyer) => {


    const searchMatch =
      buyer.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      buyer.location
        .toLowerCase()
        .includes(search.toLowerCase());



    const filterMatch =
      filter === "All"
        ? true
        : filter === "Active"
        ? buyer.active
        : !buyer.active;



    return searchMatch && filterMatch;

  });

  const handleAddBuyer = (buyer: Buyer) => {
  setBuyers((prev) => [
    ...prev,
    buyer,
  ]);
};



  return (

    <div className="space-y-5">


      {/* Page Header */}

      <div className="flex items-center justify-between">


        <div>

          <p className="text-xs text-gray-400 dark:text-green-100/50">
            Track your buyer relationships and purchase history
          </p>


          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Buyers
          </h1>


        </div>



       <button
  onClick={() => setShowAddBuyer(true)}
  className="rounded-lg bg-green-600 px-4 py-2 text-xs font-semibold text-white hover:bg-green-700"
>
  + Add Buyer
</button>


      </div>





      {/* Statistics */}

      <BuyersStats buyers={buyers} />





      {/* Search and Filter */}

      <SearchBuyers
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />






      {/* Buyer Cards */}

      {
        filteredBuyers.length > 0 ? (


          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">


            {
              filteredBuyers.map((buyer) => (


                <BuyerCard

                  key={buyer.name}

                  buyer={buyer}


                  onMessage={() =>
                    alert(
                      `Send message to ${buyer.name}`
                    )
                  }


                  onViewHistory={() =>
                    setSelectedBuyer(buyer)
                  }

                />


              ))
            }


          </div>



        ) : (


          <div className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 shadow-sm dark:bg-[#112d1a] dark:text-green-100/50">

            No buyers found.

          </div>


        )

      }





      {/* Buyer Details Modal */}

      <BuyerDetailsModal

        buyer={selectedBuyer}

        onClose={() =>
          setSelectedBuyer(null)
        }

      />
      <AddBuyerModal
  isOpen={showAddBuyer}
  onClose={() => setShowAddBuyer(false)}
  onAdd={handleAddBuyer}
/>



    </div>

  );

}