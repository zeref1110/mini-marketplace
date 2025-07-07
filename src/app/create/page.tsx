'use client';

import { useState } from 'react';
import ListingForm from '@/components/forms/ListingForm'; // ✅ Make sure this path is correct

export default function CreatePage() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">What do you want to list?</h1>

      {/* ✅ Notification */}
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-6 text-center">
          Listing posted successfully!
        </div>
      )}

      {/* ✅ Listing Form */}
      <ListingForm
        onSuccess={() => {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        }}
      />

      {/* ✅ Options below the form */}
      <div className="space-y-4 mt-6">
        <a href="/create/item" className="block p-4 border rounded hover:bg-gray-100">
          🛒 Item
        </a>
        {/* Future: add other types like vehicle, property, etc. */}
      </div>
    </div>
  );
}
