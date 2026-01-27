export default function Sludinajums({ params }) {
  return (
    <div style={{
      padding: '80px 20px',
      minHeight: '100vh',
      background: '#f8fafc',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        padding: '60px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '3rem', 
          color: '#1e293b',
          marginBottom: '20px' 
        }}>
          SLUDINĀJUMS #{params.id}
        </h1>
        <p style={{ 
          fontSize: '1.5rem', 
          color: '#64748b',
          marginBottom: '40px' 
        }}>
          TechVibe sludinājumi darbojas!
        </p>
        <div style={{
          fontSize: '4rem',
          color: '#059669',
          marginBottom: '30px'
        }}>
          💰 299€
        </div>
        <a href="/sludinājumi" style={{
          display: 'inline-block',
          padding: '15px 40px',
          background: '#3b82f6',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '12px',
          fontSize: '1.3rem',
          fontWeight: 'bold'
        }}>
          ← Visi sludinājumi
        </a>
      </div>
    </div>
  );
}
