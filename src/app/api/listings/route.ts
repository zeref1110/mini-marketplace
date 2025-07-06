// src/app/api/listings/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { title, price, category, location, description, email, image_url, createdAt } = data;

    const { error } = await supabase.from('listings').insert([
      {
        title,
        price,
        category,
        location,
        description,
        email,
        image_url,
        created_at: createdAt, // match with your table schema's column
      },
    ]);

    if (error) {
      console.error('❌ Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to insert listing' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('❌ API route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
