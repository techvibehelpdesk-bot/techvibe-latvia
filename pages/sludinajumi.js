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
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')  // Pievienoju vārdu
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

  const handleSazinoties = (id) => {
    setSelectedId(id)
    setShowModal(true)
  }

  // ✅ JAUNA sendComment funkcija - izmanto API route
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
        alert('✅ Ziņa nosūtīta pārdevējam un saglabāta!');
        setShowModal(false)
        setUserName('')
        setUserEmail('')
        setCommentText('')
        // Refresh sludinājumus
        fetchSludinajumi()
      } else {
        alert('❌ Kļūda: ' + (result.error || 'Neizdevās nosūtīt'))
      }
    } catch (error) {
      alert('❌ Kļūda sūtot ziņu: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div>Ielādē sludinājumus...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">TechVibe</Link>
          <div className="flex items-center space-x-4">
            <Link href="/sludinajumi" className="font-bold text-xl px-4 bg-blue-100 py-2 rounded-lg">Visi ({filteredSludinajumi.length})</Link>
            {kategorijas.slice(0, 6).map(({ name, slug }) => (
              <Link 
                key={slug}
                href={`/sludinajumi/${slug}`}
                className="text-blue-600 hover:underline font-medium hidden md:block"
              >
                {name}
              </Link>
            ))}
            <Link href="/ievietot" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Ievietot
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <input
            type="text"
            placeholder="Meklēt sludinājumos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-2xl px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-3 mb-8 overflow-x-auto pb-4 -mb-4 scrollbar-hide">
          <Link href="/sludinajumi" className="px-6 py-3 bg-blue-100 text-blue-800 rounded-full font-medium hover:bg-blue-200 whitespace-nowrap">
            Visas kategorijas
          </Link>
          {kategorijas.map(({ name, slug }) => (
            <Link 
              key={slug}
              href={`/sludinajumi/${slug}`}
              className="px-4 py-3 bg-gray-100 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-200 whitespace-nowrap"
            >
              {name}
            </Link>
          ))}
        </div>

        {filteredSludinajumi.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">📭</div>
            <h2 className="text-2xl font-bold mb-2">Nav atrasti sludinājumi</h2>
            <p className="text-gray-600 mb-6">Pamēģini citu meklēšanas vārdu.</p>
            <Link href="/ievietot" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">Būt pirmais!</Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSludinajumi.map((item) => (
            <div key={item.id} className="group bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
              <Link href={`/sludinajums/${item.id}`} className="block">
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={item.image_public_urls?.[0] || '/placeholder-car.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">
                      {item.price ? `${item.price}€` : 'Cena vienojoties'}
                    </span>
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{item.location}</span>
                  </div>
                </div>
              </Link>
              <div className="px-5 pb-5">
                <div className="flex gap-2">
                  <Link
                    href={`/sludinajums/${item.id}`}
                    className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg text-center font-medium hover:bg-gray-200 transition-colors"
                  >
                    Skatīt
                  </Link>
                  <button
                    onClick={() => handleSazinoties(item.id)}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                  >
                    Sazināties
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 text-center border-t">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Gribi pārdot ātri?</h2>
          <p className="text-xl text-gray-600 mb-8">Ievieto sludinājumu TechVibe un atrodi pircēju jau šodien!</p>
          <Link href="/ievietot" className="inline-block bg-blue-600 text-white px-12 py-5 rounded-xl text-xl font-bold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all">
            + Ievietot sludinājumu
          </Link>
        </div>
      </div>

      {/* Uzlabota modāļa forma */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">💬 Sazināties ar pārdevēju</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Tavs vārds *"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Tavs e-pasts *"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Ko vēlies teikt pārdevējam? *"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="4"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
              <div className="flex gap-3 pt-2">
                <button
                  onClick={sendComment}
                  disabled={!userName || !userEmail || !commentText}
                  className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  Nosūtīt ziņu
                </button>
                <button
                  onClick={() => {
                    setShowModal(false)
                    setUserName('')
                    setUserEmail('')
                    setCommentText('')
                  }}
                  className="flex-1 bg-gray-200 py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all"
                >
                  Atcelt
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">
                Ziņa tiks saglabāta un nosūtīta pārdevējam
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
