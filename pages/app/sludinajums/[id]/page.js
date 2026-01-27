import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server'; // Pielāgo ceļu savai Supabase klientam

async function fetchSludinajums(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('sludinajumi') // Pielāgo tabulas nosaukumu
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    notFound();
  }
  return data;
}

export default async function SludinajumsPage({ params }) {
  const sludinajums = await fetchSludinajums(params.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{sludinajums.nosaukums}</h1>
      <p className="text-lg mb-6">{sludinajums.apraksts}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <strong>Cena:</strong> {sludinajums.cena} €
        </div>
        <div>
          <strong>Kategorija:</strong> {sludinajums.kategorija}
        </div>
        <div>
          <strong>Tālrunis:</strong> {sludinajums.talrunis}
        </div>
        <div>
          <strong>Pilsēta:</strong> {sludinajums.pilseta}
        </div>
      </div>
      
      {sludinajums.atskaites?.map((atskaite) => (
        <div key={atskaite.id} className="border p-4 rounded-lg mb-4">
          <p>{atskaite.teksts}</p>
          <small>{atskaite.autors} - {new Date(atskaite.datums).toLocaleDateString('lv-LV')}</small>
        </div>
      )) || <p>Vēl nav atsauksmju.</p>}
    </div>
  );
}
