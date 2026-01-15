import Link from 'next/link';

async function getAutoData() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  const response = await fetch(`${supabaseUrl}/rest/v1/sludinajumi?select=id,title,description,price,category,city,status,created_at,image_urls&category=eq.auto&status=eq.gaida&order=created_at.desc`, {
    headers: {
      'Authorization': `Bearer ${supabaseKey}`,
      'apikey': supabaseKey,
    },
    cache: 'no-store', // Fresh dati katru reizi
  });
  
  if (!response.ok) {
    console.error('Supabase fetch error:', response.status);
    return [];
  }
  
  return await response.json();
}

export default async function AutoPage() {
  const sludinajumi = await getAutoData();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent mb-4">
            🚗 Auto sludinājumi
          </h1>
          <p className="text-xl text-gray-600">TechVibe – ss.com klons Latvijā</p>
        </div>
        
        {sludinajumi.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-200 rounded-3xl flex items-center justify-center">
              <span className="text-3xl">🚗</span>
            </div>
            <p className="text-2xl text-gray-500 mb-4">Pašlaik nav auto sludinājumu</p>
            <Link href="/ievietot" className="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl">
              ➕ Pievienot pirmo auto!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sludinajumi.map((s) => (
              <Link 
                key={s.id} 
                href={`/sludinajums/${s.id}`} 
                className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] border-2 border-white hover:border-blue-200"
              >
                <div className="h-56 overflow-hidden relative bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-blue-50">
                  {s.image_urls && s.image_urls.length > 0 ? (
                    <img 
                      src={s.image_urls[0]} 
                      alt={s.title || 'Auto'} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600">
                      <span className="text-4xl text-white drop-shadow-lg">🚗</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
                    {s.title || 'Bez nosaukuma'}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {s.description || 'Detalizēta informācija pieejama sazinoties.'}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-black text-green-600 drop-shadow-sm">
                      €{s.price?.toLocaleString() || 'Cenā'}
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-xl text-sm font-semibold shadow-sm">
                      {s.city || 'Rīga'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>
                      {s.created_at ? new Date(s.created_at).toLocaleDateString('lv-LV', {
                        year: 'numeric', month: 'short', day: 'numeric'
                      }) : 'Tikko pievienots'}
                    </span>
                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">Status: {s.status}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
