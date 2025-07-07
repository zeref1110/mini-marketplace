'use client';

import { MessageCircle, Bell, User } from 'lucide-react';
import Link from 'next/link';


export default function Header() {
  
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#1877F2] text-white z-50 shadow">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="text-xl font-semibold cursor-pointer">Marketplace</h1>
        </Link>

        <div className="flex items-center gap-6 cursor-pointer">
          <MessageCircle size={20} />
          <Bell size={20} />
          <User size={20} />
        </div>
      </div>
    </header>
  );
}
