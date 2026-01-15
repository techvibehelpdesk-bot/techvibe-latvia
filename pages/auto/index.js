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
        .select('*, image_urls')  // ✅ TAVA kolonna!
        .eq('category', 'auto')
        .eq('status', 'publicēts');

      console.log('Auto dati:', data);  // F12 redz image_urls!

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

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center"><div className="text-xl">Ielādē...</div></div>;

  return (
    <>
      <Head><title>Auto - TechVibe.lv</title></Head>
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                🚗 Auto un moto
              </h1>
              <p className="text-xl text-gray-600">Atrast savā sapņu auto Latvijā</p>
            </div>
            <Link href="/ievietot" className="mt-4 md:mt-0 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
              + Ievietot sludinājumu
            </Link>
          </div>

          {sludinajumi.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-4xl">🚗</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-700 mb-4">Vēl nav auto sludinājumu</h2>
              <p className="text-lg text-gray-500 mb-8">Esi pirmais! Ievieto savu auto.</p>
              <Link href="/ievietot" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg">
                📤 Ievietot pirmo
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sludinajumi.map((sludinajums) => (
                <Link key={sludinajums.id} href={`/sludinajums/${sludinajums.id}`} className="group">
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] border border-gray-100">
                    <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden relative group-hover:from-blue-50 group-hover:to-purple-50">
                      <img 
                        src={getFirstImage(sludinajums)} 
                        alt={sludinajums.nosaukums}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => { e.target.src = 'https://via.placeholder.com/500x300/e2e8f0/4a5568?text=🚗+Bez+bildes'; }}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {sludinajums.nosaukums}
                      </h3>
                      <div className="flex items-baseline justify-between mb-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
                          €{sludinajums.cena?.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">{sludinajums.datums ? new Date(sludinajums.datums).toLocaleDateString('lv') : 'Jauns'}</span>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">{sludinajums.apraksts}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 truncate">{sludinajums.kontakts}</span>
                        <div className="flex items-center space-x-1">
                          <span className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-white">★</span>
                          <span className="text-sm text-gray-500">Premium</span>
                        </div>
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
