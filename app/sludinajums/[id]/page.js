import { createClient } from '@supabase/supabase-js';

export default async function SludinajumaLapa({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: sludinajums, error } = await supabase
    .from('sludinajumi')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'published')
    .single();

  if (error || !sludinajums) {
    return <div className="min-h-screen flex items-center justify-center text-xl">Sludinājums nav atrasts</div>;
  }

  // Parse images + get signed URLs
  let images = [];
  if (sludinajums.images) {
    try {
      const parsed = JSON.parse(sludinajums.images);
      images = Array.isArray(parsed) ? parsed : [];
    } catch {}
  }
  const imageUrls = [
    sludinajums.thumbnail_url,
    ...images
  ].filter(Boolean).slice(0, 8); // Max 8 kā screenshot

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Title + Price */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {sludinajums.title}
          </h1>
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent drop-shadow-lg">
            {sludinajums.price} €
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {/* Images kā screenshot – apaļas cards */}
          {imageUrls.map((img, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl aspect-square bg-white shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer border-4 border-white">
              <img 
                src={img} 
                alt={`Attēls ${i+1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 rounded-xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
          {imageUrls.length === 0 && (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-lg animate-pulse" />
            ))
          )}
        </div>

        {/* Info + Apraksts */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50">
            <div>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Kategorija</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">{sludinajums.category}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Atrašanās vieta</span>
              <p className="text-2xl font-bold text-gray-900 mt-1">{sludinajums.city || sludinajums.location}</p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-white/60">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              📄 Pilns apraksts
            </h3>
            <div className="prose prose-lg text-gray-700 max-w-none whitespace-pre-wrap leading-relaxed">
              {sludinajums.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
