import Link from 'next/link';
import Head from 'next/head';

export default function Kategorijas() {
  const kategorijas = [
    // Transports (ss.com TOP)
    { href: '/auto', emoji: '🚗', nosaukums: 'Auto', skaits: '5,247' },
    { href: '/moto', emoji: '🏍️', nosaukums: 'Moto transports', skaits: '1,892' },
    { href: '/velosipedi', emoji: '🚲', nosaukums: 'Velosipēdi', skaits: '856' },
    
    // Nekustamie īpašumi
    { href: 'dzivokli', emoji: '🏢', nosaukums: 'Dzīvokļi', skaits: '2,347' },
    { href: '/majas', emoji: '🏠', nosaukums: 'Mājas, vasarnīcas', skaits: '1,128' },
    
    // Celtniecība & Mājai
    { href: '/mebeles', emoji: '🛋️', nosaukums: 'Mēbeles', skaits: '3,456' },
    { href: '/buvmateriali', emoji: '🔨', nosaukums: 'Būvmateriāli', skaits: '2,789' },
    
    // Elektrotehnika
    { href: '/telefoni', emoji: '📱', nosaukums: 'Telefoni', skaits: '2,847' },
    { href: '/datori', emoji: '💻', nosaukums: 'Datori', skaits: '1,592' },
    { href: '/tv-audio', emoji: '📺', nosaukums: 'TV, Audio', skaits: '1,234' },
    
    // Darbs & Bizness
    { href: '/darbs', emoji: '💼', nosaukums: 'Darbs', skaits: '8,742' },
    { href: '/vakances', emoji: '📋', nosaukums: 'Vakances', skaits: '3,282' },
    
    // Citas ss.com kategorijas
    { href: '/berniem', emoji: '👶', nosaukums: 'Bērniem', skaits: '4,567' },
    { href: '/dazadi', emoji: '🔄', nosaukums: 'Dažādi', skaits: '12,345' },
  ];

  return (
    <>
      <Head><title>Visas kategorijas - TechVibe.lv</title></Head>
      <div style={{minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)', padding: '2rem 1rem'}}>
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h1 style={{fontSize: '3.5rem', fontWeight: 'bold', color: '#111827'}}>🏷️ Visas kategorijas</h1>
            <p style={{fontSize: '1.375rem', color: '#6b7280'}}>Kā ss.com – izvēlies sadaļu Rīgas sludinājumiem</p>
          </div>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem'}}>
            {kategorijas.map((kat, index) => (
              <Link 
                key={kat.nosaukums}
                href={kat.href}
                style={{
                  display: 'block', textDecoration: 'none',
                  background: 'white', borderRadius: '1.25rem', padding: '2.5rem 1.5rem',
                  boxShadow: '0 10px 25px -3px rgba(0,0,0,0.1)', transition: 'all 0.4s',
                  textAlign: 'center', position: 'relative', overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 30px 60px -12px rgba(0,0,0,0.25)';
                  e.currentTarget.style.transform = 'translateY(-8px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0,0,0,0.1)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{fontSize: '4rem', marginBottom: '1.25rem'}}>{kat.emoji}</div>
                <h3 style={{fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.75rem'}}>
                  {kat.nosaukums}
                </h3>
                <p style={{color: '#10b981', fontWeight: '700', fontSize: '1.5rem'}}>
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
