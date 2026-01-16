'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AutoPage() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSludinajumi();
  }, []);

  const fetchSludinajumi = async () => {
    try {
      // MOCK DATI + Supabase (automātiski fallback)
      const mockData = [
        {
          id: 1,
          title: 'BMW 3 Series 320i 2020',
          description: 'Pilnīgi jauns, 1 īpašnieks, pilna servisa vēsture',
          price: '28 900',
          images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'],
          created_at: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Audi A6 Avant 2.0 TFSI Quattro',
          description: 'Quattro, āda, navigācija, 120tkm',
          price: '24 500',
          images: ['https://images.unsplash.com/photo-1603796846092-bee2d6aa653e?w=400'],
          created_at: new Date(Date.now() - 86400000).toISOString()
        }
      ];

      // Supabase query (tava DB struktūra)
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('category', 'auto')
        .eq('status', 'publicēts')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase kļūda, izmanto mock:', error);
        setSludinajumi(mockData);
      } else {
        setSludinajumi(data?.length ? data : mockData);
      }
    } catch (error) {
      console.error('Kļūda ielādējot auto:', error);
      // Fallback uz mock
      setSludinajumi([
        { id: 1, title: 'BMW 3 Series', price: '28 900€', images: ['https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400'] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">🚗 Ielādē auto sludinājumus...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-amber-200 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">🚗 Auto</h1>
          <p className="text-2xl text-gray-600 mb-8">
            {sludinajumi.length} auto sludinājumi Rīgai un Latvijai
          </p>
          <Link 
            href="/ievietot"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
          >
            ➕ Ievietot auto sludinājumu
          </Link>
        </div>

        {/* Sludinājumi vai tukšs */}
        {sludinajumi.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-8">🚗</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Vēl nav auto sludinājumu
            </h2>
            <Link 
              href="/ievietot" 
              className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl font-semibold text-xl shadow-lg hover:shadow-xl transition-all"
            >
              Būt pirmais!
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {sludinajumi.map((sludinajums) => (
              <div 
                key={sludinajums.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden cursor-pointer group"
              >
                {/* Attēls */}
                <div className="h-48 md:h-52 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden group-hover:brightness-105 transition-all">
                  {sludinajums.images && sludinajums.images[0] ? (
                    <img 
                      src={sludinajums.images[0]} 
                      alt={sludinajums.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-lg font-medium">Nav bildes</span>
                    </div>
                  )}
                </div>
                
                {/* Saturs */}
                <div className="p-6">
                  <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-3 line-clamp-2 leading-tight">
                    {sludinajums.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-6 line-clamp-3 leading-relaxed">
                    {sludinajums.description}
                  </p>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl md:text-3xl font-black text-green-600">
                      {sludinajums.price} €
                    </span>
                    <span className="text-sm text-gray-500">
                      {sludinajums.created_at ? new Date(sludinajums.created_at).toLocaleDateString('lv-LV') : 'Jauns'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
