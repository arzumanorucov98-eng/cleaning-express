// 6 xidmət: məzmun, kalkulyator tipi və 3D səhnə açarı burada təyin olunur.
export const SERVICES = [
  {
    slug: 'ev-temizliyi',
    title: 'Ev təmizliyi',
    icon: '🏠',
    scene: 'home',
    calc: 'area',
    tagline: 'Evinizdə hər guşə parıldasın',
    description:
      'Mənzil və həyət evlərinin ümumi və dərin təmizliyi: otaqlar, mətbəx, sanuzel, pəncərələr. Peşəkar komanda, təhlükəsiz vasitələr.',
    points: ['Otaq, mətbəx və sanuzelin tam təmizliyi', 'Pəncərə və güzgülərin parıltısı', 'Toz və ləkələrdən dərin təmizlik', 'Sərfəli, şəffaf qiymət'],
  },
  {
    slug: 'temir-sonrasi-temizlik',
    title: 'Təmir sonrası təmizlik',
    icon: '🧱',
    scene: 'renovation',
    calc: 'area',
    tagline: 'Təmirdən sonra yeni kimi',
    description:
      'Tikinti tozu, boya və yapışqan izləri təmizlənir, pəncərələr silinir, bütün səthlər detallı şəkildə yuyulur. Mənzil dərhal yaşayışa hazır olur.',
    points: ['Tikinti tozunun tam təmizlənməsi', 'Pəncərə və çərçivələrin silinməsi', 'Boya, sement və yapışqan izlərinin təmizlənməsi', 'Detallı final təmizlik'],
  },
  {
    slug: 'yumsaq-mebel-kimyavi-temizliyi',
    title: 'Yumşaq mebel kimyəvi təmizliyi',
    icon: '🛋️',
    scene: 'furniture',
    calc: 'furniture',
    tagline: 'Divan, kreslo, stul və matras təzə kimi',
    description:
      'Xüsusi aparatla divan, kreslo, stul və matrasların dərin kimyəvi təmizliyi: ləkə, toz, bakteriya və qoxu aradan qalxır.',
    points: ['Xüsusi yuyucu-çəkici aparat', 'Ləkə və qoxuların aradan qaldırılması', 'Təhlükəsiz, qoxusuz vasitələr', 'Əşyaların sayına görə dəqiq qiymət'],
  },
  {
    slug: 'obyekt-temizliyi',
    title: 'Obyekt təmizliyi',
    icon: '🏢',
    scene: 'object',
    calc: 'area',
    tagline: 'Biznes mərkəzləri və mağazalar üçün',
    description:
      'Mağaza, anbar, klinika, mərkəz və digər kommersiya obyektlərinin təmizliyi. Fasad və vitrin şüşələri daxil olmaqla.',
    points: ['Fasad və vitrin şüşələri', 'Mərkəzi zonaların təmizliyi', 'Sanitar qovşaqların dezinfeksiyası', 'Birdəfəlik və müqaviləli təmizlik'],
  },
  {
    slug: 'restoran-temizliyi',
    title: 'Restoran təmizliyi',
    icon: '🍽️',
    scene: 'restaurant',
    calc: 'area',
    tagline: 'Gigiyena standartlarına uyğun',
    description:
      'Zal, mətbəx və sanitar qovşaqların gigiyena standartlarına uyğun təmizliyi. Yağ, kir və qoxuların tam təmizlənməsi.',
    points: ['Mətbəx avadanlığı və yağ təmizliyi', 'Zal, masa və stulların təmizliyi', 'Sanitar qovşağın dezinfeksiyası', 'Gecə və həftəsonu xidməti'],
  },
  {
    slug: 'ofis-temizliyi',
    title: 'Ofis təmizliyi',
    icon: '💼',
    scene: 'office',
    calc: 'area',
    tagline: 'Təmiz ofis — məhsuldar komanda',
    description:
      'İş masaları, otaqlar, görüş zalları və mətbəxin müntəzəm və ya birdəfəlik təmizliyi. İş vaxtınıza uyğun planlaşdırılır.',
    points: ['İş masaları və texnikanın silinməsi', 'Görüş otaqları və mətbəx', 'Sanuzellərin dezinfeksiyası', 'Gündəlik və həftəlik qrafik'],
  },
];

export const getService = (slug) => SERVICES.find((s) => s.slug === slug);
