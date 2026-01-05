import Header from '../components/Header';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Home() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSludinajumi() {
      try {
        const { data, error } = await supabase
          .from('sludinajumi')
          .select('*')
          .eq('status', 'publicēts')
          .order('created_at', { ascending: false })
          .limit(12);

        if (error) throw error;
        setSludinajumi(data || []);
      } catch (error) {
        console.error('Kļūda ielādējot sludinājumus:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchSludinajumi();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600">Ielādē sludinājumus...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {sludinajumi.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sludinajumi.map((sludinajums) => (
              <div key={sludinajums.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {sludinajums.image_url ? (
                  <img
                    src={sludinajums.image_url}
                    alt={sludinajums.nosaukums}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Nav bildes</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                    {sludinajums.nosaukums}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {sludinajums.apraksts}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">€{sludinajums.cena}</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {sludinajums.kategorija}
                    </span>
                  </div>
                  <Link
                    href={`/sludinajums/${sludinajums.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl text-center font-bold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 block"
                  >
                    Skatīt sludinājumu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
              <span className="text-4xl">📱</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              TechVibe – Tavs sludinājumu portāls
            </h1>
            <p className="text-2xl text-gray-500 mb-8 max-w-2xl mx-auto">
              Pārdod un pērc ātri un viegli. Telefoni, auto, datori, nekustamais īpašums un daudz kas cits.
            </p>
            <Link 
              href="/ievietot" 
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-xl text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block"
            >
              Būt pirmais – ievieto sludinājumu!
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
