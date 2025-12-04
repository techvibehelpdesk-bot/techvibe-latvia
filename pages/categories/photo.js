import React, { useState } from 'react';
import useCustomNavigate from '../../hooks/usecustomnavigate';

export default function PhotoCategory() {
  const navigate = useCustomNavigate();

  const [listings] = useState([
    {
      id: 1,
      title: 'Canon EOS R5',
      price: '3999€',
      image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500&h=500&fit=crop',
      alt: 'Canon EOS R5',
      condition: 'Jauns',
      location: 'Rīga'
    },
    {
      id: 2,
      title: 'Nikon Z9',
      price: '5499€',
      image: 'https://images.unsplash.com/photo-1606933248051-5ce98adc9d50?w=500&h=500&fit=crop',
      alt: 'Nikon Z9',
      condition: 'Jauns',
      location: 'Daugavpils'
    },
    {
      id: 3,
      title: 'Sony A7R V',
      price: '3999€',
      image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500&h=500&fit=crop',
      alt: 'Sony A7R V',
      condition: 'Jauns',
      location: 'Liepāja'
    },
    {
      id: 4,
      title: 'DJI Air 3S Drons',
      price: '999€',
      image: 'https://images.unsplash.com/photo-1606933248051-5ce98adc9d50?w=500&h=500&fit=crop',
      alt: 'DJI Air 3S Drons',
      condition: 'Jauns',
      location: 'Jelgava'
    },
    {
      id: 5,
      title: 'GoPro Hero 11',
      price: '499€',
      image: 'https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=500&h=500&fit=crop',
      alt: 'GoPro Hero 11',
      condition: 'Jauns',
      location: 'Ventspils'
    },
    {
      id: 6,
      title: 'Fujifilm X-T5',
      price: '1699€',
      image: 'https://images.unsplash.com/photo-1606933248051-5ce98adc9d50?w=500&h=500&fit=crop',
      alt: 'Fujifilm X-T5',
      condition: 'Lietots',
      location: 'Rīga'
    }
  ]);

  return (
    <main id='photo_category_main' className='w-full min-h-screen bg-gray-50'>
      <div id='photo_category_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        
        <div id='photo_category_header' className='mb-12'>
          <button
            id='photo_category_back_button'
            onClick={() => navigate('/')}
            className='mb-6 px-4 py-2 bg-accent text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-semibold'
          >
            ← Atpakaļ uz Sākumu
          </button>
          
          <h1 id='photo_category_title' className='text-4xl sm:text-5xl font-bold text-primary mb-3'>
            📷 Fotogrāfija
          </h1>
          <p id='photo_category_subtitle' className='text-gray-700 text-lg'>
            Atklājiet mūsu plašo fotogrāfijas iekārtu atlasi. Jaunākie modeļi un labas cenas.
          </p>
        </div>

        <div id='photo_category_grid' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listings.map((listing, index) => (
            <div
              key={listing.id}
              id={`photo_listing_card_${index}`}
              className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift'
            >
              <div id={`photo_listing_image_container_${index}`} className='relative w-full h-48 bg-gray-200 overflow-hidden'>
                <img
                  id={`photo_listing_image_${index}`}
                  src={listing.image}
                  alt={listing.alt}
                  className='w-full h-full object-cover'
                />
              </div>

              <div id={`photo_listing_content_${index}`} className='p-4'>
                <h3 id={`photo_listing_title_${index}`} className='text-lg font-bold text-primary mb-2'>
                  {listing.title}
                </h3>

                <div id={`photo_listing_meta_${index}`} className='flex justify-between items-center mb-3'>
                  <span id={`photo_listing_condition_${index}`} className='text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold'>
                    {listing.condition}
                  </span>
                  <span id={`photo_listing_location_${index}`} className='text-sm text-gray-600'>
                    📍 {listing.location}
                  </span>
                </div>

                <div id={`photo_listing_footer_${index}`} className='flex justify-between items-center'>
                  <span id={`photo_listing_price_${index}`} className='text-2xl font-bold text-accent'>
                    {listing.price}
                  </span>
                  <button
                    id={`photo_listing_button_${index}`}
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