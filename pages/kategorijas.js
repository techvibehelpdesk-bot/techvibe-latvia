import Link from 'next/link';
import Head from 'next/head';

export default function Kategorijas() {
  const kategorijas = [
    { href: '/telefoni', emoji: '📱', nosaukums: 'Telefoni', skaits: '2,847' },
    { href: '/auto', emoji: '🚗', nosaukums: 'Auto', skaits: '5,247' },
    { href: '/datori', emoji: '💻', nosaukums: 'Datori', skaits: '1,592' },
    { href: '/mebeles', emoji: '🏠', nosaukums: 'Mēbeles', skaits: '3,128' },
    { href: '/sports', emoji: '⚽', nosaukums: 'Sports', skaits: '2,456' },
    { href: '/darbs', emoji: '💼', nosaukums: 'Darbs', skaits: '8,742' },
  ];

  return (
    <>
      <Head>
        <title>Kategorijas - TechVibe.lv</title>
      </Head>
      <div style={{minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', padding: '2rem 1rem'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h1 style={{fontSize: '3rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem'}}>
              🏷️ Visas kategorijas
            </h1>
            <p style={{fontSize: '1.25rem', color: '#6b7280'}}>
              Izvēlies interesējošo sadaļu – ss.com stils
            </p>
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem'}}>
            {kategorijas.map((kat) => (
              <Link 
                key={kat.nosaukums}
                href={kat.href}
                style={{
                  display: 'block', textDecoration: 'none',
                  background: 'white', borderRadius: '1rem', padding: '2rem',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s', textAlign: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.25)';
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{kat.emoji}</div>
                <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem'}}>
                  {kat.nosaukums}
                </h3>
                <p style={{color: '#059669', fontWeight: '600', fontSize: '1.25rem'}}>
                  {kat.skaits}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
