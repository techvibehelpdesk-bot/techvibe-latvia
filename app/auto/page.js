'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AutoPage() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockAutos = [
      { 
        id: 1, 
        nosaukums: 'BMW 3 Series 320i', 
        cena: '28 900€', 
        image_public_urls: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&fit=crop'] 
      },
      { 
        id: 2, 
        nosaukums: 'Audi A6 Avant', 
        cena: '24 500€', 
        image_public_urls: ['https://images.unsplash.com/photo-1603796846092-bee2d6aa653e?w=400&fit=crop'] 
      },
      { 
        id: 3, 
        nosaukums: 'Mercedes C200', 
        cena: '32 900€', 
        image_public_urls: ['https://images.unsplash.com/photo-1583121274602-d9e62e3d1e1f?w=400&fit=crop'] 
      }
    ];
    setAutos(mockAutos);
    setLoading(false);
  }, []);

  if (loading) return <div className="p-20 text-center">Ielādē...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Auto sludinājumi</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {autos.map((auto) => (
            <div key={auto.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <img 
                src={auto.image_public_urls[0]} 
                alt={auto.nosaukums}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h2 className="font-semibold text-lg mb-3 line-clamp-2">{auto.nosaukums}</h2>
                <div className="text-2xl font-bold text-green-600 mb-6">{auto.cena}</div>
                <Link 
                  href={`/auto/${auto.id}`}
                  className="w-full block bg-blue-500 hover:bg-blue-600 text-white text-center py-3 px-4 rounded font-medium transition-colors"
                >
                  Skatīt →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
