import React from 'react';

export default function CTAButton() {
  const handleClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      id='cta_button_main'
      onClick={handleClick}
      className='bg-gradient-accent text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-lg transition-all duration-300 hover-lift'
      aria-label='Get started with TechVibe'
    >
      Get Started Now
    </button>
  );
}