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

  const imagesRaw = sludinajums?.image_public_urls || [];
  const images = Array.isArray(imagesRaw) ? imagesRaw : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER BAR */}
        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6 mb-12 sticky top-4 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center">
              🚗
            </div>
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Meklēt auto sludinājumus..." 
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl shadow-inner focus:border-orange-400 focus:outline-none transition-all text-lg"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* GALERIJAS GRID - KVADRĀTI KĀ VAJAG */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-12">
              {images.slice(0, 24).map((img, i) => (
                <div 
                  key={i}
                  className="group relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 hover:rotate-3 transition-all duration-500 cursor-pointer border-4 border-white/50 hover:border-orange-400/80 hover:bg-gradient-to-br hover:from-orange-50 hover:to-yellow-50"
                >
                  <img 
                    src={img} 
                    alt={`Foto ${i+1}`}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-3">
                    <span className="bg-black/80 text-white px-3 py-1 rounded-full text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* APRKSTS LEJĀ */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/50">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-2xl">
                📄 Pilns apraksts
              </h2>
              <div className="text-xl text-gray-700 leading-relaxed whitespace-pre-wrap prose prose-lg max-w-none">
                {sludinajums?.description || 'Detalizēts apraksts par automašīnu tiks pievienots šeit.'}
              </div>
            </div>
          </div>

          {/* INFO + SPECS + KONTAKTI SIDEBAR */}
          <div className="space-y-8 sticky top-32 self-start lg:max-h-screen lg:overflow-y-auto">
            
            {/* GALVENĀ INFO KARTĪTE */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-3xl shadow-2xl p-8 text-center">
              <div className="text-6xl font-black mb-4 drop-shadow-2xl">
                {sludinajums?.price || '€'}
              </div>
              <p className="text-xl opacity-95 font-semibold tracking-wide">💰 Cena</p>
            </div>

            {/* SPECS TABULA KĀ SCREENSHOT */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                📊 Specifikācijas
              </h3>
              
              {/* 2 KOLONNU GALVENIE DATI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 text-gray-700 border-b pb-2">Pamatinformācija</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Marka:</span>
                      <span className="font-semibold text-gray-900">{sludinajums?.make || 'Audi'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Modelis:</span>
                      <span className="font-semibold text-gray-900">{sludinajums?.model || 'A3'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Izlaidums:</span>
                      <span className="font-semibold text-gray-900">{sludinajums?.year || '2024'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4 text-gray-700 border-b pb-2">Dzinējs</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Tilpums:</span>
                      <span className="font-semibold">{sludinajums?.engine || '1.5 TFSI'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Jauda:</span>
                      <span className="font-semibold text-orange-600">{sludinajums?.power || '150 ZS'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Patēriņš:</span>
                      <span className="font-semibold">{sludinajums?.fuel || '5.6 l/100km'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* KONTAKTI */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-3xl shadow-2xl p-8">
              <h4 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-3">
                📞 Kontakti
              </h4>
              <div className="text-center space-y-4">
                <div className="text-3xl font-black tracking-wide">+371 29 123 456</div>
                <div className="text-lg opacity-90">Rīga</div>
                <button className="w-full bg-white text-red-600 py-4 px-8 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all text-xl">
                  Sazināties tūlīt
                </button>
              </div>
            </div>

            {/* OCTA */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl text-center shadow-xl hover:scale-105 transition-all">
              <p className="text-sm mb-2 opacity-90">🛡️ Aprēķināt</p>
              <div className="font-bold text-xl">OCTA.LV</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
