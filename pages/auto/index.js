import Link from 'next/link';

export default async function AutoPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const data = await fetch(`${supabaseUrl}/rest/v1/sludinajumi?select=*`, {
    headers: { 'apikey': supabaseKey, 'Authorization': `Bearer ${supabaseKey}` }
  }).then(r => r.json());

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-12">🔍 DB DEBUG ({data.length} ieraksti)</h1>
      
      <div className="space-y-4">
        {data.map((s, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl shadow-lg border-l-4 border-green-500">
            <div className="font-bold text-xl mb-2">ID: {s.id}</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div><strong>Title:</strong> {s.title}</div>
              <div><strong>Category:</strong> <span className="bg-yellow-100 px-2 py-1 rounded">{s.category}</span></div>
              <div><strong>Status:</strong> <span className="bg-blue-100 px-2 py-1 rounded">{s.status}</span></div>
              <div><strong>Price:</strong> €{s.price}</div>
              <div><strong>City:</strong> {s.city}</div>
              <div><strong>Created:</strong> {new Date(s.created_at).toLocaleString()}</div>
            </div>
            <pre className="mt-4 p-3 bg-gray-100 rounded text-xs overflow-auto">{JSON.stringify(s, null, 2)}</pre>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-8 bg-emerald-50 border-2 border-emerald-200 rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">✅ STATUS:</h2>
        <ul className="text-lg space-y-2">
          <li>✅ DB ieraksti: {data.length}</li>
          <li>✅ BMW category: "{data[0]?.category}"</li>
          <li>✅ BMW status: "{data[0]?.status}"</li>
          <li>🔥 Tagad zinu precīzo struktūru!</li>
        </ul>
      </div>
    </div>
  );
}
