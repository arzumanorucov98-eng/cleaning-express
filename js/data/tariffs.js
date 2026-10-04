// =====================================================================
// TARİFLƏR (AZN). DİQQƏT: bunlar müvəqqəti qiymətlərdir.
// Real əmsalları yalnız bu fayla yazın — kalkulyator avtomatik yenilənəcək.
// =====================================================================

// m² / otaq / pəncərə / sanuzel əsaslı kalkulyatorlar
export const AREA_TARIFFS = {
  'ev-temizliyi':        { perSqm: 2.0, perRoom: 5, perWindow: 4,  perBathroom: 15, minimum: 50 },
  'ofis-temizliyi':      { perSqm: 1.8, perRoom: 4, perWindow: 4,  perBathroom: 15, minimum: 60 },
  'restoran-temizliyi':  { perSqm: 3.0, perRoom: 8, perWindow: 5,  perBathroom: 20, minimum: 100 },
  'obyekt-temizliyi':    { perSqm: 2.2, perRoom: 5, perWindow: 5,  perBathroom: 20, minimum: 80 },
  'temir-sonrasi-temizlik': { perSqm: 4.0, perRoom: 10, perWindow: 8, perBathroom: 25, minimum: 120 },
};

// Yumşaq mebel: hər əşya ayrıca seçilir, sayı yazılır
export const FURNITURE_TARIFFS = {
  minimum: 0,
  items: [
    { id: 'divan',  name: 'Divan',  icon: '🛋️', price: 40 },
    { id: 'kreslo', name: 'Kreslo', icon: '💺', price: 20 },
    { id: 'stul',   name: 'Stul',   icon: '🪑', price: 8 },
    { id: 'matras', name: 'Matras', icon: '🛏️', price: 30 },
  ],
};
