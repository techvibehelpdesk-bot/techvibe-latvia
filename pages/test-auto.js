import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export default function TestAutoPage() {
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentSludinajumsId, setCurrentSludinajumsId] = useState('')
  const [currentSludinajumsTitle, setCurrentSludinajumsTitle] = useState('')
  const [messageType, setMessageType] = useState('comment')
  const [messageText, setMessageText] = useState('')
  const [sending, setSending] = useState(false)

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
      
      // AUTO FILTER
      let filtered = data.filter(s => 
        s.category?.toLowerCase().includes('auto') && 
        s.status === 'published'
      )
      
      if (search) {
        filtered = filtered.filter(s => 
          s.title?.toLowerCase().includes(search.toLowerCase()) ||
          s.description?.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      setSludinajumi(filtered)
      console.log('🚗 AUTO OK:', filtered.length)
    } catch (err) {
      console.error('AUTO Error:', err)
      setSludinajumi([])
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

  const closeChat = () => {
    setIsChatOpen(false)
    setCurrentSludinajumsId('')
    setCurrentSludinajumsTitle('')
  }

  const sendMessage = async () => {
    if (!messageText.trim()) return

    setSending(true)
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { error } = await supabase
        .from('messages')  // Pieņemam tabula 'messages'
        .insert({
          sludinajums_id: currentSludinajumsId,
          type: messageType,
          text: messageText.trim(),
          created_at: new Date().toISOString()
        })

      if (error) throw error

      setMessageText('')
      alert('Ziņa nosūtīta!')  // TODO: Reāls paziņojums
    } catch (error) {
      console.error('Ziņas kļūda:', error)
      alert('Kļūda sūtot ziņu')
    } finally {
      setSending(false)
    }
  }

  if (loading) return <div className="p-8 text-center">Ielādē auto sludinājumus...</div>

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">🚗 Auto sludinājumi</h1>
      
      {/* Meklēšana */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Meklē auto pēc nosaukuma vai apraksta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl text-lg"
        />
      </div>

      {/* Sludinājumi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {sludinajumi.map((s) => (
          <div key={s.id} className="bg-white border rounded-xl p-6 shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-bold mb-2">{s.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{s.description}</p>
            <div className="flex justify-between items-center">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {s.category}
              </span>
              <button
                onClick={() => openChat(s.id, s.title)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                💬 Rakstīt
              </button>
            </div>
          </div>
        ))}
      </div>

      {sludinajumi.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-4">Nav auto sludinājumu</p>
          <Link href="/post-ad">
            <a className="bg-blue-500 text-white px-6 py-3 rounded-xl inline-block">
              + Publicēt auto sludinājumu
            </a>
          </Link>
        </div>
      )}

      {/* Chat modālis */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">💬 Ziņa par: {currentSludinajumsTitle}</h3>
              <button onClick={closeChat} className="text-2xl">&times;</button>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-xl">
              <label className="block text-sm font-medium mb-2">Ziņas veids:</label>
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className="w-full p-3 border rounded-lg"
              >
                <option value="comment">Komentārs</option>
                <option value="question">Jautājums</option>
                <option value="offer">Piedāvājums</option>
              </select>
            </div>

            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Raksti ziņu šeit..."
              rows="5"
              className="w-full p-4 border border-gray-300 rounded-xl mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-3">
              <button
                onClick={closeChat}
                className="flex-1 bg-gray-300 text-gray-800 py-3 px-6 rounded-xl hover:bg-gray-400"
              >
                Atcelt
              </button>
              <button
                onClick={sendMessage}
                disabled={sending || !messageText.trim()}
                className="flex-1 bg-green-500 text-white py-3 px-6 rounded-xl hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {sending ? 'Sūta...' : 'Nosūtīt ziņu'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
