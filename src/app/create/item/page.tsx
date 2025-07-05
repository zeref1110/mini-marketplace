// src/app/create/item/page.tsx
'use client';

import { useState } from 'react';

export default function CreateItemPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Post to backend here
    console.log({ title, price });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Create Item</h2>
      <input
        className="border p-2 w-full rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 w-full rounded"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Post</button>
    </form>
  );
}
