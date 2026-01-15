import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Auto() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSludinajumi();
  }, []);

  const fetchSludinajumi = async () => {
    try {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*, image_urls');  // VISU tabula!

      console.log('Auto sludinājumi:', data);  // F12 redz BMW!

      if (error) throw error;
      setSludinajumi(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getFirstImage = (sludinajums) => {
    return sludinajums.image_urls || 'https://via.placeholder.com/500x300/e2e8f0/4a5568?text=🚗+Auto+bez+bildes';
  };

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center"><div>Ielādē...</div></div>;

  return (
    <>
      <Head><title>Auto - TechVibe.lv</title></Head>
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">🚗 Auto un moto</h1>
              <p className="text-xl text-gray-600">Visi auto sludinājumi Latvijā</p>
            </div>
            <Link href="/ievietot" className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
              + Ievietot auto
            </Link>
          </div>

          {sludinajumi.length === 0 ? (
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-gray-700 mb-4">Vēl nav sludinājumu</h2>
              <Link href="/ievietot" className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all">📤 Ievietot pirmo</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sludinajumi.map((s) => (
                <Link key={s.id} href={`/sludinajums/${s.id}`} className="group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all hover:-translate-y-2 border">
                    <div className="h-64 overflow-hidden">
                      <img src={getFirstImage(s)} alt={s.nosaukums} className="w-full h-full object-cover group-hover:scale-110 transition-transform" onError={e => e.target.src='https://via.placeholder.com/500x300?text=🚗'} />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2">{s.nosaukums}</h3>
                      <div className="flex justify-between mb-4">
                        <span className="text-2xl font-bold text-emerald-600">€{s.cena}</span>
                        <span className="text-sm text-gray-500">{s.kontakts}</span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3">{s.apraksts}</p>
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
