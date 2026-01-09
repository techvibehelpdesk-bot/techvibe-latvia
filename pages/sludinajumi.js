import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

export default function VisuSludinajumi() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [filter, setFilter] = useState('visi');
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fake dati - vēlāk Supabase
    const dati = [
      { id: 1, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=450&fit=crop', title: 'iPhone 15 Pro Max 256GB Titan', price: '€899', category: 'telefoni' },
      { id: 2, img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=450&fit=crop', title: 'Samsung Galaxy S24 Ultra', price: '€799', category: 'telefoni' },
      { id: 3, img: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=450&fit=crop', title: 'MacBook Pro M3 16"', price: '€2199', category: 'datori' },
      { id: 4, img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=450&fit=crop', title: 'Dell XPS 13', price: '€1299', category: 'datori' },
      { id: 5, img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=450&fit=crop', title: 'BMW X5 2023', price: '€55,000', category: 'auto' },
      { id: 6, img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=450&fit=crop', title: 'Mercedes E-Class', price: '€45,000', category: 'auto' },
      { id: 7, img: 'https://images.unsplash.com/photo-1583121274602-d9e8a7ad08a6?w=450&fit=crop', title: 'PS5 + Spider-Man 2', price: '€550', category: 'speles' },
      { id: 8, img: 'https://images.unsplash.com/photo-1605146380459-7a3ed1db1ca3?w=450&fit=crop', title: 'IKEA Skandi sofa', price: '€299', category: 'mebeles' },
    ];
    setSludinajumi(dati);
  }, []);

  const filtered = filter === 'visi' ? sludinajumi : sludinajumi.filter(s => s.category === filter);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(filtered.length / 4));
    }, 5000);
    return () => clearInterval(interval);
  }, [filtered.length]);

  return (
    <>
      <Head>
        <title>Visi sludinājumi - TechVibe</title>
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Visi sludinājumi ({filtered.length})
          </h1>

          {/* Filtrs */}
          <div className="flex justify-center mb-8">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-6 py-3 bg-white border-2 border-blue-200 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <option value="visi">Visi sludinājumi</option>
              <option value="telefoni">📱 Telefoni</option>
              <option value="datori">💻 Datori</option>
              <option value="auto">🚗 Auto</option>
              <option value="speles">🎮 Spēles</option>
              <option value="mebeles">🏠 Mēbeles</option>
            </select>
          </div>

          {/* Karuselis */}
          <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-12" style={{ height: '400px' }}>
            <div
              className="flex transition-transform duration-1000 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 25}%)` }}
              id="visuCarousel"
            >
              {filtered.slice(0, Math.ceil(filtered.length / 4) * 4).map((s, i) => (
                <div key={s.id} className="flex-shrink-0 w-1/4 p-4 h-full">
                  <Link href={`/sludinajums/${s.id}`} className="block h-full">
                    <div className="bg-white rounded-2xl p-6 h-full flex flex-col shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
                      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-gray-100">
                        <Image
                          src={s.img}
                          alt={s.title}
                          fill
                          className="object-cover hover:scale-110 transition-transform duration-500"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltocR3bY9p6jQ2U1j1qW5Y5j//Z"
                        />
                      </div>
                      <h3 className="font-bold text-xl mb-2 line-clamp-2">{s.title}</h3>
                      <p className="text-2xl font-black text-blue-600 mb-4">{s.price}</p>
                      <span className="text-sm text-gray-500">Skatīt sludinājumu →</span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* Bultiņas */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + Math.ceil(filtered.length / 4)) % Math.ceil(filtered.length / 4))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              ←
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % Math.ceil(filtered.length / 4))}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all"
            >
              →
            </button>
          </div>

          {/* Grid sludinājumi */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((s) => (
              <Link key={s.id} href={`/sludinajums/${s.id}`} className="block">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-3">
                  <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-gray-100">
                    <Image
                      src={s.img}
                      alt={s.title}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-500"
                      placeholder="blur"
                    />
                  </div>
                  <h3 className="font-bold text-xl mb-3 line-clamp-2">{s.title}</h3>
                  <p className="text-2xl font-black text-green-600 mb-4">{s.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
