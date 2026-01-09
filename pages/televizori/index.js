export default function Televizori() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #facc15 0%, #f97316 50%, #ea580c 100%)',
      minHeight: '100vh',
      padding: '60px 20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      color: '#7f1d1d',
      fontFamily: 'system-ui'
    }}>
      <h1 style={{fontSize: '72px', margin: '0 0 30px'}}>
        📺 TELEVIZORI GATAVI!
      </h1>
      <p style={{fontSize: '36px', maxWidth: '600px'}}>
        Oranžs TV dizains strādā!<br/>
        Nākamais: Supabase + grid
      </p>
    </div>
  );
}
