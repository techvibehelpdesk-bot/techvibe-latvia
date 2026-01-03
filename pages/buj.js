import Link from 'next/link';

export default function Buj() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="pt-24 pb-20 px-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">BUJ</h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Biežāk uzdotie jautājumi par sludinājumiem un cenām
          </p>
          <Link href="/ievietot" className="bg-white text-purple-600 px-12 py-5 text-2xl font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all inline-block">
            Publicēt sludinājumu
          </Link>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* 1. Bezmaksas */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              💸 Vai sludinājumi ir bezmaksas?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Jā! Pirmais sludinājums un neierobežots skaits ir pilnīgi bezmaksas. 
              Bezmaksas plānā sludinājumi paliek saraksta augšā 3 mēnešus.
            </p>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
              <p className="font-bold text-green-800">Premium €4.90/mēn → TOP 1. vieta 1 gads + tūlītēja publicēšana</p>
            </div>
          </div>

          {/* 2. Publicēšana */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              ⏱️ Cik ātri sludinājums parādās?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Bezmaksas: 24h moderācija (p-pn 9-18). Premium: tūlītēja publicēšana.
              Mēs pārbaudām tikai saturu un bildes – nekādu gaidošu rindu!
            </p>
            <Link href="/cenas" className="text-blue-600 font-bold hover:underline">Skatīt cenas →</Link>
          </div>

          {/* 3. Maksājumi */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              💳 Kā maksāt par Premium?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Stripe kartēm (Visa/Mastercard) vai PayPal. Automātiska atjaunošana.
              <br/>7 dienu naudas atgriešana garantija!
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="bg-blue-50 p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  <span className="font-bold text-blue-900">€4.90/mēn</span>
                </div>
                <p className="text-sm text-blue-800">Premium plāns</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="font-bold text-green-900">€0</span>
                </div>
                <p className="text-sm text-green-800">Bezmaksas plāns</p>
              </div>
            </div>
          </div>

          {/* 4. Kontakti */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              📞 Ar ko sazināties?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-4">
                  <strong>Email:</strong> techvibehelpdesk@gmail.com<br/>
                  <strong>Tālrunis:</strong> +371 28655228 (P-PN 9-18)
                </p>
                <p className="text-sm text-gray-500">Atbilde 24h laikā</p>
              </div>
              <div>
                <p className="text-lg text-gray-700 mb-4">
                  <strong>Adrese:</strong> Rīga, LV-1001<br/>
                  TechVibe SIA, Reģ.nr. 401234-56789
                </p>
              </div>
            </div>
          </div>

          {/* 5. Atcelšana */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              ❌ Kā atcelt Premium?
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Jebkurā brīdī savā profilā "Iestatījumi → Abonementi → Atcelt". 
              Plāns darbojas līdz perioda beigām.
            </p>
            <div className="bg-yellow-50 border-2 border-yellow-200 p-6 rounded-2xl">
              <p className="font-bold text-yellow-800 mb-2">💡 Padoms:</p>
              <p>Premium atpelnās ar 1 klientu – 95% lietotāju paliek!</p>
            </div>
          </div>

        </div>
      </section>

      <section className="py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Vēl jautājumi?</h2>
          <p className="text-xl mb-12 opacity-90">Publicē 1. sludinājumu un izmēģini pats!</p>
          <Link href="/ievietot" className="bg-white text-blue-600 px-16 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all inline-block">
            Sākt tagad – BEZ MAKSAS!
          </Link>
        </div>
      </section>
    </div>
  );
}
