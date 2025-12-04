import React from 'react';

export default function Pricing() {
  const plans = [
    {
      id: 'plan_1',
      name: 'Iesācējs',
      price: 'Bezmaksas',
      description: 'Ideāli neoficiāliem pircējiem un pārdevējiem',
      features: [
        'Ievietot līdz 5 sludinājumiem',
        'Pamatfunkcijas meklēšanai',
        'Lietotāja profila izveide',
        'Kopienas piekļuve',
        'Standarta atbalsts'
      ],
      cta: 'Sākt',
      highlighted: false
    },
    {
      id: 'plan_2',
      name: 'Profesionāls',
      price: '€9.99',
      period: '/mēnesis',
      description: 'Ideāli aktīviem pārdevējiem un nomniekus',
      features: [
        'Neierobežoti sludinājumi',
        'Uzlaboti meklēšanas filtri',
        'Izcilti sludinājumi (5/mēnesis)',
        'Prioritārs klientu atbalsts',
        'Analītikas panelis',
        'Remonta pakalpojumu direktorija piekļuve'
      ],
      cta: 'Sākt Bezmaksas Izmēģinājumu',
      highlighted: true
    },
    {
      id: 'plan_3',
      name: 'Uzņēmums',
      price: '€29.99',
      period: '/mēnesis',
      description: 'Liela apjoma pārdevējiem un uzņēmumiem',
      features: [
        'Viss neierobežots',
        'Premium izcilti sludinājumi',
        'Veltīts konta vadītājs',
        '24/7 prioritārs atbalsts',
        'Uzlabota analītika',
        'API piekļuve',
        'Pielāgoti zīmolojuma iespējas'
      ],
      cta: 'Sazināties ar Pārdošanu',
      highlighted: false
    }
  ];

  return (
    <section id='pricing' className='w-full py-20 bg-gray-50'>
      <div id='pricing_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Section Header */}
        <div id='pricing_header' className='text-center mb-16'>
          <h2 id='pricing_title' className='text-4xl sm:text-5xl font-bold text-primary mb-4'>
            Vienkārša, Pārraudzīta Cenu Noteikšana
          </h2>
          <p id='pricing_subtitle' className='text-lg text-gray-700 max-w-2xl mx-auto'>
            Izvēlieties perfekto plānu savām vajadzībām. Jebkurā laikā var paaugstināt vai pazemināt bez slēptām maksām.
          </p>
        </div>

        {/* Pricing Cards */}
        <div id='pricing_cards_grid' className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-16'>
          {plans.map((plan, index) => (
            <div
              key={index}
              id={`pricing_card_${index}`}
              className={`rounded-xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-accent text-white shadow-xl scale-105'
                  : 'bg-white border border-gray-200 shadow-md hover-lift'
              }`}
            >
              {/* Plan Name */}
              <h3 id={`pricing_card_${index}_name`} className={`text-2xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-primary'}`}>
                {plan.name}
              </h3>

              {/* Description */}
              <p id={`pricing_card_${index}_description`} className={`text-sm mb-6 ${plan.highlighted ? 'text-gray-100' : 'text-gray-600'}`}>
                {plan.description}
              </p>

              {/* Price */}
              <div id={`pricing_card_${index}_price_section`} className='mb-8'>
                <span id={`pricing_card_${index}_price`} className={`text-4xl font-bold ${plan.highlighted ? 'text-white' : 'text-primary'}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span id={`pricing_card_${index}_period`} className={`text-sm ${plan.highlighted ? 'text-gray-100' : 'text-gray-600'}`}>
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Features List */}
              <ul id={`pricing_card_${index}_features`} className='mb-8 space-y-3'>
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    id={`pricing_card_${index}_feature_${featureIndex}`}
                    className={`flex items-start gap-3 ${plan.highlighted ? 'text-gray-100' : 'text-gray-700'}`}
                  >
                    <span id={`pricing_card_${index}_feature_${featureIndex}_icon`} className={`text-xl font-bold mt-0.5 ${plan.highlighted ? 'text-white' : 'text-accent'}`}>
                      ✓
                    </span>
                    <span id={`pricing_card_${index}_feature_${featureIndex}_text`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                id={`pricing_card_${index}_cta`}
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-white text-accent hover:shadow-lg'
                    : 'bg-gradient-accent text-white hover:shadow-lg'
                }`}
                aria-label={`Izvēlieties ${plan.name} plānu`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div id='pricing_comparison_section' className='bg-white rounded-xl p-8 shadow-md'>
          <h3 id='pricing_comparison_title' className='text-2xl font-bold text-primary mb-8 text-center'>
            Funkciju Salīdzinājums
          </h3>
          
          <div id='pricing_comparison_table' className='overflow-x-auto'>
            <table id='pricing_table' className='w-full'>
              <thead id='pricing_table_head'>
                <tr id='pricing_table_header_row' className='border-b-2 border-gray-200'>
                  <th id='pricing_table_feature_header' className='text-left py-4 px-4 font-bold text-primary'>Funkcija</th>
                  <th id='pricing_table_starter_header' className='text-center py-4 px-4 font-bold text-primary'>Iesācējs</th>
                  <th id='pricing_table_pro_header' className='text-center py-4 px-4 font-bold text-primary'>Profesionāls</th>
                  <th id='pricing_table_enterprise_header' className='text-center py-4 px-4 font-bold text-primary'>Uzņēmums</th>
                </tr>
              </thead>
              <tbody id='pricing_table_body'>
                <tr id='pricing_table_row_1' className='border-b border-gray-200'>
                  <td id='pricing_table_row_1_feature' className='py-4 px-4 text-gray-800'>Sludinājumi</td>
                  <td id='pricing_table_row_1_starter' className='text-center py-4 px-4 text-gray-700'>5</td>
                  <td id='pricing_table_row_1_pro' className='text-center py-4 px-4 text-gray-700'>Neierobežots</td>
                  <td id='pricing_table_row_1_enterprise' className='text-center py-4 px-4 text-gray-700'>Neierobežots</td>
                </tr>
                <tr id='pricing_table_row_2' className='border-b border-gray-200'>
                  <td id='pricing_table_row_2_feature' className='py-4 px-4 text-gray-800'>Izcilti Sludinājumi</td>
                  <td id='pricing_table_row_2_starter' className='text-center py-4 px-4 text-gray-700'>-</td>
                  <td id='pricing_table_row_2_pro' className='text-center py-4 px-4 text-gray-700'>5/mēnesis</td>
                  <td id='pricing_table_row_2_enterprise' className='text-center py-4 px-4 text-gray-700'>Neierobežots</td>
                </tr>
                <tr id='pricing_table_row_3' className='border-b border-gray-200'>
                  <td id='pricing_table_row_3_feature' className='py-4 px-4 text-gray-800'>Atbalsts</td>
                  <td id='pricing_table_row_3_starter' className='text-center py-4 px-4 text-gray-700'>Standarts</td>
                  <td id='pricing_table_row_3_pro' className='text-center py-4 px-4 text-gray-700'>Prioritārs</td>
                  <td id='pricing_table_row_3_enterprise' className='text-center py-4 px-4 text-gray-700'>24/7</td>
                </tr>
                <tr id='pricing_table_row_4' className='border-b border-gray-200'>
                  <td id='pricing_table_row_4_feature' className='py-4 px-4 text-gray-800'>Analītika</td>
                  <td id='pricing_table_row_4_starter' className='text-center py-4 px-4 text-gray-700'>-</td>
                  <td id='pricing_table_row_4_pro' className='text-center py-4 px-4 text-gray-700'>✓</td>
                  <td id='pricing_table_row_4_enterprise' className='text-center py-4 px-4 text-gray-700'>✓</td>
                </tr>
                <tr id='pricing_table_row_5'>
                  <td id='pricing_table_row_5_feature' className='py-4 px-4 text-gray-800'>API Piekļuve</td>
                  <td id='pricing_table_row_5_starter' className='text-center py-4 px-4 text-gray-700'>-</td>
                  <td id='pricing_table_row_5_pro' className='text-center py-4 px-4 text-gray-700'>-</td>
                  <td id='pricing_table_row_5_enterprise' className='text-center py-4 px-4 text-gray-700'>✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}