import { createClient } from '@supabase/supabase-js';

export default async function SludinajumaLapa({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // 1. SLUDINĀJUMS
  const { data: sludinajums } = await supabase
    .from('sludinajumi')
    .select('*')
    .eq('id', params.id)
    .single();

  // 2. VISAS BILDES NO BUCKET (nevis no DB)
  const { data: bucketFiles } = await supabase
    .from('storage.objects')
    .select('name')
    .eq('bucket_id', 'sludinajumi')
    .eq('metadata-> mimetype', 'image/%') // tikai bildes
    .limit(20);

  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const imageUrls = bucketFiles?.map(file => 
    `${SUPABASE_URL}/storage/v1/object/public/sludinajumi/${file.name}`
  ) || [];

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto space-y-12 bg-gradient-to-br from-slate-50 to-emerald-50">
      
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-6xl font-black bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent mb-8">
          {sludinajums?.title || 'Sludinājums'}
        </h1>
        <div className="inline-flex px-12 py-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl text-6xl font-black text-white shadow-3xl">
          €{sludinajums?.price || 0}
        </div>
      </div>

      {/* GALERIJA NO BUCKET */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {imageUrls.map((url, i) => (
          <div key={i} className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 bg-white/80 backdrop-blur-sm border">
            <div className="w-full h-80 relative">
              <img
                src={url}
                alt={`Bilde ${i+1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                <span className="text-white text-xl font-bold drop-shadow-2xl">📱 Pilnekrāns</span>
              </div>
            </div>
            <div className="p-3 text-center text-xs text-gray-600 truncate">
              {url.split('/').pop()}
            </div>
          </div>
        ))}
      </div>

      {/* INFO */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="p-10 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl">
          <h3 className="text-3xl font-bold mb-6 flex items-center text-emerald-800">
            📍 {sludinajums?.city || 'Rīga'}
          </h3>
          <p className="text-4xl font-black text-gray-900">{sludinajums?.category}</p>
        </div>
        <div className="p-10 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl">
          <h3 className="text-3xl font-bold mb-6 text-blue-800">📄 Apraksts</h3>
          <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
            {sludinajums?.description || 'Nav apraksta'}
          </p>
        </div>
      </div>

      {/* DEBUG INFO */}
      <details className="p-8 bg-gray-900/90 text-white rounded-4xl backdrop-blur-xl">
        <summary className="text-2xl font-bold cursor-pointer p-4 rounded-3xl hover:bg-gray-800">
          🔧 DEBUG (bildes: {imageUrls.length})
        </summary>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <h4 className="font-bold mb-2">DB dati:</h4>
            <pre className="text-sm bg-gray-800 p-4 rounded-2xl max-h-64 overflow-auto">
              {JSON.stringify(sludinajums, null, 2)}
            </pre>
          </div>
          <div>
            <h4 className="font-bold mb-2">Bucket faili:</h4>
            <pre className="text-sm bg-gray-800 p-4 rounded-2xl max-h-64 overflow-auto">
              {JSON.stringify(imageUrls.slice(0,5), null, 2)}
            </pre>
          </div>
        </div>
      </details>
    </div>
  );
}
