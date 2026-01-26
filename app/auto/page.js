// app/auto/page.js
'use client'

import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default function AutoPage() {
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchListings()
  }, [])

  const fetchListings = async () => {
    try {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('category', 'auto')
        .eq('status', 'published')
        .order('created_at', { ascending: false })

      if (error) throw error
      setListings(data || [])
    } catch (error) {
      alert('Kļūda: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 flex items-center justify-center">
        <div className="text-4xl">🚗 Loading...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-white/80 backdrop-blur-xl hover:bg-white border border-orange-200 rounded-2xl shadow-xl text-lg font-bold text-orange-900">
            ← Atpakaļ
          </Link>
          <div className="text-6xl mb-4">🚗</div>
          <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
            Auto un moto
          </h1>
          <p className="text-2xl text-orange-800 font-semibold">{listings.length} sludinājumi</p>
        </div>

        {/* GRID */}
        {listings.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-8">🚗</div>
            <h2 className="text-4xl font-bold text-gray-600 mb-4">Vēl nav sludinājumu</h2>
            <Link 
              href="/ievietot" 
              className="bg-gradient-to-r from-orange-600 to-yellow-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition-all"
            >
              ➕ Pirmais sludinājums
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {listings.map((listing) => (
              <Link 
                key={listing.id} 
                href={`/sludinajums/${listing.id}`}
                className="group bg-white/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all border border-orange-100 hover:border-orange-300"
              >
                {/* ATTĒLS */}
                <div className="w-full h-64 rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform">
                  {listing.image_public_urls && listing.image_public_urls.length > 0 ? (
                    <img 
                      src={listing.image_public_urls[0]} 
                      alt={listing.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      📷
                    </div>
                  )}
                </div>

                {/* SATURS */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {listing.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{listing.location}</span>
                    <span className="font-bold text-orange-600 text-lg">
                      {listing.price ? `${listing.price.toLocaleString()}€` : 'Dāvanā'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-orange-700 mt-2">
                    📞 {listing.phone}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-orange-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Publicēts tagad</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                    {listing.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
