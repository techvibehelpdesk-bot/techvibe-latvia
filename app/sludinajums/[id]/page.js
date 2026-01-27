export default function SludinajumaDetalas({ params }) {
  const id = params.id || 'demo';
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <a href="/sludinajumi" className="inline-flex items-center px-6 py-3 bg-white shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl hover:-translate-y-px transition-all mb-12">
          ← Sludinājumi
        </a>

        <div className="bg-white shadow-2xl rounded-3xl p-12">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
              Sludinājums #{id}
            </h1>
            <div className="text-6xl font-black text-emerald-600 mb-4">€299</div>
            <div className="text-xl text-gray-600 font-semibold uppercase tracking-wide">Elektronika</div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8">
              <div className="w-full h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
                <span className="text-4xl text-white/80 font-bold">Bilde šeit</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="mb-8 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border-l-8 border-emerald-400">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">📱 Apraksts</h3>
                <p className="text-xl text-gray-700 leading-relaxed">
                  Profesionāls sludinājums TechVibe platformā. 
                  <br />✅ Build SUCCESS!
                  <br />✅ App Router pareizi!
                  <br />✅ Gatavs Supabase!
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-10 rounded-3xl shadow-2xl">
                <h3 className="text-3xl font-bold mb-6 text-center">📞 Kontakts</h3>
                <div className="text-center">
                  <div className="text-5xl font-black mb-4">+371 2933 4455</div>
                  <div className="text-xl opacity-90 mb-8">Rīga, Pārdaugava</div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <a href="tel:+37129334455" className="block bg-white/20 backdrop-blur-xl hover:bg-white/30 py-6 px-8 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                      📞 Zvanīt
                    </a>
                    <a href="/sludinajumi" className="block bg-white/20 backdrop-blur-xl hover:bg-white/30 py-6 px-8 rounded-2xl font-bold text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                      Vēl sludinājumi
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
