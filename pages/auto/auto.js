'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AutoPage() {
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // MODAL STATE
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentSludinajumsId, setCurrentSludinajumsId] = useState('')
  const [currentSludinajumsTitle, setCurrentSludinajumsTitle] = useState('')
  const [messageType, setMessageType] = useState('comment')
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    fetchData()
  }, [search])

  async function fetchData() {
    try {
      setLoading(true)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      const response = await fetch(`${supabaseUrl}/rest/v1/sludinajumi?select=*&status=eq.published&category=ilike.*auto*`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      })

      if (!response.ok) throw new Error('Fetch kļūda')
      const data = await response.json()
      
      let filtered = data.filter(s => 
        s.category?.toLowerCase().includes('auto')
      )
      
      if (search.trim()) {
        filtered = filtered.filter(s => 
          s.title?.toLowerCase().includes(search.toLowerCase()) ||
          s.description?.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      setSludinajumi(filtered)
      console.log('✅ AUTO SUPABASE:', filtered.length, 'sludinājumi')
    } catch (err) {
      console.error('❌ AUTO Error:', err)
      setSludinajumi([])
    } finally {
      setLoading(false)
    }
  }

  const openChat = (id, title) => {
    setCurrentSludinajumsId(id)
    setCurrentSludinajumsTitle(title)
    setIsChatOpen(true)
  }

  const sendMessage = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const supabase = (await import('@supabase/supabase-js')).createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase
      .from('comments')
      .insert({
        sludinajums_id: currentSludinajumsId,
        type: messageType,
        comment: messageText.trim(),
        user_email: 'anon@tekvibe.lv'
      })

    if (error) {
      alert('❌ ' + error.message)
    } else {
      setMessageText('')
      setIsChatOpen(false)
      alert('✅ Ziņa nosūtīta!')
      fetchData() // Refresh komentāru sarakstu
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-8"></div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🚗</h1>
          <p className="text-xl text-gray-600">Ielādē auto sludinājumus...</p>
        </div>
      </div>
    )
  }

  // KOPĒ VISU UI NO TAVA AUTO KODA (no navbar līdz footer + modal)
  // Tikai nomainīt fetchData funkciju un izmantot setSludinajumi(filtered)
  
  return (
    <div className="min-h-screen bg-white">
      {/* VISU TAVU UI NO AUTO KODA ŠEIT - bez izmaiņām */}
      {/* Navbar, Header, Search, Grid, CTA, Footer, Modal - pilnīgi identiski */}
      
      {/* Piemērs grid daļai */}
      <div className="max-w-7xl mx-auto px-6 py-12 pb-24">
        {/* ... tavs header un search ... */}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sludinajumi.length > 0 ? (
            sludinajumi.map((item) => {
              const firstImage = item.image_public_urls?.[0] || 'https://via.placeholder.com/400x300/f8f9fa/f8f9fa?text=🚗+Auto'
              return (
                <div key={item.id} className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-100">
                  {/* TAVS KARTES HTML */}
                </div>
              )
            })
          ) : (
            <div className="col-span-full text-center py-32">
              <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <span className="text-4xl">🚗</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Nav auto sludinājumu</h2>
              <Link href="/ievietot?kategorija=auto" className="bg-green-600 text-white px-12 py-5 rounded-2xl text-xl font-bold">
                ➕ Publicēt 1. auto
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* VISU TAVU MODAL KĀDU */}
    </div>
  )
}
