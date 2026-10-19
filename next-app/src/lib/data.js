export const DEFAULT_SETTINGS = {
  phone: '055 626 00 28',
  phoneTel: '+994556260028',
  whatsapp: '994556260028',
  instagram: 'https://www.instagram.com/cleaning.express.service?stkn=MThkbHRxdGx3YW53cw%3D%3D&utm_source=qr',
  tiktok: 'https://www.tiktok.com/@cleaning_express_baku?_r=1&_t=ZS-9AH4mMXCcUx',
  facebook: 'https://facebook.com',
  address: 'Bakı şəhəri',
  email: 'info@cleaningexpress.az',
  brandName: 'Cleaning Express Service',
  slogan: 'Təmizlik sürətlə, keyfiyyət zəmanətlə',
  description: 'Ev, ofis, restoran, obyekt, təmir sonrası və yumşaq mebel təmizliyi. Onlayn kalkulyator ilə qiyməti dərhal öyrən, sifarişi WhatsApp ilə təsdiqlə.'
};

export const DEFAULT_SEO = {
  home: {
    title: 'Cleaning Express Service — Peşəkar təmizlik xidməti',
    description: 'Ev, ofis, restoran, obyekt, təmir sonrası və yumşaq mebel təmizliyi. Onlayn kalkulyator ilə qiyməti dərhal öyrən, sifarişi WhatsApp ilə təsdiqlə.',
    keywords: 'temizlik xidmeti, ev temizliyi baki, ofis temizliyi, divan temizlenmesi, temirden sonra temizlik'
  },
  about: {
    title: 'Haqqımızda — Cleaning Express Service',
    description: 'Cleaning Express Service haqqında ətraflı məlumat. Təcrübəli komandamız, avadanlıqlarımız və gigiyena standartlarımız.',
    keywords: 'haqqimizda temizlik, peşəkar təmizlik şirkəti, cleaning express baku'
  },
  services: {
    title: 'Xidmətlərimiz və Qiymətlər — Cleaning Express Service',
    description: 'Bakıda bütün növ peşəkar təmizlik xidmətləri və canlı onlayn kalkulyator.',
    keywords: 'temizlik xidmetleri, temizlik qiymetleri baki, kalkulyator'
  },
  blogs: {
    title: 'Bloq və Faydalı Məsləhətlər — Cleaning Express Service',
    description: 'Ev və ofis təmizliyi, gigiyena və ləkə çıxarma qaydaları haqqında faydalı məqalələr.',
    keywords: 'temizlik bloq, leke cixarmaq, mebel baximi, faydali meslehetler'
  },
  contact: {
    title: 'Əlaqə — Cleaning Express Service',
    description: 'Bizimlə əlaqə saxlayın: WhatsApp və ya birbaşa zənglə təmizlik sifariş edin.',
    keywords: 'temizlik elaqe, cleaning express nomre, temizlik sifarisi'
  }
};

