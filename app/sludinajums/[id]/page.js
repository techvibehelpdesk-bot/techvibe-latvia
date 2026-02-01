import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function SludinajumaLapa({ params }) {
  const id = params.id;

  let sludinajums = null;
  
  try {
    const { data, error } = await supabase
      .from('sludinajumi')  // tavu tabulas nosaukums!
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    sludinajums = data;
  } catch (error) {
    console.error('Supabase kļūda:', error);
  }

  // Fallback ja nav datu
  if (!sludinajums) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 text-2xl">Sludinājums nav atrasts (ID: {id})</div>;
  }

  // Parse images JSON array
  let images = [];
  try {
    images = JSON.parse(sludinajums.images || '[]');
  } catch {
    images = [];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* INFO SIDEBAR - KREISĀ (1/3) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl sticky top-12">
              <h1 className="text-3xl lg:text-4xl font-black mb-6 bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                {sludinajums.title}
              </h1>
              
              <div className="text-4xl lg:text-5xl font-black text-emerald-600 mb-8 mb-12">
                {sludinajums.price || 'Cena nav norādīta'}
              </div>

              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                  <span className="text-2xl">📍</span>
                  <span className="font-semibold">{sludinajums.city || 'Rīga'}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <span className="text-2xl">🏷️</span>
                  <span className="font-semibold">{sludinajums.category || 'Cits'}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
                  <span className="text-2xl">📅</span>
                  <span>{new Date(sludinajums.created_at).toLocaleDateString('lv-LV')}</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-4 px-6 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300">
                💬 Sazināties
              </button>
            </div>
          </div>

          {/* BILDES + APRKSTS - LABĀ (2/3) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* HERO BILDE */}
            <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-200 to-gray-300">
              {images[0] ? (
                <img
                  src={images[0]}
                  alt={sludinajums.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-500">
                  <span className="text-4xl text-white font-bold">📷 Nav bildes</span>
                </div>
              )}
            </div>

            {/* MINIATŪRAS */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-gray-300">
                {images.slice(1).map((img, idx) => (
                  <div key={idx} className="w-28 h-28 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer">
                    <img src={img} alt={`Bilde ${idx + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* APRKSTS */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50">
              <h2 className="text-3xl font-black mb-8 bg-gradient-to-r from-slate-800 to-gray-700 bg-clip-text text-transparent">
                📝 Pilns apraksts
              </h2>
              <div className="text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                {sludinajums.description || 'Apraksts tiks pievienots.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
