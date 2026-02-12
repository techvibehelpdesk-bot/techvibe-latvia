'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export default function AutoPage() {
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // MODAL STATE - gatavs
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentSludinajumsId, setCurrentSludinajumsId] = useState('')
  const [currentSludinajumsTitle, setCurrentSludinajumsTitle] = useState('')
  const [messageType, setMessageType] = useState('comment')
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    fetchData()
  }, [search])

  // TAVA PERFECTA METODE - bez izmaiņām!
  async function fetchData() {
    try {
      setLoading(true)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      const response = await fetch(`${supabaseUrl}/rest/v1/sludinajumi?select=*&status=eq.published`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      })

      if (!response.ok) throw new Error('Supabase fetch kļūda')
      const data = await response.json()
      
      // AUTO FILTER KĀ BERNIEK
      let filtered = data.filter(s => 
        s.category?.toLowerCase().includes('auto')
      )
      
      if (search.trim()) {
        filtered = filtered.filter(s => 
          s.title?.toLowerCase().includes(search.toLowerCase()) ||
          s.description?.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      setSludinajumi(filtered)
      console.log('🚗 AUTO OK:', filtered.length)
    } catch (err) {
      console.error('❌ AUTO Error:', err)
      setSludinajumi([])
    } finally {
      setLoading(false)
    }
  }

  // CHAT MODAL FUNCIJAS - pilnīgas
  function openChat(sludinajumsId, title) {
    setCurrentSludinajumsId(sludinajumsId)
    setCurrentSludinajumsTitle(title)
    setMessageText('')
    setIsChatOpen(true)
  }

  async function sendMessage() {
    if (!messageText.trim()) return

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      )

      const { data, error } = await supabase
        .from('messages') // Pieņem tabulu 'messages'
        .insert({
          sludinajums_id: currentSludinajumsId,
          type: messageType,
          text: messageText,
          // Pievieno user_id ja vajag auth
        })

      if (error) throw error

      setMessageText('')
      alert('Ziņa nosūtīta!') // Vai refresh chats
    } catch (err) {
      console.error('Ziņas kļūda:', err)
      alert('Kļūda sūtot ziņu')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl text-gray-600 animate-pulse">🚗 Ielādē auto sludinājumus...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Auto sludinājumi
        </h1>
        <p className="text-xl text-gray-700 mb-8">{sludinajumi.length} auto atrasti</p>
        
        {/* Search */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Meklē auto pēc nosaukuma vai apraksta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg transition-all duration-200"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto">
        {sludinajumi.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-8 block">🚗</span>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">Nav auto sludinājumu</h2>
            <p className="text-lg text-gray-500">Mēģini citu meklēšanas vārdu vai pievieno pats!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sludinajumi.map((s) => (
              <div key={s.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
                  {s.image_url ? (
                    <img src={s.image_url} alt={s.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">🚗</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{s.title}</h3>
                  <p className="text-lg text-gray-600 mb-3 line-clamp-3">{s.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {s.price || 'Cena nav norādīta'}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      {s.category}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openChat(s.id, s.title)}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl text-sm"
                    >
                      💬 Rakstīt
                    </button>
                    <Link href={`/sludinajums/${s.id}`}>
                      <span className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-300 transition-colors">
                        👁️
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CHAT MODAL */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentSludinajumsTitle}</h2>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-4">
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500"
              >
                <option value="comment">Komentārs</option>
                <option value="question">Jautājums</option>
                <option value="offer">Piedāvājums</option>
              </select>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Raksti ziņu..."
                rows={4}
                className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 resize-none"
              />
              <button
                onClick={sendMessage}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-2xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Nosūtīt ziņu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
