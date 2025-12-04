import React from 'react';

export default function Services() {
  const services = [
    {
      id: 'service_1',
      icon: '🔍',
      title: 'Uzlabota Meklēšanas Sistēma',
      description: 'Atrodiet tieši to, kas jums nepieciešams, ar mūsu jaudīgajām filtrēšanas iespējām. Meklējiet pēc ierīces tipa, stāvokļa, cenas diapazona, atrašanās vietas un sludinājuma tipa (pirkšana, pārdošana, noma, nolīgums vai dāvināšana).'
    },
    {
      id: 'service_2',
      icon: '👤',
      title: 'Stabili Lietotāju Profili',
      description: 'Veidojiet uzticību ar pārbaudītiem profiliem, vērtējumiem un atsauksmēm. Parādiet savus sludinājumus, darījumu vēsturi un savienojieties ar tehnoloģiju entuziastu kopienu.'
    },
    {
      id: 'service_3',
      icon: '🔧',
      title: 'Remonta Pakalpojumu Meklētājs',
      description: 'Atklājiet sertificētus remontdarbiniekus un remonta veikalus netālu no jums. Saņemiet ierīču apkopes pakalpojumus, garantijas informāciju un eksperta padomu vienā vietā.'
    },
    {
      id: 'service_4',
      icon: '💼',
      title: 'Apmaksāti Palīdzības Pakalpojumi',
      description: 'Paplašiniet savu sasniedzamību ar premium funkcijām. Iegūstiet izceltu sludinājumus, prioritāro atbalstu un profesionālo mārketingu, lai ātrāk atrastu pircējus vai saņēmējus.'
    },
    {
      id: 'service_5',
      icon: '🛡️',
      title: 'Draudzīgi Darījumi',
      description: 'Tirgojieties ar pārliecību, izmantojot mūsu draudzīgo maksājumu veidu, pircēja aizsardzību un strīdu risināšanas sistēmu. Jūsu darījumi vienmēr ir aizsargāti.'
    },
    {
      id: 'service_6',
      icon: '📱',
      title: 'Mobilā Platforma',
      description: 'Piekļūstiet TechVibe jebkurā laikā un jebkur. Mūsu atsaucīgais dizains darbojas bez problēmām uz visām ierīcēm, padarot pirkšanu un pārdošanu vienkāršu.'
    }
  ];

  return (
    <section id='services' className='w-full py-20 bg-white'>
      <div id='services_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Section Header */}
        <div id='services_header' className='text-center mb-16'>
          <h2 id='services_title' className='text-4xl sm:text-5xl font-bold text-primary mb-4'>
            Jaudīgas Funkcijas Katram Lietotājam
          </h2>
          <p id='services_subtitle' className='text-lg text-gray-700 max-w-2xl mx-auto'>
            TechVibe nodrošina visaptverošus rīkus elektronisko ierīču pirkšanai, pārdošanai, nomai, nolīgumam un koplietošanai ar pārliecību un vienkāršību.
          </p>
        </div>

        {/* Services Grid */}
        <div id='services_grid' className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <div
              key={index}
              id={`services_card_${index}`}
              className='bg-gray-50 p-8 rounded-xl shadow-md hover-lift transition-all duration-300 border border-gray-200'
            >
              <div id={`services_card_${index}_icon`} className='text-5xl mb-4'>
                {service.icon}
              </div>
              <h3 id={`services_card_${index}_title`} className='text-2xl font-bold text-primary mb-3'>
                {service.title}
              </h3>
              <p id={`services_card_${index}_description`} className='text-gray-700 leading-relaxed'>
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div id='services_cta_section' className='mt-16 bg-gradient-accent rounded-xl p-12 text-center'>
          <h3 id='services_cta_title' className='text-3xl font-bold text-white mb-4'>
            Gatavs Pievienoties TechVibe?
          </h3>
          <p id='services_cta_text' className='text-gray-100 text-lg mb-8 max-w-2xl mx-auto'>
            Sāciet pirkšanu, pārdošanu, nomu vai koplietošanu šodien. Savienojieties ar tūkstošiem tehnoloģiju entuziastu jūsu kopienā.
          </p>
          <button
            id='services_cta_button'
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className='bg-white text-accent px-8 py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300'
            aria-label='Sākt darbu ar TechVibe'
          >
            Sākt Tagad
          </button>
        </div>
      </div>
    </section>
  );
}