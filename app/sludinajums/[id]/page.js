export default function Sludinajums({ params }) {
  return (
    <div style={{padding: '50px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', color: 'white'}}>
      <div style={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
        <h1 style={{fontSize: '4rem', marginBottom: '20px'}}>
          🎉 SLUDINĀJUMS #{params.id || 'demo'}
        </h1>
        <p style={{fontSize: '2rem', marginBottom: '40px'}}>
          TechVibe strādā! Pareiza struktūra ✅
        </p>
        <div style={{background: 'white', color: 'black', padding: '30px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '20px'}}>💰 Cena: 299€</h2>
          <p style={{fontSize: '1.5rem'}}>📞 +371 2933 4455</p>
          <p style={{fontSize: '1.2rem', marginTop: '10px'}}>📍 Rīga</p>
        </div>
        <a href="/sludinajumi" style={{display: 'inline-block', marginTop: '40px', padding: '15px 30px', background: 'white', color: '#667eea', textDecoration: 'none', borderRadius: '50px', fontSize: '1.5rem', fontWeight: 'bold'}}>
          ← Sludinājumi
        </a>
      </div>
    </div>
  );
}
