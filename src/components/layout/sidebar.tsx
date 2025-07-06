'use client';

import { type SidebarProps } from '../layout/types'; // Optional: external type if reused
import {
  PlusCircle,
  List,
  HelpCircle,
  Car,
  Building,
  Shirt,
  Monitor,
  Sofa,
} from 'lucide-react';

export default function Sidebar({ onSelect }: SidebarProps) {
  const listingOptions = [
    {
      label: 'Choose listing type',
      icon: PlusCircle,
      onClick: () => onSelect('choose-listing-type'),
    },
    { label: 'Your listings', icon: List, onClick: () => {} },
    { label: 'Seller help', icon: HelpCircle, onClick: () => {} },
  ];

  const categories = [
    { label: 'Vehicles', icon: Car },
    { label: 'Rentals', icon: Building },
    { label: 'Apparel', icon: Shirt },
    { label: 'Electronics', icon: Monitor },
    { label: 'Furniture', icon: Sofa },
  ];

  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-white shadow-md overflow-y-auto z-40">
      <div className="p-4 space-y-6">
        {/* Create Section */}
        <div>
          <h1 className="text-lg font-semibold mb-3">Create New Listing</h1>
          <ul className="space-y-2">
            {listingOptions.map(({ label, icon: Icon, onClick }) => (
              <li
                key={label}
                onClick={onClick}
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
              >
                <Icon size={18} className="text-gray-700" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories Section */}
        <div className="pt-4 border-t border-gray-200">
          <h1 className="text-lg font-semibold mb-3">Categories</h1>
          <ul className="space-y-2">
            {categories.map(({ label, icon: Icon }) => (
              <li
                key={label}
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded cursor-pointer"
              >
                <Icon size={18} className="text-gray-700" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
