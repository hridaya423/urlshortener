/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/shorten/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { nanoid } from 'nanoid';

// Ensure Supabase client is created with proper environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  const { url } = await request.json();

  // Comprehensive URL validation
  if (!url || !/^https?:\/\/\S+$/.test(url)) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    // Use nanoid for more unique and predictable slug generation
    const slug = nanoid(7);

    const { data, error } = await supabase
      .from('urls')
      .insert({ 
        slug, 
        original_url: url,
        created_at: new Date().toISOString()
      })
      .select();

    if (error) throw error;

    // Construct full short URL
    const shortUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${slug}`;

    return NextResponse.json({ shortUrl });
  } catch (error) {
    console.error('Shorten URL Error:', error);
    return NextResponse.json({ error: 'Unable to shorten URL' }, { status: 500 });
  }
}