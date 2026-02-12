export default function AutoMinimal() {
  return (
    <div style={{minHeight: '100vh', padding: '100px', background: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <h1 style={{fontSize: '3rem', color: '#1e40af', marginBottom: '20px'}}>🚗 AUTO LAPA OK!</h1>
      <p style={{fontSize: '1.5rem', color: '#475569'}}>Supabase fetch nākamais solis.</p>
      <details style={{marginTop: '30px', padding: '20px', background: 'white', borderRadius: '12px', border: '2px solid #e2e8f0'}}>
        <summary style={{cursor: 'pointer', fontWeight: 'bold'}}>Debug info (F12 Console)</summary>
        <pre id="debug" style={{fontSize: '14px', color: '#64748b'}}>Spied F12!</pre>
      </details>
    </div>
  )
}
