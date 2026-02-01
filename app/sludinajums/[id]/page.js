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
    <div style={{minHeight: '100vh', background: '#f8fafc', color: '#1e293b'}}>
      
      {/* HERO 50/50 */}
      <div style={{maxWidth: '1200px', margin: '0 auto', padding: '40px 20px'}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px'}}>
          
          {/* Attēls */}
          <img 
            src={images[0] || 'https://via.placeholder.com/600x400/f0f9ff/64748b?text=AUDI'} 
            style={{width: '100%', height: '450px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}
            alt="Galvenais"
          />
          
          {/* Info */}
          <div style={{background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
            <h1 style={{fontSize: '2.5rem', fontWeight: 800, marginBottom: '20px'}}>{sludinajums?.title}</h1>
            <div style={{fontSize: '4rem', fontWeight: 900, color: '#059669', marginBottom: '24px'}}>
              {sludinajums?.price} €
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginBottom: '32px'}}>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2rem', fontWeight: 700}}>{sludinajums?.power}</div>
                <div>ZS</div>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2rem', fontWeight: 700}}>{sludinajums?.fuel}</div>
                <div>l/100km</div>
              </div>
              <div style={{textAlign: 'center'}}>
                <div style={{fontSize: '2rem', fontWeight: 700}}>{sludinajums?.year}</div>
                <div>Gads</div>
              </div>
            </div>
            <button style={{width: '100%', background: '#059669', color: 'white', padding: '20px', fontSize: '1.2rem', fontWeight: 700, borderRadius: '12px', border: 'none', cursor: 'pointer'}}>
              📞 Zvanīt +371 29 *** ***
            </button>
          </div>
        </div>
      </div>

      {/* Galerija BLOKI */}
      <div style={{maxWidth: '1200px', margin: '0 auto 40px', padding: '0 20px'}}>
        <div style={{background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', marginBottom: '40px'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '32px'}}>🖼️ Foto galerija</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px'}}>
            {images.slice(1).map((img, i) => (
              <div key={i} style={{borderRadius: '16px', overflow: 'hidden', background: '#f1f5f9', boxShadow: '0 8px 24px rgba(0,0,0,0.1)'}}>
                <img 
                  src={img} 
                  style={{width: '100%', height: '240px', objectFit: 'cover'}} 
                  alt={`Foto ${i+1}`}
                />
                <div style={{padding: '20px', textAlign: 'center'}}>
                  <div style={{fontWeight: 600}}>Foto {i+2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apraksts */}
        <div style={{background: 'white', borderRadius: '20px', padding: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
          <h2 style={{fontSize: '2.5rem', marginBottom: '24px'}}>📝 Apraksts</h2>
          <div style={{fontSize: '1.2rem', lineHeight: 1.7, whiteSpace: 'pre-wrap'}}>
            {sludinajums?.description || 'Detalizēts apraksts tiks pievienots.'}
          </div>
        </div>
      </div>
    </div>
  );
}
