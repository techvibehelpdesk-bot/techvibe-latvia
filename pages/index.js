import React from 'react';
import Hero from '../components/hero';
import Categories from '../components/categories';
import HowItWorks from '../components/howitworks';
import FeaturedListings from '../components/featuredlistings';
import Services from '../components/services';
import Stats from '../components/stats';
import Pricing from '../components/pricing';
import FAQ from '../components/faq';
import Contact from '../components/contact';

export default function HomePage() {
  return (
    <div className='w-full'>
      <Hero />
      <Categories />
      <HowItWorks />
      <FeaturedListings />
      <Services />
      <Stats />
      <Pricing />
      <FAQ />
      <Contact />
    </div>
  );
}