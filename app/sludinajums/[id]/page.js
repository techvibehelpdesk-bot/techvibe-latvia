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
  let images = Array.isArray(imagesRaw) ? imagesRaw : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-500 to-orange-600 text-white">
      {/* SS.LV Header */}
      <header className="bg-white/20 backdrop-blur-md p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🚗 Auto Sludinājumi
          </h1>
          <div className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Sākums</a>
            <a href="/sludinajumi" className="hover:underline">Sludinājumi</a>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Virsraksts + Cena */}
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-bold mb-2">{sludinajums?.title}</h2>
          <div className="text-5xl font-black text-yellow-400 mb-4">
            {sludinajums?.price || 'Cena nav norādīta'}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Galerija kā SS.LV */}
          <div className="space-y-4">
            <details className="bg-white/20 p-6 rounded-2xl">
              <summary className="text-xl font-bold cursor-pointer">📸 Foto Galerija ({images.length})</summary>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-4 p-4">
                {images.slice(0, 20).map((img, i) => (
                  <a key={i} href={img} target="_blank" className="group">
                    <img 
                      src={img} 
                      alt="Auto foto" 
                      className="w-full aspect-square object-cover rounded-xl shadow-lg group-hover:scale-105 transition-all duration-200" 
                    />
                  </a>
                ))}
              </div>
            </details>

            {/* RAW Debug */}
            <details className="bg-gray-900/50 p-6 rounded-2xl text-xs">
              <summary className="font-bold cursor-pointer">🔍 RAW DB Debug</summary>
              <pre className="mt-4 max-h-96 overflow-auto">{JSON.stringify(sludinajums, null, 2)}</pre>
            </details>
          </div>

          {/* Specs kā SS.LV tabula */}
          <div className="bg-white/10 p-8 rounded-3xl space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-300">📋 Galvenie parametri</h3>
              <table className="w-full text-left border-collapse space-y-2">
                <tr className="border-b border-white/30 py-2">
                  <td className="font-semibold w-32">Cena:</td>
                  <td className="text-2xl font-bold text-green-400">{sludinajums?.price}</td>
                </tr>
                <tr className="border-b border-white/30 py-2">
                  <td>Marka:</td>
                  <td>{sludinajums?.make || 'N/A'}</td>
                </tr>
                <tr className="border-b border-white/30 py-2">
                  <td>Modelis:</td>
                  <td>{sludinajums?.model || 'N/A'}</td>
                </tr>
                <tr className="border-b border-white/30 py-2">
                  <td>Motors:</td>
                  <td>{sludinajums?.engine}</td>
                </tr>
                <tr className="border-b border-white/30 py-2">
                  <td>Jauda:</td>
                  <td>{sludinajums?.power}</td>
                </tr>
                <tr className="py-2">
                  <td>Patēriņš:</td>
                  <td>{sludinajums?.fuel}</td>
                </tr>
              </table>
            </div>

            {/* Kontakti */}
            <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4">📞 Kontakti</h3>
              <p className="text-lg mb-2">Tālrunis: <span className="font-bold">+371 29-***-***</span></p>
              <p>E-pasts: <a href="mailto:info@autotekvibe.lv" className="underline">sazināties</a></p>
              <p>Vieta: <span className="font-semibold">Rīga</span></p>
            </div>
          </div>
        </div>

        {/* Apraksts */}
        {sludinajums?.description && (
          <div className="bg-white/10 p-8 rounded-3xl">
            <h3 className="text-2xl font-bold mb-4">📝 Apraksts</h3>
            <p className="whitespace-pre-wrap text-lg leading-relaxed">{sludinajums.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
