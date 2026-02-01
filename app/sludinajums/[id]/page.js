import { createClient } from '@supabase/supabase-js';

export const revalidate = 0;  // *** ŠIS DZĒS CACHE ***
export const dynamic = 'force-dynamic';  // *** ŠIS PĀRLIEC ***

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-8">
      {/* Lielais virsraksts */}
      <div className="text-center mb-20">
        <h1 className="text-6xl font-black bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-6">
          {sludinajums?.title}
        </h1>
        <div className="text-4xl font-bold text-green-400">{sludinajums?.price}€</div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Kreisā puse - attēli */}
        <div className="space-y-6">
          <img src={images[0]} alt="Galvenais" className="w-full h-96 object-cover rounded-3xl shadow-2xl" />
          <div className="grid grid-cols-3 gap-4">
            {images.slice(1,7).map((img, i) => (
              <img key={i} src={img} alt="" className="w-full aspect-square object-cover rounded-2xl hover:scale-105 transition-all" />
            ))}
          </div>
        </div>

        {/* Labā puse - info */}
        <div className="space-y-8">
          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl">
            <h2 className="text-3xl font-bold mb-6">Specifikācijas</h2>
            <div className="grid grid-cols-2 gap-6 text-2xl">
              <div>🦽 {sludinajums?.power} ZS</div>
              <div>⛽ {sludinajums?.fuel} l/100km</div>
              <div>📅 {sludinajums?.year}</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl">
            <div className="text-3xl mb-6 whitespace-pre-wrap">{sludinajums?.description}</div>
          </div>

          <button className="w-full bg-gradient-to-r from-red-600 to-orange-600 p-8 text-2xl font-black rounded-3xl hover:from-red-700 hover:to-orange-700 transition-all shadow-2xl">
            📞 Zvanīt pārdevējam
          </button>
        </div>
      </div>
    </div>
  );
}
