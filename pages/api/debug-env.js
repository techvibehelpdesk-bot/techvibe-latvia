export default function handler(req, res) {
  res.json({
    url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    urlPreview: process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL.slice(0,20) + '...' : null
  });
}
