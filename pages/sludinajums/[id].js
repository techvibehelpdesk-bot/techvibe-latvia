export const dynamic = 'force-dynamic';

async function fetchSludinajums(id) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return null; // Dev mode
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/sludinajumi?select=*&id=eq.${id}&status=eq.publicēts`, {
    headers: {
      'Authorization': `Bearer ${supabaseKey}`,
      'apikey': supabaseKey,
    },
  });

  const data = await response.json();
  return data.length > 0 ? data[0] : null;
}

export default async function SludinajumsPage({ params }) {
  const sludinajums = await fetchSludinajums(params.id);

  if (!sludinajums) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center p-12 max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Sludinājums nav atrasts</h1>
          <a href="/sludinajumi" className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-lg text-lg font-bold text-purple-700 hover:border-purple-400 transition-all">
            ← Atpakaļ uz sludinājumiem
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>{sludinajums.title} | TechVibe</title>
      <meta name="description" content={sludinajums.description} />
      
      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* ATBALKA POGA */}
          <div className="mb-12">
            <a 
              href="/sludinajumi"
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm text-lg font-semibold text-gray-800 hover:text-purple-600 hover:border-purple-400 transition-all"
            >
              ← Atpakaļ uz sludinājumiem
            </a>
          </div>

          <div className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{sludinajums.title}</h1>
            
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-full text-xl font-bold shadow-lg">
                {sludinajums.price} €
              </span>
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-lg font-semibold uppercase tracking-wide">
                {sludinajums.category}
              </span>
            </div>

            {sludinajums.image_url && (
              <div className="mb-12 overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={sludinajums.image_url} 
                  alt={sludinajums.title}
                  className="w-full h-[400px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            <div className="prose prose-xl max-w-none mb-12 leading-relaxed">
              <p className="text-lg text-gray-700">{sludinajums.description}</p>
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 md:p-12 rounded-3xl border-4 border-indigo-200 shadow-xl">
              <h3 className="text-3xl font-bold mb-8 text-gray-900">📞 Sazinies tagad</h3>
              <p className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {sludinajums.contact}
              </p>
              
              <div className="flex flex-col lg:flex-row gap-6">
                <a
                  href={`tel:${sludinajums.contact.replace(/\D/g, '')}`}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-5 px-10 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  📞 Zvanīt uzreiz
                </a>
                <a 
                  href="/sludinajumi"
                  className="flex-1 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold py-5 px-10 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 text-center"
                >
                  👀 Vairāk sludinājumu
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
