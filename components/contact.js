import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id='contact' className='w-full py-20 bg-gray-50'>
      <div id='contact_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Section Header */}
        <div id='contact_header' className='text-center mb-16'>
          <h2 id='contact_title' className='text-4xl sm:text-5xl font-bold text-primary mb-4'>
            Sazinies ar Mums
          </h2>
          <p id='contact_subtitle' className='text-lg text-gray-700 max-w-2xl mx-auto'>
            Vai jums ir jautājumi vai jums nepieciešama palīdzība? Mēs labprāt dzirdētu no jums. Sazinies ar mūsu komandu vai plāno demonstrāciju šodien.
          </p>
        </div>

        <div id='contact_content_wrapper' className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          
          {/* Contact Information */}
          <div id='contact_info_section' className='flex flex-col gap-8'>
            
            {/* Contact Methods */}
            <div id='contact_methods_container' className='space-y-6'>
              
              {/* Email */}
              <div id='contact_method_email' className='flex gap-4'>
                <div id='contact_method_email_icon' className='text-4xl text-accent flex-shrink-0'>
                  ✉️
                </div>
                <div id='contact_method_email_content'>
                  <h3 id='contact_method_email_title' className='text-xl font-bold text-primary mb-2'>
                    E-pasts
                  </h3>
                  <p id='contact_method_email_text' className='text-gray-700'>
                    techvibehelpdesk@gmail.com
                  </p>
                  <p id='contact_method_email_response' className='text-gray-600 text-sm mt-1'>
                    Mēs atbildam 24 stundu laikā
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div id='contact_method_phone' className='flex gap-4'>
                <div id='contact_method_phone_icon' className='text-4xl text-accent flex-shrink-0'>
                  📞
                </div>
                <div id='contact_method_phone_content'>
                  <h3 id='contact_method_phone_title' className='text-xl font-bold text-primary mb-2'>
                    Tālrunis
                  </h3>
                  <p id='contact_method_phone_text' className='text-gray-700'>
                    +371 28655228
                  </p>
                  <p id='contact_method_phone_hours' className='text-gray-600 text-sm mt-1'>
                    Pirmdiena - Piektdiena, 9:00 - 18:00
                  </p>
                </div>
              </div>

              {/* Address */}
              <div id='contact_method_address' className='flex gap-4'>
                <div id='contact_method_address_icon' className='text-4xl text-accent flex-shrink-0'>
                  📍
                </div>
                <div id='contact_method_address_content'>
                  <h3 id='contact_method_address_title' className='text-xl font-bold text-primary mb-2'>
                    Adrese
                  </h3>
                  <p id='contact_method_address_text' className='text-gray-700'>
                    Brīvības iela 123<br />
                    Rīga, LV-1001<br />
                    Latvija
                  </p>
                </div>
              </div>

              {/* Live Chat */}
              <div id='contact_method_chat' className='flex gap-4'>
                <div id='contact_method_chat_icon' className='text-4xl text-accent flex-shrink-0'>
                  💬
                </div>
                <div id='contact_method_chat_content'>
                  <h3 id='contact_method_chat_title' className='text-xl font-bold text-primary mb-2'>
                    Tiešā Saziņa
                  </h3>
                  <p id='contact_method_chat_text' className='text-gray-700'>
                    Pieejams mūsu vietnē
                  </p>
                  <p id='contact_method_chat_hours' className='text-gray-600 text-sm mt-1'>
                    24/7 atbalsts visiem lietotājiem
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div id='contact_social_section' className='pt-8 border-t border-gray-300'>
              <h3 id='contact_social_title' className='text-lg font-bold text-primary mb-4'>
                Sekojiet Mums
              </h3>
              <div id='contact_social_links' className='flex gap-4'>
                <a
                  id='contact_social_facebook'
                  href='#'
                  className='w-12 h-12 bg-gradient-accent text-white rounded-full flex items-center justify-center text-xl hover:shadow-lg transition-all duration-300'
                  aria-label='Sekojiet TechVibe uz Facebook'
                >
                  f
                </a>
                <a
                  id='contact_social_twitter'
                  href='#'
                  className='w-12 h-12 bg-gradient-accent text-white rounded-full flex items-center justify-center text-xl hover:shadow-lg transition-all duration-300'
                  aria-label='Sekojiet TechVibe uz Twitter'
                >
                  𝕏
                </a>
                <a
                  id='contact_social_linkedin'
                  href='#'
                  className='w-12 h-12 bg-gradient-accent text-white rounded-full flex items-center justify-center text-xl hover:shadow-lg transition-all duration-300'
                  aria-label='Sekojiet TechVibe uz LinkedIn'
                >
                  in
                </a>
                <a
                  id='contact_social_instagram'
                  href='#'
                  className='w-12 h-12 bg-gradient-accent text-white rounded-full flex items-center justify-center text-xl hover:shadow-lg transition-all duration-300'
                  aria-label='Sekojiet TechVibe uz Instagram'
                >
                  📷
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div id='contact_form_section' className='bg-white p-8 rounded-xl shadow-lg'>
            <h3 id='contact_form_title' className='text-2xl font-bold text-primary mb-6'>
              Nosūtiet Mums Ziņojumu
            </h3>

            {submitted && (
              <div id='contact_success_message' className='mb-6 p-4 bg-green-100 border border-green-400 rounded-lg'>
                <p id='contact_success_text' className='text-green-800 font-medium'>
                  ✓ Paldies! Jūsu ziņojums ir veiksmīgi nosūtīts. Mēs drīz atbildēsim.
                </p>
              </div>
            )}

            <form id='contact_form' onSubmit={handleSubmit} className='space-y-4'>
              
              {/* Name Field */}
              <div id='contact_form_name_group' className='flex flex-col gap-2'>
                <label id='contact_form_name_label' htmlFor='name' className='font-bold text-primary'>
                  Pilnais Vārds
                </label>
                <input
                  id='name'
                  type='text'
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder='Jānis Bērziņš'
                  required
                  className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-50 text-gray-800'
                  aria-label='Ievadiet savu pilno vārdu'
                />
              </div>

              {/* Email Field */}
              <div id='contact_form_email_group' className='flex flex-col gap-2'>
                <label id='contact_form_email_label' htmlFor='email' className='font-bold text-primary'>
                  E-pasta Adrese
                </label>
                <input
                  id='email'
                  type='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder='janis@example.com'
                  required
                  className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-50 text-gray-800'
                  aria-label='Ievadiet savu e-pasta adresi'
                />
              </div>

              {/* Phone Field */}
              <div id='contact_form_phone_group' className='flex flex-col gap-2'>
                <label id='contact_form_phone_label' htmlFor='phone' className='font-bold text-primary'>
                  Tālruņa Numurs
                </label>
                <input
                  id='phone'
                  type='tel'
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder='+371 67 123 456'
                  className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-50 text-gray-800'
                  aria-label='Ievadiet savu tālruņa numuru'
                />
              </div>

              {/* Subject Field */}
              <div id='contact_form_subject_group' className='flex flex-col gap-2'>
                <label id='contact_form_subject_label' htmlFor='subject' className='font-bold text-primary'>
                  Tēma
                </label>
                <select
                  id='subject'
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-50 text-gray-800'
                  aria-label='Atlasiet tēmu'
                >
                  <option value=''>Atlasiet tēmu...</option>
                  <option value='general'>Vispārīgs Jautājums</option>
                  <option value='support'>Tehniskais Atbalsts</option>
                  <option value='business'>Biznesa Partnerība</option>
                  <option value='feedback'>Atsauksme</option>
                  <option value='other'>Cits</option>
                </select>
              </div>

              {/* Message Field */}
              <div id='contact_form_message_group' className='flex flex-col gap-2'>
                <label id='contact_form_message_label' htmlFor='message' className='font-bold text-primary'>
                  Ziņojums
                </label>
                <textarea
                  id='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder='Pastāstiet mums, kā mēs varam jums palīdzēt...'
                  rows='5'
                  required
                  className='px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-50 text-gray-800 resize-none'
                  aria-label='Ievadiet savu ziņojumu'
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                id='contact_form_submit'
                type='submit'
                className='w-full bg-gradient-accent text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 mt-6'
                aria-label='Nosūtīt ziņojumu'
              >
                Nosūtīt Ziņojumu
              </button>

              {/* Privacy Notice */}
              <p id='contact_form_privacy' className='text-xs text-gray-600 text-center mt-4'>
                Mēs respektējam jūsu privātumu. Jūsu informācija tiks izmantota tikai, lai atbildētu uz jūsu jautājumu.
              </p>
            </form>
          </div>
        </div>

        {/* Demo Scheduling Section */}
        <div id='contact_demo_section' className='mt-20 bg-gradient-accent rounded-xl p-12 text-center'>
          <h3 id='contact_demo_title' className='text-3xl font-bold text-white mb-4'>
            Plānojiet Demonstrāciju
          </h3>
          <p id='contact_demo_text' className='text-gray-100 text-lg mb-8 max-w-2xl mx-auto'>
            Vēlaties redzēt TechVibe darbībā? Plānojiet personalizētu demonstrāciju ar mūsu komandu. Mēs parādīsim, kā maksimāli izmantot savus sludinājumus un sasniegt vairāk pircēju.
          </p>
          <button
            id='contact_demo_button'
            className='bg-white text-accent px-8 py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300'
            aria-label='Plānojiet demonstrāciju'
          >
            Plānojiet Demonstrāciju
          </button>
        </div>
      </div>
    </section>
  );
}