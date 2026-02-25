'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SludinajumaLapa({ params }) {
  const [sludinajums, setSludinajums] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bids, setBids] = useState([]);
  const [newBid, setNewBid] = useState('');

  useEffect(() => {
    if (!params?.id) {
      setError('Nav sludinājuma ID');
      setLoading(false);
      return;
    }
    fetchSludinajums();
    fetchComments();
    fetchBids();
  }, [params?.id]);

  useEffect(() => {
    if (!params?.id) return;

    const channel = supabase.channel(`comments-${params.id}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'comments', filter: `sludinajums_id=eq.${params.id}` },
        () => fetchComments()
      )
      .subscribe();

    const bidsChannel = supabase.channel(`bids-${params.id}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'bids', filter: `sludinajums_id=eq.${params.id}` },
        () => fetchBids()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(bidsChannel);
    };
  }, [params?.id]);

  const fetchSludinajums = async () => {
    try {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('id', params.id)
        .single();
      
      if (error) throw error;
      if (data) {
        setSludinajums(data);
        setImages(data.images ? JSON.parse(data.images) : []);
      }
    } catch (err) {
      setError('Kļūda ielādējot sludinājumu: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('sludinajums_id', params.id)
        .order('created_at', { ascending: false });
      if (!error) setComments(data || []);
    } catch (err) {
      console.error('Komentāru kļūda:', err);
    }
  };

  const fetchBids = async () => {
    try {
      const { data, error } = await supabase
        .from('bids')
        .select('*')
        .eq('sludinajums_id', params.id)
        .order('created_at', { ascending: false });
      if (!error) setBids(data || []);
    } catch (err) {
      console.error('Piedāvājumu kļūda:', err);
    }
  };

  const sendComment = async () => {
    if (!newComment.trim()) return;
    try {
      await supabase
        .from('comments')
        .insert({ sludinajums_id: params.id, content: newComment });
      setNewComment('');
    } catch (err) {
      setError('Kļūda sūtot komentāru: ' + err.message);
    }
  };

  const placeBid = async () => {
    if (!newBid.trim()) return;
    try {
      await supabase
        .from('bids')
        .insert({ sludinajums_id: params.id, amount: parseFloat(newBid) || 0 });
      setNewBid('');
    } catch (err) {
      setError('Kļūda sūtot piedāvājumu: ' + err.message);
    }
  };

  if (loading) return <div className="p-8 text-center">Ielādē sludinājumu...</div>;
  if (error) return <div className="p-8 text-center text-red-600">Kļūda: {error}</div>;
  if (!sludinajums) return <div className="p-8 text-center">Sludinājums nav atrasts</div>;

  const currentImage = images[currentImageIndex] || '/placeholder.jpg';

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Attēlu galerija */}
        <div>
          <img 
            src={currentImage} 
            alt="Galvenais attēls" 
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-4"
            style={{ borderRadius: '12px' }}
          />
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-2">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Miniatūra ${idx + 1}`}
                  className={`w-20 h-20 object-cover cursor-pointer rounded transition-all ${idx === currentImageIndex ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                  style={{ borderRadius: '8px' }}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sludinājuma info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{sludinajums.nosaukums}</h1>
          <p className="text-2xl font-semibold text-green-600 mb-4">💰 {sludinajums.cena} €</p>
          <p className="text-gray-700 mb-6 whitespace-pre-wrap">{sludinajums.apraksts}</p>
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-100 rounded-lg" style={{ borderRadius: '12px' }}>
            <p><strong>Kategorija:</strong> {sludinajums.kategorija}</p>
            <p><strong>Pilsēta:</strong> {sludinajums.pilseta}</p>
          </div>
        </div>
      </div>

      {/* Izsole */}
      {sludinajums.veids === 'izsole' && (
        <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-xl mb-8" style={{ borderRadius: '12px' }}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">🔨 Izsole</h2>
          <div className="space-y-3">
            {bids.length > 0 ? (
              bids.slice(0, 5).map((bid) => (
                <div key={bid.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm" style={{ borderRadius: '8px' }}>
                  <span className="font-medium">{bid.user_email || 'Anonīms'}</span>
                  <span className="text-lg font-bold text-green-600">{bid.amount} €</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">Vēl nav piedāvājumu. Esi pirmais!</p>
            )}
            {bids.length > 5 && <p className="text-sm text-gray-500">+{bids.length - 5} vairāk</p>}
            <div className="flex gap-3 pt-4 border-t">
              <input
                type="number"
                value={newBid}
                onChange={(e) => setNewBid(e.target.value)}
                placeholder="Ievadi piedāvājumu (EUR)"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ borderRadius: '12px' }}
                step="0.01"
                min="0"
              />
              <button
                onClick={placeBid}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
                style={{ borderRadius: '12px' }}
              >
                Piedāvāt!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Komentāri */}
      <div className="bg-gradient-to-r from-gray-50 to-white border p-6 rounded-2xl shadow-sm" style={{ borderRadius: '20px' }}>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">💬 Komentāri ({comments.length})</h2>
        <div className="mb-6 p-4 bg-white rounded-xl border" style={{ borderRadius: '16px' }}>
          <div className="flex gap-3">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Raksti komentāru... (Enter nosūtīt)"
              className="flex-1 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              style={{ borderRadius: '16px' }}
              onKeyPress={(e) => e.key === 'Enter' && sendComment()}
              maxLength={500}
            />
            <button
              onClick={sendComment}
              disabled={!newComment.trim()}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg disabled:shadow-none"
              style={{ borderRadius: '16px' }}
            >
              Sūtīt
            </button>
          </div>
        </div>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 border-blue-500" style={{ borderRadius: '16px' }}>
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-gray-900">{comment.user_email || 'Anonīms'}</div>
                <div className="text-sm text-gray-500">
                  {new Date(comment.created_at).toLocaleString('lv-LV', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
              <p className="text-gray-800 leading-relaxed">{comment.content}</p>
            </div>
          ))}
          {comments.length === 0 && (
            <div className="text-center py-12 text-gray-500 italic rounded-xl bg-gray-50" style={{ borderRadius: '16px' }}>
              Vēl nav komentāru. Esi pirmais!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
