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
// PIEVIENO BEIGĀS pirms </div>
<script dangerouslySetInnerHTML={{
  __html: `
    console.log('🔍 AUTO DEBUG START');
    console.log('ENV URL:', typeof process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('ENV KEY:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    fetch('/api/debug-env')
      .then(r => r.json())
      .then(data => {
        document.getElementById('debug').textContent = JSON.stringify(data, null, 2);
        console.log('ENV CHECK:', data);
      })
      .catch(e => console.error('API error:', e));
  `
}}/>
