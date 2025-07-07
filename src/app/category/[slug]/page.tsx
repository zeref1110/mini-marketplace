'use client';

import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const { slug } = useParams() as { slug: string };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold capitalize">{slug}</h2>
      <p>
        Filtered items from category: <strong>{slug}</strong>
      </p>
      {/* TODO: fetch & render ItemGrid filtered by `slug` */}
    </div>
  );
}
