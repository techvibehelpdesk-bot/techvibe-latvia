import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Telefoni() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('sludinajumi')
      .select('*')
      .eq('category', 'telefoni')
      .eq('status', 'publicēts')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setSludinajumi(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Ielādē telefoni...</p>;

  return (
    <div style={{padding: '50px', background: 'linear-gradient(to right, #9333ea, #3b82f6)', color: 'white', minHeight: '100vh'}}>
      <h1 style={{fontSize: '48px', textAlign: 'center'}}>📱 TELEFONI ({sludinajumi.length})</h1>
      {sludinajumi.map((s) => (
        <div key={s.id} style={{background: 'white', color: 'black', margin: '20px', padding: '20px', borderRadius: '10px'}}>
          <h3>{s.nosaukums}</h3>
          <p>Cena: {s.cena}€</p>
          <Link href={`/sludinajums/${s.id}`}>Skatīt</Link>
        </div>
      ))}
    </div>
  );
}
