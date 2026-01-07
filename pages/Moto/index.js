import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Moto() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSludinajumi() {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('category', 'moto')
        .eq('status', 'publicēts')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Kļūda:', error);
      } else {
        setSludinajumi(data || []);
      }
      setLoading(false);
    }
    fetchSludinajumi();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
        <div className="text-white text-2xl">Ielādē...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Moto un transportlīdzekļi - TechVibe.lv</title>
        <meta name="description" content="Moto, motocikli, skūteri - pērc un pārdod Rīgā un Latvijā!" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-orange-600">🏍️ TechVibe.lv</Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/moto" className="text-orange-600 font-semibold hover:underline">Moto</Link>
                <Link href="/velosipedi" className="text-gray-700 hover:text-orange-600">Velosipēdi</Link>
                <Link href="/dzivokli" className="text-gray-700 hover:text-orange-600">Dzīvokļi</Link>
                <Link href="/telefoni" className="text-gray-700 hover:text-orange-600">Telefoni</Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              🏍️ Moto un transportlīdzekļi
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Motocikli, skūteri, kvadracikli - ātri, jaudīgi, gatavi ceļiem!
            </p>
          </div>

          {sludinajumi.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-8xl mb-8">🏍️</div>
              <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
                Vēl nav sludinājumu šajā kategorijā
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-lg mx-auto">
                Esi pirmais! Pievieno savu moto sludinājumu un sasniec tūkstošiem pircēju Latvijā.
              </p>
              <Link 
                href="/pievienot" 
                className="bg-white text-orange-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-orange-50 transition-all duration-300 shadow-2xl hover:shadow-3xl"
              >
                ➕ Pievienot sludinājumu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sludinajumi.map((sludinajums) => (
                <Link 
                  key={sludinajums.id} 
                  href={`/sludinajums/${sludinajums.id}`}
                  className="group bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-white/50 hover:border-orange-200"
                >
                  <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                    {sludinajums.images && sludinajums.images.length > 0 ? (
                      <img 
                        src={sludinajums.images[0]} 
                        alt={sludinajums.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-6xl">🏍️</div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                      {sludinajums.title}
                    </h3>
                    <div className="flex items-baseline justify-between">
                      <span className="text-3xl font-bold text-orange-600">
                        {sludinajums.price ? `${sludinajums.price.toLocaleString()} €` : 'Sazinies'}
                      </span>
                      <span className="text-sm text-gray-500">{sludinajums.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{new Date(sludinajums.created_at).toLocaleDateString('lv-LV')}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

        <footer className="bg-white/80 backdrop-blur-md mt-24 border-t border-white/50">
          <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-600">
            <p>&copy; 2026 TechVibe.lv - Tava sludinājumu platforma Latvijā 🏍️</p>
          </div>
        </footer>
      </div>
    </>
  );
}
