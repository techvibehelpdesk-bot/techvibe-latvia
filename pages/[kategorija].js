// pages/kategorija/[kategorija].js - DINAMISKĀS KATEGORIJAS
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const categoryConfig = {
  telefoni: { title: '📱 Telefoni un aksesuāri', icon: '📱' },
  auto: { title: '🚗 Auto un moto', icon: '🚗' },
  datori: { title: '💻 Datori un programmatūra', icon: '💻' },
  mebeles: { title: '🛋️ Mēbeles un interjers', icon: '🛋️' },
  sports: { title: '⚽ Sporta preces', icon: '⚽' },
  darbs: { title: '💼 Darbs un bizness', icon: '💼' }
};

export default function Kategorija() {
  const router = useRouter();
  const { kategorija } = router.query;
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);
  const config = categoryConfig[kategorija];

  useEffect(() => {
    if (kategorija && config) {
      fetchSludinajumi();
    }
  }, [kategorija]);

  const fetchSludinajumi = async () => {
    const { data } = await supabase
      .from('sludinajumi')
      .select('*')
      .eq('category', kategorija)
      .eq('status', 'publicēts')
      .order('created_at', { ascending: false });
    
    setSludinajumi(data || []);
    setLoading(false);
  };

  if (!config || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        Ielādē...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{config.title} | TechVibe</title>
      </Head>
      
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              <span className="text-5xl mr-4">{config.icon}</span>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {config.title}
              </span>
            </h1>
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm font-semibold text-lg hover:text-purple-600 transition-all"
            >
              ← Atpakaļ uz sākumu
            </Link>
          </div>

          {sludinajumi.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-8">{config.icon}</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-6">Šajā kategorijā vēl nav sludinājumu</h2>
              <Link 
                href="/ievietot"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all"
              >
                🆕 Ievieto pirmo!
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sludinajumi.map((item) => (
                <Link key={item.id} href={`/sludinajums/${item.id}`} className="block">
                  <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden group">
                    <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                      {item.image_url ? (
                        <img 
                          src={item.image_url} 
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-blue-500">
                          <span className="text-4xl">📱</span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        Jauns
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-2xl font-black bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                          {item.price} €
                        </span>
                      </div>
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl text-center font-bold shadow-lg hover:shadow-xl transition-all">
                        👁️ Skatīt vairāk
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
