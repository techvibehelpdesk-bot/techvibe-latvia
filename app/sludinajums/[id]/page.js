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

  const images = Array.isArray(sludinajums?.image_public_urls) ? sludinajums.image_public_urls : [];
  const mainImage = images[0] || '/placeholder-car.jpg'; // Pirmais attēls kā galvenais

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-black text-white">
      {/* HERO SECTION ar galveno attēlu */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 py-32 lg:py-48">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-6 drop-shadow-2xl">
              {sludinajums?.title}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-6 text-xl text-gray-300">
              <span>ID: {params.id}</span>
              <span>•</span>
              <span>{images.length} foto</span>
              <span>•</span>
              <span className="text-2xl font-bold text-green-400">{sludinajums?.year || '2024'} gads</span>
            </div>
          </div>
        </div>
        <img
          src={mainImage}
          alt="Galvenais attēls"
          className="w-full h-[70vh] lg:h-[80vh] object-cover absolute inset-0"
        />
      </section>

      <div className="max-w-7xl mx-auto px-4 py-24 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 lg:gap-16">

          {/* GALVENĀ INFO KOLONNA */}
          <div className="xl:col-span-2 space-y-12">
            
            {/* GALERIJAS CAROUSEL/STĪPA */}
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                🖼️ Foto galerija
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {images.slice(0, 12).map((img, i) => (
                  <div 
                    key={i}
                    className="group relative overflow-hidden rounded-2xl bg-black/30 hover:bg-black/50 border-2 border-white/10 hover:border-orange-400/50 transition-all duration-500 hover:scale-105 cursor-pointer aspect-square"
                  >
                    <img
                      src={img}
                      alt={`Foto ${i+1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                      <span className="font-bold text-orange-400 text-sm">Foto {i+1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DETALIZĒTS APRKSTS */}
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-10 border border-white/10">
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
                📄 Pilns apraksts
              </h2>
              <div className="text-xl leading-relaxed text-gray-200 prose prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{sludinajums?.description || 'Detalizēts apraksts tiks pievienots.'}</p>
              </div>
            </div>

          </div>

          {/* INFO SIDEBAR */}
          <div className="space-y-8 sticky top-24 self-start">
            
            {/* CENA - JAUDĪGA KARTĪTE */}
            <div className="bg-gradient-to-b from-orange-500/20 to-red-600/30 backdrop-blur-xl rounded-3xl p-10 text-center border border-orange-400/30 hover:border-orange-400 transition-all hover:shadow-2xl hover:scale-[1.02] shadow-xl">
              <div className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
                {sludinajums?.price || 'Cena'} €
              </div>
              <p className="text-2xl font-bold text-white/90 mb-2 tracking-wide">IETILPST VISĀ</p>
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full mt-4" />
            </div>

            {/* TEHNISKĀS IESPĒJAS */}
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-purple-400/50 transition-all hover:shadow-2xl">
              <h3 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                ⚡ Specs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="text-4xl font-black text-orange-400">{sludinajums?.power || '250'}</div>
                  <div className="text-sm uppercase tracking-wider text-gray-400">ZS</div>
                </div>
                <div className="space-y-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="text-4xl font-black text-green-400">{sludinajums?.fuel || '6.2'}</div>
                  <div className="text-sm uppercase tracking-wider text-gray-400">l/100km</div>
                </div>
                <div className="space-y-2 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all">
                  <div className="text-4xl font-black text-blue-400">{sludinajums?.year || '2025'}</div>
                  <div className="text-sm uppercase tracking-wider text-gray-400">Gads</div>
                </div>
              </div>
            </div>

            {/* CTA KONTAKTU BLOKS */}
            <div className="bg-gradient-to-b from-emerald-500/20 to-green-600/30 backdrop-blur-xl rounded-3xl p-10 border border-emerald-400/30 hover:border-emerald-400 text-center hover:shadow-2xl hover:scale-[1.02] transition-all shadow-xl">
              <div className="text-3xl mb-6">📱 Ātra sazvanīšanās</div>
              <div className="text-4xl font-black mb-8 text-emerald-200 drop-shadow-lg">+371 29 *** ***</div>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-6 px-8 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:scale-105 hover:from-emerald-600 hover:to-green-700 transition-all duration-300 tracking-wide uppercase">
                💬 Sazināties TAGAD
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
