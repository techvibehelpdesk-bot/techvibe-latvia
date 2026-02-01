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
    <div style={{background: '#f9fafb', padding: '20px 0', minHeight: '100vh'}}>
      <div style={{maxWidth: '1100px', margin: '0 auto'}}>
        
        {/* MĀZĀKS HERO ATTĒLS */}
        <div style={{background: 'white', borderRadius: '12px', marginBottom: '24px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)'}}>
          <img 
            src={images[0]} 
            style={{width: '100%', height: '320px', objectFit: 'cover'}} 
            alt="Galvenais"
          />
        </div>

        {/* 3 KOLONNAS + CHECKBOXES kā screenshot */}
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '32px'}}>
          
          {/* 1. kolonna */}
          <div style={{background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
            <h3 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: '#374151'}}>Dzinējs</h3>
            <div style={{fontSize: '1.8rem', fontWeight: 700, color: '#1f2937'}}>2.0 dzinējs</div>
            <label style={{display: 'block', margin: '12px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '8px'}} checked readOnly /> 
              Quattro
            </label>
            <label style={{display: 'block', margin: '4px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '8px'}} checked readOnly /> 
              245 ZS
            </label>
          </div>

          {/* 2. kolonna */}
          <div style={{background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
            <h3 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: '#374151'}}>Aprīkojums</h3>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '8px'}} checked readOnly /> 
              Klimata kontrole
            </label>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '8px'}} checked readOnly /> 
              Parktronic
            </label>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '8px'}} checked readOnly /> 
              Keyless
            </label>
          </div>

          {/* 3. kolonna */}
          <div style={{background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
            <h3 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', color: '#374151'}}>Audio / Multimediji</h3>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '8px'}} checked readOnly /> 
              Bose
            </label>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '8px'}} checked readOnly /> 
              Navigācija
            </label>
            <label style={{display: 'block', margin: '8px 0', fontSize: '0.9rem'}}>
              <input type="checkbox" style={{marginRight: '8px'}} readOnly /> 
              Subwoofer
            </label>
          </div>
        </div>

        {/* GALERIJA MĀZĀKI BLOKI */}
        <div style={{background: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', marginBottom: '32px'}}>
          <h2 style={{fontSize: '2rem', marginBottom: '24px', color: '#1e293b'}}>🖼️ Foto galerija</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px'}}>
            {images.slice(1).map((img, i) => (
              <div key={i} style={{borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
                <img 
                  src={img} 
                  style={{width: '100%', height: '180px', objectFit: 'cover'}} 
                  alt={`Foto ${i+1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* APRKSTS */}
        <div style={{background: 'white', borderRadius: '12px', padding: '40px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)'}}>
          <h2 style={{fontSize: '2rem', marginBottom: '24px', color: '#1e293b'}}>📝 Pilns apraksts</h2>
          <div style={{fontSize: '1.1rem', lineHeight: 1.6, color: '#4b5563'}}>
            {sludinajums?.description || 'Detalizēts apraksts tiks pievienots.'}
          </div>
        </div>

        {/* CENA BEIGĀS KĀ SS.LV */}
        <div style={{background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', color: 'white', padding: '40px', borderRadius: '16px', textAlign: 'center', marginTop: '48px', boxShadow: '0 20px 40px rgba(5,150,105,0.3)'}}>
          <div style={{fontSize: '4rem', fontWeight: 900, marginBottom: '16px'}}>{sludinajums?.price} €</div>
          <button style={{background: 'white', color: '#059669', padding: '20px 48px', fontSize: '1.3rem', fontWeight: 800, borderRadius: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', textTransform: 'uppercase'}}>
            📞 Zvanīt pārdevējam
          </button>
        </div>
      </div>
    </div>
  );
}
