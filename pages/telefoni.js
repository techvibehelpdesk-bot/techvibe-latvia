import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Telefoni() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTelefoni() {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('category', 'telefoni')  // ← FILTRĒT Pēc kategorijas
        .eq('status', 'publicēts')
        .order('created_at', { ascending: false });

      if (error) console.error(error);
      else setSludinajumi(data || []);
      setLoading(false);
    }
    fetchTelefoni();
  }, []);

  if (loading) return <div className="text-center py-20">Ielādē telefonus...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm text-lg font-semibold">
            ← Atpakaļ
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          📱 Telefoni un aksesuāri
        </h1>

        {sludinajumi.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-4">Nav sludinājumu šajā kategorijā</p>
            <Link href="/ievietot" className="bg-blue-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
              Būt pirmais – ievieto sludinājumu!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sludinajumi.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative overflow-hidden">
                  {item.image_urls && item.image_urls[0] ? (
                    <img 
                      src={item.image_urls[0]} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-2xl">📱</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    {item.price ? item.price + '€' : 'Par brīvu'}
                  </p>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-4 inline-block">
                    {item.category}
                  </span>
                  <Link href={`/sludinajums/${item.id}`} className="block w-full bg-blue-600 text-white py-3 rounded-xl text-center font-bold hover:bg-blue-700 transition-all">
                    Skatīt vairāk →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
