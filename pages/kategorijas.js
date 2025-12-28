// pages/kategorijas.js - VISAS KATEGORIJAS ar Atpakaļ pogu + linkiem
import Link from "next/link";
import Head from "next/head";

export default function VisasKategorijas() {
  return (
    <>
      <Head>
        <title>Visas kategorijas | TechVibe</title>
      </Head>

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* ATBALKA POGA AUGŠĀ */}
          <div className="mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg text-xl font-bold text-gray-800 hover:text-purple-600 hover:border-purple-400 transition-all duration-300"
            >
              ← Atpakaļ uz sākuma lapu
            </Link>
          </div>

          {/* HEADER */}
          <div className="text-center mb-20">
            <h1 className="text-5xl font-black text-gray-900 mb-6 drop-shadow-lg">Visas kategorijas</h1>
            <p className="text-2xl text-gray-600 drop-shadow">Izvēlies interesējošo sadaļu</p>
          </div>

          {/* SS.COM STILA KATEGORIJU SARAKSTS ar LINKIEM */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {[
              {
                nosaukums: "Transports",
                apaksKategorijas: [
                  { nosaukums: "Vieglie auto", links: "/auto" },
                  { nosaukums: "Kravu auto", links: "/kravu-auto" },
                  { nosaukums: "Moto transports", links: "/moto" },
                  { nosaukums: "Piekabes", links: "/piekabes" },
                  { nosaukums: "Velo, skrejriteņi", links: "/velo" }
                ]
              },
              {
                nosaukums: "Elektrotehnika",
                apaksKategorijas: [
                  { nosaukums: "Telefoni un aksesuāri", links: "/telefoni" },
                  { nosaukums: "Datori un programmatūra", links: "/datori" },
                  { nosaukums: "TV, video, audio", links: "/tv-audio" },
                  { nosaukums: "Foto un optika", links: "/foto" }
                ]
              },
              {
                nosaukums: "Mājai un remontam",
                apaksKategorijas: [
                  { nosaukums: "Mēbeles un interjers", links: "/mebeles" },
                  { nosaukums: "Būvniecība", links: "/buvnieciba" },
                  { nosaukums: "Santehnika", links: "/santehnika" },
                  { nosaukums: "Dārza tehnika", links: "/darza-tehnika" }
                ]
              },
              {
                nosaukums: "Darbs un bizness",
                apaksKategorijas: [
                  { nosaukums: "Vakances", links: "/darbs" },
                  { nosaukums: "Meklēju darbu", links: "/mekleju-darbu" },
                  { nosaukums: "Kursi, izglītība", links: "/kursi" },
                  { nosaukums: "Darījumu kontakti", links: "/darījumi" }
                ]
              },
              {
                nosaukums: "Bērniem",
                apaksKategorijas: [
                  { nosaukums: "Bērnu apģērbi", links: "/bernu-apgerbi" },
                  { nosaukums: "Rotaļlietas", links: "/rotalietas" },
                  { nosaukums: "Bērnu rati", links: "/bernu-rati" }
                ]
              },
              {
                nosaukums: "Dzīvnieki",
                apaksKategorijas: [
                  { nosaukums: "Suņi", links: "/suni" },
                  { nosaukums: "Kaķi", links: "/kaki" },
                  { nosaukums: "Zivis", links: "/zivis" },
                  { nosaukums: "Putni", links: "/putni" }
                ]
              }
            ].map((kategorija, index) => (
              <div key={index} className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 group">
                <h2 className="text-3xl font-black text-gray-900 mb-8 pb-6 border-b-4 border-purple-200 group-hover:border-purple-400 transition-all duration-300">
                  {kategorija.nosaukums}
                </h2>
                
                <div className="space-y-3">
                  {kategorija.apaksKategorijas.map((apaksa, i) => (
                    <Link 
                      key={i}
                      href={apaksa.links}
                      className="block p-6 rounded-2xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700 font-semibold text-lg transition-all duration-300 hover:pl-8 hover:-translate-y-1 hover:shadow-md border-r-4 border-transparent hover:border-purple-400 group-hover:text-purple-600"
                    >
                      {apaksa.nosaukums}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-24">
            <Link 
              href="/ievietot"
              className="inline-flex items-center px-16 py-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-black text-2xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              🆕 Publicēt sludinājumu
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
