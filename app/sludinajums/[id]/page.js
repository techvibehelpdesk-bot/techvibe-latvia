'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function SludinajumaLapa({ params }) {
  const [sludinajums, setSludinajums] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bids, setBids] = useState([]);
  const [newBid, setNewBid] = useState('');

  useEffect(() => {
    fetchSludinajums();
    fetchComments();
    fetchBids();
  }, [params.id]);

  useEffect(() => {
    // Real-time comments
    const channel = supabase.channel('comments')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'comments', filter: `sludinajums_id=eq.${params.id}` },
        (payload) => {
          fetchComments();
        }
      )
      .subscribe();

    // Real-time bids
    const bidsChannel = supabase.channel('bids')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'bids', filter: `sludinajums_id=eq.${params.id}` },
        (payload) => {
          fetchBids();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(bidsChannel);
    };
  }, [params.id]);

  const fetchSludinajums = async () => {
    const { data, error } = await supabase
      .from('sludinajumi')
      .select('*')
      .eq('id', params.id)
      .single();
    if (data) {
      setSludinajums(data);
      if (data.images) {
        setImages(JSON.parse(data.images));
      }
    }
    setLoading(false);
  };

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('sludinajums_id', params.id)
      .order('created_at', { ascending: false });
    setComments(data || []);
  };

  const fetchBids = async () => {
    const { data } = await supabase
      .from('bids')
      .select('*')
      .eq('sludinajums_id', params.id)
      .order('created_at', { ascending: false });
    setBids(data || []);
  };

  const sendComment = async () => {
    if (!newComment.trim()) return;
    await supabase
      .from('comments')
      .insert({ sludinajums_id: params.id, content: newComment });
    setNewComment('');
  };

  const placeBid = async () => {
    if (!newBid.trim()) return;
    await supabase
      .from('bids')
      .insert({ sludinajums_id: params.id, amount: parseFloat(newBid) });
    setNewBid('');
  };

  if (loading) return <div>Ielādē...</div>;
  if (!sludinajums) return <div>Sludinājums nav atrasts</div>;

  const currentImage = images[currentImageIndex] || '/placeholder.jpg';

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Attēlu galerija */}
        <div>
          <img 
            src={currentImage} 
            alt="Galvenais" 
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-4"
            style={{ borderRadius: '12px' }}
          />
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Mini ${idx}`}
                  className={`w-20 h-20 object-cover cursor-pointer rounded ${idx === currentImageIndex ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setCurrentImageIndex(idx)}
                  style={{ borderRadius: '8px' }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sludinājuma info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{sludinajums.nosaukums}</h1>
          <p className="text-2xl font-semibold text-green-600 mb-4">💰 {sludinajums.cena} €</p>
          <p className="text-gray-700 mb-6">{sludinajums.apraksts}</p>
          <div className="space-y-2 mb-6">
            <p><strong>Kategorija:</strong> {sludinajums.kategorija}</p>
            <p><strong>Pilsēta:</strong> {sludinajums.pilseta}</p>
          </div>
        </div>
      </div>

      {/* Izsole */}
      {sludinajums.veids === 'izsole' && (
        <div className="bg-yellow-50 p-6 rounded-lg mb-8" style={{ borderRadius: '12px' }}>
          <h2 className="text-2xl font-bold mb-4">🔨 Izsole</h2>
          <div className="space-y-2 mb-4">
            {bids.length > 0 ? (
              bids.map((bid) => (
                <div key={bid.id} className="flex justify-between bg-white p-3 rounded" style={{ borderRadius: '8px' }}>
                  <span>{bid.user_email || 'Anonīms'}</span>
                  <span className="font-bold">{bid.amount} €</span>
                </div>
              ))
            ) : (
              <p>Vēl nav piedāvājumu</p>
            )}
            <div className="flex gap-2">
              <input
                type="number"
                value={newBid}
                onChange={(e) => setNewBid(e.target.value)}
                placeholder="Ievadi savu piedāvājumu"
                className="flex-1 p-2 border rounded"
                style={{ borderRadius: '8px' }}
              />
              <button
                onClick={placeBid}
                className="bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600"
                style={{ borderRadius: '8px' }}
              >
                Piedāvāt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Komentāri */}
      <div className="bg-gray-50 p-6 rounded-lg" style={{ borderRadius: '12px' }}>
        <h2 className="text-2xl font-bold mb-4">💬 Komentāri ({comments.length})</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Pievienot komentāru..."
            className="flex-1 p-3 border rounded-lg"
            style={{ borderRadius: '12px' }}
            onKeyPress={(e) => e.key === 'Enter' && sendComment()}
          />
          <button
            onClick={sendComment}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600"
            style={{ borderRadius: '12px' }}
          >
            Sūtīt
          </button>
        </div>
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm" style={{ borderRadius: '12px' }}>
              <div className="font-semibold">{comment.user_email || 'Anonīms'}</div>
              <p className="mt-1">{comment.content}</p>
              <div className="text-sm text-gray-500 mt-2">
                {new Date(comment.created_at).toLocaleString('lv-LV')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
