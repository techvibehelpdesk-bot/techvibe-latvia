'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AutoPage() {
  const [data, setData] = useState('TESTĒJAM...');
  const [sludinajumi, setSludinajumi] = useState([]);

  useEffect(() => {
    // TEST 1: ENV keys?
    console.log('🔑 URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'OK' : 'TRŪKST!');
    console.log('🔑 KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'OK' : 'TRŪKST!');
    
    // TEST 2: Supabase connect
    if (typeof window !== 'undefined') {
      import('@supabase/supabase-js').then(({ createClient }) => {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        
        const supabase = createClient(supabaseUrl, supabaseAnonKey);
        
        // TEST 3: VISI dati bez filtra
        supabase
          .from('sludinajumi')
          .select('id, title, category, status')
          .then(({ data, error }) => {
            console.table('📊 VISI DATI:', data);
            console.log('❌ ERROR?', error);
            setData(`Rindu: ${data?.length || 0}`);
            setSludinajumi(data || []);
          });
      });
    }
  }, []);

  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-5xl font-black mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        🚗 Auto DEBUG
      </h1>
      
      {/* DEBUG INFO */}
      <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-2xl mb-8">
        <h3 className="font-bold text-xl mb-4">Status:</h3>
        <pre className="text-sm bg-white p-4 rounded-xl font-mono">{data}</pre>
        <p className="text-yellow-800 mt-2">F12 Console → "📊 VISI DATI" tabula!</p>
      </div>

      {sludinajumi.map((s) => (
        <div key={s.id} className="bg-white p-6 rounded-2xl shadow-lg mb-4 border-l-4 border-blue-500">
          <h3 className="font-bold text-2xl">{s.title}</h3>
          <p>Category: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{s.category}</span></p>
          <p>Status: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{s.status}</span></p>
        </div>
      ))}
      
      <Link href="/ievietot" className="mt-8 inline-block bg-green-500 text-white px-8 py-4 rounded-2xl font-bold">
        ➕ Ievietot
      </Link>
    </main>
  );
}
