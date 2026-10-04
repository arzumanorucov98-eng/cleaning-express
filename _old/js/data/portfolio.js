// =============================================
// PORTFOLIO DATA - Portfolio məlumatları
// =============================================
// Yeni portfolio əlavə etmək üçün massivə yeni obyekt əlavə edin.

const PORTFOLIO = [
  {
    id: 'p1',
    title: 'Nərimanov, 3 otaqlı mənzil',
    service: 'Ev Təmizliyi',
    serviceSlug: 'ev-temizliyi',
    description: '120 m² mənzilin dərin təmizliyi. Mətbəx, hamam, otaqlar tam təmizləndi.',
    beforeImage: '/assets/images/portfolio/ev-before-1.webp',
    afterImage: '/assets/images/portfolio/ev-after-1.webp',
    date: '2024-08',
  },
  {
    id: 'p2',
    title: 'Yasamal, təmir sonrası mənzil',
    service: 'Təmir Sonrası Təmizlik',
    serviceSlug: 'temir-sonrasi-temizlik',
    description: '90 m² mənzilin tam tikinti sonrası təmizliyi. Sement, boya, yapışqan qalıqları.',
    beforeImage: '/assets/images/portfolio/temir-before-1.webp',
    afterImage: '/assets/images/portfolio/temir-after-1.webp',
    date: '2024-09',
  },
  {
    id: 'p3',
    title: 'Nizami, kafe mətbəxi',
    service: 'Restoran Təmizliyi',
    serviceSlug: 'restoran-temizliyi',
    description: 'Kafenin mətbəxində dərin yağ təmizliyi və dezinfeksiya.',
    beforeImage: '/assets/images/portfolio/restoran-before-1.webp',
    afterImage: '/assets/images/portfolio/restoran-after-1.webp',
    date: '2024-07',
  },
  {
    id: 'p4',
    title: 'Xətai, künc divan',
    service: 'Yumşaq Mebel Təmizliyi',
    serviceSlug: 'yumsaq-mebel-kimyavi-temizliyi',
    description: 'Künc divanın kimyəvi təmizliyi — 5 illik ləkələr tam çıxarıldı.',
    beforeImage: '/assets/images/portfolio/mebel-before-1.webp',
    afterImage: '/assets/images/portfolio/mebel-after-1.webp',
    date: '2024-10',
  },
  {
    id: 'p5',
    title: 'Səbail, ofis binası',
    service: 'Ofis Təmizliyi',
    serviceSlug: 'ofis-temizliyi',
    description: '350 m² ofis binasının tam təmizliyi və dezinfeksiyası.',
    beforeImage: '/assets/images/portfolio/ofis-before-1.webp',
    afterImage: '/assets/images/portfolio/ofis-after-1.webp',
    date: '2024-06',
  },
  {
    id: 'p6',
    title: 'Binəqədi, mağaza',
    service: 'Obyekt Təmizliyi',
    serviceSlug: 'obyekt-temizliyi',
    description: '200 m² mağazanın açılış öncəsi tam təmizliyi.',
    beforeImage: '/assets/images/portfolio/obyekt-before-1.webp',
    afterImage: '/assets/images/portfolio/obyekt-after-1.webp',
    date: '2024-09',
  },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PORTFOLIO };
}
