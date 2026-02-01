import { createClient } from '@supabase/supabase-js';

export const revalidate = 0;
export const dynamic = 'force-dynamic';

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

  const images = Array.isArray(sludinajums?.image_public_urls) ? sludinajums.image_public_urls : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900/20 to-black text-white overflow-hidden">
      
      {/* HERO ar galveno Audi foto */}
      <div className="relative h-screen">
        <img 
          src={images[0] || '/placeholder.jpg'} 
          className="w-full h-full object-cover brightness-50" 
          alt="Audi"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-2xl bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              {sludinajums?.title || 'Audi A3'}
            </h1>
            <div className="flex flex-wrap gap-6 text-2xl mb-8 text-gray-300">
              <span>{sludinajums?.year || '2024'}</span>
              <span>•</span>
              <span>{sludinajums?.power || '250'} ZS</span>
              <span>•</span>
              <span className="text-green-400 font-bold text-3xl">{sludinajums?.price}€</span>
            </div>
          </div>
        </div>
      </div>

      {/* SATURS */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Galerija */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🖼️ Galerija ({images.length} foto)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {images.slice(1, 13).map((img, i) => (
                <div key={i} className="group">
                  <img 
                    src={img} 
                    className="w-full aspect-square object-cover rounded-3xl shadow-2xl group-hover:scale-105 group-hover:shadow-3xl transition-all duration-500 cursor-pointer hover:-rotate-1" 
                    alt={`Foto ${i+1}`}
                  />
                  <p className="text-center mt-3 font-semibold text-gray-400">Foto {i+2}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Specs + CTA */}
          <div className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            
            {/* Specs */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:border-red-400/50 transition-all">
              <h3 className="text-3xl font-bold mb-8 text-center text-white">⚙️ Specs</h3>
              <div className="space-y-6 text-center">
                <div>
                  <div className="text-5xl font-black text-red-400">{sludinajums?.power || '250'}</div>
                  <div className="text-sm uppercase text-gray-500 tracking-widest">ZS</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-blue-400">{sludinajums?.fuel || '6.2'}</div>
                  <div className="text-sm uppercase text-gray-500 tracking-widest">l/100km</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-emerald-400">{sludinajums?.year || '2024'}</div>
                  <div className="text-sm uppercase text-gray-500 tracking-widest">Gads</div>
                </div>
              </div>
            </div>

            {/* Kontakti */}
            <div className="bg-gradient-to-b from-red-600/20 to-orange-600/30 backdrop-blur-xl rounded-3xl p-10 text-center border border-red-400/30 hover:border-red-400">
              <div className="text-4xl mb-6">📞 Pārdevējs</div>
              <div className="text-5xl font-black mb-8 text-white">+371 29 *** ***</div>
              <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-5 px-8 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:scale-[1.05] transition-all duration-300 tracking-wide">
                💬 Sazināties
              </button>
            </div>
          </div>
        </div>

        {/* Apraksts apakšā */}
        <div className="max-w-4xl mx-auto mt-32">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-gray-300 to-white bg-clip-text text-transparent">
              📝 Pilns apraksts
            </h2>
            <div className="text-xl leading-relaxed whitespace-pre-wrap text-gray-300">
              {sludinajums?.description || 'Perfekts Audi stāvoklī. Gatavs braukšanai!'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
