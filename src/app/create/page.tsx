// src/app/create/page.tsx
export default function CreatePage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">What do you want to list?</h1>
      <div className="space-y-4">
        <a href="/create/item" className="block p-4 border rounded hover:bg-gray-100">
          🛒 Item
        </a>
        {/* Future: add other types like vehicle, property, etc. */}
      </div>
    </div>
  );
}
