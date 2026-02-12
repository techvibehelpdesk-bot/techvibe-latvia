'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export default function BlakusdarbsPage() {
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

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
        alert(`✅ Ziņa nosūtīta!`)
      } else {
        alert('❌ Kļūda: ' + error.message)
      }
    } catch (error) {
      alert('❌ Kļūda sūtot ziņu')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-4xl text-gray-500 animate-pulse">Ielādē blakusdarbus...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* NAVIGĀCIJA - IDENTISKA test-auto */}
      <nav className="bg-white border-b border-gray-200 px-6 py-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="flex items-center gap-2 px-8 py-3 bg-gray-50 border border-gray-200 rounded-2xl shadow-md">
            <Link href="/kategorijas" className="text-lg font-semibold text-gray-700 hover:text-gray-900">
              ← Visas kategorijas
            </Link>
            <div className="w-px h-6 bg-gray-300 mx-4"></div>
            <span className="text-2xl font-bold text-blue-600">📋 Blakusdarbs</span>
            <div className="w-px h-6 bg-gray-300 mx-4"></div>
            <Link href="/test-auto" className="text-lg font-semibold text-gray-700 hover:text-gray-900">
              🚗 Auto →
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">📋 Blakusdarbs</h1>
          <p className="text-2xl text-gray-600">{sludinajumi.length} atrasti</p>
        </div>

        {/* MEKĻĒŠANA - IDENTISKA */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-12 flex flex-wrap items-center gap-4 shadow-sm">
          <input 
            placeholder="Meklēt React, dizainu, SEO..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-6 py-3 rounded-xl border border-gray-300 bg-gray-50 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select className="px-6 py-3 rounded-xl border border-gray-300 bg-gray-50 text-lg">
            <option>Jaunākie</option>
            <option>Stundā augoša</option>
            <option>Stundā dilstoša</option>
          </select>
          <Link 
            href="/ievietot?kategorija=blakusdarbs"
            className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md"
          >
            ➕ Ievietot
          </Link>
        </div>

        {/* GRID - IDENTISKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {sludinajumi.map((item) => {
            const firstImage = (item.image_public_urls && item.image_public_urls[0]) || 
                              'https://via.placeholder.com/300x200/f8f9fa/6c757d?text=📋+Blakusdarbs';

            return (
              <div key={item.id} className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-100">
                <div className="p-6">
                  <img 
                    src={firstImage} 
                    alt={item.title} 
                    className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform" 
                  />
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400 text-sm mr-2">★★★★☆</div>
                    <span className="text-sm text-gray-500">(12 reviews)</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title || 'Blakusdarbs'}</h3>
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {item.description?.slice(0,100) || `${item.location || 'Rīga'} • Blakusdarbs`}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {item.price ? `${item.price.toLocaleString()}€` : 'Dāvanā'}
                      </span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Link 
                        href={`/sludinajums/${item.id}`}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all text-center shadow-md"
                      >
                        👁️ Apskatīt
                      </Link>
                      <button 
                        onClick={() => openChat(item.id, item.title)}
                        className="flex-1 bg-green-600 text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-md flex items-center justify-center"
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

        {sludinajumi.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-8">📋</div>
            <h2 className="text-3xl font-bold mb-4">Nav blakusdarbu</h2>
            <Link href="/ievietot?kategorija=blakusdarbs" className="bg-blue-600 text-white px-12 py-4 rounded-2xl text-xl font-bold shadow-lg hover:bg-blue-700">
              ➕ Esi pirmais!
            </Link>
          </div>
        )}

        {/* CTA - IDENTISKS */}
        <div className="text-center p-12 bg-gray-50 rounded-2xl border border-gray-200">
          <h2 className="text-3xl font-bold mb-6">Piedāvā savu blakusdarbu!</h2>
          <Link
            href="/ievietot?kategorija=blakusdarbs"
            className="bg-blue-600 text-white px-12 py-4 rounded-2xl text-xl font-bold shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all"
          >
            ➕ Publicēt bez maksas
          </Link>
        </div>
      </div>

      {/* MODAL - IDENTISKS */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl border-4 border-green-100">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                💬 Ziņa par: <span className="text-green-600">"{currentSludinajumsTitle}"</span>
              </h2>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-3xl font-bold text-gray-500 hover:text-gray-700 p-2 -m-2 rounded-full hover:bg-gray-100"
              >
                ×
              </button>
            </div>

            <select 
              value={messageType} 
              onChange={(e) => setMessageType(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl text-lg mb-6 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-gray-50"
            >
              <option value="comment">📝 Komentārs</option>
              <option value="price_offer">💰 Kaulēt cenu</option>
              <option value="request_photos">🖼️ Vēl bildes</option>
              <option value="question">❓ Jautājums</option>
            </select>

            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder={`Sveiks! Interesējos par "${currentSludinajumsTitle}". ...`}
              className="w-full h-32 p-4 border-2 border-gray-200 rounded-xl text-lg mb-6 resize-vertical focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-gray-50"
              rows={4}
            />

            <div className="flex gap-4 pt-2">
              <button
                onClick={sendMessage}
                disabled={!messageText.trim()}
                className="flex-1 bg-green-600 text-white py-4 px-6 rounded-xl text-lg font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-200"
              >
                🚀 Nosūtīt ziņu
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="flex-1 bg-gray-500 text-white py-4 px-6 rounded-xl text-lg font-bold hover:bg-gray-600 transition-all shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-200"
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

