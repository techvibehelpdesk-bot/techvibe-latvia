import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id='footer_main' className='w-full bg-primary text-gray-100'>
      <div id='footer_container' className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        
        {/* Footer Content Grid */}
        <div id='footer_content_grid' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
          
          {/* Brand Section */}
          <div id='footer_brand_section' className='flex flex-col gap-4'>
            <div id='footer_logo_container' className='flex items-center gap-2'>
              <div id='footer_logo_icon' className='w-10 h-10 bg-accent rounded-lg flex items-center justify-center'>
                <span id='footer_logo_text' className='text-white font-bold text-lg'>TV</span>
              </div>
              <span id='footer_brand_name' className='text-2xl font-bold text-white'>TechVibe</span>
            </div>
            <p id='footer_brand_description' className='text-gray-300 leading-relaxed'>
              Jūsu galvenā tirgus vieta elektronisko ierīču pirkšanai, pārdošanai, nomai un koplietošanai ar pārliecību.
            </p>
          </div>

          {/* Quick Links */}
          <div id='footer_quick_links_section' className='flex flex-col gap-4'>
            <h4 id='footer_quick_links_title' className='text-lg font-bold text-white'>
              Ātrās Saites
            </h4>
            <ul id='footer_quick_links_list' className='space-y-2'>
              <li id='footer_link_home'>
                <a href='#home' className='text-gray-300 hover:text-accent transition-colors duration-300'>
                  Sākums
                </a>
              </li>
              <li id='footer_link_services'>
                <a href='#services' className='text-gray-300 hover:text-accent transition-colors duration-300'>
                  Pakalpojumi
                </a>
              </li>
              <li id='footer_link_pricing'>
                <a href='#pricing' className='text-gray-300 hover:text-accent transition-colors duration-300'>
                  Cenas
                </a>
              </li>
              <li id='footer_link_faq'>
                <a href='#faq' className='text-gray-300 hover:text-accent transition-colors duration-300'>
                  BUJ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div id='footer_resources_section' className='flex flex-col gap-4'>
            <h4 id='footer_resources_title' className='text-lg font-bold text-white'>
              Resursi
            </h4>
            <ul id='footer_resources_list' className='space-y-2'>
              <li id='footer_resource_blog'>
                <a href='#' className='text-gray-300 hover:text-accent transition-colors duration-300'>
                  Blogs
                </a>
              </li>
              <li id='footer_resource_help'>
                <a href='#' className='text-gray-300 hover:text-accent transition-colors duration-300'>
                  Palīdzības Centrs
                </a>
              </li>
              <li id='footer_resource_community'>
                <a href='#' className='text-gray-300 hover:text-accent transition-colors duration-300'>
                  Kopiena
                </a>
              </li>
              <li id='footer_resource_api'>
                <a href='#' className='text-gray-300 hover:text-accent transition-colors duration-300'>
                  API Dokumentācija
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div id='footer_legal_section' className='flex flex-col gap-4'>
            <h4 id='footer_legal_title' className='text-lg font-bold text-white'>
              Juridisks
            </h4>
            <ul id='footer_legal_list' className='space-y-2'>
              <li id='footer_legal_privacy'>
                <a href='#' className='text-gray-300 hover:text-accent transition-colors duration-300'>
                  Privātuma Politika
                </a>
              </li>
              <li id='footer_legal_terms'>
                <a href='#' className='text-gray-300 hover:text-accent transition-colors duration-300'>
                  Pakalpojuma Noteikumi
                </a>
              </li>
              <li id='footer_legal_cookies'>
                <a href='#' className='text-gray-300 hover:text-accent transition-colors duration-300'>
                  Sīkdatņu Politika
                </a>
              </li>
              <li id='footer_legal_contact'>
                <a href='#contact' className='text-gray-300 hover:text-accent transition-colors duration-300'>
                  Sazināties ar Mums
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div id='footer_divider' className='border-t border-gray-700 my-8'></div>

        {/* Bottom Section */}
        <div id='footer_bottom_section' className='flex flex-col sm:flex-row justify-between items-center gap-4'>
          
          {/* Copyright */}
          <p id='footer_copyright' className='text-gray-400 text-sm'>
            © {currentYear} TechVibe. Visas tiesības paturētas.
          </p>

          {/* Social Links */}
          <div id='footer_social_links' className='flex gap-4'>
            <a
              id='footer_social_facebook'
              href='#'
              className='w-10 h-10 bg-gray-700 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors duration-300'
              aria-label='Sekojiet TechVibe uz Facebook'
            >
              f
            </a>
            <a
              id='footer_social_twitter'
              href='#'
              className='w-10 h-10 bg-gray-700 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors duration-300'
              aria-label='Sekojiet TechVibe uz Twitter'
            >
              𝕏
            </a>
            <a
              id='footer_social_linkedin'
              href='#'
              className='w-10 h-10 bg-gray-700 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors duration-300'
              aria-label='Sekojiet TechVibe uz LinkedIn'
            >
              in
            </a>
            <a
              id='footer_social_instagram'
              href='#'
              className='w-10 h-10 bg-gray-700 hover:bg-accent text-white rounded-full flex items-center justify-center transition-colors duration-300'
              aria-label='Sekojiet TechVibe uz Instagram'
            >
              📷
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}