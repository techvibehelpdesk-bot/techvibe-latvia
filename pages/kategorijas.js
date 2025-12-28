// pages/kategorijas.js - VISAS KATEGORIJAS kā SS.COM
import Link from "next/link";
import Head from "next/head";

export default function VisasKategorijas() {
  const galvenasKategorijas = [
    {
      nosaukums: "Transports",
      apaksKategorijas: [
        "Vieglie auto", "Kravu auto", "Moto transports", "Novietojamās mājas", "Piekabes",
        "Velo, skrejriteņi", "Auto maiņa", "Auto remonts un rezerves daļas"
      ]
    },
    {
      nosaukums: "Elektrotehnika",
      apaksKategorijas: [
        "Sakaru līdzekļi", "Sadzīves tehnika", "Datori, biroja tehnika", 
        "Audio, video, DVD", "Foto un optika", "TV, video, audio", "GPS navigatori"
      ]
    },
    {
      nosaukums: "Mājai un remontam",
      apaksKategorijas: [
        "Mēbeles, interjers", "Būvniecība", "Santehnika", "Dārza tehnika",
        "Projekti, dizains", "Pārvadāšana", "Materiāli"
      ]
    },
    {
      nosaukums: "Darbs un bizness",
      apaksKategorijas: [
        "Vakances", "Meklēju darbu", "Kursi, izglītība", "Darījumu kontakti",
        "Juridiskie pakalpojumi", "Finanšu pakalpojumi", "Tulkojumi", "Interneta pakalpojumi"
      ]
    },
    {
      nosaukums: "Bērniem",
      apaksKategorijas: [
        "Skolas preces", "Bērnu apģērbi", "Rotaļlietas", "Bērnu rati", "Bērnu mēbeles",
        "Bērnu barība", "Pavadones, bērnudārzi"
      ]
    },
    {
      nosaukums: "Dzīvnieki",
      apaksKategorijas: [
        "Suņi", "Kaķi", "Grauzēji", "Zivis", "Putni", "Lauksaimniecības dzīvnieki",
        "Veterinārie pakalpojumi"
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Visas kategorijas | TechVibe</title>
      </Head>

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* HEADER */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-gray-900 mb-6">Visas kategorijas</h1>
            <p className="text-2xl text-gray-600">Izvēlies interesējošo sadaļu</p>
          </div>

          {/* SS.COM STILA KATEGORIJU SARAKSTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {galvenasKategorijas.map((kategorija, index) => (
              <div key={index} className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200 hover:shadow-2xl hover:border-purple-300 transition-all duration-300 group">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 pb-4 border-b-4 border-purple-200 group-hover:border-purple-400 transition-colors">
                  {kategorija.nosaukums}
                </h2>
                
                <div className="space-y-3">
                  {kategorija.apaksKategorijas.map((apaksa, i) => (
                    <Link 
                      key={i}
                      href={`/${apaksa.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '')}`}
                      className="block p-4 rounded-2xl hover:bg-purple-50 hover:text-purple-700 font-semibold transition-all duration-200 hover:pl-6 hover:-translate-y-1 border-r-4 border-transparent hover:border-purple-400"
                    >
                      {apaksa}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <Link 
              href="/ievietot"
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-2xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
            >
              🆕 Publicēt sludinājumu
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
