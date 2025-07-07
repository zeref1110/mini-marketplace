'use client';

import { useEffect, useMemo } from 'react';
import Image from 'next/image';

interface PreviewCardProps {
  data: {
    images?: File[];
    title?: string;
    price?: string;
    email?: string;
    category?: string;
    location?: string;
    description?: string;
    createdAt?: string;
  };
}

// ⏱️ Helper function to format listing time
function formatListingTime(dateStr?: string) {
  if (!dateStr) return '';
  const now = new Date();
  const created = new Date(dateStr);
  const diffMs = now.getTime() - created.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHrs / 24);
  const diffYears = now.getFullYear() - created.getFullYear();

  if (diffHrs < 1) return 'Listed just now';
  if (diffHrs < 24) return `Listed ${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `Listed ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffYears >= 1)
    return `Listed in ${created.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    })}`;
  return `Listed in ${created.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
  })}`;
}

export default function PreviewCard({ data }: PreviewCardProps) {
  const previewImageUrl = useMemo(() => {
    if (data.images?.[0]) {
      return URL.createObjectURL(data.images[0]);
    }
    return 'https://via.placeholder.com/600x400?text=No+Image';
  }, [data.images]);

  useEffect(() => {
    return () => {
      // 🔁 Clean up the object URL if it was created
      if (data.images?.[0]) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl, data.images]);

  return (
    <div className="border rounded-lg shadow-md overflow-hidden w-full bg-white">
      {/* 🖼️ Image */}
      <div className="relative w-full h-120 bg-gray-100">
        <Image
          src={previewImageUrl}
          alt="Preview"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      {/* 🧾 Info */}
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">
          {data.title || 'Item Title'}
        </h2>
        <p className="text-blue-600 text-lg font-medium">
          {data.price ? `₱${data.price}` : '₱0.00'}
        </p>
        <p className="text-sm text-gray-600">
          {formatListingTime(data.createdAt)} {data.location || 'Unknown location'}
        </p>
        <p className="text-sm text-gray-600">
          {data.category || 'Category'}
        </p>
        <p className="text-gray-800 text-sm">
          {data.description || 'No description provided.'}
        </p>
        <p className="text-sm text-gray-600 italic">
          {data.email || 'Email address'}
        </p>
      </div>
    </div>
  );
}
