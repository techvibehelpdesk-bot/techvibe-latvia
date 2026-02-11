'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function SludinajumaLapa({ params, searchParams }) {
  const [sludinajums, setSludinajums] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  // JAUNIE STATE MODALAM
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messageType, setMessageType] = useState('comment');
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

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

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  // FULLSCREEN GALERIJA
  const openFullscreen = (imgSrc, index = 0) => {
    setFullscreenIndex(index);
    setFullscreenOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeFullscreen = () => {
    setFullscreenOpen(false);
    document.body.style.overflow = '';
  };

  const nextImageFullscreen = () => {
    setFullscreenIndex((prev) => (prev + 1) % images.length);
  };

  const prevImageFullscreen = () => {
    setFullscreenIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleHeroClick = (e, currentIdx) => {
    setCurrentImage((currentIdx + 1) % images.length);
  };

  // SŪTĪT ZIŅU SUPABASE
  const sendMessage = async () => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const { error } = await supabase
      .from('comments')
      .insert({
        sludinajums_id: params.id,
        type: messageType,
        comment: messageText,
        user_email: 'client@test.lv' // Vēlāk nomaini pret īsto user email
      });

    if (!error) {
      setMessageText('');
      alert('✅ Ziņa nosūtīta pārdevējam!');
    } else {
      alert('❌ Kļūda: ' + error.message);
    }
  };

  // KEYBOARD HANDLER
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullscreenOpen) return;
      if (e.key === 'Escape') {
        closeFullscreen();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextImageFullscreen();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevImageFullscreen();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenOpen, images.length]);

  if (!sludinajums) return <div style={{padding: '100px', textAlign: 'center'}}>Loading...</div>;

  return (
    <div style={{background: '#f9fafb', padding: '24px 0', minHeight: '100vh'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px'}}>
        
        {/* KREISĀ - ATTĒLI */}
        <div>
          {/* HERO SLIDER */}
          <div 
            style={{position: 'relative', height: '280px', marginBottom: '8px', borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', background: '#f0f0f0', cursor: 'pointer'}}
            onClick={(e) => handleHeroClick(e, currentImage)}
            onDoubleClick={() => openFullscreen(images[currentImage], currentImage)}
            title="Vienreiz klikšķis - maina foto | Dubultklikšķis - fullscreen"
          >
            <img 
              src={images[currentImage]} 
              style={{width: '100%', height: '100%', objectFit: 'contain', maxWidth: '100%', maxHeight: '100%', transition: 'opacity 0.8s ease-in-out'}} 
              alt="Hero"
            />
          </div>
          
          {/* NUMURS ZEM ATTĒLA */}
          <div style={{background: 'white', padding: '8px 16px', borderRadius: '0 0 12px 12px', textAlign: 'center', fontSize: '0.9rem', color: '#6b7280', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
            Foto {currentImage + 1} / {images.length}
          </div>

          {/* GALERIJA MINI */}
          <div style={{background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', marginTop: '16px'}}>
            <h3 style={{fontSize: '1.2rem', marginBottom: '16px'}}>🖼️ Foto galerija</h3>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px'}}>
              {images.slice(1).map((img, i) => (
                <img 
                  key={i}
                  src={img} 
                  style={{width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s'}} 
                  alt={`Foto ${i+2}`}
                  onClick={() => setCurrentImage(i+1)}
                  title={`Klikšķini lai palielinātu foto ${i+2}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* LABĀ - SATURS */}
        <div>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px'}}>
            <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h4 style={{fontSize: '1rem', fontWeight: 700, marginBottom: '12px'}}>⚙️ Dzinējs</h4>
              <div style={{fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px'}}>2.5 Dzinējs</div>
              <label style={{display: 'block', margin: '6px 0', fontSize: '0.85rem'}}>
                <input type="checkbox" style={{marginRight: '8px'}} defaultChecked readOnly /> Audi Quattro
              </label>
              <label style={{display: 'block', margin: '6px 0', fontSize: '0.85rem'}}>
                <input type="checkbox" style={{marginRight: '8px'}} defaultChecked readOnly /> 256 ZS
              </label>
            </div>

            <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h4 style={{fontSize: '1rem', fontWeight: 700, marginBottom: '12px'}}>📱 Aprīkojums</h4>
              <label style={{display: 'block', margin: '6px 0', fontSize: '0.85rem'}}>
                <input type="checkbox" style={{marginRight: '8px'}} defaultChecked readOnly /> Klimata kontrole
              </label>
              <label style={{display: 'block', margin: '6px 0', fontSize: '0.85rem'}}>
                <input type="checkbox" style={{marginRight: '8px'}} defaultChecked readOnly /> Parktronic
              </label>
              <label style={{display: 'block', margin: '6px 0', fontSize: '0.85rem'}}>
                <input type="checkbox" style={{marginRight: '8px'}} defaultChecked readOnly /> Keyless
              </label>
            </div>

            <div style={{background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
              <h4 style={{fontSize: '1rem', fontWeight: 700, marginBottom: '12px'}}>🎵 Audio</h4>
              <label style={{display: 'block', margin: '6px 0', fontSize: '0.85rem'}}>
                <input type="checkbox" style={{marginRight: '8px'}} defaultChecked readOnly /> Bose sistēma
              </label>
              <label style={{display: 'block', margin: '6px 0', fontSize: '0.85rem'}}>
                <input type="checkbox" style={{marginRight: '8px'}} defaultChecked readOnly /> Navigācija
              </label>
              <label style={{display: 'block', margin: '6px 0', fontSize: '0.85rem'}}>
                <input type="checkbox" style={{marginRight: '8px'}} readOnly /> Subwoofer
              </label>
            </div>
          </div>

          <div style={{background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', marginBottom: '24px'}}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px'}}>
              <div>
                <strong>Marka:</strong> Audi<br/>
                <strong>Modelis:</strong> Quatro
              </div>
              <div>
                <strong>VIN kods:</strong> Bez VIN koda
              </div>
            </div>
            <h3 style={{fontSize: '1.3rem', marginBottom: '16px'}}>📝 Apraksts</h3>
            <div style={{fontSize: '1rem', lineHeight: 1.6, color: '#4b5563'}}>
              {sludinajums?.description}
            </div>
          </div>

          {/* CENAS DAĻA AR SAZINĀTIES */}
          <div style={{background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '32px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 16px 32px rgba(16,185,129,0.3)'}}>
            <h1 style={{fontSize: '3.5rem', fontWeight: 900, marginBottom: '12px'}}>{sludinajums?.price} €</h1>
            <div style={{display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap'}}>
              <button style={{background: 'rgba(255,255,255,0.95)', color: '#059669', padding: '16px 48px', fontSize: '1.2rem', fontWeight: 800, borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', textTransform: 'uppercase'}}>
                📞 Zvanīt +371 29 *** ***
              </button>
              <button 
                type="button"
                style={{background: 'rgba(59,130,246,0.95)', color: 'white', padding: '16px 32px', fontSize: '1.1rem', fontWeight: 700, borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(59,130,246,0.3)', textTransform: 'uppercase'}}
                onClick={() => setIsChatOpen(true)}
              >
                💬 Sazināties
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULLSCREEN MODALIS */}
      {fullscreenOpen && (
        <div 
          style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
            background: 'rgba(0,0,0,0.95)', zIndex: 9999, display: 'flex', 
            alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out'
          }}
          onClick={closeFullscreen}
        >
          <div style={{position: 'relative', width: '90vw', height: '90vh', display: 'flex'}}>
            <button 
              onClick={(e) => {e.stopPropagation(); prevImageFullscreen();}}
              style={{
                position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.3)', border: 'none', width: '60px', height: '60px',
                borderRadius: '50%', fontSize: '24px', cursor: 'pointer', backdropFilter: 'blur(10px)'
              }}
            >‹</button>
            
            <img 
              src={images[fullscreenIndex]} 
              style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} 
              alt="Fullscreen"
            />
            
            <button 
              onClick={(e) => {e.stopPropagation(); nextImageFullscreen();}}
              style={{
                position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.3)', border: 'none', width: '60px', height: '60px',
                borderRadius: '50%', fontSize: '24px', cursor: 'pointer', backdropFilter: 'blur(10px)'
              }}
            >›</button>
            
            <div style={{
              position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(0,0,0,0.7)', color: 'white', padding: '12px 24px', borderRadius: '30px',
              fontSize: '1.2rem', fontWeight: 'bold', backdropFilter: 'blur(10px)'
            }}>
              {fullscreenIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}

      {/* SAZINĀTIES CHAT MODALIS */}
      {isChatOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.6)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div style={{
            background: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '500px',
            maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
              <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937'}}>
                💬 Sazinies ar pārdevēju
              </h2>
              <button 
                onClick={() => setIsChatOpen(false)}
                style={{fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280'}}
              >
                ×
              </button>
            </div>

            <select 
              value={messageType} 
              onChange={(e) => setMessageType(e.target.value)}
              style={{width: '100%', padding: '12px', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '16px', marginBottom: '16px'}}
            >
              <option value="comment">📝 Komentārs</option>
              <option value="price_offer">💰 Kaulēt cenu</option>
              <option value="request_photos">🖼️ Vēl bildes</option>
              <option value="question">❓ Jautājums</option>
            </select>

            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Raksti ziņu pārdevējam..."
              style={{
                width: '100%', height: '120px', padding: '16px', border: '2px solid #e5e7eb',
                borderRadius: '8px', fontSize: '16px', fontFamily: 'inherit', resize: 'vertical',
                marginBottom: '20px'
              }}
            />

            <div style={{display: 'flex', gap: '12px'}}>
              <button
                type="button"
                onClick={sendMessage}
                disabled={!messageText.trim()}
                style={{
                  flex: 1, background: '#3b82f6', color: 'white', padding: '14px', borderRadius: '8px',
                  border: 'none', fontSize: '16px', fontWeight: '600', cursor: messageText.trim() ? 'pointer' : 'not-allowed',
                  opacity: messageText.trim() ? 1 : 0.6
                }}
              >
                🚀 Nosūtīt ziņu
              </button>
              <button
                type="button"
                onClick={() => setIsChatOpen(false)}
                style={{
                  flex: 1, background: '#6b7280', color: 'white', padding: '14px', borderRadius: '8px',
                  border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer'
                }}
              >
                ❌ Atcelt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
