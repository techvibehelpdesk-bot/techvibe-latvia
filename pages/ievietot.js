'use client'

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 🔥 TAVS PRECĪZIE 14 KATEGORIJAS NO IEPRIEKŠEJĀS ZIŅAS
const categories = [
  "Auto",
  "Moto transports", 
  "Velosipēdi",
  "Dzīvokļi",
  "Mājas, Vasarnīcas",
  "Mēbeles",
  "Būvmateriāli",
  "Telefoni",
  "Datori",
  "Sadzīves tehnika",
  "Darbs & Vakances",
  "Blakusdarbs",
  "Bērniem",
  "Dažādi"
];

export default function IevietotSludinajumu() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files.slice(0, 3));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const imageUrls = [];

    // 🔥 UPLOAD UZ 'sludinajumi' BUCKET
    if (images.length > 0) {
      for (const file of images) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2,9)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("sludinajumi")
          .upload(fileName, file, { upsert: true });

        if (uploadError) {
          alert("❌ Bildes: " + uploadError.message);
          setLoading(false);
          return;
        }

        const { data: { publicUrl } } = supabase.storage
          .from("sludinajumi")
          .getPublicUrl(fileName);
        
        imageUrls.push(publicUrl);
      }
    }

    // 🔥 LABOTIE LAUKI - location, phone, image_public_urls
    const data = {
      title: formData.get("virsraksts"),
      description: formData.get("apraksts"),
      price: parseInt(formData.get("cena")) || 0,
      category: formData.get("category"),
      phone: formData.get("kontakts"),
      city: formData.get("city") || "Rīga",  // city input → location kolonna
      image_public_urls: imageUrls.length > 0 ? imageUrls : null,
      status: "published",
    };

    try {
      const { error } = await supabase.from("sludinajumi").insert([data]);
      if (error) throw error;
      
      alert(`✅ Publicēts ${data.category}! Skaties /${data.category}`);
      e.target.reset();
      setImages([]);
    } catch (error) {
      alert("❌ Kļūda: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ievietot sludinājumu | TechVibe</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-100 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* BACK */}
          <Link href="/kategorijas" className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-white/80 backdrop-blur-xl hover:bg-white border border-orange-200 rounded-2xl shadow-xl hover:shadow-2xl text-lg font-bold text-orange-900 hover:scale-[1.02] transition-all">
            ← Atpakaļ kategorijās
          </Link>

          {/* FORM CARD */}
          <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 lg:p-12 border border-orange-100">
            <div className="text-center mb-12">
              <div className="text-6xl mb-4">➕</div>
              <h1 className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                Ievietot sludinājumu
              </h1>
              <p className="text-xl text-orange-800 font-semibold">Ātri un bez maksas!</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* KATEGORIJAS - TAVS 14 KATEGORIJU GRID */}
              <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl border-2 border-dashed border-orange-200">
                <label className="block text-xl font-bold mb-6 text-orange-900">Kategorija *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {categories.map((cat, index) => (
                    <label key={index} className="group flex items-center justify-between p-6 border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 rounded-2xl cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02]">
                      <span className="font-semibold text-lg">{cat}</span>
                      <input 
                        type="radio" 
                        name="category" 
                        value={cat.toLowerCase().replace(/[^a-zāčēģīķļņūōṷ\s]/g, '').replace(/\s+/g, '-')} 
                        className="w-6 h-6 accent-orange-500" 
                        required 
                      />
                    </label>
                  ))}
                </div>
              </div>

              {/* VIRSRAKSTS */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-gray-800" htmlFor="virsraksts">Virsraksts *</label>
                <input 
                  id="virsraksts" name="virsraksts" 
                  type="text" 
                  className="w-full border border-gray-300 rounded-2xl px-6 py-4 text-lg focus:ring-4 focus:ring-orange-200 focus:border-orange-500 shadow-sm transition-all" 
                  placeholder="BMW X5 2020, Audi A6..." 
                  required 
                />
              </div>

              {/* APRKSTS */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-gray-800" htmlFor="apraksts">Apraksts *</label>
                <textarea 
                  id="apraksts" name="apraksts" 
                  className="w-full border border-gray-300 rounded-2xl px-6 py-4 h-40 text-lg focus:ring-4 focus:ring-orange-200 focus:border-orange-500 resize-vertical shadow-sm transition-all" 
                  placeholder="Detalizēts apraksts, nobraukums, stāvoklis..."
                  required 
                />
              </div>

              {/* CENA + TELEFONS + PILSĒTA */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-lg font-semibold mb-3 text-gray-800" htmlFor="cena">Cena (€)</label>
                  <input 
                    id="cena" name="cena" 
                    type="number" 
                    className="w-full border border-gray-300 rounded-2xl px-6 py-4 text-lg focus:ring-4 focus:ring-orange-200 focus:border-orange-500 shadow-sm transition-all" 
                    min="0" step="1" 
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-3 text-gray-800" htmlFor="kontakts">Tālrunis *</label>
                  <input 
                    id="kontakts" name="kontakts" 
                    type="tel" 
                    className="w-full border border-gray-300 rounded-2xl px-6 py-4 text-lg focus:ring-4 focus:ring-orange-200 focus:border-orange-500 shadow-sm transition-all" 
                    placeholder="+371 20xxxxx" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-3 text-gray-800" htmlFor="city">Pilsēta</label>
                  <input 
                    id="city" name="city" 
                    type="text" 
                    className="w-full border border-gray-300 rounded-2xl px-6 py-4 text-lg focus:ring-4 focus:ring-orange-200 focus:border-orange-500 shadow-sm transition-all" 
                    placeholder="Rīga" 
                    defaultValue="Rīga"
                  />
                </div>
              </div>

              {/* BILDES */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-gray-800">📸 Bildes (līdz 3)</label>
                <div className="border-2 border-dashed border-orange-300 rounded-2xl p-12 text-center hover:border-orange-400 hover:bg-orange-50 transition-all cursor-pointer">
                  <input 
                    type="file" multiple accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" id="images"
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <div className="text-5xl mb-4">📸</div>
                    <p className="text-xl font-semibold text-gray-700 mb-2">Klikšķini šeit bildēm</p>
                    <p className="text-orange-600">Max 3 bildes, JPG/PNG</p>
                  </label>
                  {images.length > 0 && (
                    <p className="mt-4 text-lg font-bold text-green-600">
                      ✅ {images.length}/3 bildes izvēlētas
                    </p>
                  )}
                </div>
              </div>

              {/* POGA */}
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-black py-6 px-8 rounded-3xl text-2xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-300"
              >
                {loading ? "🚀 Publicē..." : "🚀 Publicēt sludinājumu + bildes"}
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
