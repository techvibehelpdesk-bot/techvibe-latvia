// pages/ievietot.js - SS.COM stila ar kategorijām + Supabase INSERT
import Head from "next/head";
import Link from "next/link";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const categories = [
  { id: 1, name: "Telefoni un aksesuāri", icon: "📱", value: "telefoni" },
  { id: 2, name: "Auto un moto", icon: "🚗", value: "auto" },
  { id: 3, name: "Datori un programmatūra", icon: "💻", value: "datori" },
  { id: 4, name: "Mēbeles un interjers", icon: "🛋️", value: "mebeles" },
  { id: 5, name: "Sporta preces", icon: "⚽", value: "sports" },
  { id: 6, name: "Darbs un bizness", icon: "💼", value: "darbs" },
];

export default function IevietotSludinajumu() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target);
    const data = {
      title: formData.get('virsraksts'),
      description: formData.get('apraksts'),
      price: parseFloat(formData.get('cena')) || 0,
      category: formData.get('category'),
      contact: formData.get('kontakts'),
      status: 'gaida'  // Admin apstiprina → 'publicēts'
    };

    try {
      const { error } = await supabase
        .from('sludinajumi')
        .insert([data]);
      
      if (error) throw error;
      alert('Sludinājums nosūtīts! Gaidi apstiprinājumu 24h.');
      e.target.reset();
    } catch (error) {
      alert('Kļūda: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ievietot sludinājumu | TechVibe</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-10">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* ATBALKA POGA AUGŠĀ */}
          <div className="mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm text-lg font-semibold text-gray-800 hover:text-purple-600 hover:border-purple-400 transition-all"
            >
              ← Atpakaļ uz sākuma lapu
            </Link>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-8">
              Ievietot jaunu sludinājumu
            </h1>

            {/* KATEGORIJU IZVĒLE */}
            <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-dashed border-indigo-200">
              <label className="block text-lg font-semibold mb-4 text-gray-800">
                1. Izvēlies kategoriju
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="group">
                    <label className="flex items-center p-4 border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 rounded-xl cursor-pointer transition-all group-hover:shadow-md">
                      <span className="text-2xl mr-3">{cat.icon}</span>
                      <span className="font-medium">{cat.name}</span>
                      <input 
                        type="radio" 
                        name="category" 
                        value={cat.value}
                        className="ml-auto w-5 h-5" 
                        required 
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* FORMA */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="virsraksts">
                  Sludinājuma virsraksts
                </label>
                <input
                  id="virsraksts"
                  name="virsraksts"
                  type="text"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Piem. iPhone 15 Pro Max, laba stāvoklī"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="apraksts">
                  Apraksts
                </label>
                <textarea
                  id="apraksts"
                  name="apraksts"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-vertical"
                  placeholder="Detalizēts apraksts..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="cena">
                    Cena (€)
                  </label>
                  <input
                    id="cena"
                    name="cena"
                    type="number"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500"
                    placeholder="1500"
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="kontakts">
                    Tālrunis vai e-pasts
                  </label>
                  <input
                    id="kontakts"
                    name="kontakts"
                    type="text"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500"
                    placeholder="+371 20xxxxx vai email@piemers.lv"
                    required
                  />
                </div>
              </div>

              {/* PUBLICĒT POGA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all"
              >
                {loading ? '🚀 Nosūta...' : '🚀 Publicēt sludinājumu'}
              </button>

              {/* ATBALKA POGA ZEM FORMAS */}
              <div className="pt-6 border-t border-gray-200">
                <Link 
                  href="/" 
                  className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm text-lg font-semibold text-gray-700 hover:text-purple-600 hover:border-purple-400 transition-all"
                >
                  ← Atpakaļ uz sākuma lapu
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
