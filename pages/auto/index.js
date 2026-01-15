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
      
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('id, title, price, description, phone, category, images, status, created_at')
        .eq('status', 'publicēts')
        .eq('category', 'auto')  // ✅ TAVA kolonna + vērtība!
        .order('created_at', { ascending: false });

      console.log('🚗 AUTO GATAVI:', data);

      setSludinajumi(data || []);
      setLoading(false);
    }
    fetchAuto();
  }, []);

  if (loading) return <div className="p-20 text-center">Ielādē...</div>;

  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="mb-12">
        <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🚗 Auto un Moto ({sludinajumi.length})
        </h1>
        <Link href="/ievietot?cat=auto" className="bg-green-500 text-white px-8 py-3 rounded-2xl font-bold mt-4 inline-block">
          ➕ Ievietot
        </Link>
      </div>

      {sludinajumi.length === 0 ? (
        <div className="text-center py-24">Vēl nav auto...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sludinajumi.map((s) => (
            <Link key={s.id} href={`/sludinajums/${s.id}`} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6 hover:-translate-y-2 transition-all">
              <div className="h-48 mb-4 overflow-hidden rounded-xl bg-gradient-to-r from-gray-100 to-blue-100 flex items-center justify-center">
                {s.images && s.images[0] ? (
                  <img src={s.images[0]} alt={s.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">🚗</span>
                )}
              </div>
              <h3 className="font-bold text-xl mb-2">{s.title}</h3>
              <div className="text-2xl font-black text-green-600 mb-3">€{s.price.toLocaleString()}</div>
              <p className="text-gray-600 mb-4 line-clamp-3">{s.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-blue-600">📞 {s.phone}</span>
                <span className="text-sm text-gray-500">{new Date(s.created_at).toLocaleDateString('lv')}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
