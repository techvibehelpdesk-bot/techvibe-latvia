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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50 p-8">
        <div className="bg-red-50 p-8 rounded-3xl border-4 border-red-200 max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-4">❌ Sludinājums nav atrasts</h1>
          <pre className="text-sm bg-white p-4 rounded-2xl">{error?.message || 'ID: ' + params.id}</pre>
        </div>
      </div>
    );
  }

  const imageUrls = [
    sludinajums.thumbnail_url,
    ...(sludinajums.images ? JSON.parse(sludinajums.images || '[]') : [])
  ].filter(Boolean).slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      {/* Hero ar galveno bildi kā homepage */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden rounded-3xl mx-4 mt-12 shadow-2xl">
        {imageUrls[0] ? (
          <Image 
            src={imageUrls[0]} 
            alt={sludinajums.title}
            fill 
            className="object-cover hover:scale-105 transition-transform duration-500"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <span className="text-4xl">📷</span>
          </div>
        )}
        {/* Cena kā homepage zaļais badge */}
        <div className="absolute top-6 right-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-8 py-6 rounded-3xl shadow-2xl text-3xl font-bold">
          <span className="text-2xl mr-2">€</span>{sludinajums.price}
        </div>
        <h1 className="absolute bottom-8 left-8 right-8 text-4xl md:text-5xl font-bold text-white drop-shadow-2xl text-center leading-tight">
          {sludinajums.title}
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Grid bildes kā homepage cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {imageUrls.slice(1).map((img, i) => (
            <div key={i} className="group relative rounded-2xl aspect-square bg-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all overflow-hidden cursor-pointer">
              <Image 
                src={img} 
                alt="" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all" />
              <div className="absolute bottom-4 left-4 right-4 text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-all">
                +{imageUrls.slice(1).length - i} foto
              </div>
            </div>
          ))}
        </div>

        {/* Info cards kā homepage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              📍
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{sludinajums.city || 'Rīga'}</h3>
            <p className="text-emerald-600 font-semibold">Pilsēta</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              🏷️
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{sludinajums.category}</h3>
            <p className="text-blue-600 font-semibold">Kategorija</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              👤
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{sludinajums.user_name || 'Pārdodējs'}</h3>
            <p className="text-purple-600 font-semibold">Kontakts</p>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border hover:shadow-2xl transition-all">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              ⏰
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {new Date(sludinajums.created_at).toLocaleDateString('lv')}
            </h3>
            <p className="text-orange-600 font-semibold">Publicēts</p>
          </div>
        </div>

        {/* Apraksts kā homepage description */}
        <div className="bg-white/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent">📝 Pilns apraksts</h3>
          <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
            {sludinajums.description}
          </div>
        </div>
      </div>
    </div>
  );
}
