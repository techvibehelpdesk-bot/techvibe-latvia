import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Tv() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTv() {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('category', 'tv')
        .eq('status', 'publicēts')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Kļūda ielādējot TV sludinājumus:', error);
      } else {
        setSludinajumi(data || []);
      }
      setLoading(false);
    }

    fetchTv();
  }, []);

  return (
    <>
      <Head>
        <title>TV un audio tehnika 📺 | TechVibe</title>
        <meta
          name="description"
          content="TV un audio tehnikas sludinājumi Latvijā – televizori, mājas kino, soundbari, skaļruņi."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-yellow-500 to-amber-600 text-gray-900">
        <header className="border-b border-yellow-300/40 bg-yellow-50/40 backdrop-blur">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/">
              <span className="text-xl font-bold tracking-tight cursor-pointer">
                TechVibe<span className="text-amber-600">.lv</span>
              </span>
            </Link>
            <nav className="flex gap-3 text-sm">
              <Link href="/velosipedi" className="hover:underline">
                🚲 Velosipēdi
              </Link>
              <Link href="/moto" className="hover:underline">
                🏍️ Moto
              </Link>
              <Link href="/auto" className="hover:underline">
                🚗 Auto
              </Link>
              <Link href="/tv" className="font-semibold underline">
                📺 TV & Audio
              </Link>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                📺 TV un audio tehnika
              </h1>
              <p className="text-sm text-yellow-100/90 mt-1">
                Televizori, mājas kino, soundbari, skaļruņi un cita audio/video tehnika.
              </p>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-black/10 hover:bg-black/20 text-sm font-medium shadow-sm border border-yellow-200/60"
            >
              ➕ Pievienot sludinājumu
            </button>
          </div>

          {loading ? (
            <div className="text-center text-yellow-50 py-16">
              Ielādē TV un audio sludinājumus...
            </div>
          ) : sludinajumi.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-black/5 rounded-2xl border border-yellow-200/40">
              <div className="text-5xl mb-3">📺</div>
              <h2 className="text-xl font-semibold mb-1">
                Vēl nav TV un audio sludinājumu
              </h2>
              <p className="text-sm text-yellow-100/90 mb-4">
                Esi pirmais, kas pievieno televizoru vai audio sistēmu.
              </p>
              <button
                type="button"
                className="px-4 py-2 rounded-lg bg-yellow-100 text-amber-800 text-sm font-semibold shadow hover:bg-yellow-200"
              >
                ➕ Pievienot sludinājumu
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {sludinajumi.map((item) => (
                <Link
                  key={item.id}
                  href={`/sludinajums/${item.id}`}
                  className="group block"
                >
                  <div className="bg-yellow-50/80 border border-yellow-200/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
                    <div className="aspect-video bg-gradient-to-br from-amber-500 to-yellow-400 relative">
                      {item.image_url && (
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute top-2 left-2 px-2 py-1 text-xs rounded-full bg-black/40 text-yellow-50">
                        📺 TV & Audio
                      </div>
                      {item.price && (
                        <div className="absolute bottom-2 right-2 px-3 py-1 text-sm rounded-full bg-black/70 text-yellow-50 font-semibold">
                          {item.price} €
                        </div>
                      )}
                    </div>

                    <div className="p-3">
                      <h2 className="font-semibold text-sm mb-1 line-clamp-2">
                        {item.title}
                      </h2>
                      {item.city && (
                        <p className="text-xs text-amber-900/80 mb-1">
                          {item.city}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-[11px] text-amber-900/70 mt-1">
                        <span>
                          {item.created_at
                            ? new Date(item.created_at).toLocaleDateString(
                                'lv-LV'
                              )
                            : ''}
                        </span>
                        <span className="group-hover:text-amber-700 font-medium">
                          Apskatīt sludinājumu →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>

        <footer className="mt-10 border-t border-yellow-300/40 bg-yellow-50/40">
          <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-amber-900/80 text-center">
            <p>&copy; 2026 TechVibe.lv – TV un audio sludinājumi Latvijā 📺</p>
          </div>
        </footer>
      </div>
    </>
  );
}
