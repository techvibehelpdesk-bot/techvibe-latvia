import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

// Tavs Supabase URL un anon key (no dashboard)
const supabaseUrl = 'https://TAVS_SUPABASE_URL.supabase.co';  // MAINĪI!
const supabaseKey = 'TAVS_ANON_KEY';  // MAINĪI!
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Admin() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');

  // ADMIN PAROLE (maini uz savu!)
  const ADMIN_PASSWORD = 'techvibe2026';  

  const [loginError, setLoginError] = useState('');

  // LOGIN
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('admin_logged', 'true');
      setLoginError('');
      fetchSludinajumi();
    } else {
      setLoginError('Nepareiza parole');
    }
  };

  // IELĀDĒ GAIDA SLUDINĀJUMUS
  const fetchSludinajumi = async () => {
    const { data, error } = await supabase
      .from('sludinajumi')
      .select('*')
      .eq('status', 'gaida')
      .order('created_at', { ascending: false });

    if (data) setSludinajumi(data);
    setLoading(false);
  };

  // APSTIPRINĀT
  const approveSludinajums = async (id) => {
    const { error } = await supabase
      .from('sludinajumi')
      .update({ status: 'publicēts' })
      .eq('id', id);
    
    if (!error) {
      fetchSludinajumi();  // Refresh
      alert('✅ APSTIPRINĀTS!');
    }
  };

  // NORAIDĪT
  const rejectSludinajums = async (id) => {
    const { error } = await supabase
      .from('sludinajumi')
      .update({ status: 'noraidīts' })
      .eq('id', id);
    
    if (!error) {
      fetchSludinajumi();
      alert('❌ NORAIDĪTS!');
    }
  };

  // CHECK LOGIN
  useEffect(() => {
    if (localStorage.getItem('admin_logged') === 'true') {
      fetchSludinajumi();
    }
    setLoading(false);
  }, []);

  if (localStorage.getItem('admin_logged') !== 'true') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center">
        <div className="bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-2xl max-w-md w-full mx-4">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">🔐 Admin</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <input
              type="password"
              placeholder="Admin parole"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-6 border-2 border-gray-200 rounded-2xl text-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent"
              required
            />
            {loginError && (
              <p className="text-red-600 font-bold text-center">{loginError}</p>
            )}
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-8 rounded-2xl text-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all"
            >
              IEEJOT
            </button>
          </form>
          <p className="text-center text-gray-600 mt-6 text-sm">
            Parole: <span className="font-bold text-blue-600">techvibe2026</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 shadow-2xl">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-black">🔧 Admin Panelis</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => {
                localStorage.removeItem('admin_logged');
                window.location.reload();
              }}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold transition-all"
            >
              Iziet
            </button>
            <button onClick={fetchSludinajumi} className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold transition-all">
              🔄 Refresh
            </button>
          </div>
        </div>
        <p className="text-center opacity-90 mt-2">
          {sludinajumi.length} sludinājumi gaida apstiprināšanu
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-xl">Ielādē...</p>
          </div>
        ) : sludinajumi.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-2xl p-20">
            <div className="text-8xl mb-8">🎉</div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Nav jaunu sludinājumu!</h2>
            <p className="text-xl text-gray-600">Visi apstiprināti vai publicēti</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sludinajumi.map((sludinajums) => (
              <div key={sludinajums.id} className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all border-2 border-gray-100 hover:border-blue-300">
                <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-6 flex items-center justify-center text-6xl opacity-20">
                  📱
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {sludinajums.nosaukums}
                </h3>
                
                <div className="space-y-2 mb-6">
                  <p className="text-3xl font-black text-blue-600">{sludinajums.cena}€</p>
                  <p className="text-lg text-gray-600">{sludinajums.pilseta}</p>
                  <p className="text-sm text-gray-500">
                    {sludinajums.email} | {new Date(sludinajums.created_at).toLocaleString('lv-LV')}
                  </p>
                </div>

                <div className="flex gap-4 pt-6 border-t">
                  <button 
                    onClick={() => approveSludinajums(sludinajums.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                  >
                    ✅ APSTIPRINĀT
                  </button>
                  <button 
                    onClick={() => rejectSludinajums(sludinajums.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                  >
                    ❌ NORAIDĪT
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
