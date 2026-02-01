import { createClient } from '@supabase/supabase-js';

export default async function SludinajumaLapa({ params }) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const { data: sludinajums } = await supabase.from('sludinajumi').select('*').eq('id', params.id).single();
  const images = Array.isArray(sludinajums?.image_public_urls) ? sludinajums.image_public_urls.slice(0, 35) : [];

  return (
    <div className="min-h-screen">
      {/* SS.LV ORANDŽS HEADER */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <a href="/" className="hover:underline">Auto Sludinājumi</a> / {sludinajums?.title}
          </h1>
          <a href="/sludinajumi" className="bg-white text-orange-600 px-4 py-2 rounded font-semibold hover:bg-gray-100">
            ← Atpakaļ
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12 bg-gray-50">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Thumbnail galerija KĀ SS.LV */}
          <div className="lg:col-span-8">
            <div className="flex flex-wrap gap-1 mb-4 bg-white p-4 rounded-lg shadow-sm">
              {images.map((img, i) => (
                <img 
                  key={i}
                  src={img.replace(/800\./, '91.')}
                  alt={`Foto ${i+1}`}
                  className="w-[91px] h-[68px] object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-8">Foto: <strong>{images.length}</strong></p>

            {/* Apraksts */}
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <div className="prose max-w-none whitespace-pre-wrap">{sludinajums?.description}</div>
            </div>
          </div>

          {/* Specs + Cena KĀ SS.LV */}
          <div className="lg:col-span-4 space-y-6">
            {/* Lielā cena */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-8 rounded-xl shadow-2xl text-center">
              <div className="text-4xl font-black mb-2">{sludinajums?.price}</div>
              <p className="opacity-90">💰 Cena</p>
            </div>

            {/* Specs tabula */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">📋 Parametri</h3>
              <table className="w-full text-sm">
                <tr className="border-b py-2"><td className="font-medium w-24">Marka:</td><td>{sludinajums?.make}</td></tr>
                <tr className="border-b py-2"><td>Izgads:</td><td>{sludinajums?.year}</td></tr>
                <tr className="border-b py-2"><td>Motors:</td><td>{sludinajums?.engine}</td></tr>
                <tr className="border-b py-2"><td>Jauda:</td><td>{sludinajums?.power}</td></tr>
                <tr className="py-2"><td>Patēriņš:</td><td>{sludinajums?.fuel}</td></tr>
              </table>
            </div>

            {/* Kontakti */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
              <h4 className="font-bold mb-3">📞 Kontakti</h4>
              <p className="text-lg mb-2"><strong>+371 29-***-***</strong></p>
              <p className="text-sm mb-3">Rīga</p>
              <a href="mailto:info@autotekvibe.lv" className="block bg-white text-red-600 px-4 py-2 rounded font-medium hover:bg-gray-100 text-center">
                ✉️ Sazināties
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
