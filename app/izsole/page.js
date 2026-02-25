'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase env nav iestatīti .env.local');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default function IzsolePage() {
  const sludinajums_id = '550e8400-e29b-41d4-a716-446655440000';  // HARDCODE testam
  const [currentBid, setCurrentBid] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch current bid on load
  useEffect(() => {
    fetchCurrentBid();
  }, []);

  const fetchCurrentBid = async () => {
    const { data, error } = await supabase
      .from('izsole')
      .select('current_bid')
      .eq('sludinajums_id', sludinajums_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (data) setCurrentBid(data.current_bid);
    if (error) console.log('Nav bidu vēl');
  };

  const handleBidSubmit = async () => {
    setLoading(true);
    setError('');
    console.log('Validējam ID:', sludinajums_id);

    // Validācija
    const { data: adCheck, error: checkError } = await supabase
      .from('sludinajumi')
      .select('id, title')
      .eq('id', sludinajums_id)
      .single();

    console.log('Sludinājums check:', adCheck, checkError);

    if (checkError || !adCheck) {
      setError(`Sludinājums ${sludinajums_id} neeksistē: ${checkError?.message}`);
      setLoading(false);
      return;
    }

    // Insert bid (update current_bid)
    const { data: bidData, error: bidError } = await supabase
      .from('izsole')
      .insert({ 
        current_bid: currentBid + 10,  // +10 no current
        sludinajums_id 
      })
      .select()
      .single();

    console.log('Bid rezultāts:', bidData, bidError);

    if (bidError) {
      setError(`Bid kļūda: ${bidError.message}`);
    } else {
      setCurrentBid(bidData.current_bid);
      alert('Bid veiksmīgs!');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Izsole ID: {sludinajums_id}</h1>
      <p>Pašreizējais bids: €{currentBid.toFixed(2)}</p>
      {error && <p style={{ color: 'red' }}>Kļūda: {error}</p>}
      <button 
        onClick={handleBidSubmit} 
        disabled={loading}
        style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}
      >
        {loading ? 'Veicu bid...' : `Veikt bid €${(currentBid + 10).toFixed(2)}`}
      </button>
    </div>
  );
}
