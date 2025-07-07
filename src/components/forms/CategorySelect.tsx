'use client';

type CategorySelectProps = {
  value?: string;
  onChange: (val: string) => void;
};

const categories = [
  'Vehicles',
  'Rentals',
  'Apparel',
  'Electronics',
  'Furniture',
];

export default function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-3 py-2 rounded-md w-full"
    >
      <option value="">Select a category</option>
      {categories.map((cat) => (
        <option key={cat} value={cat.toLowerCase()}>
          {cat}
        </option>
      ))}
    </select>
  );
}
