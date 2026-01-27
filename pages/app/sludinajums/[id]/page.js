'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function Sludinajums() {
  const params = useParams()
  const id = params.id
  const [sludinajums, setSludinajums] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) fetchSludinajums()
  }, [id])

  async function fetchSludinajums() {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      const response = await fetch(`${supabaseUrl}/rest/v1/sludinajumi?eq.id=${id}&select=*`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      })

      if (!response.ok) throw new Error('Sludinājums nav atrasts')
      const data = await response.json()
      
      if (data.length === 0) throw new Error('Sludinājums nav atrasts')
      setSludinajums(data[0])
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      Ielādē sludinājumu...
    </div>
  )

  if (!sludinajums) return (
    <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{textAlign: 'center'}}>
        <h1>Sludinājums nav atrasts</h1>
        <Link href="/kategorijas" style={{color: '#3b82f6', textDecoration: 'underline'}}>Atpakaļ kategorijās</Link>
      </div>
    </div>
  )

  const firstImage = sludinajums.image_public_urls?.[0] || '/placeholder.jpg'

  return (
    <div style={{minHeight: '100vh', padding: '2rem 1rem', maxWidth: '1200px', margin: '0 auto'}}>
      {/* BACK */}
      <Link href="/kategorijas" style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        background: 'white', padding: '0.75rem 1.5rem', borderRadius: '9999px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)', textDecoration: 'none', color: '#1f2937'
      }}>
        ← Atpakaļ kategorijās
      </Link>

      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', marginTop: '2rem'}}>
        {/* BILDE GALERIJA */}
        <div>
          <img 
            src={firstImage} 
            alt={sludinajums.title}
            style={{
              width: '100%', height: '500px', objectFit: 'cover',
              borderRadius: '1.5rem', boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
            }}
          />
          {sludinajums.image_public_urls && sludinajums.image_public_urls.length > 1 && (
            <div style={{display: 'flex', gap: '0.5rem', marginTop: '1rem', overflowX: 'auto'}}>
              {sludinajums.image_public_urls.slice(1).map((img, i) => (
                <img key={i} src={img} alt="mini" style={{
                  width: '100px', height: '100px', objectFit: 'cover',
                  borderRadius: '0.75rem', cursor: 'pointer', flexShrink: 0
                }} />
              ))}
            </div>
          )}
        </div>

        {/* INFO */}
        <div>
          <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>
            {sludinajums.title}
          </h1>
          
          <div style={{display: 'flex', gap: '2rem', marginBottom: '2rem'}}>
            <div style={{
              background: '#10b981', color: 'white', padding: '1rem 2rem',
              borderRadius: '1rem', fontSize: '2rem', fontWeight: 'bold'
            }}>
              {sludinajums.price ? `${sludinajums.price.toLocaleString()}€` : 'Dāvanā'}
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              background: '#f3f4f6', padding: '1rem 1.5rem', borderRadius: '1rem'
            }}>
              📍 {sludinajums.city || sludinajums.location || 'Rīga'}
            </div>
          </div>

          <div style={{
            background: 'white', padding: '2rem', borderRadius: '1.5rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>
              📝 Apraksts
            </h3>
            <p style={{lineHeight: '1.7', color: '#374151'}}>
              {sludinajums.description || 'Nav apraksta'}
            </p>
          </div>

          <div style={{marginTop: '2rem'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
              📞 {sludinajums.phone}
            </div>
            <div style={{fontSize: '0.875rem', color: '#6b7280'}}>
              Publicēts: {new Date(sludinajums.created_at).toLocaleDateString('lv-LV')}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
