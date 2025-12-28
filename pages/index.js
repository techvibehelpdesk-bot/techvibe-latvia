// pages/index.js - REĀLI ATTĒLIEM BEZ ZILĀM KVADRĀTIEM
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TechVibe - Sludinājumi Latvijā</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        {/* HERO SECTION - REĀLS ATTĒLS FONĀ */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* REĀLS FONA ATTĒLS */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" 
               style={{backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"}}>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent drop-shadow-2xl">
              TechVibe
            </h1>
            <p className="text-xl md:text-3xl mb-12 font-light text-white/90 drop-shadow-lg max-w-2xl mx-auto leading-relaxed">
              Sludinājumi visai Latvijai
            </p>
            <Link 
              href="/ievietot"
              className="inline-flex items-center px-12 py-6 bg-white/90 backdrop-blur-sm text-purple-600 font-bold text-xl md:text-2xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 hover:bg-white transition-all duration-300 border-2 border-white/50"
            >
              🚀 Publicēt sludinājumu
            </Link>
          </div>
        </div>

        {/* KATEGORIJU KARTOLES AR REĀLIEM ATTĒLIEM */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Populārākās kategorijas</h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">Izvēlies kategoriju un atrodi to, ko meklē</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* TELEFONI */}
            <Link href="/telefoni" className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-purple-400 rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 flex items-center justify-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">Telefoni un aksesuāri</h3>
              <p className="text-3xl font-bold text-purple-600 mb-6">1 234 sludinājumi</p>
              <span className="text-lg bg-purple-100 text-purple-800 px-6 py-3 rounded-full font-bold group-hover:bg-purple-200 transition-all hover:scale-105">
                Apskatīt →
              </span>
            </Link>

            {/* AUTO */}
            <Link href="/auto" className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-blue-400 rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 flex items-center justify-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">Auto un moto</h3>
              <p className="text-3xl font-bold text-blue-600 mb-6">2 567 sludinājumi</p>
              <span className="text-lg bg-blue-100 text-blue-800 px-6 py-3 rounded-full font-bold group-hover:bg-blue-200 transition-all hover:scale-105">
                Apskatīt →
              </span>
            </Link>

            {/* DATORI */}
            <Link href="/datori" className="group relative bg-white/80 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-indigo-400 rounded-3xl p-10 shadow-xl hover:shadow-2xl hover:-translate-y-4 transition-all duration-700 overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-6 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                <div className="w-full h-full bg-gradient-to-br from-indigo-400 via-indigo-500 to-purple-500 flex items-center justify-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">Datori un programmatūra</h3>
              <p className="text-3xl font-bold text-indigo-600 mb-6">890 sludinājumi</p>
              <span className="text-lg bg-indigo-100 text-indigo-800 px-6 py-3 rounded-full font-bold group-hover:bg-indigo-200 transition-all hover:scale-105">
                Apskatīt →
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
