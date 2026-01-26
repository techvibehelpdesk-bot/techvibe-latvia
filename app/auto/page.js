'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AutoPage() {
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
      setError(null)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      const response = await fetch(`${supabaseUrl}/rest/v1/sludinajumi?select=*`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      })

      if (!response.ok) throw new Error('Fetch kļūda')
      const data = await response.json()
      console.log('🚗 AUTO ieraksti:', data)
      
      const filtered = data.filter(s => 
        s.category?.toLowerCase().includes('auto') && 
        s.status === 'published'
      )
      setSludinajumi(filtered)
    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 flex items-center justify-center p-8">
      <div className="animate-pulse space-y-4 text-center">
        <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl mx-auto shadow-2xl"></div>
        <p className="text-2xl font-bold text-gray-600">Ielādē auto...</p>
      </div>
    </main>
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* LIELS HERO BLOKS */}
        <div className="text-center mb-28">
          <div className="inline-flex items-center gap-6 bg-white/80 backdrop-blur-xl px-16 py-8 rounded-[3rem] shadow-2xl border border-white/50 mb-12 mx-auto max-w-4xl">
            <span className="text-7xl">🚗</span>
            <div>
              <h1 className="text-6xl lg:text-7xl font-black bg-gradient-to-r from-orange-900 via-amber-900 to-yellow-900 bg-clip-text text-transparent mb-4 leading-tight">
                Auto sludinājumi
              </h1>
              <p className="text-3xl font-bold text-slate-600">
                {sludinajumi.length} auto Rīgā
              </p>
            </div>
          </div>
          <Link href="/ievietot" className="group inline-flex items-center gap-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-black text-xl py-6 px-12 rounded-[2.5rem] shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 border border-orange-300/50">
            <span className="text-3xl group-hover:rotate-12 transition-transform duration-300">+</span>
            Pievienot auto
          </Link>
        </div>

        {/* KARTĪTES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24">
          {sludinajumi.map((item) => {
            let firstImage = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&fit=crop'
            try {
              if (item.image_urls) {
                const images = JSON.parse(item.image_urls)
                if (images && images[0]) firstImage = images[0]
              }
            } catch(e) {
              console.log('Image parse error:', item.image_urls)
            }

            return (
              <Link 
                key={item.id}
                href={`/sludinajums/${item.id}`}
                className="group bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-100/50 hover:border-orange-200 hover:-translate-y-4 transition-all duration-500 overflow-hidden hover:bg-slate-50/50 backdrop-blur-sm"
              >
                {/* BILDE */}
                <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50 mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-700 border border-orange-100">
                  <img 
                    src={firstImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 hover:brightness-105"
                    loading="lazy"
                  />
                </div>

                {/* NOSAUKUMS */}
                <h3 className="font-black text-xl sm:text-2xl lg:text-3xl mb-6 line-clamp-2 text-slate-900 group-hover:text-orange-900 transition-all duration-300 leading-tight">
                  {item.title}
                </h3>

                {/* CENA – LIELA */}
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-emerald-600 mb-6 sm:mb-8 leading-none drop-shadow-lg">
                  {item.price}€
                </div>

                {/* VIETA */}
                <p className="text-lg sm:text-xl text-slate-600 font-semibold mb-8 sm:mb-10">
                  {item.location || 'Rīga'}
                </p>

                {/* POGAS */}
                <div className="flex gap-3 sm:gap-4">
                  <Link 
                    href={`/sludinajums/${item.id}`}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl text-base sm:text-lg text-center shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] whitespace-nowrap"
                  >
                    Skatīt
                  </Link>
                  <Link 
                    href={`tel:${item.phone || '+37120000000'}`}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl text-base sm:text-lg text-center shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] whitespace-nowrap"
                  >
                    Zvanīt
                  </Link>
                </div>
              </Link>
            )
          })}
        </div>

        {/* TUKŠS STĀVOKLIS */}
        {sludinajumi.length === 0 && !error && (
          <div className="text-center py-48">
            <div className="w-48 h-48 mx-auto mb-16 p-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-[3rem] shadow-2xl flex items-center justify-center border-4 border-orange-200">
              <span className="text-8xl">🚗</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-slate-800 mb-8">Nav auto sludinājumu</h2>
            <p className="text-2xl sm:text-3xl text-slate-600 mb-16 max-w-2xl mx-auto">
              Būsi pirmais Rīgas auto tirgū!
            </p>
            <Link href="/ievietot" className="inline-flex items-center gap-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-black text-xl sm:text-2xl py-6 sm:py-8 px-12 sm:px-20 rounded-[3rem] shadow-3xl hover:shadow-4xl hover:scale-105 transition-all duration-500">
              ➕ Pievienot sludinājumu
            </Link>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto text-center py-24">
            <div className="text-6xl mb-8 text-rose-500">⚠️</div>
            <p className="text-2xl font-bold text-slate-800 mb-12">{error}</p>
            <button 
              onClick={fetchData} 
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold py-5 px-12 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Ielādēt vēlreiz
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
