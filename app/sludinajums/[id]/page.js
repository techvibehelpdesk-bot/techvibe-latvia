import { createClient } from '@supabase/supabase-js';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function SludinajumaLapa({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: sludinajums } = await supabase
    .from('sludinajumi')
    .select('*')
    .eq('id', params.id)
    .single();

  // *** TESTS - redzēsi Browser DevTools Console ***
  console.log('SLUDINAJUMS DATI:', sludinajums);
  console.log('ATTĒLI:', sludinajums?.image_public_urls);

  const images = Array.isArray(sludinajums?.image_public_urls) ? sludinajums.image_public_urls : ['https://via.placeholder.com/800x600/red/ffffff?text=AUDI'];

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e1e1e 0%, #000 100%)',
      color: 'white',
      minHeight: '100vh',
      padding: '50px',
      fontFamily: 'system-ui'
    }}>
      <div style={{textAlign: 'center', marginBottom: '50px'}}>
        <h1 style={{fontSize: '64px', background: 'linear-gradient(45deg, #ff4444, #ffaa00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
          🎉 JAUNS DIZAINS STRĀDĀ!
        </h1>
        <p style={{fontSize: '28px'}}>ID: {params.id}</p>
        <p style={{fontSize: '36px', color: '#00ff88'}}>{sludinajums?.price || 'CENA?'}€</p>
      </div>

      {/* Galvenais attēls */}
      <div style={{marginBottom: '40px'}}>
        <img 
          src={images[0]} 
          style={{width: '100%', height: '500px', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 32px 64px rgba(0,0,0,0.5)'}}
          alt="Auto"
        />
      </div>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', maxWidth: '1400px', margin: '0 auto'}}>
        <div style={{background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', padding: '40px', borderRadius: '24px'}}>
          <h2 style={{fontSize: '32px', marginBottom: '24px'}}>📊 Specs</h2>
          <div style={{fontSize: '24px'}}>
            <div>⚡ {sludinajums?.power || '?'} ZS</div>
            <div>⛽ {sludinajums?.fuel || '?'} l/100km</div>
            <div>📅 {sludinajums?.year || '?'} gads</div>
          </div>
        </div>

        <div style={{background: 'rgba(255,68,68,0.2)', backdropFilter: 'blur(20px)', padding: '40px', borderRadius: '24px'}}>
          <h2 style={{fontSize: '32px', marginBottom: '24px'}}>📞 Kontakti</h2>
          <button style={{
            width: '100%', 
            background: 'linear-gradient(45deg, #ff4444, #ff8800)', 
            color: 'white', 
            padding: '20px', 
            fontSize: '24px', 
            fontWeight: 'bold', 
            borderRadius: '16px',
            border: 'none',
            cursor: 'pointer'
          }}>
            Zvanīt +371 29 *** ***
          </button>
        </div>
      </div>

      <div style={{maxWidth: '800px', margin: '60px auto', background: 'rgba(255,255,255,0.05)', padding: '40px', borderRadius: '24px', backdropFilter: 'blur(20px)'}}>
        <h2 style={{fontSize: '32px', marginBottom: '24px', textAlign: 'center'}}>📝 Apraksts</h2>
        <pre style={{fontSize: '18px', whiteSpace: 'pre-wrap'}}>{sludinajums?.description || 'Loading...'}</pre>
      </div>
    </div>
  );
}
