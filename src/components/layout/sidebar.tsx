// src/components/layout/sidebar.tsx
const categories = ["Vehicles", "Rentals", "Apparel", "Electronics", "Furniture"];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md h-[calc(100vh-64px)] hidden md:block">
      <ul className="p-4 space-y-2">
        {categories.map((cat) => (
          <li key={cat} className="hover:bg-gray-100 p-2 rounded cursor-pointer">
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
}
