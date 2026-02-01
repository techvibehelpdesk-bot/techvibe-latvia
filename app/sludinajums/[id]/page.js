'use client';
import { useEffect, useState } from 'react';

export default function SludinajumaLapa({ params }) {
  const [sludinajums, setSludinajums] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    
    // 1. Fetch no sludinajumi tabulas
    fetch(`${supabaseUrl}/rest/v1/sludinajumi?select=*&id=eq.${params.id}`, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
      }
    })
    .then(r => r.json())
    .then(async data => {
      console.log('TABULA DATA:', data);
      if (data[0]) {
        const row = data[0];
        setSludinajums(row);
        
        // 2. Parse + Storage URL
        let imgs = [];
        if (row.images) {
          try {
            const parsed = JSON.parse(row.images);
            imgs = Array.isArray(parsed) ? parsed.map(uuid => 
              `${supabaseUrl}/storage/v1/object/public/sludinajumi/${uuid}`
            ) : [];
          } catch(e) {
            console.log('JSON error:', e);
          }
        }
        console.log('STORAGE IMAGES:', imgs);
        setImages(imgs);
      }
      setLoading(false);
    })
    .catch(e => {
      console.error(e);
      setLoading(false);
    });
  }, [params.id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-4xl animate-spin">⏳</div>
    </div>
  );

  if (!sludinajums) return (
    <div className="min-h-screen flex items-center justify-center text-red-600 text-2xl">
      Sludinājums nav atrasts
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* KREISĀ INFO */}
          <div>
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl sticky top-24">
              <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-gray-900 to-emerald-700 bg-clip-text text-transparent">
                {sludinajums.title}
              </h1>
              <div className="text-6xl font-black text-emerald-600 mb-12 mb-16">
                {sludinajums.price} €
              </div>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-3xl shadow-lg">
                  <div className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center text-3xl text-white font-bold shadow-2xl">📍</div>
                  <span className="text-2xl font-bold">{sludinajums.city}</span>
                </div>
                <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-3xl shadow-lg">
                  <div className="w-16 h-16 bg-blue-500 rounded-3xl flex items-center justify-center text-3xl text-white font-bold shadow-2xl">🏷️</div>
                  <span className="text-2xl font-bold">{sludinajums.category}</span>
                </div>
              </div>

              <button className="w-full h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 uppercase tracking-wide">
                💬 Rakstīt pārdevējam
              </button>
            </div>
          </div>

          {/* LABĀ BILDES + APRKSTS */}
          <div className="space-y-8">
            
            {/* HERO BILDE */}
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-3xl bg-gradient-to-br from-gray-100 to-gray-200 group hover:scale-[1.02] transition-all duration-700 cursor-pointer">
              {images[0] ? (
                <img src={images[0]} alt="Galvenā" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-400 to-red-500 text-white text-4xl font-bold">
                  📱 Nav bildes
                </div>
              )}
            </div>

            {/* GALERIJA */}
            {images.length > 1 && (
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 p-4 -m-6 bg-white/50 rounded-3xl backdrop-blur-sm">
                {images.slice(1).map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group bg-gradient-to-br from-gray-100 to-gray-200">
                    <img src={img} alt={`Bilde ${i}`} className="w-full h-full object-cover group-hover:scale-110" />
                  </div>
                ))}
              </div>
            )}

            {/* APRKSTS */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-2xl">
              <h2 className="text-4xl font-black mb-12 bg-gradient-to-r from-slate-900 to-gray-700 bg-clip-text text-transparent border-b pb-6">
                📝 Apraksts
              </h2>
              <div className="text-xl leading-relaxed whitespace-pre-wrap text-gray-800 prose prose-lg max-w-none">
                {sludinajums.description || 'Apraksts tiks pievienots.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
