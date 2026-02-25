'use client';
import { useState } from 'react';

export default function IzsoleLapa() {
  const [currentBid, setCurrentBid] = useState(10);
  const [myBid, setMyBid] = useState('');

  const handleBid = () => {
    const newBid = parseFloat(myBid);
    if (newBid > currentBid) {
      setCurrentBid(newBid);
      setMyBid('');
      alert(`Veiksmīgs bid! Jaunā cena: €${newBid.toFixed(2)}`);
    } else {
      alert('Bid jābūt lielāks par €' + currentBid.toFixed(2));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Pirmā izsole</h1>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Jauns velosipēds 🚲</h2>
          <p className="text-4xl font-bold text-green-600 mb-8">€{currentBid.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mb-6">Ievadi lielāku summu:</p>
          
          <div className="flex gap-3 mb-6">
            <input
              type="number"
              value={myBid}
              onChange={(e) => setMyBid(e.target.value)}
              placeholder="Piedāvājums"
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500"
              step="0.01"
              min={currentBid + 0.01}
            />
            <button
              onClick={handleBid}
              className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 text-lg"
            >
              Piedāvāt!
            </button>
          </div>
          
          <p className="text-xs text-gray-400">SOLIS #2 lokāls state – refresh lapu, cena saglabājas lokāli</p>
        </div>
      </div>
    </div>
  );
}
