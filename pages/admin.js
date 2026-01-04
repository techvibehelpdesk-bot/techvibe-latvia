import Link from 'next/link';  // ✅ PIEVIENO
import { useState, useEffect } from 'react';

export default function Admin() {
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const ADMIN_PASSWORD = 'techvibe2026';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_logged', 'true');
      setLoginError('');
      window.location.reload();
    } else {
      setLoginError('Nepareiza parole');
    }
  };

  if (localStorage.getItem('admin_logged') !== 'true') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-8">
        <div className="bg-white/95 backdrop-blur-xl p-12 rounded-3xl shadow-2xl max-w-md w-full">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">🔐 Admin</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              placeholder="Admin parole"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-6 border-2 border-gray-300 rounded-2xl text-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent"
              required
            />
            {loginError && <p className="text-red-600 font-bold">{loginError}</p>}
            <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all">
              IEEJOT
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-600">
            Demo: <span className="font-bold text-blue-600">techvibe2026</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 shadow-2xl">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-black">🔧 Admin Panelis</h1>
          <div className="flex gap-4">
            <Link href="/" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold transition-all">
              🏠 Sākums
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem('admin_logged');
                window.location.reload();
              }}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold transition-all"
            >
              Iziet
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white shadow-2xl rounded-3xl p-12 text-center">
          <div className="text-8xl mb-8">🎉</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Nav jaunu sludinājumu!</h2>
          <p className="text-2xl text-gray-600 mb-12">
            Moderē Supabase dashboard:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-blue-50 border-4 border-blue-200 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">📱 Supabase</h3>
              <ol className="text-left space-y-3 text-xl text-blue-800">
                <li>1. app.supabase.com</li>
                <li>2. Table Editor → sludinajumi</li>
                <li>3. status "gaida" → "publicēts"</li>
                <li>4. Save → LIVE!</li>
              </ol>
            </div>
            <div className="bg-green-50 border-4 border-green-200 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-green-900 mb-4">✅ Statusi</h3>
              <div className="space-y-3 text-lg">
                <div className="flex items-center bg-gray-100 p-4 rounded-xl">
                  <span className="w-4 h-4 bg-yellow-500 rounded-full mr-4"></span>
                  <span>gaida – TU apstiprini</span>
                </div>
                <div className="flex items-center bg-gray-100 p-4 rounded-xl">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-4"></span>
                  <span>publicēts – rāda sākumlapā</span>
                </div>
                <div className="flex items-center bg-gray-100 p-4 rounded-xl">
                  <span className="w-4 h-4 bg-red-500 rounded-full mr-4"></span>
                  <span>noraidīts – dzēš</span>
                </div>
              </div>
            </div>
          </div>

          <Link href="/" className="bg-blue-600 text-white py-6 px-12 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all inline-block">
            ← Sākumlapa
          </Link>
        </div>
      </div>
    </div>
  );
}
