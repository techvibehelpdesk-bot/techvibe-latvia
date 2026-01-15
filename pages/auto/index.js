// pages/auto/index.js - PILNS ar bilžu labojumu (image_urls + images_url) + visām kategorijām gatavs!
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

  const getFirstImage = (sludinajums) => {
    let images = [];
    
    // ✅ image_urls (jsonb masīvs no ievietot.js)
    if (sludinajums.image_urls && Array.isArray(sludinajums.image_urls)) {
      images = sludinajums.image_urls;
    } 
    // ✅ images_url (vecs text/string)
    else if (sludinajums.images_url) {
      images = [sludinajums.images_url.trim()];
    }
    
    const firstImage = images[0];
    
    // Supabase Storage public URL
    if (firstImage && firstImage.includes('supabase.co/storage')) {
      return firstImage;
    }
    
    return 'https://via.placeholder.com/500x300/4a5568/ffffff?text=%F0%9F%9A%97+Auto+bez+bildes';
  };

  const fetchSludinajumi = async () => {
    try {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*, image_urls, images_url, title, price, description, category, created_at, kontakts')
        .eq('category', 'auto')  // ✅ Mazie burti no screenshot!
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      console.log('🔍 Auto sludinājumi + bildes:', data);
      setSludinajumi(data || []);
    } catch (err) {
      console.error('Auto kļūda:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSludinajumi();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl">Ielādē auto sludinājumus...</div>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-500">Kļūda: {error}</div>;
  }

  return (
    <>
      <Head>
        <title>🚗 Auto sludinājumi - TechVibe.lv</title>
        <meta name="description" content="Auto, moto, riteņi - pērc un pārdod ātri Rīgā!" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          {/* HEADER */}
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              🚗 Auto sludinājumi
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
              <Link 
                href="/ievietot" 
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg"
              >
                ➕ Ievietot auto
              </Link>
              <Link 
                href="/" 
                className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-white/50 rounded-2xl font-semibold hover:bg-white hover:shadow-lg transition-all"
              >
                🏠 Sākums
              </Link>
            </div>
          </div>

          {/* SLUDINĀJUMI */}
          {sludinajumi.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                🚗
              </div>
              <h2 className="text-3xl font-bold text-gray-700 mb-4">Pagaidām nav auto sludinājumu</h2>
              <p className="text-xl text-gray-500 mb-8">Būt pirmais Rīgas tirgū!</p>
              <Link 
                href="/ievietot?category=auto" 
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl hover:shadow-2xl text-xl transition-all"
              >
                🚀 Ievietot pirmo auto
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sludinajumi.map((sludinajums) => (
                <Link 
                  key={sludinajums.id} 
                  href={`/sludinajums/${sludinajums.id}`}
                  className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200"
                >
                  {/* ATTĒLS */}
                  <div className="h-64 relative overflow-hidden bg-gradient-to-br from-slate-100 to-gray-100 group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={getFirstImage(sludinajums)}
                      alt={sludinajums.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/500x300/4a5568/ffffff?text=%F0%9F%9A%97+K%C4%BC%C5%ABda+aug%C5%A3upiel%C4%81de';
                      }}
                    />
                    {sludinajums.status === 'premium' && (
                      <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                        ⭐ PREMIUM TOP
                      </div>
                    )}
                  </div>
                  
                  {/* INFO */}
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors">
                      {sludinajums.title}
                    </h3>
                    
                    <div className="text-2xl font-black text-blue-600 mb-4">
                      €{sludinajums.price?.toLocaleString('lv-LV') || 'Nav norādīta'}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {sludinajums.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                      <span>{new Date(sludinajums.created_at).toLocaleDateString('lv-LV')}</span>
                      <span>📞 Kontakts pieejams</span>
                    </div>
                    
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 text-white py-3 px-6 rounded-2xl font-bold text-center shadow-lg hover:shadow-xl transition-all text-sm">
                      👁️ Skatīt sludinājumu
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {sludinajumi.length > 0 && (
            <div className="text-center mt-16">
              <Link 
                href="/ievietot" 
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg"
              >
                ➕ Pievienot savu auto
                <span className="text-sm opacity-90">({sludinajumi.length} jau ir)</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
