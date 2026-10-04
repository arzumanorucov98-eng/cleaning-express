// =============================================
// PRICING CONFIGURATION - Qiymət Konfiqurasiyası
// =============================================
// Bu faylda bütün xidmətlərin qiymətləri saxlanılır.
// Qiymətləri dəyişmək üçün sadəcə bu fayldakı dəyərləri yeniləyin.
// Bütün qiymətlər AZN-dir.

const PRICING = {

  // =============================
  // EV TƏMİZLİYİ
  // =============================
  'ev-temizliyi': {
    // m² başına qiymət
    perSqm: {
      standart: 2.5,   // Standart təmizlik
      derin: 4.0,       // Dərin təmizlik
    },

    // Otaq sayına görə baza əlavə
    roomSurcharge: {
      1: 0,
      2: 10,
      3: 20,
      4: 30,
      5: 40,
    },

    // Minimum qiymət
    minimumPrice: 60,

    // Əlavə xidmətlər
    extras: [
      { id: 'pencere', name: 'Pəncərə təmizliyi', price: 5, unit: 'ədəd' },
      { id: 'balkon', name: 'Balkon təmizliyi', price: 15, unit: '' },
      { id: 'soyuducu', name: 'Soyuducunun daxili təmizliyi', price: 15, unit: '' },
      { id: 'plyonka', name: 'Sobadakı plyonka / yağ təmizliyi', price: 20, unit: '' },
      { id: 'utu', name: 'Ütüləmə xidməti', price: 25, unit: '' },
    ],

    // Təmizlik növləri
    types: [
      { id: 'standart', name: 'Standart təmizlik' },
      { id: 'derin', name: 'Dərin təmizlik' },
    ],
  },

  // =============================
  // TƏMİR SONRASI TƏMİZLİK
  // =============================
  'temir-sonrasi': {
    // m² başına qiymət
    perSqm: {
      menzel: 5.0,     // Mənzil
      ofis: 4.5,        // Ofis
      villa: 5.5,       // Villa
      obyekt: 4.0,      // Obyekt
    },

    // Çirklənmə səviyyəsinə görə əmsal
    pollutionMultiplier: {
      yungul: 1.0,      // Yüngül (boyaq, toz)
      orta: 1.3,        // Orta (sement, yapışqan)
      agir: 1.6,        // Ağır (tam tikinti)
    },

    // Minimum qiymət
    minimumPrice: 120,

    // Obyekt tipləri
    objectTypes: [
      { id: 'menzel', name: 'Mənzil' },
      { id: 'ofis', name: 'Ofis' },
      { id: 'villa', name: 'Villa / Həyət evi' },
      { id: 'obyekt', name: 'Kommersiya obyekti' },
    ],

    // Çirklənmə səviyyələri
    pollutionLevels: [
      { id: 'yungul', name: 'Yüngül (boyaq, toz)' },
      { id: 'orta', name: 'Orta (sement, yapışqan)' },
      { id: 'agir', name: 'Ağır (tam tikinti)' },
    ],

    // Əlavə xidmətlər
    extras: [
      { id: 'pencere', name: 'Pəncərə təmizliyi', price: 8, unit: 'ədəd' },
      { id: 'fasad', name: 'Fasad təmizliyi', price: 3, unit: 'm²' },
      { id: 'pillekan', name: 'Pilləkən təmizliyi', price: 40, unit: '' },
    ],
  },

  // =============================
  // OBYEKT TƏMİZLİYİ
  // =============================
  'obyekt': {
    // m² başına qiymət
    perSqm: {
      birdefеlik: 3.0,    // Birdəfəlik
      heftelik: 2.0,      // Həftəlik müqavilə
      gundelik: 1.2,      // Gündəlik müqavilə
    },

    // Minimum qiymət
    minimumPrice: 100,

    // Təmizlik növləri
    types: [
      { id: 'birdefеlik', name: 'Birdəfəlik' },
      { id: 'heftelik', name: 'Həftəlik müqavilə' },
      { id: 'gundelik', name: 'Gündəlik müqavilə' },
    ],

    // Periodiklik
    periodicity: [
      { id: 'birdefеlik', name: 'Birdəfəlik', multiplier: 1.0 },
      { id: 'heftede1', name: 'Həftədə 1 dəfə', multiplier: 0.9 },
      { id: 'heftede2', name: 'Həftədə 2 dəfə', multiplier: 0.85 },
      { id: 'heftede3', name: 'Həftədə 3 dəfə', multiplier: 0.8 },
      { id: 'hergün', name: 'Hər gün', multiplier: 0.7 },
    ],

    // Əlavə xidmətlər
    extras: [
      { id: 'pencere', name: 'Pəncərə/vitrin təmizliyi', price: 8, unit: 'ədəd' },
      { id: 'dezinfeksiya', name: 'Dezinfeksiya', price: 1.5, unit: 'm²' },
      { id: 'xalca', name: 'Xalça təmizliyi', price: 5, unit: 'm²' },
    ],
  },

  // =============================
  // YUMŞAQ MEBEL KİMYƏVİ TƏMİZLİYİ
  // =============================
  'yumsaq-mebel': {
    // Mebel tiplərinə görə qiymət (ədəd başına)
    items: [
      { id: 'divan_2', name: '2 yerlik divan', price: 40 },
      { id: 'divan_3', name: '3 yerlik divan', price: 55 },
      { id: 'kunc_divan', name: 'Künc divan', price: 80 },
      { id: 'kreslo', name: 'Kreslo', price: 25 },
      { id: 'stul', name: 'Stul (yumşaq)', price: 10 },
      { id: 'dosek_tek', name: 'Tək döşək', price: 30 },
      { id: 'dosek_iki', name: 'İkili döşək', price: 45 },
      { id: 'xalca', name: 'Xalça (m² başına)', price: 5, isPerSqm: true },
    ],

    // Minimum sifariş qiyməti
    minimumPrice: 40,

    // Əlavə xidmətlər
    extras: [
      { id: 'leke', name: 'Xüsusi ləkə çıxarma', price: 15, unit: '' },
      { id: 'dezinfeksiya', name: 'Dezinfeksiya', price: 10, unit: '' },
      { id: 'qoxu', name: 'Qoxu aradan qaldırma', price: 15, unit: '' },
    ],
  },

  // =============================
  // RESTORAN TƏMİZLİYİ
  // =============================
  'restoran': {
    // Sahəyə görə baza qiymətlər (m² başına)
    areas: {
      metbex: { name: 'Mətbəx', pricePerSqm: 6.0 },
      zal: { name: 'Zal', pricePerSqm: 3.5 },
      sanitar: { name: 'Sanitar qovşaq', pricePerUnit: 40 },
    },

    // Təmizlik tezliyinə görə əmsal
    frequencyMultiplier: {
      birdefеlik: 1.0,
      heftede1: 0.85,
      heftede2: 0.75,
      heftede3: 0.7,
      hergün: 0.6,
    },

    // Tezlik seçimləri
    frequencies: [
      { id: 'birdefеlik', name: 'Birdəfəlik' },
      { id: 'heftede1', name: 'Həftədə 1 dəfə' },
      { id: 'heftede2', name: 'Həftədə 2 dəfə' },
      { id: 'heftede3', name: 'Həftədə 3 dəfə' },
      { id: 'hergün', name: 'Hər gün' },
    ],

    // Minimum qiymət
    minimumPrice: 150,

    // Əlavə xidmətlər
    extras: [
      { id: 'ventilyasiya', name: 'Ventilyasiya təmizliyi', price: 100, unit: '' },
      { id: 'yag', name: 'Dərin yağ təmizliyi', price: 3, unit: 'm²' },
      { id: 'pencere', name: 'Pəncərə / vitrin', price: 8, unit: 'ədəd' },
    ],
  },

  // =============================
  // OFİS TƏMİZLİYİ
  // =============================
  'ofis': {
    // m² başına qiymət
    perSqm: 2.5,

    // Otaq sayına görə əlavə
    roomSurcharge: {
      1: 0,
      2: 5,
      3: 10,
      4: 15,
      5: 20,
      '6+': 25,
    },

    // Sanitar qovşaq
    sanitarPrice: 30, // ədəd başına

    // Təmizlik tezliyinə görə əmsal
    frequencyMultiplier: {
      birdefеlik: 1.0,
      heftede1: 0.9,
      heftede2: 0.8,
      heftede3: 0.75,
      hergün: 0.65,
    },

    // Tezlik seçimləri
    frequencies: [
      { id: 'birdefеlik', name: 'Birdəfəlik' },
      { id: 'heftede1', name: 'Həftədə 1 dəfə' },
      { id: 'heftede2', name: 'Həftədə 2 dəfə' },
      { id: 'heftede3', name: 'Həftədə 3 dəfə' },
      { id: 'hergün', name: 'Hər gün' },
    ],

    // Minimum qiymət
    minimumPrice: 50,

    // Əlavə xidmətlər
    extras: [
      { id: 'dezinfeksiya', name: 'Dezinfeksiya', price: 1.5, unit: 'm²' },
      { id: 'xalca', name: 'Xalça təmizliyi', price: 5, unit: 'm²' },
      { id: 'pencere', name: 'Pəncərə təmizliyi', price: 8, unit: 'ədəd' },
    ],
  },
};

// Qiymət hesablama utility funksiyaları
function formatPrice(price) {
  return Math.round(price);
}

function applyMinimum(calculated, minimum) {
  return Math.max(calculated, minimum);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRICING, formatPrice, applyMinimum };
}
