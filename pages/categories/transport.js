import React, { useState } from 'react';
import useCustomNavigate from '../../hooks/usecustomnavigate';

export default function TransportCategory() {
  const navigate = useCustomNavigate();

  const [listings] = useState([
    {
      id: 1,
      title: 'BMW 3 Series 2022',
      price: '35000€',
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=500&fit=crop',
      alt: 'BMW 3 Series 2022',
      condition: 'Jauns',
      location: 'Rīga'
    },
    {
      id: 2,
      title: 'Audi A4 2021',
      price: '28000€',
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=500&fit=crop',
      alt: 'Audi A4 2021',
      condition: 'Jauns',
      location: 'Daugavpils'
    },
    {
      id: 3,
      title: 'Volkswagen Golf 2020',
      price: '18000€',
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=500&fit=crop',
      alt: 'Volkswagen Golf 2020',
      condition: 'Lietots',
      location: 'Liepāja'
    },
    {
      id: 4,
      title: 'Tesla Model 3 2023',
      price: '45000€',
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=500&fit=crop',
      alt: 'Tesla Model 3 2023',
      condition: 'Jauns',
      location: 'Jelgava'
    },
    {
      id: 5,
      title: 'Honda Civic 2019',
      price: '15000€',
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=500&fit=crop',
      alt: 'Honda Civic 2019',
      condition: 'Lietots',
      location: 'Ventspils'
    },
    {
      id: 6,
      title: 'Mercedes-Benz C-Class 2022',
      price: '42000€',
      image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=500&fit=crop',
      alt: 'Mercedes-Benz C-Class 2022',
      condition: 'Jauns',
      location: 'Rīga'
    }
  ]);

  return (
    <main id='transport_category_main' className='w-full min-h-screen bg-gray-50'>
      <div id='transport_category_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        
        <div id='transport_category_header' className='mb-12'>
          <button
            id='transport_category_back_button'
            onClick={() => navigate('/')}
            className='mb-6 px-4 py-2 bg-accent text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-semibold'
          >
            ← Atpakaļ uz Sākumu
          </button>
          
          <h1 id='transport_category_title' className='text-4xl sm:text-5xl font-bold text-primary mb-3'>
            🚗 Transporta Līdzekļi
          </h1>
          <p id='transport_category_subtitle' className='text-gray-700 text-lg'>
            Atklājiet mūsu plašo transporta līdzekļu atlasi. Jaunākie modeļi un labas cenas.
          </p>
        </div>

        <div id='transport_category_grid' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listings.map((listing, index) => (
            <div
              key={listing.id}
              id={`transport_listing_card_${index}`}
              className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift'
            >
              <div id={`transport_listing_image_container_${index}`} className='relative w-full h-48 bg-gray-200 overflow-hidden'>
                <img
                  id={`transport_listing_image_${index}`}
                  src={listing.image}
                  alt={listing.alt}
                  className='w-full h-full object-cover'
                />
              </div>

              <div id={`transport_listing_content_${index}`} className='p-4'>
                <h3 id={`transport_listing_title_${index}`} className='text-lg font-bold text-primary mb-2'>
                  {listing.title}
                </h3>

                <div id={`transport_listing_meta_${index}`} className='flex justify-between items-center mb-3'>
                  <span id={`transport_listing_condition_${index}`} className='text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold'>
                    {listing.condition}
                  </span>
                  <span id={`transport_listing_location_${index}`} className='text-sm text-gray-600'>
                    📍 {listing.location}
                  </span>
                </div>

                <div id={`transport_listing_footer_${index}`} className='flex justify-between items-center'>
                  <span id={`transport_listing_price_${index}`} className='text-2xl font-bold text-accent'>
                    {listing.price}
                  </span>
                  <button
                    id={`transport_listing_button_${index}`}
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