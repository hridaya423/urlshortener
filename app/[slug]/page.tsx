// app/[slug]/page.tsx
import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function SlugPage({ 
  params 
}: { 
  params: { slug: string } // Change from Promise<{ slug: string }> to { slug: string }
}) {
  const { slug } = params; // Simply destructure from params, no need to await

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
