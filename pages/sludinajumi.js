import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Sludinajumi() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*');

      if (error) console.log('Kļūda:', error);
      else setItems(data);
      
      setLoading(false);
    }

    fetchItems();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <Head>
        <title>Sludinājumi - TechVibe</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Visi Sludinājumi</h1>
            <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Atpakaļ
            </Link>
        </div>

        {loading ? (
           <p className="text-center">Lādējas...</p>
        ) : items.length === 0 ? (
           <p className="text-center text-gray-500">Pagaidām nav neviena sludinājuma.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover rounded-md mb-4"/>
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">Nav bildes</div>
                )}
                <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-blue-600 font-bold text-lg">{item.price} €</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600">{item.city}</span>
                </div>
                <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Skatīt</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
