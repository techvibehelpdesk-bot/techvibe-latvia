import React from 'react';

export default function Stats() {
  const stats = [
    {
      id: 'stat_1',
      number: '50K+',
      label: 'Aktīvie Lietotāji'
    },
    {
      id: 'stat_2',
      number: '100K+',
      label: 'Ievietotie Sludinājumi'
    },
    {
      id: 'stat_3',
      number: '25K+',
      label: 'Veiksmīgi Darījumi'
    },
    {
      id: 'stat_4',
      number: '500+',
      label: 'Remonta Partneri'
    }
  ];

  return (
    <section id='stats_section' className='w-full py-16 bg-gradient-to-r from-primary to-gray-800'>
      <div id='stats_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div id='stats_grid' className='grid grid-cols-2 lg:grid-cols-4 gap-8'>
          {stats.map((stat, index) => (
            <div
              key={index}
              id={`stats_item_${index}`}
              className='text-center'
            >
              <div id={`stats_number_${index}`} className='text-4xl sm:text-5xl font-bold text-accent mb-2'>
                {stat.number}
              </div>
              <p id={`stats_label_${index}`} className='text-gray-200 text-lg'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}