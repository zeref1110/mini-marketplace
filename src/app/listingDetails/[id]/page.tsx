'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { ListingFormData } from '@/components/forms/ListingForm'

export default function ListingDetailPage() {
  const [data, setData] = useState<ListingFormData | null>(null)

  useEffect(() => {
    const storedData = localStorage.getItem('latestListing')
    if (storedData) {
      setData(JSON.parse(storedData))
    }
  }, [])

  if (!data) {
    return <p className="p-6 text-gray-600">No listing found.</p>
  }

  const previewImageUrl = data.images?.[0]
    ? URL.createObjectURL(data.images[0])
    : 'https://via.placeholder.com/600x400?text=No+Image'

  return (
    <div className="flex pt-16 h-[calc(100vh-64px)]">
      <div className="w-64" /> {/* Spacer for fixed sidebar */}

      <main className="flex-1 overflow-y-auto p-6 flex gap-6">
        {/* 📷 Large Image */}
        <div className="w-2/3 relative h-[500px] bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={previewImageUrl}
            alt="Listing Image"
            fill
            className="object-cover"
          />
        </div>

        {/* 📄 Info */}
        <div className="w-1/3 space-y-4">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p className="text-lg font-medium text-blue-600">₱{data.price}</p>
          <p className="text-sm text-gray-600">
            {data.category} • {data.location}
          </p>
          <p className="text-sm text-gray-700">{data.description}</p>

          {/* 🧑 Seller */}
          <div className="mt-6 border-t pt-4">
            <h2 className="text-md font-semibold mb-2">Contact Seller</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                alert('Message sent!')
              }}
              className="space-y-3"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full border px-3 py-2 rounded"
              />
              <textarea
                required
                placeholder="Your message"
                className="w-full border px-3 py-2 rounded resize-none"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
