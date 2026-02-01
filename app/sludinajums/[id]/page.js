import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

export default async function SludinajumaLapa({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: sludinajums } = await supabase
    .from('sludinajumi')
    .select(`
      *,
      images_public_urls
    `)
    .eq('id', params.id)
    .single();

  // PAŅEM TAVUS BILDES NO DB
  let images = [];
  if (sludinajums?.images_public_urls && sludinajums.images_public_urls.length > 0) {
    images = Array.isArray(sludinajums.images_public_urls) 
      ? sludinajums.images_public_urls 
      : JSON.parse(sludinajums.images_public_urls || '[]');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-slate-800 bg-clip-text text-transparent mb-8">
            {sludinajums?.title}
          </h1>
          <div className="inline-flex px-10 py-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-3xl text-5xl font-black text-white shadow-3xl">
            €{sludinajums?.price}
          </div>
        </div>

        {/* BILŽU GALERIJA - TAVS 3 BILDES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((imgUrl, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all bg-white/80 backdrop-blur-sm border-2 border-slate-100">
              <div className="w-full h-96 relative">
                <Image
                  src={imgUrl}
                  alt={`Attēls ${i+1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full text-center py-32 text-gray-400">
              Nav pievienotu attēlu
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="p-8 bg-white/70 rounded-3xl shadow-xl text-center">
            <h3 className="text-2xl font-bold text-emerald-700 mb-4">📍 Vieta</h3>
            <p className="text-4xl font-black">{sludinajums?.city || 'Rīga'}</p>
          </div>
          <div className="p-8 bg-white/70 rounded-3xl shadow-xl text-center">
            <h3 className="text-2xl font-bold text-blue-700 mb-4">🏷️ Kategorija</h3>
            <p className="text-4xl font-black">{sludinajums?.category}</p>
          </div>
        </div>

        {/* APRKSTS */}
        <div className="max-w-4xl mx-auto bg-white/70 p-12 rounded-4xl shadow-2xl">
          <h3 className="text-4xl font-bold mb-8">📄 Apraksts</h3>
          <p className="text-xl text-gray-700 whitespace-pre-wrap">
            {sludinajums?.description}
          </p>
        </div>

        {/* DEBUG */}
        <details className="p-6 bg-slate-900 text-white rounded-3xl max-w-4xl mx-auto">
          <summary className="text-xl font-bold cursor-pointer">DEBUG ({images.length} bildes)</summary>
          <pre className="mt-4 text-sm overflow-auto">
            {JSON.stringify(images, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}
