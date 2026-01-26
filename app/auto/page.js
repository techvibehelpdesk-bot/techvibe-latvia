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
        `${supabaseUrl}/rest/v1/sludinajumi?select=*&category=eq.auto&status=eq.published`,
        {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          }
        }
      );

      if (!response.ok) throw new Error('Supabase kļūda');
      const data = await response.json();
      console.log('🚗 AUTO ieraksti:', data);
      setSludinajumi(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-8 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl font-medium text-gray-600">Ielādē auto sludinājumus...</p>
      </div>
    </main>
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-12 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            🚗 Auto sludinājumi
          </h1>
          <p className="text-xl text-gray-600 font-medium">Atrast labāko auto Latvijā ({sludinajumi.length})</p>
          
          {/* Add button */}
          <Link 
            href="/ievietot-auto"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 mt-8 text-lg"
          >
            ➕ Pievienot sludinājumu
          </Link>
        </div>

        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 text-red-800 p-8 rounded-3xl mb-12 text-center shadow-lg">
            <div className="text-2xl mb-4">⚠️ Kļūda</div>
            {error}. <button onClick={fetchData} className="underline font-bold hover:text-red-700">Mēģināt vēlreiz</button>
          </div>
        )}

        {/* Listings grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
          {sludinajumi.map((s) => {
            // Parse image_urls JSON
            let images = [];
            try {
              if (s.image_urls && s.image_urls !== 'null' && s.image_urls !== '[]') {
                images = JSON.parse(s.image_urls);
              }
            } catch (e) {
              console.warn('Image parse error:', s.image_urls);
            }

            return (
              <Link 
                key={s.id} 
                href={`/auto/${s.id}`}
                className="group bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:shadow-2xl border border-white/50 hover:border-indigo-200 hover:bg-white transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02]"
              >
                {/* Image */}
                <div className="relative w-full h-48 md:h-52 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-indigo-50 group-hover:to-purple-50 mb-6">
                  <img 
                    src={images[0] || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&fit=crop'} 
                    alt={s.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {images.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm text-white px-3 py-1 rounded-2xl text-xs font-bold shadow-lg">
                      +{images.length - 1}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-black text-gray-900 line-clamp-2 leading-tight group-hover:text-indigo-700">
                    {s.title}
                  </h3>
                  
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                    {s.price} €
                  </div>

                  <p className="text-gray-600 text-sm md:text-base line-clamp-3 leading-relaxed">
                    {s.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                      {s.location || 'Rīga'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold">
                        Jauns
                      </span>
                      <span className="text-xs text-gray-400">Pirms 2h</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {sludinajumi.length === 0 && !loading && (
          <div className="text-center py-32">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center">
              <span className="text-4xl">🚗</span>
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-6">Nav auto sludinājumu</h2>
            <Link 
              href="/ievietot-auto"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-5 px-10 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 text-lg"
            >
              ➕ Būt pirmajam
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
