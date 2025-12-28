// pages/ievietot.js

import Head from "next/head";

export default function IevietotSludinajumu() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Sludinājums nosūtīts! (vēlāk šeit pieslēgsim reālu saglabāšanu)");
  };

  return (
    <>
      <Head>
        <title>Ievietot sludinājumu | TechVibe</title>
      </Head>

      <main className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-8">
          <h1 className="text-2xl font-semibold mb-6">
            Ievietot sludinājumu
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">
                Sludinājuma virsraksts
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Apraksts
              </label>
              <textarea
                className="w-full border rounded px-3 py-2 h-32"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Cena (€)
              </label>
              <input
                type="number"
                className="w-full border rounded px-3 py-2"
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Kontakttālrunis vai e‑pasts
              </label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded"
            >
              Publicēt sludinājumu
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
