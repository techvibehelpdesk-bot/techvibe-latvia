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
      <section className="pt-24 pb-20 px-4 relative z-10" style={{background: 'rgba(255,255,255,0.9)'}}>
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            TechVibe
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto">
            Sludinājumi un preces visā Latvijā
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ievietot" className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all">
              ➕ Ievietot sludinājumu
            </Link>
            <Link href="/sludinajumi" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl text-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
              👀 Apskatīt sludinājumus
            </Link>
          </div>
        </div>
      </section>

      {/* Kategorijas – tagad 4 kategorijas */}
      <section className="py-20 px-4 relative z-10" style={{background: 'rgba(255,255,255,0.85)'}}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Populārākās kategorijas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '📱', name: 'Telefoni', href: '/kategorija/telefoni', count: '2,847' },
              { icon: '💻', name: 'Datori', href: '/kategorija/datori', count: '1,592' },
              { icon: '🚗', name: 'Auto', href: '/kategorija/auto', count: '5,247' },
              { icon: '🛋️', name: 'Mēbeles', href: '/kategorija/mebeles', count: '3,456' }
            ].map((cat, i) => (
              <Link key={i} href={cat.href} className="group bg-white rounded-2xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all border hover:border-blue-200 shadow-lg inline-block">
                <div className="text-4xl mb-4 group-hover:scale-110">{cat.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{cat.name}</h3>
                <p className="text-2xl font-bold text-blue-600">{cat.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sludinājumi */}
      <section className="py-20 px-4 relative z-10" style={{background: 'rgba(255,255,255,0.85)'}}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">Jaunākie sludinājumi</h2>
            <Link href="/sludinajumi" className="text-blue-600 font-bold text-xl hover:text-blue-800">Skatīt visus →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300', title: 'iPhone 15 Pro Max', price: '€850', city: 'Rīga' },
              { img: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300', title: 'MacBook Pro M3', price: '€1,800', city: 'Jūrmala' },
              { img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300', title: 'BMW X5 2023', price: '€45,000', city: 'Daugavpils' },
              { img: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300', title: 'Sony WH-1000XM5', price: '€350', city: 'Liepāja' }
            ].map((ad, i) => (
              <Link key={i} href="/sludinajums/1" className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all inline-block">
                <div className="h-48 bg-cover bg-center" style={{backgroundImage: `url(${ad.img})`}} />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-blue-600 line-clamp-2">{ad.title}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-3">{ad.price}</p>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{ad.city}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4" style={{background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)'}}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Gatavs pārdot vai pirkt?</h2>
          <Link href="/ievietot" className="inline-block bg-white text-blue-600 px-12 py-5 text-2xl font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            Sākt tagad – BEZ MAKSAS!
          </Link>
        </div>
      </section>

      {/* 🔥 IZSOLES SEKCIJA */}
      <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', margin: '3rem 0', borderRadius: '1.5rem', overflow: 'hidden'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto', padding: '2.5rem'}}>
          <div style={{display: 'flex', alignItems: 'center', marginBottom: '2rem'}}>
            <div style={{fontSize: '3rem', marginRight: '1rem'}}>⚡</div>
            <div>
              <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.25rem'}}>
                TOP Izsoles – uzvar tagad!
              </h2>
              <p style={{color: 'rgba(255,255,255,0.9)', fontSize: '1.25rem'}}>
                Reāllaika bidēšana • Beidzas šodien
              </p>
            </div>
            <Link href="/izsole" style={{marginLeft: 'auto', background: 'rgba(255,255,255,0.2)', color: 'white', padding: '0.75rem 2rem', borderRadius: '50px', fontWeight: '600', textDecoration: 'none'}}>
              Skatīt visas →
            </Link>
          </div>
          
          <div style={{display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1rem'}}>
            {/* Izsoles kastes – paliekas kā bija */}
            <div style={{minWidth: '320px', background: 'rgba(255,255,255,0.95)', borderRadius: '1rem', padding: '1.5rem', flexShrink: 0}}>
              <div style={{height: '160px', background: 'linear-gradient(45deg, #f3f4f6, #e5e7eb)', borderRadius: '0.75rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem'}}>📱</div>
              <h3 style={{fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem'}}>iPhone 15 Pro Max 256GB</h3>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
                <span style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#059669'}}>€850 <span style={{fontSize: '0.875rem', color: '#6b7280'}}>(12 bids)</span></span>
                <span style={{color: '#ef4444', fontWeight: '600'}}>2h 15m</span>
              </div>
              <Link href="/izsole/1" style={{width: '100%', background: '#059669', color: 'white', padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'center', fontWeight: '600', textDecoration: 'none', display: 'block'}}>
                Bidēt tagad!
              </Link>
            </div>
            {/* Pārējās 2 izsoles paliek kā bija */}
            {/* ... (otrās un trešās izsoles kodi identiski iepriekšējam) */}
          </div>
        </div>
      </div>

    </div>
  );
}
