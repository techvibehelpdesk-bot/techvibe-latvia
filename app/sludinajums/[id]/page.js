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
      {/* DIAGNOZE */}
      <div style={{position: 'fixed', top: 0, left: 0, zIndex: 99999, background: '#dc2626', color: 'white', padding: '16px', fontWeight: 'bold'}}>
        ✅ V4.0 • Images: {images.length}
      </div>

      <div style={{minHeight: '100vh', paddingTop: '80px', background: 'linear-gradient(135deg, #0f0f23 0%, #1a0033 50%, #000 100%)', color: 'white'}}>
        
        {/* HERO */}
        <section style={{position: 'relative', height: '100vh'}}>
          <img 
            src={images[0] || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2000'} 
            style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4)'}}
            alt="Auto"
          />
          <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 40px', background: 'rgba(0,0,0,0.7)'}}>
            <h1 style={{fontSize: 'clamp(3rem, 10vw, 7rem)', fontWeight: 900, marginBottom: '32px', background: 'linear-gradient(45deg, #ff4757, #ffa502)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              {sludinajums?.title}
            </h1>
            <div style={{fontSize: 'clamp(1.5rem, 5vw, 3rem)', marginBottom: '40px'}}>
              <span style={{color: '#10b981', fontWeight: 800, fontSize: '1.3em'}}>{sludinajums?.price}€</span>
            </div>
            <div style={{fontSize: '1.8rem', opacity: 0.9}}>
              {sludinajums?.year} • {sludinajums?.power}ZS • {images.length} foto
            </div>
          </div>
        </section>

        {/* GALVENĀ SATURA LAUKS */}
        <div style={{maxWidth: '1400px', margin: '0 auto', padding: '80px 24px'}}>
          
          <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '60px'}}>
            
            {/* Galerija */}
            <section>
              <h2 style={{fontSize: '3.5rem', fontWeight: 900, marginBottom: '48px', textAlign: 'center', opacity: 0.95}}>
                🖼️ Galerija
              </h2>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px'}}>
                {images.slice(1, 13).map((img, i) => (
                  <img 
                    key={i}
                    src={img} 
                    style={{width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', cursor: 'pointer'}}
                    alt={`Foto ${i+1}`}
                  />
                ))}
              </div>
            </section>

            {/* Specs + CTA */}
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', '@media(max-width: 768px)': {gridTemplateColumns: '1fr'}}}>
              
              {/* Specs */}
              <div style={{background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', padding: '48px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.2)'}}>
                <h3 style={{fontSize: '2.5rem', marginBottom: '32px', textAlign: 'center'}}>⚙️ Specs</h3>
                <div style={{display: 'grid', gap: '24px', textAlign: 'center'}}>
                  <div><div style={{fontSize: '4rem', fontWeight: 900, color: '#f59e0b'}}>{sludinajums?.power}</div><div style={{fontSize: '1rem', opacity: 0.8}}>ZS</div></div>
                  <div><div style={{fontSize: '4rem', fontWeight: 900, color: '#06b6d4'}}>{sludinajums?.fuel}</div><div style={{fontSize: '1rem', opacity: 0.8}}>l/100km</div></div>
                  <div><div style={{fontSize: '4rem', fontWeight: 900, color: '#10b981'}}>{sludinajums?.year}</div><div style={{fontSize: '1rem', opacity: 0.8}}>Gads</div></div>
                </div>
              </div>

              {/* CTA */}
              <div style={{background: 'rgba(16,185,129,0.2)', backdropFilter: 'blur(20px)', padding: '48px', borderRadius: '24px', border: '2px solid rgba(16,185,129,0.4)', textAlign: 'center'}}>
                <h3 style={{fontSize: '2rem', marginBottom: '24px'}}>📞 Sazinies</h3>
                <div style={{fontSize: '3rem', fontWeight: 900, marginBottom: '32px'}}>+371 29 *** ***</div>
                <button style={{width: '100%', background: 'linear-gradient(45deg, #10b981, #34d399)', color: 'white', padding: '24px', fontSize: '1.5rem', fontWeight: 900, borderRadius: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 12px 40px rgba(16,185,129,0.4)'}}>
                  🚀 Zvanīt tagad
                </button>
              </div>
            </div>

            {/* Apraksts */}
            <section style={{background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', padding: '64px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.1)'}}>
              <h2 style={{fontSize: '3.5rem', marginBottom: '40px', textAlign: 'center'}}>📝 Apraksts</h2>
              <div style={{fontSize: '1.3rem', lineHeight: 1.8, whiteSpace: 'pre-wrap'}}>
                {sludinajums?.description || 'Detalizēts apraksts...'}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
