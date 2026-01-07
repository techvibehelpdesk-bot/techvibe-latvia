import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Velosipedi() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSludinajumi();
  }, []);

  const fetchSludinajumi = async () => {
    try {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('category', 'velosipedi')
        .eq('status', 'publicēts')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSludinajumi(data || []);
    } catch (error) {
      console.error('Kļūda ielādējot velosipēdus:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">🚲 Ielādē velosipēdus...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>🚲 Velosipēdi - TechVibe.lv</title>
        <meta name="description" content="Velosipēdi, skūteri un aksesuāri - pērc un pārdod Rīgā un Latvijā!" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                TechVibe.lv
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/kategorijas" className="text-gray-700 hover:text-green-600 font-medium">Kategorijas</Link>
                <Link href="/izsole" className="text-gray-700 hover:text-green-600 font-medium">Izsoles</Link>
                <Link href="/pievienot" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium">+ Pievienot sludinājumu</Link>
              </nav>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent mb-4">
              🚲 Velosipēdi & Skūteri
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Atrodi savu ideālo velosipēdu! Kalnu, šosejas, bērnu, elektriskie - viss vienā vietā.
            </p>
          </div>

          {sludinajumi.length === 0 ? (
            <div className="text-center py-20">
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🚲</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Vēl nav velosipēdu sludinājumu</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Esi pirmais! Pievieno savu velosipēdu vai skūteri tirdzniecībai.
              </p>
              <Link 
                href="/pievienot" 
                className="bg-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                + Pievienot sludinājumu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sludinajumi.map((sludinajums) => (
                <Link 
                  key={sludinajums.id} 
                  href={`/sludinajums/${sludinajums.id}`}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-emerald-50 group-hover:to-green-50 transition-all duration-300 flex items-center justify-center">
                    {sludinajums.image_url ? (
                      <img 
                        src={sludinajums.image_url} 
                        alt={sludinajums.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl opacity-50">🚲</span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors mb-2 line-clamp-2">
                      {sludinajums.title}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        {sludinajums.price ? `${sludinajums.price.toLocaleString()} €` : 'Sazinies'}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        {sludinajums.location || 'Rīga'}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="flex items-center mr-4">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Jauns
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        {new Date(sludinajums.created_at).toLocaleDateString('lv-LV')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}  
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-20">
          <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-600">
            <p>&copy; 2026 TechVibe.lv - Tava sludinājumu platforma Latvijā 🚀</p>
          </div>
        </footer>
      </div>
    </>
  );
}
