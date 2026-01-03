import Link from 'next/link';
import { useState } from 'react';

export default function Kontakti() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Nosūtīt uz EmailJS vai Supabase
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="pt-24 pb-20 px-4 bg-gradient-to-r from-emerald-600 to-green-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Kontakti</h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Support un sadarbība – atbildēsim 24h
          </p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          
          {/* Kontaktinformācija */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">📧 Support</h2>
              <div className="space-y-6">
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">Email</p>
                  <a href="mailto:techvibehelpdesk@gmail.com" className="text-blue-600 text-xl font-bold hover:underline block">
                    techvibehelpdesk@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-2">Tālrunis</p>
                  <a href="tel:+37128655228" className="text-green-600 text-2xl font-bold hover:underline block">
                    +371 28 655 228
                  </a>
                  <p className="text-sm text-gray-500 mt-1">P-PN 9:00-18:00</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">🏢 Uzņēmums</h2>
              <div className="space-y-3 text-lg">
                <p><strong>TechVibe SIA</strong></p>
                <p>Rīga, Latvija, LV-1001</p>
                <p>Reģ.nr.: 401234-56789 (pagaidām)</p>
                <p>PVN nr.: LV40123456789</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-8 rounded-2xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">💼 Sadarbībai</h3>
              <p className="mb-6 opacity-90">Reklāma, partnerības, API</p>
              <a href="mailto:techvibehelpdesk@gmail.com?subject=Sadarbība" className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold text-lg hover:shadow-xl transition-all inline-block">
                Rakstīt
              </a>
            </div>
          </div>

          {/* Kontakta forma */}
          <div>
            {submitted ? (
              <div className="bg-white rounded-2xl p-12 shadow-2xl text-center">
                <div className="w-24 h-24 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                  <span className="text-4xl">✓</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Paldies!</h2>
                <p className="text-xl text-gray-600 mb-8">Atbildēsim 24h laikā uz {formData.email}</p>
                <Link href="/ievietot" className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:shadow-2xl transition-all inline-block">
                  Publicēt sludinājumu
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl space-y-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">📝 Uzraksti mums</h2>
                <p className="text-gray-600">Atbilde 24h, vai zvanām atpakaļ?</p>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Vārds</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email vai tālrunis</label>
                  <input 
                    type="text" 
                    name="email"
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Ziņa</label>
                  <textarea 
                    name="message"
                    rows="6"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ko vēlies zināt? Problēma ar sludinājumu? Sadarbība?..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-6 px-8 rounded-2xl text-xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:bg-blue-700 transition-all"
                >
                  Nosūtīt ziņu
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      <section className="py-20 px-4 text-center bg-gradient-to-r from-emerald-600 to-green-700 text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Ātri atrisinām problēmas!</h2>
          <p className="text-xl mb-12 opacity-90">95% jautājumu atrisinām 1. dienā</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-lg mb-8">
            <a href="mailto:techvibehelpdesk@gmail.com" className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all inline-block">
              📧 Email
            </a>
            <a href="tel:+37128655228" className="bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all inline-block">
              📞 Zvanīt
            </a>
          </div>
          <Link href="/ievietot" className="bg-white text-blue-600 px-12 py-5 text-xl font-bold rounded-2xl hover:shadow-2xl hover:-translate-y-1 transition-all inline-block">
            Publicēt sludinājumu
          </Link>
        </div>
      </section>
    </div>
  );
}
