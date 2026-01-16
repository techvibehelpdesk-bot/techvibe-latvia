'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AutoPage() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/sludinajumi?select=*&status=eq.published&category=ilike.*auto*`,
      {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
      })
      .then(res => res.json())
      .then(data => {
        setAutos(data);
        setLoading(false);
        console.log('🚗 AUTO ieraksti:', data.length);
      })
      .catch(err => {
        console.error('Supabase error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Ielādē...</p>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🚗 Auto sludinājumi
        </h1>
        {autos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl mb-8">Nav auto sludinājumu</p>
            <Link href="/add-auto" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 inline-block">
              ➕ Pievienot pirmo
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {autos.map((auto, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden">
                <img 
                  src={auto.image_public_urls?.[0] || '/placeholder-auto.jpg'} 
                  alt={auto.nosaukums}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{auto.nosaukums}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{auto.apraksts}</p>
                  <div className="text-3xl font-bold text-green-600 mb-4">{auto.cena} €</div>
                  <Link href={`/auto/${auto.id}`} className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-blue-700 block text-center transition-colors">
                    Skatīt sludinājumu →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
