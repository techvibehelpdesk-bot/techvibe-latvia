// pages/index.js - REDZAMI TEKSTI + "Sludinājumi un iespējas visiem"
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>TechVibe - Sludinājumi Latvijā</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        {/* HERO SECTION - REDZAMI TEKSTI */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* REĀLS FONA ATTĒLS ar tumšu overlay */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" 
               style={{backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"}}>
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-purple-900/40 to-black/50"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
              TECHVIBE
            </h1>
            <p className="text-2xl md:text-4xl mb-12 font-bold text-white/95 drop-shadow-2xl max-w-3xl mx-auto leading-tight">
              Sludinājumi un iespējas visiem
            </p>
            <Link 
              href="/ievietot"
              className="inline-flex items-center px-12 py-6 bg-white text-purple-600 font-black text-xl md:text-2xl rounded-3xl shadow-2xl hover:shadow-4xl hover:scale-105 hover:bg-purple-50 transition-all duration-300 border-4 border-white/60 backdrop-blur-sm"
            >
              🚀 Publicēt sludinājumu
            </Link>
          </div>
        </div>

        {/* KATEGORIJU KARTOLES */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 drop-shadow-lg">Populārākās kategorijas</h2>
            <p className="text-2xl md:text-3xl text-gray-600 max-w-2xl mx-auto drop-shadow">Izvēlies kategoriju un atrodi to, ko meklē</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* TELEFONI */}
            <Link href="/telefoni" className="group relative bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-purple-400 rounded-3xl p-10 shadow-xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-700 overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-8 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl" style={{backgroundImage: "url('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-purple-600 transition-all duration-300">Telefoni un aksesuāri</h3>
              <p className="text-4xl font-black text-purple-600 mb-8 drop-shadow-lg">1 234 sludinājumi</p>
              <span className="text-xl bg-purple-100 text-purple-800 px-8 py-4 rounded-2xl font-bold group-hover:bg-purple-200 hover:scale-110 transition-all duration-300 shadow-lg">
                Apskatīt →
              </span>
            </Link>

            {/* AUTO */}
            <Link href="/auto" className="group relative bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-blue-400 rounded-3xl p-10 shadow-xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-700 overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-8 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-500 flex items-center justify-center shadow-2xl" style={{backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-all duration-300">Auto un moto</h3>
              <p className="text-4xl font-black text-blue-600 mb-8 drop-shadow-lg">2 567 sludinājumi</p>
              <span className="text-xl bg-blue-100 text-blue-800 px-8 py-4 rounded-2xl font-bold group-hover:bg-blue-200 hover:scale-110 transition-all duration-300 shadow-lg">
                Apskatīt →
              </span>
            </Link>

            {/* DATORI */}
            <Link href="/datori" className="group relative bg-white/90 backdrop-blur-sm hover:bg-white border-2 border-gray-200 hover:border-indigo-400 rounded-3xl p-10 shadow-xl hover:shadow-3xl hover:-translate-y-4 transition-all duration-700 overflow-hidden h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-8 shadow-2xl group-hover:scale-105 transition-transform duration-700">
                <div className="w-full h-full bg-gradient-to-br from-indigo-400 via-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl" style={{backgroundImage: "url('https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-indigo-600 transition-all duration-300">Datori un programmatūra</h3>
              <p className="text-4xl font-black text-indigo-600 mb-8 drop-shadow-lg">890 sludinājumi</p>
              <span className="text-xl bg-indigo-100 text-indigo-800 px-8 py-4 rounded-2xl font-bold group-hover:bg-indigo-200 hover:scale-110 transition-all duration-300 shadow-lg">
                Apskatīt →
              </span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
