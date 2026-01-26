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
      
      // Filter tikai auto + published
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

  if (loading) return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center p-8">
      <div className="text-center animate-pulse">
        <div className="text-8xl mb-6">🚗</div>
        <p className="text-2xl font-bold text-white drop-shadow-lg">Ielādē auto sludinājumus...</p>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-400 via-yellow-300 to-orange-400 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Header - centrēts kā moto */}
        <div className="text-center mb-20">
          <div className="text-8xl animate-bounce mb-12 drop-shadow-2xl">🚗</div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 drop-shadow-2xl bg-gradient-to-r from-gray-800 to-yellow-900 bg-clip-text text-transparent">
            Auto sludinājumi
          </h1>
          <p className="text-3xl text-white/90 font-bold drop-shadow-xl">
            {sludinajumi.length === 0 
              ? '0 sludinājumu Rīgā' 
              : `${sludinajumi.length} sludinājumu Rīgā`
            }
          </p>
        </div>

        {error && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 mb-12 text-center shadow-2xl mx-auto max-w-2xl border-4 border-yellow-200">
            <div className="text-4xl mb-6">⚠️</div>
            <p className="text-xl text-yellow-900 font-bold mb-6">{error}</p>
            <button 
              onClick={fetchData}
              className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg"
            >
              Mēģināt vēlreiz
            </button>
          </div>
        )}

        {/* Grid - pielāgots dzeltenajam fonam */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl border-4 border-white/50 hover:border-yellow-200 hover:-translate-y-4 transition-all duration-500 overflow-hidden relative"
              >
                {/* Badge */}
                <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-xl">
                  Jauns
                </div>

                {/* Image */}
                <div className="w-full h-52 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-yellow-50 mb-8 group-hover:scale-105 transition-transform duration-700 shadow-2xl">
                  <img 
                    src={firstImage}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 shadow-xl"
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&fit=crop'}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-black text-2xl mb-4 line-clamp-2 text-gray-900 leading-tight drop-shadow-sm">
                    {s.title}
                  </h3>
                  
                  <div className="text-4xl font-black mb-6 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
                    {s.price} €
                  </div>

                  <p className="text-gray-700 text-base line-clamp-3 mb-8 leading-relaxed drop-shadow-sm">
                    {s.description}
                  </p>

                  <div className="flex justify-between items-center pt-6 border-t-4 border-yellow-100">
                    <span className="text-lg font-bold text-gray-800">
                      {s.location || 'Rīga, LV'}
                    </span>
                    <span className="text-sm text-yellow-600 bg-yellow-100 px-4 py-2 rounded-xl font-bold shadow-md">
                      Pirms 2h
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Tukšā stāvokļa centrēts skats kā moto */}
        {sludinajumi.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-32 px-8 text-center">
            <div className="text-9xl mb-12 animate-pulse drop-shadow-2xl">🚗</div>
            <h2 className="text-5xl font-black text-white mb-8 drop-shadow-2xl">
              Nav atrasti auto sludinājumi
            </h2>
            <p className="text-2xl text-white/90 mb-12 font-bold drop-shadow-xl max-w-2xl mx-auto">
              Esi pirmais un pievieno savu sludinājumu Rīgas tirgū!
            </p>
            <Link 
              href="/ievietot"
              className="flex items-center gap-4 bg-white text-yellow-600 font-black py-8 px-16 rounded-3xl shadow-3xl hover:shadow-4xl hover:-translate-y-4 transition-all duration-500 text-2xl drop-shadow-2xl"
            >
              ➕ Pievienot sludinājumu
            </Link>
          </div>
        )}

        {/* Poga zem grid */}
        <div className="text-center mt-20">
          <Link 
            href="/ievietot"
            className="inline-flex items-center gap-3 bg-white text-yellow-600 font-black py-6 px-12 rounded-3xl shadow-3xl hover:shadow-4xl hover:-translate-y-3 transition-all duration-300 text-xl drop-shadow-2xl"
          >
            ➕ Pievienot sludinājumu
          </Link>
        </div>
      </div>
    </main>
  );
}
