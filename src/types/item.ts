// src/types/item.ts

export type Item = {
  id: number;
  title: string;
  price: number;
  category: string;
  location: string;
  description: string;
  email: string;
  image_url: string;
  created_at?: string;
};
