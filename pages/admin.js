export default function Admin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-8">
      <div className="bg-white/95 backdrop-blur-xl p-16 rounded-3xl shadow-3xl max-w-2xl w-full text-center">
        <h1 className="text-5xl font-black text-gray-900 mb-12 drop-shadow-2xl">🔐 Admin Panelis</h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="bg-blue-50 border-4 border-blue-200 p-12 rounded-3xl">
            <h3 className="text-3xl font-bold text-blue-900 mb-8">📱 Supabase</h3>
            <ol className="space-y-6 text-2xl text-blue-800 text-left">
              <li className="flex items-center">
                <span className="w-10 h-10 bg-blue-500 text-white rounded-2xl flex items-center justify-center font-bold mr-4 text-xl">1</span>
                app.supabase.com
              </li>
              <li className="flex items-center">
                <span className="w-10 h-10 bg-blue-500 text-white rounded-2xl flex items-center justify-center font-bold mr-4 text-xl">2</span>
                Table Editor → sludinajumi
              </li>
              <li className="flex items-center">
                <span className="w-10 h-10 bg-yellow-500 text-white rounded-2xl flex items-center justify-center font-bold mr-4 text-xl">3</span>
                status <code className="bg-yellow-200 px-4 py-2 rounded-xl ml-2">gaida</code>
              </li>
              <li className="flex items-center">
                <span className="w-10 h-10 bg-green-500 text-white rounded-2xl flex items-center justify-center font-bold mr-4 text-xl">4</span>
                → <code className="bg-green-200 px-4 py-2 rounded-xl ml-2">publicēts</code>
              </li>
              <li className="flex items-center">
                <span className="w-10 h-10 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-bold mr-4 text-xl">5</span>
                Save → SĀKUMLAPA LIVE!
              </li>
            </ol>
          </div>
          
          <div className="bg-emerald-50 border-4 border-emerald-200 p-12 rounded-3xl">
            <h3 className="text-3xl font-bold text-emerald-900 mb-8">✅ Statusi</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-yellow-100 rounded-2xl border-4 border-yellow-300">
                <span className="text-2xl">⏳ gaida</span>
                <span className="text-xl font-bold text-yellow-800">TU apstiprini</span>
              </div>
              <div className="flex items-center justify-between p-6 bg-green-100 rounded-2xl border-4 border-green-300">
                <span className="text-2xl">✅ publicēts</span>
                <span className="text-xl font-bold text-green-800">rāda sākumlapā</span>
              </div>
              <div className="flex items-center justify-between p-6 bg-red-100 rounded-2xl border-4 border-red-300">
                <span className="text-2xl">❌ noraidīts</span>
                <span className="text-xl font-bold text-red-800">arhivē/ dzēš</span>
              </div>
            </div>
          </div>
        </div>

        <Link href="/" className="bg-blue-600 text-white py-8 px-16 rounded-3xl font-black text-3xl shadow-3xl hover:shadow-4xl hover:-translate-y-2 transition-all inline-flex items-center">
          ← Sākumlapa
        </Link>
      </div>
    </div>
  );
}
