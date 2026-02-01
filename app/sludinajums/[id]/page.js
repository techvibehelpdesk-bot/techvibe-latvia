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

  // FORCE DEBUG - izdrukā visu
  const imagesRaw = sludinajums?.images_public_urls;
  let images = [];
  if (imagesRaw) {
    if (typeof imagesRaw === 'string') {
      images = JSON.parse(imagesRaw);
    } else {
      images = imagesRaw;
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold">{sludinajums?.title}</h1>
      
      {/* RAW DATA */}
      <details className="bg-gray-900 text-white p-6 rounded-3xl">
        <summary className="text-xl font-bold cursor-pointer">RAW DB (klikšķini)</summary>
        <pre className="mt-4 text-sm">{JSON.stringify(sludinajums, null, 2)}</pre>
      </details>

      {/* BILDES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <div key={i}>
            <img src={img} alt="" className="w-full h-64 object-cover rounded-2xl shadow-xl" />
            <p className="text-xs mt-2 truncate text-blue-600">{img}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
