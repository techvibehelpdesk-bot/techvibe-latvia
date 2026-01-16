'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AutoPage() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tavi mock dati PRECĪZI kā vajag
   const mockData = [
  {
    id: 1,
    title: 'BMW 3 Series 320i',
    description: 'Pilnīgi jauns, 1 īpašnieks',
    price: '28 900',
    images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'],
    created_at: '2026-01-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'Audi A6 Avant',
    description: 'Quattro, 120tkm, labs stāvoklis',
    price: '24 500',
    images: ['https://images.unsplash.com/photo-1603796846092-bee2d6aa653e?w=400'],
    created_at: '2026-01-14T14:20:00Z'
  },
  {
    id: 3,
    title: 'Mercedes C200',
    description: 'AMG Line, 2 gadu garantija',
    price: '32 900',
    images: ['https://images.unsplash.com/photo-1583121274602-d9e62e3d1e1f?w=400'],
    created_at: '2026-01-13T09:15:00Z'
  }
];

    setSludinajumi(mockData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom right, #fef3c7, #fde68a)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', 
        fontSize: '1.25rem', color: '#6b7280'
      }}>
        🚗 Ielādē auto sludinājumus...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #fef3c7, #fde68a)', 
      padding: '2rem 1rem'
    }}>
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        {/* Header PRECĪZI kā tavā kodā */}
        <div style={{
          marginBottom: '2rem', 
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start'
        }}>
          <h1 style={{
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#1f2937', 
            marginBottom: '0.5rem'
          }}>
            🚗 Auto
          </h1>
          <p style={{
            fontSize: '1.25rem', 
            color: '#6b7280', 
            marginBottom: '1rem'
          }}>
            {sludinajumi.length} auto sludinājumi Rīgai un Latvijai
          </p>
          <Link 
            href="/ievietot" 
            style={{
              background: '#059669', 
              color: 'white', 
              padding: '0.75rem 2rem', 
              borderRadius: '0.75rem', 
              fontWeight: '600', 
              textDecoration: 'none', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
            }}
          >
            ➕ Ievietot auto sludinājumu
          </Link>
        </div>

        {/* Kartītes PRECĪZI kā screenshot */}
        <div style={{
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '1.5rem'
        }}>
          {sludinajumi.map((sludinajums) => (
            <div 
              key={sludinajums.id} 
              style={{
                background: 'white', 
                borderRadius: '1rem', 
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                transition: 'all 0.3s', 
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.25)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {/* Attēls */}
              <div style={{
                height: '12rem', 
                background: 'linear-gradient(to right, #3b82f6, #1d4ed8)', 
                position: 'relative', 
                overflow: 'hidden'
              }}>
                <img 
                  src={sludinajums.images[0]} 
                  alt={sludinajums.title}
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
              </div>
              
              {/* Saturs */}
              <div style={{padding: '1.5rem'}}>
                <h3 style={{
                  fontWeight: 'bold', 
                  fontSize: '1.25rem', 
                  color: '#1f2937', 
                  marginBottom: '0.5rem'
                }}>
                  {sludinajums.title}
                </h3>
                <p style={{color: '#6b7280', marginBottom: '1rem'}}>
                  {sludinajums.description}
                </p>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                  <span style={{
                    fontSize: '1.5rem', 
                    fontWeight: 'bold', 
                    color: '#059669'
                  }}>
                    {sludinajums.price} €
                  </span>
                  <span style={{fontSize: '0.875rem', color: '#6b7280'}}>
                    {new Date(sludinajums.created_at).toLocaleDateString('lv-LV')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
