'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { Item } from '@/types/item';

interface Props {
  params: {
    id: string;
  };
}

export default function ItemDetailPage({ params }: Props) {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchItem = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', Number(params.id))
        .single();

      if (error || !data) {
        console.error('❌ Item not found or fetch error:', error?.message);
        router.push('/'); // Redirect if item is missing
        return;
      }

      setItem(data as Item);
      setLoading(false);
    };

    fetchItem();
  }, [params.id, router]);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!item) {
    return <div className="p-6">Item not found.</div>;
  }

  return (
    <div className="flex pt-16 h-[calc(100vh-64px)]">
      <div className="w-64" /> {/* Spacer for fixed sidebar */}

      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 📷 Image section */}
          <div className="flex-1 max-w-2xl">
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={item.title}
                width={800}
                height={600}
                className="rounded-md object-cover w-full h-auto max-h-[600px]"
              />
            ) : (
              <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          {/* 📝 Info & Contact Form */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
              <p className="text-blue-600 text-lg font-medium">
                ₱{Number(item.price).toLocaleString()}
              </p>
              <p className="text-gray-600 text-sm">{item.category}</p>
              <p className="text-gray-600 text-sm">📍 {item.location}</p>
              <p className="text-gray-800 mt-2">{item.description}</p>
            </div>

            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold mb-2">Contact Seller</h2>
              <p className="text-sm text-gray-600 mb-2">Email: {item.email}</p>

              <form className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full px-3 py-2 border rounded"
                />
                <textarea
                  required
                  placeholder="Your message"
                  rows={4}
                  className="w-full px-3 py-2 border rounded resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
