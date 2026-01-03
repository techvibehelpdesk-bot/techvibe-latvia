import Link from 'next/link';

export default function Pakalpojumi() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="pt-24 pb-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Pakalpojumi</h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Publicē BEZ MAKSAS – TOP pozīcijas €4.90/mēn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ievietot" className="bg-white text-blue-600 px-12 py-5 text-2xl font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              ➕ Piedāvāt pakalpojumu
            </Link>
            <Link href="/cenas" className="border-2 border-white text-white px-12 py-5 text-xl font-bold rounded-2xl hover:bg-white hover:text-blue-600 transition-all">
              Cenas & plāni
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Populārākie pakalpojumi Latvijā</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🔧', title: 'Auto remonts', desc: 'Dzinēji, bremzes, diagnostika Rīgā & reģionos', price: '€20-50/st', count: '1,247', href: '/kategorija/pakalpojumi/auto-remonts' },
              { icon: '💻', title: 'Datoru remonts', desc: 'Windows uzstādīšana, vīrusi, aparatūra', price: '€15-35', count: '892', href: '/kategorija/pakalpojumi/datoru-remonts' },
              { icon: '🏠', title: 'Mājas remonts', desc: 'Santehnika, elektriķis, apdares darbi', price: '€12/m²', count: '2,156', href: '/kategorija/pakalpojumi/majas-remonts' },
              { icon: '✂️', title: 'Friziers/hārsta', desc: 'Matu griezums, krāsošana, manikīrs', price: '€10-25', count: '3,450', href: '/kategorija/pakalpojumi/frizieris' },
              { icon: '📱', title: 'Telefona remonts', desc: 'Ekrāni, baterijas, iPhone/Samsung', price: '€15-40', count: '2,890', href: '/kategorija/pakalpojumi/telefona-remonts' },
              { icon: '🎨', title: 'Foto & video', desc: 'Kāzu filmēšana, produkti, drons', price: '€100-500', count: '678', href: '/kategorija/pakalpojumi/foto-video' }
            ].map((service, i) => (
              <Link key={i} href={service.href} className="group bg-white rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all shadow-lg border hover:border-blue-200">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{service.desc}</p>
                <p className="text-3xl font-bold text-blue-600 mb-3">{service.price}</p>
                <p className="text-sm text-gray-500 mb-6">{service.count} sludinājumi</p>
                <div className="flex gap-2">
                  <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold group-hover:bg-blue-200 transition-all">
                    Skatīt →
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold">
                    BEZ MAKSAS starts
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Plānu teaser */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Kā pelnīt vairāk?</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">1</div>
              <h3 className="text-xl font-bold mb-3">Bezmaksas plāns</h3>
              <p className="text-gray-600 mb-4">Neierobežoti sludinājumi, 24h moderācija</p>
              <span className="bg-green-100 text-green-800 px-6 py-2 rounded-full font-bold text-lg">€0</span>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-2xl text-white shadow-2xl relative -mt-4 md:mt-0">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white text-blue-600 px-6 py-2 rounded-2xl font-bold shadow-lg">
                IEMES
              </div>
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">★</div>
              <h3 className="text-xl font-bold mb-3">Premium</h3>
              <p className="opacity-90 mb-4">TOP pozīcijas, tūlītēja publicēšana</p>
              <span className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold text-xl block mx-auto w-fit">
                €4.90/mēn
              </span>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">∞</div>
              <h3 className="text-xl font-bold mb-3">Bizness</h3>
              <p className="text-gray-600 mb-4">Uzņēmumiem – API, analītika, prioritāte</p>
              <span className="bg-gray-100 text-gray-800 px-6 py-2 rounded-full font-bold text-lg">€29/mēn</span>
            </div>
          </div>
          <Link href="/cenas" className="bg-blue-600 text-white px-12 py-5 text-2xl font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all inline-block">
            Skatīt visas cenas
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Pievienojies 5000+ pakalpojumu sniedzējiem</h2>
          <p className="text-xl text-gray-600 mb-12">Rīga, Liepāja, Daugavpils, Jelgava – visā Latvijā</p>
          <Link href="/ievietot" className="bg-blue-600 text-white px-16 py-6 text-2xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all inline-block">
            Publicēt tagad – BEZ MAKSAS!
          </Link>
        </div>
      </section>
    </div>
  );
}
