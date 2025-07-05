// src/components/listing/ChooseListingType.tsx

'use client';
import { LayoutGrid, Layers3, Car, Home } from 'lucide-react';

// You can extract this into a types file if used in other places.
type ListingType = 'create-item' | 'create-multiple' | 'create-vehicle' | 'create-real-estate';

interface Props {
  onSelect: (view: ListingType) => void;
}

const cards: {
  label: string;
  icon: React.ElementType;
  value: ListingType;
}[] = [
  { label: 'Item for sale', icon: LayoutGrid, value: 'create-item' },
  { label: 'Create multiple listings', icon: Layers3, value: 'create-multiple' },
  { label: 'Vehicle for sale', icon: Car, value: 'create-vehicle' },
  { label: 'Home for sale/rent', icon: Home, value: 'create-real-estate' },
];

export default function ChooseListingType({ onSelect }: Props) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Choose a listing type</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map(({ label, icon: Icon, value }) => (
          <div
            key={label}
            onClick={() => onSelect(value)}
            className="cursor-pointer border p-4 rounded shadow hover:shadow-md transition"
          >
            <div className="flex flex-col items-center gap-3">
              <Icon size={32} className="text-blue-600" />
              <span className="font-medium">{label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
