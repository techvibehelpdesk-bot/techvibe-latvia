import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Reģistrēties',
      description: 'Izveidojiet savu bezmaksas TechVibe kontu tikai dažu minūšu laikā. Sniedziet savu pamatinformāciju un pārbaudiet savu e-pastu, lai sāktu darbu.',
      icon: '👤',
      color: 'bg-blue-100'
    },
    {
      id: 2,
      title: 'Ievietot Sludinājumu',
      description: 'Augšupielādējiet sava ierīces fotogrāfijas, pievienojiet detalizētu aprakstu, iestatiet cenu un izvēlieties, vai vēlaties pārdot, iznomāt, nolīgt vai dāvināt.',
      icon: '📱',
      color: 'bg-purple-100'
    },
    {
      id: 3,
      title: 'Pārdot vai Iznomāt',
      description: 'Savienojieties ar ieinteresētiem pircējiem vai nomniekus. Apspriediet noteikumus, sakārtojiet maksājumu un pabeigiet darījumu draudzīgi caur mūsu platformu.',
      icon: '💰',
      color: 'bg-green-100'
    }
  ];

  return (
    <section id='how_it_works' className='w-full py-16 bg-white'>
      <div id='how_it_works_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div id='how_it_works_header' className='text-center mb-12'>
          <h2 id='how_it_works_title' className='text-3xl sm:text-4xl font-bold text-primary mb-3'>
            Kā Tas Darbojas
          </h2>
          <p id='how_it_works_subtitle' className='text-gray-700 text-lg max-w-2xl mx-auto'>
            Sāciet ar TechVibe trīs vienkāršos soļos. Neatkarīgi no tā, vai vēlaties pārdot, iznomāt, nolīgt vai dāvināt savas ierīces, mēs to padarām vienkāršu.
          </p>
        </div>

        <div id='how_it_works_steps' className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {steps.map((step, index) => (
            <div
              key={step.id}
              id={`how_it_works_step_${index}`}
              className='relative'
            >
              {/* Step Card */}
              <div id={`step_card_${index}`} className='bg-gray-50 rounded-xl p-8 text-center h-full'>
                {/* Step Number */}
                <div id={`step_number_wrapper_${index}`} className='mb-6'>
                  <div id={`step_number_circle_${index}`} className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span id={`step_number_${index}`} className='text-3xl font-bold text-primary'>
                      {step.id}
                    </span>
                  </div>
                </div>

                {/* Step Icon */}
                <div id={`step_icon_${index}`} className='text-5xl mb-4'>
                  {step.icon}
                </div>

                {/* Step Title */}
                <h3 id={`step_title_${index}`} className='text-2xl font-bold text-primary mb-3'>
                  {step.title}
                </h3>

                {/* Step Description */}
                <p id={`step_description_${index}`} className='text-gray-700 leading-relaxed'>
                  {step.description}
                </p>
              </div>

              {/* Arrow Connector (hidden on last item) */}
              {index < steps.length - 1 && (
                <div id={`step_arrow_${index}`} className='hidden md:flex absolute top-1/2 -right-4 transform -translate-y-1/2 text-3xl text-accent'>
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div id='how_it_works_cta' className='mt-16 text-center'>
          <p id='how_it_works_cta_text' className='text-lg text-gray-700 mb-6'>
            Gatavs sākt? Pievienojieties tūkstošiem lietotāju, kuri jau pērk un pārdod TechVibe.
          </p>
          <button
            id='how_it_works_cta_button'
            className='bg-gradient-accent text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300'
            aria-label='Sākt darbu ar TechVibe'
          >
            Sākt Tagad
          </button>
        </div>
      </div>
    </section>
  );
}