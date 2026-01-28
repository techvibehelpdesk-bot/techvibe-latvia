import { createClient } from '@/utils/supabase/server'; // Pielāgo ceļu, ja vajag

export default async function SludinajumaLapa({ params }: Promise<{ id: string }>) {
  const supabase = createClient();
  const { data: sludinajums } = await supabase
    .from('sludinajumi') // Tavs tabulas nosaukums
    .select('*')
    .eq('id', params.id)
    .eq('status', 'published')
    .single();

  if (!sludinajums) {
    return <div>Sludinājums nav atrasts vai nav publicēts.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{sludinajums.title}</h1>
      <p className="text-lg mb-2"><strong>Cena:</strong> {sludinajums.price} €</p>
      <p className="mb-2"><strong>Pilsēta:</strong> {sludinajums.city || sludinajums.location}</p>
      <p className="mb-4"><strong>Apraksts:</strong> {sludinajums.description}</p>
      {/* Pievieno bildes, ja ir: sludinajums.image_url */}
    </div>
  );
}
