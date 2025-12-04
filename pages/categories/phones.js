import React, { useState } from 'react';
import useCustomNavigate from '../../hooks/usecustomnavigate';

export default function PhonesCategory() {
  const navigate = useCustomNavigate();

  const [listings] = useState([
    {
      id: 1,
      title: 'iPhone 14 Pro Max',
      price: '899€',
      image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop',
      alt: 'iPhone 14 Pro Max',
      condition: 'Jauns',
      location: 'Rīga'
    },
    {
      id: 2,
      title: 'Samsung Galaxy S23',
      price: '799€',
      image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop',
      alt: 'Samsung Galaxy S23',
      condition: 'Jauns',
      location: 'Daugavpils'
    },
    {
      id: 3,
      title: 'Google Pixel 7',
      price: '599€',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
      alt: 'Google Pixel 7',
      condition: 'Lietots',
      location: 'Liepāja'
    },
    {
      id: 4,
      title: 'OnePlus 11',
      price: '699€',
      image: 'https://images.unsplash.com/photo-1511454612769-a02fbc830d7d?w=500&h=500&fit=crop',
      alt: 'OnePlus 11',
      condition: 'Jauns',
      location: 'Jelgava'
    },
    {
      id: 5,
      title: 'Xiaomi 13',
      price: '549€',
      image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=500&h=500&fit=crop',
      alt: 'Xiaomi 13',
      condition: 'Jauns',
      location: 'Ventspils'
    },
    {
      id: 6,
      title: 'iPhone 13',
      price: '649€',
      image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?w=500&h=500&fit=crop',
      alt: 'iPhone 13',
      condition: 'Lietots',
      location: 'Rīga'
    }
  ]);

  return (
    <main id='phones_category_main' className='w-full min-h-screen bg-gray-50'>
      <div id='phones_category_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        
        <div id='phones_category_header' className='mb-12'>
          <button
            id='phones_category_back_button'
            onClick={() => navigate('/')}
            className='mb-6 px-4 py-2 bg-accent text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-semibold'
          >
            ← Atpakaļ uz Sākumu
          </button>
          
          <h1 id='phones_category_title' className='text-4xl sm:text-5xl font-bold text-primary mb-3'>
            📱 Tālruņi
          </h1>
          <p id='phones_category_subtitle' className='text-gray-700 text-lg'>
            Atklājiet mūsu plašo tālruņu atlasi. Jaunākie modeļi un labas cenas.
          </p>
        </div>

        <div id='phones_category_grid' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listings.map((listing, index) => (
            <div
              key={listing.id}
              id={`phones_listing_card_${index}`}
              className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift'
            >
              <div id={`phones_listing_image_container_${index}`} className='relative w-full h-48 bg-gray-200 overflow-hidden'>
                <img
                  id={`phones_listing_image_${index}`}
                  src={listing.image}
                  alt={listing.alt}
                  className='w-full h-full object-cover'
                />
              </div>

              <div id={`phones_listing_content_${index}`} className='p-4'>
                <h3 id={`phones_listing_title_${index}`} className='text-lg font-bold text-primary mb-2'>
                  {listing.title}
                </h3>

                <div id={`phones_listing_meta_${index}`} className='flex justify-between items-center mb-3'>
                  <span id={`phones_listing_condition_${index}`} className='text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold'>
                    {listing.condition}
                  </span>
                  <span id={`phones_listing_location_${index}`} className='text-sm text-gray-600'>
                    📍 {listing.location}
                  </span>
                </div>

                <div id={`phones_listing_footer_${index}`} className='flex justify-between items-center'>
                  <span id={`phones_listing_price_${index}`} className='text-2xl font-bold text-accent'>
                    {listing.price}
                  </span>
                  <button
                    id={`phones_listing_button_${index}`}
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