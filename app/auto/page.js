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
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 flex items-center justify-center p-8">
      <div className="animate-pulse">
        <div className="w-20 h-20 border-4 border-indigo-200 rounded-full border-t-indigo-500 mx-auto mb-4"></div>
        <p className="text-lg font-semibold text-gray-600 text-center">Ielādē sludinājumus...</p>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-600 bg-opacity-10 px-8 py-4 rounded-3xl mb-8 border border-indigo-200">
            <span className="text-4xl">🚗</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
              Auto sludinājumi
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 font-semibold mb-10 max-w-2xl mx-auto">
            {sludinajumi.length} atrastie auto Latvijā
          </p>
          <Link href="/ievietot" className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-10 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-lg">
            <span className="group-hover:rotate-12 transition-transform">➕</span>
            Pievienot sludinājumu
          </Link>
        </div>

        {error && (
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-2 border-rose-200 rounded-3xl p-8 mb-12 text-center shadow-xl">
            <div className="text-2xl mb-4">⚠️</div>
            <p className="text-lg text-rose-800 font-medium mb-4">{error}</p>
            <button 
              onClick={fetchData}
              className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-200"
            >
              Mēģināt vēlreiz
            </button>
          </div>
        )}

        {/* Grid */}
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
                className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-indigo-200 hover:-translate-y-2 transition-all duration-500 overflow-hidden relative"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-3 py-1 rounded-2xl text-xs font-bold shadow-lg">
                  Jauns
                </div>

                {/* Image */}
                <div className="w-full h-48 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 mb-6 group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={firstImage}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&fit=crop'}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-bold text-xl mb-3 line-clamp-2 text-gray-900 leading-tight">
                    {s.title}
                  </h3>
                  
                  <div className="text-3xl font-black mb-4 bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                    {s.price} €
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed">
                    {s.description}
                  </p>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-500">
                      {s.location || 'Rīga, LV'}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                      Pirms 2h
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {sludinajumi.length === 0 && !loading && (
          <div className="text-center py-32 px-8">
            <div className="w-32 h-32 mx-auto mb-12 p-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center">
              <span className="text-5xl">🚗</span>
            </div>
            <h2 className="text-4xl font-black text-gray-800 mb-6">Nav atrasti auto sludinājumi</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto">
              Esi pirmais un pievieno savu sludinājumu jau tagad!
            </p>
            <Link 
              href="/ievietot"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-5 px-12 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 text-lg"
            >
              ➕ Pievienot sludinājumu
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
