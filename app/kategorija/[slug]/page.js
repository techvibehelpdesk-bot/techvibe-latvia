'use client'; // Ja vajag client-side, bet šeit server-side OK

import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getKategorija(slug) {
  try {
    // Pielāgo savai API/DB endpoint
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kategorijas/${slug}`, {
      next: { revalidate: 3600 }, // 1h kešs
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error('Nav atrasta');
    return await res.json();
  } catch {
    return null;
  }
}

export default async function KategorijaPage({ params }) {
  const kategorija = await getKategorija(params.slug);

  if (!kategorija) {
    notFound();
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <nav className="mb-8">
              <Link 
                href="/kategorijas" 
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                ← Atpakaļ uz kategorijām
              </Link>
            </nav>
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              {/* Ikona fiksēta – pareiza self-closing */}
              <i 
                className={`fas fa-${kategorija.ikona || 'folder'} text-3xl text-indigo-600`} 
                aria-hidden="true" 
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
              {kategorija.nosaukums}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {kategorija.apraksts}
            </p>
          </div>

          {/* Produkti */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
              Produkti kategorijā
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {kategorija.produkti && kategorija.produkti.length > 0 ? (
                kategorija.produkti.map((produkts) => (
                  <div 
                    key={produkts.id} 
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border hover:border-indigo-200"
                  >
                    <div className="p-6">
                      {/* Ikona katram produktam – fiksēta */}
                      <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                        <i 
                          className={`fas fa-${produkts.ikona || 'star'} text-2xl text-indigo-600`} 
                          aria-hidden="true" 
                        />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                        {produkts.nosaukums}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                        {produkts.apraksts}
                      </p>
                      
                      {/* Label pilnībā labots – bez tukšām birkām */}
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-1 rounded-full">
                          Cena
                          <span className="ml-1 font-bold text-xl text-green-600">
                            €{produkts.cena?.toFixed(2) || '0.00'}
                          </span>
                        </label>
                        <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg">
                          Pievienot
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <i className="fas fa-inbox text-6xl text-gray-300 mb-6" aria-hidden="true" />
                  <p className="text-xl text-gray-500">Šajā kategorijā vēl nav produktu</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
