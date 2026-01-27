export const dynamic = 'force-dynamic';

async function fetchSludinajums(id) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    // Dev/production check
    if (!supabaseUrl || !supabaseKey) {
      console.log('Supabase env missing - using mock');
      return {
        title: `Mock sludinājums #${id}`,
        price: "299 €",
        category: "Elektronika",
        description: "Supabase pieslēgums darbojas! Pievieno .env mainīgos.",
        contact: "+371 12345678",
        image_url: "https://via.placeholder.com/800x400/4f46e5/ffffff?text=TechVibe+Sludinajums"
      };
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/sludinajumi?select=*&id=eq.${id}&status=eq.public%C4%93ts`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',  // ← ŠIS NOVĒRŠ PRERENDER KĻŪDAS
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data?.[0] || null;
  } catch (error) {
    console.error('Supabase kļūda:', error);
    return null;
  }
}

export default async function SludinajumsPage({ params }) {
  const sludinajums = await fetchSludinajums(params?.id);

  if (!sludinajums || !params?.id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-8">
        <div className="max-w-md mx-auto text-center bg-white/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-500 rounded-2xl mx-auto mb-8 flex items-center justify-center">
            <span className="text-3xl font-bold text-white">!</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Sludinājums nav atrasts</h1>
          <p className="text-xl text-gray-600 mb-8">ID: {params?.id || 'nav'}</p>
          <a 
            href="/sludinajumi" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all text-lg"
          >
            ← Atpakaļ uz sludinājumiem
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>{sludinajums.title} | TechVibe</title>
      
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <a 
            href="/sludinajumi"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-white/90 hover:bg-white backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl hover:border-purple-300 text-lg font-semibold text-gray-800 hover:text-purple-600 transition-all duration-300 mb-12"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Atpakaļ uz sludinājumiem
          </a>

          <article className="bg-white/95 backdrop-blur-xl shadow-2xl rounded-3xl overflow-hidden">
            <div className="p-8 md:p-12 lg:p-16">
              <header className="mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight mb-6">
                  {sludinajums.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                    {sludinajums.price}
                  </span>
                  <span className="px-6 py-3 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 font-bold rounded-2xl text-lg shadow-lg">
                    {sludinajums.category?.toUpperCase()}
                  </span>
                </div>
              </header>

              {sludinajums.image_url && (
                <div className="mb-12 overflow-hidden rounded-3xl shadow-2xl group cursor-pointer hover:shadow-3xl transition-all duration-500">
                  <img 
                    src={sludinajums.image_url} 
                    alt={sludinajums.title}
                    className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              )}

              <div className="prose prose-2xl max-w-none mb-16 leading-relaxed">
                <p className="text-xl md:text-2xl text-gray-700 font-light">{sludinajums.description}</p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-10 md:p-12 rounded-3xl border-4 border-emerald-200 shadow-2xl">
                <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-emerald-800 to-green-800 bg-clip-text text-transparent">
                  📞 Sazinies tagad
                </h3>
                <p className="text-5xl md:text-6xl font-black text-gray-900 mb-10 leading-none drop-shadow-lg">
                  {sludinajums.contact}
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <a
                    href={`tel:${sludinajums.contact.replace(/\D/g, '')}`}
                    className="block bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-8 px-12 rounded-3xl text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 text-center"
                  >
                    📞 Zvanīt uzreiz
                  </a>
                  <a 
                    href="/sludinajumi"
                    className="block bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 text-white font-bold py-8 px-12 rounded-3xl text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 text-center"
                  >
                    👀 Visi sludinājumi
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
