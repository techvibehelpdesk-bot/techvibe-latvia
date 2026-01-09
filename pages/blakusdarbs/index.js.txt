import Link from 'next/link';
import Head from 'next/head';

export default function Blakusdarbs() {
  const blakusdarbi = [
    {
      img: 'https://images.unsplash.com/photo-1516321310764-b4a77b4d4fd7?w=400',
      title: 'React izstrādātājs freelance (20h/ned)',
      rate: '€25-35/st',
      skills: 'Next.js, Tailwind, Supabase',
      location: 'Rīga (attālināti)',
      date: '1h atpakaļ'
    },
    {
      img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      title: 'Logo dizains Figma / Photoshop',
      rate: '€50-150/projekts',
      skills: 'UI/UX, Branding',
      location: 'Attālināti',
      date: '3h atpakaļ'
    },
    {
      img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
      title: 'SEO optimizācija vietnēm',
      rate: '€200-500/mēn',
      skills: 'Google Analytics, Ahrefs',
      location: 'Jūrmala (hibrīds)',
      date: '6h atpakaļ'
    },
    {
      img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
      title: 'Sociālo mediju saturs (SMM)',
      rate: '€15-25/st',
      skills: 'Instagram, TikTok, Canva',
      location: 'Attālināti',
      date: '1 diena'
    },
    {
      img: 'https://images.unsplash/photo-1522071820081-009f0129c71c?w=400',
      title: 'Virtuālais asistents (10h/ned)',
      rate: '€12-18/st',
      skills: 'Google Workspace, Plānošana',
      location: 'Rīga',
      date: '2 dienas'
    },
    {
      img: 'https://images.unsplash/photo-1552664730-d307ca884978?w=400',
      title: 'Foto/video montāža Adobe Premiere',
      rate: '€30-60/st',
      skills: 'After Effects, Premiere Pro',
      location: 'Daugavpils (attālināti)',
      date: '5h atpakaļ'
    }
  ];

  return (
    <>
      <Head>
        <title>Blakusdarbs - TechVibe.lv</title>
      </Head>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #34d399 0%, #10b981 50%, #059669 100%)',
        padding: '2rem 1rem',
        color: 'white'
      }}>
        <div style={{maxWidth: '1400px', margin: '0 auto'}}>
          
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem',
            position: 'relative'
          }}>
            <Link href="/kategorijas" style={{
              position: 'absolute', left: '0', top: '0',
              background: 'rgba(255,255,255,0.2)', color: 'white',
              padding: '0.75rem 1.5rem', borderRadius: '50px',
              fontWeight: '600', textDecoration: 'none'
            }}>← Atpakaļ kategorijās</Link>
            
            <div style={{fontSize: '6rem', marginBottom: '1rem'}}>📋</div>
            <h1 style={{
              fontSize: '4rem', fontWeight: 'bold',
              textShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>Blakusdarbs</h1>
            <p style={{fontSize: '1.5rem', opacity: 0.9}}>Freelance • Papilddarbs • Projekti • 2,156 sludinājumi</p>
          </div>

          {/* Filtrs */}
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(20px)',
            borderRadius: '2rem',
            padding: '1.5rem 2rem',
            marginBottom: '3rem',
            display: 'flex', flexWrap: 'wrap',
            gap: '1rem', alignItems: 'center'
          }}>
            <input placeholder="Meklēt blakusdarbu..." style={{
              flex: 1, minWidth: '300px',
              padding: '1rem 1.5rem', borderRadius: '50px',
              border: 'none', background: 'rgba(255,255,255,0.9)',
              fontSize: '1.1rem'
            }} />
            <select style={{padding: '1rem 1.5rem', borderRadius: '50px', border: 'none'}}>
              <option>Jaunākie</option>
              <option>Stundā augoša</option>
              <option>Stundā dilstoša</option>
            </select>
            <Link href="/ievietot?kategorija=blakusdarbs" style={{
              background: 'white', color: '#10b981',
              padding: '1rem 2.5rem', borderRadius: '50px',
              fontWeight: 'bold', textDecoration: 'none', whiteSpace: 'nowrap'
            }}>➕ Piedāvāt</Link>
          </div>

          {/* Blakusdarbi */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))', gap: '2rem'}}>
            {blakusdarbi.map((job, i) => (
              <Link key={i} href="/sludinajums/789" style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '2rem', overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                transition: 'all 0.4s', textDecoration: 'none',
                color: 'initial', display: 'block'
              }} className="group">
                <div style={{
                  height: '210px', backgroundImage: `url(${job.img})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: '#34d399', color: 'white',
                    padding: '0.5rem 1rem', borderRadius: '50px',
                    fontWeight: 'bold', fontSize: '0.875rem'
                  }}>Freelance</div>
                </div>
                <div style={{padding: '2.5rem'}}>
                  <h3 style={{
                    fontSize: '1.4rem', fontWeight: 'bold',
                    marginBottom: '1rem', lineHeight: '1.3'
                  }}>{job.title}</h3>
                  <div style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem'}}>
                    <span style={{
                      background: 'rgba(52,211,153,0.3)',
                      color: '#059669', padding: '0.5rem 1rem',
                      borderRadius: '1rem', fontSize: '0.9rem',
                      fontWeight: '600'
                    }}>{job.skills}</span>
                  </div>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '1rem'
                  }}>
                    <p style={{
                      fontSize: '1.75rem', fontWeight: 'bold',
                      color: '#10b981', margin: 0
                    }}>{job.rate}</p>
                    <span style={{
                      background: 'rgba(255,255,255,0.5)',
                      padding: '0.5rem 1rem', borderRadius: '1rem',
                      fontSize: '0.9rem'
                    }}>{job.location}</span>
                  </div>
                  <p style={{color: '#6b7280', fontSize: '0.95rem'}}>
                    {job.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div style={{
            textAlign: 'center', marginTop: '4rem',
            padding: '3rem 2rem', background: 'rgba(255,255,255,0.1)',
            borderRadius: '2rem', backdropFilter: 'blur(20px)'
          }}>
            <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
              Piedāvā savu blakusdarbu!
            </h2>
            <Link href="/ievietot?kategorija=blakusdarbs" style={{
              background: 'white', color: '#10b981',
              padding: '1.5rem 4rem', borderRadius: '50px',
              fontSize: '1.5rem', fontWeight: 'bold',
              textDecoration: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              ➕ Publicēt tagad – BEZ MAKSAS!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
