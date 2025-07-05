// src/app/item/[id]/page.tsx
import { mockItems } from '@/lib/mock-data';
import Image from 'next/image';

interface Props {
  params: {
    id: string;
  };
}

export default function ItemDetailPage({ params }: Props) {
  const item = mockItems.find((item) => item.id === parseInt(params.id));

  if (!item) return <div className="p-4">Item not found.</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
      <p className="text-gray-700">{item.price}</p>
      <Image src={item.image} alt={item.title} className="mt-4 w-full max-w-md" />
    </div>
  );
}
