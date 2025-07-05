'use client';

type PreviewCardProps = {
  data: {
    title?: string;
    price?: string;
    email?: string;
    category?: string;
  };
};

export default function PreviewCard({ data }: PreviewCardProps) {
  if (!data.title && !data.price && !data.email) return null;

  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">📦 Live Preview</h3>
      <p><strong>Title:</strong> {data.title || '—'}</p>
      <p><strong>Price:</strong> {data.price ? `$${data.price}` : '—'}</p>
      <p><strong>Email:</strong> {data.email || '—'}</p>
      <p><strong>Category:</strong> {data.category || '—'}</p>
    </div>
  );
}
