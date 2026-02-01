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
    <div className="min-h-screen" style={{background: 'linear-gradient(135deg, #0f0f23 0%, #1a0033 50%, #000 100%)', color: 'white'}}>
      
      {/* HERO SECTION */}
      <section className="relative h-screen overflow-hidden">
        <img 
          src={images[0]} 
          className="w-full h-full object-cover" 
          style={{filter: 'brightness(0.4)'}}
          alt="Audi"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8" 
             style={{background: 'linear-gradient(transparent 30%, rgba(0,0,0,0.8) 90%)'}}>
          <h1 className="text-5xl md:text-7xl font-black mb-6" 
              style={{background: 'linear-gradient(45deg, #ff1744, #ff8f00, #ffc107)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            {sludinajums?.title}
          </h1>
          <div className="text-2xl md:text-4xl mb-8 space-x-4">
            <span>{sludinajums?.year}</span>
            <span>•</span>
            <span>{sludinajums?.power} ZS</span>
          </div>
          <div className="text-5xl md:text-7xl font-black text-green-400 drop-shadow-2xl">
            {sludinajums?.price}€
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24 lg:px-12">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
          
          {/* Galerija */}
          <section className="lg:col-span-2 space-y-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16" 
                style={{background: 'linear-gradient(45deg, #8e24aa, #e91e63)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              🖼️ Foto Galerija ({images.length})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {images.slice(1).map((img, i) => (
                <div key={i} className="group cursor-pointer" style={{perspective: '1000px'}}>
                  <img 
                    src={img} 
                    className="w-full aspect-square object-cover rounded-3xl shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-3xl" 
                    alt={`Foto ${i+1}`}
                  />
                  <p className="text-center mt-4 font-semibold text-gray-400 text-lg">Foto {i+2}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-8 lg:sticky lg:top-24 self-start">
            
            {/* Specs */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl">
              <h3 className="text-3xl font-bold mb-10 text-center text-white">⚡ Specs</h3>
              <div className="space-y-8 text-center">
                <div>
                  <div className="text-5xl font-black text-red-400 mb-2">{sludinajums?.power}</div>
                  <div className="text-sm uppercase tracking-widest text-gray-500">ZS</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-cyan-400 mb-2">{sludinajums?.fuel}</div>
                  <div className="text-sm uppercase tracking-widest text-gray-500">l/100km</div>
                </div>
                <div>
                  <div className="text-5xl font-black text-emerald-400 mb-2">{sludinajums?.year}</div>
                  <div className="text-sm uppercase tracking-widest text-gray-500">Gads</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-red-600/20 via-orange-600/20 to-red-600/30 backdrop-blur-xl rounded-3xl p-12 text-center border-2 border-red-500/30 hover:border-red-500 hover:shadow-3xl transition-all duration-300">
              <div className="text-4xl font-bold mb-8">📱 Kontakti</div>
              <div className="text-5xl font-black mb-12 text-white tracking-wide">+371 29 *** ***</div>
              <button className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-red-600 hover:from-red-600 hover:via-orange-600 hover:to-red-700 text-white py-6 px-8 rounded-2xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.05] transition-all duration-300 uppercase tracking-wider">
                🚀 Iegādāties TAGAD
              </button>
            </div>
          </aside>
        </div>

        {/* Apraksts */}
        <section className="max-w-4xl mx-auto mt-32">
          <div className="bg-white/3 backdrop-blur-xl rounded-3xl p-16 border border-white/10 hover:shadow-3xl transition-all">
            <h2 className="text-5xl font-bold mb-12 text-center" 
                style={{background: 'linear-gradient(45deg, #fff, #ccc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              📖 Pilns apraksts
            </h2>
            <div className="text-xl leading-relaxed prose prose-invert max-w-none whitespace-pre-wrap" 
                 style={{color: '#e0e0e0', lineHeight: '1.8'}}>
              {sludinajums?.description || 'Premium Audi stāvoklī. Gatavs ekspluatācijai!'}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
