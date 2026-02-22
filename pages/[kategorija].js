// pages/[kategorija].js
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getServerSideProps({ params }) {
  const { kategorija } = params;
  
  const { data: sludinajumi } = await supabase
    .from('sludinajumi')
    .select('*')
    .eq('status', 'published')
    .eq('category', kategorija)
    .order('created_at', { ascending: false });

  return {
    props: {
      sludinajumi,
      kategorija
    }
  };
}

export default function KategorijasSludinajumi({ sludinajumi, kategorija }) {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">TechVibe</Link>
          <div className="flex items-center space-x-6">
            <Link href="/sludinajumi/auto" className="text-blue-600 hover:underline font-medium">Auto</Link>
            <Link href="/sludinajumi/darbs-vakances" className="text-blue-600 hover:underline font-medium">Darbs</Link>
            <Link href="/sludinajumi" className="font-bold text-xl px-4">Visi sludinājumi ({sludinajumi?.length || 0})</Link>
            <Link href="/ievietot" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">Ievietot</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link href="/sludinajumi" className="inline-flex items-center text-blue-600 hover:underline mb-8">
          ← Atpakaļ uz visiem
        </Link>
        <h1 className="text-3xl font-bold mb-8">Sludinājumi: {kategorija.replace(/-/g, ' ')}</h1>
        
        {sludinajumi?.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">📭</div>
            <h2 className="text-2xl font-bold mb-2">Nav sludinājumu</h2>
            <p className="text-gray-600 mb-6">Šajā kategorijā vēl nav sludinājumu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sludinajumi?.map((item) => (
              <div key={item.id} className="group bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                <Link href={`/sludinajums/${item.id}`} className="block">
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img 
                      src={item.image_public_urls?.[0] || '/placeholder-car.jpg'} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 leading-tight">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-2xl font-bold text-blue-600">
                        {item.price ? `${item.price}€` : 'Cena vienojoties'}
                      </span>
                      <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">{item.location}</span>
                    </div>
                  </div>
                </Link>
                <div className="px-5 pb-5">
                  <div className="flex gap-2">
                    <Link 
                      href={`/sludinajums/${item.id}`} 
                      className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg text-center font-medium hover:bg-gray-200"
                    >
                      Skatīt
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
