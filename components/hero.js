import React from 'react';

export default function Hero() {
  const handleGetStarted = () => {
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id='home' className='w-full py-16 bg-gradient-to-br from-gray-50 to-white'>
      <div id='hero_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div id='hero_content_wrapper' className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
          
          {/* Left Content */}
          <div id='hero_text_section' className='flex flex-col gap-6'>
            <div id='hero_headline_group' className='flex flex-col gap-3'>
              <h1 id='hero_main_title' className='text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight'>
                Pērc, Pārdod, Noma un Dāvini Ierīces
              </h1>
              <p id='hero_subtitle' className='text-base sm:text-lg text-gray-700 leading-relaxed'>
                TechVibe ir jūsu galvenā tirgus vieta visiem elektroniskajiem ierīcēm. Savienojieties ar pircējiem, pārdevējiem un nomniekiem jūsu kopienā.
              </p>
            </div>

            <div id='hero_features_list' className='flex flex-col gap-2'>
              <div id='hero_feature_1' className='flex items-start gap-2'>
                <span id='hero_feature_1_icon' className='text-accent text-xl font-bold mt-0.5'>✓</span>
                <span id='hero_feature_1_text' className='text-gray-800 text-sm'>Uzlabota meklēšana, lai atrastu tieši to, kas jums nepieciešams</span>
              </div>
              <div id='hero_feature_2' className='flex items-start gap-2'>
                <span id='hero_feature_2_icon' className='text-accent text-xl font-bold mt-0.5'>✓</span>
                <span id='hero_feature_2_text' className='text-gray-800 text-sm'>Draudzīgas darījumi un pārbaudīti lietotāju profili</span>
              </div>
              <div id='hero_feature_3' className='flex items-start gap-2'>
                <span id='hero_feature_3_icon' className='text-accent text-xl font-bold mt-0.5'>✓</span>
                <span id='hero_feature_3_text' className='text-gray-800 text-sm'>Remonta pakalpojumu meklētājs ierīču apkopei</span>
              </div>
            </div>

            <div id='hero_cta_buttons' className='flex flex-col sm:flex-row gap-3 pt-2'>
              <button
                id='hero_primary_cta'
                onClick={handleGetStarted}
                className='bg-gradient-accent text-white px-6 py-3 rounded-lg font-bold text-base hover:shadow-lg transition-all duration-300 hover-lift'
                aria-label='Sākt darbu ar TechVibe'
              >
                Sākt Tagad
              </button>
              <button
                id='hero_secondary_cta'
                className='border-2 border-accent text-accent px-6 py-3 rounded-lg font-bold text-base hover:bg-accent hover:text-white transition-all duration-300'
                aria-label='Uzzināt vairāk par TechVibe'
              >
                Uzzināt Vairāk
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div id='hero_image_section' className='hidden lg:flex items-center justify-center'>
            <img
              id='hero_main_image'
              src='https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
              alt='Mūsdienu elektroniskās ierīces un tehnoloģiju tirgus vieta'
              className='w-full h-auto rounded-xl shadow-lg'
            />
          </div>
        </div>

        {/* Mobile Image */}
        <div id='hero_mobile_image_section' className='lg:hidden mt-8 flex justify-center'>
          <img
            id='hero_mobile_image'
            src='https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80'
            alt='Mūsdienu elektroniskās ierīces un tehnoloģiju tirgus vieta'
            className='w-full h-auto rounded-xl shadow-lg'
          />
        </div>
      </div>
    </section>
  );
}