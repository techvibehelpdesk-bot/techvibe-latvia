import React from 'react';
import useCustomNavigate from '../hooks/usecustomnavigate';

export default function Categories() {
  const navigate = useCustomNavigate();

  const categories = [
    {
      id: 'phones',
      name: 'Tālruņi',
      icon: '📱',
      color: 'from-blue-400 to-blue-600',
      path: '/categories/phones'
    },
    {
      id: 'laptops',
      name: 'Klēpjdatori',
      icon: '💻',
      color: 'from-purple-400 to-purple-600',
      path: '/categories/laptops'
    },
    {
      id: 'audio',
      name: 'Audio',
      icon: '🎧',
      color: 'from-pink-400 to-pink-600',
      path: '/categories/audio'
    },
    {
      id: 'photo',
      name: 'Fotogrāfija',
      icon: '📷',
      color: 'from-yellow-400 to-yellow-600',
      path: '/categories/photo'
    },
    {
      id: 'gaming',
      name: 'Spēles',
      icon: '🎮',
      color: 'from-red-400 to-red-600',
      path: '/categories/gaming'
    },
    {
      id: 'appliances',
      name: 'Skaņa un Attēls',
      icon: '🏠',
      color: 'from-green-400 to-green-600',
      path: '/categories/appliances'
    },
    {
      id: 'transport',
      name: 'Transporta Līdzekļi',
      icon: '🚗',
      color: 'from-indigo-400 to-indigo-600',
      path: '/categories/transport'
    }
  ];

  const handleCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <section id='categories' className='w-full py-16 bg-gray-100'>
      <div id='categories_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div id='categories_header' className='text-center mb-12'>
          <h2 id='categories_title' className='text-3xl sm:text-4xl font-bold text-primary mb-3'>
            Pārlūkot pēc Kategorijas
          </h2>
          <p id='categories_subtitle' className='text-gray-700 text-lg'>
            Izpētes mūsu plašo ierīču kategoriju klāstu
          </p>
        </div>

        <div id='categories_grid' className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
          {categories.map((category, index) => (
            <div
              key={category.id}
              id={`category_card_${index}`}
              className={`bg-gradient-to-br ${category.color} rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:shadow-lg hover:scale-105 flex flex-col items-center justify-center gap-3 min-h-40`}
              role='button'
              tabIndex={0}
              aria-label={`Pārlūkot ${category.name} kategoriju`}
              onClick={() => handleCategoryClick(category.path)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleCategoryClick(category.path);
                }
              }}
            >
              <span id={`category_icon_${index}`} className='text-4xl sm:text-5xl'>
                {category.icon}
              </span>
              <span id={`category_name_${index}`} className='text-white font-bold text-center text-sm sm:text-base'>
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}