'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function SludinajumaLapa({ params }) {
  const [sludinajums, setSludinajums] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      const { data, error } = await supabase
        .from('isor')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        setLoading(false);
        return;
      }

      if (!data) {
        setLoading(false);
        return;
      }

      // ✅ DROŠA image apstrāde
      let imgs = [];

      if (Array.isArray(data.image)) {
        imgs = data.image;
      } else if (typeof data.image === 'string') {
        try {
          imgs = JSON.parse(data.image);
        } catch (e) {
          console.error('Image JSON parse error:', e);
        }
      }

      // ✅ Atstāj tikai reālus URL
      const cleanImages = imgs
        .filter((url) => typeof url === 'string' && url.startsWith('http'))
        .slice(0, 4);

      console.log('Final images:', cleanImages);

      setImages(cleanImages);
      setSludinajums(data);
      setLoading(false);
    }

    loadData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Ielādē bildes...
      </div>
    );
  }

  const displayImages = images.length
    ? images
    : [
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400',
        'https://images.unsplash.com/photo-1558618047-3c8c76ffe6f4?w=400',
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
      ];

  const displayData = sludinajums || {
    title: 'Sludinājums',
    price: 'Cena',
    description: 'Apraksts',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-12">
          {displayData.title}
        </h1>

        <div className="grid grid-cols-1 gap-6 mb-16 max-w-2xl mx-auto">
          {displayImages.map((imgUrl, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-2xl p-2">
              <div className="relative h-72 w-full rounded-2xl overflow-hidden">
                <Image
                  src={imgUrl}
                  alt={`${displayData.title} ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>

              <div className="pt-6 text-center">
                <div className="text-3xl font-black text-emerald-600">
                  {displayData.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="bg-white rounded-3xl shadow-2xl p-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">📝 Pilns apraksts</h2>
          <p className="whitespace-pre-wrap">
            {displayData.description}
          </p>
        </section>
      </div>
    </div>
  );
}
