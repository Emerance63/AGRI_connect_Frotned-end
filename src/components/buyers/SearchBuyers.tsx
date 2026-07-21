"use client";

interface SearchBuyersProps {
  search: string;
  setSearch: (value: string) => void;
  filter: "All" | "Active" | "Inactive";
  setFilter: (value: "All" | "Active" | "Inactive") => void;
}


export default function SearchBuyers({
  search,
  setSearch,
  filter,
  setFilter,
}: SearchBuyersProps) {


  return (
    <div className="flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:flex-row sm:items-center dark:bg-[#112d1a] dark:ring-white/10">


      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search buyers..."
        className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm outline-none focus:border-green-500 dark:border-white/10 dark:bg-transparent dark:text-white"
      />


      <select
        value={filter}
        onChange={(e) =>
          setFilter(
            e.target.value as "All" | "Active" | "Inactive"
          )
        }
        className="rounded-lg border border-gray-200 px-4 py-2 text-sm dark:border-white/10 dark:bg-[#112d1a] dark:text-white"
      >

        <option value="All">
          All Buyers
        </option>

        <option value="Active">
          Active
        </option>

        <option value="Inactive">
          Inactive
        </option>

      </select>


    </div>
  );
}