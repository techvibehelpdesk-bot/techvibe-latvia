// pages/sludinajums/[id].js - SLUDINĀJUMA DETĀLES
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Head from 'next/head';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SludinajumaDetalas() {
  const router = useRouter();
  const { id } = router.query;
  const [sludinajums, setSludinajums] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchSludinajums();
    }
  }, [id]);

  const fetchSludinajums = async () => {
    try {
      const { data } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data && data.status === 'publicēts') {
        setSludinajums(data);
      } else {
        router.push('/sludinajumi');
      }
    } catch (error) {
      console.log('Kļūda:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-lg">Ielādē...</div>
      </div>
    );
  }

  if (!sludinajums) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-lg text-gray-600">Sludinājums nav atrasts</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{sludinajums.title} | TechVibe</title>
      </Head>
      
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* ATBALKA POGA */}
          <div className="mb-8">
            <Link 
              href="/sludinajumi"
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm text-lg font-semibold text-gray-800 hover:text-purple-600 hover:border-purple-400 transition-all"
            >
              ← Atpakaļ uz sludinājumiem
            </Link>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{sludinajums.title}</h1>
            
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-lg font-bold">
                {sludinajums.price} €
              </span>
              <span className="ml-4 bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm font-medium">
                {sludinajums.category?.toUpperCase()}
              </span>
            </div>

            {sludinajums.image_url && (
              <div className="mb-8">
                <img 
                  src={sludinajums.image_url} 
                  alt={sludinajums.title}
                  className="w-full h-96 object-cover rounded-xl shadow-lg"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 leading-relaxed">{sludinajums.description}</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-200">
              <h3 className="text-xl font-bold mb-4 text-gray-900">📞 Kontakts</h3>
              <p className="text-2xl font-bold text-gray-800 mb-6">{sludinajums.contact}</p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${sludinajums.contact.replace(/\D/g, '')}`}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl text-center shadow-lg hover:shadow-xl transition-all text-lg"
                >
                  📞 Zvanīt tagad
                </a>
                <Link 
                  href="/sludinajumi"
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-xl text-center shadow-lg hover:shadow-xl transition-all text-lg"
                >
                  Citi sludinājumi
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
