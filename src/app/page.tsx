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
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 🆕 Add loading state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchListings = async () => {
    setLoading(true); // 🔄 Start loading
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Failed to fetch listings:', error.message);
      toast.error('Failed to load listings.');
    } else {
      setAllItems(data || []);
    }

    setLoading(false); // ✅ End loading
  };

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    if (view !== 'default') return;

    let filtered = allItems;

    if (searchQuery.trim()) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setItems(filtered);
  }, [searchQuery, selectedCategory, allItems, view]);

  return (
    <div className="flex pt-16 h-[calc(100vh-64px)]">
      <div className="w-64" /> {/* Sidebar spacer */}

      <main className="flex-1 overflow-y-auto p-6">
        {view === 'default' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Marketplace Items</h2>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search listings..."
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              />
            </div>

            <ItemGrid items={items} loading={loading} />
          </>
        )}

        {view === 'choose-listing-type' && (
          <ChooseListingType onSelect={setView} />
        )}

        {view === 'create-item' && (
          <ListingForm
            onSuccess={() => {
              // toast.success('Listing successfully posted!');
              setView('default');
              fetchListings(); // re-fetch after post
            }}
          />
        )}
      </main>

      <Sidebar onSelect={setView} onSelectCategory={setSelectedCategory} />
    </div>
  );
}
