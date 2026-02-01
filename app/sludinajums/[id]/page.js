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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER kā tavā kodā */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {sludinajums?.title}
          </h1>
          <p className="text-xl text-gray-600">ID: {params.id} • {images.length} foto</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* GALVENĀ KARTĪTE kā tavā dizainā */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* GALERIJAS GRID kā tavā kodā */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {images.slice(0, 15).map((img, i) => (
                <div 
                  key={i}
                  className="group bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer overflow-hidden"
                >
                  <div className="relative w-full h-40 md:h-48 rounded-xl overflow-hidden bg-gray-100 group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={img}
                      alt={`Foto ${i+1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-center mt-2 font-semibold text-sm text-gray-700">
                    Foto {i+1}
                  </p>
                </div>
              ))}
            </div>

            {/* APRKSTS kā tavā stilā */}
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">📝 Pilns apraksts</h2>
              <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700 prose max-w-none">
                {sludinajums?.description || 'Detalizēts apraksts tiks pievienots.'}
              </div>
            </div>

          </div>

          {/* INFO SIDEBAR kā tavā dizainā */}
          <div className="space-y-8">
            
            {/* CENA KARTĪTE kā tavā kodā */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all">
              <div className="text-5xl md:text-6xl font-black text-green-600 mb-4">
                {sludinajums?.price || '€'}
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-2">Cena</p>
            </div>

            {/* SPECS kā tavā stilā */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all">
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">📊 Specs</h3>
              <div className="space-y-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-gray-800">{sludinajums?.power || '150'}</div>
                  <div className="text-sm text-gray-600">ZS</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">{sludinajums?.fuel || '5.6'}</div>
                  <div className="text-sm text-gray-600">l/100km</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-800">{sludinajums?.year || '2024'}</div>
                  <div className="text-sm text-gray-600">Gads</div>
                </div>
              </div>
            </div>

            {/* KONTAKTI kā tavā stilā */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all text-center">
              <h3 className="text-2xl font-bold mb-6">📞 Kontakti</h3>
              <div className="text-3xl font-black mb-6">+371 29 *** ***</div>
              <button className="w-full bg-white text-red-600 py-4 px-6 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                Sazināties
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
