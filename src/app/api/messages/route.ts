import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ✅ This is okay for server routes
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { listing_id, buyer_email, seller_email, message } = body;

    if (!listing_id || !buyer_email || !seller_email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([{ listing_id, buyer_email, seller_email, message }])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase insert error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: data }, { status: 201 });
  } catch (err) {
    console.error('❌ Server error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const listing_id = searchParams.get('listing_id');

    if (!listing_id) {
      return NextResponse.json({ error: 'listing_id is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('listing_id', Number(listing_id))
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Fetch error:', error);
      return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
    }

    return NextResponse.json({ messages: data }, { status: 200 });
  } catch (err) {
    console.error('❌ Server error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
