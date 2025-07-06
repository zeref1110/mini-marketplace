// src/components/marketplace/item-grid.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Item } from '@/types/item'; // ✅ Centralized type

interface ItemGridProps {
  items: Item[];
}

export default function ItemGrid({ items }: ItemGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((item) => (
        <Link
          href={`/item/${item.id}`}
          key={item.id}
          className="bg-white rounded-lg shadow hover:shadow-md transition-all overflow-hidden cursor-pointer block"
        >
          {item.image_url ? (
            <Image
              src={item.image_url}
              alt={item.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}

          <div className="p-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-blue-600 font-semibold">
              ₱{Number(item.price).toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
