export default function SludinajumaLapa({ params }) {
  // HARDCODE + dizains kā screenshot (sidebar kreisē, hero pa labi)
  const sludinajums = {
    title: "Audi A3",
    price: "3000 €",
    city: "Rīga",
    category: "Auto", 
    description: "Pilns apraksts šeit...",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
      "https://images.unsplash.com/photo-1558618047-3c8c76ffe6f4?w=800"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* INFO SIDEBAR KREISĒ - 4 kolonnas */}
          <div className="lg:col-span-4">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl sticky top-24 lg:top-32">
              <h1 className="text-3xl lg:text-4xl font-black mb-6 text-gray-900 leading-tight">
                {sludinajums.title}
              </h1>
              
              {/* HERO CENA */}
              <div className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-500 to-emerald-700 text-transparent bg-clip-text bg-white drop-shadow-2xl mb-12 py-4">
                {sludinajums.price}
              </div>

              {/* INFO IKONIŅAS */}
              <div className="space-y-4 mb-12">
                <div className="flex items-center gap-4 p-4 bg-emerald-50/50 rounded-2xl backdrop-blur-sm border border-emerald-200">
                  <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg">📍</div>
                  <div className="font-semibold text-xl">{sludinajums.city}</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50/50 rounded-2xl backdrop-blur-sm border border-blue-200">
                  <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg">🏷️</div>
                  <div className="font-semibold text-xl">{sludinajums.category}</div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-purple-50/50 rounded-2xl backdrop-blur-sm border border-purple-200 text-sm">
                  <div className="w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg">⭐</div>
                  <div className="font-semibold">Nav bojājumu</div>
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3">
                💬 Sazināties
              </button>
            </div>
          </div>

          {/* LABĀ - BILDES 8 kolonnas */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* GALVENĀ BILDE HERO */}
            <div className="aspect-[16/9] bg-gradient-to-r from-gray-200/50 to-gray-300/50 rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/50 hover:shadow-3xl hover:ring-emerald-200 transition-all duration-500">
              <img 
                src={sludinajums.images[0]} 
                alt={sludinajums.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer" 
              />
            </div>

            {/* MINI BILDES GALERIJA */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-6 bg-white/60 rounded-3xl backdrop-blur-xl shadow-xl ring-1 ring-white/30">
              {sludinajums.images.slice(1).map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all cursor-pointer group relative bg-gradient-to-br from-gray-100 to-gray-200">
                  <img 
                    src={img} 
                    alt={`Bilde ${i+1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-400" 
                  />
                </div>
              ))}
            </div>

            {/* APRKSTS AP AKŠĀ */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-3xl ring-1 ring-white/40">
              <h2 className="text-4xl font-black mb-12 bg-gradient-to-r from-slate-900 to-emerald-800 bg-clip-text text-transparent pb-8 border-b-4 border-gradient-to-r border-emerald-200">
                📝 Pilns apraksts
              </h2>
              <div className="prose prose-2xl text-gray-800 leading-relaxed whitespace-pre-wrap text-xl tracking-wide">
                {sludinajums.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
