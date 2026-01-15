'use client';  // Client component lai env lasītu

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function AutoPage() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAuto() {
      try {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        
        const { data, error: fetchError } = await supabase
          .from('sludinajumi')
          .select('*, image_urls')
          .eq('status', 'publicēts')
          .ilike('category', '%auto%')  // MAINICI UZ TAVU KOLONNU!
          .order('created_at', { ascending: false })
          .limit(20);

        console.log('🚗 AUTO DEBUG:', { count: data?.length || 0, error: fetchError });

        if (fetchError) throw fetchError;
        setSludinajumi(data || []);
      } catch (err) {
        console.error('AUTO KĻŪDA:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAuto();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full" />
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🚗 Auto un Moto
        </h1>
        <Link 
          href="/ievietot?cat=auto"
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-2xl font-bold hover:shadow-xl transform hover:scale-105 transition-all"
        >
          ➕ Ievietot
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-2xl mb-8">
          ⚠️ Kļūda: {error}
        </div>
      )}

      {sludinajumi.length === 0 ? (
        <div className="text-center py-24 border-2 border-dashed border-gray-300 rounded-3xl bg-white/50 backdrop-blur-sm">
          <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center shadow-lg">
            <span className="text-4xl">🚗</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Vēl nav sludinājumu</h2>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">Pievieno pirmo auto sludinājumu un kļūsti populārs!</p>
          <Link 
            href="/ievietot?cat=auto" 
            className="bg-purple-500 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-purple-600 shadow-lg"
          >
            Ievietot tagad
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sludinajumi.map((s) => (
            <Link 
              key={s.id} 
              href={`/sludinajums/${s.id}`}
              className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-white/50 hover:border-blue-200 overflow-hidden"
            >
              <div className="h-64 overflow-hidden relative">
                {s.image_urls?.[0] ? (
                  <img 
                    src={s.image_urls[0]} 
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 via-blue-50 to-indigo-100 flex items-center justify-center">
                    <span className="text-5xl opacity-75">🚗</span>
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="font-black text-2xl mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {s.title || s.nosaukums}
                </h3>
                <div className="text-3xl font-black bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent mb-6">
                  €{Number(s.price || s.cena).toLocaleString('lv-LV')}
                </div>
                <p className="text-gray-600 leading-relaxed line-clamp-4 mb-6">
                  {s.description || s.apraksts}
                </p>
                <div className="flex items-center justify-between pt-6 border-t-2 border-gray-100">
                  <span className="text-lg font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">
                    📞 {s.phone || s.kontakts}
                  </span>
                  <span className="text-sm text-gray-400 font-medium">
                    Jauns
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
