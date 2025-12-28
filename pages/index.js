// pages/index.js - REĀLI ATTĒLI + KUSTĪBAS efekti
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const kategorijas = [
    { slugs: "telefoni", nosaukums: "Telefoni un aksesuāri", skaits: "1 234", attels: "/images/telefons.jpg" },
    { slugs: "auto", nosaukums: "Auto un moto", skaits: "2 567", attels: "/images/auto.jpg" },
    { slugs: "datori", nosaukums: "Datori un programmatūra", skaits: "890", attels: "/images/dators.jpg" },
    { slugs: "mebeles", nosaukums: "Mēbeles un interjers", skaits: "3 456", attels: "/images/mebeles.jpg" },
    { slugs: "sports", nosaukums: "Sporta preces", skaits: "1 789", attels: "/images/sports.jpg" },
    { slugs: "darbs", nosaukums: "Darbs un bizness", skaits: "567", attels: "/images/darbs.jpg" },
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

        {/* KATEGORIJU KARTOLES AR REĀLIEM ATTĒLIEM + KUSTĪBU */}
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
                className="group bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 border-2 border-gray-200 hover:border-purple-400 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden h-full flex flex-col items-center text-center relative"
              >
                {/* REĀLS ATTĒLS ar KUSTĪBU */}
                <div className="w-32 h-32 mx-auto mb-6 overflow-hidden rounded-2xl group-hover:scale-110 transition-all duration-700 shadow-2xl">
                  <Image 
                    src={kat.attels} 
                    alt={kat.nosaukums}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover group-hover:rotate-3 transition-all duration-700"
                  />
                  {/* KUSTĪBAS EFEKTS - gaismas */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl"></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {kat.nosaukums}
                </h3>
                <p className="text-2xl font-bold text-purple-600 mb-6">{kat.skaits} sludinājumi</p>
                <span className="text-sm bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-medium group-hover:bg-purple-200 transition-all duration-300 hover:scale-105">
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
