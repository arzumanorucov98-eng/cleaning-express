// =============================================
// STRUCTURED DATA (JSON-LD SCHEMA) GENERATOR
// =============================================

function generateOrganizationSchema() {
  if (typeof SITE_CONFIG === 'undefined') return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "name": SITE_CONFIG.company.name,
    "legalName": SITE_CONFIG.company.legalName,
    "url": SITE_CONFIG.siteUrl,
    "logo": SITE_CONFIG.siteUrl + SITE_CONFIG.company.logo,
    "description": SITE_CONFIG.company.description,
    "foundingDate": SITE_CONFIG.company.foundedYear.toString(),
    "telephone": SITE_CONFIG.nap.phone,
    "email": SITE_CONFIG.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": SITE_CONFIG.nap.address.street,
      "addressLocality": SITE_CONFIG.nap.address.city,
      "addressRegion": SITE_CONFIG.nap.address.region,
      "postalCode": SITE_CONFIG.nap.address.postalCode,
      "addressCountry": SITE_CONFIG.nap.address.country
    },
    "openingHoursSpecification": SITE_CONFIG.workingHours.schema.map(h => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": h.days,
      "opens": h.opens,
      "closes": h.closes
    })),
    "areaServed": SITE_CONFIG.serviceAreas.map(area => ({
      "@type": "City",
      "name": area
    })),
    "sameAs": [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.youtube,
      SITE_CONFIG.social.tiktok
    ].filter(Boolean),
    "priceRange": "AZN"
  };
}

function generateServiceSchema(service) {
  if (!service || typeof SITE_CONFIG === 'undefined') return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "provider": {
      "@type": "CleaningService",
      "name": SITE_CONFIG.company.name
    },
    "description": service.description,
    "areaServed": {
      "@type": "City",
      "name": "Baku"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Təmizlik Xidmətləri",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.name
          }
        }
      ]
    }
  };
}

function generateFAQSchema(faqs) {
  if (!faqs || faqs.length === 0) return null;
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

function injectSchema(schemaObj) {
  if (!schemaObj) return;
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify(schemaObj, null, 2);
  document.head.appendChild(script);
}

// Auto-inject Organization schema on every page
document.addEventListener('DOMContentLoaded', () => {
  injectSchema(generateOrganizationSchema());
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateOrganizationSchema, generateServiceSchema, generateFAQSchema, injectSchema };
}
