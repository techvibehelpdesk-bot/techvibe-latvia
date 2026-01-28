import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function SludinajumaLapa({ params }) {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data: sludinajums, error } = await supabase
    .from('sludinajumi')
    .select(`
      *,
      images:images(id, path)
    `)
    .eq('id', params.id)
    .eq('status', 'published')
    .single();

  if (error || !sludinajums) {
    return <div className="min-h-screen flex items-center justify-center text-xl text-gray-500">Sludinājums nav atrasts</div>;
  }

  // Signed URLs for all images
  const imagePromises = [
    ...(sludinajums.thumbnail_url ? [{ path: sludinajums.thumbnail_url, type: 'thumb' }] : []),
    ...sludinajums.images?.map(img => ({ path: img.path, type: 'img' })) || []
  ];

  const signedImageUrls = await Promise.all(
    imagePromises.map(async ({ path }) => {
      const { data } = await supabase.storage
        .from('sludinajumi')
        .createSignedUrl(path, 3600);
      return data?.signedUrl || null;
    })
  ).then(urls => urls.filter(Boolean).slice(0, 8));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Title + Price */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {sludinajums.title}
          </h1>
          <div className="inline-flex items-baseline px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-2xl text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            <span className="text-3xl mr-2">€</span>
            {sludinajums.price}
          </div>
        </div>

        {/* Product screenshot grid - multiple devices style */}
        <div className="mb-16">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mb-8">
            {signedImageUrls.map((img, i) => (
              <div 
                key={i} 
                className="group relative overflow-hidden rounded-2xl aspect-square bg-gradient-to-br from-white to-slate-50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-white/50 hover:border-emerald-200"
              >
                <img 
                  src={img} 
                  alt={`Attēls ${i+1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-xl"
                  loading="lazy"
                />
                {/* Device mockups */}
                <div className="absolute -top-2 -right-2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center text-xs sm:text-sm font-bold text-emerald-600 border border-emerald-200 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  📱
                </div>
                <div className="absolute -bottom-2 -left-2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-xs font-bold text-slate-600 opacity-0 group-hover:opacity-100 transition-all duration-300 rotate-12">
                  💻
                </div>
                <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping">
                  <span className="text-xs font-bold text-white">●</span>
                </div>
              </div>
            ))}
            {signedImageUrls.length === 0 && (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-lg animate-pulse relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-xl" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Minimal info cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-white/50 hover:border-emerald-200">
            <span className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">
              📍 Atrašanās vieta
            </span>
            <p className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
              {sludinajums.city || sludinajums.location || 'Rīga'}
            </p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-white/50 hover:border-emerald-200">
            <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
              🏷️ Kategorija
            </span>
            <p className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {sludinajums.category}
            </p>
          </div>
          <div className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-white/50 hover:border-emerald-200 md:col-span-2 lg:col-span-1">
            <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full mb-4">
              📅 Publicēts
            </span>
            <p className="text-xl font-bold text-gray-900">
              {new Date(sludinajums.created_at).toLocaleDateString('lv-LV')}
            </p>
          </div>
        </div>

        {/* Description - super minimal */}
        <div className="bg-gradient-to-r from-white via-white/90 to-emerald-50/50 backdrop-blur-md p-10 lg:p-12 rounded-3xl shadow-2xl border border-white/60">
          <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3 bg-gradient-to-r from-gray-900 to-slate-800 bg-clip-text text-transparent">
            Pilns apraksts
          </h3>
          <div className="prose prose-lg lg:prose-xl text-gray-700 leading-relaxed max-w-none whitespace-pre-wrap">
            {sludinajums.description || 'Nav apraksta.'}
          </div>
        </div>
      </div>
    </div>
  );
}
