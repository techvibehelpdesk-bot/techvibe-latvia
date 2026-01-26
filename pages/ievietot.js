'use client'

import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const categories = [
  { id: 1, name: "Telefoni un aksesuāri", icon: "📱", value: "telefoni" },
  { id: 2, name: "Auto un moto", icon: "🚗", value: "auto" },
  { id: 3, name: "Datori un programmatūra", icon: "💻", value: "datori" },
  { id: 4, name: "Mēbeles un interjers", icon: "🛋️", value: "mebeles" },
  { id: 5, name: "Sporta preces", icon: "⚽", value: "sports" },
  { id: 6, name: "Darbs un bizness", icon: "💼", value: "darbs" },
];

export default function IevietotSludinajumu() {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setImages(files.slice(0, 3));  // max 3 bildes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const imageUrls = [];

    // ✅ UPLOAD BILDES
    if (images.length > 0) {
      for (const file of images) {
        const fileExt = file.name.split(".").pop();
        const fileName = `public/${Date.now()}-${Math.random().toString(36).substr(2,9)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("sludinajumi")
          .upload(fileName, file, { upsert: true });

        if (uploadError) {
          alert("❌ Upload: " + uploadError.message);
          setLoading(false);
          return;
        }

        // ✅ PUBLIC URL
        const { data: { publicUrl } } = supabase.storage
          .from("sludinajumi")
          .getPublicUrl(fileName);
        
        imageUrls.push(publicUrl);
      }
    }

    // ✅ ANGĻU KOLONNAS DB!
    const data = {
      title: formData.get("virsraksts"),           // nosaukums → title
      description: formData.get("apraksts"),        // apraksts → description  
      price: parseInt(formData.get("cena")) || 0,   // cena → price
      category: formData.get("category"),           // saglabā
      phone: formData.get("kontakts"),              // kontakts → phone
      image_urls: imageUrls.length > 0 ? imageUrls : null,  // image_urls (masīvs)
      status: "published",                          // publicēts → published
      location: "Rīga"                              // pievienots noklusējums
    };

    try {
      const { error } = await supabase.from("sludinajumi").insert([data]);
      if (error) throw error;
      alert("✅ Publicēts! Skaties /auto");
      e.target.reset();
      setImages([]);
    } catch (error) {
      alert("❌ " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ievietot sludinājumu | TechVibe</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 py-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm text-lg font-semibold text-gray-800 hover:text-orange-600 hover:border-orange-400 transition-all">
              ← Atpakaļ
            </Link>
          </div>

          <div className="bg-white shadow-xl rounded-2xl p-8 mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-8">
              Ievietot jaunu auto sludinājumu
            </h1>

            {/* KATEGORIJAS */}
            <div className="mb-8 p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-2 border-dashed border-orange-200">
              <label className="block text-lg font-semibold mb-4 text-gray-800">Izvēlies kategoriju</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center p-4 border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50 rounded-xl cursor-pointer transition-all hover:shadow-md">
                    <span className="text-2xl mr-3">{cat.icon}</span>
                    <span className="font-medium">{cat.name}</span>
                    <input type="radio" name="category" value={cat.value} className="ml-auto w-5 h-5" required />
                  </label>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="virsraksts">Virsraksts</label>
                <input id="virsraksts" name="virsraksts" type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500" placeholder="BMW X5 2020" required />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="apraksts">Apraksts</label>
                <textarea id="apraksts" name="apraksts" className="w-full border border-gray-300 rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-orange-500 resize-vertical" placeholder="Detalizēts apraksts..." required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="cena">Cena (€)</label>
                  <input id="cena" name="cena" type="number" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500" min="0" step="1" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700" htmlFor="kontakts">Tālrunis</label>
                  <input id="kontakts" name="kontakts" type="text" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-orange-500" placeholder="+371 20xxxxx" required />
                </div>
              </div>

              {/* BILDES */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">📸 Bildes (līdz 3)</label>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 hover:bg-orange-50 transition-all" />
                {images.length > 0 && <p className="text-sm text-green-600 mt-2">✅ {images.length} bilde(s)</p>}
              </div>

              <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all">
                {loading ? "🚀 Nosūta..." : "🚀 Publicēt + bildes"}
              </button>

              <div className="pt-6 border-t border-gray-200">
                <Link href="/" className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl shadow-sm text-lg font-semibold text-gray-700 hover:text-orange-600 hover:border-orange-400 transition-all">
                  ← Atpakaļ
                </Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
