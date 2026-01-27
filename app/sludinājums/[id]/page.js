// app/sludinājums/[id]/page.js
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
    .eq('status', 'publicēts')  // tikai publicēti sludinājumi
    .single();

  if (error || !data) {
    console.error('Supabase error:', error);
    notFound();
  }

  return data;
}

export default async function SludinajumsPage({ params }) {
  const sludinajums = await fetchSludinajums(params.id);

  return (
    <>
      <main className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Attēls */}
          <div className="relative h-96 bg-gray-200">
            {sludinajums.attelus && (
              <Image
                src={sludinajums.attelus}
                alt={sludinajums.nosaukums}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Saturs */}
          <div className="p-8 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {sludinajums.nosaukums}
              </h1>
              <p className="text-2xl font-semibold text-blue-600">
                {sludinajums.cena} €
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Apraksts</h3>
                <p className="text-gray-700 leading-relaxed">
                  {sludinajums.apraksts}
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="font-semibold">Kategorija:</span>{' '}
                  <span className="text-blue-600">{sludinajums.kategorija}</span>
                </div>
                <div>
                  <span className="font-semibold">Atrašanās vieta:</span>{' '}
                  <span>{sludinajums.pilsēta}</span>
                </div>
                <div>
                  <span className="font-semibold">Publicēts:</span>{' '}
                  <span>{new Date(sludinajums.publicēts).toLocaleDateString('lv-LV')}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t">
              <Link
                href={`/sludinājumi?kategorija=${sludinajums.kategorija}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-medium"
              >
                Citi šajā kategorijā
              </Link>
              <Link
                href="/sludinājumi"
                className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-50 transition font-medium"
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
