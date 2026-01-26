'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Auto() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    try {
      setLoading(true);
      const { data } = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/sludinajumi?select=*`, {
        headers: {
          apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
        }
      }).then(r => r.json());
      
      const autoAds = data.filter(ad => 
        ad.category?.toLowerCase().includes('auto') && ad.status === 'published'
      );
      setAds(autoAds);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-12">
      <div className="text-center animate-pulse">
        <div className="w-32 h-32 bg-gradient-to-r from-indigo-400 to-yellow-400 rounded-3xl mx-auto mb-8 shadow-2xl"></div>
        <div className="text-2xl font-bold text-slate-600">Ielādē auto sludinājumus...</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 py-24 px-4 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* HEADER - identisks home stilam */}
        <div className="text-center mb-32">
          <div className="bg-white/60 backdrop-blur-xl rounded-[40px] px-20 py-12 shadow-2xl border border-slate-200 inline-block mb-12">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="text-8xl">🚗</div>
              <div>
                <h1 className="text-[4rem] lg:text-[5rem] font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-700 bg-clip-text text-transparent -tracking-[2px]">
                  Auto
                </h1>
                <p className="text-4xl font-bold text-slate-600 mt-2">{ads.length} sludinājumi Rīgā</p>
              </div>
            </div>
          </div>
          <Link href="/ievietot" className="inline-flex items-center gap-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black text-2xl py-8 px-16 rounded-[32px] shadow-3xl hover:shadow-4xl hover:-translate-y-2 transition-all duration-500 border-4 border-emerald-300/30 hover:scale-[1.02]">
            ➕ Pievienot sludinājumu
          </Link>
        </div>

        {/* GRID - 100% kā screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 pb-32">
          {ads.map(ad => {
            const img = ad.image_urls ? JSON.parse(ad.image_urls)[0] : 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&fit=crop';
            
            return (
              <Link key={ad.id} href={`/auto/${ad.id}`} className="group bg-white rounded-[28px] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_35px_100px_-20px_rgba(0,0,0,0.2)] border border-slate-100 hover:border-indigo-200 transition-all duration-700 hover:-translate-y-4 hover:scale-[1.02]">
                {/* IMAGE */}
                <div className="h-80 overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                  <img src={img} alt={ad.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                </div>
                
                {/* CONTENT */}
                <div className="p-10">
                  <h3 className="font-bold text-3xl mb-8 line-clamp-2 text-slate-900 group-hover:text-indigo-900 transition-colors leading-tight">
                    {ad.title}
                  </h3>
                  
                  {/* PRICE KĀ SCREENSHOT */}
                  <div className="text-[4.5rem] font-black text-emerald-600 mb-12 leading-none drop-shadow-xl">
                    {ad.price}€
                  </div>
                  
                  <div className="flex justify-between items-end pb-8 border-b-2 border-slate-100 mb-10">
                    <div className="text-2xl font-bold text-slate-700">{ad.location || 'Rīga'}</div>
                    <div className="text-xl text-slate-500 font-medium">Pirms 2h</div>
                  </div>

                  {/* POGAS KĀ SCREENSHOT */}
                  <div className="flex gap-4">
                    <Link href={`/auto/${ad.id}`} className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold py-5 px-6 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-center whitespace-nowrap">
                      Skatīt
                    </Link>
                    <Link href={`tel:${ad.phone || '20000000'}`} className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-5 px-6 rounded-2xl text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-center whitespace-nowrap">
                      Zvanīt
                    </Link>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {ads.length === 0 && (
          <div className="text-center py-48">
            <div className="w-64 h-64 mx-auto mb-20 p-20 bg-gradient-to-br from-yellow-100 via-orange-100 to-yellow-200 rounded-[40px] shadow-3xl flex items-center justify-center">
              <span className="text-[8rem]">🚗</span>
            </div>
            <h2 className="text-[5rem] font-black text-slate-800 mb-12 -tracking-[3px]">NAV AUTO</h2>
            <p className="text-4xl text-slate-600 mb-20 max-w-4xl mx-auto">Būsi pirmais kas pievieno auto sludinājumu Rīgas tirgū!</p>
            <Link href="/ievietot" className="inline-flex items-center gap-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-3xl py-12 px-24 rounded-[40px] shadow-4xl hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] hover:scale-105 transition-all duration-700">
              ➕ Pievienot auto
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
