import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link'; // Importējam Link, lai varētu atgriezties sākumā

export default function Phones() {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    fetch('/api/phones')
      .then((res) => res.json())
      .then((data) => setPhones(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <Head>
        <title>Telefoni - TechVibe</title>
      </Head>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Pieejamie Telefoni</h1>
            <Link href="/" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Atpakaļ uz sākumu
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phones.map((phone) => (
            <div key={phone.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <img 
                src={phone.image} 
                alt={phone.name} 
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800">{phone.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{phone.description}</p>
              <div className="text-blue-600 font-bold text-lg">{phone.price} €</div>
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
                Pirkt
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
