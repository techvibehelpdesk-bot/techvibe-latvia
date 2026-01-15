import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function Auto() {
  let sludinajumi = [];
  let error = null;

  try {
    const { data, error: fetchError } = await supabase
      .from('sludinajumi')
      .select('*, image_urls')  // Angliskas kolonnas + bildes
      .eq('status', 'publicēts')  // Vai 'approved'?
      .ilike('category', '%auto%')  // ILIKE tavai category kolonnai!
      .order('created_at', { ascending: false });

    console.log('AUTO DEBUG:', { count: data?.length || 0, error: fetchError });
    
    sludinajumi = data || [];
  } catch (err) {
    console.error('AUTO KĻŪDA:', err);
    error = err.message;
  }

  return (
    <>
      <Head>
        <title>🚗 Auto un Moto | TechVibe</title>
        <meta name="description" content="Auto un moto sludinājumi Latvijā" />
      </Head>
      <main className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">🚗 Auto un Moto</h1>
          <Link href="/ievietot?cat=auto" className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
            + Ievietot sludinājumu
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            Kļūda: {error}. Pārbaudi Supabase.
          </div>
        )}

        {sludinajumi.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 mb-4">Vēl nav auto sludinājumu</p>
            <Link href="/ievietot?cat=auto" className="bg-purple-500 text-white px-8 py-3 rounded-lg hover:bg-purple-600">
              Būt pirmais!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sludinajumi.map((s) => (
              <Link key={s.id} href={`/sludinajums/${s.id}`} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                  {s.image_urls && s.image_urls[0] ? (
                    <img src={s.image_urls[0]} alt={s.title || s.nosaukums} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-white text-lg font-semibold">Bez bildes</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 line-clamp-2">{s.title || s.nosaukums}</h3>
                  <div className="text-2xl font-bold text-green-600 mb-3">
                    €{(s.price || s.cena)?.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-3">{s.description || s.apraksts}</p>
                  <div className="flex items-center text-sm text-gray-600">
                    📞 {s.phone || s.kontakts}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}
