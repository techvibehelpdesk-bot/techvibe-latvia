export default function IzsoleLapa() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Izsoļu sistēma</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* SOLIS #2 būs šeit izsoles */}
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <h3 className="text-2xl font-bold mb-4">Gatavs izsolei #1</h3>
            <p className="text-gray-500 mb-6">Nospied refresh SOLIS #2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
