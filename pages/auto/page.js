'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export default function AutoPage({ params }) {
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const slug = params?.slug || 'auto'

  // MODAL STATE
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentSludinajumsId, setCurrentSludinajumsId] = useState('')
  const [currentSludinajumsTitle, setCurrentSludinajumsTitle] = useState('')
  const [messageType, setMessageType] = useState('comment')
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    fetchData()
  }, [slug, search])

  async function fetchData() {
    try {
      setLoading(true)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      const supabase = createClient(supabaseUrl, supabaseKey)

      let { data, error } = await supabase
        .from('sludinajumi')
        .select('*, image_public_urls')
        .eq('status', 'published')
        .ilike('category', `%${slug}%`)
        .order('created_at', { ascending: false })

      if (error) throw error

      let filtered = data || []
      if (search.trim()) {
        filtered = filtered.filter(s => 
          s.title?.toLowerCase().includes(search.toLowerCase()) ||
          s.description?.toLowerCase().includes(search.toLowerCase())
        )
      }

      setSludinajumi(filtered)
      console.log('✅ SUPABASE:', filtered.length, 'auto sludinājumi')
    } catch (err) {
      console.error('❌ SUPABASE Error:', err.message)
      setSludinajumi([])
    } finally {
      setLoading(false)
    }
  }

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
      .from('comments')
      .insert([{
        sludinajums_id: currentSludinajumsId,
        type: messageType,
        comment: messageText.trim(),
        user_email: 'anon@tekvibe.lv'
      }])

    if (error) {
      alert('❌ ' + error.message)
    } else {
      setMessageText('')
      setIsChatOpen(false)
      alert('✅ Ziņa nosūtīta!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-8"></div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🚗</h1>
          <p className="text-xl text-gray-600">Ielādē auto sludinājumus...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-8">
              <Link href="/kategorijas" className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">🏠 Sākums</Link>
              <Link href="/auto" className="text-lg font-semibold text-blue-700 border-b-2 border-blue-600 pb-1">🚗 Auto</Link>
              <Link href="/nekustamais" className="text-lg font-semibold text-gray-700 hover:text-blue-600">🏠 Nekustamais</Link>
              <Link href="/elektronika" className="text-lg font-semibold text-gray-700 hover:text-blue-600">📱 Elektronika</Link>
            </div>
            <Link href="/iegūt-visus" className="text-sm font-medium text-blue-600 hover:text-blue-500">Visi sludinājumi →</Link>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 pb-24">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6">
            🚗 Auto sludinājumi
          </h1>
          <p className="text-2xl font-semibold text-gray-700 mb-12">
            Atrasti <span className="text-3xl text-blue-600">{sludinajumi.length}</span> sludinājumi
          </p>
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white/70 backdrop-blur-md rounded-3xl p-8 mb-16 shadow-xl border border-white/50">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
            <input 
              placeholder="🔍 Meklēt BMW, Audi, Toyota, Rīga..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-8 py-5 rounded-2xl border-2 border-gray-200 bg-white/50 text-xl placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 shadow-inner"
            />
            <div className="flex gap-3 flex-wrap">
              <button className="px-8 py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">Jaunākie</button>
              <button className="px-8 py-5 bg-gray-100 text-gray-800 rounded-2xl font-bold text-lg hover:bg-gray-200 shadow-md transition-all">Cena ↑</button>
              <Link href="/ievietot?kategorija=auto" className="px-10 py-5 bg-green-600 text-white rounded-2xl font-bold text-lg hover:bg-green-700 shadow-lg hover:shadow-xl transition-all">➕ Publicēt</Link>
            </div>
          </div>
        </div>

        {/* SLUDINĀJUMU GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sludinajumi.length > 0 ? (
            sludinajumi.map((item) => {
              const firstImage = item.image_public_urls?.[0] || 'https://via.placeholder.com/400x300/f8f9fa/f8f9fa?text=🚗+Auto'
              return (
                <div key={item.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100 hover:border-blue-200 hover:-translate-y-2 duration-300">
                  <div className="overflow-hidden rounded-t-2xl h-56 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <img 
                      src={firstImage} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="p-7">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>☆</span>
                      </div>
                      <span className="text-xs text-gray-500">({Math.floor(Math.random()*20)+1} atsauksmes)</span>
                    </div>
                    
                    <h3 className="font-bold text-xl mb-3 line-clamp-2 leading-tight group-hover:text-blue-700 transition-colors">
                      {item.title || 'Auto sludinājums'}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {item.description?.slice(0,120) || `${item.location || 'Rīga, Latvija'} • Labā stāvoklī`}
                    </p>
                    
                    <div className="space-y-4 pt-4 border-t border-gray-100">
                      <div className="flex items-end justify-between">
                        <span className="text-3xl font-black text-gray-900 tracking-tight">
                          {item.price ? `${item.price.toLocaleString()}€` : 'Dāvanā!'}
                        </span>
                        {item.location && (
                          <span className="text-xs bg-gray-100 px-3 py-1 rounded-full font-medium">
                            {item.location}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex gap-3 pt-3">
                        <Link 
                          href={`/sludinajums/${item.id}`}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all text-center flex items-center justify-center gap-2"
                        >
                          👁️ Apskatīt
                        </Link>
                        <button 
                          onClick={() => openChat(item.id, item.title)}
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-3 px-6 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl hover:from-emerald-700 hover:to-emerald-800 transition-all flex items-center justify-center gap-2"
                        >
                          💬 Rakstīt
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-full text-center py-32">
              <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl">🚗</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Nav auto sludinājumu</h2>
              <p className="text-xl text-gray-600 mb-8">Esi pirmais – publicē savu auto!</p>
              <Link 
                href="/ievietot?kategorija=auto"
                className="bg-green-600 text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl hover:bg-green-700 transition-all"
              >
                ➕ Publicēt 1. auto
              </Link>
            </div>
          )}
        </div>

        {/* CTA SECTION */}
        {sludinajumi.length > 0 && (
          <div className="mt-24 p-12 bg-gradient-to-r from-emerald-50 to-green-50 rounded-3xl text-center border border-emerald-100">
            <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-green-800 to-emerald-800 bg-clip-text text-transparent">
              Ātri pārdod savu auto!
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Publicē sludinājumu 2 minūtēs. Bezmaksas. Tūkstošiem pircēju gaida.
            </p>
            <Link
              href="/ievietot?kategorija=auto"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-12 py-6 rounded-3xl text-xl font-bold shadow-2xl hover:shadow-3xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
            >
              ➕ Publicēt sludinājumu tagad
            </Link>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-gray-900 to-black text-white py-12 mt-24 border-t-8 border-indigo-900/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-6 mb-8 flex-wrap">
            <Link href="/kategorijas" className="hover:text-blue-400 transition-colors font-medium">Kategorijas</Link>
            <Link href="/faq" className="hover:text-blue-400 transition-colors font-medium">FAQ</Link>
            <Link href="/blogs" className="hover:text-blue-400 transition-colors font-medium">Blogs</Link>
            <a href="mailto:hello@tekvibe.lv" className="hover:text-blue-400 transition-colors font-medium">Kontakti</a>
          </div>
          <p className="text-gray-400">&copy; 2026 TekVibe. Visas tiesības aizsargātas. Rīga, Latvija.</p>
        </div>
      </footer>

      {/* CHAT MODAL */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setIsChatOpen(false)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-emerald-200 animate-in slide-in-from-bottom-4 duration-300" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8 pb-6 border-b-2 border-emerald-100">
              <div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">💬 Sazināties</h2>
                <p className="text-emerald-700 font-semibold">"{currentSludinajumsTitle}"</p>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-4xl font-black text-gray-400 hover:text-gray-600 p-3 rounded-2xl hover:bg-gray-100 transition-all w-14 h-14 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <select 
                value={messageType} 
                onChange={(e) => setMessageType(e.target.value)}
                className="w-full p-5 border-2 border-gray-200 rounded-2xl text-lg bg-white/50 shadow-inner focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 font-medium"
              >
                <option value="comment">📝 Vispārējs komentārs</option>
                <option value="price_offer">💰 Piedāvāt cenu</option>
                <option value="request_photos">🖼️ Vēl bildes</option>
                <option value="question">❓ Uzdot jautājumu</option>
                <option value="urgent">⚡ Ļoti interesē!</option>
              </select>

              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Sveiks! Šī BMW mani tik tiešām interesē. Vai vari atsūtīt vēl bildes no motora?..."
                className="w-full h-40 p-6 border-2 border-gray-200 rounded-2xl text-lg resize-vertical focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 shadow-inner bg-white/50"
              />

              <div className="flex gap-4 pt-4">
                <button
                  onClick={sendMessage}
                  disabled={!messageText.trim()}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-5 px-8 rounded-2xl text-xl font-black shadow-2xl hover:shadow-3xl hover:from-emerald-700 hover:to-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 h-16"
                >
                  🚀 Nosūtīt ziņu
                </button>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-5 px-8 rounded-2xl text-xl font-black shadow-xl hover:shadow-2xl hover:from-gray-600 hover:to-gray-700 transition-all h-16"
                >
                  ❌ Atcelt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
