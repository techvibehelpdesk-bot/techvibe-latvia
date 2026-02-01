import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

export default async function SludinajumaLapa({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  console.log('ID:', params.id);

  const { data: sludinajums, error } = await supabase
    .from('sludinajumi')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'published')
    .single();

  console.log('Data:', sludinajums);
  console.log('Error:', error);

  if (error || !sludinajums) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-xl text-gray-500 p-8">
        <h1>❌ DEBUG INFO</h1>
        <pre className="bg-red-50 p-6 rounded-xl mt-4 text-sm border-2 border-red-200 max-w-2xl">
          {JSON.stringify({ error: error?.message, id: params.id }, null, 2)}
        </pre>
      </div>
    );
  }

  // Būvē pilnus publiskos URL (ja DB ir tikai path)
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const getImageUrl = (path) => path ? `${SUPABASE_URL}/storage/v1/object/public/sludinajumi/${path}` : null;
  
  const imageUrls = [
    getImageUrl(sludinajums.thumbnail_url),
    ...(sludinajums.images ? JSON.parse(sludinajums.images).map(getImageUrl) : [])
  ].filter(Boolean).slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-slate-800 bg-clip-text text-transparent mb-8">
            {sludinajums.title}
          </h1>
          <div className="inline-flex px-10 py-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-3xl text-5xl font-black text-white shadow-3xl ring-4 ring-emerald-200/50">
            <span className="text-4xl mr-3">€</span>{sludinajums.price}
          </div>
        </div>

        {/* Modern Image Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {imageUrls.map((img, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-white/70 to-slate-50 shadow-xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-500 border border-slate-100/50 backdrop-blur-sm">
              <div className="relative w-full h-80 sm:h-96 aspect-[4/3]">
                <Image
                  src={img}
                  alt={sludinajums.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={i < 4}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all p-6 flex items-end">
                <div className="text-white font-bold text-xl drop-shadow-lg">
                  📱 Skatīt pilnu | 💻 4K
                </div>
              </div>
            </div>
          ))}
          {imageUrls.length === 0 && (
            <div className="col-span-full text-center py-32 text-gray-400">
              Nav pievienotu attēlu
            </div>
          )}
        </div>

        {/* Modern Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="group p-10 rounded-3xl bg-white/60 backdrop-blur-xl shadow-2xl border border-emerald-100/50 hover:shadow-emerald-200/50 transition-all hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center text-2xl shadow-xl mr-4">
                📍
              </div>
              <span className="text-lg font-bold text-emerald-700 bg-emerald-100/80 px-4 py-2 rounded-xl">Atrašanās vieta</span>
            </div>
            <p className="text-4xl font-black text-gray-900">{sludinajums.city || 'Rīga'}</p>
          </div>
          <div className="group p-10 rounded-3xl bg-white/60 backdrop-blur-xl shadow-2xl border border-blue-100/50 hover:shadow-blue-200/50 transition-all hover:-translate-y-2">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center text-2xl shadow-xl mr-4">
                🏷️
              </div>
              <span className="text-lg font-bold text-blue-700 bg-blue-100/80 px-4 py-2 rounded-xl">Kategorija</span>
            </div>
            <p className="text-4xl font-black text-gray-900">{sludinajums.category}</p>
          </div>
        </div>

        {/* Description */}
        <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl p-12 rounded-4xl shadow-3xl border border-slate-100/50">
          <h3 className="text-4xl font-black bg-gradient-to-r from-slate-800 to-gray-700 bg-clip-text text-transparent mb-10 flex items-center">
            📄 Pilns apraksts
          </h3>
          <div className="prose prose-xl max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
            {sludinajums.description}
          </div>
        </div>
      </div>
    </div>
  );
}
