'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function KategorijaPage({ params }) {
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [commentText, setCommentText] = useState('')

  // Kategoriju saraksts + aktīva kategorija
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

  const currentKategorija = kategorijas.find(cat => cat.slug === params.slug)?.name || 'Kategorija'

  useEffect(() => {
    fetchSludinajumi()
  }, [params.slug])

  const fetchSludinajumi = async () => {
    let query = supabase
      .from('sludinajumi')
      .select('*')
      .eq('status', 'published')
      .eq('kategorija', params.slug) // ✅ Filtrē pēc kategorijas
      .order('created_at', { ascending: false })

    setLoading(true)
    const { data, error } = await query
    if (error) console.error('Kļūda kategorijā:', error)
    else setSludinajumi(data || [])
    setLoading(false)
  }

  // ✅ VISAS 3 JAUNAS FUNKCIJAS + sendComment (kopē no iepriekšējā koda)
  const handleSazinoties = (id, item) => {
    setSelectedId(id)
    setSelectedItem(item)
    setShowModal(true)
  }

  const sendComment = async () => {
    if (!userName || !userEmail || !commentText) return alert('Aizpildi visus laukus!')
    // ... (kopē visu sendComment loģiku no iepriekšējā koda)
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
        alert('✅ Ziņa nosūtīta!')
        setShowModal(false)
        setUserName(''); setUserEmail(''); setCommentText('')
        fetchSludinajumi()
      } else {
        alert('❌ Kļūda: ' + (result.error || 'Neizdevās'))
      }
    } catch (error) {
      alert('❌ Kļūda: ' + error.message)
    }
  }

  const copyQuickMessage = (item) => {
    const message = `Interesējas par: "${item.title}" ${item.price ? `(${item.price}€)` : ''}. Kur kontakti?`
    navigator.clipboard.writeText(message)
    alert('📋 Nokopēts!')
  }

  const saveToFavorites = (item) => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    if (!favorites.find(fav => fav.id === item.id)) {
      favorites.push(item)
      localStorage.setItem('favorites', JSON.stringify(favorites))
      alert('❤️ Favorītos!')
    }
  }

  const shareWhatsApp = (item) => {
    const message = `${item.title} ${item.price ? `${item.price}€` : ''}\n${window.location.origin}/sludinajums/${item.id}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
  }

  // SLUDINĀJUMU GRID + 3 POGAS (kopē no iepriekšējā koda - tas pats!)
  const filteredSludinajumi = sludinajumi.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="min-h-screen flex items-center justify-center">Ielādē {currentKategorija}...</div>

  return (
    <div className="min-h-screen bg-white">
      {/* NAV + MEKLĒŠANA AR KATEGORIJAS NOSAUKUMU */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 sticky top-0 z-10 shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-black">TechVibe</Link>
          <div className="flex items-center space-x-4">
            <Link href="/sludinajumi" className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl font-bold">
              ← Atpakaļ uz visiem
            </Link>
            <span className="text-xl font-bold px-6 py-3 bg-white/10 rounded-2xl">
              {currentKategorija} ({filteredSludinajumi.length})
            </span>
            <Link href="/ievietot" className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl">
              ➕ Ievietot
            </Link>
          </div>
        </div>
      </nav>

      {/* PĀRējais kods identisks iepriekšējam - meklēšana, grid ar 3 pogām, modālis */}
      {/* ... Ielīmē visu no iepriekšējā koda no meklēšanas līdz beigām ... */}
      
      {/* Īss piemērs grid daļas: */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <input
          type="text"
          placeholder={`Meklēt ${currentKategorija}...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-3xl px-6 py-4 border-2 rounded-2xl focus:ring-4 focus:ring-blue-100 mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSludinajumi.map((item) => (
            // ✅ IZMANTO TO PAŠU 3 POGU KARTI NO IEPRIEKŠĒJĀ KODA!
            <div key={item.id} className="group bg-white border rounded-2xl shadow-md hover:shadow-2xl...">
              {/* ... pilna karte ar 3 pogām kā iepriekš ... */}
            </div>
          ))}
        </div>
      </div>

      {/* Modālis identisks iepriekšējam */}
    </div>
  )
}
