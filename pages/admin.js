export default function Admin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-8">
      <div className="bg-white/95 p-12 rounded-3xl shadow-2xl max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">🔧 Admin Panelis</h1>
        <div className="bg-blue-50 border-4 border-blue-200 p-12 rounded-3xl mb-8">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Supabase moderācija</h2>
          <ol className="text-left space-y-4 text-xl text-blue-800">
            <li>✅ app.supabase.com → Table Editor</li>
            <li>📱 Tabula <strong>sludinajumi</strong></li>
            <li>🔍 Meklē <code className="bg-blue-200 px-2 py-1 rounded">status = "gaida"</code></li>
            <li>✏️ Maini uz <code className="bg-green-200 px-2 py-1 rounded">publicēts</code></li>
            <li>💾 Save → LIVE!</li>
          </ol>
        </div>
        <Link href="/" className="bg-blue-600 text-white py-4 px-8 rounded-2xl font-bold text-xl hover:bg-blue-700 block">
          ← Sākumlapa
        </Link>
      </div>
    </div>
  );
}
