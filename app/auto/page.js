'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AutoPage() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tieši tava DB: sludinajumi tabula
    fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/sludinajumi?select=*&status=eq.published&category=ilike.*auto*`,
      {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      })
      .then(res => res.json())
      .then(data => {
        console.log('🚗 AUTO dati no Supabase:', data);
        setAutos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Auto fetch kļūda:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Ielādē auto sludinājumus...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            🚗 Auto sludinājumi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Atrast labāko auto Latvijā. Privātie un komerc sludinājumi.
          </p>
        </div>

        {autos.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-32 h-32 mx-auto mb-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl">🚗</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Vēl nav auto sludinājumu</h2>
            <Link 
              href="/pievienot-auto" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              ➕ Pievienot pirmo auto
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {autos.map((auto, index) => (
              <Link 
                key={auto.id || index}
                href={`/auto/${auto.id || index}`}
                className="group block bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden hover:border-blue-200"
              >
                <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img 
                    src={auto.image_public_urls?.[0] || '/no-image.jpg'} 
                    alt={auto.nosaukums}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/placeholder-auto.jpg';
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 line-clamp-2 leading-tight">
                    {auto.nosaukums || 'Auto bez nosaukuma'}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {auto.apraksts || 'Detalizēts apraksts'}
                  </p>
                  <div className="flex items-baseline justify-between mb-6">
                    <span className="text-3xl font-black text-green-600">
                      {auto.cena ? `${auto.cena.toLocaleString()} €` : 'Cena vienošanās'}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
                      Jauns
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    📍 Rīga
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    {auto.datums ? new Date(auto.datums).toLocaleDateString('lv') : 'Šodien'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
