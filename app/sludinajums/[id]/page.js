export const dynamic = 'force-dynamic';  // ← ŠIS ATRISINA NULL ID

export default function SludinajumsPage({ params }) {
  // Safe check – ja params.id nav, parādi kļūdu
  if (!params?.id) {
    return <div className="p-8 text-center">Kļūda: Nav sludinājuma ID</div>;
  }

  const sludinajums = {
    id: params.id,
    nosaukums: `Testa sludinājums #${params.id}`,
    apsaksts: "TechVibe sludinājums darbojas! Build OK.",
    cena: "150 €",
    kategorija: "Velo",
    talrunis: "+371 2000 1234",
    pilseta: "Rīga"
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <article className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold mb-6">{sludinajums.nosaukums}</h1>
        <p className="text-xl mb-8">{sludinajums.apsaksts}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-blue-50 rounded-xl">
          <div className="text-center"><div className="text-2xl font-bold text-blue-600">{sludinajums.cena}</div><div className="text-sm">Cena</div></div>
          <div className="text-center"><div className="font-semibold">{sludinajums.kategorija}</div><div className="text-sm">Kategorija</div></div>
          <div className="text-center"><div className="font-semibold">{sludinajums.talrunis}</div><div className="text-sm">Tālrunis</div></div>
          <div className="text-center"><div className="font-semibold">{sludinajums.pilseta}</div><div className="text-sm">Pilsēta</div></div>
        </div>
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700">Zvanīt</button>
          <button className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50">Saglabāt</button>
        </div>
      </article>
    </div>
  );
}
