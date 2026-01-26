'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AutoPage() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      setError(null);
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/rest/v1/sludinajumi?select=*`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        }
      );

      if (!response.ok) throw new Error('Fetch kļūda');
      const data = await response.json();
      console.log('🚗 AUTO ieraksti:', data);
      
      const filtered = data.filter(s => 
        s.category?.toLowerCase().includes('auto') && 
        s.status === 'published'
      );
      setSludinajumi(filtered);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-orange-400 to-amber-600 flex items-center justify-center p-8 animate-gradient-x">
        <div className="text-center">
          <div className="text-[10rem] animate-spin-slow mb-8 drop-shadow-4xl">🚗</div>
          <p className="text-4xl font-black text-white/95 drop-shadow-2xl tracking-wider">Ielādē...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-300 to-amber-500 animate-gradient-shift p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        
        {/* GALVENĀ HEADER - centrēts kā moto */}
        <div className="text-center py-24 mb-24">
          <div className="text-[12rem] leading-none mb-12 animate-float drop-shadow-[0_35px_60px_rgba(0,0,0,0.3)] mx-auto w-fit">🚗</div>
          <div className="bg-white/20 backdrop-blur-xl rounded-3xl px-12 py-8 inline-block border border-white/40 shadow-2xl mb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-gray-900 via-amber-900 to-yellow-800 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
              AUTO
            </h1>
            <p className="text-3xl md:text-4xl font-bold text-white/95 drop-shadow-xl mt-4 tracking-wide">
              {sludinajumi.length || '0'} sludinājumu Rīgā
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-12 mb-16 shadow-3xl border-4 border-yellow-300/50 max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-8 animate-bounce">⚠️</div>
            <p className="text-2xl font-bold text-yellow-900 mb-8">{error}</p>
            <button 
              onClick={fetchData}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-xl font-black py-6 px-12 rounded-3xl shadow-3xl hover:shadow-4xl hover:scale-105 transition-all duration-300 text-white border-4 border-white/50"
            >
              🔄 Ielādēt vēlreiz
            </button>
          </div>
        )}

        {/* SLUDINĀJUMU GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {sludinajumi.map((s) => {
            let firstImage = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&fit=crop&crop=entropy';
            try {
              if (s.image_urls && s.image_urls !== 'null') {
                const images = JSON.parse(s.image_urls);
                firstImage = images[0] || firstImage;
              }
            } catch (e) {
              console.warn('Image parse error:', s.image_urls);
            }

            return (
              <Link 
                key={s.id}
                href={`/auto/${s.id}`}
                className="group relative bg-white/95 backdrop-blur-xl rounded-4xl p-10 shadow-3xl hover:shadow-[0_35px_100px_rgba(0,0,0,0.3)] border-4 border-white/60 hover:border-yellow-300/70 overflow-hidden hover:-translate-y-6 transition-all duration-700 hover:rotate-1"
              >
                {/* GLĀZES EFEKTS */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-4xl"></div>
                
                {/* BADŽS */}
                <div className="absolute top-6 right-6 z-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-3xl text-lg font-black shadow-2xl backdrop-blur-sm border-2 border-white/30 transform rotate-3">
                  🔥 JAUNS
                </div>

                {/* ATTĒLS - liels */}
                <div className="relative w-full h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-50 to-yellow-50 shadow-2xl mb-10 group-hover:scale-110 transition-all duration-1000">
                  <img 
                    src={firstImage}
                    alt={s.title}
                    className="w-full h-full object-cover shadow-3xl group-hover:brightness-110 transition-all duration-1000"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>

                {/* SATURS */}
                <div className="relative z-10">
                  <h3 className="font-black text-3xl mb-6 line-clamp-2 text-gray-900 leading-tight drop-shadow-lg group-hover:text-yellow-900 transition-colors">
                    {s.title}
                  </h3>
                  
                  <div className="text-5xl font-black mb-8 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-2xl">
                    {s.price || 'Saruna'} €
                  </div>

                  <p className="text-xl text-gray-700 mb-10 line-clamp-4 leading-relaxed drop-shadow-sm text-balance">
                    {s.description}
                  </p>

                  <div className="flex justify-between items-center pt-8 border-t-4 border-yellow-200/50">
                    <div className="text-2xl font-black text-gray-900 drop-shadow-md">
                      {s.location || 'Rīga'}
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-3xl font-black text-xl shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300">
                      Skatīt →
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* TUKŠS STĀVOKLIS - centrēts kā moto */}
        {sludinajumi.length === 0 && !loading && (
          <div className="text-center py-48">
            <div className="text-[16rem] leading-none mb-16 animate-pulse drop-shadow-[0_50px_100px_rgba(0,0,0,0.4)] mx-auto w-fit">🚗</div>
            <div className="bg-white/30 backdrop-blur-2xl rounded-4xl px-20 py-16 inline-block border-4 border-white/50 shadow-4xl mb-12">
              <h2 className="text-6xl font-black text-white mb-8 drop-shadow-3xl tracking-widest">
                NAV SLUDINĀJUMU
              </h2>
              <p className="text-4xl text-white/90 font-bold drop-shadow-2xl mb-16">
                Būsi PIRMAIS Rīgas auto tirgū!
              </p>
            </div>
            <Link 
              href="/ievietot"
              className="inline-flex items-center gap-6 bg-white/95 text-yellow-900 font-black py-12 px-24 rounded-4xl shadow-4xl hover:shadow-[0_50px_120px_rgba(0,0,0,0.3)] hover:-translate-y-8 transition-all duration-700 text-4xl backdrop-blur-xl border-4 border-white/60 hover:scale-105"
            >
              <span className="text-5xl animate-bounce">➕</span>
              Pievienot AUTO tagad
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
