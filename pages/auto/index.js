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
      
      const { data } = await supabase
        .from('sludinajumi')
        .select('id, title, description, category, price, contact, city, image_urls, created_at')
        .eq('category', 'auto')  // ✅ TAVA kolonna!
        .eq('status', 'gaida')   // ✅ TAVA vērtība no screenshot!
        .order('created_at', { ascending: false });

      console.log('✅ AUTO GATAVI:', data);  // BMW!
      
      setSludinajumi(data || []);
      setLoading(false);
    }
    fetchAuto();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64 text-xl">Ielādē auto...</div>;

  return (
    <main className="max-w-7xl mx-auto p-8">
      <div className="mb-12 flex flex-col lg:flex-row gap-6 lg:items-center justify-between">
        <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          🚗 Auto ({sludinajumi.length})
        </h1>
        <Link 
          href="/ievietot?category=auto" 
          className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all whitespace-nowrap"
        >
          ➕ Pievienot auto
        </Link>
      </div>

      {sludinajumi.length === 0 ? (
        <div className="text-center py-32 border-2 border-dashed border-gray-200 rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50/30 backdrop-blur-sm shadow-xl">
          <div className="w-36 h-36 mx-auto mb-8 bg-gradient-to-r from-gray-200 to-slate-300 rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-5xl">🚗</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Nav auto sludinājumu</h2>
          <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto leading-relaxed">
            Pievieno pirmo auto sludinājumu un esi pirmais kategorijā!
          </p>
          <Link 
            href="/ievietot?category=auto" 
            className="px-16 py-5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
          >
            Ievietot sludinājumu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sludinajumi.map((s) => (
            <Link 
              key={s.id} 
              href={`/sludinajums/${s.id}`}
              className="group bg-white/90 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-3xl border border-white/60 hover:border-blue-200 p-1 transition-all duration-500 hover:-translate-y-4 hover:rotate-1 overflow-hidden"
            >
              <div className="h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50/50 group-hover:scale-105 transition-transform duration-700 relative">
                {s.image_urls && s.image_urls.length > 0 ? (
                  <img 
                    src={s.image_urls[0]} 
                    alt={s.title || 'Auto'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-orange-100 to-amber-100">
                    <span className="text-6xl opacity-80 drop-shadow-lg">🚗</span>
                  </div>
                )}
              </div>
              
              <div className="p-8">
                <h3 className="font-bold text-2xl mb-4 line-clamp-2 group-hover:text-blue-700 transition-all">
                  {s.title || 'Auto bez nosaukuma'}
                </h3>
                
                <div className="mb-6">
                  {s.price ? (
                    <div className="text-4xl font-black bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 text-transparent bg-clip-text drop-shadow-2xl mb-2">
                      €{Number(s.price).toLocaleString('lv-LV')}
                    </div>
                  ) : (
                    <div className="text-2xl font-bold text-gray-500 italic bg-gray-100 px-4 py-2 rounded-xl">
                      Cena pēc vienošanās
                    </div>
                  )}
                </div>
                
                <p className="text-gray-700 leading-relaxed line-clamp-3 mb-6 text-base">
                  {s.description || 'Labs auto Rīgā!'}
                </p>
                
                <div className="flex flex-wrap gap-4 items-center pt-6 border-t-2 border-gray-100">
                  <span className="font-bold text-lg text-blue-600 bg-blue-100 px-5 py-2 rounded-2xl shadow-md">
                    📞 {s.contact || s.phone || 'Privāti'}
                  </span>
                  <span className="text-sm font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-xl">
                    {s.city || 'Rīga'}
                  </span>
                  {s.created_at && (
                    <span className="text-xs text-gray-500 ml-auto">
                      {new Date(s.created_at).toLocaleDateString('lv-LV')}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
