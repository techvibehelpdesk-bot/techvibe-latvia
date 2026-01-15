import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AutoPage() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSludinajumi = async () => {
    try {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('category', 'auto')  // ✅ Mazie burti kā screenshot!
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSludinajumi(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSludinajumi();
  }, []);

  if (loading) return <div className="container mx-auto p-8">Ielādē auto sludinājumus...</div>;
  if (error) return <div className="container mx-auto p-8 text-red-500">Kļūda: {error}</div>;

  const getFirstImage = (images_url) => {
    if (!images_url) return '/placeholder-auto.jpg';  // Fallback bilde
    const images = typeof images_url === 'string' ? [images_url] : (images_url || []);
    return images[0] || '/placeholder-auto.jpg';
  };

  return (
    <>
      <Head>
        <title>Auto sludinājumi - TechVibe.lv</title>
        <meta name="description" content="Auto, moto, riteņi - pērc un pārdod ātri!" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              🚗 Auto sludinājumi
            </h1>
            <Link 
              href="/ievietot" 
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl text-xl shadow-lg hover:shadow-xl transition-all"
            >
              + Ievietot sludinājumu
            </Link>
          </div>

          {sludinajumi.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500 mb-8">Pagaidām nav auto sludinājumu</p>
              <Link href="/ievietot" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl">
                Būt pirmais! Ievieto auto
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sludinajumi.map((sludinajums) => (
                <div key={sludinajums.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2">
                  <div className="h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 relative overflow-hidden">
                    <img 
                      src={getFirstImage(sludinajums.images_url)} 
                      alt={sludinajums.nosaukums || 'Auto'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.target.src = '/placeholder-auto.jpg'; }}
                    />
                    {sludinajums.premium && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ⭐ PREMIUM
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 line-clamp-2 leading-tight">
                      {sludinajums.nosaukums || sludinajums.title}
                    </h3>
                    <div className="text-3xl font-black text-blue-600 mb-4">
                      €{sludinajums.cena?.toLocaleString() || 'Nav norādīta'}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {sludinajums.apraksts || sludinajums.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{new Date(sludinajums.created_at).toLocaleDateString('lv-LV')}</span>
                      <span>👀 {sludinajums.prosbas || 0}</span>
                    </div>
                    <Link 
                      href={`/sludinajums/${sludinajums.id}`}
                      className="w-full block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-bold text-center shadow-lg hover:shadow-xl transition-all text-lg"
                    >
                      Skatīt & Sazināties
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
