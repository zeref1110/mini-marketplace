'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Item } from '@/types/item';

interface ItemGridProps {
  items: Item[];
  loading?: boolean;
}

export default function ItemGrid({ items, loading = false }: ItemGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-white rounded-lg shadow overflow-hidden p-4"
          >
            <div className="bg-gray-200 h-48 w-full rounded-md mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="text-center text-gray-600 py-12">
        <p>No items found.</p>
      </div>
    );
  }

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
