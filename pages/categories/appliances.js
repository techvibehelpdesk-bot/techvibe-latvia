import React, { useState } from 'react';
import useCustomNavigate from '../../hooks/usecustomnavigate';

export default function AppliancesCategory() {
  const navigate = useCustomNavigate();

  const [listings] = useState([
    {
      id: 1,
      title: 'Samsung 65" 4K Smart TV',
      price: '799€',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop',
      alt: 'Samsung 65 inch 4K Smart TV',
      condition: 'Jauns',
      location: 'Rīga'
    },
    {
      id: 2,
      title: 'LG OLED 55" TV',
      price: '1299€',
      image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop',
      alt: 'LG OLED 55 inch TV',
      condition: 'Jauns',
      location: 'Daugavpils'
    },
    {
      id: 3,
      title: 'Sony Soundbar HT-G700',
      price: '399€',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      alt: 'Sony Soundbar HT-G700',
      condition: 'Jauns',
      location: 'Liepāja'
    },
    {
      id: 4,
      title: 'Bose Home Speaker 500',
      price: '349€',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      alt: 'Bose Home Speaker 500',
      condition: 'Jauns',
      location: 'Jelgava'
    },
    {
      id: 5,
      title: 'Philips Hue Smart Lights',
      price: '199€',
      image: 'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=500&fit=crop',
      alt: 'Philips Hue Smart Lights',
      condition: 'Jauns',
      location: 'Ventspils'
    },
    {
      id: 6,
      title: 'Amazon Echo Dot 5',
      price: '79€',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      alt: 'Amazon Echo Dot 5',
      condition: 'Jauns',
      location: 'Rīga'
    }
  ]);

  return (
    <main id='appliances_category_main' className='w-full min-h-screen bg-gray-50'>
      <div id='appliances_category_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        
        <div id='appliances_category_header' className='mb-12'>
          <button
            id='appliances_category_back_button'
            onClick={() => navigate('/')}
            className='mb-6 px-4 py-2 bg-accent text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-semibold'
          >
            ← Atpakaļ uz Sākumu
          </button>
          
          <h1 id='appliances_category_title' className='text-4xl sm:text-5xl font-bold text-primary mb-3'>
            🏠 Skaņa un Attēls
          </h1>
          <p id='appliances_category_subtitle' className='text-gray-700 text-lg'>
            Atklājiet mūsu plašo skaņas un attēla iekārtu atlasi. Jaunākie modeļi un labas cenas.
          </p>
        </div>

        <div id='appliances_category_grid' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listings.map((listing, index) => (
            <div
              key={listing.id}
              id={`appliances_listing_card_${index}`}
              className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift'
            >
              <div id={`appliances_listing_image_container_${index}`} className='relative w-full h-48 bg-gray-200 overflow-hidden'>
                <img
                  id={`appliances_listing_image_${index}`}
                  src={listing.image}
                  alt={listing.alt}
                  className='w-full h-full object-cover'
                />
              </div>

              <div id={`appliances_listing_content_${index}`} className='p-4'>
                <h3 id={`appliances_listing_title_${index}`} className='text-lg font-bold text-primary mb-2'>
                  {listing.title}
                </h3>

                <div id={`appliances_listing_meta_${index}`} className='flex justify-between items-center mb-3'>
                  <span id={`appliances_listing_condition_${index}`} className='text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold'>
                    {listing.condition}
                  </span>
                  <span id={`appliances_listing_location_${index}`} className='text-sm text-gray-600'>
                    📍 {listing.location}
                  </span>
                </div>

                <div id={`appliances_listing_footer_${index}`} className='flex justify-between items-center'>
                  <span id={`appliances_listing_price_${index}`} className='text-2xl font-bold text-accent'>
                    {listing.price}
                  </span>
                  <button
                    id={`appliances_listing_button_${index}`}
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