import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Moto() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMoto() {
      const { data } = await supabase
        .from('sludinajumi')
        .select()
        .eq('category', 'moto');
      setSludinajumi(data || []);
      setLoading(false);
    }
    fetchMoto();
  }, []);

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl">Ielādē...</div>;

  return (
    <>
      <Head><title>🏍️ Moto - TechVibe.lv</title></Head>
      <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 py-12 text-center text-white">
          <h1 className="text-4xl font-bold mb-8 flex items-center justify-center gap-4">
            🏍️ Moto & Skūteri
          </h1>
          <p className="text-xl mb-12 max-w-lg mx-auto opacity-90">
            Atrodi savu ideālo motocikli, skūteri un elektro transportlīdzekļus
          </p>
          
          {sludinajumi.length === 0 ? (
            <div className="py-20">
              <h2 className="text-2xl font-semibold mb-4 opacity-90">Vēl nav moto sludinājumu</h2>
              <a href="/pievienot" className="bg-white text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
                ➕ Pievienot sludinājumu
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sludinajumi.map(s => (
                <a key={s.id} href={`/sludinajums/${s.id}`} className="bg-white/20 backdrop-blur-md rounded-2xl p-6 hover:bg-white/30 transition">
                  <img src={s.images?.[0] || '/placeholder.jpg'} alt={s.title} className="w-full h-48 object-cover rounded-xl mb-4" />
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <div className="text-2xl font-bold text-yellow-300">{s.price}€</div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
