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
    // Tava Supabase config (no .env vai hardcoded testēšanai)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Iegūstam sludinājuma pārdevēja e-pastu no DB
    const { data: adData, error: adError } = await supabase
      .from('sludinajumi')  // Tava tabula sludinājumiem
      .select('seller_email')  // Vai kāds lauks ir pārdevēja e-pastā
      .eq('id', sludinajums_id)
      .single();

    if (adError || !adData) {
      return res.status(404).json({ error: 'Sludinājums nav atrasts' });
    }

    const sellerEmail = adData.seller_email;

    // Saglabājam ziņu tavā comments tabulā
    const { error: insertError } = await supabase
      .from('comments')
      .insert([
        {
          sludinajums_id: sludinajums_id,
          user_email: sender_email,
          user_name: sender_name,
          comment: message,
          type: 'message'  // Lai atšķirtu no komentāriem
        }
      ]);

    if (insertError) {
      return res.status(500).json({ error: 'Ziņa netika saglabāta' });
    }

    // TODO: šeit vari pievienot e-pasta sūtīšanu pārdevējam (ar Nodemailer/Resend)
    // Piemēram: await sendEmail(sellerEmail, sender_name, message);

    res.status(200).json({ success: true, message: 'Ziņa nosūtīta!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
