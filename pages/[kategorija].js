// pages/[kategorija].js - SALABOTĀS CENA + STĀVOKĻA FILTŖI
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

export default function Kategorija() {
  const router = useRouter();
  const { kategorija } = router.query;

  const kategorijuDati = {
    telefoni: {
      nosaukums: "Telefoni un aksesuāri",
      skaits: "1 234",
      sludinajumi: [
        { id: 1, virsraksts: "iPhone 15 Pro Max 256GB", cena: "950€", datums: "Šodien", zīmols: "Apple" },
        { id: 2, virsraksts: "Samsung Galaxy S24 Ultra", cena: "1 150€", datums: "Vakardien", zīmols: "Samsung" },
        { id: 3, virsraksts: "iPhone 14 Pro 128GB", cena: "720€", datums: "2 dienas", zīmols: "Apple" },
        { id: 4, virsraksts: "Google Pixel 9 Pro", cena: "850€", datums: "3 dienas", zīmols: "Google" },
        { id: 5, virsraksts: "Xiaomi 14 Pro 512GB", cena: "680€", datums: "4 dienas", zīmols: "Xiaomi" },
      ],
      zīmoli: ["Apple", "Samsung", "Google", "Xiaomi", "Huawei", "OnePlus", "Sony", "Nokia", "Motorola"],
      stavoklis: ["Jauns", "Lietots", "Detalās", "Cits", "Īrē/Iznomā", "Atdot par brīvu"],
    },
    auto: {
      nosaukums: "Auto un moto",
      skaits: "2 567",
      sludinajumi: [
        { id: 1, virsraksts: "VW Golf 2019 1.5 TSI", cena: "12 500€", datums: "Šodien", zīmols: "VW" },
        { id: 2, virsraksts: "BMW 3 sērija 320d", cena: "28 900€", datums: "Vakardien", zīmols: "BMW" },
        { id: 3, virsraksts: "Toyota Corolla Hybrid", cena: "18 200€", datums: "2 dienas", zīmols: "Toyota" },
        { id: 4, virsraksts: "Audi A4 2.0 TFSI", cena: "22 000€", datums: "3 dienas", zīmols: "Audi" },
      ],
      zīmoli: ["VW", "BMW", "Audi", "Mercedes", "Toyota", "Skoda", "Volvo", "Hyundai", "Kia", "Ford", "Opel", "Peugeot"],
      stavoklis: ["Jauns", "Lietots", "Detalās", "Cits", "Īrē/Iznomā", "Atdot par brīvu"],
    },
    datori: {
      nosaukums: "Datori un programmatūra",
      skaits: "890",
      sludinajumi: [
        { id: 1, virsraksts: "MacBook Pro M3 Max", cena: "3 200€", datums: "Šodien", zīmols: "Apple" },
        { id: 2, virsraksts: "Gaming PC RTX 4090", cena: "2 800€", datums: "Vakardien", zīmols: "Custom" },
        { id: 3, virsraksts: "Dell XPS 15 2024", cena: "1 900€", datums: "3 dienas", zīmols: "Dell" },
        { id: 4, virsraksts: "Lenovo Legion 5", cena: "1 450€", datums: "4 dienas", zīmols: "Lenovo" },
      ],
      zīmoli: ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer", "MSI", "Custom", "Alienware"],
      stavoklis: ["Jauns", "Lietots", "Detalās", "Cits", "Īrē/Iznomā", "Atdot par brīvu"],
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
            <Link href="/" className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm text-lg font-semibold text-gray-800 hover:text-purple-600 hover:border-purple-400 transition-all">
              ← Atpakaļ uz sākuma lapu
            </Link>
          </div>

          {/* SALABOTI FILTŖI + SLUDINĀJUMI */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* FILTŖU PANELIS - SALABOTA CENA */}
            <div className="lg:col-span-1 bg-white shadow-xl rounded-2xl p-6 sticky top-8 h-fit">
              <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-4">Filtri</h2>
              
              <div className="space-y-6">
                {/* SALABOTA CENA - VISPĀR PLAŠĀKA */}
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-3 text-gray-700">Cena (€)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input 
                        type="number" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" 
                        placeholder="Min" 
                      />
                    </div>
                    <div>
                      <input 
                        type="number" 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" 
                        placeholder="Max" 
                      />
                    </div>
                  </div>
                </div>

                {/* PAPLAŠINĀTS STĀVOKLIS */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">Stāvoklis</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {kategorijaData.stavoklis.map((stav) => (
                      <label key={stav} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input type="checkbox" className="mr-3 w-4 h-4 rounded" />
                        <span className="text-sm">{stav}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ZĪMOLS */}
                <div>
                  <label className="block text-sm font-semibold mb-3 text-gray-700">Zīmols</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {kategorijaData.zīmoli.map((zīmols) => (
                      <label key={zīmols} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input type="checkbox" className="mr-3 w-4 h-4 rounded" />
                        <span className="text-sm">{zīmols}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-sm">
                  🔍 Meklēt
                </button>
              </div>
            </div>

            {/* SLUDINĀJUMI */}
            <div className="lg:col-span-4">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{kategorijaData.nosaukums}</h1>
                  <p className="text-gray-600 text-lg mt-1">{kategorijaData.skaits} sludinājumi</p>
                </div>
                <Link href="/ievietot" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-lg">
                  + Ievietot sludinājumu
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {kategorijaData.sludinajumi.map((slud) => (
                  <Link href={`/sludinajums/${slud.id}`} key={slud.id} className="group">
                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-2xl hover:border-purple-400 transition-all overflow-hidden h-full">
                      <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <span className="text-5xl">📱</span>
                      </div>
                      <h3 className="font-bold text-lg mb-3 line-clamp-2 group-hover:text-purple-600">{slud.virsraksts}</h3>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500">{slud.datums}</span>
                        <span className="text-xs bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                          {kategorijaData.nosaukums.split(" ")[0]}
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600 mb-6">{slud.cena}</div>
                      <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all text-sm">
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
