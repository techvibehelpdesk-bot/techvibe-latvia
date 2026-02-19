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
  const [filter, setFilter] = useState('visi')
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [userEmail, setUserEmail] = useState('')
  const [commentText, setCommentText] = useState('')

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

  const filteredSludinajumi = sludinajumi.filter(item => {
    const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'visi' || item.category === filter
    return matchesSearch && matchesFilter
  })

  const handleSazinoties = (id) => {
    setSelectedId(id)
    setShowModal(true)
  }

  const sendComment = async () => {
    if (!userEmail || !commentText) return alert('Aizpildi visus laukus!')

    const { error } = await supabase.from('comments').insert({
      sludinajums_id: selectedId,
      type: 'contact',
      comment: commentText,
      user_email: userEmail
    })

    if (!error) {
      alert('Ziņa nosūtīta pārdevējam!')
      setShowModal(false)
      setUserEmail('')
      setCommentText('')
    } else {
      alert('Kļūda sūtot ziņu')
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
      {/* Navigācija */}
      <nav className="bg-white border-b px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">TechVibe</Link>
          <div className="flex items-center space-x-6">
            <Link href="/test-auto" className="text-blue-600 hover:underline font-medium">Auto</Link>
            <Link href="/darbs-vakances" className="text-blue-600 hover:underline font-medium">Darbs</Link>
            <span className="font-bold text-xl px-4">Visi sludinājumi ({filteredSludinajumi.length})</span>
            <Link href="/ievietot" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Ievietot
            </Link>
          </div>
        </div>
      </nav>

      {/* Meklēšana + filtri */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Meklēt sludinājumos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 border rounded-lg"
          >
            <option value="visi">Visas kategorijas</option>
            <option value="telefoni">Telefoni</option>
            <option value="datori">Datori</option>
            <option value="auto">Auto</option>
          </select>
          <Link href="/ievietot" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium">
            Ievietot sludinājumu
          </Link>
        </div>

        {/* Tukšs stāvoklis */}
        {filteredSludinajumi.length === 0 && (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              📭
            </div>
            <h2 className="text-2xl font-bold mb-2">Nav atrasti sludinājumi</h2>
            <p className="text-gray-600 mb-6">Pamēģini citu meklēšanas vārdu vai kategoriju.</p>
            <Link href="/ievietot" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
              Būt pirmais!
            </Link>
          </div>
        )}

        {/* Sludinājumu grid */}
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

      {/* CTA apakšā */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 text-center border-t">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Gribi pārdot ātri?</h2>
          <p className="text-xl text-gray-600 mb-8">Ievieto sludinājumu TechVibe un atrodi pircēju jau šodien!</p>
          <Link
            href="/ievietot"
            className="inline-block bg-blue-600 text-white px-12 py-5 rounded-xl text-xl font-bold hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
          >
            + Ievietot sludinājumu
          </Link>
        </div>
      </div>

      {/* Sazināties modālis */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6">Sazināties ar pārdevēju</h3>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Tavs e-pasts *"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <textarea
                placeholder="Ko vēlies teikt pārdevējam? *"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="4"
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
              <div className="flex gap-3 pt-2">
                <button
                  onClick={sendComment}
                  disabled={!userEmail || !commentText}
                  className="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  Nosūtīt ziņu
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 py-4 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                >
                  Atcelt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
