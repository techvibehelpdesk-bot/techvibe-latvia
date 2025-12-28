// pages/index.js - SMUKĀ SĀKUMA LAPA ar SVG ikonām
import Link from "next/link";
import Head from "next/head";

export default function Home() {
  const kategorijas = [
    { slugs: "telefoni", nosaukums: "Telefoni un aksesuāri", skaits: "1 234" },
    { slugs: "auto", nosaukums: "Auto un moto", skaits: "2 567" },
    { slugs: "datori", nosaukums: "Datori un programmatūra", skaits: "890" },
    { slugs: "mebeles", nosaukums: "Mēbeles un interjers", skaits: "3 456" },
    { slugs: "sports", nosaukums: "Sporta preces", skaits: "1 789" },
    { slugs: "darbs", nosaukums: "Darbs un bizness", skaits: "567" },
  ];

  return (
    <>
      <Head>
        <title>TechVibe - Sludinājumi Latvijā</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
              TechVibe
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 drop-shadow">
              Sludinājumi visai Latvijai
            </p>
            <Link 
              href="/ievietot"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              🚀 Publicēt sludinājumu
            </Link>
          </div>
        </div>

        {/* KATEGORIJU KARTOLES ar SVG IKONĀM */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Populārākās kategorijas</h2>
            <p className="text-xl text-gray-600">Izvēlies kategoriju un atrodi to, ko meklē</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kategorijas.map((kat) => (
              <Link 
                key={kat.slugs} 
                href={`/${kat.slugs}`}
                className="group bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 border-2 border-gray-200 hover:border-purple-400 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden h-full flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform p-4">
                  {/* SVG IKONAS katrai kategorijai */}
                  {kat.slugs === "telefoni" && (
                    <svg className="w-12 h-12 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  )}
                  {kat.slugs === "auto" && (
                    <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 .99-.45.99-.99L6 13h2v7H6v-7h2v7H4v-7l1.5-6h11l1.5 6h-2v7h2v-7h2v7h-1.99c0 .55.44.99.99.99h1c.55 0 1-.45 1-1v-8l-.08-1.99z"/>
                    </svg>
                  )}
                  {kat.slugs === "datori" && (
                    <svg className="w-12 h-12 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 5h16v11H4V5zm8 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                    </svg>
                  )}
                  {kat.slugs === "mebeles" && (
                    <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 8h-3V4H1v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3 1.34-3 3-3 3 1.34 3 3 1.34 3 3 3 3-1.34 3-3h2V8z"/>
                    </svg>
                  )}
                  {kat.slugs === "sports" && (
                    <svg className="w-12 h-12 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  )}
                  {kat.slugs === "darbs" && (
                    <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z"/>
                    </svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600">
                  {kat.nosaukums}
                </h3>
                <p className="text-2xl font-bold text-purple-600 mb-6">{kat.skaits} sludinājumi</p>
                <span className="text-sm bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium group-hover:bg-purple-200 transition-colors">
                  Apskatīt →
                </span>
              </Link>
            ))}
          </div>

          {/* CTA SECTION */}
          <div className="text-center mt-20">
            <Link 
              href="/ievietot"
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              🆕 Publicēt savu sludinājumu tagad
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
