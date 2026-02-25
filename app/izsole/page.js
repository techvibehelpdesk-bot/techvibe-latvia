'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function IzsolePage() {
  const sludinajums_id = '550e8400-e29b-41d4-a716-446655440000';
  const [currentBid, setCurrentBid] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch initial + REALTIME subscription
  useEffect(() => {
    // Initial fetch
    fetchCurrentBid();

    // Realtime listen izsole changes
    const subscription = supabase
      .channel('izsole-realtime')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'izsole', filter: `sludinajums_id=eq.${sludinajums_id}` },
        (payload) => {
          console.log('Realtime bid:', payload.new.current_bid);
          setCurrentBid(payload.new.current_bid);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, []);

  const fetchCurrentBid = async () => {
    const { data } = await supabase
      .from('izsole')
      .select('current_bid')
      .eq('sludinajums_id', sludinajums_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    if (data) setCurrentBid(data.current_bid);
  };

  const handleBidSubmit = async () => {
    setLoading(true);
    setError('');

    // Validācija (vienkāršota, jo jau strādā)
    const { data: adCheck } = await supabase
      .from('sludinajumi')
      .select('id')
      .eq('id', sludinajums_id)
      .single();
    if (!adCheck) {
      setError('Sludinājums neeksistē');
      setLoading(false);
      return;
    }

    // Jauns bid +10
    const newBid = currentBid + 10;
    const { error } = await supabase
      .from('izsole')
      .insert({ current_bid: newBid, sludinajums_id });

    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto' }}>
      <h1>Izsole: Testa Auto</h1>
      <p style={{ fontSize: '2rem', color: 'green' }}>Pašreizējais bids: <strong>€{currentBid.toFixed(2)}</strong></p>
      {error && <p style={{ color: 'red' }}>Kļūda: {error}</p>}
      <button 
        onClick={handleBidSubmit} 
        disabled={loading}
        style={{ 
          padding: '1rem 2rem', 
          fontSize: '1.5rem', 
          background: '#0070f3', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Veicu...' : `Veikt bid €${(currentBid + 10).toFixed(2)}`}
      </button>
      <p><small>Atver 2. tab/browser - spied bid, redzi realtime update!</small></p>
    </div>
  );
}
