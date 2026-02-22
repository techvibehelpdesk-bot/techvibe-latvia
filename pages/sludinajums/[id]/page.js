'use client'
import { useState, useEffect } from 'react'
// ... Supabase + visas funkcijas kā iepriekš
export default function SludinajumsPage({ params }) {
  // Fetch SINGLE sludinājums + VISU komentārus no Supabase tabulas 'komentari'
  const [sludinajums, setSludinajums] = useState(null)
  const [komentari, setKomentari] = useState([]) // ✅ RĀDĪT KOMENTĀRUS!
  
  useEffect(() => {
    fetchSludinajums()
    fetchKomentarus()
  }, [params.id])

  const fetchKomentarus = async () => {
    const { data } = await supabase
      .from('komentari') // Pārliecinies, ka tev ir 'komentari' tabula Supabase
      .select('*')
      .eq('sludinajums_id', params.id)
      .order('created_at', { ascending: false })
    setKomentari(data || [])
  }

  return (
    <div>
      {/* SLUDINĀJUMA DETALĀRĀ INFO */}
      <div>{sludinajums?.title}</div>
      
      {/* ✅ KOMENTĀRU SADAĻA */}
      <section className="mt-16">
        <h2 className="text-3xl font-bold mb-8">💬 Komentāri ({komentari.length})</h2>
        <div className="space-y-4 mb-8">
          {komentari.map(kom => (
            <div key={kom.id} className="p-6 bg-gray-50 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white font-bold">
                  {kom.sender_name[0]}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900">{kom.sender_name}</h4>
                  <p className="text-gray-700 mt-1">{kom.message}</p>
                  <p className="text-xs text-gray-500 mt-2">{new Date(kom.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* PIEVIENOT JAUNU KOMENTĀRU - izmanto to pašu modāli */}
        <button onClick={() => handleSazinoties(params.id, sludinajums)} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold">
          ➕ Pievienot komentāru
        </button>
      </section>
    </div>
  )
}
