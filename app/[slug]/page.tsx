import { createClient } from '@supabase/supabase-js';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export interface Params {
  slug: string;
}

export interface PageProps {
  params: Params;
}

export default async function SlugPage({ params }: PageProps) {
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

export async function generateMetadata({ 
  params 
}: { 
  params: Params 
}): Promise<Metadata> {
  return {
    title: `Redirect for ${params.slug}`,
    description: 'URL Redirection Page'
  };
}

export const dynamic = 'force-dynamic';
