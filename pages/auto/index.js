'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AutoPage() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        const response = await fetch(
          `${supabaseUrl}/rest/v1/sludinajumi?select=id,title,description,price,category,city,status,created_at,image_urls&category=eq.auto&status=eq.gaida&order=created_at.desc`,
          {
            headers: {
              'Authorization': `Bearer ${supabaseKey}`,
              'apikey': supabaseKey,
            },
            cache: 'no-store',
          }
        );
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setSludinajumi(data);
        console.log('✅ AUTO SLUDINĀJUMI:', data.length); // F12 redzēs BMW skaitu!
      } catch (err) {
        console.error('AUTO FETCH KĻŪDA:', err);
        setError('Neizdevās ielādēt sludinājumus');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Ielādē auto sludinājumus...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            🚗 Auto sludinājumi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">TechVibe – ātrākais auto tirdzniecības portāls Latvijā</p>
        </div>
        
        {error ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-3xl flex items-center justify-center">
              <span className="text-4xl text-red-500">⚠️</span>
            </div>
            <p className="text-2xl text-red-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              🔄 Pārlādēt lapu
            </button>
          </div>
        ) : sludinajumi.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center shadow-xl">
              <span className="text-5xl">🚗</span>
            </div>
            <p className="text-3xl text-gray-500 mb-6 font-semibold">Pašlaik nav auto sludinājumu</p>
            <Link 
              href="/ievietot" 
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-5 rounded-3xl text-2xl font-black transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 text-shadow-sm"
            >
              ➕ Pievienot pirmo auto!
            </Link>
          </div>
        ) : (
          <>
            <p className="text-center text-2xl font-semibold text-gray-700 mb-8">
              Atrasti {sludinajumi.length} auto sludinājumu
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
              {sludinajumi.map((s) => (
                <Link 
                  key={s.id} 
                  href={`/sludinajums/${s.id}`} 
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl overflow-hidden transition-all duration-500 hover:-translate-y-4 hover:scale-[1.03] border border-white/50 hover:border-blue-200/50"
                >
                  <div className="h-64 overflow-hidden relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                    {s.image_urls && s.image_urls.length > 0 ? (
                      <img 
                        src={s.image_urls[0]} 
                        alt={s.title || 'Auto'} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 flex items-center justify-center">
                        <span className="text-6xl text-white/90 drop-shadow-2xl animate-pulse">🚗</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors leading-tight">
                      {s.title || 'Bez nosaukuma'}
                    </h3>
                    <p className="text-gray-600 text-base mb-6 line-clamp-3 leading-relaxed">
                      {s.description || 'Apmeklē sludinājumu pilnai informācijai!'}
                    </p>
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-4xl font-black bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent drop-shadow-lg">
                        €{s.price ? parseInt(s.price).toLocaleString('lv-LV') : 'Vienojoties'}
                      </span>
                      <span className="px-6 py-3 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-blue-800 rounded-2xl text-lg font-bold shadow-lg border border-blue-200">
                        {s.city || 'Rīga'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                      <span className="font-medium">
                        {s.created_at ? new Date(s.created_at).toLocaleDateString('lv-LV', {
                          weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
                        }) : 'Tikko pievienots'}
                      </span>
                      <span className={`px-4 py-2 text-xs font-bold rounded-full ${
                        s.status === 'gaida' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {s.status === 'gaida' ? '⏳ Gaida' : '✅ Publicēts'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
