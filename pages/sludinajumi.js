import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function VisiSludinajumi() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSludinajumi() {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .order('created_at', { ascending: false });
      
      console.log('Data:', data, 'Error:', error); // Debug F12
      if (error) console.error(error);
      else setSludinajumi(data || []);
      setLoading(false);
    }
    fetchSludinajumi();
  }, []);

  if (loading) return <div>Ielādē...</div>;
  if (sludinajumi.length === 0) return <div>Nav sludinājumu</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Visi Sludinājumi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sludinajumi.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-xl mb-2">{item.nosaukums || item.title}</h3>
              <p className="text-gray-600 mb-4">{item.apraksts || item.description}</p>
              <div className="text-2xl font-bold text-green-600 mb-4">
                {item.cena || item.price}€
              </div>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {item.kategorija || item.category}
              </span>
              <Link href={`/sludinajums/${item.id}`} className="block mt-4 bg-blue-600 text-white py-3 rounded-lg text-center font-bold">
                Skatīt vairāk
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
