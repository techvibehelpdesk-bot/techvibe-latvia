'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export default function AutoPage() {
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // MODAL STATE - 100% kā tev
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentSludinajumsId, setCurrentSludinajumsId] = useState('')
  const [currentSludinajumsTitle, setCurrentSludinajumsTitle] = useState('')
  const [messageType, setMessageType] = useState('comment')
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    fetchData()
  }, []) // KĀ TEV - bez search dependency!

  // TAVA STRĀDĀJOŠĀ METODE + AUTO FIX
  async function fetchData() {
    try {
      setLoading(true)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      console.log('🔍 Auto fetch start...', supabaseUrl ? 'URL OK' : 'NO URL!')

      const response = await fetch(`${supabaseUrl}/rest/v1/sludinajumi?select=*`, { // select=* kā tev!
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      })

      if (!response.ok) throw new Error('Fetch kļūda: ' + response.status)
      const data = await response.json()
      
      console.log('📊 RAW data:', data.length, 'ieraksti')
      
      // AUTO FILTER - paplašināts (kā berniem, bet 'auto')
      let filtered = data.filter(s => 
        (s.category?.toLowerCase().includes('auto') || 
         s.category?.toLowerCase() === 'auto' ||
         s.title?.toLowerCase().includes('auto')) && 
        s.status === 'published' // Obligāti!
      )
      
      if (search) {
        filtered = filtered.filter(s => 
          s.title?.toLowerCase().includes(search.toLowerCase()) ||
          s.description?.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      setSludinajumi(filtered)
      console.log('🚗 AUTO DEBUG:', filtered.length, 'auto atrasti', filtered[0])
    } catch (err) {
      console.error('❌ AUTO Error:', err)
      setSludinajumi([])
    } finally {
      setLoading(false)
    }
  }

  // TAVAS MODAL FUNCIJAS - 100%
  const openChat = (id, title) => {
    setCurrentSludinajumsId(id)
    setCurrentSludinajumsTitle(title)
    setIsChatOpen(true)
  }

  const sendMessage = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase
      .from('comments') // Kā tev!
      .insert({
        sludinajums_id: currentSludinajumsId,
        type: messageType,
        comment: messageText,
        user_email: 'client@test.lv'
      })

    if (!error) {
      setMessageText('')
      setIsChatOpen(false)
      alert(`✅ Ziņa par "${currentSludinajumsTitle}" nosūtīta!`)
    } else {
      alert('❌ Kļūda: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-4xl text-gray-500 animate-pulse flex items-center gap-4">
          🚗 Ielādē auto sludinājumus...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900">
      {/* NAVBAR - KĀ TEV */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/50 px-6 py-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-8">
            <Link href="/kategorijas" className="text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors">← Atpakaļ</Link>
            <Link href="/auto" className="text-lg font-medium text-gray-700 hover:text-black">Auto galvenā</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/iegūt-visus" className="text-sm font-medium text-blue-600 hover:text-blue-500">Visi sludinājumi</Link>
            <button className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 hover:bg-blue-200 transition-all shadow-md">
              👤
            </button>
          </div>
        </div>
      </nav>

      {/* HEADER - AUTO TĒMA */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-16 bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
          <div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-blue-900 bg-clip-text text-transparent mb-4">
              🚙 Auto sludinājumi
            </h1>
            <p className="text-2xl text-gray-600 font-semibold">{sludinajumi.length} atrasti</p>
          </div>
          <div className="text-6xl">⚡</div>
        </div>

        {/* SEARCH + FILTERS - KĀ TEV */}
        <div className="bg-white/70 backdrop-blur-sm border border-white/50 rounded-3xl p-8 mb-12 shadow-2xl flex flex-wrap items-center gap-6">
          <input 
            placeholder="Meklēt auto: BMW, Audi, cena..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[300px] px-8 py-5 rounded-2xl border-2 border-gray-200 bg-white/50 text-xl placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100/50 shadow-xl transition-all"
          />
          <select className="px-8 py-5 rounded-2xl border-2 border-gray-200 bg-white/50 text-xl shadow-lg">
            <option>Jaunākie auto</option>
            <option>Cena zema-augsta</option>
            <option>Cena augsta-zema</option>
            <option>Maršruta Nr.</option>
          </select>
          <Link 
            href="/ievietot?kategorija=auto"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-emerald-600 hover:to-teal-700 transition-all shadow-2xl hover:shadow-3xl whitespace-nowrap"
          >
            ➕ Ievietot auto
          </Link>
        </div>

        {/* AUTO GRID - KĀ TEV, BET AUTO STILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20">
          {sludinajumi.map((item) => {
            const firstImage = (item.image_public_urls && item.image_public_urls[0]) || 'https://via.placeholder.com/400x250/1e293b/ffffff?text=AUTO';
            
            return (
              <div key={item.id} className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden border border-white/50 hover:border-blue-200 hover:-translate-y-3">
                <div className="p-8">
                  {/* Auto image ar overlay */}
                  <div className="relative mb-6">
                    <img 
                      src={firstImage} 
                      alt={item.title} 
                      className="w-full h-64 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-2xl"
                    />
                    <div className="absolute top-4 right-4 bg-black/80 text-white px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-sm">
                      {item.status?.toUpperCase()}
                    </div>
                  </div>

                  {/* Rating kā tev */}
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 text-lg mr-3">★★★★☆</div>
                    <span className="text-sm text-gray-500">(27 atsauksmes)</span>
                  </div>

                  {/* Title + desc */}
                  <h3 className="font-black text-2xl mb-4 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-all pr-2">
                    {item.title || 'Auto sludinājums'}
                  </h3>
                  <p className="text-gray-600 text-base mb-8 line-clamp-3 leading-relaxed">
                    {item.description?.slice(0,120) || `${item.location || 'Rīga'} • Automobilis`}
                  </p>
                  
                  {/* PRICE + buttons KĀ TEV */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-4xl font-black bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-lg">
                        {item.price ? `${item.price.toLocaleString()}€` : 'Vienojas'}
                      </span>
                      <span className="text-lg text-gray-500 font-medium">{item.location || 'Rīga'}</span>
                    </div>
                    
                    <div className="flex space-x-3 pt-4">
                      <Link 
                        href={`/sludinajums/${item.id}`}
                        className="flex-1 bg-gradient-to-r from-slate-800 to-gray-900 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-slate-900 hover:to-black transition-all shadow-xl hover:shadow-2xl text-center flex items-center justify-center gap-2"
                      >
                        👁️ Apskatīt
                      </Link>
                      
                      <button 
                        type="button"
                        onClick={() => openChat(item.id, item.title)}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                      >
                        💬 Sazināties
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA kā tev */}
        {sludinajumi.length === 0 && (
          <div className="text-center py-32">
            <div className="text-8xl mb-12 mx-auto w-48 h-48 bg-gray-100 rounded-3xl flex items-center justify-center shadow-2xl">
              🚗
            </div>
            <h2 className="text-5xl font-black text-gray-700 mb-8">Nav auto sludinājumu</h2>
            <p className="text-2xl text-gray-500 mb-12 max-w-2xl mx-auto">
              Pagaidām nav publicētu auto. Esi pirmais!
            </p>
            <Link
              href="/ievietot?kategorija=auto"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-16 py-8 rounded-3xl text-2xl font-black shadow-2xl hover:shadow-3xl hover:from-emerald-600 hover:to-teal-700 transition-all inline-block"
            >
              🚀 Publicēt 1. auto
            </Link>
          </div>
        )}

        {/* CTA sekcija */}
        <div className="text-center p-16 bg-white/70 backdrop-blur-xl rounded-4xl shadow-3xl border border-white/50 mx-auto max-w-4xl mt-24">
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent mb-8">
            Pārdod savu auto ātri!
          </h2>
          <Link
            href="/ievietot?kategorija=auto"
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-16 py-6 rounded-3xl text-2xl font-black shadow-2xl hover:shadow-3xl hover:from-orange-600 hover:to-red-700 transition-all inline-block"
          >
            ➕ Ievietot BEZ MAKSAS
          </Link>
        </div>
      </div>

      {/* TAVA MODAL - 100% KOPIJA */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-10 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-3xl border-4 border-emerald-200">
            <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-emerald-100">
              <h2 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                💬 Ziņa auto: 
                <span className="text-emerald-700">"{currentSludinajumsTitle}"</span>
              </h2>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-4xl font-bold text-gray-500 hover:text-gray-700 p-3 -m-3 rounded-2xl hover:bg-gray-100 transition-all"
              >
                ×
              </button>
            </div>

            <select 
              value={messageType} 
              onChange={(e) => setMessageType(e.target.value)}
              className="w-full p-5 border-2 border-gray-200 rounded-2xl text-xl mb-8 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50 bg-gray-50 shadow-inner"
            >
              <option value="comment">📝 Komentārs</option>
              <option value="price_offer">💰 Piedāvāt cenu</option>
              <option value="request_photos">🖼️ Vēl bildes</option>
              <option value="test_drive">🚗 Testa brauciens</option>
              <option value="question">❓ Jautājums</option>
            </select>

            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Sveiks! Interesējas par "${currentSludinajumsTitle}". Vai vari...`}
              className="w-full h-36 p-6 border-2 border-gray-200 rounded-2xl text-xl mb-8 resize-none focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-200/50 bg-gray-50 shadow-inner"
            />

            <div className="flex gap-6 pt-4">
              <button
                onClick={sendMessage}
                disabled={!messageText.trim()}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-6 px-8 rounded-2xl text-xl font-black hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl hover:shadow-3xl flex items-center justify-center gap-3"
              >
                🚀 Nosūtīt auto pārdevējam
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-6 px-8 rounded-2xl text-xl font-black hover:from-gray-600 hover:to-gray-700 transition-all shadow-2xl hover:shadow-3xl"
              >
                ❌ Atcelt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer kā tev */}
      <footer className="bg-gradient-to-t from-gray-900 to-gray-800 text-white py-12 mt-24 border-t-4 border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xl">&copy; 2026 TekVibe Auto. Ātrākā auto tirdzniecība LV.</p>
        </div>
      </footer>

      <style jsx>{`
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  )
}
