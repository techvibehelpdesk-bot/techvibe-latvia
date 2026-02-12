export default function AutoPage() {
  return (
    <div style={{
      minHeight: '100vh', 
      padding: '100px 20px', 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)', 
      color: 'white', 
      textAlign: 'center', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui'
    }}>
      <h1 style={{fontSize: '4.5rem', marginBottom: '1rem', textShadow: '0 4px 20px rgba(0,0,0,0.3)'}}>
        🚗 AUTO LAPA STRĀDĀ! ✅
      </h1>
      <p style={{fontSize: '2rem', opacity: 0.9}}>
        Tagad pievienosim Supabase!
      </p>
      <div style={{
        marginTop: '3rem', 
        padding: '2rem', 
        background: 'rgba(255,255,255,0.1)', 
        borderRadius: '20px', 
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)'
      }}>
        <strong>Status:</strong> Pages Router OK | Supabase nākamais
      </div>
    </div>
  )
}
