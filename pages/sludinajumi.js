'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function VisiSludinajumi() {
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null) // Jauna state 3. pogām
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [commentText, setCommentText] = useState('')

  // Kategoriju saraksts navigācijai
  const kategorijas = [
    { name: 'Auto', slug: 'auto' },
    { name: 'Mēbeles', slug: 'mebeles' },
    { name: 'Moto transports', slug: 'moto-transports' },
    { name: 'Velosipēdi', slug: 'velosipedi' },
    { name: 'Dzīvokļi', slug: 'dzivokli' },
    { name: 'Mājas vasarnīcas', slug: 'majas-vasarnicas' },
    { name: 'Būvmatreāli', slug: 'buvmateriali' },
    { name: 'Telefoni', slug: 'telefoni' },
    { name: 'Datori', slug: 'datori' },
    { name: 'Sadzīves tehnika', slug: 'sadziwes-tehnika' },
    { name: 'Darbs & vakances', slug: 'darbs-vakances' },
    { name: 'Blakusdarbs', slug: 'blakusdarbs' },
    { name: 'Bērni', slug: 'berni' },
    { name: 'Dažādi', slug: 'dazadi' }
  ]

  useEffect(() => {
    fetchSludinajumi()
  }, [])

  const fetchSludinajumi = async () => {
    let query = supabase
      .from('sludinajumi')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    setLoading(true)
    const { data, error } = await query
    if (error) console.error('Kļūda:', error)
    else setSludinajumi(data || [])
    setLoading(false)
  }

  const filteredSludinajumi = sludinajumi.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSazinoties = (id, item) => {
    setSelectedId(id)
    setSelectedItem(item) // Saglabā item datu 3. pogām
    setShowModal(true)
  }

  // ✅ ORIGINAL sendComment funkcija - paliek nemainīta
  const sendComment = async () => {
    if (!userName || !userEmail || !commentText) {
      return alert('Aizpildi visus laukus! *')
    }

    try {
      const response = await fetch('/api/contact-seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sludinajums_id: selectedId,
          sender_name: userName,
          sender_email: userEmail,
          message: commentText
        })
      })

      const result = await response.json()

      if (response.ok) {
        alert('✅ Ziņa nosūtīta pārdevējam un saglabāta!')
        setShowModal(false)
        setUserName('')
        setUserEmail('')
        setCommentText('')
        fetchSludinajumi()
      } else {
        alert('❌ Kļūda: ' + (result.error || 'Neizdevās nosūtīt'))
      }
    } catch (error) {
      alert('❌ Kļūda sūtot ziņu: ' + error.message)
    }
  }

  // ✅ JAUNA 1. funkcija: Ātra ziņas kopēšana
  const copyQuickMessage = (item) => {
    const message = `Interesējas par: "${item.title}" ${item.price ? `(${item.price}€)` : '(Cena vienojoties)'}. Kur kontakti? 📞`;
    navigator.clipboard.writeText(message)
    alert('📋 Ātrā ziņa nokopēta! Ielīmē WhatsApp/Telegram.');
  }

  // ✅ JAUNA 2. funkcija: Saglabāt favorītos (localStorage)
  const saveToFavorites = (item) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (!favorites.find(fav => fav.id === item.id)) {
      favorites.push(item)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      alert('❤️ Saglabāts favorītos! (Apskati /favoriti)')
    } else {
      alert('❌ Jau ir favorītos!')
    }
  }

  // ✅ JAUNA 3. funkcija: Dalīties WhatsApp
  const shareWhatsApp = (item) => {
    const message = `Skaties TechVibe sludinājumu! 👀\n\n${item.title}\n${item.price ? `${item.price}€` : 'Cena vienojoties'}\n\nApskati: ${window.location.origin}/sludinajums/${item.id}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xl">Ielādē sludinājumus...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">TechVibe</Link>
          <div className="flex items-center space-x-4">
            <Link href="/sludinajumi" className="font-bold text-xl px-6 py-2 bg-blue-100 text-blue-800 rounded-xl shadow-sm">
              Visi ({filteredSludinajumi.length})
            </Link>
            {kategorijas.slice(0, 6).map(({ name, slug }) => (
              <Link 
                key={slug}
                href={`/sludinajumi/${slug}`}
                className="text-blue-600 hover:text-blue-800 font-semibold px-3 py-2 rounded-lg hover:bg-blue-50 transition-all hidden md:block"
              >
                {name}
              </Link>
            ))}
            <Link href="/ievietot" className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
              ➕ Ievietot
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Meklēšana */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Meklēt sludinājumos (virsraksts vai apraksts)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-3xl px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 shadow-sm focus:shadow-md transition-all text-lg"
          />
        </div>

        {/* Kategoriju chips */}
        <div className="flex flex-wrap gap-3 mb-12 overflow-x-auto pb-4 -mb-4 scrollbar-hide">
          <Link href="/sludinajumi" className="px-6 py-3 bg-blue-100 text-blue-800 rounded-2xl font-bold hover:bg-blue-200 whitespace-nowrap shadow-sm hover:shadow-md transition-all">
            🎯 Visas kategorijas
          </Link>
          {kategorijas.map(({ name, slug }) => (
            <Link 
              key={slug}
              href={`/sludinajumi/${slug}`}
              className="px-5 py-3 bg-gray-100 text-gray-800 rounded-xl text-sm font-semibold hover:bg-gray-200 shadow-sm hover:shadow-md transition-all whitespace-nowrap"
            >
              {name}
            </Link>
          ))}
        </div>

        {/* Tukšs rezultāts */}
        {filteredSludinajumi.length === 0 && (
          <div className="text-center py-32">
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mx-auto mb-8 flex items-center justify-center text-4xl">📭</div>
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Nav atrasti sludinājumi</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">Pamēģini citu meklēšanas vārdu vai izpēti kategorijas.</p>
            <Link href="/ievietot" className="inline-block bg-blue-600 text-white px-12 py-5 rounded-2xl text-xl font-bold hover:bg-blue-700 shadow-xl hover:shadow-2xl transition-all">
              ✨ Būt pirmais!
            </Link>
          </div>
        )}

        {/* Sludinājumu grīda */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSludinajumi.map((item) => (
            <div key={item.id} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              {/* Attēls */}
              <Link href={`/sludinajums/${item.id}`} className="block relative group-hover:opacity-90">
                <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                  <img
                    src={item.image_public_urls?.[0] || '/placeholder.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-xl text-xs font-bold text-gray-800 shadow-md">
                    {item.location}
                  </div>
                </div>
              </Link>

              {/* Saturs */}
              <div className="p-6">
                <Link href={`/sludinajums/${item.id}`}>
                  <h3 className="font-bold text-xl mb-3 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">{item.description}</p>
                </Link>
                
                <div className="flex justify-between items-center mb-6">
                  <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
                    {item.price ? `${item.price}€` : '💰 Cena vienojoties'}
                  </span>
                </div>
              </div>

              {/* ✅ 3 JAUNAS POGAS + KOMENTĀRU MODĀLIS */}
              <div className="px-6 pb-6 space-y-3">
                {/* Poga 1: Skatīt */}
                <Link
                  href={`/sludinajums/${item.id}`}
                  className="block w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 py-4 px-6 rounded-xl text-center font-bold text-lg hover:from-gray-200 hover:to-gray-300 shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 border border-gray-200"
                >
                  👁️ Skatīt pilnu sludinājumu
                </Link>
                
                {/* Poga 2: Komentēt / Sazināties (ar modāli) */}
                <button
                  onClick={() => handleSazinoties(item.id, item)}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  💬 Komentēt / Sazināties
                </button>
                
                {/* Poga 3: Ātrās darbības izvēlne */}
                <div className="flex gap-2">
                  <button
                    onClick={() => copyQuickMessage(item)}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 px-3 rounded-xl font-bold text-sm hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-1"
                    title="Nokopē ātru ziņu"
                  >
                    <span>⚡</span><span>Kopēt</span>
                  </button>
                  <button
                    onClick={() => saveToFavorites(item)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-3 rounded-xl font-bold text-sm hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-1"
                    title="Pievienot favorītos"
                  >
                    <span>❤️</span>
                  </button>
                  <button
                    onClick={() => shareWhatsApp(item)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-3 rounded-xl font-bold text-sm hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-1"
                    title="Dalīties WhatsApp"
                  >
                    <span>📱</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero CTA */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 py-20 text-center border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gribi pārdot ātri? 🚀
          </h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ievieto sludinājumu TechVibe un atrodi pircēju jau šodien! Mēs nodrošinām ātru saziņu un drošību.
          </p>
          <Link 
            href="/ievietot" 
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-16 py-6 rounded-2xl text-2xl font-black hover:from-blue-700 hover:to-purple-700 shadow-2xl hover:shadow-3xl transition-all transform hover:-translate-y-2 mx-auto"
          >
            ➕ Ievietot sludinājumu GRATIS
          </Link>
        </div>
      </div>

      {/* ✅ KOMENTĀRU MODĀLIS - uzlabots ar selectedItem */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in zoom-in duration-200">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/50">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-3xl font-black mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  💬 Sazināties ar pārdevēju
                </h3>
                {selectedItem && (
                  <p className="text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded-xl font-medium">
                    {selectedItem.title} • {selectedItem.price ? `${selectedItem.price}€` : 'Cena vienojoties'}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  setShowModal(false)
                  setSelectedId(null)
                  setSelectedItem(null)
                  setUserName('')
                  setUserEmail('')
                  setCommentText('')
                }}
                className="text-3xl font-black text-gray-500 hover:text-gray-700 p-2 rounded-2xl hover:bg-gray-200 transition-all w-12 h-12 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            <div className="space-y-5">
              <input
                type="text"
                placeholder="✏️ Tavs vārds *"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 shadow-sm focus:shadow-md transition-all text-lg font-medium"
              />
              <input
                type="email"
                placeholder="📧 Tavs e-pasts *"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 shadow-sm focus:shadow-md transition-all text-lg font-medium"
              />
              <textarea
                placeholder="💭 Ko vēlies teikt pārdevējam? *"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="5"
                className="w-full p-5 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-400 shadow-sm focus:shadow-md transition-all text-lg resize-vertical font-medium"
              />
              
              <div className="flex gap-4 pt-4">
                <button
                  onClick={sendComment}
                  disabled={!userName.trim() || !userEmail.trim() || !commentText.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 px-8 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-1 flex items-center justify-center space-x-3"
                >
                  <span>🚀</span>
                  <span>Nosūtīt ziņu tagad</span>
                </button>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setSelectedId(null)
                    setSelectedItem(null)
                    setUserName('')
                    setUserEmail('')
                    setCommentText('')
                  }}
                  className="flex-1 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 py-5 px-8 rounded-2xl font-bold text-xl hover:from-gray-300 hover:to-gray-400 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  ❌ Atcelt
                </button>
              </div>
              
              <p className="text-xs text-gray-500 text-center bg-blue-50 p-4 rounded-xl font-medium">
                🔒 Ziņa tiks nosūtīta droši un saglabāta sistēmā. Pārdevējs saņems e-pastu.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
