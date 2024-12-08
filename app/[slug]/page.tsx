import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

// Create Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Params {
  params: {
    slug: string;
  };
}

export default async function SlugPage({ params }: Params) {
  const { slug } = params;

  const { data, error } = await supabase
    .from('urls')
    .select('original_url')
    .eq('slug', slug)
    .single();

  if (data?.original_url) {
    redirect(data.original_url);
  }

  return <div>URL not found</div>;
}
