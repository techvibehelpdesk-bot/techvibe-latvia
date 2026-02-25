'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function IzsolePage({ params }) {
  const sludinajums_id = params.id;  // pieņem, ka nāk no dynamic route [id]
  const [currentBid, setCurrentBid] = useState(0);
  // citas state...

  const handleBidSubmit = async (newBid) => {  // event handler funkcija
    // Validācija pirms insert
    const { data: adCheck, error: checkError } = await supabase
      .from('sludinajumi')
      .select('id')
      .eq('id', sludinajums_id)
      .single();

    if (checkError || !adCheck) {
      console.error('Sludinājums nav atrasts:', checkError);
      alert('Sludinājums neeksistē');  // vai setError state
      return;  // tagad return OK iekšā funkcijā
    }

    // Insert ja OK
    const { data, error } = await supabase
      .from('izsole')
      .insert({ current_bid: newBid, sludinajums_id: sludinajums_id })
      .select()
      .single();

    if (error) {
      console.error('Bid kļūda:', error);
    } else {
      setCurrentBid(newBid);
    }
  };

  return (
    <div>
      {/* Tava JSX */}
      <button onClick={() => handleBidSubmit(100)}>Veikt bid 100</button>
    </div>
  );
}
