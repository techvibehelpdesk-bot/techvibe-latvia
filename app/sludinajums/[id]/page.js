'use client'; // Client component galerijai hover

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

async function getSludinajums(id) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data } = await supabase.from('sludinajumi').select('*').eq('id', id).single();
  return data;
}

export default async function SludinajumaLapa({ params }) {
  const sludinajums = await getSludinajums(params.id);
  const images = Array.isArray(sludinajums?.image_public_urls) ? sludinajums.image_public_urls : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* GALERIJAS GRID KVADRĀTI KĀ SCREENSHOT */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {images.slice(0, 16).map((img, i) => (
            <div 
              key={i} 
              className="group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:rotate-1 cursor-pointer border-4 border-white hover:border-orange-400"
            >
              <Image 
                src={img} 
                alt={`Foto ${i+1}`}
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold">
                {i+1}
              </span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* GALVENĀ INFO + CENA */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* TITULS UN CENA */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {sludinajums?.title}
              </h1>
              <div className="flex items-baseline gap-4 mb-8">
                <div className="text-5xl font-black bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent drop-shadow-lg">
                  {sludinajums?.price}
                </div>
                <span className="text-2xl text-gray-600 font-semibold">€</span>
              </div>
            </div>

            {/* APRKSTS LEJĀ KĀ JAUTĀJI */}
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-4 border-orange-500 pb-4">
                📝 Pilns apraksts
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                {sludinajums?.description || 'Apraksts tiks pievienots.'}
              </div>
            </div>
          </div>

          {/* SPECIFIKĀCIJAS TABULA KĀ SCREENSHOT 4 KOLONNAS */}
          <div className="space-y-6">
            
            {/* ĪSA INFO TABULA */}
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-24">
              <h3 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-4">
                📊 Tehniskie dati
              </h3>
              
              {/* GALVENIE DATI 2 KOLONNĀS */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Pamatinformācija</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Marka:</span>
                      <span className="font-semibold">{sludinajums?.make}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Izgads:</span>
                      <span className="font-semibold">{sludinajums?.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Motors:</span>
                      <span>{sludinajums?.engine}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-3">Performace</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Jauda:</span>
                      <span className="font-semibold">{sludinajums?.power}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Patēriņš:</span>
                      <span>{sludinajums?.fuel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* KONTAKTI */}
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl mt-6">
                <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                  📞 Kontakti
                </h4>
                <div className="space-y-3">
                  <p className="text-2xl font-black">+371 29 123 456</p>
                  <p className="opacity-90">Rīga</p>
                  <button className="w-full bg-white text-emerald-600 py-3 px-6 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all">
                    Sazināties
                  </button>
                </div>
              </div>
            </div>

            {/* OCTA KĀ SCREENSHOT */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl text-center shadow-xl">
              <p className="text-sm mb-2 opacity-90">Aprēķināt apdrošināšanu</p>
              <div className="font-bold text-lg">OCTA.lv</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
