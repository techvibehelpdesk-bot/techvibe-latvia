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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-8">
        <div className="text-center animate-pulse">
          <div className="w-24 h-24 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl mx-auto mb-6 shadow-xl"></div>
          <p className="text-xl font-semibold text-gray-600">Ielādē sludinājumus...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER kā home, bet Auto */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-indigo-500 to-purple-600 bg-opacity-10 px-12 py-6 rounded-3xl mb-12 border border-indigo-200 shadow-2xl backdrop-blur-sm">
            <span className="text-5xl">🚗</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent tracking-tight">
              Auto sludinājumi
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-gray-600 font-semibold mb-12 max-w-3xl mx-auto">
            {sludinajumi.length} atrastie auto Rīgā un Latvijā
          </p>
          <Link 
            href="/ievietot" 
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-5 px-12 rounded-3xl shadow-3xl hover:shadow-4xl transform hover:scale-105 transition-all duration-400 text-xl border border-emerald-400/30 backdrop-blur-sm"
          >
            <span className="group-hover:rotate-12 transition-transform duration-300">➕</span>
            Pievienot sludinājumu
          </Link>
        </div>

        {error && (
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200 rounded-3xl p-12 mb-16 text-center shadow-2xl backdrop-blur-sm">
            <div className="text-4xl mb-6">⚠️</div>
            <p className="text-xl text-rose-800 font-semibold mb-8">{error}</p>
            <button 
              onClick={fetchData}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Mēģināt vēlreiz
            </button>
          </div>
        )}

        {/* GRID - PRECĪZI kā screenshot (4 kolonnas lg+, white cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {sludinajumi.map((s) => {
            let firstImage = '/placeholder-car.jpg';
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
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-3xl hover:-translate-y-3 border border-gray-100 hover:border-indigo-300 transition-all duration-500 overflow-hidden backdrop-blur-sm hover:bg-white/95"
              >
                {/* Badge top-right */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg z-10">
                  Jauns
                </div>

                {/* Image - kā screenshot */}
                <div className="w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-8 shadow-2xl group-hover:shadow-3xl transition-all duration-700">
                  <img 
                    src={firstImage}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 hover:brightness-105"
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&fit=crop'}
                  />
                </div>

                {/* Title */}
                <h3 className="font-bold text-2xl mb-4 line-clamp-2 text-gray-900 leading-tight group-hover:text-indigo-900 transition-colors">
                  {s.title}
                </h3>
                
                {/* Price - liels bold kā screenshot */}
                <div className="text-4xl font-black mb-6 text-emerald-600 leading-none drop-shadow-sm">
                  {s.price}€
                </div>

                {/* Location */}
                <div className="text-lg text-gray-600 mb-6 font-medium">
                  {s.location || 'Rīga, LV'}
                </div>

                {/* CTA pogas kā screenshot */}
                <div className="flex gap-3 pt-6 border-t border-gray-100">
                  <Link 
                    href={`/auto/${s.id}`}
                    className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl text-center text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
                  >
                    Skatīt
                  </Link>
                  <Link 
                    href={`tel:+371${s.phone || '20000000'}`}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-2xl text-center text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-105"
                  >
                    Zvanīt
                  </Link>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tukšs stāvoklis */}
        {sludinajumi.length === 0 && !loading && (
          <div className="text-center py-48">
            <div className="w-40 h-40 mx-auto mb-16 p-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-2xl">
              <span className="text-6xl">🚗</span>
            </div>
            <h2 className="text-5xl font-black text-gray-800 mb-8">Nav atrasti auto sludinājumi</h2>
            <p className="text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Būsi pirmais – pievieno savu auto sludinājumu tagad!
            </p>
            <Link 
              href="/ievietot"
              className="inline-flex items-center gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-6 px-16 rounded-3xl shadow-3xl hover:shadow-4xl transform hover:scale-105 transition-all duration-400 text-xl"
            >
              ➕ Pievienot sludinājumu
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
