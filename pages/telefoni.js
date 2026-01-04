import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Telefoni() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('sludinajumi')
      .select('*')
      .eq('category', 'telefoni')
      .eq('status', 'publicēts')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setSludinajumi(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Head><title>📱 Telefoni | TechVibe</title></Head>
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-black mb-6">
              <span className="text-6xl">📱</span><br/>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Telefoni</span>
            </h1>
            <Link href="/" className="inline-flex px-6 py-3 bg-white border-2 border-gray-200 rounded-xl shadow-sm font-bold hover:border-purple-400 transition-all">
              ← Sākums
            </Link>
          </div>
          
          {sludinajumi.map((item) => (
            <Link key={item.id} href={`/sludinajums/${item.id}`}>
              <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 hover:shadow-2xl transition-all">
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-3xl font-black text-purple-600 mb-4">{item.price}€</p>
                {item.image_url && <img src={item.image_url} className="w-full rounded-xl h-64 object-cover" />}
              </div>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
