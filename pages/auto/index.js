import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Auto() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAds = async () => {
    try {
      const { data } = await supabase
        .from('sludinajumi')
        .select('*')  // ✅ Visu bez specific kolonnām!
        .eq('category', 'auto')
        .order('created_at', { ascending: false });
      
      console.log('Auto ads:', data);
      setAds(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => fetchAds(), []);

  const getImage = (ad) => ad.images_url || 'https://via.placeholder.com/400x300/ccc?text=Auto';

  if (loading) return <div className="p-20 text-center">Loading...</div>;

  return (
    <>
      <Head><title>Auto - TechVibe</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🚗 Auto sludinājumi
            </h1>
            <Link href="/ievietot" className="mt-6 inline-block bg-green-500 text-white py-3 px-8 rounded-xl font-bold hover:bg-green-600">
              + Pievienot
            </Link>
          </div>

          {ads.length === 0 ? (
            <div className="text-center py-20">
              Nav auto sludinājumu. <Link href="/ievietot" className="text-blue-500 font-bold">Pievieno pirmo!</Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ads.map(ad => (
                <div key={ad.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-4 hover:-translate-y-1 transition-all">
                  <img src={getImage(ad)} alt={ad.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                  <h3 className="font-bold text-lg mb-2">{ad.title}</h3>
                  <div className="text-2xl font-black text-green-600 mb-2">
                    €{ad.price || 'Saruna'}
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{ad.description}</p>
                  <Link href={`/sludinajums/${ad.id}`} className="block w-full bg-blue-500 text-white text-center py-2 rounded-xl font-bold hover:bg-blue-600">
                    Skatīt
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
