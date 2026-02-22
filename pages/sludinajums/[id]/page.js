'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function SludinajumsPage() {
  const params = useParams()
  const id = params?.id
  
  const [sludinajums, setSludinajums] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    if (id) fetchSludinajums()
  }, [id])

  const fetchSludinajums = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('sludinajumi')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) console.error('Sludinājuma kļūda:', error)
    else setSludinajums(data)
    setLoading(false)
  }

  // ✅ 3 JAUNAS FUNKCIJAS
  const handleSazinoties = () => {
    setShowModal(true)
  }

  const sendComment = async () => {
    if (!userName.trim() || !userEmail.trim() || !commentText.trim()) {
      return alert('Aizpildi laukus!')
    }
    try {
      const response = await fetch('/api/contact-seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sludinajums_id: id,
          sender_name: userName,
          sender_email: userEmail,
          message: commentText
        })
      })
      if (response.ok) {
        alert('✅ Ziņa nosūtīta!')
        setShowModal(false)
        setUserName(''); setUserEmail(''); setCommentText('')
      }
    } catch (error) {
      alert('❌ Kļūda: ' + error.message)
    }
  }

  const copyQuickMessage = () => {
    if (!sludinajums) return
    navigator.clipboard.writeText(`Interesējas par: "${sludinajums.title}" ${sludinajums.price || ''}€`)
    alert('📋 Nokopēts!')
  }

  const shareWhatsApp = () => {
    if (!sludinajums) return
    const url = `${window.location.origin}/sludinajums/${id}`
    window.open(`https://wa.me/?text=${encodeURIComponent(`${sludinajums.title} ${url}`)}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-3xl font-bold text-gray-600 animate-pulse">Ielādē sludinājumu...</div>
      </div>
    )
  }

  if (!sludinajums) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-12">
        <div className="text-6xl mb-8">❓</div>
        <h1 className="text-4xl font-black mb-4 text-gray-900">Sludinājums nav atrasts</h1>
        <Link href="/sludinajumi" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 mt-8">
          ← Atpakaļ uz sludinājumiem
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-6 sticky top-0 z-10 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/sludinajumi" className="flex items-center space-x-3 text-xl font-bold hover:underline">
            <span>←</span>
            <span>Sludinājumi</span>
          </Link>
          <div className="flex items-center space-x-4">
            <button onClick={copyQuickMessage} className="px-6 py-3 bg-white/20 rounded-2xl font-bold hover:bg-white/30">
              📋 Kopēt ziņu
            </button>
            <button onClick={shareWhatsApp} className="px-6 py-3 bg-white/20 rounded-2xl font-bold hover:bg-white/30">
              📱 WhatsApp
            </button>
          </div>
        </div>
      </nav>

      {/* SLUDINĀJUMA DETALĀJAS */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* GALVENĀ INFO */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl p-12 mb-16 border border-white/50">
          <h1 className="text-5xl font-black mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
            {sludinajums.title}
          </h1>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <img src={sludinajums.image_public_urls?.[0] || '/placeholder.jpg'} 
                   alt={sludinajums.title}
                   className="w-full h-96 object-cover rounded-3xl shadow-2xl" />
            </div>
            <div className="space-y-8">
              <div className="p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl border-l-8 border-emerald-400">
                <div className="text-6xl font-black text-emerald-600 mb-4">💰</div>
                <h2 className="text-5xl font-black text-gray-900 mb-2">
                  {sludinajums.price ? `${sludinajums.price}€` : '💭 Cena vienojoties'}
                </h2>
                <p className="text-2xl text-gray-600 font-semibold">{sludinajums.location}</p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-8 rounded-3xl">
                <h3 className="text-3xl font-bold mb-6">📝 Apraksts</h3>
                <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {sludinajums.description}
                </p>
              </div>
            </div>
          </div>
          
          {/* 3 LIELAS POGAS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t-4 border-blue-100">
            <button onClick={handleSazinoties}
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all" />
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <span className="text-5xl">💬</span>
                <span>Sazināties ar pārdevēju</span>
              </div>
            </button>
            <button onClick={copyQuickMessage}
                    className="group bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-12 px-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all">
              <div className="flex flex-col items-center space-y-4">
                <span className="text-5xl">⚡</span>
                <span>Ātri kopēt ziņu</span>
              </div>
            </button>
            <button onClick={shareWhatsApp}
                    className="group bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12 px-8 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-3 transition-all">
              <div className="flex flex-col items-center space-y-4">
                <span className="text-5xl">📱</span>
                <span>Dalīties WhatsApp</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* KOMENTĀRU MODĀLIS */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-6 animate-fade-in">
          <div className="bg-white rounded-3xl p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-3xl border border-white/50">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
                💬 Sazināties par "{sludinajums.title}"
              </h2>
              <button onClick={() => setShowModal(false)} className="text-4xl font-black hover:text-gray-700 p-3 rounded-2xl hover:bg-gray-200 w-16 h-16 flex items-center justify-center">
                ×
              </button>
            </div>
            <div className="space-y-6">
              <input type="text" placeholder="Tavs vārds *" value={userName} onChange={(e) => setUserName(e.target.value)}
                     className="w-full p-6 border-2 border-gray-200 rounded-3xl text-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent" />
              <input type="email" placeholder="Tavs e-pasts *" value={userEmail} onChange={(e) => setUserEmail(e.target.value)}
                     className="w-full p-6 border-2 border-gray-200 rounded-3xl text-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent" />
              <textarea placeholder="Tava ziņa pārdevējam *" value={commentText} onChange={(e) => setCommentText(e.target.value)} rows="6"
                        className="w-full p-6 border-2 border-gray-200 rounded-3xl text-xl focus:ring-4 focus:ring-blue-500 focus:border-transparent resize-vertical" />
              <div className="flex gap-6 pt-8">
                <button onClick={sendComment} disabled={!userName || !userEmail || !commentText}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8 px-12 rounded-3xl font-black text-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all disabled:opacity-50">
                  🚀 Nosūtīt ziņu
                </button>
                <button onClick={() => setShowModal(false)}
                        className="flex-1 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 py-8 px-12 rounded-3xl font-black text-2xl hover:from-gray-400 hover:to-gray-500 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all">
                  ❌ Atcelt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
