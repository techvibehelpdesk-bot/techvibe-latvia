export default function SludinajumaLapa({ params }) {
  // SUPABASE DATI + tavas bildes no JSON
  const sludinajums = {
    title: "Audi A3",
    price: "3000 €",
    city: "Rīga",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400",  // TAVAS no Supabase JSON!
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400",
      "https://images.unsplash.com/photo-1558618047-3c8c76ffe6f4?w=400",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400"
    ],
    description: "Pilns apraksts šeit. Labs auto, bez bojājumu, pilns serviss..."
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {sludinajums.title}
          </h1>
          <div className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">
            {sludinajums.price}
          </div>
          <div className="text-xl text-gray-600 flex items-center justify-center gap-2">
            📍 {sludinajums.city} • Auto • Nav bojājumu
          </div>
        </div>

        {/* GALVENĀS BILDES – KĀ GALVENĀ LAPĀ (4 kvadrāti) */}
        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
          {sludinajums.images.map((img, i) => (
            <div key={i} className="group relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-80 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
              <img 
                src={img} 
                alt={`${sludinajums.title} ${i+1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-2xl" 
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 text-white drop-shadow-2xl">
                <div className="text-sm opacity-90 mb-1">Bilde {i+1}/{sludinajums.images.length}</div>
              </div>
            </div>
          ))}
        </div>

        {/* APRKSTS AP AKŠĀ */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 shadow-3xl max-w-4xl mx-auto">
          <h2 className="text-4xl font-black mb-12 bg-gradient-to-r from-slate-900 to-emerald-700 bg-clip-text text-transparent text-center pb-8 border-b-8 border-dashed border-emerald-300">
            📝 Pilns apraksts
          </h2>
          <div className="prose prose-2xl text-gray-800 leading-relaxed text-xl text-center max-w-none whitespace-pre-wrap">
            {sludinajums.description}
          </div>
          
          <div className="mt-16 flex flex-col sm:flex-row gap-6 pt-12 border-t-4 border-dashed border-emerald-300">
            <button className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-6 px-8 rounded-3xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 text-center">
              💬 Sazināties
            </button>
            <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-6 px-8 rounded-3xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300 text-center">
              📞 Zvanīt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
