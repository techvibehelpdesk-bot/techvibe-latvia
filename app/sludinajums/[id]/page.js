'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function SludinajumaLapa({ params, searchParams }) {
  const [sludinajums, setSludinajums] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

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

  if (!sludinajums) return <div style={{padding: '100px', textAlign: 'center'}}>Loading...</div>;

  return (
    <div style={{background: '#f9fafb', padding: '24px 0', minHeight: '100vh'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px'}}>
        
        {/* KREISĀ - ATTĒLI */}
        <div>
          {/* HERO SLIDER - Bez strīpas virsmā */}
          <div style={{position: 'relative', height: '280px', marginBottom: '8px', borderRadius: '12px 12px 0 0', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', background: '#f0f0f0'}}>
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

          {/* GALERIJA MINI - KLIKŠĶIS STRĀDĀ */}
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

        {/* LABĀ - SATURS (nepārmainīts) */}
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

          <div style={{background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '32px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 16px 32px rgba(16,185,129,0.3)'}}>
            <h1 style={{fontSize: '3.5rem', fontWeight: 900, marginBottom: '12px'}}>{sludinajums?.price} €</h1>
            <button style={{background: 'rgba(255,255,255,0.95)', color: '#059669', padding: '16px 48px', fontSize: '1.2rem', fontWeight: 800, borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', textTransform: 'uppercase'}}>
              📞 Zvanīt +371 29 *** ***
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
