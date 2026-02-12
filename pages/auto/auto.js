'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

export default function AutoPage() {  // NOŅEM params!
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  // VISI TAVI MODAL STATE
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [currentSludinajumsId, setCurrentSludinajumsId] = useState('')
  const [currentSludinajumsTitle, setCurrentSludinajumsTitle] = useState('')
  const [messageType, setMessageType] = useState('comment')
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    fetchData()
  }, [search])

  // BERNIEU METODE - STRĀDĀ!
  async function fetchData() {
    try {
      setLoading(true)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      const response = await fetch(`${supabaseUrl}/rest/v1/sludinajumi?select=*&status=eq.published`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      })

      if (!response.ok) throw new Error('Supabase fetch kļūda')
      const data = await response.json()
      
      // FILTER AUTO KĀ BERNIEK
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
      console.log('🚗 AUTO OK:', filtered.length)
    } catch (err) {
      console.error('❌ AUTO Error:', err)
      setSludinajumi([])
    } finally {
      setLoading(false)
    }
  }

  // VISAS TAVAS funkcijas openChat, sendMessage - kopē no sava auto koda

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div>Ielādē auto...</div></div>
  }

  // VISU TAVU HTML UI NO AUTO KODA - bez izmaiņām!
  return (
    <div className="min-h-screen bg-white">
      {/* KOPĒ VISU NO SAVIEM SKATAMIEM AUTO UI */}
      {/* Navbar, Header, Search input ar onChange={setSearch}, Grid ar sludinajumi.map, Modal */}
    </div>
  )
}
