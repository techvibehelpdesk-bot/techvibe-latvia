import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

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

  // BILDES NO DB
  let dbImages = [];
  if (sludinajums?.images_public_urls) {
    try { dbImages = JSON.parse(sludinajums.images_public_urls); }
    catch(e) {}
  }

  // + VISAS NO BUCKET (backup)
  const { data: bucketFiles } = await supabase
    .from('storage.objects')
    .select('name')
    .eq('bucket_id', 'sludinajumi')
    .limit(20);

  const allImages = [
    ...(sludinajums?.thumbnail_url ? [sludinajums.thumbnail_url] : []),
    ...dbImages,
    ...(bucketFiles || []).map(f => `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/sludinajumi/${f.name}`)
  ].filter(Boolean).slice(0, 12); // max 12 unikālas

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-gray-900 via-slate-800 to-emerald-800 bg-clip-text text-transparent mb-8 drop-shadow-2xl">
            {sludinajums?.title || 'Sludinājums'}
          </h1>
          <div className="inline-flex px-12 py-8 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-700 rounded-3xl text-5xl md:text-6xl font-black text-white shadow-3xl ring-8 ring-emerald-200/50 backdrop-blur-xl">
            <span className="text-4xl md:text-5xl mr-4">€</span>{sludinajums?.price || 0}
          </div>
        </div>

        {/* GALERIJA */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {allImages.map((img, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-700 bg-white/80 backdrop-blur-xl border border-slate-100/50">
              <div className="relative w-full h-80 xl:h-96">
                <Image
                  src={img}
                  alt={`${sludinajums?.title || ''} - attēls ${i+1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-100 group-hover:brightness-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  priority={i < 6}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all p-6 flex items-end z-10">
                <div className="text-white font-bold text-xl drop-shadow-2xl flex items-center gap-2">
                  📱 Pilnekrāns <span className="text-sm">({i+1}/{allImages.length})</span>
                </div>
              </div>
            </div>
          ))}
          {allImages.length === 0 && (
            <div className="col-span-full text-center py-32 text-gray-400 text-3xl flex flex-col items-center gap-4">
              <span className="text-7xl">🖼️</span>
              <p>Pagaidām nav pievienotu attēlu</p>
            </div>
          )}
        </div>

        {/* INFO KARTES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="group p-12 rounded-4xl bg-white/70 backdrop-blur-2xl shadow-3xl border border-emerald-100/50 hover:shadow-emerald-300/50 hover:-translate-y-2 transition-all duration-500">
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center text-3xl shadow-2xl mr-6">📍</div>
              <span className="text-xl font-bold text-emerald-700 bg-emerald-100/80 px-6 py-3 rounded-2xl shadow-lg">Atrašanās vieta</span>
            </div>
            <p className="text-5xl font-black text-gray-900">{sludinajums?.city || 'Rīga'}</p>
          </div>
          
          <div className="group p-12 rounded-4xl bg-white/70 backdrop-blur-2xl shadow-3xl border border-blue-100/50 hover:shadow-blue-300/50 hover:-translate-y-2 transition-all duration-500">
            <div className="flex items-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center text-3xl shadow-2xl mr-6">🏷️</div>
              <span className="text-xl font-bold text-blue-700 bg-blue-100/80 px-6 py-3 rounded-2xl shadow-lg">Kategorija</span>
            </div>
            <p className="text-5xl font-black text-gray-900">{sludinajums?.category || 'Auto'}</p>
          </div>
        </div>

        {/* APRKSTS */}
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-2xl p-16 rounded-4xl shadow-4xl border border-slate-100/50">
          <h3 className="text-5xl font-black mb-12 bg-gradient-to-r from-slate-900 to-gray-700 bg-clip-text text-transparent flex items-center gap-4">
            📄 Pilns apraksts
          </h3>
          <div className="prose prose-2xl max-w-none text-gray-800 leading-relaxed text-xl">
            <p>{sludinajums?.description || 'Detalizēts apraksts šeit...'}</p>
          </div>
        </div>

        {/* DEBUG MINI */}
        <div className="text-center text-sm text-gray-500 p-8 bg-slate-100/50 rounded-3xl">
          📊 Bildes: {allImages.length} | DB: {dbImages.length} | Bucket: {bucketFiles?.length || 0}
        </div>
      </div>
    </div>
  );
}
