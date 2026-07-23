"use client";
import { useLanguage } from "@/lib/LanguageContext";

interface CategoryFilterProps {
  categories: readonly string[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({ categories, value, onChange }: CategoryFilterProps) {
  const { t } = useLanguage();
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 focus:border-green-700 focus:outline-none focus:ring-1 focus:ring-green-700 md:w-56"
    >
      {categories.map((category) => {
        const translatedCategory = (t.categories as Record<string, string> | undefined)?.[category] || category;
        return (
          <option key={category} value={category}>
            {translatedCategory}
          </option>
        );
      })}
    </select>
  );
}