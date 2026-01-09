import Link from 'next/link';

export default function Home() {
  return (
    <div 
      style={{
        minHeight: '100vh',
        backgroundImage: `url('https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&fit=crop&w=2560&q=85')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundColor: 'rgba(255,255,255,0.15)'
      }}
    >
      {/* Hero */}
      <section style={{paddingTop: '6rem', paddingBottom: '5rem', paddingLeft: '1rem', paddingRight: '1rem', position: 'relative', zIndex: 10, background: 'rgba(255,255,255,0.9)'}}>
        <div style={{maxWidth: '80rem', margin: '0 auto', textAlign: 'center'}}>
          <h1 style={{fontSize: '3rem', fontWeight: 'bold', background: 'linear-gradient(to right, #2563eb, #7c3aed, #4f46e5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem'}}>
            TechVibe
          </h1>
          <p style={{fontSize: '1.25rem', color: '#374151', marginBottom: '3rem', maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto'}}>
            Sludinājumi un preces visā Latvijā
          </p>
          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center', alignItems: 'center'}}>
            <Link href="/ievietot" style={{background: '#2563eb', color: 'white', padding: '1rem 2rem', borderRadius: '1rem', fontSize: '1.25rem', fontWeight: 'bold', boxShadow: '0 10px 25px -3px rgba(37,99,235,0.4)', display: 'inline-block', textDecoration: 'none'}}>
              ➕ Ievietot sludinājumu
            </Link>
            <Link href="/sludinajumi" style={{border: '2px solid #2563eb', color: '#2563eb', padding: '1rem 2rem', borderRadius: '1rem', fontSize: '1.25rem', fontWeight: 'bold', display: 'inline-block', textDecoration: 'none'}}>
              👀 Apskatīt sludinājumus
            </Link>
          </div>
        </div>
      </section>

      {/* Kategorijas – LABOTAS href */}
      <section style={{padding: '5rem 1rem', position: 'relative', zIndex: 10, background: 'rgba(255,255,255,0.85)'}}>
        <div style={{maxWidth: '80rem', margin: '0 auto'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', color: '#111827', marginBottom: '4rem'}}>Populārākās kategorijas</h2>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', gap: '1.5rem'}}>
            {[
              { icon: '📱', name: 'Telefoni', href: '/telefoni', count: '2,847' },
              { icon: '💻', name: 'Datori', href: '/datori', count: '1,592' },
              { icon: '🚗', name: 'Auto', href: '/auto', count: '5,247' },
              { icon: '📺', name: 'TV/Audio', href: '/tv', count: '1,234' }
            ].map((cat, i) => (
              <Link key={i} href={cat.href} style={{
                display: 'block', background: 'white', borderRadius: '1rem', padding: '2rem', textAlign: 'center',
                boxShadow: '0 10px 25px -3px rgba(0,0,0,0.1)', transition: 'all 0.3s', textDecoration: 'none', border: '1px solid transparent'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.25)';
                e.currentTarget.style.transform = 'translateY(-0.5rem)';
                e.currentTarget.style.borderColor = '#2563eb';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'transparent';
              }}>
                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>{cat.icon}</div>
                <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem'}}>{cat.name}</h3>
                <p style={{color: '#2563eb', fontWeight: 'bold', fontSize: '1.5rem'}}>{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sludinājumi */}
      <section style={{padding: '5rem 1rem', position: 'relative', zIndex: 10, background: 'rgba(255,255,255,0.85)'}}>
        <div style={{maxWidth: '80rem', margin: '0 auto'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', color: '#111827'}}>Jaunākie sludinājumi</h2>
            <Link href="/sludinajumi" style={{color: '#2563eb', fontWeight: 'bold', fontSize: '1.25rem', textDecoration: 'none'}}>Skatīt visus →</Link>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: '1.5rem'}}>
            {[
              { img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300', title: 'iPhone 15 Pro Max', price: '€850', city: 'Rīga' },
              { img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300', title: 'MacBook Pro M3', price: '€1,800', city: 'Jūrmala' },
              { img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300', title: 'BMW X5 2023', price: '€45,000', city: 'Daugavpils' },
              { img: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300', title: 'Sony WH-1000XM5', price: '€350', city: 'Liepāja' }
            ].map((ad, i) => (
              <Link key={i} href="/sludinajums/1" style={{
                display: 'block', background: 'white', borderRadius: '1rem', overflow: 'hidden',
                boxShadow: '0 10px 25px -3px rgba(0,0,0,0.1)', transition: 'all 0.3s', textDecoration: 'none'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.25)';
                e.currentTarget.style.transform = 'translateY(-0.5rem)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                <div style={{height: '12rem', backgroundImage: `url(${ad.img})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{ad.title}</h3>
                  <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.75rem'}}>{ad.price}</p>
                  <span style={{background: '#dbeafe', color: '#1e40af', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '500'}}>{ad.city}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding: '5rem 1rem', background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'}}>
        <div style={{maxWidth: '64rem', margin: '0 auto', textAlign: 'center', color: 'white'}}>
          <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem'}}>Gatavs pārdot vai pirkt?</h2>
          <Link href="/ievietot" style={{
            display: 'inline-block', background: 'white', color: '#2563eb', padding: '1.25rem 3rem',
            fontSize: '1.5rem', fontWeight: 'bold', borderRadius: '1rem', textDecoration: 'none', boxShadow: '0 10px 25px -3px rgba(255,255,255,0.3)'
          }}>
            Sākt tagad – BEZ MAKSAS!
          </Link>
        </div>
      </section>

      {/* Izsoles */}
      <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', margin: '3rem 1rem', borderRadius: '1.5rem', overflow: 'hidden'}}>
        <div style={{maxWidth: '76.8rem', margin: '0 auto', padding: '2.5rem'}}>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap'}}>
            <div style={{fontSize: '3rem', marginRight: '1rem'}}>⚡</div>
            <div style={{flex: 1}}>
              <h2 style={{fontSize: '2rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem'}}>TOP Izsoles – uzvar tagad!</h2>
              <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '1.125rem'}}>Reāllaika bidēšana • Beidzas šodien</p>
            </div>
            <Link href="/izsole" style={{background: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.75rem 2rem', borderRadius: '2rem', fontWeight: '600', textDecoration: 'none', whiteSpace: 'nowrap'}}>
              Skatīt visas →
            </Link>
          </div>
          
          <div style={{display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem'}}>
            {/* Izsole 1 */}
            <div style={{minWidth: '20rem', background: 'rgba(255,255,255,0.95)', borderRadius: '1rem', padding: '1.5rem', flexShrink: 0}}>
              <div style={{height: '10rem', background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)', borderRadius: '0.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem'}}>📱</div>
              <h3 style={{fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '0.5rem'}}>iPhone 15 Pro Max 256GB</h3>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <span style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#059669'}}>€850 <span style={{fontSize: '0.75rem', color: '#6b7280'}}>(12 bids)</span></span>
                <span style={{color: '#ef4444', fontWeight: '600'}}>2h 15m</span>
              </div>
              <Link href="/izsole/1" style={{width: '100%', background: '#059669', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center', fontWeight: '600', textDecoration: 'none', display: 'block'}}>
                Bidēt tagad!
              </Link>
            </div>
            
            {/* Izsole 2 */}
            <div style={{minWidth: '20rem', background: 'rgba(255,255,255,0.95)', borderRadius: '1rem', padding: '1.5rem', flexShrink: 0}}>
              <div style={{height: '10rem', background: 'linear-gradient(45deg
