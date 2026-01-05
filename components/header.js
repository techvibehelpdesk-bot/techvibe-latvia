import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const navItems = [
{ label: 'Sākums', href: '/' },
{ label: 'Kategorijas', href: '/kategorijas' },
{ label: 'Visi sludinājumi', href: '/sludinajumi' }, // ← ŠIS ATGRIEŽAS!
{ label: 'Jaunākie sludinājumi', href: '/jaunakie' }, // ← ŠIS JAUNS!
{ label: 'Pakalpojumi', href: '/pakalpojumi' },
{ label: 'Cenas', href: '/cenas' },
{ label: 'BUJ', href: '/buj' },
{ label: 'Kontakti', href: '/kontakti' }
];
return (
<header className='sticky top-0 z-50 bg-white shadow-md'>
<nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
<div className='flex justify-between items-center'>

{/* Logo */}
<div className='flex items-center gap-2'>
<div className='w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center'>
<span className='text-white font-bold text-lg'>TV</span>
</div>
<span className='text-2xl font-bold text-blue-600 hidden sm:inline'>TechVibe</span>
</div>

{/* Desktop Navigation - ✅ SALABOJUSI */}
<div className='hidden lg:flex items-center gap-8'>
{navItems.map((item, index) => (
<Link
key={index}
href={item.href}
className='text-blue-600 font-medium hover:text-purple-600 transition-colors duration-300'
>
{item.label}
</Link>
))}

<Link href="/ievietot" className='bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 transition-all'>
Ievietot sludinājumu
</Link>
</div>

{/* Mobile button */}
<button
onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
className='lg:hidden p-2 text-2xl'
>
☰
</button>
</div>

{/* Mobile Navigation - ✅ SALABOJUSI */}
{mobileMenuOpen && (
<div className='lg:hidden mt-4 pb-4 border-t border-gray-200'>
<div className='flex flex-col gap-4'>
{navItems.map((item, index) => (
<Link
key={index}
href={item.href}
onClick={() => setMobileMenuOpen(false)}
className='text-blue-600 font-medium py-3 px-4 hover:text-purple-600 border-l-4 border-transparent hover:border-blue-500'
>
{item.label}
</Link>
))}
<Link
href="/ievietot"
onClick={() => setMobileMenuOpen(false)}
className='bg-blue-500 text-white py-3 px-4 rounded-lg text-center font-bold hover:bg-blue-600'
>
Ievietot sludinājumu
</Link>
</div>
</div>
)}
</nav>
</header>
);
}
