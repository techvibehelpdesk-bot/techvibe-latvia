import React, { useState } from 'react';
import useCustomNavigate from '../hooks/usecustomnavigate';

export default function PostAd() {
  const navigate = useCustomNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    location: '',
    description: '',
    photo: null
  });

  const [dragActive, setDragActive] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);

  const categories = [
    'Izvēlēties kategoriju',
    'Elektronika',
    'Mēbeles',
    'Apģērbs',
    'Automašīnas',
    'Mājas un dārzs',
    'Sports',
    'Cits'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setFormData(prev => ({
          ...prev,
          photo: file
        }));
        const reader = new FileReader();
        reader.onloadend = () => {
          setPhotoPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.category || formData.category === 'Izvēlēties kategoriju' || !formData.price || !formData.location || !formData.description) {
      alert('Lūdzu, aizpildiet visus laukus');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Sludinājums veiksmīgi publicēts!');
    setFormData({
      title: '',
      category: '',
      price: '',
      location: '',
      description: '',
      photo: null
    });
    setPhotoPreview(null);
  };

  return (
    <main className='w-full'>
      <section id='postad_section_main' className='w-full bg-secondary py-12'>
        <div id='postad_div_container' className='max-w-2xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div id='postad_div_header' className='mb-8'>
            <h1 id='postad_h1_title' className='text-3xl font-bold text-primary mb-2'>
              Ievietot sludinājumu
            </h1>
            <p id='postad_p_subtitle' className='text-secondary'>
              Aizpildiet formu un publicējiet savu sludinājumu
            </p>
          </div>

          <form id='postad_form_main' onSubmit={handleSubmit} className='bg-white rounded-xl shadow-lg p-8'>
            
            <div id='postad_div_formgroup_title' className='mb-6'>
              <label id='postad_label_title' htmlFor='postad_input_title' className='block text-sm font-semibold text-primary mb-2'>
                Virsraksts
              </label>
              <input
                id='postad_input_title'
                type='text'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                placeholder='Ievadiet sludinājuma virsrakstu'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary'
              />
            </div>

            <div id='postad_div_formgroup_category' className='mb-6'>
              <label id='postad_label_category' htmlFor='postad_select_category' className='block text-sm font-semibold text-primary mb-2'>
                Izvēlēties kategoriju
              </label>
              <select
                id='postad_select_category'
                name='category'
                value={formData.category}
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary'
              >
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div id='postad_div_formgroup_row' className='grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6'>
              <div id='postad_div_formgroup_price'>
                <label id='postad_label_price' htmlFor='postad_input_price' className='block text-sm font-semibold text-primary mb-2'>
                  Cena (€)
                </label>
                <input
                  id='postad_input_price'
                  type='number'
                  name='price'
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder='0.00'
                  step='0.01'
                  min='0'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary'
                />
              </div>

              <div id='postad_div_formgroup_location'>
                <label id='postad_label_location' htmlFor='postad_input_location' className='block text-sm font-semibold text-primary mb-2'>
                  Atrašanās vieta
                </label>
                <input
                  id='postad_input_location'
                  type='text'
                  name='location'
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder='Pilsēta, rajons'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary'
                />
              </div>
            </div>

            <div id='postad_div_formgroup_description' className='mb-6'>
              <label id='postad_label_description' htmlFor='postad_textarea_description' className='block text-sm font-semibold text-primary mb-2'>
                Apraksts
              </label>
              <textarea
                id='postad_textarea_description'
                name='description'
                value={formData.description}
                onChange={handleInputChange}
                placeholder='Sīkāk aprakstiet jūsu sludinājumu...'
                rows='6'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-primary resize-none'
              />
            </div>

            <div id='postad_div_formgroup_upload' className='mb-6'>
              <label id='postad_label_upload' className='block text-sm font-semibold text-primary mb-3'>
                Pievienot foto
              </label>
              <div
                id='postad_div_dropzone'
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  dragActive
                    ? 'border-accent bg-purple-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <input
                  id='postad_input_file'
                  type='file'
                  accept='image/*'
                  onChange={handleFileInput}
                  className='hidden'
                />
                <label id='postad_label_dropzone' htmlFor='postad_input_file' className='cursor-pointer block'>
                  <div id='postad_div_uploadicon' className='mb-2'>
                    <svg
                      className='mx-auto h-12 w-12 text-accent'
                      stroke='currentColor'
                      fill='none'
                      viewBox='0 0 48 48'
                      aria-hidden='true'
                    >
                      <path
                        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v4a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32 0l-3.172-3.172a4 4 0 00-5.656 0L28 28M12 28l3.172-3.172a4 4 0 015.656 0L28 28'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </div>
                  <p id='postad_p_uploadtext' className='text-primary font-medium'>
                    Velciet fotoattēlu šeit vai noklikšķiniet, lai izvēlētos
                  </p>
                  <p id='postad_p_uploadhint' className='text-secondary text-sm mt-1'>
                    PNG, JPG, GIF līdz 10MB
                  </p>
                </label>
              </div>

              {photoPreview && (
                <div id='postad_div_preview' className='mt-4'>
                  <p id='postad_p_previewlabel' className='text-sm font-semibold text-primary mb-2'>
                    Priekšskatījums:
                  </p>
                  <img
                    id='postad_img_preview'
                    src={photoPreview}
                    alt='Fotoattēla priekšskatījums'
                    className='max-h-48 rounded-lg object-cover'
                  />
                </div>
              )}
            </div>

            <button
              id='postad_button_submit'
              type='submit'
              className='w-full bg-gradient-accent text-white font-bold py-3 px-6 rounded-lg hover-lift transition-all'
            >
              Publicēt sludinājumu
            </button>
          </form>

          <div id='postad_div_footer' className='mt-8 text-center'>
            <p id='postad_p_footer' className='text-secondary'>
              Jums ir jautājumi?{' '}
              <button
                id='postad_button_contact'
                onClick={() => navigate('/')}
                className='text-accent font-semibold hover:underline'
              >
                Sazinieties ar mums
              </button>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}