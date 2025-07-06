'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/sidebar';
import ChooseListingType from '@/components/listing/ChooseListingType';
import ListingForm from '@/components/forms/ListingForm';
import ItemGrid from '@/components/marketplace/item-grid';
import { mockItems } from '@/lib/mock-data';
import type { ViewState } from '@/components/layout/types';

export default function HomePage() {
  const [view, setView] = useState<ViewState>('default');

  return (
    <div className="flex pt-16 h-[calc(100vh-64px)]">
      {/* Sidebar takes up space, but is fixed */}
      <div className="w-64" /> {/* Spacer for fixed sidebar */}
      
      {/* Main scrollable area */}
      <main className="flex-1 overflow-y-auto p-6">
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

      {/* Fixed Sidebar */}
      <Sidebar onSelect={setView} />
    </div>
  );
}
