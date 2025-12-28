// pages/[kategorija].js - DINAMISKĀS KATEGORIJU LAPAS visām kategorijām
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function Kategorija() {
  const router = useRouter();
  const { kategorija } = router.query;

  // Visu kategoriju dati
  const kategorijuDati = {
    telefoni: {
      nosaukums: "Telefoni un aksesuāri",
      skaits: "1 234",
      sludinajumi: [
        { id: 1, virsraksts: "iPhone 15 Pro Max 256GB", cena: "950€", datums: "Šodien", zīmols: "Apple" },
        { id: 2, virsraksts: "Samsung Galaxy S24 Ultra", cena: "1 150€", datums: "Vakardien", zīmols: "Samsung" },
        { id: 3, virsraksts: "iPhone 14 Pro 128GB", cena: "720€", datums: "2 dienas", zīmols: "Apple" },
        { id: 4, virsraksts: "Google Pixel 9 Pro", cena: "850€", datums: "3 dienas", zīmols: "Google" },
        { id: 5, virsraksts: "Xiaomi 14 Pro", cena: "680€", datums: "4 dienas", zīmols: "Xiaomi" },
      ],
      zīmoli: ["Apple", "Samsung", "Google", "Xiaomi", "Huawei"],
    },
    auto: {
      nosaukums: "Auto un moto",
      skaits: "2 567",
      sludinajumi: [
        { id: 1, virsraksts: "Volkswagen Golf 2019 1.5 TSI", cena: "12 500€", datums: "Šodien", zīmols: "VW" },
        { id: 2, virsraksts: "BMW 3 sērija 320d 2020", cena: "28 900€", datums: "Vakardien", zīmols: "BMW" },
        { id: 3, virsraksts: "Toyota Corolla Hybrid 2021", cena: "18 200€", datums: "2 dienas", zīmols: "Toyota" },
      ],
      zīmoli: ["VW", "BMW", "Toyota", "Audi", "Mercedes"],
    },
    datori: {
      nosaukums: "Datori un programmatūra",
      skaits: "890",
      sludinajumi: [
        { id: 1, virsraksts: "MacBook Pro M3 Max 36GB RAM", cena: "3 200€", datums: "Šodien", zīmols: "Apple" },
        { id: 2, virsraksts: "Gaming PC RTX 4090 i9-14900K", cena: "2 800€", datums: "Vakardien", zīmols: "Custom" },
        { id: 3, virsraksts: "Dell XPS 15 2024", cena: "1 900€", datums: "3 dienas", zīmols: "Dell" },
      ],
      zīmoli: ["Apple", "Dell", "HP", "Lenovo", "Asus"],
    },
  };

  const kategorijaData = kategorijuDati[router.query?.kategorija] || kategorijuDati.telefoni;

  return (
    <>
      <Head>
        <title>{kategorijaData.nosaukums} | TechVibe</title>
      </Head>

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* SĀKUMS POGA */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm text-lg font-semibold text-gray-800 hover:text-purple-600 hover:border-purple-400 transition-all"
            >
              ← Atpakaļ uz sākuma lapu
            </Link>
          </div>

          {/* FILTŖI + SLUDINĀJUMI */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* FILTŖU PANELIS */}
            <div className="lg:col-span-1 bg-white shadow-xl rounded-2xl p-6 sticky top-8 h-fit">
              <h2 className="text-xl font-bold mb-6 text-gray-900">Filtri</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Cena (€)</label>
                  <div className="flex space-x-2">
                    <input type="number" className="flex-1 border rounded-lg px-3 py-2" placeholder="Min" />
                    <span>-</span>
                    <input type="number" className="flex-1 border rounded-lg px-3 py-2" placeholder="Max" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Zīmols</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {kategorijaData.zīmoli.map((zīmols) => (
                      <label key={zīmols} className="flex items-center p-2 hover:bg-gray-50 rounded">
                        <input type="checkbox" className="mr-3 w-4 h-4" />
                        <span className="text-sm">{zīmols}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all">
                  Meklēt
                </button>
              </div>
            </div>

            {/* SLUDINĀJUMI */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{kategorijaData.nosaukums}</h1>
                  <p className="text-gray-600">{kategorijaData.skaits} sludinājumi</p>
                </div>
                <Link 
                  href="/ievietot"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg"
                >
                  + Ievietot sludinājumu
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kategorijaData.sludinajumi.map((slud) => (
                  <Link href={`/sludinajums/${slud.id}`} key={slud.id} className="group">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-purple-400 transition-all overflow-hidden">
                      <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <span className="text-5xl">📱</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-600">{slud.virsraksts}</h3>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-gray-500">{slud.datums}</span>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-medium">
                          {kategorijaData.nosaukums.split(" ")[0]}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600 mb-4">{slud.cena}</div>
                      <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-all">
                        Sazināties
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
