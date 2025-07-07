// src/app/api/listings/[id]/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const listingId = parseInt(params.id, 10)

  if (isNaN(listingId)) {
    return NextResponse.json(
      { error: 'Invalid listing ID' },
      { status: 400 }
    )
  }

  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', listingId)
    .single()

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message || 'Listing not found' },
      { status: 404 }
    )
  }

  return NextResponse.json(data, { status: 200 })
}
