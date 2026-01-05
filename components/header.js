import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Sākums', href: '/' },
    { label: 'Kategorijas', href: '/kategorijas' },
    { label: 'Visi sludinājumi', href: '/sludinajumi' },
    { label: 'Jaunākie sludinājumi', href: '/jaunakie' },
    { label: 'Pakalpojumi', href: '/pakalpojumi' },
    { label: 'Cenas', href: '/cenas' },
    { label: 'BUJ', href: '/buj' },
    { label: 'Kontakti', href: '/kontakti' },
    { label: 'Ievietot', href: '/ievietot' }
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center font-bold text-2xl text-blue-600">
              TechVibe
            </Link>
          </div>

          {/* Desktop - galvenās */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Sākums</Link>
            <Link href="/kategorijas" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Kategorijas</Link>
            <Link href="/sludinajumi" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">Visi sludinājumi</Link>
            <Link href="/ievietot" className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all">
              Ievietot
            </Link>
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu - visas */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
