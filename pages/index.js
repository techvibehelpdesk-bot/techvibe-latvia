import Header from '../components/Header'; // Ja ir Header komponents
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Home() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('sludinajumi')
      .select('*')
      .eq('status', 'publicēts')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setSludinajumi(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            TechVibe.lv
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sludinājumi un preces visā Latvijā – ātri, droši, izdevīgi!
          </p>
        </div>

        {loading ? (
          <p className="text-center text-2xl">Ielādē sludinājumus...</p>
        ) : sludinajumi.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sludinajumi.slice(0, 8).map((s) => (
              <div key={s.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all p-6">
                <h3 className="font-bold text-xl mb-2">{s.nosaukums}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{s.apraksts}</p>
                <div className="text-2xl font-bold text-blue-600 mb-4">{s.cena}€</div>
                <Link href={`/sludinajums/${s.id}`} className="block bg-blue-500 text-white text-center py-3 rounded-xl font-bold hover:bg-blue-600">
                  Skatīt sludinājumu →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-500 mb-8">Vēl nav sludinājumu</p>
            <Link href="/ievietot" className="bg-blue-500 text-white px-8 py-4 rounded-xl text-xl font-bold">
              Būt pirmais – ievieto sludinājumu!
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
