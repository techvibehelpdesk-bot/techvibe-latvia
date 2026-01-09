import Link from 'next/link';

export default function Home() {
  const kategorijas = [
    { icon: '📱', name: 'Telefoni', href: '/telefoni', count: '1,247' },
    { icon: '💻', name: 'Datori', href: '/datori', count: '856' },
    { icon: '📺', name: 'TV/Audio', href: '/tv', count: '423' },
    { icon: '🚗', name: 'Auto', href: '/auto', count: '2,156' },
    { icon: '👶', name: 'Bērniem', href: '/berniem', count: '678' },
    { icon: '🏠', name: 'Dzīvokļi', href: '/dzivokli', count: '1,089' },
    { icon: '🔨', name: 'Darbs', href: '/vakances', count: '345' },
    { icon: '🎮', name: 'Spēles', href: '/speles', count: '234' }
  ];

  const sludinajumi = [
    { img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', title: 'iPhone 15 Pro Max 256GB', price: '€899', href: '/sludinajums/1' },
    { img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1480&q=80', title: 'MacBook Pro M3 16"', price: '€2,499', href: '/sludinajums/2' },
    { img: 'https://images.unsplash.com/photo-1588702547923-7093a6c3b8e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80', title: 'Samsung QLED 65" TV', price: '€1,199', href: '/sludinajums/3' },
    { img: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80', title: 'Audi A6 2022', price: '€32,900', href: '/sludinajums/4' }
  ];

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
      {/* Overlay lasāmībai */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(2px)',
          zIndex: 1
        }}
      />

      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
        
        {/* Hero */}
        <section style={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'white',
          padding: '0 2rem'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
            fontWeight: '800',
            marginBottom: '1.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            TechVibe
          </h1>
          <p style={{
            fontSize: 'clamp(1.2rem, 4vw, 2rem)',
            marginBottom: '2.5rem',
            maxWidth: '800px',
            lineHeight: 1.4,
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            Ātra un ērta platforma sludinājumu publicēšanai Latvijā
          </p>
          <Link 
            href="/publicet"
            style={{
              background: 'linear-gradient(45deg, #10b981, #059669)',
              color: 'white',
              padding: '1.25rem 3rem',
              borderRadius: '50px',
              fontSize: '1.25rem',
              fontWeight: '700',
              textDecoration: 'none',
              boxShadow: '0 20px 40px rgba(16,185,129,0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 25px 50px rgba(16,185,129,0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 20px 40px rgba(16,185,129,0.4)';
            }}
          >
            Publicēt sludinājumu tagad!
          </Link>
        </section>

        {/* Populārākās kategorijas - 2-4 kolonnas */}
        <section style={{
          padding: '6rem 2rem',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              textAlign: 'center',
              fontSize: '2.5rem',
              fontWeight: '800',
              marginBottom: '4rem',
              color: '#1f2937'
            }}>
              Populārākās kategorijas
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {kategorijas.map((cat, i) => (
                <Link 
                  key={i}
                  href={cat.href}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2.5rem 1.5rem',
                    background: 'white',
                    borderRadius: '2rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    minHeight: '200px',
                    justifyContent: 'center'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-10px)';
                    e.target.style.boxShadow = '0 30px 60px rgba(0,0,0,0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                    {cat.icon}
                  </div>
                  <h3 style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '1rem',
                    textAlign: 'center'
                  }}>
                    {cat.name}
                  </h3>
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: '800',
                    color: '#10b981'
                  }}>
                    {cat.count}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Populārākie sludinājumi - 1-4 kolonnas */}
        <section style={{
          padding: '6rem 2rem',
          background: 'rgba(248,250,252,0.95)',
          backdropFilter: 'blur(20px)'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <h2 style={{
              textAlign: 'center',
              fontSize: '2.5rem',
              fontWeight: '800',
              marginBottom: '4rem',
              color: '#1f2937'
            }}>
              Populārākie sludinājumi
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem'
            }}>
              {sludinajumi.map((item, i) => (
                <Link 
                  key={i}
                  href={item.href}
                  style={{
                    background: 'white',
                    borderRadius: '2rem',
                    overflow: 'hidden',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.1)',
                    textDecoration: 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-10px)';
                    e.target.style.boxShadow = '0 35px 70px rgba(0,0,0,0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 25px 50px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{
                    height: '250px',
                    backgroundImage: `url(${item.img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                  <div style={{ padding: '2rem' }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#1f2937',
                      marginBottom: '1rem'
                    }}>
                      {item.title}
                    </h3>
                    <p style={{
                      fontSize: '2.25rem',
                      fontWeight: '800',
                      color: '#ef4444'
                    }}>
                      {item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{
          padding: '6rem 2rem',
          textAlign: 'center',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '1.5rem',
            color: '#1f2937'
          }}>
            Gatavs pārdot vai pirkt?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '3rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto 3rem'
          }}>
            Publicē savu sludinājumu dažu minūšu laikā un sasniedz tūkstošiem pircēju Latvijā.
          </p>
          <Link 
            href="/publicet"
            style={{
              background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
              color: 'white',
              padding: '1.5rem 4rem',
              borderRadius: '50px',
              fontSize: '1.5rem',
              fontWeight: '800',
              textDecoration: 'none',
              boxShadow: '0 25px 50px rgba(59,130,246,0.4)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 30px 60px rgba(59,130,246,0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 25px 50px rgba(59,130,246,0.4)';
            }}
          >
            Sāc tagad – bez maksas!
          </Link>
        </section>
      </div>
    </div>
  );
}
