import { createClient } from '@supabase/supabase-js';

export default async function SludinajumaLapa({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: sludinajums, error } = await supabase
    .from('sludinajumi')
    .select(`
      *,
      images:path
    `)
    .eq('id', params.id)
    .eq('status', 'published')
    .single();

  if (error || !sludinajums) {
    console.error('Sludinājums error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-500 p-12">
        Sludinājums nav atrasts
      </div>
    );
  }

  // VISAS bildes no thumbnail + images relation
  const allImagePaths = [
    sludinajums.thumbnail_url,
    ...sludinajums.images?.map(img => img.path) || []
  ].filter(Boolean);

  console.log('All image paths:', allImagePaths);

  // Signed URLs visām bildēm AR ERROR HANDLING
  const signedImageUrls = await Promise.all(
    allImagePaths.map(async (path) => {
      if (!path) return null;
      
      const { data, error } = await supabase.storage
        .from('sludinajumi')
        .createSignedUrl(path, 3600);
      
      if (error) {
        console.error('Signed URL error for path', path, ':', error);
        return null;
      }
      
      if (!data?.signedUrl) {
        console.error('No signedUrl for path', path, ':', data);
        return null;
      }
      
      console.log('Signed URL success for:', path);
      return data.signedUrl;
    })
  ).then(urls => {
    const validUrls = urls.filter(Boolean);
    console.log('Valid signed URLs count:', validUrls.length);
    return validUrls;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-8 bg-gradient-to-r from-gray-900 to-slate-800 bg-clip-text">
            {sludinajums.title}
          </h1>
          <div className="inline-flex items-center px-10 py-6 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-700 rounded-3xl shadow-2xl text-4xl sm:text-5xl font-black text-white drop-shadow-2xl border-4 border-white/50 backdrop-blur-sm">
            <span className="text-3xl sm:text-4xl mr-4 tracking-tight">€</span>
            {sludinajums.price?.toLocaleString()}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          {/* VISU attēlu grid */}
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
              {signedImageUrls.map((img, i) => (
                <div 
                  key={i}
                  className="group relative overflow-hidden rounded-3xl aspect-square bg-gradient-to-br from-white/90 to-slate-50/50 shadow-xl hover:shadow-3xl transition-all duration-700 hover:-translate-y-3 border-2 border-white/60 hover:border-emerald-300/70 backdrop-blur-sm"
                >
                  <img 
                    src={img} 
                    alt={`Attēls ${i+1}`}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 rounded-2xl"
                    loading="lazy"
                  />
                  {/* Multiple devices */}
                  <div className="absolute -top-3 -right-3 w-14 h-14 sm:w-16 sm:h-16 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl flex items-center justify-center text-lg sm:text-xl font-black text-emerald-600 border-2 border-emerald-200/80 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100">
                    📱
                  </div>
                  <div className="absolute -bottom-3 -left-3 w-12 h-12 sm:w-14 sm:h-14 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl flex items-center justify-center text-lg font-black text-slate-700 border-2 border-slate-200/80 opacity-0 group-hover:opacity-100 transition-all duration-500 -rotate-12 scale-0 group-hover:scale-100">
                    💻
                  </div>
                  <div className="absolute top-2 left-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse scale-0 group-hover:scale-100">
                    <span className="text-xs font-bold text-white block leading-none">●</span>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              ))}
              {signedImageUrls.length === 0 && (
                Array.from({ length: 8 }, (_, i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-gray-200/70 to-gray-300/70 rounded-3xl shadow-xl animate-pulse relative overflow-hidden backdrop-blur-sm border-2 border-white/50">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-2xl" />
                  </div>
                ))
              )}
            </div>
            <p className="text-sm text-gray-500 text-center font-medium">
              {signedImageUrls.length} attēl{ signedImageUrls.length === 1 ? '' : 'i'}
            </p>
          </div>

          {/* Info cards */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <div className="group bg-white/90 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/70 hover:border-emerald-200/70">
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 text-emerald-700 text-sm font-bold rounded-2xl mb-6 border border-emerald-200/50">
                📍 Atrašanās vieta
              </span>
              <p className="text-3xl lg:text-4xl font-black text-gray-900 group-hover:text-emerald-600 transition-all duration-300">
                {sludinajums.city || sludinajums.location || 'Rīga, Latvija'}
              </p>
            </div>
            <div className="group bg-white/90 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-white/70 hover:border-blue-200/70">
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700 text-sm font-bold rounded-2xl mb-6 border border-blue-200/50">
                🏷️ Kategorija
              </span>
              <p className="text-3xl lg:text-4xl font-black text-gray-900 group-hover:text-blue-600 transition-all duration-300">
                {sludinajums.category}
              </p>
            </div>
            <div className="group bg-gradient-to-r from-purple-500/10 to-violet-500/10 backdrop-blur-xl p-8 lg:p-10 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 border border-purple-200/50">
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/30 to-violet-500/30 text-purple-800 text-sm font-bold rounded-2xl mb-6 border border-purple-200/60">
                📅 Publicēts
              </span>
              <p className="text-2xl lg:text-3xl font-black text-gray-900">
                {new Date(sludinajums.created_at).toLocaleDateString('lv-LV', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Apraksts */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-2xl p-12 lg:p-16 rounded-4xl shadow-3xl border border-white/60">
            <h3 className="text-4xl lg:text-5xl font-black mb-12 flex items-center gap-4 bg-gradient-to-r from-gray-900 via-slate-800 to-black bg-clip-text text-transparent drop-shadow-2xl">
              📄 Pilns apraksts
            </h3>
            <div className="prose prose-2xl text-gray-800 leading-relaxed max-w-none whitespace-pre-wrap font-light tracking-wide">
              {sludinajums.description || 'Nav pievienots apraksts.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
