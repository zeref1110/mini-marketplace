// src/app/category/[slug]/page.tsx
interface Props {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: Props) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold capitalize">{params.slug}</h2>
      <p>Filtered items from category: <strong>{params.slug}</strong></p>
      {/* You'd filter and show item grid here based on `slug` */}
    </div>
  );
}
