export function JsonLd({ data }) {
               return (
                 <script
                   type="application/ld+json"
                   dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
                 />
                )
              }

             export function getOrganizationSchema() {
                return {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.techvibe.com/#organization",
      "name": "TechVibe",
      "url": "https://www.techvibe.com",
      "logo": "https://www.techvibe.com/logo.png",
      "description": "TechVibe is a comprehensive online device marketplace platform for buying, selling, renting, leasing, and giving away all types of electronic devices, featuring advanced search, user profiles, repair service locator, and optional paid assistance.",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-TECHVIBE",
        "contactType": "Customer Service",
        "email": "support@techvibe.com",
        "areaServed": "Worldwide",
        "availableLanguage": [
          "en"
        ]
      },
      "sameAs": [
        "https://www.facebook.com/techvibe",
        "https://twitter.com/techvibe",
        "https://www.linkedin.com/company/techvibe"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.techvibe.com/#website",
      "url": "https://www.techvibe.com",
      "name": "TechVibe",
      "description": "Your comprehensive online device marketplace for buying, selling, renting, leasing, and giving away electronic devices.",
      "publisher": {
        "@id": "https://www.techvibe.com/#organization"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.techvibe.com/search?q={search_term_string}"
        },
        "queryInput": "required name=search_term_string"
      }
    },
    {
      "@type": "Service",
      "@id": "https://www.techvibe.com/services/buy-devices#service",
      "name": "Buy Electronic Devices",
      "description": "Discover and purchase a wide range of new, used, and refurbished electronic devices securely on TechVibe.",
      "serviceType": "Online Electronic Device Marketplace",
      "provider": {
        "@id": "https://www.techvibe.com/#organization"
      },
      "areaServed": "Worldwide",
      "url": "https://www.techvibe.com/buy"
    },
    {
      "@type": "Service",
      "@id": "https://www.techvibe.com/services/sell-devices#service",
      "name": "Sell Electronic Devices",
      "description": "List and sell your electronic devices to a global audience with ease and security through TechVibe's marketplace.",
      "serviceType": "Online Electronic Device Marketplace",
      "provider": {
        "@id": "https://www.techvibe.com/#organization"
      },
      "areaServed": "Worldwide",
      "url": "https://www.techvibe.com/sell"
    },
    {
      "@type": "Service",
      "@id": "https://www.techvibe.com/services/rent-devices#service",
      "name": "Rent Electronic Devices",
      "description": "Access electronic devices for short-term use by renting them from other users or businesses on TechVibe.",
      "serviceType": "Electronic Device Rental Platform",
      "provider": {
        "@id": "https://www.techvibe.com/#organization"
      },
      "areaServed": "Worldwide",
      "url": "https://www.techvibe.com/rent"
    },
    {
      "@type": "Service",
      "@id": "https://www.techvibe.com/services/lease-devices#service",
      "name": "Lease Electronic Devices",
      "description": "Secure long-term electronic device leases for personal or business needs, offering flexible terms and cost-effective solutions.",
      "serviceType": "Electronic Device Leasing Platform",
      "provider": {
        "@id": "https://www.techvibe.com/#organization"
      },
      "areaServed": "Worldwide",
      "url": "https://www.techvibe.com/lease"
    },
    {
      "@type": "Service",
      "@id": "https://www.techvibe.com/services/giveaway-devices#service",
      "name": "Give Away Electronic Devices",
      "description": "Donate or give away your electronic devices to others, promoting sustainability and community sharing through TechVibe.",
      "serviceType": "Electronic Device Donation Platform",
      "provider": {
        "@id": "https://www.techvibe.com/#organization"
      },
      "areaServed": "Worldwide",
      "url": "https://www.techvibe.com/giveaway"
    },
    {
      "@type": "Service",
      "@id": "https://www.techvibe.com/services/repair-locator#service",
      "name": "Device Repair Service Locator",
      "description": "Find local, trusted repair services for all types of electronic devices using TechVibe's integrated locator tool.",
      "serviceType": "Electronic Device Repair Directory",
      "provider": {
        "@id": "https://www.techvibe.com/#organization"
      },
      "areaServed": "Worldwide",
      "url": "https://www.techvibe.com/repair-locator"
    },
    {
      "@type": "Service",
      "@id": "https://www.techvibe.com/services/paid-assistance#service",
      "name": "Optional Paid Assistance",
      "description": "Access premium support, concierge services, and expert advice for enhanced transactions and device management on TechVibe.",
      "serviceType": "Premium Support Service for Electronic Devices",
      "provider": {
        "@id": "https://www.techvibe.com/#organization"
      },
      "areaServed": "Worldwide",
      "url": "https://www.techvibe.com/paid-assistance",
      "offers": {
        "@type": "Offer",
        "name": "Premium Support Package",
        "description": "Enhanced support and services for TechVibe users, including concierge assistance and expert advice.",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "valueAddedTaxIncluded": false,
          "priceType": "ListPrice"
        },
        "availability": "https://schema.org/InStock",
        "url": "https://www.techvibe.com/paid-assistance"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.techvibe.com/faq#faqpage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is TechVibe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TechVibe is a comprehensive online marketplace platform where you can buy, sell, rent, lease, and even give away all types of electronic devices. It also features an advanced search, user profiles, and a repair service locator."
          }
        },
        {
          "@type": "Question",
          "name": "How can I buy an electronic device on TechVibe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To buy a device, simply use our advanced search filters to find the electronic item you're looking for. Browse listings, compare prices, and connect with sellers through our secure platform."
          }
        },
        {
          "@type": "Question",
          "name": "Can I sell my used electronics through TechVibe?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, TechVibe provides a platform for individuals and businesses to list and sell their used, new, or refurbished electronic devices to a wide audience. Create a user profile and start listing your items today."
          }
        },
        {
          "@type": "Question",
          "name": "Does TechVibe offer options for renting or leasing devices?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! TechVibe supports both short-term device rentals and long-term leasing options, providing flexibility for users who need temporary access to electronics or prefer leasing over purchasing."
          }
        },
        {
          "@type": "Question",
          "name": "How do I find a repair service for my device?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "TechVibe features an integrated repair service locator. Simply enter your location and device type to find reputable local repair shops near you."
          }
        },
        {
          "@type": "Question",
          "name": "What is 'Optional Paid Assistance'?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Optional Paid Assistance refers to premium support services available on TechVibe. This can include concierge services for complex transactions, enhanced listing visibility, or expert consultation for device valuation and repair advice."
          }
        },
        {
          "@type": "Question",
          "name": "Is TechVibe available globally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "While TechVibe aims for global accessibility, specific service availability may vary by region. Our platform is designed to connect users worldwide."
          }
        }
      ]
    }
  ]
}
              }