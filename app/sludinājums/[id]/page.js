// app/sludinajums/[id]/page.js  ← PRECĪZI ŠĒJA STRUKTŪRA!
import { notFound } from "next/navigation";
import { createClient } from '@supabase/supabase-js';
import Link from "next/link";
import Image from "next/image";

async function fetchSludinajums(id) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  const { data, error } = await supabase
    .from('sludinajumi')
    .select('*')
    .eq('id', id)
    .eq('status', 'published')  // ← JŪSU SUPABASE: published!
    .single();

  if (error || !data) {
    console.error('Sludinājuma kļūda:', error?.message || 'Nav atrasts');
    notFound();
  }

  return data;
}

export default async function SludinajumaLapa({ params }) {
  const sludinajums = await fetchSludinajums(params.id);

  return (
    <>
      <main className="max-w-4xl mx-auto p-6 md:p-8 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-6xl mx-auto">
          
          {/* Galvenais attēls */}
          <div className="relative h-80 md:h-96 bg-gradient-to-r from-blue-100 to-indigo-100">
            {sludinajums.image_url && (
              <Image
                src={sludinajums.image_url}
                alt={sludinajums.title}
                fill
                className="object-cover"
                priority
              />
            )}
            {!sludinajums.image_url && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Nav attēla
              </div>
            )}
          </div>

          {/* Saturs */}
          <div className="p-8 lg:p-12 space-y-6">
            
            {/* Virsraksts un cena */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {sludinajums.title || sludinajums.nosaukums}
              </h1>
              <div className="text-3xl md:text-4xl font-bold text-blue-600">
                {sludinajums.price || sludinajums.cena || 'Cena vienošanās'} €
              </div>
            </div>

            {/* Detalizēta info */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Apraksts */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 border-b pb-2">
                  Apraksts
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {sludinajums.description || sludinajums.apraksts || 'Nav apraksta'}
                </p>
              </div>

              {/* Metadati */}
              <div className="space-y-4 bg-gray-50 p-6 rounded-2xl">
                <div>
                  <span className="font-semibold text-gray-700">Kategorija:</span>
                  <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {sludinajums.category || sludinajums.kategorija}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Atrašanās vieta:</span>
                  <span className="ml-2 text-gray-900 font-medium">
                    {sludinajums.city || sludinajums.pilsēta || sludinajums.location}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Publicēts: {new Date(sludinajums.created_at || sludinajums.publicēts).toLocaleDateString('lv-LV')}
                </div>
              </div>
            </div>

            {/* Pogas */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t-2 border-gray-100">
              <Link
                href={`/sludinājumi?kategorija=${encodeURIComponent(sludinajums.category || sludinajums.kategorija)}`}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-8 rounded-2xl text-center font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Citi šajā kategorijā
              </Link>
              <Link
                href="/sludinājumi"
                className="flex-1 border-2 border-gray-300 text-gray-800 py-4 px-8 rounded-2xl text-center font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Visi sludinājumi
              </Link>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
