'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/sidebar';
import ChooseListingType from '@/components/listing/ChooseListingType';
import ListingForm from '@/components/forms/ListingForm';
import ItemGrid from '@/components/marketplace/item-grid';
import type { ViewState } from '@/components/layout/types';
import { supabase } from '@/lib/supabase';
import toast from 'react-hot-toast';
import type { Item } from '@/types/item';

export default function HomePage() {
  const [view, setView] = useState<ViewState>('default');
  const [items, setItems] = useState<Item[]>([]);

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false }); // 🆕 Show newest listings first

    if (error) {
      console.error('❌ Failed to fetch listings:', error.message);
      toast.error('Failed to load listings.');
    } else {
      setItems(data || []);
    }
  };

  // 🔁 Run on first load & when view changes back to 'default'
  useEffect(() => {
    if (view === 'default') {
      fetchListings();
    }
  }, [view]);

  return (
    <div className="flex pt-16 h-[calc(100vh-64px)]">
      <div className="w-64" /> {/* Spacer for fixed sidebar */}

      <main className="flex-1 overflow-y-auto p-6">
        {view === 'default' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Marketplace Items</h2>
            <ItemGrid items={items} />
          </>
        )}

        {view === 'choose-listing-type' && (
          <ChooseListingType onSelect={setView} />
        )}

        {view === 'create-item' && (
          <ListingForm
            onSuccess={() => {
              toast.success('✅ Listing successfully posted!');
              setView('default'); // Triggers re-fetch
            }}
          />
        )}
      </main>

      <Sidebar onSelect={setView} />
    </div>
  );
}
