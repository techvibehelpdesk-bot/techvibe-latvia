import { createClient } from '@supabase/supabase-js';

export default async function SludinajumaLapa({ params }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { data: sludinajums } = await supabase
    .from('sludinajumi')
    .select('*')
    .eq('id', params.id)
    .eq('status', 'published')
    .single();

  if (!sludinajums) {
    return <div className="p-8 text-center">Sludinājums nav atrasts vai nav publicēts.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{sludinajums.title}</h1>
      <p className="text-2xl font-semibold text-green-600 mb-4">{sludinajums.price} €</p>
      <p className="mb-2"><strong>Kategorija:</strong> {sludinajums.category}</p>
      <p className="mb-2"><strong>Pilsēta:</strong> {sludinajums.city || sludinajums.location}</p>
      <p className="mb-4 whitespace-pre-wrap">{sludinajums.description}</p>
    </div>
  );
}
