import { createClient } from '@supabase/supabase-js';

export default async function SludinajumaLapa({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  console.log('ID:', params.id); // Debug

  const { data: sludinajums, error } = await supabase
    .from('sludinajumi')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'published')
    .single();

  console.log('Data:', sludinajums); // Debug
  console.log('Error:', error); // Debug

  if (error || !sludinajums) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-xl text-gray-500 p-8">
        <h1>❌ DEBUG INFO</h1>
        <pre className="bg-red-50 p-6 rounded-xl mt-4 text-sm border-2 border-red-200 max-w-2xl">
          {JSON.stringify({ error: error?.message, id: params.id }, null, 2)}
        </pre>
      </div>
    );
  }

  // Simple fallback images bez signed URL prima (anon public read)
  const imageUrls = [
    sludinajums.thumbnail_url,
    ...(sludinajums.images ? JSON.parse(sludinajums.images) : [])
  ].filter(Boolean).slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{sludinajums.title}</h1>
          <div className="inline-flex px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl text-4xl font-bold text-white shadow-2xl">
            <span className="text-3xl mr-2">€</span>{sludinajums.price}
          </div>
        </div>

        {/* Images bez signed prima */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {imageUrls.map((img, i) => (
            <div key={i} className="group relative rounded-2xl aspect-square bg-white shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden">
              <img src={img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform rounded-xl" />
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-white/90 rounded-2xl flex items-center justify-center shadow-lg text-emerald-600 font-bold opacity-0 group-hover:opacity-100 transition-all">📱</div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg text-slate-600 font-bold opacity-0 group-hover:opacity-100 transition-all rotate-12">💻</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/80 p-8 rounded-2xl shadow-lg border">
            <span className="text-sm font-medium text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">📍</span>
            <p className="text-2xl font-bold mt-2">{sludinajums.city || 'Rīga'}</p>
          </div>
          <div className="bg-white/80 p-8 rounded-2xl shadow-lg border">
            <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">🏷️</span>
            <p className="text-2xl font-bold mt-2">{sludinajums.category}</p>
          </div>
        </div>

        <div className="bg-white/80 p-10 rounded-3xl shadow-2xl border max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8">Apraksts</h3>
          <p className="text-lg text-gray-700 whitespace-pre-wrap">{sludinajums.description}</p>
        </div>
      </div>
    </div>
  );
}
