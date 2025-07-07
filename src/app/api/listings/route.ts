// src/app/api/listings/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ✅ Use secure service key for server-side operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // 🚨 Never expose this to the client
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { title, price, category, location, description, email, image_url } = body;

    // ✅ Basic input validation
    if (!title || !price || !category || !location || !description || !email || !image_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase.from('listings').insert([
      {
        title,
        price,
        category,
        location,
        description,
        email,
        image_url,
        // created_at will be auto-filled by Supabase unless you've disabled that
      },
    ]).select().single(); // 👈 Return the inserted row

    if (error) {
      console.error('❌ Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to insert listing' }, { status: 500 });
    }

    return NextResponse.json({ success: true, listing: data }, { status: 201 });
  } catch (err) {
    console.error('❌ API route error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
