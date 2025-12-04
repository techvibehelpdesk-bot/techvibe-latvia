import React, { useState } from 'react';
import useCustomNavigate from '../../hooks/usecustomnavigate';

export default function GamingCategory() {
  const navigate = useCustomNavigate();

  const [listings] = useState([
    {
      id: 1,
      title: 'PlayStation 5',
      price: '499€',
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a8a07af7?w=500&h=500&fit=crop',
      alt: 'PlayStation 5',
      condition: 'Jauns',
      location: 'Rīga'
    },
    {
      id: 2,
      title: 'Xbox Series X',
      price: '499€',
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a8a07af7?w=500&h=500&fit=crop',
      alt: 'Xbox Series X',
      condition: 'Jauns',
      location: 'Daugavpils'
    },
    {
      id: 3,
      title: 'Nintendo Switch OLED',
      price: '349€',
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a8a07af7?w=500&h=500&fit=crop',
      alt: 'Nintendo Switch OLED',
      condition: 'Jauns',
      location: 'Liepāja'
    },
    {
      id: 4,
      title: 'Gaming Headset HyperX',
      price: '129€',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      alt: 'Gaming Headset HyperX',
      condition: 'Jauns',
      location: 'Jelgava'
    },
    {
      id: 5,
      title: 'Razer DeathAdder V3',
      price: '69€',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
      alt: 'Razer DeathAdder V3',
      condition: 'Jauns',
      location: 'Ventspils'
    },
    {
      id: 6,
      title: 'Mechanical Gaming Keyboard',
      price: '149€',
      image: 'https://images.unsplash.com/photo-1587829191301-4b34e2b5a3f5?w=500&h=500&fit=crop',
      alt: 'Mechanical Gaming Keyboard',
      condition: 'Jauns',
      location: 'Rīga'
    }
  ]);

  return (
    <main id='gaming_category_main' className='w-full min-h-screen bg-gray-50'>
      <div id='gaming_category_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        
        <div id='gaming_category_header' className='mb-12'>
          <button
            id='gaming_category_back_button'
            onClick={() => navigate('/')}
            className='mb-6 px-4 py-2 bg-accent text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-semibold'
          >
            ← Atpakaļ uz Sākumu
          </button>
          
          <h1 id='gaming_category_title' className='text-4xl sm:text-5xl font-bold text-primary mb-3'>
            🎮 Spēles
          </h1>
          <p id='gaming_category_subtitle' className='text-gray-700 text-lg'>
            Atklājiet mūsu plašo spēļu iekārtu atlasi. Jaunākie modeļi un labas cenas.
          </p>
        </div>

        <div id='gaming_category_grid' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listings.map((listing, index) => (
            <div
              key={listing.id}
              id={`gaming_listing_card_${index}`}
              className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift'
            >
              <div id={`gaming_listing_image_container_${index}`} className='relative w-full h-48 bg-gray-200 overflow-hidden'>
                <img
                  id={`gaming_listing_image_${index}`}
                  src={listing.image}
                  alt={listing.alt}
                  className='w-full h-full object-cover'
                />
              </div>

              <div id={`gaming_listing_content_${index}`} className='p-4'>
                <h3 id={`gaming_listing_title_${index}`} className='text-lg font-bold text-primary mb-2'>
                  {listing.title}
                </h3>

                <div id={`gaming_listing_meta_${index}`} className='flex justify-between items-center mb-3'>
                  <span id={`gaming_listing_condition_${index}`} className='text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold'>
                    {listing.condition}
                  </span>
                  <span id={`gaming_listing_location_${index}`} className='text-sm text-gray-600'>
                    📍 {listing.location}
                  </span>
                </div>

                <div id={`gaming_listing_footer_${index}`} className='flex justify-between items-center'>
                  <span id={`gaming_listing_price_${index}`} className='text-2xl font-bold text-accent'>
                    {listing.price}
                  </span>
                  <button
                    id={`gaming_listing_button_${index}`}
                    className='px-4 py-2 bg-accent text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-semibold'
                  >
                    Skatīt
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}