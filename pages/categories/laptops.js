import React, { useState } from 'react';
import useCustomNavigate from '../../hooks/usecustomnavigate';

export default function LaptopsCategory() {
  const navigate = useCustomNavigate();

  const [listings] = useState([
    {
      id: 1,
      title: 'MacBook Pro 16"',
      price: '2499€',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      alt: 'MacBook Pro 16 inch',
      condition: 'Jauns',
      location: 'Rīga'
    },
    {
      id: 2,
      title: 'Dell XPS 15',
      price: '1899€',
      image: 'https://images.unsplash.com/photo-1588872657840-790ff3bde08c?w=500&h=500&fit=crop',
      alt: 'Dell XPS 15',
      condition: 'Jauns',
      location: 'Daugavpils'
    },
    {
      id: 3,
      title: 'HP Pavilion 15',
      price: '699€',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop',
      alt: 'HP Pavilion 15',
      condition: 'Lietots',
      location: 'Liepāja'
    },
    {
      id: 4,
      title: 'Lenovo ThinkPad X1',
      price: '1299€',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
      alt: 'Lenovo ThinkPad X1',
      condition: 'Jauns',
      location: 'Jelgava'
    },
    {
      id: 5,
      title: 'ASUS VivoBook 15',
      price: '549€',
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop',
      alt: 'ASUS VivoBook 15',
      condition: 'Jauns',
      location: 'Ventspils'
    },
    {
      id: 6,
      title: 'MacBook Air M2',
      price: '1599€',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      alt: 'MacBook Air M2',
      condition: 'Lietots',
      location: 'Rīga'
    }
  ]);

  return (
    <main id='laptops_category_main' className='w-full min-h-screen bg-gray-50'>
      <div id='laptops_category_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        
        <div id='laptops_category_header' className='mb-12'>
          <button
            id='laptops_category_back_button'
            onClick={() => navigate('/')}
            className='mb-6 px-4 py-2 bg-accent text-white rounded-lg hover:bg-purple-700 transition-all duration-300 font-semibold'
          >
            ← Atpakaļ uz Sākumu
          </button>
          
          <h1 id='laptops_category_title' className='text-4xl sm:text-5xl font-bold text-primary mb-3'>
            💻 Klēpjdatori
          </h1>
          <p id='laptops_category_subtitle' className='text-gray-700 text-lg'>
            Atklājiet mūsu plašo klēpjdatoru atlasi. Jaunākie modeļi un labas cenas.
          </p>
        </div>

        <div id='laptops_category_grid' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {listings.map((listing, index) => (
            <div
              key={listing.id}
              id={`laptops_listing_card_${index}`}
              className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden hover-lift'
            >
              <div id={`laptops_listing_image_container_${index}`} className='relative w-full h-48 bg-gray-200 overflow-hidden'>
                <img
                  id={`laptops_listing_image_${index}`}
                  src={listing.image}
                  alt={listing.alt}
                  className='w-full h-full object-cover'
                />
              </div>

              <div id={`laptops_listing_content_${index}`} className='p-4'>
                <h3 id={`laptops_listing_title_${index}`} className='text-lg font-bold text-primary mb-2'>
                  {listing.title}
                </h3>

                <div id={`laptops_listing_meta_${index}`} className='flex justify-between items-center mb-3'>
                  <span id={`laptops_listing_condition_${index}`} className='text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold'>
                    {listing.condition}
                  </span>
                  <span id={`laptops_listing_location_${index}`} className='text-sm text-gray-600'>
                    📍 {listing.location}
                  </span>
                </div>

                <div id={`laptops_listing_footer_${index}`} className='flex justify-between items-center'>
                  <span id={`laptops_listing_price_${index}`} className='text-2xl font-bold text-accent'>
                    {listing.price}
                  </span>
                  <button
                    id={`laptops_listing_button_${index}`}
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