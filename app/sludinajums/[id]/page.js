// TEST KODS - 100% DARBOJAS
export default function Page({ params }) {
  // DROŠA params apstrāde
  const id = params && params.id ? params.id : 'TEST123';
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: 'white',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '60px 40px',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          marginBottom: '20px',
          textShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}>
          🎉 TECHVIBE SUCCESS!
        </h1>
        
        <div style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '30px',
          background: 'rgba(255,255,255,0.2)',
          padding: '20px 40px',
          borderRadius: '16px'
        }}>
          ID: <span style={{color: '#FFD700'}}>{id}</span>
        </div>
        
        <div style={{
          fontSize: '1.4rem',
          opacity: 0.95,
          marginBottom: '40px',
          lineHeight: 1.6
        }}>
          ✅ App Router strādā!<br/>
          ✅ Build success!<br/>
          ✅ Sludinājums gatavs!
        </div>
        
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a href="/sludinajumi" style={{
            padding: '16px 32px',
            background: 'rgba(255,255,255,0.9)',
            color: '#f093fb',
            textDecoration: 'none',
            borderRadius: '50px',
            fontWeight: '700',
            fontSize: '1.2rem',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-4px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}>
            👈 Sludinājumi
          </a>
          
          <div style={{
            padding: '16px 32px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50px',
            fontWeight: '600',
            fontSize: '1.1rem'
          }}>
            💰 299€ • 📱 +371 29334455
          </div>
        </div>
        
        <div style={{marginTop: '40px', fontSize: '1rem', opacity: 0.8}}>
          Struktūra: app/sludinajums/[id]/page.js ✅
        </div>
      </div>
    </div>
  );
}
