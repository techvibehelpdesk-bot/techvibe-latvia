'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function VisiSludinajumi() {
  const [sludinajumi, setSludinajumi] = useState([])
  const [kategorijas, setKategorijas] = useState(['visi']) // Default
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('visi')
  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [userEmail, setUserEmail] = useState('')
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    fetchVisiSludinajumi()
  }, [])

  const fetchVisiSludinajumi = async () => {
    setLoading(true)
    
    // Ielādē visus published sludinājumus
    const { data: dati, error } = await supabase
      .from('sludinajumi')
      .select(`
        id, title, description, category, status, price, location, image_public_urls, created_at
      `)
      .eq('status', 'published')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Supabase kļūda:', error)
      setKategorijas(['visi']) // Fallback
    } else {
      console.log('📦 Ielādēti sludinājumi:', dati?.length || 0)
      
      setSludinajumi(dati || [])
      
      // VISAS unikālās kategorijas
      const visasKats = Array.from(
        new Set(dati?.map(item => item.category).filter(Boolean) || [])
      ).sort((a, b) => a.localeCompare(b))
      
      console.log('🏷️ Atrastās kategorijas:', visasKats)
      
      setKategorijas(['visi', ...visasKats])
    }
    setLoading(false)
  }

  const filteredSludinajumi = sludinajumi.filter(item => {
    const matchesSearch = !searchTerm || 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filter === 'visi' || item.category === filter
    return matchesSearch && matchesFilter
  })

  // Rest of the functions (handleSazinoties, sendComment) same as before...
  const handleSazinoties = (id) => {
    setSelectedId(id)
    setShowModal(true)
  }

  const sendComment = async () => {
    if (!userEmail || !commentText) return alert('Aizpildi laukus!')
    const { error } = await supabase.from('comments').insert({
      sludinajums_id: selectedId,
      type: 'contact',
      comment: commentText,
      user_email: userEmail
    })
    if (!error) {
      alert('Ziņa nosūtīta!')
      setShowModal(false)
      setUserEmail(''); setCommentText('')
    }
  }

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center text-xl">Ielādē...</div>

  return (
    <div className="min-h-screen bg-white">
      {/* Navigācija */}
      <nav className="bg-white border-b px-6 py-4 sticky top-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">TechVibe</Link>
          <div className="flex items-center gap-6">
            <Link href="/test-auto" className="text-blue-600 hover:underline">Auto</Link>
            <span className="font-bold text-xl">Visi ({filteredSludinajumi.length})</span>
            <Link href="/ievietot" className="bg-blue-600 text-white px-6 py-2 rounded-lg">Ievietot</Link>
          </div>
        </div>
      </nav>

      {/* Meklēšana + VISU kategoriju select */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <input
            placeholder="Meklēt..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-1 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500"
          />
          
          {/* VISAS KATEGORIJAS select */}
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-6 py-4 border rounded-xl bg-white font-medium min-w-[250px]"
          >
            <option value="visi">🧹 Visas kategorijas ({sludinajumi.length})</option>
            {kategorijas.slice(1).map(kat => { // Izslēdz 'visi'
              const count = sludinajumi.filter(i => i.category === kat).length
              return (
                <option key={kat} value={kat}>
                  {kat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} ({count})
                </option>
              )
            })}
          </select>
          
          <Link href="/ievietot" className="bg-blue-600 whitespace-nowrap text-white px-8 py-4 rounded-xl hover:bg-blue-700 shadow-lg">
            + Ievietot
          </Link>
        </div>

        {/* Debug info - DZĒS ražā! */}
        <div className="bg-yellow-50 p-4 rounded-xl mb-6 text-sm">
          <strong>Debug:</strong> Kategorijas: {kategorijas.join(', ')} | 
          Sludinājumi: {sludinajumi.length}
        </div>

        {filteredSludinajumi.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-3xl font-bold mb-4">Nav sludinājumu</h2>
            <Link href="/ievietot" className="bg-blue-600 text-white px-8 py-3 rounded-xl">
              Būt pirmais!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSludinajumi.map(item => (
              <div key={item.id} className="border rounded-xl p-4 hover:shadow-xl transition-all">
                <Link href={`/sludinajums/${item.id}`}>
                  <img src={item.image_public_urls?.[0] || '/placeholder.jpg'} 
                       alt={item.title} className="w-full h-48 object-cover rounded-lg mb-3" />
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between mb-4">
                    <span className="text-xl font-bold text-blue-600">{item.price || 'Vienojoties'}€</span>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                  </div>
                </Link>
                <button onClick={() => handleSazinoties(item.id)} 
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                  Sazināties
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modālis */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6">Sazināties</h3>
            <input type="email" placeholder="E-pasts" value={userEmail} 
                   onChange={e => setUserEmail(e.target.value)} 
                   className="w-full p-4 border rounded-xl mb-4" />
            <textarea placeholder="Ziņa" value={commentText} 
                      onChange={e => setCommentText(e.target.value)} rows={4}
                      className="w-full p-4 border rounded-xl mb-6" />
            <div className="flex gap-3">
              <button onClick={sendComment} className="flex-1 bg-blue-600 text-white py-3 rounded-xl">Nosūtīt</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-gray-200 py-3 rounded-xl">Atcelt</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
