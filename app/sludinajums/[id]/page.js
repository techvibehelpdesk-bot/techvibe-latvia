'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SludinajumaLapa({ params }) {
  const [sludinajums, setSludinajums] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSludinajums() {
      try {
        // Mēģina galvenās tabulas - ņem pirmo ar datiem
        const tables = ['sludinajumi', 'listings', 'auto'];
        let data = null;
        for (const table of tables) {
          const { data: row, error } = await supabase.from(table).select('*').eq('id', params.id).single();
          if (row) { data = row; break; }
        }
        if (!data) {
          setError('Sludinājums nav atrasts');
          setLoading(false);
          return;
        }

        // DROŠS images parse - tavi Supabase JSON vai UUID
        let imgs = [];
        if (data.images) {
          if (typeof data.images === 'string') {
            try { imgs = JSON.parse(data.images); } catch { imgs = []; }
          } else if (Array.isArray(data.images)) {
            imgs = data.images;
          }
        }
        // Pievieno thumbnail ja nav
        if (data.thumbnail_url && !imgs.includes(data.thumbnail_url)) imgs.unshift(data.thumbnail_url);
        // Uzpilda līdz 4 ar placeholder ja mazāk
        while (imgs.length < 4) imgs.push('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&fit=crop');

        setSludinajums(data);
        setImages(imgs.slice(0, 4)); // Precīzi 4 kā kartēs
      } catch (e) {
        setError('Kļūda ielādējot');
      } finally {
        setLoading(false);
      }
    }
    fetchSludinajums();
  }, [params.id]);

  if (loading) return <div className="text-center py-20">Ielādē...</div>;
  if (error || !sludinajums) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12 bg-gradient-to-r from-gray-900 to-slate-800 bg-clip-text text-transparent">
          {sludinajums.title || sludinajums.text || 'Sludinājums'}
        </h1>

        {/* 4 VERTIKĀLAS KARTES - TAVI SUPABASE ATTĒLI AR CENU ZEM KATRAS */}
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto mb-16">
          {images.map((img, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="relative h-80 w-full">
                <Image src={img} alt={`Bilde ${index+1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6 text-center border-t border-gray-100">
                <div className="text-3xl font-black text-emerald-600 mb-2">
                  {sludinajums.price || 'Cena nav norādīta'}
                </div>
                <p className="text-sm text-gray-600 uppercase font-semibold">{sludinajums.city || sludinajums.location || 'Rīga'}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Apraksts */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            📝 Apraksts
          </h2>
          <div className="prose prose-2xl text-gray-800 leading-relaxed whitespace-pre-wrap text-xl">
            {sludinajums.description || 'Apraksts tiks pievienots.'}
          </div>
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-6 px-12 rounded-3xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300">
            📞 Zvanīt
          </button>
        </div>
      </div>
    </div>
  );
}
