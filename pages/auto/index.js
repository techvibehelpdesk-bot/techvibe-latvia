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

  const getFirstImage = (images_url) => {
    if (images_url && images_url.trim()) {
      return images_url.trim();  // ✅ TAVA images_url kolonna
    }
    return 'https://via.placeholder.com/500x300/4a5568/ffffff?text=%F0%9F%9A%97+Auto';
  };

  const fetchSludinajumi = async () => {
    try {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*, images_url, title, price, description, category, created_at')
        // NO image_urls - TEV TĀS NAV!
        .eq('category', 'auto')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      console.log('🚗 Auto + images_url:', data);
      setSludinajumi(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSludinajumi(); }, []);

  if (loading) return <div className="p-20 text-center">Ielādē auto...</div>;

  return (
    <>
      <Head><title>🚗 Auto - TechVibe.lv</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              🚗 Auto sludinājumi
            </h1>
            <Link href="/ievietot" className="bg-green-500 hover:bg-green-600 text-white py-4 px-10 rounded-2xl font-bold shadow-xl inline-block">
              ➕ Ievietot auto
            </Link>
          </div>

          {sludinajumi.length === 0 ? (
            <div className="text-center py-24">
              <Link href="/ievietot" className="bg-blue-500 text-white py-4 px-8 rounded-2xl font-bold block mx-auto max-w-max">
                Pievienot pirmo!
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sludinajumi.map((sludinajums) => (
                <Link key={sludinajums.id} href={`/sludinajums/${sludinajums.id}`} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all border hover:border-blue-200">
                  <img 
                    src={getFirstImage(sludinajums.images_url)}
                    alt={sludinajums.title}
                    className="w-full h-64 object-cover rounded-t-3xl"
                    onError={(e) => e.target.src='https://via.placeholder.com/500x300/4a5568/ffffff?text=🚗'}
                  />
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-3 line-clamp-2">{sludinajums.title}</h3>
                    <div className="text-2xl font-black text-green-600 mb-4">
                      €{sludinajums.price?.toLocaleString() || 'Saruna'}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-3">{sludinajums.description}</p>
                    <div className="text-xs text-gray-500 mt-4">
                      {new Date(sludinajums.created_at).toLocaleDateString('lv-LV')}
                    </div>
                    <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-bold">
                      📞 Sazināties
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
