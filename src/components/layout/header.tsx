// src/app/components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  
  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Let default navigation handle other cases
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-[#1877F2] text-white z-50 shadow">
      <div className="flex items-center justify-between h-full px-4">
        <Link 
          href="/" 
          onClick={handleLogoClick}
          className="text-xl font-semibold"
        >
          Marketplace
        </Link>
        {/* ... rest of your header ... */}
      </div>
    </header>
  );
}