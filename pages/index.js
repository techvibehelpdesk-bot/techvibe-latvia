import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/90 via-blue-50/90 to-indigo-100/90 
                    bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&fit=crop&w=1920&q=60')] 
                    bg-blend-overlay bg-cover bg-center bg-fixed relative overflow-hidden">
      
      {/* Subtle overlay pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(120,119,198,0.1),transparent)]" />
      
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 drop-shadow-lg">
            TechVibe
          </h1>
          <p className="text-xl md:text-2xl text-gray-800 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
            Sludinājumi un preces visā Latvijā. Ātri, droši, izdevīgi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <Link 
              href="/ievietot"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm"
            >
              ➕ Ievietot sludinājumu
            </Link>
            <Link 
              href="/sludinajumi"
              className="border-2 border-white/50 bg-white/80 text-blue-600 px-8 py-4 rounded-2xl text-xl font-bold hover:bg-white hover:border-blue-300 backdrop-blur-sm transition-all duration-300"
            >
              👀 Apskatīt sludinājumus
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of page same as before... */}
      <section className="py-20 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Populārākās kategorijas
          </h2>
          {/* Categories grid same as before */}
        </div>
      </section>

      {/* Add backdrop-blur-sm to all white sections */}
    </div>
  );
}
