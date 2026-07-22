"use client";

import { useState } from "react";
import type { Buyer } from "./BuyersBoard";


interface AddBuyerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (buyer: Buyer) => void;
}


export default function AddBuyerModal({
  isOpen,
  onClose,
  onAdd,
}: AddBuyerModalProps) {


  const [formData, setFormData] = useState({
    name: "",
    location: "",
    orders: 0,
    spend: "RWF 0",
    reliability: 100,
    active: true,
  });



  if (!isOpen) return null;



  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();


    const initials = formData.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();



    const newBuyer: Buyer = {
      initials,
      name: formData.name,
      location: formData.location,
      orders: Number(formData.orders),
      spend: formData.spend,
      reliability: Number(formData.reliability),
      active: formData.active,
    };


    onAdd(newBuyer);


    setFormData({
      name: "",
      location: "",
      orders: 0,
      spend: "RWF 0",
      reliability: 100,
      active: true,
    });


    onClose();

  };




  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">


      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-[#112d1a]">


        <div className="flex items-center justify-between">


          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Add New Buyer
          </h2>


          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500"
          >
            ✕
          </button>


        </div>





        <form
          onSubmit={handleSubmit}
          className="mt-5 space-y-4"
        >


          <input

            required

            value={formData.name}

            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }

            placeholder="Buyer name"

            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 dark:border-white/10 dark:bg-transparent dark:text-white"

          />





          <input

            required

            value={formData.location}

            onChange={(e) =>
              setFormData({
                ...formData,
                location: e.target.value,
              })
            }

            placeholder="Location"

            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 dark:border-white/10 dark:bg-transparent dark:text-white"

          />





          <input

            type="number"

            value={formData.orders}

            onChange={(e) =>
              setFormData({
                ...formData,
                orders: Number(e.target.value),
              })
            }

            placeholder="Orders"

            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 dark:border-white/10 dark:bg-transparent dark:text-white"

          />





          <input

            value={formData.spend}

            onChange={(e) =>
              setFormData({
                ...formData,
                spend: e.target.value,
              })
            }

            placeholder="Total spend"

            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 dark:border-white/10 dark:bg-transparent dark:text-white"

          />





          <input

            type="number"

            min="0"

            max="100"

            value={formData.reliability}

            onChange={(e) =>
              setFormData({
                ...formData,
                reliability: Number(e.target.value),
              })
            }

            placeholder="Reliability %"

            className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 dark:border-white/10 dark:bg-transparent dark:text-white"

          />





          <button

            type="submit"

            className="w-full rounded-lg bg-green-600 py-2 text-sm font-semibold text-white hover:bg-green-700"

          >

            Add Buyer

          </button>


        </form>


      </div>


    </div>

  );

}