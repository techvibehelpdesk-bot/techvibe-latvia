import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

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
    return <div className="p-12 text-center text-2xl">Sludinājums nav atrasts.</div>;
  }

  // Parse images JSON
  let images = [];
  if (sludinajums.images) {
    try {
      const parsed = JSON.parse(sludinajums.images);
      images = Array.isArray(parsed) ? parsed : [];
    } catch {}
  }

  const allImages = [
    sludinajums.thumbnail_url,
    ...images
  ].filter(img => img).map(img => img.startsWith('http') ? img : `${SUPABASE_URL}${img}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          {/* Hero attēls */}
          {allImages[0] ? (
            <div className="relative h-96 lg:h-[500px] overflow-hidden">
              <Image 
                src={allImages[0]} 
                alt={sludinajums.title} 
                fill 
                className="object-cover hover:scale-110 transition-transform duration-500" 
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-4xl text-gray-500">📷 Nav attēlu</span>
            </div>
          )}

          {/* Galerija thumbnails */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2 p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
              {allImages.slice(1, 9).map((img, i) => (
                <div key={i} className="group relative cursor-pointer hover:scale-110 transition-all">
                  <Image 
                    src={img} 
                    alt={`Mini ${i+1}`} 
                    width={120} 
                    height={90} 
                    className="rounded-lg shadow-md object-cover group-hover:shadow-xl" 
                  />
                </div>
              ))}
            </div>
          )}
          
          {/* Saturs */}
          <div className="p-10 lg:p-16 space-y-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
                {sludinajums.title}
              </h1>
              <div className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-emerald-500 to-green-600 text-transparent drop-shadow-2xl">
                {sludinajums.price} €
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-xl">
                <div className="flex items-center p-4 bg-blue-50 rounded-2xl">
                  <span className="text-2xl mr-4">🏷️</span>
                  <span><strong>Kategorija:</strong> {sludinajums.category}</span>
                </div>
                <div className="flex items-center p-4 bg-green-50 rounded-2xl">
                  <span className="text-2xl mr-4">📍</span>
                  <span><strong>Pilsēta:</strong> {sludinajums.city || sludinajums.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 lg:p-12 rounded-3xl border-4 border-indigo-200">
              <h3 className="text-3xl font-bold mb-6 flex items-center">
                <span className="text-4xl mr-4">📖</span>Apraksts
              </h3>
              <p className="text-xl leading-relaxed text-gray-800 whitespace-pre-wrap max-h-96 overflow-y-auto">
                {sludinajums.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
