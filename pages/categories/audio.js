import React, { useState } from 'react';
import useCustomNavigate from '../../hooks/usecustomnavigate';

export default function AudioCategory() {
  const navigate = useCustomNavigate();

  const [listings] = useState([
    {
      id: 1,
      title: 'Sony WH-1000XM5 Austiņas',
      price: '399€',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      alt: 'Sony WH-1000XM5 Austiņas',
      condition: 'Jauns',
      location: 'Rīga'
    },
    {
      id: 2,
      title: 'Bose QuietComfort 45',
      price: '379€',
      image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop',
      alt: 'Bose QuietComfort 45',
      condition: 'Jauns',
      location: 'Daugavpils'
    },
    {
      id: 3,
      title: 'Apple AirPods Pro',
      price: '279€',
      image: 'https://images.unsplash.com/photo-1606841837239-c5a1a8a07af7?w=500&h=500&fit=crop',
      alt: 'Apple AirPods Pro',
      condition: 'Jauns',
      location: 'Liepāja'
    },
    {
      id: 4,
      title: 'JBL Flip 6 Skaļrunis',
      price: '129€',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      alt: 'JBL Flip 6 Skaļrunis',
      condition: 'Jauns',
      location: 'Jelgava'
    },
    {
      id: 5,
      title: 'Sennheiser Momentum 3',
      price: '349€',
      image: 'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&h=500&fit=crop',
      alt: 'Sennheiser Momentum 3',
      condition: 'Lietots',
      location: 'Ventspils'
    },
    {
      id: 6,
      title: 'Beats Studio Pro',
      price: '399€',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
      alt: 'Beats Studio Pro',
      condition: 'Jauns',
      location: 'Rīga'
    }
  ]);

  return (
    <main id='audio_category_main' className='w-full min-h-screen bg-gray-50'>
      <div id='audio_category_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        
        <div id='audio_category_header' className='mb-12'>
          <button
            id='audio_category_back_button'
            onClick={() => navigate('/')}
            className='mb-6 px-4 py-2 bg-accent text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-semibold'
          >
            ← Atpakaļ uz Sākumu
          </button>
          
          <h1 id='audio_category_title' className='text-4xl sm:text-5xl font-bold text-primary mb-3'>
            🎧 Audio
          </h1>
          <p id='audio_category_subtitle' className='text-gray-700 text-lg'>
            Atklājiet mūsu plašo audio iekārtu atlasi. Jaunākie modeļi un labas cenas.
          </p>
        </div>

        <div id='audio_category_grid' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listings.map((listing, index) => (
            <div
              key={listing.id}
              id={`audio_listing_card_${index}`}
              className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift'
            >
              <div id={`audio_listing_image_container_${index}`} className='relative w-full h-48 bg-gray-200 overflow-hidden'>
                <img
                  id={`audio_listing_image_${index}`}
                  src={listing.image}
                  alt={listing.alt}
                  className='w-full h-full object-cover'
                />
              </div>

              <div id={`audio_listing_content_${index}`} className='p-4'>
                <h3 id={`audio_listing_title_${index}`} className='text-lg font-bold text-primary mb-2'>
                  {listing.title}
                </h3>

                <div id={`audio_listing_meta_${index}`} className='flex justify-between items-center mb-3'>
                  <span id={`audio_listing_condition_${index}`} className='text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold'>
                    {listing.condition}
                  </span>
                  <span id={`audio_listing_location_${index}`} className='text-sm text-gray-600'>
                    📍 {listing.location}
                  </span>
                </div>

                <div id={`audio_listing_footer_${index}`} className='flex justify-between items-center'>
                  <span id={`audio_listing_price_${index}`} className='text-2xl font-bold text-accent'>
                    {listing.price}
                  </span>
                  <button
                    id={`audio_listing_button_${index}`}
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