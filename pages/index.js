import Link from 'next/link';

export default function Home() {
  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundImage: "url('https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&fit=crop&w=2560&q=85')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative'
      }}
    >
      {/* Overlay lai teksts labāk lasītos */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15,23,42,0.65)',
        zIndex: 1
      }} />
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Hero Section */}
        <section style={{ 
          background: 'rgba(255,255,255,0.98)', 
          backdropFilter: 'blur(20px)', 
          padding: '5rem 2rem', 
          textAlign: 'center',
          borderRadius: '0 0 3rem 3rem',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
        }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
            TechVibe.lv
          </h1>
          <p style={{ fontSize: '1.75rem', color: '#374151', marginBottom: '2.5rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Ātra un ērta platforma sludinājumu publicēšanai un meklēšanai
          </p>
          <Link 
            href="/kategorijas"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              color: 'white',
              padding: '1.5rem 4rem',
              fontSize: '1.5rem',
              fontWeight: '700',
              borderRadius: '2.5rem',
              textDecoration: 'none',
              boxShadow: '0 15px 40px rgba(37,99,235,0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-6px)';
              e.target.style.boxShadow = '0 25px 50px rgba(37,99,235,0.6)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 15px 40px rgba(37,99,235,0.4)';
            }}
          >
            Sākt pārlūkot – bez reģistrācijas!
          </Link>
        </section>

        <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '5rem 2rem' }}>
          
          {/* Populārākās kategorijas */}
          <section style={{ marginBottom: '6rem', background: 'rgba(255,255,255,0.95)', padding: '3rem', borderRadius: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', color: '#111827', marginBottom: '3.5rem' }}>
              🔥 Populārākās kategorijas
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '2.5rem',
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
                    background: 'white',
                    padding: '3rem 2.5rem',
                    borderRadius: '2rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    boxShadow: '0 15px 40px rgba(0,0,0,0.1)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    border: '3px solid transparent'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-12px) scale(1.02)';
                    e.target.style.boxShadow = '0 30px 60px rgba(0,0,0,0.2)';
                    e.target.style.borderColor = '#3b82f6';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0) scale(1)';
                    e.target.style.boxShadow = '0 15px 40px rgba(0,0,0,0.1)';
                    e.target.style.borderColor = 'transparent';
                  }}
                >
                  <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>
                    {cat.icon}
                  </div>
                  <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '1rem' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981' }}>
                    {cat.count}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Jaunākie sludinājumi */}
          <section style={{ marginBottom: '6rem', background: 'rgba(255,255,255,0.95)', padding: '3rem', borderRadius: '2rem', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold', textAlign: 'center', color: '#111827', marginBottom: '3.5rem' }}>
              🆕 Jaunākie sludinājumi
            </h2>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
              gap: '2.5rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {[
                { title: 'iPhone 15 Pro Max 256GB Titan Gray', price: '€899', href: '/sludinasana/1' },
                { title: 'MacBook Pro M3 16" 1TB Space Black', price: '€2,899', href: '/sludinasana/2' },
                { title: 'Samsung 55" QLED 4K Smart TV', price: '€649', href: '/sludinasana/3' },
                { title: 'BMW X5 2023 3.0d xDrive', price: '€72,900', href: '/sludinasana/4' }
              ].map((item, index) => (
                <Link 
                  key={index}
                  href={item.href}
                  style={{
                    display: 'block',
                    background: 'white',
                    borderRadius: '2rem',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
                    transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-10px)';
                    e.target.style.boxShadow = '0 35px 70px rgba(0,0,0,0.25)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 20px 50px rgba(0,0,0,0.12)';
                  }}
                >
                  <div style={{
                    height: '220px',
                    background: `linear-gradient(135deg, ${index % 2 ? '#3b82f6' : '#10b981'}30 0%, ${index % 2 ? '#1d4ed8' : '#059669'}30 100%), 
                                url('https://images.unsplash.com/photo-1542393545-2fb3648ec94d?w=500') center/cover no-repeat`,
                    backgroundBlendMode: 'multiply'
                  }} />
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#111827', marginBottom: '1rem', lineHeight: '1.4' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '1.5rem' }}>
                      {item.price}
                    </p>
                    <div style={{ 
                      background: 'linear-gradient(90deg, #10b981, #059669)', 
                      color: 'white', 
                      padding: '1rem 2rem', 
                      borderRadius: '9999px', 
                      fontWeight: '700', 
                      display: 'inline-block',
                      fontSize: '1rem'
                    }}>
                      Skatīt sludinājumu →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 🔥 IZSOLES SEKCIJA */}
          <section style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            margin: '6rem 0',
            borderRadius: '3rem',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 30px 80px rgba(99,102,241,0.4)'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.15)',
              zIndex: 1
            }} />
            <div style={{ 
              maxWidth: '1400px', 
              margin: '0 auto', 
              padding: '5rem 2rem',
              position: 'relative',
              zIndex: 2
            }}>
              <h2 style={{ 
                fontSize: '3.5rem', 
                fontWeight: 'bold', 
                textAlign: 'center', 
                color: 'white', 
                marginBottom: '4.5rem',
                textShadow: '0 6px 20px rgba(0,0,0,0.4)'
              }}>
                ⚡ Aktīvās izsoles
              </h2>
              <div style={{ 
                display: 'flex', 
                gap: '3.5rem', 
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                
                {/* Izsole 1 */}
                <div style={{
                  minWidth: '350px',
                  background: 'rgba(255,255,255,0.98)',
                  backdropFilter: 'blur(25px)',
                  borderRadius: '2.5rem',
                  padding: '3rem 2.5rem',
                  boxShadow: '0 30px 70px rgba(0,0,0,0.3)',
                  textAlign: 'center',
                  flex: '1',
                  maxWidth: '420px'
                }}>
                  <div style={{
                    height: '14rem',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    borderRadius: '2rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '5rem'
                  }}>
                    ⌚
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.25rem' }}>
                    Rolex Submariner
                  </h3>
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#dc2626', margin: '0 0 0.75rem 0' }}>
                      €12,500
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '1.15rem' }}>
                      23 piedāvājumi
                    </p>
                  </div>
                  <p style={{ color: '#059669', fontWeight: '800', fontSize: '1.4rem', marginBottom: '2rem' }}>
                    Beidzas pēc 2h 47min ⏰
                  </p>
                  <Link 
                    href="/izsole/rolex-submariner"
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      color: 'white',
                      padding: '1.25rem 3rem',
                      borderRadius: '1.5rem',
                      textAlign: 'center',
                      fontWeight: '700',
                      textDecoration: 'none',
                      display: 'block',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 12px 35px rgba(5,150,105,0.5)',
                      fontSize: '1.1rem'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-5px)';
                      e.target.style.boxShadow = '0 20px 45px rgba(5,150,105,0.7)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 12px 35px rgba(5,150,105,0.5)';
                    }}
                  >
                    Piedāvāt cenu!
                  </Link>
                </div>

                {/* Izsole 2 */}
                <div style={{
                  minWidth: '350px',
                  background: 'rgba(255,255,255,0.98)',
                  backdropFilter: 'blur(25px)',
                  borderRadius: '2.5rem',
                  padding: '3rem 2.5rem',
                  boxShadow: '0 30px 70px rgba(0,0,0,0.3)',
                  textAlign: 'center',
                  flex: '1',
                  maxWidth: '420px'
                }}>
                  <div style={{
                    height: '14rem',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                    borderRadius: '2rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '5rem'
                  }}>
                    🎮
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.25rem' }}>
                    PS5 Slim + Spider-Man 2
                  </h3>
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#dc2626', margin: '0 0 0.75rem 0' }}>
                      €429
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '1.15rem' }}>
                      18 piedāvājumi
                    </p>
                  </div>
                  <p style={{ color: '#059669', fontWeight: '800', fontSize: '1.4rem', marginBottom: '2rem' }}>
                    Beidzas pēc 4h 12min ⏰
                  </p>
                  <Link 
                    href="/izsole/ps5-spiderman"
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      color: 'white',
                      padding: '1.25rem 3rem',
                      borderRadius: '1.5rem',
                      textAlign: 'center',
                      fontWeight: '700',
                      textDecoration: 'none',
                      display: 'block',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 12px 35px rgba(5,150,105,0.5)',
                      fontSize: '1.1rem'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-5px)';
                      e.target.style.boxShadow = '0 20px 45px rgba(5,150,105,0.7)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 12px 35px rgba(5,150,105,0.5)';
                    }}
                  >
                    Piedāvāt cenu!
                  </Link>
                </div>

                {/* Izsole 3 */}
                <div style={{
                  minWidth: '350px',
                  background: 'rgba(255,255,255,0.98)',
                  backdropFilter: 'blur(25px)',
                  borderRadius: '2.5rem',
                  padding: '3rem 2.5rem',
                  boxShadow: '0 30px 70px rgba(0,0,0,0.3)',
                  textAlign: 'center',
                  flex: '1',
                  maxWidth: '420px'
                }}>
                  <div style={{
                    height: '14rem',
                    background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                    borderRadius: '2rem',
                    marginBottom: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '5rem'
                  }}>
                    👟
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.25rem' }}>
                    Nike Air Jordan 1 High OG
                  </h3>
                  <div style={{ marginBottom: '2rem' }}>
                    <p style={{ fontSize: '3rem', fontWeight: 'bold', color: '#dc2626', margin: '0 0 0.75rem 0' }}>
                      €289
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '1.15rem' }}>
                      31 piedāvājumi
                    </p>
                  </div>
                  <p style={{ color: '#059669', fontWeight: '800', fontSize: '1.4rem', marginBottom: '2rem' }}>
                    Beidzas pēc 1h 33min ⏰
                  </p>
                  <Link 
                    href="/izsole/nike-jordan"
                    style={{
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      color: 'white',
                      padding: '1.25rem 3rem',
                      borderRadius: '1.5rem',
                      textAlign: 'center',
                      fontWeight: '700',
                      textDecoration: 'none',
                      display: 'block',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 12px 35px rgba(5,150,105,0.5)',
                      fontSize: '1.1rem'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-5px)';
                      e.target.style.boxShadow = '0 20px 45px rgba(5,150,105,0.7)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 12px 35px rgba(5,150,105,0.5)';
                    }}
                  >
                    Piedāvāt cenu!
                  </Link>
                </div>

              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ 
            textAlign: 'center', 
            padding: '5rem 3rem', 
            background: 'rgba(255,255,255,0.95)',
            borderRadius: '3rem',
            boxShadow: '0 25px 70px rgba(0,0,0,0.1)',
            margin: '4rem 0'
          }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111827', marginBottom: '2rem' }}>
              Gatavs publicēt sludinājumu?
            </h2>
            <p style={{ fontSize: '1.5rem', color: '#6b7280', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              Pievieno savu sludinājumu dažu minūšu laikā – pirmie 10 bez maksas!
            </p>
            <Link 
              href="/publicet"
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                padding: '1.5rem 4rem',
                fontSize: '1.5rem',
                fontWeight: '700',
                borderRadius: '2.5rem',
                textDecoration: 'none',
                boxShadow: '0 15px 45px rgba(16,185,129,0.4)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-6px)';
                e.target.style.boxShadow = '0 25px 55px rgba(16,185,129,0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 15px 45px rgba(16,185,129,0.4)';
              }}
            >
              Publicēt sludinājumu tagad!
            </Link>
          </section>

        </main>
      </div>
    </div>
  );
}
