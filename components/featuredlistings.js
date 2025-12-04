import React, { useState, useEffect } from 'react';
import ListingsFilter from './listingsfilter';

export default function FeaturedListings() {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    const defaultListings = [
      {
        id: 1,
        title: 'iPhone 14 Pro Max',
        price: 899,
        location: 'Rīga, Latvija',
        image: 'https://images.unsplash.com/photo-1592286927505-1def25115558?auto=format&fit=crop&w=400&q=80',
        alt: 'iPhone 14 Pro Max viedtālrunis'
      },
      {
        id: 2,
        title: 'MacBook Pro 16"',
        price: 2499,
        location: 'Liepāja, Latvija',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
        alt: 'MacBook Pro 16 collu klēpjdators'
      },
      {
        id: 3,
        title: 'Sony WH-1000XM5 Austiņas',
        price: 349,
        location: 'Rīga, Latvija',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80',
        alt: 'Sony WH-1000XM5 bezvadu austiņas'
      },
      {
        id: 4,
        title: 'Canon EOS R5 Kamera',
        price: 3799,
        location: 'Daugavpils, Latvija',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
        alt: 'Canon EOS R5 profesionālā kamera'
      },
      {
        id: 5,
        title: 'PlayStation 5 Konsole',
        price: 499,
        location: 'Jelgava, Latvija',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800&q=80',
        alt: 'PlayStation 5 spēļu konsole'
      },
      {
        id: 6,
        title: 'Samsung 65" Smart TV',
        price: 799,
        location: 'Rēzekne, Latvija',
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
        alt: 'Samsung 65 collu viedā televīzija'
      },
      {
        id: 7,
        title: 'Tesla Model 3',
        price: 45000,
        location: 'Ventspils, Latvija',
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
        alt: 'Tesla Model 3 elektromobilis'
      },
      {
        id: 8,
        title: 'iPad Pro 12.9"',
        price: 1199,
        location: 'Liepāja, Latvija',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80',
        alt: 'iPad Pro 12.9 collu planšete'
      }
    ];

    setListings(defaultListings);
  }, []);

  return (
    <section id='listings' className='w-full py-16 bg-gray-50'>
      <div id='featured_listings_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div id='featured_listings_header' className='text-center mb-12'>
          <h2 id='featured_listings_title' className='text-3xl sm:text-4xl font-bold text-primary mb-3'>
            Izceltie sludinājumi
          </h2>
          <p id='featured_listings_subtitle' className='text-gray-700 text-lg'>
            Atklājiet jaunākās ierīces no mūsu tirgus vietas
          </p>
        </div>

        <div id='featured_listings_wrapper' className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar Filter */}
          <div id='featured_listings_sidebar_wrapper' className='w-full lg:w-64 flex-shrink-0'>
            <ListingsFilter />
          </div>

          {/* Listings Grid */}
          <div id='featured_listings_grid_wrapper' className='flex-1'>
            <div id='featured_listings_grid' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {listings && listings.length > 0 ? (
                listings.map((listing, index) => (
                  <div
                    key={listing.id}
                    id={`listing_card_${index}`}
                    onClick={() => setSelectedListing(listing)}
                    className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer'
                  >
                    <div id={`listing_image_wrapper_${index}`} className='relative w-full h-48 overflow-hidden bg-gray-200'>
                      <img
                        id={`listing_image_${index}`}
                        src={listing.image}
                        alt={listing.alt}
                        className='w-full h-full object-cover'
                      />
                    </div>

                    <div id={`listing_content_${index}`} className='p-4'>
                      <h3 id={`listing_title_${index}`} className='text-lg font-bold text-primary mb-2 line-clamp-2'>
                        {listing.title}
                      </h3>

                      <div id={`listing_price_location_${index}`} className='flex justify-between items-center mb-3'>
                        <span id={`listing_price_${index}`} className='text-2xl font-bold text-accent'>
                          €{listing.price.toLocaleString()}
                        </span>
                      </div>

                      <div id={`listing_location_wrapper_${index}`} className='flex items-center gap-2'>
                        <span id={`listing_location_icon_${index}`} className='text-gray-600'>📍</span>
                        <span id={`listing_location_${index}`} className='text-sm text-gray-600'>
                          {listing.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div id='listings_empty_state' className='col-span-full text-center py-12'>
                  <p id='listings_empty_message' className='text-gray-600 text-lg'>
                    Šobrīd nav pieejamu sludinājumu
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        {selectedListing && (
          <div id='product_details_section' className='mt-16 bg-white rounded-xl shadow-lg p-8'>
            <button
              id='product_details_close_btn'
              onClick={() => setSelectedListing(null)}
              className='mb-6 text-gray-600 hover:text-primary text-2xl font-bold'
              aria-label='Aizvērt produkta detaļas'
            >
              ✕
            </button>

            <div id='product_details_wrapper' className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {/* Product Image */}
              <div id='product_image_section' className='flex items-center justify-center'>
                <img
                  id='product_detail_image'
                  src={selectedListing.image}
                  alt={selectedListing.alt}
                  className='w-full h-auto rounded-lg shadow-md max-h-96 object-cover'
                />
              </div>

              {/* Product Details */}
              <div id='product_info_section' className='flex flex-col gap-6'>
                <div id='product_header_group'>
                  <h2 id='product_detail_title' className='text-4xl font-bold text-primary mb-4'>
                    {selectedListing.title}
                  </h2>
                  <div id='product_location_wrapper' className='flex items-center gap-2 mb-4'>
                    <span id='product_location_icon' className='text-2xl'>📍</span>
                    <span id='product_location_text' className='text-lg text-gray-700'>
                      {selectedListing.location}
                    </span>
                  </div>
                </div>

                <div id='product_price_section' className='border-t border-b border-gray-200 py-6'>
                  <p id='product_price_label' className='text-gray-600 text-sm mb-2'>
                    Cena
                  </p>
                  <p id='product_price_value' className='text-5xl font-bold text-accent'>
                    €{selectedListing.price.toLocaleString()}
                  </p>
                </div>

                <div id='product_description_section'>
                  <h3 id='product_description_title' className='text-xl font-bold text-primary mb-3'>
                    Apraksts
                  </h3>
                  <p id='product_description_text' className='text-gray-700 leading-relaxed'>
                    Šis ir augstākās kvalitātes produkts no mūsu tirgus vietas. Produkts ir rūpīgi pārbaudīts un gatavs izmantošanai. Kontaktējieties ar pārdevēju, lai iegūtu papildinformāciju.
                  </p>
                </div>

                <div id='product_cta_buttons' className='flex flex-col sm:flex-row gap-4 pt-4'>
                  <button
                    id='product_call_button'
                    className='bg-gradient-accent text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2'
                    aria-label='Zvanīt pārdevējam'
                  >
                    <span id='product_call_icon'>📞</span>
                    <span id='product_call_text'>Zvanīt</span>
                  </button>
                  <button
                    id='product_message_button'
                    className='bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2'
                    aria-label='Rakstīt pārdevējam'
                  >
                    <span id='product_message_icon'>✉️</span>
                    <span id='product_message_text'>Rakstīt</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}