import Link from 'next/link';
import Head from 'next/head';

export default function DarbsVakances() {
  const vakances = [
    {
      img: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
      title: 'Full Stack izstrādātājs (React/Node.js)',
      company: 'TechStartup LV',
      salary: '€2,500 - €4,000',
      location: 'Rīga (hibrīds)',
      date: '2h atpakaļ'
    },
    {
      img: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      title: 'Grafiskais dizainers (UI/UX)',
      company: 'DesignHub',
      salary: '€1,800 - €2,800',
      location: 'Rīga, centrs',
      date: '5h atpakaļ'
    },
    {
      img: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400',
      title: 'Pārdevējs veikala (pilna slodze)',
      company: 'Maxima',
      salary: '€1,100 + prēmijas',
      location: 'Daugavpils',
      date: '1 diena'
    },
    {
      img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400',
      title: 'Marketing speciālists (SEO/SMM)',
      company: 'DigitalPro',
      salary: '€2,000 - €3,200',
      location: 'Jūrmala (attālināti)',
      date: '3 dienas'
    },
    {
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
      title: 'Loģistikas vadītājs',
      company: 'CargoExpress',
      salary: '€2,800 - €3,800',
      location: 'Liepāja',
      date: 'Vakardien'
    },
    {
      img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      title: 'Buchgalters (puse slodzes)',
      company: 'AccountLV',
      salary: '€900 - €1,400',
      location: 'Rīga, Pārdaugava',
      date: '4h atpakaļ'
    }
  ];

  return (
    <>
      <Head>
        <title>Darbs & Vakances - TechVibe.lv</title>
      </Head>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #10b981 0%, #047857 50%, #059669 100%)',
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
            
            <div style={{fontSize: '6rem', marginBottom: '1rem'}}>💼</div>
            <h1 style={{
              fontSize: '4rem', fontWeight: 'bold',
              textShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>Darbs & Vakances</h1>
            <p style={{fontSize: '1.5rem', opacity: 0.9}}>IT • Pārdošana • Administrācija • 12,024 sludinājumi</p>
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
            <input placeholder="Meklēt darbu vai vakances..." style={{
              flex: 1, minWidth: '300px',
              padding: '1rem 1.5rem', borderRadius: '50px',
              border: 'none', background: 'rgba(255,255,255,0.9)',
              fontSize: '1.1rem'
            }} />
            <select style={{padding: '1rem 1.5rem', borderRadius: '50px', border: 'none'}}>
              <option>Jaunākās</option>
              <option>Alga augoša</option>
              <option>Alga dilstoša</option>
            </select>
            <Link href="/ievietot?kategorija=darbs-vakances" style={{
              background: 'white', color: '#10b981',
              padding: '1rem 2.5rem', borderRadius: '50px',
              fontWeight: 'bold', textDecoration: 'none', whiteSpace: 'nowrap'
            }}>➕ Ievietot</Link>
          </div>

          {/* Vakances */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2rem'}}>
            {vakances.map((job, i) => (
              <Link key={i} href="/sludinajums/456" style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '2rem', overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                transition: 'all 0.4s', textDecoration: 'none',
                color: 'initial', display: 'block'
              }} className="group">
                <div style={{
                  height: '200px', backgroundImage: `url(${job.img})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: '#10b981', color: 'white',
                    padding: '0.5rem 1rem', borderRadius: '50px',
                    fontWeight: 'bold', fontSize: '0.875rem'
                  }}>Vakance</div>
                </div>
                <div style={{padding: '2.5rem'}}>
                  <h3 style={{
                    fontSize: '1.5rem', fontWeight: 'bold',
                    marginBottom: '1rem', lineHeight: '1.3'
                  }}>{job.title}</h3>
                  <p style={{
                    fontSize: '1.125rem', color: '#374151',
                    marginBottom: '1rem', fontWeight: '600'
                  }}>{job.company}</p>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '1.5rem'
                  }}>
                    <p style={{
                      fontSize: '1.75rem', fontWeight: 'bold',
                      color: '#10b981', margin: 0
                    }}>{job.salary}</p>
                    <span style={{
                      background: 'rgba(16,185,129,0.2)',
                      color: '#10b981', padding: '0.5rem 1rem',
                      borderRadius: '1rem', fontSize: '0.95rem',
                      fontWeight: '600'
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
              Meklē darbu? Vai meklē darbinieku?
            </h2>
            <Link href="/ievietot?kategorija=darbs-vakances" style={{
              background: 'white', color: '#10b981',
              padding: '1.5rem 4rem', borderRadius: '50px',
              fontSize: '1.5rem', fontWeight: 'bold',
              textDecoration: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              ➕ Publicē sludinājumu tagad!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
