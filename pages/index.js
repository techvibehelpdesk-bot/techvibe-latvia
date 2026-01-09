import Link from 'next/link';

export default function Home() {
  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundImage: "url('https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&fit=crop&w=2560&q=85')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Hero Section */}
      <section style={{ 
        background: 'rgba(255,255,255,0.9)', 
        backdropFilter: 'blur(10px)', 
        padding: '4rem 2rem', 
        textAlign: 'center',
        borderRadius: '0 0 2rem 2rem'
      }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
          TechVibe.lv – Tavas sludinājumi!
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto' }}>
          Pārdod, pērc, apmainies – ātri un droši kā ss.com
        </p>
        <Link 
          href="/kategorijas"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            color: 'white',
            padding: '1.25rem 3rem',
            fontSize: '1.5rem',
            fontWeight: '700',
            borderRadius: '2rem',
            textDecoration: 'none',
            boxShadow: '0 10px 30px rgba(59,130,246,0.4)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-5px)';
            e.target.style.boxShadow = '0 20px 40px rgba(59,130,246,0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 10px 30px rgba(59,130,246,0.4)';
          }}
        >
          Sākt pārlūkot – BEZ REĢISTRĀcijas!
        </Link>
      </section>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '4rem 2rem' }}>
        
        {/* Populārākās kategorijas */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', color: '#111827', marginBottom: '3rem' }}>
            🔥 Populārākās kategorijas
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              { icon: '📱', name: 'Telefoni', href: '/telefoni', count: '1,247' },
              { icon: '💻', name: 'Datori', href: '/datori', count: '892' },
              { icon: '🚗', name: 'Auto', href: '/auto', count: '2,156' },
              { icon: '📺', name: 'TV/Audio', href: '/tv', count: '456' },
              { icon: '👨‍💼', name: 'Darbs', href: '/vakances', count: '3,210' },
              { icon: '🛋️', name: 'Mēbeles', href: '/mebeles', count: '789' }
            ].map((cat) => (
              <Link 
                key={cat.href}
                href={cat.href}
                style={{
                  display: 'block',
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  padding: '2.5rem 2rem',
                  borderRadius: '1.5rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-10px)';
                  e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                  e.target.style.borderColor = '#3b82f6';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                  e.target.style.borderColor = 'transparent';
                }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                  {cat.icon}
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
                  {cat.count}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Jaunākie sludinājumi */}
        <section style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', color: '#111827', marginBottom: '3rem' }}>
            🆕 Jaunākie sludinājumi
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              { title: 'iPhone 15 Pro Max 256GB Titan Gray', price: '€899', img: 'iphone', href: '/sludinasana/1' },
              { title: 'MacBook Pro M3 16" 1TB Space Black', price: '€2,899', img: 'macbook', href: '/sludinasana/2' },
              { title: 'Samsung 55" QLED 4K Smart TV', price: '€649', img: 'tv', href: '/sludinasana/3' },
              { title: 'BMW X5 2023 3.0d xDrive', price: '€72,900', img: 'bmw', href: '/sludinasana/4' }
            ].map((item, index) => (
              <Link 
                key={index}
                href={item.href}
                style={{
                  display: 'block',
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-8px)';
                  e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  height: '200px',
                  background: `linear-gradient(135deg, ${index % 2 ? '#3b82f6' : '#10b981'}20 0%, ${index % 2 ? '#1d4ed8' : '#059669'}20 100%), 
                              url('https://images.unsplash.com/photo-1542393545-2fb3648ec94d?w=400') center/cover`,
                  backgroundBlendMode: 'overlay'
                }} />
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.75rem', lineHeight: '1.4' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '1rem' }}>
                    {item.price}
                  </p>
                  <div style={{ 
                    background: 'linear-gradient(90deg, #10b981, #059669)', 
                    color: 'white', 
                    padding: '0.75rem 1.5rem', 
                    borderRadius: '9999px', 
                    fontWeight: '600', 
                    display: 'inline-block',
                    fontSize: '0.95rem'
                  }}>
                    Skatīt sludinājumu →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 🔥 IZSOLES SEKCIJA – TOP kā ss.com */}
        <section style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          margin: '6rem 0',
          borderRadius: '2rem',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.1)',
            zIndex: 1
          }} />
          <div style={{ 
            maxWidth: '1400px', 
            margin: '0 auto', 
            padding: '4rem 2rem',
            position: 'relative',
            zIndex: 2
          }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 'bold', 
              textAlign: 'center', 
              color: 'white', 
              marginBottom: '4rem',
              textShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              ⚡ TOP Izsoles – beidzas šodien!
            </h2>
            <div style={{ 
              display: 'flex', 
              gap: '3rem', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              
              {/* Izsole 1 */}
              <div style={{
                minWidth: '320px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '2rem',
                padding: '2.5rem 2rem',
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                textAlign: 'center',
                flex: '1',
                maxWidth: '380px'
              }}>
                <div style={{
                  height: '12rem',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  borderRadius: '1.5rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem'
                }}>
                  ⌚
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                  Rolex Submariner Date
                </h3>
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444', margin: '0 0 0.5rem 0' }}>
                    €12,500
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                    Starta cena €10,000 • 23 piedāvājumi
                  </p>
                </div>
                <p style={{ color: '#059669', fontWeight: '700', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                  Beidzas pēc 2h 47min ⏰
                </p>
                <Link 
                  href="/izsole/rolex-submariner"
                  style={{
                    background: '#059669',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    textAlign: 'center',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(5,150,105,0.4)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(5,150,105,0.6)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(5,150,105,0.4)';
                  }}
                >
                  Bidēt tagad!
                </Link>
              </div>

              {/* Izsole 2 */}
              <div style={{
                minWidth: '320px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '2rem',
                padding: '2.5rem 2rem',
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                textAlign: 'center',
                flex: '1',
                maxWidth: '380px'
              }}>
                <div style={{
                  height: '12rem',
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                  borderRadius: '1.5rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem'
                }}>
                  🎮
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                  PS5 Slim + Spider-Man 2
                </h3>
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444', margin: '0 0 0.5rem 0' }}>
                    €429
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                    Starta cena €350 • 18 piedāvājumi
                  </p>
                </div>
                <p style={{ color: '#059669', fontWeight: '700', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                  Beidzas pēc 4h 12min ⏰
                </p>
                <Link 
                  href="/izsole/ps5-spiderman"
                  style={{
                    background: '#059669',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    textAlign: 'center',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(5,150,105,0.4)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(5,150,105,0.6)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(5,150,105,0.4)';
                  }}
                >
                  Bidēt tagad!
                </Link>
              </div>

              {/* Izsole 3 */}
              <div style={{
                minWidth: '320px',
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: '2rem',
                padding: '2.5rem 2rem',
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                textAlign: 'center',
                flex: '1',
                maxWidth: '380px'
              }}>
                <div style={{
                  height: '12rem',
                  background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                  borderRadius: '1.5rem',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem'
                }}>
                  👟
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                  Nike Air Jordan 1 High OG
                </h3>
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ef4444', margin: '0 0 0.5rem 0' }}>
                    €289
                  </p>
                  <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                    Starta cena €220 • 31 piedāvājumi
                  </p>
                </div>
                <p style={{ color: '#059669', fontWeight: '700', fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                  Beidzas pēc 1h 33min ⏰
                </p>
                <Link 
                  href="/izsole/nike-jordan"
                  style={{
                    background: '#059669',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '1rem',
                    textAlign: 'center',
                    fontWeight: '600',
                    textDecoration: 'none',
                    display: 'block',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(5,150,105,0.4)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(5,150,105,0.6)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(5,150,105,0.4)';
                  }}
                >
                  Bidēt tagad!
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem', 
          background: 'rgba(59,130,246,0.05)',
          borderRadius: '2rem',
          marginBottom: '4rem'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
            Gatavs pievienot savu sludinājumu?
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto' }}>
            Reģistrējies tagad un sāc pelnīt – pirmie 10 sludinājumi BEZ MAKSAS!
          </p>
          <Link 
            href="/reģistrēties"
            style={{
              display: 'inline-block',
              background: '#10b981',
              color: 'white',
              padding: '1.25rem 3rem',
              fontSize: '1.5rem',
              fontWeight: '700',
              borderRadius: '2rem',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(16,185,129,0.4)'
            }}
          >
            Reģistrēties tagad – 2 minūtes!
          </Link>
        </section>

      </main>
    </div>
  );
}
