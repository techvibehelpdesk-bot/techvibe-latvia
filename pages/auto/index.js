import Link from 'next/link';

async function getAutoSludinajumi() {
  try {
    console.log('🚀 SERVER DEBUG: Sākam fetch auto...');
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    console.log('🔑 SERVER DEBUG: URL OK?', !!supabaseUrl);
    console.log('🔑 SERVER DEBUG: KEY OK?', !!supabaseKey);

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('TRŪKST ENV!');
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/sludinajumi?select=*&status=eq.published&category=ilike.%25auto%25`,
      {
        method: 'GET',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // fresh data
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ SERVER KĻŪDA:', response.status, errorText);
      return [];
    }

    const data = await response.json();
    console.log('✅ SERVER DEBUG: Iegūti:', data.length);
    
    const autoData = data.filter(s => s.category?.toLowerCase().includes('auto'));
    console.log('🚗 SERVER DEBUG: Auto ieraksti:', autoData.length);
    
    return autoData;
  } catch (err) {
    console.error('💥 SERVER ERROR:', err.message);
    return [];
  }
}

export default async function AutoPage() {
  const sludinajumi = await getAutoSludinajumi();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 rounded-3xl shadow-2xl">
          🚗 Auto sludinājumi ({sludinajumi.length})
        </h1>

        {sludinajumi.length === 0 ? (
          <div className="text-center py-20 max-w-2xl mx-auto">
            <div className="w-32 h-32 bg-gradient-to-r from-gray-100 to-gray-200 rounded-3xl mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl">🚗</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Vēl nav auto sludinājumu</h2>
            <Link
              href="/ievietot"
              className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all inline-block"
            >
              ➕ Pievienot sludinājumu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sludinajumi.map((s) => (
              <Link
                key={s.id}
                href={`/auto/${s.id}`}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all border hover:border-blue-200"
              >
                <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
                  {s.thumbnail_url ? (
                    <img src={s.thumbnail_url} alt={s.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl opacity-50">🚗</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
                    {s.title}
                  </h3>
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      €{Number(s.price).toLocaleString()}
                    </span>
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                      {s.city}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {s.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
