// =============================================
// VIDEOS DATA - Video məlumatları
// =============================================
// Yeni video əlavə etmək üçün massivə yeni obyekt əlavə edin.
// videoId: YouTube video ID-si (URL-dəki v= sonrası və ya Shorts ID)
// Thumbnail avtomatik YouTube-dan çəkilir.

const VIDEOS = [
  {
    id: 'v1',
    videoId: 'dQw4w9WgXcQ', // YouTube Video ID — buraya real ID qoyun
    title: 'Ev təmizliyi prosesi',
    description: 'Bakıda ev təmizliyi — dərin təmizlik prosesi',
    category: 'ev-temizliyi',
    type: 'short', // 'short' = 9:16, 'regular' = 16:9
    duration: '0:45',
  },
  {
    id: 'v2',
    videoId: 'dQw4w9WgXcQ',
    title: 'Ofis təmizliyi',
    description: 'Peşəkar ofis təmizliyi xidməti',
    category: 'ofis',
    type: 'short',
    duration: '0:30',
  },
  {
    id: 'v3',
    videoId: 'dQw4w9WgXcQ',
    title: 'Restoran mətbəxi təmizliyi',
    description: 'Restoranın mətbəxində dərin yağ təmizliyi',
    category: 'restoran',
    type: 'short',
    duration: '0:55',
  },
  {
    id: 'v4',
    videoId: 'dQw4w9WgXcQ',
    title: 'Obyekt təmizliyi',
    description: 'Böyük kommersiya obyektinin təmizliyi',
    category: 'obyekt',
    type: 'short',
    duration: '1:00',
  },
  {
    id: 'v5',
    videoId: 'dQw4w9WgXcQ',
    title: 'Təmir sonrası təmizlik',
    description: 'Təmirdən sonra mənzilin tam təmizlənməsi',
    category: 'temir-sonrasi',
    type: 'short',
    duration: '0:40',
  },
  {
    id: 'v6',
    videoId: 'dQw4w9WgXcQ',
    title: 'Divan kimyəvi təmizliyi',
    description: 'Divanın dərin kimyəvi təmizliyi — əvvəl və sonra',
    category: 'yumsaq-mebel',
    type: 'short',
    duration: '0:35',
  },
  {
    id: 'v7',
    videoId: 'dQw4w9WgXcQ',
    title: 'Divan təmizliyi - Before/After',
    description: 'Ləkəli divanın inanılmaz dəyişikliyi',
    category: 'before-after',
    type: 'short',
    duration: '0:25',
  },
  {
    id: 'v8',
    videoId: 'dQw4w9WgXcQ',
    title: 'Xalça təmizliyi nəticəsi',
    description: 'Xalçanın kimyəvi təmizlikdən əvvəl və sonrakı halı',
    category: 'before-after',
    type: 'short',
    duration: '0:30',
  },
];

// Video kateqoriyaları
const VIDEO_CATEGORIES = [
  { id: 'all', name: 'Hamısı' },
  { id: 'ev-temizliyi', name: 'Ev Təmizliyi' },
  { id: 'ofis', name: 'Ofis' },
  { id: 'restoran', name: 'Restoran' },
  { id: 'obyekt', name: 'Obyekt' },
  { id: 'temir-sonrasi', name: 'Təmir Sonrası' },
  { id: 'yumsaq-mebel', name: 'Yumşaq Mebel' },
  { id: 'before-after', name: 'Before/After' },
];

function getVideosByCategory(categoryId) {
  if (categoryId === 'all') return VIDEOS;
  return VIDEOS.filter(v => v.category === categoryId);
}

function getVideoThumbnail(videoId) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function getVideoThumbnailSD(videoId) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VIDEOS, VIDEO_CATEGORIES, getVideosByCategory, getVideoThumbnail };
}
