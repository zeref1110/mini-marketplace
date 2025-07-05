'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  return (
    <header className="bg-[#1877F2] text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">Marketplace</h1>
        <div className="flex items-center gap-4">
          {isClient && (
            <input
              type="text"
              placeholder="Search"
              className="rounded-md px-3 py-1 text-black"
            />
          )}
          <button className="bg-white text-[#1877F2] px-3 py-1 rounded-md font-medium">
            Post
          </button>
        </div>
      </div>
    </header>
  );
}
