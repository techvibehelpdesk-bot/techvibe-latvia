import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

// BEZ 'use client' - kā tev berniem!
export default function AutoPage() {
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // VISAS TAVAS MODAL STATE
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentSludinajumsId, setCurrentSludinajumsId] = useState('')
  const [currentSludinajumsTitle, setCurrentSludinajumsTitle] = useState('')
  const [messageType, setMessageType] = useState('comment')
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  // TAVA EXAKTA METODE NO BERNIEM - AUTO!
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
      
      // EXAKTS TAVS FILTER BET AUTO
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

  // TAVAS FUNCIJAS - 100%
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
      .insert({
        sludinajums_id: currentSludinajumsId,
        type: messageType,
        comment: messageText,
        user_email: 'client@test.lv'
      })

    if (!error) {
      setMessageText('')
      setIsChatOpen(false)
      alert(`✅ Ziņa "${currentSludinajumsTitle}" nosūtīta!`)
    } else {
      alert('❌ ' + error.message)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100"><div className="text-4xl">🚗 Ielādē...</div></div>
  }

  // TAVA UI NO BERNIEM - AUTO TĒMA
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* VISU TAVU HTML NO BERNIEM KODA - MAINOT VIEN TIK "Bērniem" → "Auto" */}
      <nav className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-8">
            <Link href="/kategorijas" className="text-lg font-medium text-gray-700 hover:text-black">← Atpakaļ</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/iegūt-visus" className="text-sm font-medium text-blue-600 hover:text-blue-500">View all</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-12">🚗 Auto sludinājumi ({sludinajumi.length})</h1>

        {/* Search kā tev */}
        <div className="bg-white border rounded-2xl p-6 mb-12 flex items-center gap-4">
          <input 
            placeholder="Meklēt auto..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-6 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link href="/ievietot?kategorija=auto" className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700">
            ➕ Ievietot
          </Link>
        </div>

        {/* Grid kā tev */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sludinajumi.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-md hover:shadow-xl border p-6">
              <img src={item.image_public_urls?.[0] || 'https://via.placeholder.com/300?text=AUTO'} alt={item.title} className="w-full h-48 object-cover rounded-xl mb-4" />
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{item.description?.slice(0,100)}</p>
              <div className="text-2xl font-bold text-blue-600 mb-4">{item.price}€</div>
              <div className="flex gap-2">
                <Link href={`/sludinajums/${item.id}`} className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-xl font-bold text-sm text-center">
                  👁️ Apskatīt
                </Link>
                <button onClick={() => openChat(item.id, item.title)} className="flex-1 bg-green-600 text-white py-2 px-4 rounded-xl font-bold text-sm">
                  💬 Sazināties
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TAVA MODAL - EXAKTA KOPIJA */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">💬 Ziņa par: {currentSludinajumsTitle}</h2>
            <button onClick={() => setIsChatOpen(false)} className="absolute top-4 right-4 text-3xl">×</button>
            <select value={messageType} onChange={(e) => setMessageType(e.target.value)} className="w-full p-3 border rounded-xl mb-4">
              <option value="comment">Komentārs</option>
              <option value="question">Jautājums</option>
            </select>
            <textarea value={messageText} onChange={(e) => setMessageText(e.target.value)} className="w-full p-4 border rounded-xl mb-6" rows="4" placeholder="Raksti ziņu..."/>
            <button onClick={sendMessage} className="w-full bg-green-600 text-white py-4 rounded-xl font-bold">Nosūtīt</button>
          </div>
        </div>
      )}
    </div>
  )
}
