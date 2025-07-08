'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import type { Item } from '@/types/item';
import toast from 'react-hot-toast';
import { formatTimeAgo } from '@/lib/formatTimeAgo';


export default function ItemDetailPage() {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchItem = async () => {
      const itemId = parseInt(id);
      if (!id || isNaN(itemId)) {
        console.error('❌ Invalid ID format');
        router.push('/');
        return;
      }

      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', itemId)
        .single();

      if (error || !data) {
        console.error('❌ Item not found or fetch error:', error?.message);
        router.push('/');
        return;
      }

      setItem(data);
      setLoading(false);
    };

    fetchItem();
  }, [id, router]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!item) return <div className="p-6">Item not found.</div>;

  return (
    <div className="flex pt-16 h-[calc(100vh-64px)]">
      {/* Back Button Column (left) */}
      <div className="w-64 p-6">
        <button
          onClick={() => router.back()}
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Listings
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 📷 Image */}
          <div className="flex-1 max-w-2xl">
            {item.image_url ? (
              <Image
                src={item.image_url}
                alt={item.title}
                width={800}
                height={600}
                className="rounded-md object-cover w-full h-auto max-h-[600px]"
                priority
              />
            ) : (
              <div className="w-full h-[400px] bg-gray-200 flex items-center justify-center text-gray-500">
                No Image Available
              </div>
            )}
          </div>

          {/* 📝 Details + Contact Seller */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
              <p className="text-blue-600 text-lg font-medium">
                ₱{Number(item.price).toLocaleString()}
              </p>
              
              <p className="text-gray-600 text-sm">
                📍 {item.location} · {item.created_at && formatTimeAgo(item.created_at)}
              </p>

              <h2 className="text-lg font-semibold mt-5">Category</h2>
              <p className="text-gray-600 text-sm">{item.category}</p>

              <h2 className="text-lg font-semibold mt-5">Description</h2>
              <p className="text-gray-600 mt-2 whitespace-pre-line">
                {item.description}
              </p>
            </div>

            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold mb-2">Seller Email</h2>
              <p className="text-sm text-gray-600 mb-5">{item.email}</p>

              <h2 className="text-lg font-semibold mb-2">Message Seller</h2>
              <form
                onSubmit={async (e) => {
                e.preventDefault();

                const form = e.currentTarget;
                const email = form.email.value;
                const message = form.message.value;

                try {
                  const res = await fetch('/api/messages', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      listing_id: item.id,
                      buyer_email: email,
                      seller_email: item.email, // ✅ Correct name and source
                      message,
                    }),
                  });

                  const body = await res.json();

                  if (!res.ok) {
                    console.error('❌ API responded with error:', body.error);
                    toast.error(`Error: ${body.error ?? res.statusText}`);
                    return;
                  }

                  toast.success('Message sent!');
                  form.reset();
                } catch (err) {
                  console.error('❌ Send failed:', err);
                  toast.error('Unexpected error occurred');
                }
              }}
                className="space-y-3"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your email"
                  className="w-full px-3 py-2 border rounded"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Your message"
                  rows={4}
                  className="w-full px-3 py-2 border rounded resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:cursor-not-allowed cursor-pointer"
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