export const DEFAULT_SERVICES = [
  {
    slug: 'ev-temizliyi',
    title: 'Ev təmizliyi',
    icon: '🏠',
    scene: 'home',
    calc: 'area',
    tagline: 'Evinizdə hər guşə parıldasın',
    description: 'Mənzil və həyət evlərinin ümumi və dərin təmizliyi: otaqlar, mətbəx, sanuzel, pəncərələr. Peşəkar komanda, təhlükəsiz vasitələr.',
    points: ['Otaq, mətbəx və sanuzelin tam təmizliyi', 'Pəncərə və güzgülərin parıltısı', 'Toz və ləkələrdən dərin təmizlik', 'Sərfəli, şəffaf qiymət']
  },
  {
    slug: 'temir-sonrasi-temizlik',
    title: 'Təmir sonrası təmizlik',
    icon: '🧱',
    scene: 'renovation',
    calc: 'area',
    tagline: 'Təmirdən sonra yeni kimi',
    description: 'Tikinti tozu, boya və yapışqan izləri təmizlənir, pəncərələr silinir, bütün səthlər detallı şəkildə yuyulur. Mənzil dərhal yaşayışa hazır olur.',
    points: ['Tikinti tozunun tam təmizlənməsi', 'Pəncərə və çərçivələrin silinməsi', 'Boya, sement və yapışqan izlərinin təmizlənməsi', 'Detallı final təmizlik']
  },
  {
    slug: 'yumsaq-mebel-kimyavi-temizliyi',
    title: 'Yumşaq mebel kimyəvi təmizliyi',
    icon: '🛋️',
    scene: 'furniture',
    calc: 'furniture',
    tagline: 'Divan, kreslo, stul və matras təzə kimi',
    description: 'Xüsusi aparatla divan, kreslo, stul və matrasların dərin kimyəvi təmizliyi: ləkə, toz, bakteriya və qoxu aradan qalxır.',
    points: ['Xüsusi yuyucu-çəkici aparat', 'Ləkə və qoxuların aradan qaldırılması', 'Təhlükəsiz, qoxusuz vasitələr', 'Əşyaların sayına görə dəqiq qiymət']
  },
  {
    slug: 'obyekt-temizliyi',
    title: 'Obyekt təmizliyi',
    icon: '🏢',
    scene: 'object',
    calc: 'area',
    tagline: 'Biznes mərkəzləri və mağazalar üçün',
    description: 'Mağaza, anbar, klinika, mərkəz və digər kommersiya obyektlərinin təmizliyi. Fasad və vitrin şüşələri daxil olmaqla.',
    points: ['Fasad və vitrin şüşələri', 'Mərkəzi zonaların təmizliyi', 'Sanitar qovşaqların dezinfeksiyası', 'Birdəfəlik və müqaviləli təmizlik']
  },
  {
    slug: 'restoran-temizliyi',
    title: 'Restoran təmizliyi',
    icon: '🍽️',
    scene: 'restaurant',
    calc: 'area',
    tagline: 'Gigiyena standartlarına uyğun',
    description: 'Zal, mətbəx və sanitar qovşaqların gigiyena standartlarına uyğun təmizliyi. Yağ, kir və qoxuların tam təmizlənməsi.',
    points: ['Mətbəx avadanlığı və yağ təmizliyi', 'Zal, masa və stulların təmizliyi', 'Sanitar qovşağın dezinfeksiyası', 'Gecə və həftəsonu xidməti']
  },
  {
    slug: 'ofis-temizliyi',
    title: 'Ofis təmizliyi',
    icon: '💼',
    scene: 'office',
    calc: 'area',
    tagline: 'Təmiz ofis — məhsuldar komanda',
    description: 'İş masaları, otaqlar, görüş zalları və mətbəxin müntəzəm və ya birdəfəlik təmizliyi. İş vaxtınıza uyğun planlaşdırılır.',
    points: ['İş masaları və texnikanın silinməsi', 'Görüş otaqları və mətbəx', 'Sanuzellərin dezinfeksiyası', 'Gündəlik və həftəlik qrafik']
  }
];

export const AREA_TARIFFS = {
  'ev-temizliyi': { perSqm: 2.0, perRoom: 5, perWindow: 4, perBathroom: 15, minimum: 50 },
  'ofis-temizliyi': { perSqm: 1.8, perRoom: 4, perWindow: 4, perBathroom: 15, minimum: 60 },
  'restoran-temizliyi': { perSqm: 3.0, perRoom: 8, perWindow: 5, perBathroom: 20, minimum: 100 },
  'obyekt-temizliyi': { perSqm: 2.2, perRoom: 5, perWindow: 5, perBathroom: 20, minimum: 80 },
  'temir-sonrasi-temizlik': { perSqm: 4.0, perRoom: 10, perWindow: 8, perBathroom: 25, minimum: 120 }
};

export const FURNITURE_TARIFFS = {
  minimum: 0,
  items: [
    { id: 'divan', name: 'Divan', icon: '🛋️', price: 40 },
    { id: 'kreslo', name: 'Kreslo', icon: '💺', price: 20 },
    { id: 'stul', name: 'Stul', icon: '🪑', price: 8 },
    { id: 'matras', name: 'Matras', icon: '🛏️', price: 30 }
  ]
};

