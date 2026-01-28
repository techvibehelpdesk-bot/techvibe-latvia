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
    .eq('status', 'published')
    .single();

  if (!sludinajums) return <div>Sludinājums nav atrasts.</div>;

  let images = [];
  if (sludinajums.images) {
    try {
      images = JSON.parse(sludinajums.images);
    } catch {}
  }
  const allImages = [
    sludinajums.thumbnail_url,
    ...images
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fafc] to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            {sludinajums.title}
          </h1>
          <div className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent drop-shadow-lg">
            {sludinajums.price} €
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Galerija KĀ SCREENSHOT */}
          <div className="space-y-4">
            {/* Galvenais attēls */}
            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
              {allImages[0] && (
                <Image
                  src={allImages[0]}
                  alt="Galvenais"
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                  priority
                />
              )}
            </div>
            
            {/* Grid thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {allImages.slice(1, 9).map((img, i) => (
                  <div key={i} className="relative h-32 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group">
                    <Image
                      src={img}
                      alt={`Thumb ${i}`}
                      fill
                      className="object-cover group-hover:brightness-110"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Kategorija</span>
                <span className="font-semibold text-xl">{sludinajums.category}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-500">Pilsēta</span>
                <span className="font-semibold text-xl">{sludinajums.city}</span>
              </div>
            </div>

            <div className="p-8 bg-white border-2 border-gray-100 rounded-3xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                📄 Apraksts
              </h3>
              <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">
                {sludinajums.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
