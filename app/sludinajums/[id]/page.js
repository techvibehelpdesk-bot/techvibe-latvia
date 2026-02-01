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

  if (!sludinajums) return <div className="p-20 text-center text-3xl text-red-600">Sludinājums nav atrasts</div>;

  let imageUrls = [];
  if (sludinajums.thumbnail_url) imageUrls.push(sludinajums.thumbnail_url);
  try {
    imageUrls.push(...JSON.parse(sludinajums.images || '[]'));
  } catch {}

  imageUrls = imageUrls.filter(Boolean).slice(0, 12);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* LEFT: Info sidebar kā screenshot */}
          <div className="lg:col-span-1 space-y-8">
            {/* Cena hero */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-12 rounded-3xl shadow-2xl text-center">
              <div className="text-6xl font-black mb-4">€{sludinajums.price}</div>
              <div className="text-2xl font-bold opacity-90">Cena</div>
            </div>

            {/* Info cards */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 text-2xl">📍</div>
                <h3 className="text-2xl font-bold text-gray-900">{sludinajums.city || 'Rīga'}</h3>
                <p className="text-emerald-600 font-semibold text-lg">Pilsēta</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 text-2xl">🏷️</div>
                <h3 className="text-2xl font-bold text-gray-900">{sludinajums.category}</h3>
                <p className="text-blue-600 font-semibold text-lg">Kategorija</p>
              </div>
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border hover:shadow-2xl transition-all">
                <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 text-2xl">⏰</div>
                <h3 className="text-2xl font-bold text-gray-900">{new Date(sludinajums.created_at).toLocaleDateString('lv')}</h3>
                <p className="text-purple-600 font-semibold text-lg">Publicēts</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Bildes + apraksts */}
          <div className="lg:col-span-2 space-y-12">
            {/* Hero bilde */}
            <div className="relative h-96 lg:h-[500px] rounded-3xl shadow-2xl overflow-hidden bg-gray-200">
              {imageUrls[0] ? (
                <Image src={imageUrls[0]} alt="" fill className="object-cover hover:scale-105 transition-transform" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-gray-200 to-gray-300">📷</div>
              )}
            </div>

            {/* Bildes grid */}
            {imageUrls.length > 1 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {imageUrls.slice(1).map((img, i) => (
                  <div key={i} className="group relative rounded-2xl aspect-square bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden cursor-pointer">
                    <Image src={img} alt="" fill className="object-cover group-hover:scale-110 transition-transform rounded-xl" />
                  </div>
                ))}
              </div>
            )}

            {/* Apraksts */}
            <div className="bg-white/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl">
              <h2 className="text-4xl font-bold mb-8 text-gray-900">📝 Apraksts</h2>
              <div className="text-xl text-gray-700 whitespace-pre-wrap leading-relaxed">
                {sludinajums.description || 'Nav pievienots apraksts.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
