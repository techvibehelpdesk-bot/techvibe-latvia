'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function IzsoleLapa() {
  const [currentBid, setCurrentBid] = useState(10);
  const [myBid, setMyBid] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHighestBid();
  }, []);

  const fetchHighestBid = async () => {
    const { data, error } = await supabase
      .from('bids')
      .select('amount')
      .order('amount', { ascending: false })
      .limit(1);
    
    if (data && data[0]) {
      setCurrentBid(data[0].amount);
    }
    setLoading(false);
  };

  const handleBid = async () => {
    const newBid = parseFloat(myBid);
    if (newBid <= currentBid) {
      alert('Bid jābūt lielāks!');
      return;
    }

    const { error } = await supabase
      .from('bids')
      .insert([{ item_id: 'bike1', amount: newBid, bidder: 'TestUser' }]);
    
    if (error) {
      alert('Kļūda: ' + error.message);
    } else {
      setMyBid('');
      setCurrentBid(newBid);
      alert(`✅ Bid veiksmīgs: €${newBid.toFixed(2)}`);
    }
  };

  if (loading) return <div className="text-center p-8">Ielādē no Supabase...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Pirmā izsole</h1>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Jauns velosipēds 🚲</h2>
          <p className="text-4xl font-bold text-green-600 mb-8">€{currentBid.toFixed(2)}</p>
          
          <div className="flex gap-3 mb-6">
            <input
              type="number"
              value={myBid}
              onChange={(e) => setMyBid(e.target.value)}
              placeholder="Piedāvājums"
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500"
              step="0.01"
              min={currentBid + 0.01}
            />
            <button
              onClick={handleBid}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 text-lg"
              disabled={loading}
            >
              Piedāvāt!
            </button>
          </div>
          
          <p className="text-xs text-gray-400">SOLIS #3 Supabase – refresh saglabā bid!</p>
        </div>
      </div>
    </div>
  );
}
