'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'  // ← PIEVIENOTS

export default function BerniemPage() {
  const [sludinajumi, setSludinajumi] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      setLoading(true)
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
      
      let filtered = data.filter(s => 
        s.category?.toLowerCase().includes('berniem') && 
        s.status === 'published'
      )
      
      if (search) {
        filtered = filtered.filter(s => 
          s.title?.toLowerCase().includes(search.toLowerCase()) ||
          s.description?.toLowerCase().includes(search.toLowerCase())
        )
      }
      
      setSludinajumi(filtered)
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 flex items-center justify-center">
      <div className="text-6xl">👶 Ielādē...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 py-8 px-4 text-amber-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <Link 
            href="/kategorijas" 
            className="absolute left-0 top-0 bg-white/20 backdrop-blur-sm text-amber-800 px-6 py-3 rounded-full font-semibold no-underline hover:bg-white/30 transition-all"
          >
            ← Atpakaļ kategorijās
          </Link>
          
          <div className="text-7xl mb-4">👶</div>
          <h1 className="text-5xl md:text-6xl font-black mb-4 drop-shadow-lg">
            Bērniem sludinājumi
          </h1>
          <p className="text-2xl opacity-90">
            RotaļliJas • Apģērbs • {sludinajumi.length} sludinājumi Rīgā
          </p>
        </div>

        {/* Filtrs */}
        <div className="bg-white/15 backdrop-blur-xl rounded-3xl p-6 mb-12 flex flex-wrap items-center gap-4">
          <input 
            placeholder="Meklēt bērniem (rotaļlietas, apģērbs...)" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[300px] px-6 py-4 rounded-full border-none bg-white/90 text-lg placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all"
          />
          <select className="px-6 py-4 rounded-full border-none bg-white/90 text-lg">
            <option>Jaunākie</option>
            <option>Cena augoša</option>
            <option>Cena dilstoša</option>
          </select>
          <Link 
            href="/ievietot?kategorija=berniem"
            className="bg-white text-amber-800 px-10 py-4 rounded-full font-bold no-underline whitespace-nowrap hover:shadow-xl hover:scale-105 transition-all shadow-lg"
          >
            ➕ Ievietot sludinājumu
          </Link>
        </div>

        {/* PRODUCT CARDS GRID ← JAUNS DIZAINS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {sludinajumi.map((item) => {
            const firstImage = item.image_public_urls?.[0] || 'https://via.placeholder.com/300x200/FF6B35/white?text=No+Image';
            
            return (
              <ProductCard 
                key={item.id}
                imageUrl={firstImage}
                price={item.price ? `${item.price.toLocaleString()}€` : 'Dāvanā'}
                title={item.title}
                description={`${item.location || 'Rīga'} • Bērniem`}
                buttonText="Apskatīt sludinājumu"
              />
            );
          })}
        </div>

        {/* CTA */}
        {sludinajumi.length === 0 && (
          <div className="text-center mt-16 p-12 bg-white/10 rounded-3xl backdrop-blur-xl">
            <div className="text-9xl mb-4">👶</div>
            <h2 className="text-4xl mb-4 font-bold">Nav sludinājumu bērniem</h2>
            <Link 
              href="/ievietot?kategorija=berniem"
              className="bg-white text-amber-800 px-16 py-6 rounded-full text-2xl font-bold no-underline shadow-2xl hover:scale-105 transition-all"
            >
              ➕ Publicē savu pirmo – BEZ MAKSAS!
            </Link>
          </div>
        )}

        {sludinajumi.length > 0 && (
          <div className="text-center mt-16 p-12 bg-white/10 rounded-3xl backdrop-blur-xl">
            <h2 className="text-4xl mb-4 font-bold">Publicēt savu sludinājumu!</h2>
            <Link 
              href="/ievietot?kategorija=berniem"
              className="bg-white text-amber-800 px-16 py-6 rounded-full text-2xl font-bold no-underline shadow-2xl hover:scale-105 transition-all"
            >
              ➕ Publicēt tagad – BEZ MAKSAS!
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
