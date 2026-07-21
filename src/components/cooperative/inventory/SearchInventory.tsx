"use client";

interface SearchInventoryProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
}

export default function SearchInventory({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: SearchInventoryProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-green-600 dark:border-white/10 dark:bg-[#112d1a] dark:text-white"
      />

      <select
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm outline-none focus:border-green-600 dark:border-white/10 dark:bg-[#112d1a] dark:text-white"
      >
        <option value="All">All Status</option>
        <option value="Healthy">Healthy</option>
        <option value="Low">Low</option>
        <option value="Out">Out</option>
      </select>
    </div>
  );
}