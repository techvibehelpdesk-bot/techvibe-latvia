export default function SludinajumsPage(props) {
  // DROŠA params apstrāde
  const id = props.params?.id || 'TEST-DEMO';
  
  return (
    <div style={{
      padding: '60px 20px',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto 0 auto',
        padding: '60px 40px',
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          marginBottom: '1rem',
          textShadow: '0 8px 32px rgba(0,0,0,0.4)'
        }}>
          🎉 SLUDINĀJUMS #{id}
        </h1>
        
        <p style={{
          fontSize: '1.5rem',
          marginBottom: '3rem',
          opacity: 0.95,
          lineHeight: 1.6
        }}>
          TechVibe sludinājumi strādā perfekt!
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem',
          maxWidth: '600px',
          margin: '0 auto 4rem auto'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '2rem',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>💰</div>
            <div style={{fontSize: '1.8rem', fontWeight: 'bold'}}>299€</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '2rem',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>📱</div>
            <div style={{fontSize: '1.8rem', fontWeight: 'bold'}}>+371 2933 4455</div>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '2rem',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}>
            <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>📍</div>
            <div style={{fontSize: '1.8rem', fontWeight: 'bold'}}>Rīga</div>
          </div>
        </div>
        
        <a href="/sludinājumi" style={{
          display: 'inline-block',
          padding: '18px 50px',
          background: 'rgba(255,255,255,0.9)',
          color: '#667eea',
          textDecoration: 'none',
          borderRadius: '50px',
          fontSize: '1.4rem',
          fontWeight: '800',
          boxShadow: '0 15px 35px rgba(0,0,0,0.2)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-8px)';
          e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.3)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.2)';
        }}>
          👈 Atpakaļ uz sludinājumiem
        </a>
        
        <div style={{
          marginTop: '3rem',
          padding: '1rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          fontSize: '0.9rem',
          opacity: 0.8
        }}>
          app/sludinājumi/[id]/page.js ✓ Deploy OK
        </div>
      </div>
    </div>
  );
}
