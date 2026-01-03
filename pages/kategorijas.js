import Link from "next/link";
import Head from "next/head";
// NOŅĒMU: import Footer from "../components/Footer";

export default function VisasKategorijas() {
  return (
    <>
      <Head>
        <title>Visas kategorijas | TechVibe</title>
      </Head>

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* ATBALKA POGA */}
          <div className="mb-12 pt-8">
            <Link href="/" className="inline-flex items-center px-8 py-4 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-2xl shadow-lg text-xl font-bold text-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all">
              ← Sākums
            </Link>
          </div>

          {/* HEADER */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 drop-shadow-2xl">
              🗂️ Visas kategorijas
            </h1>
            <p className="text-2xl md:text-3xl text-gray-600 drop-shadow-lg">
              12,847 aktīvi sludinājumi
            </p>
          </div>

          {/* POPULĀRĀKĀS */}
          <div className="mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-center text-gray-900 mb-16 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
              Populārākās
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                { icon: '🚗', name: 'Auto', count: '5,247', href: '/kategorija/auto' },
                { icon: '📱', name: 'Telefoni', count: '2,847', href: '/kategorija/telefoni' },
                { icon: '🏠', name: 'Dzīvokļi', count: '3,128', href: '/kategorija/dzivokli' },
                { icon: '💻', name: 'Datori', count: '1,592', href: '/kategorija/datori' },
                { icon: '🎧', name: 'Audio', count: '1,028', href: '/kategorija/audio' },
                { icon: '🛋️', name: 'Mēbeles', count: '2,890', href: '/kategorija/mebeles' },
                { icon: '🔧', name: 'Rīki', count: '1,456', href: '/kategorija/riki' },
                { icon: '👕', name: 'Apģērbs', count: '2,340', href: '/kategorija/apgerbs' }
              ].map((cat, i) => (
                <Link key={i} href={cat.href} className="group bg-white shadow-xl rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all border hover:border-purple-300">
                  <div className="text-6xl mb-6 group-hover:scale-110">{cat.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600">{cat.name}</h3>
                  <p className="text-3xl font-bold text-blue-600">{cat.count}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* GRUPOTĀS KATEGORIJAS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                nosaukums: "🚙 Transports",
                count: "8,456",
                kategorijas: [
                  { name: "Vieglie auto", count: "5,247", href: "/kategorija/auto" },
                  { name: "Kravu auto", count: "892", href: "/kategorija/kravu-auto" },
                  { name: "Moto", count: "456", href: "/kategorija/moto" },
                  { name: "Velo", count: "789", href: "/kategorija/velo" }
                ]
              },
              {
                nosaukums: "🏠 Mājai",
                count: "9,876",
                kategorijas: [
                  { name: "Dzīvokļi", count: "3,128", href: "/kategorija/dzivokli" },
                  { name: "Mēbeles", count: "2,890", href: "/kategorija/mebeles" },
                  { name: "Remonts", count: "1,678", href: "/kategorija/remonts" },
                  { name: "Sadzīves tehnika", count: "2,180", href: "/kategorija/sadzive" }
                ]
              },
              {
                nosaukums: "💼 Bizness",
                count: "3,456",
                kategorijas: [
                  { name: "Darbs", count: "1,890", href: "/kategorija/darbs" },
                  { name: "Pakalpojumi", count: "1,247", href: "/pakalpojumi" },
                  { name: "Bizness", count: "319", href: "/kategorija/bizness" }
                ]
              },
              {
                nosaukums: "🐕 Dzīvnieki",
                count: "1,234",
                kategorijas: [
                  { name: "Suņi", count: "567", href: "/kategorija/suni" },
                  { name: "Kaķi", count: "456", href: "/kategorija/kaki" },
                  { name: "Citi", count: "211", href: "/kategorija/dzivnieki" }
                ]
              }
            ].map((group, i) => (
              <div key={i} className="bg-white shadow-2xl rounded-3xl p-10 border-4 border-gray-100 hover:shadow-3xl hover:border-blue-200 hover:-translate-y-2 transition-all group">
                <h2 className="text-4xl font-black text-gray-900 mb-8 flex items-center">
                  {group.nosaukums}
                  <span className="ml-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-xl font-bold">
                    {group.count}
                  </span>
                </h2>
                <div className="space-y-3">
                  {group.kategorijas.map((cat, j) => (
                    <Link key={j} href={cat.href} className="flex items-center p-6 rounded-2xl hover:bg-blue-50 hover:text-blue-700 font-semibold text-xl transition-all hover:pl-8 hover:shadow-md border hover:border-blue-200">
                      {cat.name}
                      <span className="ml-auto text-blue-600 font-bold">{cat.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-32">
            <Link href="/ievietot" className="inline-flex items-center px-20 py-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-black text-3xl rounded-3xl shadow-2xl hover:shadow-4xl hover:scale-105 hover:-translate-y-2 transition-all">
              ➕ Publicēt sludinājumu BEZ MAKSAS!
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
