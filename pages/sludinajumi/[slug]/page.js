'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { useParams } from 'next/navigation' // ✅ Next.js 14 hook

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function KategorijaPage() {
  const params = useParams() // ✅ Droši nolasīt slug
  const slug = params?.slug // ✅ Null check
  
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [commentText, setCommentText] = useState('')

  // Kategoriju saraksts
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

  // ✅ DROŠA kategorijas atrašana
  const currentKategorija = kategorijas.find(cat => cat.slug === slug)?.name || 'Kategorija'
  
  useEffect(() => {
    if (slug) fetchSludinajumi()
  }, [slug])

  const fetchSludinajumi = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('sludinajumi')
      .select('*')
      .eq('status', 'published')
      .eq('kategorija', slug) // Filtrē pēc kategorijas
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Kļūda kategorijā ' + slug + ':', error)
      setSludinajumi([])
    } else {
      setSludinajumi(data || [])
    }
    setLoading(false)
  }

  const filteredSludinajumi = sludinajumi.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // ✅ 3 JAUNAS FUNKCIJAS + sendComment (identiskas)
  const handleSazinoties = (id, item) => {
    setSelectedId(id); setSelectedItem(item); setShowModal(true)
  }

  const sendComment = async () => {
    if (!userName.trim() || !userEmail.trim() || !commentText.trim()) {
      return alert('❌ Aizpildi visus laukus!')
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
      if (response.ok) {
        alert('✅ Ziņa nosūtīta pārdevējam!')
        setShowModal(false)
        setUserName(''); setUserEmail(''); setCommentText('')
        fetchSludinajumi()
      } else {
        alert('❌ Kļūda nosūtot')
      }
    } catch (error) {
      alert('❌ ' + error.message)
    }
  }

  const copyQuickMessage = (item) => {
    navigator.clipboard.writeText(`Interesējas: "${item.title}" ${item.price || ''}€`)
    alert('📋 Nokopēts!')
  }

  const saveToFavorites = (item) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (!favorites.find(f => f.id === item.id)) {
      localStorage.setItem('favorites', JSON.stringify([...favorites, item]))
      alert('❤️ Favorītos!')
    }
  }

  const shareWhatsApp = (item) => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${item.title} ${window.location.origin}/sludinajums/${item.id}`)}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-gray-600 animate-pulse">
          Ielādē {currentKategorija} sludinājumus...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-6 sticky top-0 z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-black">🏠 TechVibe</Link>
            <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl font-black text-xl shadow-lg">
              {currentKategorija}
            </span>
            <span className="text-lg font-bold bg-white/10 px-4 py-2 rounded-xl">
              {filteredSludinajumi.length} sludinājumi
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sludinajumi" className="px-8 py-3 bg-white/20 backdrop-blur-sm rounded-2xl font-bold hover:bg-white/30 transition-all">
              ← Visi sludinājumi
            </Link>
            <Link href="/ievietot" className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-black shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all">
              ➕ Ievietot
            </Link>
          </div>
        </div>
      </nav>

      {/* SATURS - IDENTISKS VISI SLUDINĀJUMIEM */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <input
          type="text"
          placeholder={`🔍 Meklēt ${currentKategorija} sludinājumos...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-4xl px-8 py-5 border-2 border-gray-200 rounded-3xl focus:ring-4 focus:ring-blue-500 focus:border-transparent shadow-xl mb-16 text-lg"
        />

        {filteredSludinajumi.length === 0 ? (
          <div className="text-center py-32">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center text-5xl">
              📭
            </div>
            <h2 className="text-4xl font-black mb-6 text-gray-900">{currentKategorija}</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Šajā kategorijā pagaidām nav sludinājumu. Būt pirmais!
            </p>
            <Link href="/ievietot" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-3xl text-2xl font-black shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all">
              ✨ Ievietot 1. sludinājumu
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredSludinajumi.map((item) => (
              // ✅ 3 POGU KARTE NO IEPRIEKŠĒJĀ KODA (kopē precīzi!)
              <div key={item.id} className="group bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl shadow-xl hover:shadow-3xl transition-all hover:-translate-y-3 overflow-hidden">
                <Link href={`/sludinajums/${item.id}`} className="block">
                  <div className="h-64 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                    <img src={item.image_public_urls?.[0] || '/placeholder.jpg'} 
                         alt={item.title} 
                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-8">
                    <h3 className="font-black text-2xl mb-4 line-clamp-2 leading-tight text-gray-900 group-hover:text-blue-600">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 text-lg">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        {item.price ? `${item.price}€` : '💰 Vienojoties'}
                      </span>
                      <span className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 font-bold rounded-xl">
                        {item.location}
                      </span>
                    </div>
                  </div>
                </Link>
                
                {/* 3 JAUNAS POGAS */}
                <div className="px-8 pb-8 pt-4 space-y-3">
                  <Link href={`/sludinajums/${item.id}`} 
                        className="block w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 py-5 px-8 rounded-2xl font-black text-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border">
                    👁️ Pilns apraksts
                  </Link>
                  <button onClick={() => handleSazinoties(item.id, item)}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 px-8 rounded-2xl font-black text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all">
                    💬 Komentēt tūlīt
                  </button>
                  <div className="flex gap-3">
                    <button onClick={() => copyQuickMessage(item)} className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center space-x-2 text-sm">
                      <span>⚡</span><span>Kopēt</span>
                    </button>
                    <button onClick={() => saveToFavorites(item)} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center">
                      ❤️
                    </button>
                    <button onClick={() => shareWhatsApp(item)} className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center">
                      📱
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODĀLIS - kopē no iepriekšējā koda */}
      {showModal && (
        // ... pilns modālis kā iepriekš ...
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          {/* Modāļa saturs */}
        </div>
      )}
    </div>
  )
}
