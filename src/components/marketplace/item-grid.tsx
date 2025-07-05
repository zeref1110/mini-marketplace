// src/components/marketplace/item-grid.tsx
import Image from "next/image";

type Item = {
  id: number;
  title: string;
  price: string;
  image: string;
};

interface ItemGridProps {
  items: Item[];
}

export default function ItemGrid({ items }: ItemGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow hover:shadow-md transition-all overflow-hidden cursor-pointer"
        >
          <Image
            src={item.image}
            alt={item.title}
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-600">{item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
