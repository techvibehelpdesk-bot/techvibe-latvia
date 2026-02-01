import Image from 'next/image';

export default function SludinajumaLapa({ params }) {
  // Tavs konkrētais attēls
  const knownImages = [
    "https://nxwuihxgyiqwdffyfett.supabase.co/storage/v1/object/public/sludinajumi/1769432799562-jntarotdh.jpg"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black bg-gradient-to-r from-gray-900 to-slate-800 bg-clip-text text-transparent mb-8">
            Audi A3
          </h1>
          <div className="inline-flex px-12 py-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl text-5xl font-black text-white shadow-3xl">
            €5000
          </div>
        </div>

        {/* BILDES - DARBOJAS! */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {knownImages.map((img, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all bg-white/80 backdrop-blur-sm">
              <div className="w-full h-96 relative">
                <Image
                  src={img}
                  alt="Auto"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="300px"
                  priority
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center text-2xl text-green-700 font-bold p-8 bg-green-50 rounded-3xl">
          ✅ BILDES RĀDAS! Tagad pievieno pārējās DB vai array.
        </div>
      </div>
    </div>
  );
}
