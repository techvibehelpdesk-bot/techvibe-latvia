import Link from 'next/link';

export default function Pakalpojumi() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header hero */}
      <section className="pt-24 pb-20 px-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Pakalpojumi</h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Profesionāli pakalpojumi visā Latvijā – ātri, uzticami, bez starpnieku
          </p>
          <Link href="/ievietot" className="inline-block bg-white text-blue-600 px-12 py-5 text-2xl font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all">
            ➕ Piedāvāt pakalpojumu
          </Link>
        </div>
      </section>

      {/* Populārākie pakalpojumi */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">Populārākie pakalpojumi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🔧', title: 'Auto remonts', desc: 'Dzinēji, bremzes, diagnostika', price: 'No €25/st', href: '/pakalpojums/auto-remonts', count: '1,247' },
              { icon: '💻', title: 'Datoru remonts', desc: 'Programmatūra, aparatūra, uzstādīšana', price: 'No €20/st', href: '/pakalpojums/datoru-remonts', count: '892' },
              { icon: '🏠', title: 'Mājas remonts', desc: 'Apdares darbi, santehnika, elektriķis', price: 'No €15/m²', href: '/pakalpojums/majas-remonts', count: '2,156' },
              { icon: '✂️', title: 'Matu griezums', desc: 'Vīriešu, sieviešu, bērnu frizūras', price: '€12-25', href: '/pakalpojums/matu-griezums', count: '3,450' },
              { icon: '📱', title: 'Telefona remonts', desc: 'Ekrāni, baterijas, programmatūra', price: 'No €18', href: '/pakalpojums/telefona-remonts', count: '2,890' },
              { icon: '🎨', title: 'Foto/video', desc: 'Kāzas, pasākumi, produkti', price: 'No €150', href: '/pakalpojums/foto-video', count: '678' }
            ].map((service, i) => (
              <Link key={i} href={service.href} className="group bg-white rounded-2xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all shadow-lg border hover:border-blue-200">
                <div className="text-5xl mb-6 group-hover:scale-110">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{service.desc}</p>
                <p className="text-3xl font-bold text-blue-600 mb-3">{service.price}</p>
                <p className="text-sm text-gray-500 mb-4">{service.count} sludinājumi</p>
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-bold group-hover:bg-blue-200">
                  Skatīt pakalpojumus →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cenas */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">Kā publicēt pakalpojumu?</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Izveido sludinājumu</h3>
              <p className="text-gray-600">Apraksti pakalpojumu, pievieno foto, norādi cenu</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Apstiprina</h3>
              <p className="text-gray-600">Mēs pārbaudām 24h laikā – bez maksas!</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Saņem klientus</h3>
              <p className="text-gray-600">Klienti zvana/raksta tieši tev – bez komisijas</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-12 rounded-3xl shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">BEZ MAKSAS uz mūžu!</h3>
            <p className="text-xl mb-8 opacity-90">Nav abonementa, nav komisijas, nav slēptu maksu</p>
            <Link href="/ievietot" className="inline-block bg-white text-blue-600 px-12 py-5 text-2xl font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all">
              Sākt tagad
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center bg-white border-t">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Uzreiz vari atrast klientus</h2>
          <p className="text-xl text-gray-600 mb-12">Pievienojies tūkstošiem pakalpojumu sniedzēju Latvijā</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/ievietot" className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all">
              ➕ Piedāvāt pakalpojumu
            </Link>
            <Link href="/sludinajumi?type=pakalpojumi" className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-2xl text-xl font-bold hover:bg-blue-600 hover:text-white transition-all">
              👀 Skatīt visus
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
