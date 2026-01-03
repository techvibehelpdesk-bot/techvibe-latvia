import Link from "next/link";
import Head from "next/head";
import Footer from "../components/Footer";  // ✅ PIEVIENO

export default function VisasKategorijas() {
  return (
    <>
      <Head>
        <title>Visas kategorijas | TechVibe – Sludinājumi Latvijā</title>
        <meta name="description" content="Telefoni, auto, dzīvokļi, pakalpojumi – visas kategorijas" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* ATBALKA POGA */}
          <div className="mb-12 pt-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg text-xl font-bold text-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              ← Sākums
            </Link>
          </div>

          {/* HEADER */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 drop-shadow-2xl">
              🗂️ Visas kategorijas
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 drop-shadow-lg">
              12,847 aktīvi sludinājumi – atrodi visu!
            </p>
          </div>

          {/* GALVENĀS KATEGORIJAS */}
          <div className="mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
              Populārākās
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[
                { icon: '🚗', name: 'Auto', count: '5,247', href: '/kategorija/auto' },
                { icon: '📱', name: 'Telefoni', count: '2,847', href: '/kategorija/telefoni' },
                { icon: '🏠', name: 'Dzīvokļi', count: '3,128', href: '/kategorija/dzivokli' },
                { icon: '💻', name: 'Datori', count: '1,592', href: '/kategorija/datori' },
                { icon: '🎧', name: 'Audio', count: '1,028', href: '/kategorija/audio' },
                { icon: '👕', name: 'Apģērbs', count: '2,340', href: '/kategorija/apgerbs' },
                { icon: '🛋️', name: 'Mēbeles', count: '2,890', href: '/kategorija/mebeles' },
                { icon: '🔧', name: 'Rīki', count: '1,456', href: '/kategorija/riki' }
              ].map((cat, i) => (
                <Link key={i} href={cat.href} className="group bg-white shadow-xl rounded-3xl p-10 hover:shadow-2xl hover:-translate-y-3 hover:scale-[1.02] transition-all duration-500 border-2 border-transparent hover:border-purple-300">
                  <div className="text-6xl mb-8 group-hover:scale-110 transition-transform">{cat.icon}</div>
                  <h3 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-purple-600">{cat.name}</h3>
                  <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                    {cat.count}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* GRUPOTĀS KATEGORIJAS ss.com stilā */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-24">
            {[
              {
                nosaukums: "🚙 Transports",
                count: "8,456 sludinājumi",
                apaksKategorijas: [
                  { name: "Vieglie auto", count: "5,247", href: "/kategorija/auto" },
                  { name: "Kravu auto", count: "892", href: "/kategorija/kravu-auto" },
                  { name: "Moto", count: "456", href: "/kategorija/moto" },
                  { name: "Velo & skrejriteņi", count: "789", href: "/kategorija/velo" }
                ]
              },
              {
                nosaukums: "📱 Elektrotehnika",
                count: "7,234 sludinājumi",
                apaksKategorijas: [
                  { name: "Telefoni", count: "2,847", href: "/kategorija/telefoni" },
                  { name: "Datori", count: "1,592", href: "/kategorija/datori" },
                  { name: "TV & Audio", count: "1,028", href: "/kategorija/audio" },
                  { name: "Foto tehnikas", count: "678", href: "/kategorija/foto" }
                ]
              },
              {
                nosaukums: "🏠 Mājai un dzīvei",
                count: "9,876 sludinājumi",
                apaksKategorijas: [
                  { name: "Dzīvokļi", count: "3,128", href: "/kategorija/dzivokli" },
                  { name: "Mēbeles", count: "2,890", href: "/kategorija/mebeles" },
                  { name: "Remonts & būvniecība", count: "1,678", href: "/kategorija/remonts" },
                  { name: "Sadzīves tehnika", count: "2,180", href: "/kategorija/sadzive" }
                ]
              },
              {
                nosaukums: "💼 Darbs & Bizness",
                count: "3,456 sludinājumi",
                apaksKategorijas: [
                  { name: "Vakances", count: "1,890", href: "/kategorija/darbs" },
                  { name: "Pakalpojumi", count: "1,247", href: "/pakalpojumi" },
                  { name: "Biznesa piedāvājums", count: "319", href: "/kategorija/bizness" }
                ]
              },
              {
                nosaukums: "👨‍👩‍👧‍👦 Bērniem & Ģimenei",
                count: "4,567 sludinājumi",
                apaksKategorijas: [
                  { name: "Bērnu apģērbs", count: "1,234", href: "/kategorija/bernu-apgerbs" },
                  { name: "Rotaļlietas", count: "890", href: "/kategorija/rotalietas" },
                  { name: "Bērnu rati", count: "678", href: "/kategorija/bernu-rati" }
                ]
              },
              {
                nosaukums: "🐕 Dzīvnieki",
                count: "1,234 sludinājumi",
                apaksKategorijas: [
                  { name: "Suņi", count: "567", href: "/kategorija/suni" },
                  { name: "Kaķi", count: "456", href: "/kategorija/kaki" },
                  { name: "Citi dzīvnieki", count: "211", href: "/kategorija/dzivnieki" }
                ]
              }
            ].map((kategorija, index) => (
              <div key={index} className="bg-white shadow-2xl rounded-3xl p-10 border-4 border-gray-100 hover:shadow-3xl hover:border-blue-200 hover:-translate-y-2 transition-all duration-500 group cursor-pointer">
                <div className="flex items-center mb-8">
                  <h2 className="text-4xl font-black text-gray-900 mr-4 group-hover:text-blue-600 transition-colors">
                    {kategorija.nosaukums}
                  </h2>
                  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-lg font-bold">
                    {kategorija.count}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {kategorija.apaksKategorijas.map((apaksa, i) => (
                    <Link 
                      key={i}
                      href={apaksa.href}
                      className="flex items-center p-6 rounded-2xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700 font-semibold text-xl transition-all duration-300 group-hover:pl-6 hover:shadow-md border hover:border-blue-200"
                    >
                      <span className="w-3 h-3 bg-blue-500 rounded-full mr-4 group-hover:animate-pulse"></span>
                      <span>{apaksa.name}</span>
                      <span className="ml-auto text-blue-600 font-bold text-lg">{apaksa.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-32">
            <Link 
              href="/ievietot"
              className="inline-flex items-center px-20 py-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-3xl rounded-3xl shadow-2xl hover:shadow-4xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 group"
            >
              ➕ Publicēt sludinājumu BEZ MAKSAS!
              <span className="ml-4 w-3 h-3 bg-white rounded-full group-hover:animate-bounce"></span>
            </Link>
          </div>

        </div>
      </main>
      
      <Footer />  // ✅ PIEVIENO
    </>
  );
}
