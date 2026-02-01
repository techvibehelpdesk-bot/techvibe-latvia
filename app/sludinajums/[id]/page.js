import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  const images = Array.isArray(sludinajums?.image_public_urls) ? sludinajums.image_public_urls : [];

  return (
    <>
      {/* SARKANĀ DIAGNOZE - DZĒS PĒC OK */}
      <div style={{position: 'fixed', top: 0, left: 0, zIndex: 99999, background: '#ef4444', color: 'white', padding: '16px', fontWeight: 'bold', boxShadow: '0 4px 20px rgba(0,0,0,0.5)'}}>
        ✅ V3.0 • Images: {images.length} • Cena: {sludinajums?.price || 'N/A'}
      </div>

      <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0033 50%, #000 100%)', color: 'white', fontFamily: 'system-ui, sans-serif', paddingTop: '80px'}}>
        
        {/* HERO */}
        <section style={{position: 'relative', height: '100vh', overflow: 'hidden'}}>
          <img 
            src={images[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2000&fit=crop'} 
            style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)'}}
            alt="Galvenais foto"
          />
          <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 32px', background: 'linear-gradient(transparent 20%, rgba(0,0,0,0.85) 80%)'}}>
            <h1 style={{fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900, marginBottom: '24px', background: 'linear-gradient(45deg, #ff4757, #ffa502, #ff6348)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 8px 32px rgba(0,0,0,0.8)'}}>
              {sludinajums?.title || 'Premium Auto'}
            </h1>
            <div style={{fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', marginBottom: '32px', display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center'}}>
              <span>{sludinajums?.year || '2024'}</span>
              <span style={{color: '#00ff88', fontWeight: 800, fontSize: '1.4em'}}>{sludinajums?.price || 'Cena'}€</span>
              <span>{sludinajums?.power || '250'} ZS</span>
            </div>
          </div>
        </section>

        <div style={{maxWidth: '1600px', margin: '0 auto', padding: '80px 24px'}}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '64px', '@media (min-width: 1024px)': {gridTemplateColumns: '2fr 1fr'}}}}>
            
            {/* Galerija */}
            <section>
              <h2 style={{fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '48px', textAlign: 'center', opacity: 0.95}}>
                🖼️ Foto Galerija ({images.length})
              </h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px'}}>
                {images.slice(1).map((img, i) => (
                  <div key={i} style={{cursor: 'pointer', transition: 'all 0.4s ease', transform: 'scale(1)', ':hover': {transform: 'scale(1.05)'}}}>
                    <img 
                      src={img || `https://via.placeholder.com/400x400/222/aaa?text=F${i+1}`} 
                      style={{width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', transition: 'all 0.4s ease'}}
                      alt={`Foto ${i+2}`}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Sidebar */}
            <aside style={{position: 'sticky', top: '32px'}}>
              
              {/* Specs */}
              <div style={{background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '48px 32px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '32px', transition: 'all 0.3s ease'}}>
                <h3 style={{fontSize: '2.5rem', fontWeight: 900, marginBottom: '36px', textAlign: 'center'}}>⚙️ Specs</h3>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '24px', textAlign: 'center'}}>
                  <div>
                    <div style={{fontSize: '3.5rem', fontWeight: 900, color: '#ff6b6b'}}>{sludinajums?.power || '?'}</div>
                    <div style={{fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7}}>ZS</div>
                  </div>
                  <div>
                    <div style={{fontSize: '3.5rem', fontWeight: 900, color: '#4fc3f7'}}>{sludinajums?.fuel || '?'}</div>
                    <div style={{fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7}}>l/100km</div>
                  </div>
                  <div>
                    <div style={{fontSize: '3.5rem', fontWeight: 900, color: '#51cf66'}}>{sludinajums?.year || '?'}</div>
                    <div style={{fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.7}}>Gads</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div style={{background: 'linear-gradient(135deg, rgba(76,175,80,0.2) 0%, rgba(46,125,50,0.3) 100%)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '48px 32px', border: '2px solid rgba(76,175,80,0.4)', textAlign: 'center'}}>
                <h3 style={{fontSize: '2rem', fontWeight: 900, marginBottom: '24px', color: '#a8e6cf'}}>📞 Kontakti</h3>
                <div style={{fontSize: '3.5rem', fontWeight: 900, marginBottom: '36px', color: '#c8e6c9'}}>+371 29 *** ***</div>
                <button style={{
                  width: '100%', 
                  background: 'linear-gradient(45deg, #4caf50, #66bb6a)', 
                  color: 'white', 
                  padding: '24px 32px', 
                  fontSize: '1.5rem', 
                  fontWeight: 900, 
                  borderRadius: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 12px 32px rgba(76,175,80,0.4)',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 16px 48px rgba(76,175,80,0.6)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 12px 32px rgba(76,175,80,0.4)';
                }}>
                  🚀 Sazināties
                </button>
              </div>
            </aside>
          </div>

          {/* Apraksts */}
          <section style={{maxWidth: '1000px', margin: '120px auto 60px', background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(24px)', borderRadius: '32px', padding: '80px 64px', border: '1px solid rgba(255,255,255,0.08)'}}>
            <h2 style={{fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '48px', textAlign: 'center', opacity: 0.95}}>📖 Pilns apraksts</h2>
            <div style={{fontSize: '1.4rem', lineHeight: 1.8, whiteSpace: 'pre-wrap', color: '#e0e0e0'}}>
              {sludinajums?.description || 'Detalizēts apraksts tiks pievienots...'}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
