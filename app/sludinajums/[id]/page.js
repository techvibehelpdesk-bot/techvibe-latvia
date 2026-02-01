import { createClient } from '@supabase/supabase-js';

export default async function SludinajumaLapa({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: sludinajums, error } = await supabase
    .from('sludinajumi')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'published')
    .single();

  // DEBUG: Izvelc visas bildes
  let allImages = [];
  if (sludinajums?.images_public_urls) {
    try {
      allImages = JSON.parse(sludinajums.images_public_urls);
    } catch(e) {}
  }
  if (sludinajums?.thumbnail_url) allImages.unshift(sludinajums.thumbnail_url);

  return (
    <div className="min-h-screen p-8 max-w-6xl mx-auto space-y-8 bg-gradient-to-br from-blue-50 to-emerald-50">
      
      {/* 1. SLUDINĀJUMS INFO */}
      <div className="bg-white p-8 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold mb-4">{sludinajums?.title || 'NAV DATUS'}</h1>
        <p className="text-3xl font-black text-emerald-600">€{sludinajums?.price || 0}</p>
      </div>

      {/* 2. VISAS BILDES NO DB - LAI REDZI */}
      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-3xl">
        <h2 className="text-3xl font-bold mb-6 text-yellow-800">🖼️ ATRASTĀS BILDES ({allImages.length})</h2>
        {allImages.length === 0 ? (
          <div className="text-center py-12 text-2xl text-yellow-700 bg-yellow-200 rounded-2xl">
            ❌ NAV BILŽU DB! Pārbaudi images_public_urls kolonnu
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allImages.map((url, i) => (
              <div key={i} className="space-y-2 bg-white p-4 rounded-2xl shadow-lg">
                <img 
                  src={url} 
                  alt={`Bilde ${i+1}`}
                  className="w-full h-64 object-cover rounded-xl border-4 border-gray-200 hover:border-blue-400 transition-all"
                />
                <a href={url} target="_blank" className="text-blue-600 text-sm font-mono block truncate hover:underline">
                  {url}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. RAW DB DATI */}
      <details className="bg-gray-900 text-white p-8 rounded-3xl">
        <summary className="text-2xl font-bold cursor-pointer p-4 bg-gray-800 rounded-2xl hover:bg-gray-700">
          📊 RAW DB JSON (klikšķini)
        </summary>
        <pre className="mt-4 text-sm overflow-auto max-h-96 font-mono">
          {JSON.stringify(sludinajums, null, 2)}
        </pre>
      </details>

      {error && (
        <div className="bg-red-100 border-2 border-red-400 p-8 rounded-3xl text-red-800">
          <h2 className="text-2xl font-bold mb-4">❌ KĻŪDA:</h2>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
