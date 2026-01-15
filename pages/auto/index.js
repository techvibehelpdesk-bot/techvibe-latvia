'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default function AutoPage() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAuto() {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);
      
      // BEZ kļūdu kolonnu – tikai drošās!
      const { data } = await supabase
        .from('sludinajumi')
        .select('id, title, description, category, price, phone, created_at')
        .eq('category', 'auto')  // ✅ TAVA kolonna!
        .order('created_at', { ascending: false });

      console.log('🚗 AUTO RAKSTI:', data);
      
      setSludinajumi(data || []);
      setLoading(false);
    }
    fetchAuto();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent"></div></div>;

  return (
    <main className="max-w-7xl mx-auto p-6 py-12">
      <header className="mb-12 flex flex-wrap gap-4 items-center justify-between">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
          🚗 Auto ({sludinajumi.length})
        </h1>
        <Link href="/ievietot?category=auto" className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
          ➕ Pievienot auto
        </Link>
      </header>

      {sludinajumi.length === 0 ? (
        <div className="text-center py-32 border-2 border-dashed border-gray-300 rounded-3xl bg-gradient-to-b from-white/50 to-blue-50/50 backdrop-blur-sm">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-4xl">🚗</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Nav auto sludinājumu</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">Pievieno pirmo sludinājumu un kļūsti par līderi auto kategorijā!</p>
          <Link href="/ievietot?category=auto" className="px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
            Ievietot tagad
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {sludinajumi.map((s) => (
            <Link 
              key={s.id}
              href={`/sludinajums/${s.id}`}
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl border border-white/50 hover:border-indigo-200 p-2 transition-all duration-500 hover:-translate-y-2 hover:rotate-1"
            >
              {/* Placeholder bilde */}
              <div className="h-56 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <span className="text-6xl opacity-75 drop-shadow-lg">🚗</span>
              </div>
              
              <div className="p-6 pt-0">
                <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {s.title}
                </h3>
                
                {s.price ? (
                  <div className="text-3xl font-black bg-gradient-to-r from-emerald-500 to-green-600 -mx-6 mb-4 p-3 bg-clip-text text-transparent drop-shadow-lg">
                    €{Number(s.price).toLocaleString('lv-LV')}
                  </div>
                ) : (
                  <div className="text-2xl font-bold text-gray-500 mb-4 italic">Cena vienošanās</div>
                )}
                
                <p className="text-gray-600 leading-relaxed line-clamp-4 mb-6 text-sm">
                  {s.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {s.phone ? (
                    <span className="font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl text-sm">
                      📞 {s.phone}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">Kontakti privātā</span>
                  )}
                  <span className="text-xs text-gray-400 font-medium">
                    {s.created_at ? new Date(s.created_at).toLocaleDateString('lv-LV') : 'Jauns'}
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
