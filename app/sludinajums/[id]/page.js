export default function SludinajumaLapa({ params }) {
  // HARDCODE Audi A3 + bildes – TESTĒ dizainu
  const sludinajums = {
    title: "Audi A3",
    price: "3000 €",
    city: "Rīga",
    category: "Auto",
    description: "Pilns apraksts šeit...",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&fit=crop",
      "https://images.unsplash.com/photo-1558618047-3c8c76ffe6f4?w=800&fit=crop"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* INFO SIDEBAR */}
          <div className="lg:sticky lg:top-24 self-start">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl">
              <h1 className="text-4xl lg:text-5xl font-black mb-8 bg-gradient-to-r from-gray-900 to-emerald-700 bg-clip-text text-transparent">
                {sludinajums.title}
              </h1>
              <div className="text-6xl font-black text-emerald-600 mb-12">
                {sludinajums.price}
              </div>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-center gap-4 p-6 bg-emerald-50/80 rounded-3xl backdrop-blur-sm shadow-xl">
                  <span className="w-16 h-16 bg-emerald-500 rounded-3xl flex items-center justify-center text-2xl font-bold text-white shadow-2xl">📍</span>
                  <span className="text-2xl font-bold">{sludinajums.city}</span>
                </div>
                <div className="flex items-center gap-4 p-6 bg-blue-50/80 rounded-3xl backdrop-blur-sm shadow-xl">
                  <span className="w-16 h-16 bg-blue-500 rounded-3xl flex items-center justify-center text-2xl font-bold text-white shadow-2xl">🏷️</span>
                  <span className="text-2xl font-bold">{sludinajums.category}</span>
                </div>
              </div>

              <button className="w-full h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 text-lg tracking-wide">
                💬 Rakstīt pārdevējam
              </button>
            </div>
          </div>

          {/* BILDES + APRKSTS */}
          <div className="space-y-8">
            
            {/* HERO BILDE */}
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-3xl bg-gradient-to-r from-gray-200 to-gray-300 hover:shadow-4xl transition-all duration-500">
              <img 
                src={sludinajums.images[0]} 
                alt="Audi A3" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
              />
            </div>

            {/* GALERIJA */}
            {sludinajums.images.length > 1 && (
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 p-6 bg-white/70 rounded-3xl backdrop-blur-xl shadow-2xl">
                {sludinajums.images.slice(1).map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group bg-gradient-to-br from-gray-100 to-gray-200">
                    <img src={img} alt={`Bilde ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                ))}
              </div>
            )}

            {/* APRKSTS */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-3xl">
              <h2 className="text-4xl font-black mb-12 bg-gradient-to-r from-slate-900 to-gray-700 bg-clip-text text-transparent pb-6 border-b-4 border-emerald-200">
                📝 Pilns apraksts
              </h2>
              <div className="prose prose-2xl text-gray-800 leading-relaxed whitespace-pre-wrap text-xl">
                {sludinajums.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
