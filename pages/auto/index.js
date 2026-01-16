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
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      // Bez stingra filtra - ņem visus, client filtrē auto
      const response = await fetch(
        `${supabaseUrl}/rest/v1/sludinajumi?select=*&status=eq.published`,
        {
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'apikey': supabaseKey,
          },
        }
      );
      
      if (!response.ok) {
        const err = await response.text();
        throw new Error(`Error ${response.status}: ${err}`);
      }
      
      const data = await response.json();
      console.log('✅ TABULA sludinajumi OK:', data.length, 'ieraksti');
      
      // Client-side auto filtrs (ignore case)
      const autoData = data.filter(item => 
        item.category && item.category.toLowerCase().includes('auto')
      );
      
      console.log('🚗 AUTO ieraksti:', autoData.length);
      setSludinajumi(autoData);
    } catch (err) {
      console.error('❌ KĻŪDA:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-20 text-center">Ielādē...</div>;
  if (error) return <div className="p-20 text-center text-red-500">{error}</div>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">🚗 Auto sludinājumi</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sludinajumi.map((s) => (
          <Link key={s.id} href={`/auto/${s.id}`} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 hover:-translate-y-2 transition-all border">
            <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
              {s.thumbnail_url ? (
                <img 
                  src={s.thumbnail_url} 
                  alt={s.title} 
                  className="w-full h-full object-cover rounded-xl"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <span className="text-gray-400 text-lg">Nav bildes</span>
              )}
            </div>
            <h3 className="text-xl font-bold mb-2 line-clamp-2">{s.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{s.description}</p>
            <div className="flex justify-between items-center mb-2">
              <span className="text-2xl font-bold text-green-600">€{s.price?.toLocaleString()}</span>
              <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {s.city}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              {s.status} • {new Date(s.created_at).toLocaleDateString('lv-LV')}
            </p>
          </Link>
        ))}
      </div>
      
      {sludinajumi.length === 0 && !loading && (
        <div className="text-center mt-12 p-12 bg-yellow-50 rounded-2xl border-2 border-dashed border-yellow-200">
          <p className="text-2xl mb-4 text-gray-700">Nav auto sludinājumu</p>
          <Link 
            href="/ievietot" 
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors inline-block"
          >
            ➕ Pievienot pirmo sludinājumu
          </Link>
        </div>
      )}
    </main>
  );
}
