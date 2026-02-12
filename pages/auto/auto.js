import Head from 'next/head';

export default function AutoPage({ sludinajumi, error }) {
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">❌</div>
          <h1 className="text-3xl font-bold text-red-800 mb-4">Kļūda ielādējot sludinājumus</h1>
          <p className="text-lg text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 bg-red-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
          >
            Ielādēt vēlreiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Auto sludinājumi | Tekvibe</title>
        <meta name="description" content={`${sludinajumi.length} auto sludinājumi no Supabase`} />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            🚗 Auto sludinājumi
          </h1>
          <p className="text-xl text-gray-700 mb-12">Atrasti {sludinajumi.length} auto</p>
          
          {/* Search - client-side filter */}
          <div className="max-w-md mx-auto relative">
            <input
              id="search"
              type="text"
              placeholder="Meklē pēc nosaukuma vai apraksta..."
              className="w-full p-5 pl-12 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg transition-all duration-200 pr-12"
            />
            <label htmlFor="search" className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-gray-400 pointer-events-none">
              🔍
            </label>
          </div>
        </div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto">
          {sludinajumi.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-7xl mb-8">🚗</div>
              <h2 className="text-4xl font-bold text-gray-700 mb-6">Nav atrasti auto</h2>
              <p className="text-xl text-gray-500 mb-8">Pagaidām nav publicēti auto sludinājumi</p>
              <Link href="/pievienot" className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:from-green-600 hover:to-green-700 transition-all shadow-xl hover:shadow-2xl">
                + Pievienot sludinājumu
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20" id="sludinajumi-grid">
              {sludinajumi.map((s) => (
                <div key={s.id} className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
                  {/* Image */}
                  <div className="h-56 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 group-hover:scale-105 transition-transform duration-500">
                    {s.image_url ? (
                      <img 
                        src={s.image_url} 
                        alt={s.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl">🚗</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase tracking-wide">
                        {s.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors pr-4 flex-1">
                        {s.title}
                      </h3>
                      <div className="text-3xl">{s.category === 'auto' ? '🚙' : '🚗'}</div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed">{s.description}</p>
                    
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between">
                        <span className="text-3xl font-bold text-blue-600">{s.price || 'Cena vienošanās'}</span>
                        <span className="text-sm text-gray-500">{s.location}</span>
                      </div>
                      {s.category && (
                        <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-xl text-sm font-semibold">
                          {s.category}
                        </span>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-4 border-t">
                      <Link 
                        href={`/sludinajums/${s.id}`}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-2xl font-bold text-center hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
                      >
                        👁️ Skatīt
                      </Link>
                      <button className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center">
                        💬
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto text-center p-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Gribi pārdot savu auto?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Pievieno sludinājumu bez maksas un atrodi pircēju dažu minūšu laikā!
          </p>
          <Link 
            href="/pievienot"
            className="inline-block bg-gradient-to-r from-orange-500 to-red-600 text-white px-16 py-6 rounded-3xl text-2xl font-bold hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
          >
            + Pievienot auto
          </Link>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('search');
            const grid = document.getElementById('sludinajumi-grid');
            const items = grid?.querySelectorAll('[id*="sludinajums"]') || [];
            
            searchInput.addEventListener('input', function(e) {
              const term = e.target.value.toLowerCase();
              items.forEach(item => {
                const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
                const desc = item.querySelector('p')?.textContent.toLowerCase() || '';
                if (title.includes(term) || desc.includes(term)) {
                  item.style.display = 'block';
                } else {
                  item.style.display = 'none';
                }
              });
            });
          });
        `
      }} />
    </>
  );
}

// SERVER-SIDE FETCH - SOLĪDA KĀ AKmens!
export async function getServerSideProps() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase ENV nav iestatīti Vercel');
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/sludinajumi?select=*&status=eq.published`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
        },
        cache: 'no-store', // Fresh data katru reizi
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Supabase HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    
    // TAVA AUTO FILTER LOĢIKA
    const autoSludinajumi = data.filter(s => 
      s.category?.toLowerCase().includes('auto')
    );

    console.log('🚗 Server: ielādēti', autoSludinajumi.length, 'auto');

    return {
      props: {
        sludinajumi: autoSludinajumi,
        error: null,
      },
    };
  } catch (error) {
    console.error('❌ Auto getServerSideProps:', error);
    return {
      props: {
        sludinajumi: [],
        error: `Kļūda: ${error.message}. Pārbaudi Vercel ENV vars.`,
      },
    };
  }
}
