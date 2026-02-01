'use client';
import { useEffect, useState } from 'react';

export default function SludinajumaLapa({ params }) {
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [debug, setDebug] = useState('');

  useEffect(() => {
    fetch('/api/debug-sludinajums?id=' + params.id)
      .then(r => r.json())
      .then(({ data, images, table, error }) => {
        console.log('API RESPONSE:', { data, images, table, error });
        setData(data);
        setImages(images);
        setDebug(`Tabula: ${table || 'nav'} | Error: ${error || 'nav'} | Images: ${images?.length || 0}`);
      })
      .catch(e => setDebug('API kļūda: ' + e.message));
  }, [params.id]);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-8 text-center max-w-md">
        <div className="text-4xl mb-4">🔍</div>
        <div className="text-xl font-bold mb-2">Meklē sludinājumu...</div>
        <div className="text-yellow-800">{debug}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* DEBUG TOP */}
        <div className="bg-blue-100 border-2 border-blue-400 rounded-xl p-4 mb-8 text-sm font-mono">
          {debug}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* INFO */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h1 className="text-4xl font-black mb-6 text-gray-900">{data.title || data.text || 'Sludinājums'}</h1>
              <div className="text-5xl font-black text-emerald-600 mb-8">{data.price || '—'}</div>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div className="p-4 bg-emerald-50 rounded-2xl font-semibold flex items-center gap-3">
                  📍 {data.city || '—'}
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl font-semibold flex items-center gap-3">
                  🏷️ {data.category || '—'}
                </div>
              </div>
            </div>
          </div>

          {/* BILDES */}
          <div>
            <div className="aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden shadow-2xl mb-6">
              {images[0] ? <img src={images[0]} className="w-full h-full object-cover" /> : 
                <div className="w-full h-full flex items-center justify-center text-4xl text-gray-500">📱 Nav bilžu</div>}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(1).map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-3xl p-10 shadow-2xl">
          <h2 className="text-3xl font-black mb-8 text-gray-900">📝 Apraksts</h2>
          <div className="text-xl whitespace-pre-wrap">{data.description || data.text || '—'}</div>
        </div>
      </div>
    </div>
  );
}
