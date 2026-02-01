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
    .single();

  // ✅ FIX: pareizais DB lauks no screenshot
  const imagesRaw = sludinajums?.image_public_urls;
  let images = [];
  if (imagesRaw) {
    if (typeof imagesRaw === 'string') {
      images = JSON.parse(imagesRaw);
    } else if (Array.isArray(imagesRaw)) {
      images = imagesRaw;
    }
  }

  console.log('✅ Images loaded:', images); // Debug konsolē

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">{sludinajums?.title}</h1>
      
      {/* RAW DATA DEBUG */}
      <details className="bg-gray-900 text-white p-6 rounded-3xl">
        <summary className="text-xl font-bold cursor-pointer">RAW DB (klikšķini)</summary>
        <pre className="mt-4 text-sm overflow-auto max-h-96">{JSON.stringify(sludinajums, null, 2)}</pre>
      </details>

      {/* ✅ BILDES GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.length > 0 ? (
          images.map((img, i) => (
            <div key={i} className="group">
              <img 
                src={img} 
                alt={sludinajums?.title || 'Auto'} 
                className="w-full h-64 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300" 
              />
              <p className="text-xs mt-2 truncate text-blue-600 hover:underline">{img}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center py-20 text-gray-500">Nav bilžu pieejamas</p>
        )}
      </div>

      {/* SPECIFIKĀCIJAS */}
      <div className="grid md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl shadow-2xl">
        <div>
          <h3 className="text-2xl font-semibold mb-4">💰 Cena</h3>
          <p className="text-3xl font-bold text-green-600">{sludinajums?.price}</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">⚡ Specs</h3>
          <p>Jauda: {sludinajums?.power || 'N/A'}</p>
          <p>Patēriņš: {sludinajums?.fuel || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
