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
  };
}

export default function PreviewCard({ data }: PreviewCardProps) {
  const previewImageUrl = data.images?.[0]
    ? URL.createObjectURL(data.images[0])
    : 'https://via.placeholder.com/600x400?text=No+Image';

  return (
    <div className="border rounded-lg shadow-md overflow-hidden w-full bg-white">
      {/* 🖼️ Image */}
      <div className="relative w-full h-64 bg-gray-100">
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
          {data.category || 'Category'}
        </p>
        <p className="text-sm text-gray-600">
          {data.location || 'Location not set'}
        </p>
        <p className="text-sm text-gray-600 italic">
          {data.email || 'Email address'}
        </p>
        <p className="text-gray-800 text-sm">
          {data.description || 'No description provided.'}
        </p>
      </div>
    </div>
  );
}
