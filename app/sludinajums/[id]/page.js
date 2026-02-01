import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function SludinajumaLapa({ params }) {
  const id = params.id;
  
  console.log('🔍 MEKLĒ ID:', id);  // DEBUG

  let sludinajums = null;
  let errorMsg = '';
  
  try {
    const { data, error } = await supabase
      .from('sludinajumi')  // ← PĀRBAUDI TABULAS NOSAUKUMU!
      .select('*')
      .eq('id', id)
      .single();
    
    console.log('📊 SUPABASE DATA:', data);  // DEBUG
    console.log('❌ SUPABASE ERROR:', error);  // DEBUG
    
    if (error) {
      errorMsg = error.message;
      sludinajums = null;
    } else {
      sludinajums = data;
    }
  } catch (error) {
    console.error('💥 FETCH KĻŪDA:', error);
    errorMsg = error.message;
  }

  // DEBUG FALLBACK - Audi dati
  const fallback = {
    title: "Audi A3 DEBUG MODE",
    price: "12 500 €",
    city: "Rīga",
    category: "Auto",
    description: "DEBUG: Supabase neatrada datus. Pārbaudi:\n1. Tabula 'sludinajumi'?\n2. ID sakrīt?\n3. images kolonna ar URL?",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&fit=crop"
    ]
  };

  const dataToShow = sludinajums || fallback;

  // Parse images
  let images = [];
  if (sludinajums?.images) {
    try {
      images = typeof sludinajums.images === 'string' 
        ? JSON.parse(sludinajums.images) 
        : sludinajums.images;
      console.log('🖼️ IMAGES PARSED:', images);
    } catch (e) {
      console.log('🔴 Images parse kļūda:', e);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* DEBUG INFO TOP */}
        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-8 text-sm">
          <strong>DEBUG MODE:</strong><br/>
          ID: {id}<br/>
          Supabase: {sludinajums ? '✅ ATRASTS' : '❌ NAV DATU'}<br/>
          Images count: {images.length}<br/>
          Error: {errorMsg || 'nav'}
          <br/><small>F5 → DevTools → Console → redzi logus!</small>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* SIDEBAR KREISĒ */}
          <div className="lg:col-span-4">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl sticky top-12">
              <h1 className="text-4xl font-black mb-6 bg-gradient-to-r from-gray-900 to-emerald-700 bg-clip-text text-transparent">
                {dataToShow.title}
              </h1>
              <div className="text-5xl font-black text-emerald-600 mb-8">
                {dataToShow.price}
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl">
                  <span className="text-2xl">📍</span> {dataToShow.city}
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                  <span className="text-2xl">🏷️</span> {dataToShow.category}
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-4 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all">
                💬 Sazināties
              </button>
            </div>
          </div>

          {/* BILDES + APRKSTS LABĀ */}
          <div className="lg:col-span-8 space-y-6">
            {/* HERO BILDE */}
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-gray-200 to-gray-300">
              {images[0] ? (
                <img src={images[0]} alt="Galvenā" className="w-full h-full object-cover hover:scale-105 transition-transform" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl text-gray-500 font-bold bg-gradient-to-br from-blue-400 to-indigo-500 text-white">
                  📷 Nav bildes
                </div>
              )}
            </div>

            {/* MINIATŪRAS */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {images.slice(1).map((img, i) => (
                  <div key={i} className="w-24 h-24 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-110 transition-all cursor-pointer flex-shrink-0">
                    <img src={img} alt={`Bilde ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* APRKSTS */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-xl">
              <h2 className="text-3xl font-black mb-6 bg-gradient-to-r from-gray-900 to-slate-700 bg-clip-text text-transparent">
                📝 Apraksts
              </h2>
              <div className="prose prose-xl text-gray-800 whitespace-pre-wrap leading-relaxed">
                {dataToShow.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
