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
        `${supabaseUrl}/rest/v1/sludinajumi?select=*&category=ilike.*auto*&status=eq.published`,
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
      setSludinajumi(data);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="text-center py-20">Ielādē auto sludinājumus...</div>
    </main>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800 flex items-center justify-center gap-4">
          🚗 Auto sludinājumi ({sludinajumi.length})
        </h1>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl mb-8 text-center">
            Kļūda: {error}. <button onClick={fetchData} className="underline">Mēģināt vēlreiz</button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sludinajumi.map((s) => (
            <Link 
              key={s.id} 
              href={`/auto/${s.id}`}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 hover:-translate-y-2 transition-all group border border-gray-100"
            >
              <div className="relative w-full h-48 bg-gray-200 rounded-xl overflow-hidden group-hover:scale-105 transition-transform mb-4">
                <img 
                  src={s.image_urls?.[0] || '/placeholder-auto.jpg'} 
                  alt={s.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { e.target.src = '/placeholder-auto.jpg'; }}
                />
                {s.image_urls?.length > 1 && (
                  <span className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 text-xs rounded-full">
                    +{s.image_urls.length - 1}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{s.title}</h3>
              <p className="text-2xl font-bold text-green-600 mb-4">{s.price} €</p>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{s.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Gaida apstiprinājumu</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  Jauns
                </span>
              </div>
            </Link>
          ))}
        </div>

        {sludinajumi.length === 0 && !loading && (
          <div className="text-center mt-20 p-12 bg-yellow-50 rounded-2xl">
            <p className="text-2xl mb-4 text-gray-700">Nav auto sludinājumu</p>
            <Link 
              href="/ievietot" 
              className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors inline-block"
            >
              ➕ Pievienot pirmo sludinājumu
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
