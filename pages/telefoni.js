import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function Telefoni() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Meklē telefoni...'); // Debug
        const { data, error } = await supabase
          .from('sludinajumi')
          .select('*')
          .eq('category', 'telefoni')
          .eq('status', 'publicēts')
          .order('created_at', { ascending: false });
        console.log('Dati:', data, 'Error:', error); // Debug Console
        if (error) throw error;
        setSludinajumi(data || []);
      } catch (err) {
        console.error('Kļūda:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div style={{padding:50}}>📱 Ielādē telefonus...</div>;
  if (error) return <div>Kļūda: {error}</div>;

  return (
    <div style={{padding: '50px', background: 'linear-gradient(to right, #9333ea, #3b82f6)', color: 'white', minHeight: '100vh'}}>
      <h1 style={{fontSize: '48px', textAlign: 'center', marginBottom: '30px'}}>
        📱 TELEFONI ({sludinajumi.length})
      </h1>
      {sludinajumi.length === 0 ? (
        <p style={{textAlign: 'center', fontSize: '24px'}}>Nav publicēti telefoni. Ievieto caur /ievietot!</p>
      ) : (
        sludinajumi.map((s) => (
          <div key={s.id} style={{background: 'rgba(255,255,255,0.1)', margin: '20px auto', padding: '20px', borderRadius: '10px', maxWidth: '600px'}}>
            <h3>{s.nosaukums}</h3>
            <p>{s.apraksts}</p>
            <p style={{fontSize: '24px', fontWeight: 'bold'}}>💰 {s.cena}€</p>
            <a href={`/sludinajums/${s.id}`} style={{color: 'yellow', fontSize: '18px'}}>Skatīt vairāk →</a>
          </div>
        ))
      )}
    </div>
  );
}
