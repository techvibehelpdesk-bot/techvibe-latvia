import React, { useState } from 'react';

export default function ListingsFilter() {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);

  const brands = ['Apple', 'Samsung', 'Sony', 'Canon', 'Microsoft', 'LG', 'Dell', 'HP'];
  const conditions = ['Jauns', 'Kā Jauns', 'Labs', 'Pieņemams', 'Daļām'];

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handleConditionToggle = (condition) => {
    setSelectedCondition((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value);
    if (newRange[0] <= newRange[1]) {
      setPriceRange(newRange);
    }
  };

  const handleResetFilters = () => {
    setPriceRange([0, 50000]);
    setSelectedBrands([]);
    setSelectedCondition([]);
  };

  return (
    <aside id='listings_filter_sidebar' className='w-full lg:w-64 bg-white rounded-xl shadow-md p-6 h-fit'>
      <div id='filter_header' className='mb-6'>
        <h3 id='filter_title' className='text-xl font-bold text-primary mb-4'>
          Filtri
        </h3>
      </div>

      {/* Price Range Filter */}
      <div id='filter_price_section' className='mb-6 pb-6 border-b border-gray-200'>
        <h4 id='filter_price_title' className='text-lg font-semibold text-primary mb-4'>
          Cena
        </h4>
        <div id='filter_price_inputs' className='space-y-3'>
          <div id='filter_price_min_wrapper' className='flex items-center gap-2'>
            <label id='filter_price_min_label' htmlFor='price_min' className='text-sm text-gray-700 w-12'>
              Min:
            </label>
            <input
              id='price_min'
              type='number'
              min='0'
              max='50000'
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className='flex-1 px-3 py-2 border border-gray-300 rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent'
            />
          </div>
          <div id='filter_price_max_wrapper' className='flex items-center gap-2'>
            <label id='filter_price_max_label' htmlFor='price_max' className='text-sm text-gray-700 w-12'>
              Max:
            </label>
            <input
              id='price_max'
              type='number'
              min='0'
              max='50000'
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className='flex-1 px-3 py-2 border border-gray-300 rounded-lg text-primary focus:outline-none focus:ring-2 focus:ring-accent'
            />
          </div>
          <div id='filter_price_display' className='text-sm text-gray-600 mt-2'>
            €{priceRange[0].toLocaleString()} - €{priceRange[1].toLocaleString()}
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div id='filter_brand_section' className='mb-6 pb-6 border-b border-gray-200'>
        <h4 id='filter_brand_title' className='text-lg font-semibold text-primary mb-4'>
          Marka
        </h4>
        <div id='filter_brand_list' className='space-y-3'>
          {brands.map((brand, index) => (
            <label
              key={index}
              id={`filter_brand_label_${index}`}
              className='flex items-center gap-3 cursor-pointer'
            >
              <input
                id={`filter_brand_checkbox_${index}`}
                type='checkbox'
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className='w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer'
              />
              <span id={`filter_brand_text_${index}`} className='text-sm text-gray-700'>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Condition Filter */}
      <div id='filter_condition_section' className='mb-6'>
        <h4 id='filter_condition_title' className='text-lg font-semibold text-primary mb-4'>
          Stāvoklis
        </h4>
        <div id='filter_condition_list' className='space-y-3'>
          {conditions.map((condition, index) => (
            <label
              key={index}
              id={`filter_condition_label_${index}`}
              className='flex items-center gap-3 cursor-pointer'
            >
              <input
                id={`filter_condition_checkbox_${index}`}
                type='checkbox'
                checked={selectedCondition.includes(condition)}
                onChange={() => handleConditionToggle(condition)}
                className='w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent cursor-pointer'
              />
              <span id={`filter_condition_text_${index}`} className='text-sm text-gray-700'>
                {condition}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        id='filter_reset_button'
        onClick={handleResetFilters}
        className='w-full bg-gray-200 text-primary px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors duration-300'
        aria-label='Atiestatīt visus filtrus'
      >
        Atiestatīt Filtrus
      </button>
    </aside>
  );
}