// src/components/layout/header.tsx
'use client';
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-[#1877F2] text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">Marketplace</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="rounded-md px-3 py-1 text-black"
          />

          <Link href="/create">
            <button className="bg-white text-[#1877F2] px-3 py-1 rounded-md font-medium">
                Post
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
