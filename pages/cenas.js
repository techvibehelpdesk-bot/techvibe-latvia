import Link from 'next/link';

export default function Cenas() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="pt-24 pb-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Cenas – 60% LĒTĀK!</h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Ss.lv analogas funkcijas, BET zemākas cenas + ātrāka publicēšana
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/ievietot" className="bg-white text-blue-600 px-12 py-5 text-2xl font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              Sākt BEZ MAKSAS
            </Link>
            <Link href="/register-premium" className="bg-white text-gray-800 px-12 py-5 text-xl font-bold rounded-2xl border-2 border-white hover:shadow-2xl hover:-translate-y-1 transition-all">
              Premium €4.90/mēn
            </Link>
          </div>
          <p className="text-2xl font-bold opacity-90">ROI: Atpelnās ar 1 klientu!</p>
        </div>
      </section>

      {/* Plānu tabula */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">Mūsu plāni vs Ss.lv</h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Vienkārši, izdevīgi, caurspīdīgi – bez slēptu maksu
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-3xl shadow-2xl">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
                  <th className="p-6 text-left text-xl font-bold">Funkcija</th>
                  <th className="p-6 text-center text-xl font-bold">Bezmaksas</th>
                  <th className="p-6 text-center text-xl font-bold bg-blue-100 text-blue-700 border-l-4 border-blue-500">Premium <br><span className="text-2xl">€4.90/mēn</span></th>
                  <th className="p-6 text-center text-xl font-bold">Ss.lv analogs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-6 font-bold text-lg">Sludinājumu skaits</td>
                  <td className="p-6 text-center text-emerald-600 font-bold">Neierobežots</td>
                  <td className="p-6 text-center text-emerald-600 font-bold">Neierobežots</td>
                  <td className="p-6 text-center text-red-500">€2.25+ par katru</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-6 font-bold text-lg">Foto uz sludinājumu</td>
                  <td className="p-6 text-center">5</td>
                  <td className="p-6 text-center text-emerald-600 font-bold">Neierobežots</td>
                  <td className="p-6 text-center">3-5</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold text-lg">Publicēšanas ātrums</td>
                  <td className="p-6 text-center text-yellow-600">24h</td>
                  <td className="p-6 text-center text-emerald-600 font-bold">Tūlītēja</td>
                  <td className="p-6 text-center text-red-500">24-48h</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-6 font-bold text-lg">Pozīcija sarakstā</td>
                  <td className="p-6 text-center">3 mēn.</td>
                  <td className="p-6 text-center text-emerald-600 font-bold">TOP 1 gads</td>
                  <td className="p-6 text-center text-red-500">€5.32+ TOP</td>
                </tr>
                <tr>
                  <td className="p-6 font-bold text-lg">Statistika</td>
                  <td className="p-6 text-center">❌</td>
                  <td className="p-6 text-center text-emerald-600 font-bold">✓ Skatījumi, zvanī</td>
                  <td className="p-6 text-center">❌</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-6 font-bold text-lg">ROI piemērs (20 klienti × €50)</td>
                  <td className="p-6 text-center text-emerald-600 font-bold">€1000/mēn</td>
                  <td className="p-6 text-center text-emerald-600 font-bold">€995/mēn</td>
                  <td className="p-6 text-center text-red-500">€950+/mēn</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">60% LĒTĀK nekā ss.lv!</h2>
          <p className="text-xl text-gray-600 mb-12">Tas pats efekts, zemākas cenas, ātrāka publicēšana</p>
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
