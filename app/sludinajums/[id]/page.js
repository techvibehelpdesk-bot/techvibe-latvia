'use client'; // CLIENT KOMPONENTE galerijai
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function SludinajumaLapa({ params, searchParams }) {
  const [sludinajums, setSludinajums] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);

  // DATU IELĀDE
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
        // Reset uz pirmo attēlu
        setCurrentImage(0);
      });
  }, [params.id]);

  // AUTO SLIDE katras 4s - tikai kad images gatavs
  useEffect(() => {
    if (images.length <= 1) return; // Nav ko slīdēt

    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!sludinajums) return <div style={{padding: '100px', textAlign: 'center'}}>Loading...</div>;

  return (
    {/* SLIDING HERO - MAZĀKS UN CONTAIN */}
<div style={{position: 'relative', height: '280px', marginBottom: '32px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', background: '#f0f0f0'}}>
  <img 
    src={images[currentImage]} 
    style={{width: '100%', height: '100%', objectFit: 'contain', maxWidth: '100%', maxHeight: '100%', transition: 'opacity 0.8s ease-in-out'}} 
    alt="Hero"
  />
  <div style={{position: 'absolute', bottom: '16px', left: '16px', right: '16px', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '12px', borderRadius: '10px', fontSize: '0.9rem'}}>
    Foto {currentImage + 1} / {images.length}
  </div>
</div>

        </div>

        {/* 3 KOLONNAS CHECKBOXES */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px'}}>
          
          {/* Dzinējs */}
          <div style={{background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)'}}>
            <h3 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px'}}>Dzinējs</h3>
            <div style={{fontSize: '1.6rem', fontWeight: 700, marginBottom: '12px'}}>2.5 Dzinējs</div>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '10px'}} defaultChecked readOnly /> Audi Quattro
            </label>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '10px'}} defaultChecked readOnly /> 256 ZS
            </label>
          </div>

          {/* Aprīkojums */}
          <div style={{background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)'}}>
            <h3 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px'}}>Aprīkojums</h3>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '10px'}} defaultChecked readOnly /> Klimata kontrole
            </label>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '10px'}} defaultChecked readOnly /> Parktronic
            </label>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '10px'}} defaultChecked readOnly /> Keyless
            </label>
          </div>

          {/* Audio */}
          <div style={{background: 'white', padding: '28px', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.08)'}}>
            <h3 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px'}}>Audio/Multimediji</h3>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '10px'}} defaultChecked readOnly /> Bose skaņas sistēma
            </label>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '10px'}} defaultChecked readOnly /> Navigācija
            </label>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '10px'}} readOnly /> Subwoofer
            </label>
          </div>
        </div>

        {/* PAPILDU INFO GRID */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px'}}>
          <div style={{background: 'white', padding: '24px', borderRadius: '12px'}}>
            <strong>Marka:</strong> Audi<br/>
            <strong>Modelis:</strong> Quatro
          </div>
          <div style={{background: 'white', padding: '24px', borderRadius: '12px'}}>
            <strong>VIN kods:</strong> Bez VIN koda
          </div>
        </div>

        {/* GALERIJA */}
        <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', marginBottom: '32px'}}>
          <h2 style={{fontSize: '1.8rem', marginBottom: '24px'}}>🖼️ Foto galerija</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px'}}>
            {images.slice(1).map((img, i) => (
              <img 
                key={i}
                src={img} 
                style={{width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}} 
                alt={`Foto ${i+2}`}
                onClick={() => setCurrentImage(i+1)}
              />
            ))}
          </div>
        </div>

        {/* APRKSTS */}
        <div style={{background: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)'}}>
          <h2 style={{fontSize: '1.8rem', marginBottom: '24px'}}>📝 Pilns apraksts</h2>
          <div style={{fontSize: '1.1rem', lineHeight: 1.6, color: '#4b5563', whiteSpace: 'pre-wrap'}}>
            {sludinajums?.description}
          </div>
        </div>

        {/* CENA BEIGĀS */}
        <div style={{background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', padding: '48px', borderRadius: '20px', textAlign: 'center', marginTop: '48px', boxShadow: '0 20px 40px rgba(16,185,129,0.3)'}}>
          <h1 style={{fontSize: '4.5rem', fontWeight: 900, marginBottom: '16px'}}>{sludinajums?.price} €</h1>
          <button style={{background: 'rgba(255,255,255,0.95)', color: '#059669', padding: '24px 64px', fontSize: '1.5rem', fontWeight: 800, borderRadius: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 12px 32px rgba(0,0,0,0.3)', textTransform: 'uppercase', letterSpacing: '1px'}}>
            📞 Zvanīt +371 29 *** ***
          </button>
        </div>
      </div>
    </div>
  );
}
