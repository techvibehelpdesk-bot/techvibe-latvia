import React, { useState } from 'react';

export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const faqs = [
    {
      id: 'faq_1',
      question: 'Kā es varu ievietot sludinājumu TechVibe?',
      answer: 'Sludinājuma ievietošana ir vienkārša! Reģistrējieties bezmaksas kontā, noklikšķiniet uz "Ievietot sludinājumu", atlasiet sava ierīces tipu un sludinājuma tipu (pirkšana, pārdošana, noma, nolīgums vai dāvināšana), pievienojiet fotogrāfijas un aprakstu, iestatiet cenu vai noteikumus un publicējiet. Jūsu sludinājums būs tiešsaistē uzreiz un redzams tūkstošiem lietotāju.'
    },
    {
      id: 'faq_2',
      question: 'Kādas maksāšanas metodes TechVibe pieņem?',
      answer: 'Mēs pieņemam visas galvenās kredītkartītes (Visa, Mastercard, American Express), PayPal, bankas pārskaitījumus un digitālos maks. Visi darījumi tiek apstrādāti draudzīgi caur mūsu šifrēto maksājumu vārti. Nomai un nolīguma nolīgumiem mēs piedāvājam elastīgas maksāšanas grafika iespējas.'
    },
    {
      id: 'faq_3',
      question: 'Kā darbojas remonta pakalpojumu meklētājs?',
      answer: 'Mūsu remonta pakalpojumu meklētājs palīdz atrast sertificētus tehniķus un remonta veikalus netālu no jums. Vienkārši ievadiet savu atrašanās vietu un ierīces tipu, un mēs parādīsim pieejamos remonta pakalpojumus ar vērtējumiem, atsauksmēm, cenām un pieejamību. Jūs varat tieši caur TechVibe rezervēt tikšanās reizes.'
    },
    {
      id: 'faq_4',
      question: 'Kas ir apmaksātais palīdzības pakalpojums?',
      answer: 'Apmaksātie palīdzības pakalpojumi palīdz maksimizēt jūsu sasniedzamību un pārdošanu. Iespējas ietver izciltus sludinājumus (augšējā vieta meklēšanas rezultātos), prioritāro atbalstu, profesionālo fotogrāfiju pakalpojumus un mārketinga palīdzību. Šīs premium funkcijas palīdz jums ātrāk savienoties ar pircējiem vai saņēmējiem.'
    },
    {
      id: 'faq_5',
      question: 'Vai mana personīgā informācija ir draudzīga TechVibe?',
      answer: 'Jā! Mēs izmantojam nozares standarta šifrēšanu un drošības protokolus, lai aizsargātu jūsu datus. Jūsu personīgā informācija nekad netiek kopīgota ar trešajām personām bez jūsu piekrišanas. Mēs ievērojam visus datu aizsardzības noteikumus un regulāri pārbaudām mūsu drošības sistēmas.'
    },
    {
      id: 'faq_6',
      question: 'Vai es varu iznomāt vai nolīgt ierīces TechVibe?',
      answer: 'Absolūti! TechVibe atbalsta pirkšanu, pārdošanu, nomu, nolīgumu un dāvināšanu. Sludinājuma ievietošanas laikā vienkārši atlasiet savu vēlamo darījuma tipu. Nomai un nolīguma nolīgumiem ir elastīgi noteikumi, apdrošināšanas iespējas un draudzīgs maksāšanas grafiks.'
    },
    {
      id: 'faq_7',
      question: 'Kas notiek, ja ar pircēju vai pārdevēju ir strīds?',
      answer: 'Mums ir visaptveroša strīdu risināšanas sistēma. Ja rodas problēmas, abas puses var iesniegt pierādījumus un sazināties caur mūsu platformu. Mūsu atbalsta komanda pārskata gadījumus un strādā pie taisnīgu risinājumu atrašanas. Pircēja un pārdevēja aizsardzības politika nodrošina, ka abas puses ir aizsargātas.'
    },
    {
      id: 'faq_8',
      question: 'Kā es varu veidot uzticību savā profilā?',
      answer: 'Veidojiet uzticību, aizpildot savu profilu ar fotogrāfiju un biogrāfiju, ātri atbildot uz jautājumiem, sniedzot precīzus ierīču aprakstus, savlaicīgi nosūtot preces un saglabājot pozitīvus vērtējumus. Pārbaudīti lietotāji ar augstiem vērtējumiem parādās augstāk meklēšanas rezultātos un piesaista vairāk pircēju.'
    }
  ];

  const toggleExpanded = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id='faq' className='w-full py-20 bg-white'>
      <div id='faq_container' className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Section Header */}
        <div id='faq_header' className='text-center mb-16'>
          <h2 id='faq_title' className='text-4xl sm:text-5xl font-bold text-primary mb-4'>
            Bieži Uzdotie Jautājumi
          </h2>
          <p id='faq_subtitle' className='text-lg text-gray-700'>
            Atrodiet atbildes uz bieži uzdotajiem jautājumiem par TechVibe un kā maksimāli izmantot mūsu platformu.
          </p>
        </div>

        {/* FAQ Items */}
        <div id='faq_items_container' className='space-y-4'>
          {faqs.map((faq, index) => (
            <div
              key={index}
              id={`faq_item_${index}`}
              className='border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300'
            >
              <button
                id={`faq_item_${index}_button`}
                onClick={() => toggleExpanded(index)}
                className='w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-300'
                aria-expanded={expandedIndex === index}
                aria-label={`Pārslēgt atbildi uz: ${faq.question}`}
              >
                <h3 id={`faq_item_${index}_question`} className='text-lg font-bold text-primary text-left'>
                  {faq.question}
                </h3>
                <span
                  id={`faq_item_${index}_icon`}
                  className={`text-accent text-2xl font-bold transition-transform duration-300 flex-shrink-0 ml-4 ${
                    expandedIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Answer */}
              {expandedIndex === index && (
                <div id={`faq_item_${index}_answer_container`} className='px-6 py-4 bg-white border-t border-gray-200'>
                  <p id={`faq_item_${index}_answer`} className='text-gray-700 leading-relaxed'>
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div id='faq_additional_help' className='mt-16 bg-gradient-to-r from-accent to-purple-600 rounded-xl p-8 text-center'>
          <h3 id='faq_help_title' className='text-2xl font-bold text-white mb-4'>
            Joprojām ir jautājumi?
          </h3>
          <p id='faq_help_text' className='text-gray-100 mb-6'>
            Mūsu atbalsta komanda ir šeit, lai palīdzētu. Sazinies ar mums jebkurā laikā, un mēs atbildēsim 24 stundu laikā.
          </p>
          <button
            id='faq_help_button'
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className='bg-white text-accent px-8 py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300'
            aria-label='Sazināties ar atbalstu'
          >
            Sazināties ar Atbalstu
          </button>
        </div>
      </div>
    </section>
  );
}