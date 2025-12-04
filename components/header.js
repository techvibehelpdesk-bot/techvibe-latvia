import React, { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Sākums', id: 'home' },
    { label: 'Kategorijas', id: 'categories' },
    { label: 'Jaunākie sludinājumi', id: 'listings' },
    { label: 'Pakalpojumi', id: 'services' },
    { label: 'Cenas', id: 'pricing' },
    { label: 'BUJ', id: 'faq' },
    { label: 'Kontakti', id: 'contact' }
  ];

  return (
    <header id='header_main_container' className='sticky top-0 z-50 bg-white shadow-md'>
      <nav id='header_nav_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
        <div id='header_nav_wrapper' className='flex justify-between items-center'>
          
          {/* Logo */}
          <div id='header_logo_section' className='flex items-center gap-2'>
            <div id='header_logo_icon' className='w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center'>
              <span id='header_logo_text' className='text-white font-bold text-lg'>TV</span>
            </div>
            <span id='header_brand_name' className='text-2xl font-bold text-primary hidden sm:inline'>TechVibe</span>
          </div>

          {/* Desktop Navigation */}
          <div id='header_desktop_nav' className='hidden lg:flex items-center gap-8'>
            {navItems.map((item, index) => (
              <button
                key={index}
                id={`header_nav_link_${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className='text-primary font-medium hover:text-accent transition-colors duration-300'
                aria-label={`Navigēt uz ${item.label}`}
              >
                {item.label}
              </button>
            ))}
            <button
              id='header_post_ad_button'
              onClick={() => handleNavClick('contact')}
              className='bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 hover:shadow-lg transition-all duration-300'
              aria-label='Ievietot sludinājumu'
            >
              Ievietot sludinājumu
            </button>
            <button
              id='header_login_button'
              onClick={() => handleNavClick('contact')}
              className='bg-primary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300'
              aria-label='Ienākt TechVibe kontā'
            >
              Ienākt
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id='header_mobile_menu_btn'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='lg:hidden flex flex-col gap-1.5 p-2'
            aria-label='Atvērt navigācijas izvēlni'
            aria-expanded={mobileMenuOpen}
          >
            <span id='header_menu_line_1' className='w-6 h-0.5 bg-primary transition-all duration-300'></span>
            <span id='header_menu_line_2' className='w-6 h-0.5 bg-primary transition-all duration-300'></span>
            <span id='header_menu_line_3' className='w-6 h-0.5 bg-primary transition-all duration-300'></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id='header_mobile_nav' className='lg:hidden mt-4 pb-4 border-t border-gray-200'>
            <div id='header_mobile_nav_items' className='flex flex-col gap-4 mt-4'>
              {navItems.map((item, index) => (
                <button
                  key={index}
                  id={`header_mobile_nav_link_${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className='text-primary font-medium hover:text-accent transition-colors duration-300 text-left'
                  aria-label={`Navigēt uz ${item.label}`}
                >
                  {item.label}
                </button>
              ))}
              <button
                id='header_mobile_post_ad_button'
                onClick={() => handleNavClick('contact')}
                className='bg-blue-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-600 hover:shadow-lg transition-all duration-300 w-full'
                aria-label='Ievietot sludinājumu'
              >
                Ievietot sludinājumu
              </button>
              <button
                id='header_mobile_login_button'
                onClick={() => handleNavClick('contact')}
                className='bg-primary text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 w-full'
                aria-label='Ienākt TechVibe kontā'
              >
                Ienākt
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}