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
    <div style={{minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', color: '#1e293b', fontFamily: 'system-ui'}}>
      
      {/* HERO - VIDĒJS attēls kā ss.lv */}
      <section style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 24px'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start'}}>
          
          {/* Galvenais attēls */}
          <div>
            <img 
              src={images[0] || 'https://via.placeholder.com/800x600/f0f9ff/64748b?text=AUDI'} 
              style={{width: '100%', height: '500px', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}
              alt="Galvenais"
            />
          </div>

          {/* Cena + pamatinfo */}
          <div style={{background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)'}}>
            <div style={{fontSize: '3.5rem', fontWeight: 900, color: '#059669', marginBottom: '16px', textAlign: 'center'}}>
              {sludinajums?.price || 'Cena'} €
            </div>
            <div style={{fontSize: '1.2rem', marginBottom: '24px', opacity: 0.8, textAlign: 'center'}}>
              ID: {params.id} • {images.length} foto
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', fontWeight: 700, color: '#3b82f6'}}>{sludinajums?.power || '?'}</div>
                <div style={{fontSize: '0.9rem', color: '#64748b'}}>ZS</div>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', fontWeight: 700, color: '#10b981'}}>{sludinajums?.fuel || '?'}</div>
                <div style={{fontSize: '0.9rem', color: '#64748b'}}>l/100km</div>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2.5rem', fontWeight: 700, color: '#f59e0b'}}>{sludinajums?.year || '?'}</div>
                <div style={{fontSize: '0.9rem', color: '#64748b'}}>Gads</div>
              </div>
            </div>
            <button style={{width: '100%', background: 'linear-gradient(45deg, #059669, #10b981)', color: 'white', padding: '20px', fontSize: '1.3rem', fontWeight: 700, borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(5,150,105,0.3)'}}>
              📞 Sazināties +371 29 *** ***
            </button>
          </div>
        </div>
      </section>

      <div style={{maxWidth: '1200px', margin: '0 auto 60px', padding: '0 24px'}}>
        
        {/* Galerija BLOKI kā ss.lv */}
        <section style={{background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', marginBottom: '40px'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: '32px', color: '#1e293b'}}>🖼️ Foto galerija</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px'}}>
            {images.slice(1).map((img, i) => (
              <div key={i} style={{background: '#f1f5f9', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', cursor: 'pointer'}}>
                <img 
                  src={img} 
                  style={{width: '100%', aspectRatio: '4/3', objectFit: 'cover'}} 
                  alt={`Foto ${i+1}`}
                />
                <div style={{padding: '16px', textAlign: 'center'}}>
                  <div style={{fontWeight: 600, color: '#475569'}}>Foto {i+2}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Apraksts */}
        <section style={{background: 'white', borderRadius: '16px', padding: '40px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 700, marginBottom: '24px', color: '#1e293b'}}>📝 Pilns apraksts</h2>
          <div style={{fontSize: '1.2rem', lineHeight: 1.7, color: '#475569', whiteSpace: 'pre-wrap'}}>
            {sludinajums?.description || 'Apraksts šeit...'}
          </div>
        </section>
      </div>
    </>
  );
}
