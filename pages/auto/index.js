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
      console.log('🚀 DEBUG: Sākam fetch auto sludinājumus...');

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      console.log('🔑 DEBUG: SUPABASE URL', supabaseUrl ? 'OK' : 'TRŪKST');
      console.log('🔑 DEBUG: SUPABASE KEY', supabaseKey ? 'OK (garums ' + supabaseKey.length + ')' : 'TRŪKST');

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('❌ TRŪKST NEXT_PUBLIC_SUPABASE_URL vai ANON_KEY Vercel env!');
      }

      const response = await fetch(
        `${supabaseUrl}/rest/v1/sludinajumi?select=*&status=eq.published&category=ilike.%25auto%25`,
        {
          method: 'GET',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('📡 DEBUG: Response status:', response.status);
      console.log('📡 DEBUG: Response OK?', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ HTTP KĻŪDA:', response.status, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('✅ DEBUG: Iegūti ieraksti:', data.length);
      console.log('📋 DEBUG: Pirmais ieraksts:', data[0] || 'TUKŠS');

      // Filtrē tikai auto (papildu drošībai)
      const autoData = data.filter(s => 
        s.category && (
          s.category.toLowerCase().includes('auto') ||
          s.category.toLowerCase() === 'auto'
        )
      );

      console.log('🚗 DEBUG: Pēc auto filtra:', autoData.length);
      setSludinajumi(autoData);
    } catch (err) {
      console.error('💥 PILNA KĻŪDA:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Ielādē auto sludinājumus...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 rounded-3xl shadow-2xl">
          🚗 Auto sludinājumi ({sludinajumi.length})
        </h1>

        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-red-800 mb-4">❌ Kļūda ielādējot sludinājumus</h2>
            <pre className="bg-red-100 p-4 rounded-xl text-red-900 font-mono text-sm overflow-auto mb-6">
              {error}
            </pre>
            <button
              onClick={fetchData}
              className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition-colors inline-block"
            >
              🔄 Mēģināt vēlreiz
            </button>
            <p className="text-sm text-red-700 mt-4">
              Pārbaudi F12 Console pilnu debug info!
            </p>
          </div>
        ) : sludinajumi.length === 0 ? (
          <div className="text-center py-20 max-w-2xl mx-auto">
            <div className="w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl">🚗</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Vēl nav auto sludinājumu</h2>
            <p className="text-xl text-gray-600 mb-8">Esi pirmais – pievieno savu auto!</p>
            <Link
              href="/ievietot"
              className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl inline-block"
            >
              ➕ Pievienot sludinājumu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sludinajumi.map((s) => (
              <Link
                key={s.id}
                href={`/auto/${s.id}`}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
              >
                <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100">
                  {s.thumbnail_url ? (
                    <img
                      src={s.thumbnail_url}
                      alt={s.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="text-4xl opacity-50 group-hover:opacity-75 transition-all">
                    🚗
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {s.title || 'Bez nosaukuma'}
                  </h3>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      €{s.price ? Number(s.price).toLocaleString() : 'N/A'}
                    </span>
                    {s.city && (
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                        {s.city}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {s.description || s.apraksts || 'Nav apraksta...'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {new Date(s.created_at).toLocaleDateString('lv-LV')}
                    </span>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {sludinajumi.length > 0 && (
          <div className="text-center mt-16">
            <Link
              href="/ievietot"
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-xl inline-block"
            >
              ➕ Pievienot savu auto
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
