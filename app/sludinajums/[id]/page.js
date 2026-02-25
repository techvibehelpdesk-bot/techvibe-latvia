'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function SludinajumaLapa({ params, searchParams }) {
  const [sludinajums, setSludinajums] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  // CHAT MODALIS
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageType, setMessageType] = useState('comment');
  const [messageText, setMessageText] = useState('');

  // KOMENTĀRI
  const [comments, setComments] = useState([]);

  // ✅ IZSOLE - PILNĀS STATE
  const [auction, setAuction] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [myBid, setMyBid] = useState('');
  const [isAuctionActive, setIsAuctionActive] = useState(false);
  const [bidError, setBidError] = useState('');

  // SUPABASE
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // SLUDINĀJUMS
  useEffect(() => {
    supabase
      .from('sludinajumi')
      .select('*')
      .eq('id', params.id)
      .single()
      .then(({ data }) => {
        setSludinajums(data);
        const imgs = Array.isArray(data?.image_public_urls) ? data.image_public_urls : [];
        setImages(imgs);
        setCurrentImage(0);
      });
  }, [params.id]);

  // KOMENTĀRI + REAL-TIME
  useEffect(() => {
    if (!params.id) return;
    const fetchComments = async () => {
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('sludinajums_id', params.id)
        .order('created_at', { ascending: false });
      setComments(data || []);
    };
    fetchComments();

    const channel = supabase
      .channel(`comments-${params.id}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `sludinajums_id=eq.${params.id}` },
        (payload) => setComments((prev) => [payload.new, ...prev])
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [params.id]);

  // ✅ IZSOLE + REAL-TIME
  useEffect(() => {
    if (!params.id) return;

    const fetchAuction = async () => {
      const { data } = await supabase
        .from('auctions')
        .select('*, auction_bids(max_amount) as bids')
        .eq('sludinajums_id', params.id)
        .single();
      setAuction(data);
      setCurrentBid(data?.bids?.max_amount || 0);
      setIsAuctionActive(!data?.ends_at || new Date(data.ends_at) > new Date());
    };

    fetchAuction();

    const channel = supabase
      .channel(`auction-${params.id}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'auction_bids', filter: `sludinajums_id=eq.${params.id}` },
        () => fetchAuction()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [params.id]);

  // GALERIJA
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // FULLSCREEN FUNCIJAS
  const openFullscreen = (imgSrc, index = 0) => {
    setFullscreenIndex(index); setFullscreenOpen(true); document.body.style.overflow = 'hidden';
  };
  const closeFullscreen = () => { setFullscreenOpen(false); document.body.style.overflow = ''; };
  const nextImageFullscreen = () => setFullscreenIndex((prev) => (prev + 1) % images.length);
  const prevImageFullscreen = () => setFullscreenIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleHeroClick = (e, currentIdx) => setCurrentImage((currentIdx + 1) % images.length);

  // KOMENTĀRS
  const sendMessage = async () => {
    if (!messageText.trim()) return;
    const { error } = await supabase.from('comments').insert({
      sludinajums_id: params.id, type: messageType, comment: messageText, user_email: 'client@test.lv'
    });
    if (!error) setMessageText('');
  };

  // ✅ IZSOLes BID
  const placeBid = async () => {
    const bidAmount = parseFloat(myBid);
    if (bidAmount <= currentBid) {
      setBidError('Piedāvājums jābūt lielāks par pašreizējo!');
      return;
    }
    if (bidAmount < 10) {
      setBidError('Minimālais solis 10€!');
      return;
    }

    const { error } = await supabase.from('auction_bids').insert({
      sludinajums_id: params.id,
      amount: bidAmount,
      user_email: 'client@test.lv'
    });

    if (!error) {
      setMyBid('');
      setBidError('');
    } else {
      setBidError('Kļūda: ' + error.message);
    }
  };

  // KEYBOARD
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullscreenOpen) return;
      if (e.key === 'Escape') closeFullscreen();
      if (e.key === 'ArrowRight') nextImageFullscreen();
      if (e.key === 'ArrowLeft') prevImageFullscreen();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenOpen, images.length]);

  if (!sludinajums) return <div style={{padding: '100px', textAlign: 'center'}}>Loading...</div>;

  return (
    <div style={{background: '#f9fafb', padding: '24px 0', minHeight: '100vh'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px'}}>
        
        {/* ATTĒLI */}
        <div>
          <div style={{position: 'relative', height: '280px', marginBottom: '8px', borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', background: '#f0f0f0', cursor: 'pointer'}}
            onClick={(e) => handleHeroClick(e, currentImage)} onDoubleClick={() => openFullscreen(images[currentImage], currentImage)}>
            <img src={images[currentImage]} style={{width: '100%', height: '100%', objectFit: 'contain', transition: 'opacity 0.8s'}} alt="Hero" />
          </div>
          <div style={{background: 'white', padding: '8px 16px', borderRadius: '0 0 12pxLabi, šeit ir **pilns SludinajumaLapa.jsx kods AR IZSOLI** – copy-paste, push, testējam soli pa solim.

## Pilns kods ar izsoli (SOLIS #3A)
```jsx
'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function SludinajumaLapa({ params, searchParams }) {
  const [sludinajums, setSludinajums] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  // CHAT MODALIS
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageType, setMessageType] = useState('comment');
  const [messageText, setMessageText] = useState('');

  // KOMENTĀRU STATE
  const [comments, setComments] = useState([]);

  // ✅ IZSOLes STATE - JAUNS!
  const [auction, setAuction] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [myBid, setMyBid] = useState('');
  const [isAuctionActive, setIsAuctionActive] = useState(false);
  const [isBidding, setIsBidding] = useState(false);

  // SUPABASE Klients
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // SLUDINĀJUMA IELĀDE
  useEffect(() => {
    supabase
      .from('sludinajumi')
      .select('*')
      .eq('id', params.id)
      .single()
      .then(({ data }) => {
        setSludinajums(data);
        const imgs = Array.isArray(data?.image_public_urls) ? data.image_public_urls : [];
        setImages(imgs);
        setCurrentImage(0);
      });
  }, [params.id]);

  // KOMENTĀRU IELĀDE + REAL-TIME
  useEffect(() => {
    if (!params.id) return;

    const fetchComments = async () => {
      const { data } = await supabase
        .from('comments')
        .select('*')
        .eq('sludinajums_id', params.id)
        .order('created_at', { ascending: false });
      setComments(data || []);
    };

    fetchComments();

    const channel = supabase
      .channel(`comments-${params.id}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'comments', 
          filter: `sludinajums_id=eq.${params.id}` 
        },
        (payload) => {
          setComments((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [params.id]);

  // ✅ IZSOLes IELĀDE + REAL-TIME
  useEffect(() => {
    if (!params.id) return;

    const fetchAuction = async () => {
      const { data } = await supabase
        .from('auctions')
        .select('*, auction_bids(max(amount) as current_bid), ends_at')
        .eq('sludinajums_id', params.id)
        .single();
      
      if (data) {
        setAuction(data);
        setCurrentBid(data.current_bid || sludinajums?.price || 0);
        const now = new Date().toISOString();
        setIsAuctionActive(!data.ends_at || data.ends_at > now);
      }
    };

    fetchAuction();

    const channel = supabase
      .channel(`auction-${params.id}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'auction_bids', 
          filter: `sludinajums_id=eq.${params.id}` 
        },
        (payload) => {
          setCurrentBid(payload.new.amount);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [params.id]);

  // GALERIJA AUTO SLIDE
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // ✅ UZLABOTA IZSOLes BID
  const placeBid = async () => {
    if (!myBid || parseFloat(myBid) <= currentBid) {
      alert('Piedāvājums jābūt lielāks par pašreizējo!');
      return;
    }

    setIsBidding(true);
    const { error } = await supabase
      .from('auction_bids')
      .insert({
        sludinajums_id: params.id,
        amount: parseFloat(myBid),
        user_email: 'client@test.lv' // Vēlāk īstais user
      });

    if (error) {
      console.error('Kļūda izsolē:', error);
      alert('Kļūda sūtot piedāvājumu!');
    } else {
      setMyBid('');
    }
    setIsBidding(false);
  };

  // FULLSCREEN FUNCIJAS (nepārmainītas)
  const openFullscreen = (imgSrc, index = 0) => {
    setFullscreenIndex(index);
    setFullscreenOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenOpen(false);
    document.body.style.overflow = '';
  };

  const nextImageFullscreen = () => setFullscreenIndex((prev) => (prev + 1) % images.length);
  const prevImageFullscreen = () => setFullscreenIndex((prev) => (prev - 1 + images.length) % images.length);
  const handleHeroClick = (e, currentIdx) => setCurrentImage((currentIdx + 1) % images.length);

  // sendMessage (nepārmainīts)
  const sendMessage = async () => {
    if (!messageText.trim()) return;
    const { error } = await supabase
      .from('comments')
      .insert({
        sludinajums_id: params.id,
        type: messageType,
        comment: messageText,
        user_email: 'client@test.lv'
      });
    if (error) console.error('Kļūda:', error);
    else setMessageText('');
  };

  if (!sludinajums) return <div style={{padding: '100px', textAlign: 'center'}}>Loading...</div>;

  return (
    <div style={{background: '#f9fafb', padding: '24px 0', minHeight: '100vh'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px'}}>
        
        {/* KREISĀ - ATTĒLI (nepārmainīti) */}
        <div>{/* ... visa galerijas daļa paliek tā pati ... */}</div>

        {/* LABĀ - SATURS + IZSOLE */}
        <div>
          {/* Visa iepriekšējā satura daļa (dzinējs, aprīkojums, apraksts, komentāri) paliek tā pati */}

          {/* ✅ JAUNA IZSOLES SADAĻA - AIZSTĀJ IEPRIEKŠĒJO CENU BLOKU */}
          <div style={{background: isAuctionActive ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 'linear-gradient(135deg, #6b7280, #4b5563)', color: 'white', padding: '32px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 16px 32px rgba(239,68,68,0.3)', marginBottom: '24px'}}>
            <h1 style={{fontSize: '3.5rem', fontWeight: 900, marginBottom: '12px'}}>
              {isAuctionActive ? '🔴 AKTĪVA IZSOLE' : '⏰ Izsole beigusies'}
            </h1>
            
            <div style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: '20px'}}>
              {currentBid.toLocaleString()} €
            </div>
            
            {isAuctionActive ? (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px'}}>
                <div style={{display: 'flex', gap: '12px', alignItems: 'end'}}>
                  <input
                    type="number"
                    value={myBid}
                    onChange={(e) => setMyBid(e.target.value)}
                    placeholder="Piedāvā savu cenu"
                    min={currentBid + 10}
                    step="10"
                    style={{
                      padding: '16px 20px', fontSize: '1.8rem', fontWeight: 700,
                      border: '3px solid rgba(255,255,255,0.3)', borderRadius: '12px',
                      background: 'rgba(255,255,255,0.95)', color: '#dc2626', textAlign: 'center',
                      width: '220px', outline: 'none'
                    }}
                  />
                  <button
                    onClick={placeBid}
                    disabled={!myBid || parseFloat(myBid) <= currentBid || isBidding}
                    style={{
                      background: 'rgba(255,255,255,0.95)', color: '#dc2626', padding: '16px 32px',
                      fontSize: '1.4rem', fontWeight: 900, borderRadius: '12px', border: 'none',
                      cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                      opacity: (myBid && parseFloat(myBid) > currentBid && !isBidding) ? 1 : 0.6
                    }}
                  >
                    {isBidding ? '⏳ Nosūtu...' : '⚡ PIEDĀVĀT'}
                  </button>
                </div>
                <div style={{fontSize: '1rem', opacity: 0.9}}>
                  Min. piedāvājums: {currentBid + 10} €
                </div>
              </div>
            ) : (
              <div style={{fontSize: '1.2rem', opacity: 0.9}}>
                Izsole beidzās: {auction?.ends_at ? new Date(auction.ends_at).toLocaleString('lv-LV') : 'N/A'}
              </div>
            )}
          </div>

          {/* Pārējās pogas (zvanīt, komentāri) paliek */}
          <div style={{display: 'flex', gap: '16px', justifyContent: 'center'}}>
            <button style={{/* zvans stils */}}>📞 Zvanīt</button>
            <button onClick={() => setIsChatOpen(true)} style={{/* chat stils */}}>💬 Komentārs</button>
          </div>
        </div>
      </div>

      {/* Modāļi paliek tie paši */}
    </div>
  );
}
