import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

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

  const mainImage = Array.isArray(sludinajums?.image_public_urls) 
    ? sludinajums.image_public_urls[0] 
    : '/placeholder-car.jpg';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Meklēšanas josla augšā KĀ screenshot */}
      <div className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-4 items-center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} />
            <div className="flex-1 max-w-md">
              <input 
                type="text" 
                placeholder="Meklēt auto sludinājumus..." 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 text-sm text-gray-600">
              <span>Sludinājumi</span>
              <span>|</span>
              <span>Konts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* SINGLE CARD KĀ SCREENSHOT */}
          <div className="md:col-span-2 lg:col-span-2 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200">
            
            {/* GALVENĀ BILDE FULL WIDTH */}
            <div className="relative h-80 bg-gray-200 overflow-hidden">
              <Image 
                src={mainImage} 
                alt={sludinajums?.title}
                fill 
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                +{sludinajums?.image_public_urls?.length - 1 || 0} foto
              </div>
            </div>

            {/* CARD SATURS */}
            <div className="p-8 space-y-4">
              
              {/* TITULS */}
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                {sludinajums?.title || 'Auto sludinājums'}
              </h1>

              {/* ZAĻĀ CENA LEJA KĀ SCREENSHOT */}
              <div className="flex items-end gap-2">
                <div className="text-4xl font-black text-emerald-600">
                  {sludinajums?.price || '€'}
                </div>
                <span className="text-sm text-gray-500">€ / mēn</span>
              </div>

              {/* TAGI / KATEGORIJAS */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Audi
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  A3
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                  2024
                </span>
              </div>

              {/* SHORT INFO ROW */}
              <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 pt-4 border-t">
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-gray-900">{sludinajums?.power || '150'}</span>
                  <span>ZS</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-gray-900">{sludinajums?.fuel || '5.6'}</span>
                  <span>l/100km</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-gray-900">Rīga</span>
                  <span>Vieta</span>
                </div>
              </div>

              {/* CTA KNOPES LEJA KĀ SCREENSHOT */}
              <div className="flex gap-4 pt-6 border-t mt-6">
                <button className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-lg">
                  💬 Sazināties
                </button>
                <button className="flex-1 bg-white border-2 border-gray-300 py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all text-gray-800">
                  💾 Saglabāt
                </button>
              </div>
            </div>
          </div>

          {/* Citi sludinājumi sidebar kā screenshot (placeholder) */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
              <p class="text-gray-500 text-sm">Citi sludinājumi</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg h-48 flex items-center justify-center border-2 border-dashed border-gray-300">
              <p class="text-gray-500 text-sm">Reklāma</p>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-xl p-6 shadow-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
              <p className="text-gray-500 text-sm">Kontakti</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
