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
    <>
      <style jsx global>{`
        :root {
          --ss-orange: #f97316;
          --ss-yellow: #fbbf24;
          --ss-bg: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        }
        .ss-header { background: var(--ss-bg); }
        .ss-main { background: white; }
        .thumbnail-grid { display: flex; flex-wrap: wrap; gap: 4px; }
        .thumbnail { width: 91px; height: 68px; object-fit: cover; cursor: pointer; }
        .specs-table td { padding: 4px 0; border-bottom: 1px solid #eee; }
        .price-big { font-size: 2.5em; font-weight: bold; color: #059669; }
      `}</style>

      {/* SS.LV HEADER */}
      <div className="ss-header py-4 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <a href="/" className="hover:underline">Auto Sludinājumi</a> / 
            <span className="ml-2 text-yellow-300">{sludinajums?.title}</span>
          </h1>
          <div className="flex gap-4 text-sm">
            <a href="/sludinajumi" className="hover:underline">← Atpakaļ</a>
          </div>
        </div>
      </div>

      <div className="ss-main max-w-7xl mx-auto px-4 py-8 bg-white">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* LEFT: Thumbnail rinda + Cena KĀ SS.LV */}
          <div className="lg:col-span-2">
            {/* Thumbnail Gallery EXACT SS.LV */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-1 mb-2">
                {images.map((img, i) => (
                  <img 
                    key={i} 
                    src={img.replace(/800\./, '91.')} 
                    alt={`Foto ${i+1}`}
                    className="thumbnail hover:opacity-80 transition-opacity cursor-pointer rounded"
                    onClick={() => {}} // Karusele later
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">Foto: <strong>{images.length}</strong></p>
            </div>

            {/* Apraksts */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <div dangerouslySetInnerHTML={{ __html: sludinajums?.description || '' }} />
            </div>

            {/* RAW Debug */}
            <details className="bg-gray-900 text-white p-4 rounded mb-8">
              <summary className="cursor-pointer font-bold">RAW DB</summary>
              <pre className="mt-2 text-xs overflow-auto max-h-64">{JSON.stringify(sludinajums, null, 2)}</pre>
            </details>
          </div>

          {/* RIGHT: Specs + Cena KĀ SS.LV */}
          <div className="space-y-6">
            {/* LIELĀ CENA KĀ SS.LV */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-6 rounded-lg shadow-lg">
              <div className="price-big mb-2">{sludinajums?.price}</div>
              <p className="text-sm opacity-90">💰 Cena</p>
            </div>

            {/* Specs Tabulas KĀ SS.LV 4 kolonnas */}
            <div className="space-y-4">
              <table className="w-full specs-table">
                <tr><td className="font-semibold w-24">Marka:</td><td>{sludinajums?.make}</td></tr>
                <tr><td>Izgads:</td><td>{sludinajums?.year}</td></tr>
                <tr><td>Motors:</td><td>{sludinajums?.engine}</td></tr>
                <tr><td>Jauda:</td><td>{sludinajums?.power}</td></tr>
                <tr><td>Piedz.:</td><td>{sludinajums?.drive || '2WD'}</td></tr>
                <tr><td>Nobrauk.:</td><td>{sludinajums?.km}</td></tr>
              </table>

              {/* Kontakti KĀ SS.LV */}
              <div className="bg-red-500/20 border border-red-500 p-4 rounded">
                <h4 className="font-bold mb-2 text-red-800">📞 Kontakti</h4>
                <p><strong>+371 29-***-***</strong></p>
                <p className="text-sm mt-1">Rīga</p>
                <a href="mailto:info@example.lv" className="text-blue-600 hover:underline block mt-2">✉️ E-pasts</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