export const DEFAULT_BLOGS = [
  {
    slug: 'ofis-temizliyinin-faydalari',
    title: 'Ofis Təmizliyinin İşçilərin Məhsuldarlığına Təsiri',
    description: 'Təmiz bir ofis mühiti işçilərin motivasiyasını və məhsuldarlığını necə artırır? Ofis təmizliyinin faydaları haqqında ətraflı məlumat.',
    author: 'Cleaning Express Komandası',
    date: '2026-10-10',
    content: `
      <h2>Təmiz Ofis, Yüksək Məhsuldarlıq</h2>
      <p>İş yerindəki mühit işçilərin psixologiyasına və fiziki sağlamlığına birbaşa təsir göstərir. Təmiz və səliqəli bir ofis yalnız müştərilərdə yaxşı təəssürat yaratmaqla qalmır, həm də işçilərin məhsuldarlığını əhəmiyyətli dərəcədə artırır.</p>
      <h3>Xəstəliklərin Qarşısının Alınması</h3>
      <p>Ofislərdə insanların sıx təmasda olması infeksiyaların sürətlə yayılmasına səbəb ola bilər. Peşəkar ofis təmizliyi xidməti sayəsində masalar, qapı tutacaqları və ümumi istifadə sahələri dezinfeksiya edilir. Bu isə işçilərin xəstələnmə hallarını və işə gəlməmə günlərini azaldır.</p>
      <h3>Konsentrasiyanın Artması</h3>
      <p>Dağınıq və çirkli bir mühit diqqəti yayındırır. Araşdırmalar göstərir ki, səliqəli bir masada çalışan işçilər tapşırıqlara daha yaxşı fokuslana bilirlər. Təmiz mühit zehni yorğunluğu azaldır və yaradıcılığı stimullaşdırır.</p>
      <h3>Peşəkar İmic</h3>
      <p>Ofisə gələn qonaqlar və müştərilər üçün ilk təəssürat çox vacibdir. Parıldayan döşəmələr, təmiz şüşələr və səliqəli iş masaları şirkətinizin peşəkarlığından və detallara verdiyi diqqətdən xəbər verir.</p>
      <p><strong>Nəticə:</strong> Şirkətinizin uğuru üçün mütəmadi olaraq peşəkar təmizlik xidmətlərindən yararlanmaq ən yaxşı investisiyalardan biridir. Cleaning Express Service olaraq ofisinizin hər zaman təmiz və təravətli qalmasını təmin edirik.</p>
    `
  },
  {
    slug: 'ev-temizliyinde-yol-verilen-sehvler',
    title: 'Ev Təmizliyində Yol Verilən 7 Əsas Səhv',
    description: 'Ev təmizliyini daha da çətinləşdirən və vaxt itkisinə səbəb olan ən çox yayılmış 7 səhv. Düzgün təmizlik qaydalarını öyrənin.',
    author: 'Cleaning Express Komandası',
    date: '2026-10-08',
    content: `
      <h2>Təmizlik Edərkən Hansı Səhvlərə Yol Veririk?</h2>
      <p>Ev təmizliyi gündəlik həyatımızın ayrılmaz bir hissəsidir. Lakin bəzən bilmədən etdiyimiz səhvlər təmizlik prosesini həm uzadır, həm də səmərəsiz edir.</p>
      <h3>1. Təmizliyə Səhv Yerdən Başlamaq</h3>
      <p>Ən böyük səhvlərdən biri döşəməni silib sonra toz almaqdır. Toz aldıqda hissəciklər yenidən yerə düşür. Qayda belə olmalıdır: Təmizliyə həmişə yuxarıdan aşağıya doğru başlayın.</p>
      <h3>2. Eyni Bezi Hər Yerdə İstifadə Etmək</h3>
      <p>Mətbəx masasını sildiyiniz bezlə hamam qapısını silmək bakteriyaların evin hər yerinə yayılmasına səbəb olur. Fərqli sahələr üçün fərqli rəngli mikrofiber bezlər istifadə etmək məsləhətdir.</p>
      <h3>3. Təmizlik Vasitələrini Birbaşa Səthə Püskürtmək</h3>
      <p>Spreyləri birbaşa mebelin üzərinə püskürtmək ləkə yarada bilər. Düzgün yol vasitəni əvvəlcə bezə, daha sonra səthə tətbiq etməkdir.</p>
      <h3>4. Mebellərin Altını Unutmaq</h3>
      <p>Yalnız görünən yerləri təmizləmək kifayət deyil. Divan və şkafların altında toplanan tozlar evdəki hava keyfiyyətini aşağı salır.</p>
      <p><strong>Daha asan həll:</strong> Ev təmizliyini peşəkarlara həvalə edin! Cleaning Express Service komandası evinizin hər küncünü dərindən təmizləməyə hazırdır.</p>
    `
  },
  {
    slug: 'usaq-otaqlarinin-temizliyi',
    title: 'Uşaq Otaqlarının Təmizliyi və Dezinfeksiyası: Vacib Qaydalar',
    description: 'Uşaq otaqlarının təhlükəsiz və gigiyenik olması üçün təmizlik zamanı nələrə diqqət edilməlidir? Sağlam təmizlik sirləri.',
    author: 'Cleaning Express Komandası',
    date: '2026-10-05',
    content: `
      <h2>Uşaqların Sağlamlığı Üçün Təmiz Mühit</h2>
      <p>Uşaqların immunitet sistemi hələ tam formalaşmadığı üçün onların vaxt keçirdiyi mühitin təmizliyi xüsusi əhəmiyyət daşıyır. Uşaq otağının təmizliyi yalnız səliqə deyil, eyni zamanda mikrob və alergenlərdən arındırma prosesidir.</p>
      <h3>Ekoloji Təmiz Vasitələrdən İstifadə</h3>
      <p>Uşaq otağında sərt kimyəvi maddələrdən istifadə etməkdən çəkinin. Ağardıcı və ya güclü qoxulu təmizləyicilər uşaqların tənəffüs yollarına zərər verə bilər. Təbii və anti-allergik təmizlik vasitələrinə üstünlük verilməlidir.</p>
      <h3>Oyuncaqların Mütəmadi Yuyulması</h3>
      <p>Uşaqlar oyuncaqlarını tez-tez ağızlarına salırlar. Buna görə də rezin, plastik və peluş oyuncaqlar müntəzəm olaraq yuyulmalı və dezinfeksiya edilməlidir.</p>
      <h3>Toz Gənələrinə Qarşı Mübarizə</h3>
      <p>Xalçalar və yataq dəstləri toz gənələrinin ən sevdiyi yerlərdir. Uşaq otağında olan xalçalar tez-tez tozsoranlanmalı, yataq dəstləri isə yüksək dərəcədə yuyulmalıdır. Yumşaq mebel və xalçaların peşəkar kimyəvi təmizliyi uşağınızı allergiyadan qoruyur.</p>
    `
  },
  {
    slug: 'heyvan-saxlayanlar-ucun-temizlik-meslehetleri',
    title: 'Ev Heyvanı Saxlayanlar Üçün Pratik Təmizlik Məsləhətləri',
    description: 'Ev heyvanı olan evlərdə təmizliyi necə qorumalı? Tük və ləkələrlə mübarizə üçün faydalı seo uyğun məsləhətlər.',
    author: 'Cleaning Express Komandası',
    date: '2026-10-02',
    content: `
      <h2>Sevimli Dostlarımız və Təmiz Ev</h2>
      <p>Ev heyvanları həyatımıza sevinc qatsa da, onların tökülən tükləri və bəzən yaratdıqları ləkələr ev təmizliyini çətinləşdirə bilər. Lakin doğru strategiya ilə həm sevimli dostunuzla vaxt keçirə, həm də evinizi təmiz saxlaya bilərsiniz.</p>
      <h3>Tüklərlə Effektiv Mübarizə</h3>
      <p>Mebellərdəki tükləri toplamaq üçün rezin əlcəklərdən və ya xüsusi yapışqanlı diyircəklərdən istifadə edin. Əlcəyi azca nəmləndirib mebelin üzərindən keçirdikdə tüklər asanlıqla yığılacaq.</p>
      <h3>Qoxuların Aradan Qaldırılması</h3>
      <p>Xalça və yumşaq mebellərə hopmuş heyvan qoxusunu aradan qaldırmaq üçün soda təbii və təhlükəsiz vasitədir. Səthə soda səpin, 20-30 dəqiqə gözləyin və tozsoranla çəkin.</p>
      <h3>Müntəzəm Dərin Təmizlik</h3>
      <p>Ev heyvanı olan evlərdə ildə ən azı 2-3 dəfə yumşaq mebellərin və xalçaların peşəkar kimyəvi təmizliyi vacibdir. Bu, dərində yığılan allergenləri və mikrobları tam məhv edir.</p>
    `
  },
  {
    slug: 'xalca-temizliyinde-diqqet-edilmeli-meqamlar',
    title: 'Xalça Təmizliyində Diqqət Edilməli 5 Mühüm Məqam',
    description: 'Xalçalarınızı zədələmədən necə təmizləməli? Düzgün qulluq və peşəkar xalça yuma xidmətinin üstünlükləri.',
    author: 'Cleaning Express Komandası',
    date: '2026-09-28',
    content: `
      <h2>Xalçaların Ömrünü Uzadan Qaydalar</h2>
      <p>Xalçalar evimizin ən çox çirklənən, lakin ən çətin təmizlənən əşyalarındandır. Düzgün aparılmayan təmizlik xalçanın rəngini soldura və toxumasını zədələyə bilər.</p>
      <h3>1. Ləkəyə Dərhal Müdaxilə Edin</h3>
      <p>Xalçaya çay, qəhvə və ya yemək dağıldıqda dərhal salfetlə hopdurun. Əsla sürtməyin! Sürtmək ləkəni liflərin daha da dərinliyinə hopdurur.</p>
      <h3>2. Həddindən Artıq Sudan Çəkinin</h3>
      <p>Ev şəraitində xalçanı yuyarkən çox islatmaq onun alt hissəsində kif və bakteriya yaranmasına səbəb ola bilər. Xalçanın tam quruması çox vacibdir.</p>
      <h3>3. Düzgün Kimyəvi Maddə Seçimi</h3>
      <p>Hər xalça materialı (yun, ipək, sintetik) fərqli təmizləyici tələb edir. Səhv vasitə rənglərin bir-birinə qarışmasına səbəb ola bilər.</p>
      <p>Ən təhlükəsiz yol — xalçalarınızı peşəkar təmizlik mütəxəssislərinə həvalə etməkdir.</p>
    `
  }
];
