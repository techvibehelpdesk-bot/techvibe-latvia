// pages/ievietot.js - SS.COM stila kategorijas + mūsu dizains

import Head from "next/head";

const categories = [
  { id: 1, name: "Telefoni un aksesuāri", icon: "📱" },
  { id: 2, name: "Auto un moto", icon: "🚗" },
  { id: 3, name: "Datori un programmatūra", icon: "💻" },
  { id: 4, name: "Mēbeles un interjers", icon: "🛋️" },
  { id: 5, name: "Sporta preces", icon: "⚽" },
  { id: 6, name: "Darbs un bizness", icon: "💼" },
];

export default function IevietotSludinajumu() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Sludinājums pievienots kategorijai! (vēlāk saglabāsim DB)");
  };

  return (
    <>
      <Head>
        <title>Ievietot sludinājumu | TechVibe</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
              Ievietot jaunu sludinājumu
            </h1>

            {/* KATEGORIJU IZvēLE kā ss.com */}
            <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-dashed border-indigo-200">
              <label className="block text-lg font-semibold mb-4 text-gray-800">
                1. Izvēlies kategoriju
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="group">
                    <label className="flex items-center p-4 border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 rounded-xl cursor-pointer transition-all group-hover:shadow-md">
                      <span className="text-2xl mr-3">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                      <input type="radio" name="category" className="ml-auto w-5 h-5" required />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* FORMA */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Sludinājuma virsraksts
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Piem. iPhone 15 Pro Max, laba stāvoklī"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Apraksts
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                  placeholder="Detalizēts apraksts..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Cena (€)
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500"
                    placeholder="1500"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">
                    Tālrunis vai e-pasts
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500"
                    placeholder="+371 20xxxxx vai email@piemers.lv"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
              >
                🚀 Publicēt sludinājumu
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
