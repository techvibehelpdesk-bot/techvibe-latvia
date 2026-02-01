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
  const images = Array.isArray(imagesRaw) ? imagesRaw.slice(0, 35) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SS.LV ORANDŽS HEADER */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-6 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">
              <a href="/" className="hover:underline">🚗 Auto Sludinājumi</a>
            </h1>
            <a 
              href="/sludinajumi" 
              className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 shadow-lg transition-all"
            >
              ← Atpakaļ uz sarakstu
            </a>
          </div>
          <p className="text-lg opacity-90">Vieglie auto / Audi / A3 / Detāļas</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* GALERIJA KĀ SS.LV */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            {/* Thumbnail rinda */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <div className="flex flex-wrap gap-[2px] mb-4">
                {images.map((img, i) => (
                  <div key={i} className="group relative">
                    <img 
                      src={img.replace(/800\./, '91.')}
                      alt={`Foto ${i+1}`}
                      className="w-[91px] h-[68px] object-cover rounded cursor-pointer hover:ring-2 ring-orange-400 transition-all group-hover:opacity-90"
                    />
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1 rounded-full">
                      {i+1}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-gray-700">
                Foto: <span className="text-orange-600 font-bold">{images.length}</span>
              </p>
            </div>

            {/* Apraksts */}
            <div className="bg-white p-8 rounded-xl shadow-xl mb-8 prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap leading-relaxed">
                {sludinajums?.description || 'Apraksts tiks pievienots.'}
              </div>
            </div>

            {/* RAW DEBUG */}
            <details className="bg-gray-900 text-white p-6 rounded-xl mb-8">
              <summary className="text-xl font-bold cursor-pointer hover:text-orange-400">
                🔍 RAW DB Debug
              </summary>
              <pre className="mt-4 text-xs max-h-96 overflow-auto font-mono">
                {JSON.stringify(sludinajums, null, 2)}
              </pre>
            </details>
          </div>

          {/* SPECIFIKĀCIJAS + CENA KĀ SS.LV */}
          <div className="lg:col-span-4 order-1 lg:order-2 space-y-6">
            {/* LIELĀ CENA BLOCK */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-8 rounded-2xl shadow-2xl text-center">
              <div className="text-5xl font-black mb-3 drop-shadow-lg">
                {sludinajums?.price || '€'}
              </div>
              <p className="text-lg opacity-90 tracking-wide">💰 Cena</p>
            </div>

            {/* PARAMETRI TABULA */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b-4 border-orange-500 pb-3">
                📋 Galvenie parametri
              </h3>
              <table className="w-full text-sm space-y-3">
                <tr className="border-b hover:bg-gray-50 py-2">
                  <td className="font-semibold text-gray-700 w-28">Marka:</td>
                  <td className="text-gray-900">{sludinajums?.make || 'N/A'}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 py-2">
                  <td className="font-semibold text-gray-700">Modelis:</td>
                  <td className="text-gray-900 font-medium">{sludinajums?.title}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 py-2">
                  <td className="font-semibold text-gray-700">Jauda:</td>
                  <td className="text-gray-900">{sludinajums?.power}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50 py-2">
                  <td className="font-semibold text-gray-700">Patēriņš:</td>
                  <td className="text-gray-900">{sludinajums?.fuel}</td>
                </tr>
                <tr className="hover:bg-gray-50 py-2">
                  <td className="font-semibold text-gray-700">Gads:</td>
                  <td className="text-gray-900">{sludinajums?.year}</td>
                </tr>
              </table>
            </div>

            {/* KONTAKTI KĀ SS.LV */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-2xl">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                📞 Kontakti
              </h4>
              <div className="space-y-3">
                <p className="text-2xl font-black">+371 29-***-***</p>
                <p className="text-sm opacity-90">Rīga, Latvija</p>
                <a 
                  href="mailto:info@autotekvibe.lv" 
                  className="block bg-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all text-center"
                >
                  ✉️ Sūtīt ziņu
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
