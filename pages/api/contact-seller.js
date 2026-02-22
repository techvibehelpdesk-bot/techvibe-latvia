// pages/api/contact-seller.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const { sludinajums_id, sender_name, sender_email, message } = req.body;

  if (!sludinajums_id || !sender_name || !sender_email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Pārbaudām sludinājumu
    const { data: adData } = await supabase
      .from('sludinajumi')
      .select('id')
      .eq('id', sludinajums_id)
      .single();

    if (!adData) {
      return res.status(404).json({ error: 'Sludinājums nav atrasts' });
    }

    // Saglabājam kā komentāru (bez type lauka)
    const { error: insertError } = await supabase
      .from('comments')
      .insert([
        {
          sludinajums_id: sludinajums_id,
          user_email: sender_email,
          user_name: sender_name,
          comment: `[ZIŅA PIRCĒJAM] ${message}`  // Atzīmējam kā ziņu
        }
      ]);

    if (insertError) {
      console.error('Insert error:', insertError);
      return res.status(500).json({ error: 'Ziņa netika saglabāta' });
    }

    res.status(200).json({ success: true, message: 'Ziņa nosūtīta un saglabāta!' });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
