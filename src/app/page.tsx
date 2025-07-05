'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import ChooseListingType from '@/components/listing/ChooseListingType';
import ListingForm from '@/components/forms/ListingForm';
import ItemGrid from '@/components/marketplace/item-grid';
import { mockItems } from '@/lib/mock-data';
import type { ViewState } from '@/components/layout/types'; // ✅ shared type

export default function HomePage() {
  const [view, setView] = useState<ViewState>('default');

  return (
    <div className="flex">
      <Sidebar onSelect={setView} />
      <main className="flex-1 p-4">
        {view === 'default' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Marketplace Items</h2>
            <ItemGrid items={mockItems} />
          </>
        )}

        {view === 'choose-listing-type' && (
          <ChooseListingType onSelect={setView} />
        )}


        {view === 'create-item' && <ListingForm />}
      </main>
    </div>
  );
}
