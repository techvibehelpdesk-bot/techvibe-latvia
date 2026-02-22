'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import Image from 'next/image'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function Sludinajums({ params }) {
  const [sludinajums, setSludinajums] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [commentText, setCommentText] = useState('')

  // Kategorijas navigācijai (kā visosludinajumi)
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
    fetchSludinajums()
    fetchComments()
  }, [params.id])

  const fetchSludinajums = async () => {
    const { data, error } = await supabase
      .from('sludinajumi')
      .select('*')
      .eq('id', params.id)
      .single()
    if (error) console.error('Kļūda sludinājumā:', error)
    else setSludinajums(data)
    setLoading(false)
  }

  const fetchComments = async () => {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('sludinajums_id', params.id)
      .eq('type', 'comment')
      .order('created_at', { ascending: false })
    if (error) console.error('Kļūda komentāros:', error)
    else setComments(data || [])
  }

  const sendComment = async () => {
    if (!userName || !userEmail || !commentText) {
      return alert('Aizpildi visus laukus! *')
    }

    try {
      const response = await fetch('/api/contact-seller', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sludinajums_id: params.id,
          sender_name: userName,
          sender_email: userEmail,
          message: commentText,
          type: 'comment'  // Atšķir no message_to_seller
        })
      })

      const result = await response.json()

      if (response.ok) {
        alert('✅ Komentārs pievienots!');
        setShowCommentModal(false)
        setUserName('')
        setUserEmail('')
        setCommentText('')
        fetchComments()  // Refresh komentārus
      } else {
        alert('❌ Kļūda: ' + (result.error || 'Neizdevās pievienot'))
      }
    } catch (error) {
      alert('❌ Kļūda: ' + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div>Ielādē sludinājumu...</div>
      </div>
    )
  }

  if (!sludinajums) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">📭</div>
          <h2 className="text-2xl font-bold mb-2">Sludinājums nav atrasts</h2>
          <Link href="/sludinajumi" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">Atpakaļ uz sludinājumiem</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigācija */}
      <nav className="bg-white border-b px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">TechVibe</Link>
          <div className="flex items-center space-x-4">
            <Link href="/sludinajumi" className="font-bold text-xl px-4 bg-blue-100 py-2 rounded-lg">Visi sludinājumi</Link>
            <Link href="/ievietot" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Ievietot</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Sludinājuma detaļas */}
        <div className="bg-white border rounded-xl overflow-hidden shadow-xl mb-12">
          <div className="relative h-80 bg-gray-100 overflow-hidden">
            <Image
              src={sludinajums.image_public_urls?.[0] || '/placeholder-car.jpg'}
              alt={sludinajums.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-6">{sludinajums.title}</h1>
            <p className="text-xl text-gray-700 mb-8 whitespace-pre-wrap">{sludinajums.description}</p>
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <span className="text-4xl font-bold text-blue-600 block">
                  {sludinajums.price ? `${sludinajums.price}€` : 'Cena vienojoties'}
                </span>
                <span className="text-lg text-gray-600 block">{sludinajums.location}</span>
              </div>
              <button
                onClick={() => setShowCommentModal(true)}
                className="bg-blue-600 text-white py-4 px-8 rounded-xl font-bold text-xl hover:bg-blue-700 w-full shadow-lg hover:shadow-xl transition-all"
              >
                💬 Pievienot komentāru
              </button>
            </div>
          </div>
        </div>

        {/* Komentāru sadaļa */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Komentāri ({comments.length})</h2>
          <div className="space-y-4 mb-12">
            {comments.length === 0 ? (
              <div className="bg-gray-50 p-12 rounded-xl text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">💭</div>
                <p className="text-xl text-gray-600">Vēl nav komentāru. Būt pirmais!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-6 rounded-xl border-l-4 border-blue-500">
                  <p className="text-lg mb-3">{comment.message}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{comment.sender_name || 'Anonīms'}</span>
                    <span>{new Date(comment.created_at).toLocaleDateString('lv-LV')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Komentāra modālis */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">💭 Pievienot komentāru</h3>
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
                placeholder="Tavs komentārs *"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="5"
                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
              <div className="flex gap-3 pt-2">
                <button
                  onClick={sendComment}
                  disabled={!userName || !userEmail || !commentText}
                  className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                >
                  Pievienot komentāru
                </button>
                <button
                  onClick={() => {
                    setShowCommentModal(false)
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
                Komentārs būs redzams visiem apmeklētājiem
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
