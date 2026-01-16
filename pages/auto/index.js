import Link from 'next/link';

async function getSludinajumi() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log('🔍 UNIVERSĀLS DEBUG: fetch BEZ filtra');

  const response = await fetch(
    `${supabaseUrl}/rest/v1/sludinajumi?select=*&status=eq.published`,
    {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      cache: 'no-store',
    }
  );

  const data = await response.json();
  console.log('📊 VISI published:', data.length);
  data.forEach((s, i) => console.log(`#${i}:`, s.category, s.title?.slice(0,30)));
  
  return data.filter(s => 
    s.category?.toLowerCase().includes('auto') ||
    s.title?.toLowerCase().includes('auto')
  );
}

export default async function AutoPage() {
  const sludinajumi = await getSludinajumi();

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 rounded-3xl shadow-2xl">
          🚗 Auto sludinājumi ({sludinajumi.length})
        </h1>
        
        <p className="text-center text-sm text-gray-600 mb-8 bg-yellow-50 p-4 rounded-xl">
          Console rāda VISU tavu DB – screenshot pēc refresh!
        </p>

        {sludinajumi.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-3xl mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl">🚗</span>
            </div>
            <h2 className="text-3xl font-bold mb-6">Nav auto sludinājumu</h2>
            <Link href="/ievietot" className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-bold hover:bg-blue-700">
              ➕ Pievienot
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sludinajumi.map((s) => (
              <Link key={s.id} href={`/auto/${s.id}`} className="block bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 p-6 border hover:border-blue-200">
                <div className="h-48 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                  <span className="text-4xl">🚗</span>
                </div>
                <h3 className="font-bold text-xl mb-3">{s.title}</h3>
                <div className="flex justify-between items-baseline mb-3">
                  <span className="text-2xl font-bold text-green-600">€{Number(s.price || 0).toLocaleString()}</span>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">{s.city}</span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">{s.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
