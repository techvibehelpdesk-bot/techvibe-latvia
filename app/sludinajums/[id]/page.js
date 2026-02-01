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
    <div style={{minHeight: '100vh', background: '#f8fafc'}}>
      
      {/* HERO attēls */}
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '0 20px'}}>
        <img 
          src={images[0]} 
          style={{width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px', marginBottom: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}
          alt="Galvenais"
        />
      </div>

      <div style={{maxWidth: '1200px', margin: '0 auto 60px', padding: '0 20px'}}>
        
        {/* 3 KOLONNAS SPECS kā screenshot */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px'}}>
          
          {/* 1. kolonna */}
          <div style={{background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)'}}>
            <h3 style={{fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px', color: '#1e293b'}}>Izlaiduma gads</h3>
            <div style={{fontSize: '2.8rem', fontWeight: 800, color: '#3b82f6'}}>{sludinajums?.year || '2024'}</div>
            <div style={{fontSize: '0.95rem', color: '#64748b', marginTop: '8px'}}>gads</div>
          </div>

          {/* 2. kolonna */}
          <div style={{background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)'}}>
            <h3 style={{fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px', color: '#1e293b'}}>Dzinējs</h3>
            <div style={{fontSize: '2.8rem', fontWeight: 800, color: '#10b981'}}>{sludinajums?.power || '250'}</div>
            <div style={{fontSize: '0.95rem', color: '#64748b', marginTop: '8px'}}>ZS</div>
          </div>

          {/* 3. kolonna */}
          <div style={{background: 'white', padding: '32px', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)'}}>
            <h3 style={{fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px', color: '#1e293b'}}>Degvielas patēriņš</h3>
            <div style={{fontSize: '2.8rem', fontWeight: 800, color: '#f59e0b'}}>{sludinajums?.fuel || '6.5'}</div>
            <div style={{fontSize: '0.95rem', color: '#64748b', marginTop: '8px'}}>l/100km</div>
          </div>
        </div>

        {/* GALERIJA BLOKI */}
        <div style={{background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: '40px'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '32px', color: '#1e293b'}}>🖼️ Foto</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px'}}>
            {images.slice(1).map((img, i) => (
              <div key={i} style={{borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.1)'}}>
                <img 
                  src={img} 
                  style={{width: '100%', height: '280px', objectFit: 'cover'}} 
                  alt={`Foto ${i+1}`}
                />
                <div style={{padding: '20px', background: '#f8fafc'}}>
                  <div style={{fontWeight: 600, color: '#475569'}}>Foto {i+2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* APRKSTS */}
        <div style={{background: 'white', borderRadius: '20px', padding: '48px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '32px', color: '#1e293b'}}>📝 Detalizēts apraksts</h2>
          <div style={{fontSize: '1.2rem', lineHeight: 1.7, color: '#475569', whiteSpace: 'pre-wrap'}}>
            {sludinajums?.description || 'Pilns apraksts šeit...'}
          </div>
        </div>

        {/* CENA AP AKŠĀ KĀ SS.LV */}
        <div style={{background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white', padding: '48px', borderRadius: '24px', textAlign: 'center', marginTop: '60px', boxShadow: '0 30px 60px rgba(5,150,105,0.4)'}}>
          <div style={{fontSize: '4.5rem', fontWeight: 900, marginBottom: '16px'}}>{sludinajums?.price || 'Cena'} €</div>
          <div style={{fontSize: '1.5rem', opacity: 0.95}}>Ātri sazinies!</div>
          <button style={{marginTop: '32px', background: 'white', color: '#059669', padding: '24px 48px', fontSize: '1.4rem', fontWeight: 800, borderRadius: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 12px 32px rgba(0,0,0,0.2)', textTransform: 'uppercase'}}>
            📞 Zvanīt +371 29 *** ***
          </button>
        </div>
      </div>
    </div>
  );
}
