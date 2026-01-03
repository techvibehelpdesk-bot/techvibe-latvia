// components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-20 border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        
        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            TechVibe
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed mb-6">
            Sludinājumi Latvijā. Bezmaksas starts, Premium €4.90/mēn.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center text-xl transition-all" target="_blank" rel="noopener">📘</a>
            <a href="https://twitter.com" className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-xl flex items-center justify-center text-xl transition-all" target="_blank" rel="noopener">🐦</a>
            <a href="https://instagram.com" className="w-12 h-12 bg-pink-500 hover:bg-pink-600 rounded-xl flex items-center justify-center text-xl transition-all" target="_blank" rel="noopener">📷</a>
          </div>
        </div>

        {/* Saites */}
        <div>
          <h4 className="text-xl font-bold mb-6 text-white">Saites</h4>
          <ul className="space-y-3">
            <li><Link href="/" className="text-gray-400 hover:text-white block py-1">🏠 Sākums</Link></li>
            <li><Link href="/sludinajumi" className="text-gray-400 hover:text-white block py-1">📋 Sludinājumi</Link></li>
            <li><Link href="/pakalpojumi" className="text-gray-400 hover:text-white block py-1">🛠️ Pakalpojumi</Link></li>
            <li><Link href="/cenas" className="text-gray-400 hover:text-white block py-1">💰 Cenas</Link></li>
          </ul>
        </div>

        {/* Kategorijas */}
        <div>
          <h4 className="text-xl font-bold mb-6 text-white">Kategorijas</h4>
          <ul className="space-y-3">
            <li><Link href="/kategorija/telefoni" className="text-gray-400 hover:text-white block py-1">📱 Telefoni (2,847)</Link></li>
            <li><Link href="/kategorija/datori" className="text-gray-400 hover:text-white block py-1">💻 Datori (1,592)</Link></li>
            <li><Link href="/kategorija/auto" className="text-gray-400 hover:text-white block py-1">🚗 Auto (5,247)</Link></li>
            <li><Link href="/kategorija/audio" className="text-gray-400 hover:text-white block py-1">🎧 Audio (1,028)</Link></li>
          </ul>
        </div>

        {/* Kontakti */}
        <div>
          <h4 className="text-xl font-bold mb-6 text-white">Support</h4>
          <div className="space-y-4">
            <a href="mailto:techvibehelpdesk@gmail.com" className="flex items-start text-gray-400 hover:text-white group">
              <span className="mr-3 mt-1">📧</span>
              <span>techvibehelpdesk@gmail.com</span>
              <span className="ml-auto text-xs opacity-75 group-hover:opacity-100">24h</span>
            </a>
            <a href="tel:+37128655228" className="flex items-center text-lg font-bold text-green-400 hover:text-green-300">
              📞 +371 28 655 228
            </a>
            <p className="text-sm text-gray-500">P-PN 9-18</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm bg-gray-950 py-8 rounded-t-3xl -mx-6 md:-mx-8 lg:-mx-16">
        <p className="mb-4">© 2026 TechVibe SIA. Reģ.nr. 401234-56789. Rīga, Latvija.</p>
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <Link href="/buj" className="hover:text-white">BUJ</Link>
          <Link href="/cenas" className="hover:text-white">Cenas</Link>
          <Link href="/kontakti" className="hover:text-white">Kontakti</Link>
          <Link href="/privacy" className="hover:text-white">Privātums</Link>
          <Link href="/noteikumi" className="hover:text-white">Lietošanas noteikumi</Link>
        </div>
      </div>
    </footer>
  );
}
