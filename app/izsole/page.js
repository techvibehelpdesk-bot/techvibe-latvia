const { data: adCheck, error: checkError } = await supabase
  .from('sludinajumi')
  .select('id')
  .eq('id', sludinajums_id)  // sludinajums_id no props/state
  .single();

if (checkError || !adCheck) {
  console.error('Sludinājums nav atrasts:', checkError);
  return { error: 'Sludinājums neeksistē' };
}
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function IzsoleLapa() {
  const [currentBid, setCurrentBid] = useState(100);  // Tavs default
  const [highestBidder, setHighestBidder] = useState('Anon');
  const [myBid, setMyBid] = useState('');
  const [loading, setLoading] = useState(true);
  const ITEM_ID = 'test-bike';  // Piemērs sludinajums_id

  useEffect(() => {
    fetchAuction();
  }, []);

  const fetchAuction = async () => {
    try {
      const { data, error } = await supabase
        .from('izsole')
        .select('current_bid, highest_bidder_email, bid_count')
        .eq('sludinajums_id', ITEM_ID)
        .single();  // Viena rindiņa
        
      if (data) {
        setCurrentBid(data.current_bid);
        setHighestBidder(data.highest_bidder_email || 'Anon');
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleBid = async () => {
    const newBid = parseFloat(myBid);
    if (newBid <= currentBid) {
      alert(`Bid jābūt > €${currentBid.toFixed(2)}`);
      return;
    }

    try {
      // Update esošo izsoli
      const { error } = await supabase
        .from('izsole')
        .update({ 
          current_bid: newBid,
          highest_bidder_email: 'test@user.lv',  // Vēlāk no auth
          bid_count: Math.floor(Math.random() * 10) + 1  // Test
        })
        .eq('sludinajums_id', ITEM_ID);
      
      if (error) throw error;
      
      setCurrentBid(newBid);
      setHighestBidder('Tu!');
      setMyBid('');
      alert(`✅ Veiksmīgs bid €${newBid.toFixed(2)}!`);
    } catch (error) {
      alert('Kļūda: ' + error.message);
    }
  };

  if (loading) return <div className="flex justify-center items-center min-h-screen">Ielādē izsoli...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Tiešsaistes izsole</h1>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Jauns velosipēds 🚲</h2>
          <div className="bg-green-100 p-6 rounded-lg mb-8">
            <p className="text-5xl font-black text-green-700">€{currentBid.toFixed(2)}</p>
            <p className="text-lg mt-2">Augstākais: {highestBidder}</p>
          </div>
          
          <div className="flex gap-3 mb-6">
            <input
              type="number"
              value={myBid}
              onChange={(e) => setMyBid(e.target.value)}
              placeholder="Tavs piedāvājums"
              className="flex-1 p-4 border-2 border-blue-200 rounded-xl text-xl focus:border-blue-500 focus:outline-none"
              step="0.01"
              min={currentBid + 1}
            />
            <button 
              onClick={handleBid}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
            >
              Iesniegt bid!
            </button>
          </div>
          
          <div className="text-xs bg-blue-50 p-3 rounded">
            <strong>SOLIS #3:</strong> Izsole tabula • Refresh saglabā bid!
          </div>
        </div>
      </div>
    </div>
  );
}
