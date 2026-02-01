import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  const tables = ['sludinajumi', 'listings', 'ads', 'phone', 'posts'];
  
  for (const table of tables) {
    try {
      const { data } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) {
        let images = [];
        if (data.images) images = Array.isArray(data.images) ? data.images : JSON.parse(data.images);
        if (data.thumbnail_url && !images.includes(data.thumbnail_url)) images.unshift(data.thumbnail_url);
        
        return Response.json({ data, images, table, error: null });
      }
    } catch (e) {}
  }
  
  return Response.json({ data: null, images: [], table: null, error: 'Nav atrasts' });
}
