import Link from 'next/link';
import { useState, useEffect } from 'react';  // ✅ PIEVIENO

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
            {loginError && <p className="text-red-600 font-bold text-center p-4 bg-red-50 rounded-xl">{loginError}</p>}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all"
            >
              IEEJOT
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-600">
            Demo parole: <span className="font-bold text-blue-600">techvibe2026</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 shadow-2xl">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl font-black">🔧 Admin Panelis</h1>
          <div className="flex gap-4 flex-wrap">
            <Link href="/" className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold text-white transition-all">
              🏠 Sākums
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem('admin_logged');
                window.location.reload();
              }}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold text-white transition-all"
            >
              Iziet
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white shadow-2xl rounded-3xl p-12 text-center">
          <div className="text-8xl mb-8 animate-bounce">🎉</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Nav jaunu sludinājumu!</h2>
          <p className="text-2xl text-gray-600 mb-12">
            Moderē Supabase dashboard:
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-blue-50 border-4 border-blue-200 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">📱 Supabase soļi</h3>
              <ol className="text-left space-y-3 text-xl text-blue-800">
                <li>1. app.supabase.com → Table Editor</li>
                <li>2. Tabula <code>sludinajumi</code></li>
                <li>3. Meklē <code className="bg-yellow-200 px-2 py-1 rounded">status = "gaida"</code></li>
                <li>4. Maini uz <code className="bg-green-200 px-2 py-1 rounded">publicēts</code></li>
                <li>5. Save → Sākumlapa atjaunojas!</li>
              </ol>
            </div>
            <div className="bg-emerald-50 border-4 border-emerald-200 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6">✅ Status nozīmes</h3>
              <div className="space-y-4 text-lg">
                <div className="flex items-center bg-yellow-100 p-4 rounded-xl border-l-4 border-yellow-400">
                  <span className="w-6 h-6 bg-yellow-500 rounded-full mr-4 flex-shrink-0"></span>
                  <span><strong>gaida</strong> – TU apstiprini</span>
                </div>
                <div className="flex items-center bg-green-100 p-4 rounded-xl border-l-4 border-green-400">
                  <span className="w-6 h-6 bg-green-500 rounded-full mr-4 flex-shrink-0"></span>
                  <span><strong>publicēts</strong> – rāda sākumlapā</span>
                </div>
                <div className="flex items-center bg-red-100 p-4 rounded-xl border-l-4 border-red-400">
                  <span className="w-6 h-6 bg-red-500 rounded-full mr-4 flex-shrink-0"></span>
                  <span><strong>noraidīts</strong> – arhivē</span>
                </div>
              </div>
            </div>
          </div>

          <Link href="/" className="bg-blue-600 text-white py-6 px-12 rounded-3xl font-bold text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all inline-block">
            ← Atpakaļ sākumlapā
          </Link>
        </div>
      </div>
    </div>
  );
}
