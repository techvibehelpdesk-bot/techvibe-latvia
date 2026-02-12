'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export default function BlakusdarbsPage() {
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // CHAT MODAL
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentSludinajumsId, setCurrentSludinajumsId] = useState('')
  const [currentSludinajumsTitle, setCurrentSludinajumsTitle] = useState('')
  const [messageType, setMessageType] = useState('comment')
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    fetchData()
  }, [search])

  async function fetchData() {
    try {
      setLoading(true)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      const response = await fetch(`${supabaseUrl}/rest/v1/sludinajumi?select=*`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      })

      if (!response.ok) throw new Error('Fetch kļūda')
      const data = await response.json()
      
      let filtered = data.filter(s => 
        s.category?.toLowerCase().includes('blakusdarbs') && 
        s.status === 'published'
      )
      
      if (search) {
        filtered = filtered.filter(s => 
          s.title?.toLowerCase().includes(search.toLowerCase()) ||
          s.description?.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      setSludinajumi(filtered)
      console.log('📋 BLAKUSDARBS OK:', filtered.length)
    } catch (err) {
      console.error('Blakusdarbs Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const openChat = (id, title) => {
    setCurrentSludinajumsId(id)
    setCurrentSludinajumsTitle(title)
    setMessageText('')
    setIsChatOpen(true)
  }

  const sendMessage = async () => {
    if (!messageText.trim()) return
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { error } = await supabase
        .from('comments')
        .insert({
          sludinajums_id: currentSludinajumsId,
          type: messageType,
          comment: messageText.trim(),
          user_email: 'client@test.lv'
        })

      if (!error) {
        setMessageText('')
        setIsChatOpen(false)
        alert(`✅ Ziņa par "${currentSludinajumsTitle}" nosūtīta!`)
      } else {
        alert('❌ Kļūda: ' + error.message)
      }
    } catch (error) {
      alert('❌ Kļūda sūtot ziņu')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
        <div className="text-4xl text-white animate-pulse">Ielādē blakusdarbus...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
      {/* NAVIGĀCIJA */}
      <nav className="bg-white/20 backdrop-blur-xl border-b border-white/20 px-6 py-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="flex items-center gap-2 px-8 py-3 bg-white/30 border border-white/30 rounded-2xl shadow-xl backdrop-blur-sm">
            <Link href="/kategorijas" className="text-lg font-semibold hover:text-emerald-200">
              ← Visas kategorijas
            </Link>
            <div className="w-px h-6 bg-white/50 mx-4"></div>
            <span className="text-2xl font-bold text-white drop-shadow-lg">📋 Blakusdarbs</span>
            <div className="w-px h-6 bg-white/50 mx-4"></div>
            <Link href="/test-auto" className="text-lg font-semibold hover:text-emerald-200">
              🚗 Auto →
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">📋 Blakusdarbs</h1>
          <p className="text-2xl drop-shadow-lg">{sludinajumi.length} atrasti</p>
        </div>

        {/* MEKĻĒŠANA */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl p-6 mb-12 flex flex-wrap items-center gap-4 shadow-2xl">
          <input 
            placeholder="Meklēt React, dizainu, SEO..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-6 py-4 rounded-2xl border border-white/30 bg-white/50 text-lg placeholder-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <select className="px-6 py-4 rounded-2xl border border-white/30 bg-white/50 text-lg backdrop-blur-sm">
            <option>Jaunākie</option>
            <option>Stundā augoša</option>
            <option>Stundā dilstoša</option>
          </select>
          <Link 
            href="/ievietot?kategorija=blakusdarbs"
            className="bg-white text-emerald-600 px-10 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl text-lg"
          >
            ➕ Piedāvāt
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {sludinajumi.map((item) => {
            const firstImage = (item.image_public_urls && item.image_public_urls[0]) || 
                              'https://images.unsplash.com/photo-1516321310764-b4a77b4d4fd7?w=400&auto=format&fit=crop';

            return (
              <div key={item.id} className="group bg-white/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all border border-white/50 hover:-translate-y-2">
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={firstImage} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-500/90 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
                    Freelance
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400 text-sm mr-2">★★★★☆</div>
                    <span className="text-sm text-gray-600">(12 reviews)</span>
                  </div>
                  <h3 className="font-bold text-xl mb-3 line-clamp-2 leading-tight">{item.title || 'Blakusdarbs'}</h3>
                  <p className="text-gray-700 text-sm mb-6 line-clamp-2">{item.description?.slice(0,100)}</p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-emerald-600 drop-shadow-lg">
                        {item.price ? `${item.price.toLocaleString()}€` : 'Dāvanā'}
                      </span>
                      <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {item.location || 'Rīga'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Jauns'}</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <Link 
                      href={`/sludinajums/${item.id}`}
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg text-center"
                    >
                      👁️ Apskatīt
                    </Link>
                    <button 
                      onClick={() => openChat(item.id, item.title)}
                      className="flex-1 bg-emerald-600 text-white py-3 px-4 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center"
                    >
                      💬 Sazināties
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {sludinajumi.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-8">📋</div>
            <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">Nav blakusdarbu</h2>
            <Link href="/ievietot?kategorija=blakusdarbs" className="bg-white text-emerald-600 px-12 py-4 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl">
              Būt pirmais!
            </Link>
          </div>
        )}

        {/* CTA */}
        <div className="text-center p-16 bg-white/20 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl">
          <h2 className="text-4xl font-bold mb-8 drop-shadow-lg">Piedāvā savu blakusdarbu!</h2>
          <Link
            href="/ievietot?kategorija=blakusdarbs"
            className="bg-white text-emerald-600 px-16 py-6 rounded-3xl text-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all inline-block"
          >
            ➕ Publicēt bez maksas
          </Link>
        </div>
      </div>

      {/* CHAT MODAL */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl border-4 border-emerald-200">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                💬 Ziņa par: <span className="text-emerald-600">"{currentSludinajumsTitle}"</span>
              </h2>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-3xl font-bold text-gray-500 hover:text-gray-700 p-2 -m-2 rounded-2xl hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <select 
              value={messageType} 
              onChange={(e) => setMessageType(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg mb-6 focus:outline-none focus:border-emerald-500 bg-gray-50"
            >
              <option value="comment">📝 Komentārs</option>
              <option value="price_offer">💰 Kaulēt cenu</option>
              <option value="question">❓ Jautājums</option>
            </select>

            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Sveiks! Interesējos par "${currentSludinajumsTitle}". ...`}
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-2xl text-lg mb-8 resize-vertical focus:outline-none focus:border-emerald-500 bg-gray-50"
            />

            <div className="flex gap-4">
              <button
                onClick={sendMessage}
                disabled={!messageText.trim()}
                className="flex-1 bg-emerald-600 text-white py-4 px-6 rounded-2xl text-lg font-bold hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-xl"
              >
                🚀 Nosūtīt
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="flex-1 bg-gray-400 text-white py-4 px-6 rounded-2xl text-lg font-bold hover:bg-gray-500 transition-all shadow-xl"
              >
                ❌ Atcelt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
