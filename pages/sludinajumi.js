import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import Image from 'next/image';

// TAVI SUPABASE DATI – no app.supabase.com/project/tehcbilds/settings/api
const supabaseUrl = 'https://tehcbilds.supabase.co';
const supabaseAnonKey = 'skpui1pZSSu2rKqPbg1234567890abcdef...'; // Pilns anon/public key no dashboard (kopē visu!)
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function VisiSludinajumi() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSludinajumi();
  }, []);

  async function fetchSludinajumi() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('status', 'publicēts')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSludinajumi(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl font-bold text-gray-600">Ielādē sludinājumus...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center">
        <div className="text-xl font-bold text-red-600 p-8 bg-white rounded-xl shadow-lg">
          Kļūda: {error}. Pārbaudi Supabase datus un tabulu 'sludinajumi'.
          <br />
          <Link href="/admin" className="text-blue-600 underline mt-4 block">
            → Admin paneļis pievienot sludinājumus
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            TechVibe Sludinājumi
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Atrast labākos piedāvājumus Latvijā – viegli un ātri!
          </p>
          <Link
            href="/pievienot"
            className="mt-8 inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            + Pievienot sludinājumu
          </Link>
        </div>

        {sludinajumi.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Vēl nav sludinājumu</h2>
            <p className="text-xl text-gray-500 mb-8">Esi pirmais! Pievieno savu piedāvājumu.</p>
            <Link
              href="/pievienot"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Pievienot tagad
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sludinajumi.map((sludinajums) => (
              <div
                key={sludinajums.id}
                className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 group"
              >
                <div className="relative h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 overflow-hidden">
                  {sludinajums.image_url ? (
                    <Image
                      src={sludinajums.image_url}
                      alt={sludinajums.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-4xl text-gray-400">
                      🖼️
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    Jauns
                  </div>
                </div>
                <div className="p-8">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-4">
                    {sludinajums.category || 'Cits'}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {sludinajums.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 h-20">
                    {sludinajums.description}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                      {sludinajums.price}€
                    </div>
                  </div>
                  <Link
                    href={`/sludinajums/${sludinajums.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300 text-center block"
                  >
                    Skatīt vairāk →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-20 p-8 bg-white/50 backdrop-blur-sm rounded-3xl shadow-lg">
          <Link href="/" className="text-blue-600 hover:text-blue-800 font-bold text-xl">
            ← Atpakaļ uz sākumlapu
          </Link>
        </div>
      </div>
    </div>
  );
}
