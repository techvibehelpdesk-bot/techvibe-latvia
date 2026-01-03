import Link from 'next/link';

export default function Cenas() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="pt-24 pb-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Cenas – 60% LĒTĀK!</h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90">Labākas funkcijas par zemākām cenām nekā tirgus līderis</p>
          <Link href="/ievietot" className="bg-white text-blue-600 px-12 py-5 text-2xl font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all inline-block">
            Sākt BEZ MAKSAS
          </Link>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-20">Mūsu plāni vs Tirgus vidējais</h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Vienkārši, izdevīgi, caurspīdīgi – bez slēptu maksu
          </p>
          
          <div className="overflow-x-auto bg-white rounded-3xl shadow-2xl">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                  <th className="p-6 text-left text-xl font-bold">Funkcija</th>
                  <th className="p-6 text-center text-xl font-bold">Bezmaksas</th>
                  <th className="p-6 text-center text-xl font-bold bg-blue-100 text-blue-700">Premium €4.90/mēn</th>
                  <th className="p-6 text-center text-xl font-bold">Tirgus vidējais</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-6 font-bold">Sludinājumu skaits</td>
                  <td className="p-6 text-center font-bold text-green-600">Neierobežots</td>
                  <td className="p-6 text-center font-bold text-green-600">Neierobežots</td>
                  <td className="p-6 text-center text-red-500">€2-5 katrs</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-6 font-bold">Foto</td>
                  <td className="p-6 text-center">5</td>
                  <td className="p-6 text-center font-bold text-green-600">Neierobežots</td>
                  <td className="p-6 text-center">3-5</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold">Publicēšana</td>
                  <td className="p-6 text-center text-yellow-600">24h</td>
                  <td className="p-6 text-center font-bold text-green-600">Tūlītēja</td>
                  <td className="p-6 text-center text-red-500">24-48h</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-6 font-bold">TOP pozīcija</td>
                  <td className="p-6 text-center">3 mēn.</td>
                  <td className="p-6 text-center font-bold text-green-600">TOP 1 gads</td>
                  <td className="p-6 text-center text-red-500">€5+</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold">ROI (20 klienti × €50)</td>
                  <td className="p-6 text-center font-bold text-green-600">€1000/mēn</td>
                  <td className="p-6 text-center font-bold text-green-600">€995/mēn</td>
                  <td className="p-6 text-center text-red-500">€900+/mēn</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 text-center bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Sāc pelnīt 60% LĒTĀK!</h2>
          <p className="text-xl text-gray-600 mb-12">Neierobežoti sludinājumi + TOP pozīcijas</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ievietot" className="bg-blue-600 text-white px-12 py-5 text-2xl font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all inline-block">
              1. sludinājums BEZ MAKSAS
            </Link>
            <Link href="/register-premium" className="border-4 border-blue-600 text-blue-600 px-12 py-5 text-xl font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all inline-block">
              Premium €4.90/mēn
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
