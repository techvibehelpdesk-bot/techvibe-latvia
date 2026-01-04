import Link from 'next/link';

export default function Admin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-8">
      <div className="bg-white/95 backdrop-blur-xl p-16 rounded-3xl shadow-3xl max-w-4xl w-full text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-12 drop-shadow-2xl">🔐 TechVibe Admin</h1>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* SUPABASE MODERĀCIJA */}
          <div className="bg-blue-50 border-4 border-blue-200 p-12 rounded-3xl">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">📱 Supabase Moderācija</h2>
            <ol className="space-y-6 text-xl text-blue-800">
              <li className="flex items-start">
                <span className="w-10 h-10 bg-blue-500 text-white rounded-2xl flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">1</span>
                <strong>app.supabase.com</strong> → Table Editor
              </li>
              <li className="flex items-start">
                <span className="w-10 h-10 bg-blue-500 text-white rounded-2xl flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">2</span>
                Tabula <code className="bg-blue-200 px-4 py-2 rounded-xl font-mono text-lg">sludinajumi</code>
              </li>
              <li className="flex items-start">
                <span className="w-10 h-10 bg-blue-500 text-white rounded-2xl flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">3</span>
                Filtrs: <code className="bg-yellow-200 px-4 py-2 rounded-xl font-mono text-lg">status = "gaida"</code>
              </li>
              <li className="flex items-start">
                <span className="w-10 h-10 bg-green-500 text-white rounded-2xl flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">4</span>
                Maini uz <code className="bg-green-200 px-4 py-2 rounded-xl font-mono text-lg">publicēts</code>
              </li>
              <li className="flex items-start">
                <span className="w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-bold mr-4 flex-shrink-0 mt-1">5</span>
                <strong>Save → LIVE uz sākumlapas!</strong>
              </li>
            </ol>
          </div>

          {/* STATUS APRaksts */}
          <div className="bg-emerald-50 border-4 border-emerald-200 p-12 rounded-3xl">
            <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">✅ TechVibe Status</h2>
            <ul className="space-y-4 text-xl text-emerald-800 text-left">
              <li>✅ Demo ar fake sludinājumiem</li>
              <li>✅ Supabase gatavs</li>
              <li>✅ Kategorijas + cenas</li>
              <li>✅ Footer + visas lapas</li>
              <li>🚀 Rīt: npm Supabase + Stripe + Vercel LIVE!</li>
            </ul>
          </div>
        </div>

        <Link href="/" className="bg-blue-600 text-white py-6 px-12 rounded-3xl font-black text-2xl shadow-3xl hover:shadow-4xl hover:-translate-y-2 transition-all duration-300 inline-flex items-center">
          ← Atpakaļ Sākumlapā
        </Link>
      </div>
    </div>
  );
}
