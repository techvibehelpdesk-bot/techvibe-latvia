import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Auto() {
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
        .eq('category', 'Auto')  // ✅ category string
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSludinajumi(data || []);
    } catch (error) {
      console.error('Kļūda ielādējot auto sludinājumus:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{minHeight: '100vh', background: 'linear-gradient(to bottom right, #fef3c7, #fde68a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem'}}>🚗 Ielādē auto sludinājumus...</div>;
  }

  return (
    <>
      <Head>
        <title>🚗 Auto - TechVibe.lv</title>
      </Head>
      <div style={{minHeight: '100vh', background: 'linear-gradient(to bottom right, #fef3c7, #fde68a)', padding: '2rem 1rem'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
            <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem'}}>🚗 Auto</h1>
            <p style={{fontSize: '1.25rem', color: '#6b7280', marginBottom: '1rem'}}>
              {sludinajumi.length} auto sludinājumi Rīgai un Latvijai
            </p>
            <Link href="/ievietot" style={{
              background: '#059669', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.75rem', 
              fontWeight: '600', textDecoration: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}>
              ➕ Ievietot auto sludinājumu
            </Link>
          </div>

          {sludinajumi.length === 0 ? (
            <div style={{textAlign: 'center', padding: '5rem 1rem'}}>
              <div style={{fontSize: '4rem', marginBottom: '1rem'}}>🚗</div>
              <h2 style={{fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem'}}>
                Vēl nav auto sludinājumu
              </h2>
              <Link href="/ievietot" style={{background: '#059669', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.75rem', fontWeight: '600', textDecoration: 'none'}}>
                Būt pirmais!
              </Link>
            </div>
          ) : (
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem'}}>
              {sludinajumi.map((sludinajums) => {
                // Parse images_url ja JSON/string
                const images = sludinajums.images_url ? 
                  (typeof sludinajums.images_url === 'string' ? JSON.parse(sludinajums.images_url) : sludinajums.images_url) : 
                  [];
                
                return (
                  <div key={sludinajums.id} style={{
                    background: 'white', borderRadius: '1rem', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    transition: 'all 0.3s', overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.25)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  >
                    <div style={{height: '12rem', background: 'linear-gradient(to right, #3b82f6, #1d4ed8)', position: 'relative', overflow: 'hidden'}}>
                      {images[0] ? (
                        <img src={images[0]} alt={sludinajums.title} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                      ) : (
                        <div style={{width: '100%', height: '100%', background: '#d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <span style={{color: '#6b7280', fontSize: '1.125rem'}}>Nav bildes</span>
                        </div>
                      )}
                    </div>
                    <div style={{padding: '1.5rem'}}>
                      <h3 style={{fontWeight: 'bold', fontSize: '1.25rem', color: '#1f2937', marginBottom: '0.5rem'}}>
                        {sludinajums.title}
                      </h3>
                      <p style={{color: '#6b7280', marginBottom: '1rem', lineHeight: '1.5'}}>
                        {sludinajums.description}
                      </p>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#059669'}}>
                          €{sludinajums.price}
                        </span>
                        <span style={{fontSize: '0.875rem', color: '#6b7280'}}>
                          {new Date(sludinajums.created_at).toLocaleDateString('lv-LV')}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
