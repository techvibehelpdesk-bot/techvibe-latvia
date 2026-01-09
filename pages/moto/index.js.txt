import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Moto() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSludinajumi();
  }, []);

  const fetchSludinajumi = async () => {
    try {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('category', 'moto')
        .eq('status', 'publicēts')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSludinajumi(data || []);
    } catch (error) {
      console.error('Kļūda ielādējot moto:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, #fefce8, #fde047)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.5rem', fontWeight: 'bold'
      }}>
        🏍️ Ielādē moto sludinājumus...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>🏍️ Moto transports - TechVibe.lv</title>
        <meta name="description" content="Motocikli, skūteri, kvadracikli - pērc Rīgā un Latvijā!" />
      </Head>

      {/* HEADER */}
      <header style={{
        background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 50
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Link href="/" style={{
              fontSize: '1.75rem', fontWeight: 'bold', 
              background: 'linear-gradient(to right, #ea580c, #c2410c)', 
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              TechVibe.lv
            </Link>
            <div style={{display: 'flex', gap: '1rem'}}>
              <Link href="/kategorijas" style={{color: '#6b7280', fontWeight: 500}}>Kategorijas</Link>
              <Link href="/izsole" style={{color: '#6b7280', fontWeight: 500}}>Izsoles</Link>
              <Link href="/ievietot" style={{
                background: '#ea580c', color: 'white', padding: '0.5rem 1.5rem', 
                borderRadius: '0.5rem', fontWeight: 600, textDecoration: 'none'
              }}>
                ➕ Pievienot
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div style={{
        minHeight: 'calc(100vh - 140px)', 
        background: 'linear-gradient(to bottom right, #fefce8, #fde047)', 
        padding: '2rem 1rem'
      }}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          {/* TITLE */}
          <div style={{marginBottom: '3rem', textAlign: 'center'}}>
            <h1 style={{
              fontSize: '3rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              🏍️ Moto transports
            </h1>
            <p style={{fontSize: '1.25rem', color: '#6b7280'}}>
              {sludinajumi.length} motociklu, skūteru un kvadraciklu sludinājumi Rīgā un Latvijā
            </p>
          </div>

          {sludinajumi.length === 0 ? (
            <div style={{textAlign: 'center', padding: '5rem 2rem'}}>
              <div style={{fontSize: '6rem', marginBottom: '2rem'}}>🏍️</div>
              <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem'}}>
                Vēl nav moto sludinājumu
              </h2>
              <p style={{fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem'}}>
                Esi pirmais! Pievieno savu motocikli vai skūteri.
              </p>
              <Link href="/ievietot" style={{
                background: '#ea580c', color: 'white', padding: '1rem 2.5rem', 
                borderRadius: '1rem', fontSize: '1.25rem', fontWeight: 600, 
                textDecoration: 'none', boxShadow: '0 10px 20px rgba(234,88,12,0.3)'
              }}>
                ➕ Gass uz riteņiem! Ievietot sludinājumu
              </Link>
            </div>
          ) : (
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '2rem', marginBottom: '3rem'
            }}>
              {sludinajumi.map((sludinajums) => (
                <Link 
                  key={sludinajums.id} 
                  href={`/sludinajums/${sludinajums.id}`}
                  style={{
                    background: 'white', borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    overflow: 'hidden', textDecoration: 'none', display: 'block',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
                    e.currentTarget.style.transform = 'translateY(-8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    height: '200px', background: 'linear-gradient(135deg, #ea580c, #c2410c)', 
                    position: 'relative', overflow: 'hidden'
                  }}>
                    {sludinajums.image_url ? (
                      <img src={sludinajums.image_url} alt={sludinajums.title} 
                           style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    ) : (
                      <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        fontSize: '3rem', opacity: 0.8
                      }}>
                        🏍️
                      </div>
                    )}
                  </div>
                  <div style={{padding: '1.5rem'}}>
                    <h3 style={{fontWeight: 'bold', fontSize: '1.25rem', color: '#1f2937', marginBottom: '0.5rem'}}>
                      {sludinajums.title}
                    </h3>
                    {sludinajums.description && (
                      <p style={{color: '#6b7280', marginBottom: '1rem', fontSize: '0.95rem'}}>
                        {sludinajums.description.slice(0, 100)}...
                      </p>
                    )}
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{fontSize: '1.75rem', fontWeight: 'bold', color: '#ea580c'}}>
                        {sludinajums.price ? sludinajums.price.toLocaleString('lv-LV') + ' €' : 'Sazinies'}
                      </span>
                      <span style={{fontSize: '0.875rem', color: '#9ca3af', fontWeight: 500}}>
                        {new Date(sludinajums.created_at).toLocaleDateString('lv-LV')}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        background: 'white', borderTop: '1px solid #e5e7eb', padding: '2rem', textAlign: 'center'
      }}>
        <p style={{color: '#6b7280', margin: 0}}>
          © 2026 TechVibe.lv - Ātrākais sludinājumu portāls Latvijā 🏍️🚀
        </p>
      </footer>
    </>
  );
}
