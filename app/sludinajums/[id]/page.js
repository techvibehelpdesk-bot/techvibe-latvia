export default async function SludinajumaLapa({ params }) {
  const id = params.id;

  // HARDKODĒTS tests - dzēs pēc Supabase fiksēšanas
  const sludinajums = {
    title: "Audi A3 2.0 TFSI",
    price: "12 500 €",
    city: "Rīga",
    category: "Auto",
    description: "Labi saglabājies Audi A3, 2018.g., 150tkm, pilna servisa vēsture. Serviss pie Mūsu Servisā.\n\n✅ 2 atslēgas\n✅ Vasaras/ziemas komplekts\n✅ Nav avāriju",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ffe6f4?w=800&fit=crop"
    ],
    created_at: "2026-01-26"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* GALVENĀ BILDE */}
          <div className="space-y-6">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-500/20 to-indigo-600/20">
              {sludinajums.images[0] ? (
                <img
                  src={sludinajums.images[0]}
                  alt={sludinajums.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-2xl font-bold text-white/80">
                  📷 Nav bildes
                </div>
              )}
            </div>
            
            {/* MINIATŪRAS */}
            {sludinajums.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {sludinajums.images.slice(1).map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-200 hover:scale-105 hover:cursor-pointer">
                    <img
                      src={img}
                      alt={`${sludinajums.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* INFO SIDEBAR */}
          <div className="lg:sticky lg:top-12 h-fit">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50">
              <h1 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-emerald-700 bg-clip-text text-transparent leading-tight">
                {sludinajums.title}
              </h1>
              
              <div className="text-5xl md:text-6xl font-black text-emerald-600 mb-8 drop-shadow-lg">
                {sludinajums.price}
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 font-bold text-xl">📍</span>
                    <span className="font-semibold">{sludinajums.city}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xl">🏷️</span>
                    <span className="font-semibold">{sludinajums.category}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <span className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 font-bold text-xl">📅</span>
                    <span>Ievietots: {new Date(sludinajums.created_at).toLocaleDateString('lv-LV')}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 mb-6">
                💬 Rakstīt pārdevējam
              </button>
            </div>
          </div>
        </div>

        {/* APRKSTS */}
        <section className="mt-20">
          <h2 className="text-4xl font-black mb-12 bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent">📝 Pilns apraksts</h2>
          <div className="prose prose-2xl text-gray-800 whitespace-pre-wrap leading-relaxed bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-xl border border-white/50">
            {sludinajums.description}
          </div>
        </section>
      </div>
    </div>
  );
}
