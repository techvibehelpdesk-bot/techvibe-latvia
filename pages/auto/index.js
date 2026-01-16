import Link from 'next/link';

export default async function AutoPage() {
  let sludinajumi = [];
  
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const res = await fetch(`${supabaseUrl}/rest/v1/sludinajumi?select=*&status=eq.published.order=created_at.desc`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      next: { revalidate: 300 }, // 5min cache
    });

    const data = await res.json();
    
    // AUTO filtrs (tava DB)
    sludinajumi = data.filter(s => 
      s.category === 'auto' || 
      s.category === '"auto"' || 
      s.category?.toLowerCase().includes('auto')
    );
    
  } catch (e) {
    console.error('Auto fetch error:', e);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent drop-shadow-2xl mb-6">
            🚗 Auto sludinājumi
          </h1>
          <div className="text-3xl font-bold text-gray-800/90 bg-white/80 px-10 py-6 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/50 inline-block">
            {sludinajumi.length} atrastie
          </div>
        </div>

        {sludinajumi.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-32">
            <div className="mx-auto w-40 h-40 bg-gradient-to-br from-gray-200 to-gray-400 rounded-3xl flex items-center justify-center shadow-2xl mb-12 backdrop-blur-sm border-4 border-white/50">
              <span className="text-6xl">🚗</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-8">
              Vēl nav auto sludinājumu
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-lg mx-auto">
              TechVibe ir labākā vieta tavam auto – pievieno jau tagad!
            </p>
            <Link href="/ievietot" className="group inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-14 py-7 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-[1.05] transition-all duration-300 hover:from-blue-700 hover:to-indigo-800 border-4 border-white/20">
              ➕ Pievienot sludinājumu 
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8 mb-20">
              {sludinajumi.map((s) => (
                <Link
                  key={s.id}
                  href={`/auto/${s.id}`}
                  className="group bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl hover:shadow-3xl border border-white/70 hover:border-blue-300/60 hover:-translate-y-4 hover:scale-[1.02] transition-all duration-500 overflow-hidden"
                >
                  <div className="h-60 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
                    {s.thumbnail_url ? (
                      <img 
                        src={s.thumbnail_url} 
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400">
                        <span className="text-6xl text-gray-500 drop-shadow-lg">🚗</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <h3 className="font-black text-2xl text-gray-900 line-clamp-2 flex-1 pr-4 group-hover:text-blue-800 transition-colors">
                        {s.title}
                      </h3>
                      <div className="flex flex-col items-end">
                        <span className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent tracking-tight">
                          €{Number(s.price || 0).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500 font-medium mt-1">{s.city}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 font-medium leading-relaxed line-clamp-4 mb-8 text-lg">
                      {s.description || s.apraksts}
                    </p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <span className="text-sm font-semibold text-gray-600 bg-gray-100 px-4 py-2 rounded-xl">
                        {new Date(s.created_at).toLocaleDateString('lv-LV')}
                      </span>
                      <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-xl">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="font-bold text-emerald-800 text-sm">Aktīvs</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center pt-24 border-t-4 border-dashed border-blue-200 pb-24">
              <Link 
                href="/ievietot"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-16 py-6 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              >
                🚀 Pievienot savu auto
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
