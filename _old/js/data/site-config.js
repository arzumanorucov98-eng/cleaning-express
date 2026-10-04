// =============================================
// SITE CONFIG - NAP & Contact Information
// =============================================
// Bu faylda saytın əsas məlumatları saxlanılır.
// Dəyişiklik etmək üçün sadəcə bu fayldakı dəyərləri yeniləyin.

const SITE_CONFIG = {
  // Şirkət məlumatları
  company: {
    name: 'Cleanin Express',
    legalName: 'Cleanin Express MMC',
    slogan: 'Peşəkar Təmizlik Xidməti',
    description: 'Bakıda peşəkar ev, ofis, restoran və obyekt təmizliyi xidməti. Sertifikatlı komanda, müasir avadanlıq, sürətli xidmət.',
    foundedYear: 2020,
    logo: '/assets/images/logo.svg',
    logoAlt: 'Cleanin Express - Peşəkar Təmizlik Xidməti Bakı',
  },

  // NAP (Name, Address, Phone) - Local SEO üçün ardıcıl saxlanılmalıdır
  nap: {
    name: 'Cleanin Express',
    address: {
      street: 'Bakı şəhəri',
      city: 'Bakı',
      region: 'Bakı',
      postalCode: 'AZ1000',
      country: 'AZ',
      countryName: 'Azərbaycan',
      fullAddress: 'Bakı, Azərbaycan',
    },
    phone: '+994501234567',
    phoneFormatted: '+994 50 123 45 67',
    phoneDisplay: '050 123 45 67',
  },

  // Əlaqə
  contact: {
    email: 'info@cleaninexpress.az',
    whatsapp: '+994501234567',
    whatsappDefault: 'Salam! Cleanin Express saytından yazıram. Təmizlik xidməti barədə məlumat almaq istəyirəm.',
  },

  // Sosial şəbəkələr
  social: {
    instagram: 'https://instagram.com/cleaninexpress',
    facebook: 'https://facebook.com/cleaninexpress',
    youtube: 'https://youtube.com/@cleaninexpress',
    tiktok: 'https://tiktok.com/@cleaninexpress',
  },

  // İş saatları
  workingHours: {
    weekdays: '09:00 - 19:00',
    saturday: '09:00 - 17:00',
    sunday: 'Bağlıdır',
    display: 'B.e - Ş: 09:00-19:00 | Ş.b: 09:00-17:00',
    schema: [
      { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
      { days: ['Saturday'], opens: '09:00', closes: '17:00' },
    ],
  },

  // Xidmət göstərilən ərazilər
  serviceAreas: [
    'Bakı', 'Sumqayıt', 'Xırdalan', 'Abşeron',
  ],

  // Sayt URL
  siteUrl: 'https://cleaninexpress.az',

  // Valyuta
  currency: {
    code: 'AZN',
    symbol: '₼',
    name: 'Azərbaycan Manatı',
  },
};

// Node/module export dəstəyi
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
