// src/app/page.tsx
import ItemGrid from "@/components/marketplace/item-grid";
import { mockItems } from "../lib/mock-data";

export default function HomePage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Marketplace Items</h2>
      <ItemGrid items={mockItems} />
    </div>
  );
}
