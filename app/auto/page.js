'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AutoPage() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // MOCK DATI – BMW + Audi test (aizstāj ar Supabase vēlāk)
    const mockAutos = [
      {
        id: 1,
        nosaukums: 'BMW 3 Series 320i 2020 Excellent',
        apraksts: 'Pilnīgi jauns, 1 īpašnieks, pilna servisa vēsture. Āda salons, navigācija, parkošanās sensori.',
        cena: 28900,
        image_public_urls: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&fit=crop'],
        datums: '2026-01-15'
      },
      {
        id: 2,
        nosaukums: 'Audi A6 Avant 2.0 TFSI Quattro 2019',
        apraksts: 'Quattro piedziņa, ādas salons, navigācija, 120tkm nobraukums. Ideāls stāvoklis.',
        cena: 24500,
        image_public_urls: ['https://images.unsplash.com/photo-1603796846092-bee2d6aa653e?w=800&fit=crop'],
        datums: '2026-01-14'
      },
      {
        id: 3,
        nosaukums: 'Mercedes-Benz C200 Coupe AMG Line',
        apraksts: 'Sporta coupe, AMG pakete, 2 gadu garantija, 1 īpašnieks no jauna.',
        cena: 32900,
        image_public_urls: ['https://images.unsplash.com/photo-1583121274602-d9e62e3d1e1f?w=800&fit=crop'],
        datums: '2026-01-13'
      }
    ];

    console.log('🚗 MOCK AUTO dati ielādēti:', mockAutos.length);
    setAutos(mockAutos);
    setLoading(false);

    // TODO: Aizstāj ar Supabase fetch
    /*
    fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/sludinajumi?select=*&status=eq.published&category=ilike.*auto*`, {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
    }).then(res => res.json()).then(setAutos).catch(console.error);
    */
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-2xl font-semibold text-gray-600 animate-pulse">
          Ielādē auto sludinājumus... 🚗
        </div>
      </div>
    );
  }

  return (
    <>
      <title>🚗 Auto sludinājumi - TechVibe.lv</title>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 pt-8">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 drop-shadow-lg">
              Auto sludinājumi
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Atrast labāko auto Latvijā. Privātie un komerc sludinājumi reālamā stāvoklī.
            </p>
          </div>

          {/* Sludinājumi vai tukšs stāvoklis */}
          {autos.length === 0 ? (
            <div className="text-center py-32">
              <div className="w-32 h-32 mx-auto mb-12 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl flex items-center justify-center shadow-lg">
                <span className="text-4xl">🚗</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-8">
                Vēl nav auto sludinājumu
              </h2>
              <p className="text-xl text-gray-600 mb-12 max-w-md mx-auto">
                Esi pirmais! Pievieno savu auto 2 minūtēs.
              </p>
              <Link 
                href="/pievienot-auto"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-5 px-12 rounded-3xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1"
              >
                ➕ Pievienot pirmo auto
              </Link>
            </div>
          ) : (
            <>
              {/* Stats bar */}
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 mb-12 shadow-xl border border-white/50">
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center justify-between text-center md:text-left">
                  <div>
                    <div className="text-3xl md:text-4xl font-black text-blue-600">{autos.length}</div>
                    <div className="text-lg text-gray-600">Aktīvi sludinājumi</div>
                  </div>
                  <div className="w-px h-12 bg-gray-300 hidden md:block"></div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-green-600">No 15 000€</div>
                    <div className="text-lg text-gray-600">Lētākais auto</div>
                  </div>
                  <div className="w-px h-12 bg-gray-300 hidden md:block"></div>
                  <div>
                    <div className="text-sm md:text-base text-gray-500">Atjaunināts pirms 2h</div>
                  </div>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {autos.map((auto) => (
                  <Link 
                    key={auto.id}
                    href={`/auto/${auto.id}`}
                    className="group block bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 border border-white/50 hover:border-blue-200 overflow-hidden hover:bg-white"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                      <img 
                        src={auto.image_public_urls[0]} 
                        alt={auto.nosaukums}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 pb-8">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-black text-xl md:text-2xl leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors pr-4 flex-1">
                          {auto.nosaukums}
                        </h3>
                        <div className="ml-2 flex-shrink-0">
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                            Jauns
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 h-16">
                        {auto.apraksts}
                      </p>
                      
                      {/* Price */}
                      <div className="text-3xl md:text-4xl font-black text-green-600 mb-6 leading-none">
                        {auto.cena.toLocaleString()} €
                      </div>
                      
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-1">
                          📍 <span>Rīga</span>
                        </div>
                        <div className="w-px h-4 bg-gray-300"></div>
                        <div className="flex items-center gap-1">
                          📅 <span>{new Date(auto.datums).toLocaleDateString('lv-LV')}</span>
                        </div>
                      </div>
                      
                      {/* CTA */}
                      <div className="pt-4 border-t border-gray-100">
                        <span className="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl text-center text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02]">
                          Skatīt sludinājumu →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
