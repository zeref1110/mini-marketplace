// src/app/api/upload/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `listing-${Date.now()}-${uuidv4()}.${fileExt}`;
  const filePath = `listing-images/${fileName}`;

  const { error } = await supabase.storage
    .from('listing-images')
    .upload(filePath, file, {
      contentType: file.type,
      cacheControl: '3600',
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from('listing-images').getPublicUrl(filePath);

  return NextResponse.json({ url: publicUrl }, { status: 200 });
}
