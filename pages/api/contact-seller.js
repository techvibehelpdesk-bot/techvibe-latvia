// pages/api/contact-seller.js - ĪSTĀ versija
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST' });

  const { sludinajums_id, sender_name, sender_email, message } = req.body;

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Pārbaude sludinājums
    const { data: ad } = await supabase
      .from('sludinajumi').select('id').eq('id', sludinajums_id).single();
    
    if (!ad) return res.status(404).json({ error: 'Sludinājums nav atrasts' });

    // Insert ziņu
    const { error } = await supabase.from('comments').insert([{
      sludinajums_id,
      user_name: sender_name,
      user_email: sender_email,
      comment: message,
      type: 'message_to_seller'
    }]);

    if (error) return res.status(500).json({ error: error.message });

    res.json({ success: true, message: '✅ Ziņa nosūtīta!' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
