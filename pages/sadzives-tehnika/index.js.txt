import Link from 'next/link';
import Head from 'next/head';

export default function SadzivesTehnika() {
  const sludinajumi = [
    {
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
      title: 'Samsung ledusskapis RQ58R50752W 400L',
      price: '€650',
      location: 'Rīga, Pārdaugava',
      date: '2h atpakaļ'
    },
    {
      img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
      title: 'LG veļasmašīna F4WV308S2E 9kg',
      price: '€420',
      location: 'Jūrmala',
      date: '5h atpakaļ'
    },
    {
      img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400',
      title: 'Bosch trauku mazgājamā DVU09T25N2',
      price: '€380',
      location: 'Daugavpils',
      date: '1 diena'
    },
    {
      img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
      title: 'Electrolux plīts virsma EIV634',
      price: '€285',
      location: 'Liepāja',
      date: '3 dienas'
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9e2e8a9379d5?w=400',
      title: 'Whirlpool vaiki EHBS98 370L',
      price: '€720',
      location: 'Rīga, Teika',
      date: 'Vakardien'
    },
    {
      img: 'https://images.unsplash.com/photo-1610945262588-3418479aa54e?w=400',
      title: 'AEG cepeškrāsns BPK742320M',
      price: '€510',
      location: 'Ventspils',
      date: '4h atpakaļ'
    }
  ];

  return (
    <>
      <Head>
        <title>Sadzīves tehnika - TechVibe.lv</title>
      </Head>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #ff8a00 0%, #e65100 50%, #ff6d00 100%)',
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
            
            <div style={{fontSize: '6rem', marginBottom: '1rem'}}>⚡</div>
            <h1 style={{
              fontSize: '4rem', fontWeight: 'bold',
              textShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>Sadzīves tehnika</h1>
            <p style={{fontSize: '1.5rem', opacity: 0.9}}>Ledusskapji • Plītis • Veļasmašīnas • 4,567 sludinājumi</p>
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
            <input placeholder="Meklēt sadzīves tehniku..." style={{
              flex: 1, minWidth: '300px',
              padding: '1rem 1.5rem', borderRadius: '50px',
              border: 'none', background: 'rgba(255,255,255,0.9)',
              fontSize: '1.1rem'
            }} />
            <select style={{padding: '1rem 1.5rem', borderRadius: '50px', border: 'none'}}>
              <option>Jaunākie</option>
              <option>Cena augoša</option>
              <option>Cena dilstoša</option>
            </select>
            <Link href="/ievietot?kategorija=sadzives-tehnika" style={{
              background: 'white', color: '#ff6d00',
              padding: '1rem 2.5rem', borderRadius: '50px',
              fontWeight: 'bold', textDecoration: 'none', whiteSpace: 'nowrap'
            }}>➕ Ievietot</Link>
          </div>

          {/* Sludinājumi */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem'}}>
            {sludinajumi.map((ad, i) => (
              <Link key={i} href="/sludinajums/123" style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '2rem', overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                transition: 'all 0.4s', textDecoration: 'none',
                color: 'initial', display: 'block'
              }} className="group">
                <div style={{
                  height: '220px', backgroundImage: `url(${ad.img})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: '#ff6d00', color: 'white',
                    padding: '0.5rem 1rem', borderRadius: '50px',
                    fontWeight: 'bold', fontSize: '0.875rem'
                  }}>Jauns</div>
                </div>
                <div style={{padding: '2rem'}}>
                  <h3 style={{
                    fontSize: '1.5rem', fontWeight: 'bold',
                    marginBottom: '1rem', lineHeight: '1.3'
                  }}>{ad.title}</h3>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '1.5rem'
                  }}>
                    <p style={{
                      fontSize: '2.25rem', fontWeight: 'bold',
                      color: '#ff6d00', margin: 0
                    }}>{ad.price}</p>
                    <span style={{
                      background: 'rgba(255,255,255,0.5)',
                      padding: '0.5rem 1rem', borderRadius: '1rem',
                      fontSize: '0.875rem'
                    }}>{ad.location}</span>
                  </div>
                  <p style={{color: '#6b7280', fontSize: '0.95rem'}}>
                    {ad.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA beigās */}
          <div style={{
            textAlign: 'center', marginTop: '4rem',
            padding: '3rem 2rem', background: 'rgba(255,255,255,0.1)',
            borderRadius: '2rem', backdropFilter: 'blur(20px)'
          }}>
            <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
              Nav atradis ko meklē?
            </h2>
            <Link href="/ievietot?kategorija=sadzives-tehnika" style={{
              background: 'white', color: '#ff6d00',
              padding: '1.5rem 4rem', borderRadius: '50px',
              fontSize: '1.5rem', fontWeight: 'bold',
              textDecoration: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              ➕ Ievieto pats – BEZ MAKSAS!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
