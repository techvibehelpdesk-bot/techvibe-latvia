import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// SVARĪGI: Pārliecinies, ka tev ir pareizie Supabase dati
// Ja tev ir atsevišķs fails 'lib/supabaseClient.js', vari importēt no turienes.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function VisiSludinajumi() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSludinajumi() {
      setLoading(true);
      // Velkam datus no tabulas 'sludinajumi'
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .order('created_at', { ascending: false }); // Jaunākie augšā

      if (error) {
        console.error('Kļūda:', error);
      } else {
        setSludinajumi(data);
      }
      setLoading(false);
    }

    fetchSludinajumi();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Augšdaļa ar virsrakstu un Atpakaļ pogu */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Visi Sludinājumi
          </h1>
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            ← Atpakaļ uz sākumu
          </Link>
        </div>

        {/* Ielādes indikators */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Ielādē sludinājumus...</p>
          </div>
        ) : sludinajumi.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-500">Šobrīd nav neviena sludinājuma.</p>
          </div>
        ) : (
          
          /* ŠEIT SĀKAS REŽĢIS (GRID) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            
            {sludinajumi.map((sludinajums) => (
              <div key={sludinajums.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col">
                
                {/* Bilde */}
                <div className="h-48 bg-gray-200 relative">
                  {sludinajums.bilde ? (
                    <img 
                      src={sludinajums.bilde} 
                      alt={sludinajums.nosaukums}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      Nav attēla
                    </div>
                  )}
                  {/* Cena stūrītī */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full font-bold">
                    {sludinajums.cena} €
                  </div>
                </div>

                {/* Apraksts */}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-bold text-gray-800 mb-1 truncate">
                    {sludinajums.nosaukums}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {sludinajums.apraksts}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                      {sludinajums.atrasanas_vieta || 'Rīga'}
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Skatīt vairāk →
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}
