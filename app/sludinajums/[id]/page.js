import { createClient } from '@supabase/supabase-js';

export default async function SludinajumaLapa({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: sludinajums } = await supabase
    .from('sludinajumi')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'published')
    .single();

  if (!sludinajums) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-2xl">Sludinājums nav atrasts.</div>
      </div>
    );
  }

  // Parse images JSON array vai tukšs
  let images = [];
  try {
    images = JSON.parse(sludinajums.images || '[]');
  } catch {
    images = [];
  }
  const allImages = [
    sludinajums.thumbnail_url, 
    ...images
  ].filter(Boolean); // Noņem null/empty

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Galerija */}
          {allImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-6 bg-gradient-to-r from-gray-50 to-white">
              {allImages.slice(0, 8).map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <img 
                    src={img} 
                    alt={`Attēls ${i+1}`} 
                    className="w-full h-48 md:h-64 object-cover group-hover:brightness-110 transition-all" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-500 p-6 rounded-b-xl">
              Nav attēlu
            </div>
          )}
          
          {/* Info */}
          <div className="p-8 lg:p-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">{sludinajums.title}</h1>
            <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent mb-8 py-2 px-4 rounded-xl inline-block shadow-lg">
              {sludinajums.price} €
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <p className="text-xl text-gray-700"><strong>📱 Kategorija:</strong> {sludinajums.category}</p>
                <p className="text-xl text-gray-700"><strong>📍 Pilsēta:</strong> {sludinajums.city || sludinajums.location}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-8 rounded-2xl border-l-4 border-indigo-500">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">📝 Apraksts:</h3>
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">{sludinajums.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
