import { useState, useEffect } from 'react'

export default function AutoDebug() {
  const [debug, setDebug] = useState('Ielādē diagnostiku...')
  const [rawData, setRawData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    debugAll()
  }, [])

  async function debugAll() {
    try {
      console.log('🔍 DEBUG START')
      
      // 1. ENV CHECK
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      console.log('📍 URL:', supabaseUrl ? 'OK' : '❌ NULL!')
      console.log('🔑 KEY:', supabaseKey ? 'OK (censored)' : '❌ NULL!')
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('ENV NULL - pievieno Vercel dashboard!')
      }

      setDebug('1. ENV OK')

      // 2. RAW FETCH BEZ FILTRA
      const url = `${supabaseUrl}/rest/v1/sludinajumi?select=*`
      console.log('🌐 Fetch URL:', url)
      
      const response = await fetch(url, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      })

      console.log('📡 Response status:', response.status)
      
      if (!response.ok) {
        const errText = await response.text()
        console.error('❌ Response ERROR:', errText)
        throw new Error(`HTTP ${response.status}: ${errText}`)
      }

      const data = await response.json()
      console.log('📊 RAW DATA COUNT:', data.length)
      console.log('📋 PIRMIE 3 ieraksti:', data.slice(0,3))
      
      setRawData(data)
      setDebug(`2. RAW OK: ${data.length} ieraksti`)

      // 3. AUTO FILTER TEST
      const autoFiltered = data.filter(s => 
        s.category?.toLowerCase().includes('auto') || 
        s.title?.toLowerCase().includes('auto')
      )
      console.log('🚗 AUTO FILTER:', autoFiltered.length, autoFiltered.slice(0,2))
      
      setDebug(`3. AUTO: ${autoFiltered.length} atrasti`)

    } catch (err) {
      console.error('💥 FULL ERROR:', err)
      setError(err.message)
      setDebug(`❌ ERROR: ${err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-mono text-sm">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-400">🔍 AUTO DEBUG</h1>
        
        <div className="bg-gray-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl mb-6">Status: <span className={`font-bold ${error ? 'text-red-400' : 'text-green-400'}`}>{debug}</span></h2>
          
          {error && (
            <div className="bg-red-900/50 border border-red-500 p-6 rounded-xl">
              <pre className="whitespace-pre-wrap text-red-300">{error}</pre>
            </div>
          )}
          
          {rawData && (
            <details className="mt-8">
              <summary className="cursor-pointer p-4 bg-blue-900 rounded-xl mb-4 hover:bg-blue-800">📊 RAW DATA ({rawData.length})</summary>
              <pre className="bg-gray-950 p-6 rounded-xl overflow-auto max-h-96 text-xs">
                {JSON.stringify(rawData.slice(0,5), null, 2)}
              </pre>
            </details>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-gray-800 p-6 rounded-2xl">
            <h3 className="font-bold mb-4 text-green-400">1. Pārbaudi Console (F12)</h3>
            <ul className="space-y-2">
              <li>• URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅' : '❌'}</li>
              <li>• KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅' : '❌'}</li>
              <li>• Response: skaties Network tab</li>
              <li>• Raw count: {rawData?.length || '?'}</li>
            </ul>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-2xl">
            <h3 className="font-bold mb-4 text-yellow-400">2. Ja 0 auto ierakstu:</h3>
            <ul className="space-y-2 text-sm">
              <li>• Supabase → Table sludinajumi</li>
              <li>• Pievieno test: category="auto", status="published"</li>
              <li>• Vai title satur "auto"</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-8 bg-green-900/30 border-2 border-green-500 rounded-3xl">
          <h3 className="text-2xl font-bold mb-4 text-green-300">NEXT: Kad debug OK</h3>
          <p>Copy console info man → uzrakstīšu FINAL kodu!</p>
        </div>
      </div>
    </div>
  )
}
