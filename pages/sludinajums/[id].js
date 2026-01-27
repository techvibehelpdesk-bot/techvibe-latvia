export default function SludinajumsPage({ params }) {
  // Mock dati - 100% build success
  const sludinajums = {
    id: params.id || 'demo',
    title: `Wow! Sludinājums #${params.id || 'demo'} TechVibe`,
    price: "299 €",
    category: "Elektronika",
    description: "Šis ir TechVibe sludinājums kas DARBOJAS! Profesionāls dizains, responsīvs, gatavs ražošanai. Tagad pievieno savu Supabase!",
    contact: "+371 2933 4455",
    image_url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&h=600&fit=crop&crop=center"
  };

  return (
    <>
      <title>{sludinajums.title} | TechVibe</title>
      <meta name="description" content={sludinajums.description.slice(0, 160)} />
      
      <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <a href="/sludinajumi" className="inline-flex items-center gap-3 px-6 py-3 bg-white/90 backdrop-blur-xl border border-white/50 shadow-xl rounded-3xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group mb-12 text-lg font-semibold">
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Sludinājumi
          </a>

          {/* Main card */}
          <article className="bg-white/95 backdrop-blur-2xl shadow-2xl rounded-4xl overflow-hidden border border-white/50">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-10 text-white">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight drop-shadow-2xl">
                {sludinajums.title}
              </h1>
              <div className="flex flex-wrap items-baseline gap-6">
                <span className="text-5xl md:text-7xl font-black drop-shadow-xl">€{sludinajums.price}</span>
                <span className="px-8 py-4 bg-white/30 backdrop-blur-xl rounded-3xl text-xl font-bold shadow-2xl">
                  {sludinajums.category}
                </span>
              </div>
            </div>

            <div className="p-10 md:p-16 lg:p-20">
              {/* Hero image */}
              <div className="mb-16 rounded-4xl overflow-hidden shadow-2xl group cursor-pointer hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                <img 
                  src={sludinajums.image_url}
                  alt={sludinajums.title}
                  className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover group-hover:scale-110 transition-transform duration-1000"
                />
              </div>

              {/* Description */}
              <div className="prose prose-2xl max-w-none mb-20">
                <p className="text-2xl leading-relaxed text-gray-700 font-light">
                  {sludinajums.description}
                </p>
              </div>

              {/* Contact section */}
              <section className="bg-gradient-to-br from-emerald-50 to-teal-50 p-12 md:p-20 rounded-4xl border-4 border-emerald-200 shadow-2xl backdrop-blur-xl">
                <h2 className="text-5xl md:text-6xl font-black mb-12 bg-gradient-to-r from-emerald-800 via-teal-800 to-green-800 bg-clip-text text-transparent drop-shadow-xl">
                  📞 Kontakts
                </h2>
                <div className="text-center mb-16">
                  <div className="text-7xl md:text-8xl font-black text-gray-900 drop-shadow-2xl mb-8">
                    {sludinajums.contact}
                  </div>
                  <div className="text-2xl text-gray-600 font-semibold tracking-wide uppercase mb-12">Pārdaugava, Rīga</div>
                </div>
                
                {/* Action buttons */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  <a href={`tel:${sludinajums.contact.replace(/\D/g, '')}`} 
                     className="group block bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 hover:from-emerald-600 hover:via-teal-600 hover:to-green-600 text-white font-black py-12 px-10 rounded-4xl text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 text-center">
                    <span className="block mb-2">📞 Zvanīt</span>
                    <span className="text-4xl">UZREIZ</span>
                  </a>
                  
                  <a href="/sludinajumi" 
                     className="group block bg-gradient-to-r from-slate-500 via-gray-500 to-zinc-500 hover:from-slate-600 hover:via-gray-600 hover:to-zinc-600 text-white font-black py-12 px-10 rounded-4xl text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 text-center">
                    <span className="block mb-2">👀 Skatīt</span>
                    <span className="text-4xl">CITUS</span>
                  </a>
                </div>
              </section>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
