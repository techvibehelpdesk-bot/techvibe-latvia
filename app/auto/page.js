'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AutoPage() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // MOCK dati – tavā stilā
    const mockData = [
      { id: 1, nosaukums: 'BMW 3 Series 320i', cena: '28 900€', image_public_urls: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'] },
      { id: 2, nosaukums: 'Audi A6 Avant', cena: '24 500€', image_public_urls: ['https://images.unsplash.com/photo-1603796846092-bee2d6aa653e?w=400'] },
      { id: 3, nosaukums: 'Mercedes C200', cena: '32 900€', image_public_urls: ['https://images.unsplash.com/photo-1583121274602-d9e62e3d1e1f?w=400'] }
    ];
    
    console.log('🚗 Auto ielādēti');
    setAutos(mockData);
    setLoading(false);
  }, []);

  if (loading) return <p className="p-20 text-center text-xl">Ielādē...</p>;

  return (
    <main className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-800">🚗 Auto sludinājumi</h1>
      
      {autos.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-2xl mb-8 text-gray-600">Nav sludinājumu</p>
          <Link href="/pievienot" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg inline-block">
            ➕ Pievienot sludinājumu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {autos.map((auto) => (
            <div key={auto.id} className="bg-white border rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <img 
                src={auto.image_public_urls[0]} 
                alt={auto.nosaukums}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="font-bold text-xl mb-2">{auto.nosaukums}</h2>
              <div className="text-2xl font-bold text-green-600 mb-6">{auto.cena}</div>
              <Link 
                href={`/auto/${auto.id}`}
                className="w-full block bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-center font-semibold transition-colors"
              >
                Skatīt →
              </Link>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
