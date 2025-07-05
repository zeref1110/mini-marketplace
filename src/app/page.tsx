'use client';

import { useState } from "react";
import Sidebar from "@/components/layout/sidebar";
import ItemGrid from "@/components/marketplace/item-grid";
import ListingTypeSelector from "@/components/forms/ListingTypeSelector";
import { mockItems } from "@/lib/mock-data";

export default function HomePage() {
  const [view, setView] = useState<"default" | "choose-listing-type">("default");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onSelect={setView} />

      <main className="flex-1 p-6 space-y-12">
        {view === "default" && (
          <>
            {/* 🛒 Marketplace Section */}
            <section>
              <h2 className="text-3xl font-bold mb-4 text-[#1877F2]">
                Marketplace Items
              </h2>
              <ItemGrid items={mockItems} />
            </section>

            <hr className="border-t border-gray-300" />

            {/* 📝 Listing Form Section */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#1877F2]">
                Create a New Listing
              </h2>
              {/* You can optionally include the full ListingForm component here */}
            </section>
          </>
        )}

        {view === "choose-listing-type" && <ListingTypeSelector />}
      </main>
    </div>
  );
}
