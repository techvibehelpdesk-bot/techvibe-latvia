'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 50%, #fde68a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{fontSize: '4rem', color: '#92400e'}}>👶 Ielādē...</div>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fefce8 0%, #fef9c3 50%, #fde68a 100%)',
      padding: '2rem 1rem',
      color: '#92400e'
    }}>
      <div style={{maxWidth: '1400px', margin: '0 auto'}}>
        
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '4rem',
          position: 'relative'
        }}>
          <Link href="/kategorijas" style={{
            position: 'absolute', left: '0', top: '0',
            background: 'rgba(255,255,255,0.2)', color: '#92400e',
            padding: '0.75rem 1.5rem', borderRadius: '50px',
            fontWeight: '600', textDecoration: 'none'
          }}>← Atpakaļ kategorijās</Link>
          
          <div style={{fontSize: '6rem', marginBottom: '1rem'}}>👶</div>
          <h1 style={{
            fontSize: '4rem', fontWeight: 'bold',
            textShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>Bērniem sludinājumi</h1>
          <p style={{fontSize: '1.5rem', opacity: 0.9}}>
            Rotaļlietas • Apģērbs • {sludinajumi.length} sludinājumi Rīgā
          </p>
        </div>

        {/* Filtrs */}
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          padding: '1.5rem 2rem',
          marginBottom: '3rem',
          display: 'flex', flexWrap: 'wrap',
          gap: '1rem', alignItems: 'center'
        }}>
          <input 
            placeholder="Meklēt bērniem (rotaļlietas, apģērbs...)" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1, minWidth: '300px',
              padding: '1rem 1.5rem', borderRadius: '50px',
              border: 'none', background: 'rgba(255,255,255,0.9)',
              fontSize: '1.1rem', color: '#000'
            }} 
          />
          <select style={{padding: '1rem 1.5rem', borderRadius: '50px', border: 'none'}}>
            <option>Jaunākie</option>
            <option>Cena augoša</option>
            <option>Cena dilstoša</option>
          </select>
          <Link href="/ievietot?kategorija=berniem" style={{
            background: 'white', color: '#92400e',
            padding: '1rem 2.5rem', borderRadius: '50px',
            fontWeight: 'bold', textDecoration: 'none', whiteSpace: 'nowrap'
          }}>➕ Ievietot sludinājumu</Link>
        </div>

        {/* Sludinājumi */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(370px, 1fr))', gap: '2rem'}}>
          {sludinajumi.map((item) => {
            const firstImage = item.image_public_urls?.[0] || 
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'

            return (
              <Link key={item.id} href={`/sludinajums/${item.id}`} style={{
                background: 'rgba(255,255,255,0.95)',
                borderRadius: '2rem', overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
                transition: 'all 0.4s', textDecoration: 'none',
                color: 'initial', display: 'block'
              }}>
                <div style={{
                  height: '210px', 
                  backgroundImage: `url(${firstImage})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    background: '#f59e0b', color: 'white',
                    padding: '0.5rem 1rem', borderRadius: '50px',
                    fontWeight: 'bold', fontSize: '0.875rem'
                  }}>Pārdod</div>
                </div>
                <div style={{padding: '2.5rem'}}>
                  <h3 style={{
                    fontSize: '1.4rem', fontWeight: 'bold',
                    marginBottom: '1rem', lineHeight: '1.3', color: '#1f2937'
                  }}>
                    {item.title}
                  </h3>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginBottom: '1rem'
                  }}>
                    <p style={{
                      fontSize: '1.75rem', fontWeight: 'bold',
                      color: '#059669', margin: 0
                    }}>
                      {item.price ? `${item.price.toLocaleString()}€` : 'Dāvanā'}
                    </p>
                    <span style={{
                      background: 'rgba(255,255,255,0.5)',
                      padding: '0.5rem 1rem', borderRadius: '1rem',
                      fontSize: '0.9rem', color: '#1f2937'
                    }}>
                      {item.location || 'Rīga'}
                    </span>
                  </div>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <span style={{
                      background: 'rgba(253,230,138,0.5)',
                      color: '#92400e', padding: '0.375rem 0.875rem',
                      borderRadius: '1rem', fontSize: '0.85rem',
                      fontWeight: '600'
                    }}>
                      Bērniem
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        {sludinajumi.length === 0 && (
          <div style={{
            textAlign: 'center', marginTop: '4rem',
            padding: '3rem 2rem', background: 'rgba(255,255,255,0.1)',
            borderRadius: '2rem', backdropFilter: 'blur(20px)'
          }}>
            <div style={{fontSize: '8rem', marginBottom: '1rem'}}>👶</div>
            <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
              Nav sludinājumu bērniem
            </h2>
            <Link href="/ievietot?kategorija=berniem" style={{
              background: 'white', color: '#92400e',
              padding: '1.5rem 4rem', borderRadius: '50px',
              fontSize: '1.5rem', fontWeight: 'bold',
              textDecoration: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              ➕ Publicē savu pirmo – BEZ MAKSAS!
            </Link>
          </div>
        )}

        {sludinajumi.length > 0 && (
          <div style={{
            textAlign: 'center', marginTop: '4rem',
            padding: '3rem 2rem', background: 'rgba(255,255,255,0.1)',
            borderRadius: '2rem', backdropFilter: 'blur(20px)'
          }}>
            <h2 style={{fontSize: '2.5rem', marginBottom: '1rem'}}>
              Publicēt savu sludinājumu!
            </h2>
            <Link href="/ievietot?kategorija=berniem" style={{
              background: 'white', color: '#92400e',
              padding: '1.5rem 4rem', borderRadius: '50px',
              fontSize: '1.5rem', fontWeight: 'bold',
              textDecoration: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
            }}>
              ➕ Publicēt tagad – BEZ MAKSAS!
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
