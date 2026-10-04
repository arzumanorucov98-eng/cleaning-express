// =============================================
// SERVICES DATA - Xidmət məlumatları
// =============================================
// Hər xidmətin məlumatları burada saxlanılır.
// Yeni xidmət əlavə etmək üçün SERVICES massivindən yeni obyekt əlavə edin.

const SERVICES = [
  {
    id: 'ev-temizliyi',
    slug: 'ev-temizliyi',
    url: '/pages/xidmetler/ev-temizliyi.html',
    name: 'Ev Təmizliyi',
    shortName: 'Ev Təmizliyi',
    icon: '🏠',
    heroImage: '/assets/images/services/ev-temizliyi-hero.webp',
    thumbnail: '/assets/images/services/ev-temizliyi-thumb.webp',

    // SEO
    title: 'Ev Təmizliyi Bakı | Peşəkar Ev Təmizlik Xidməti - Cleanin Express',
    metaDescription: 'Bakıda peşəkar ev təmizliyi xidməti. Dərin təmizlik, standart təmizlik, mətbəx və hamam təmizliyi. Sertifikatlı komanda, müasir avadanlıq. Onlayn qiymət hesablayın!',
    h1: 'Bakıda Peşəkar Ev Təmizliyi Xidməti',
    keywords: ['ev təmizliyi Bakı', 'ev təmizlik xidməti', 'dərin təmizlik', 'mənzil təmizliyi'],

    // Məzmun
    description: 'Cleanin Express komandası evinizi peşəkar avadanlıq və ekoloji təmiz vasitələrlə təmizləyir. Standart və dərin təmizlik seçimləri mövcuddur.',
    longDescription: `Eviniz sizin rahatlıq yerinizdir və biz onu mükəmməl təmiz saxlamağa kömək edirik. Cleanin Express peşəkar ev təmizliyi xidməti ilə evinizin hər küncü diqqətlə təmizlənir. Təcrübəli komandamız müasir avadanlıq və ekoloji təmiz vasitələrdən istifadə edərək evinizi gigiyenik və təmiz saxlayır.`,

    // Kimlər üçün?
    targetAudience: [
      'İşləyən ailələr və cütlüklər',
      'Yeni doğulmuş uşağı olan ailələr',
      'Yaşlı insanlar',
      'Ev sahibləri və kirayəçilər',
      'Qonaq gözləyən ev sahibləri',
    ],

    // Nə daxildir?
    includes: [
      'Bütün otaqların tozalınması və silinməsi',
      'Döşəmələrin süpürülməsi və yuyulması',
      'Mətbəxin dərin təmizliyi (plitə, soyuducu üzəri, iş səthi)',
      'Hamamın dezinfeksiyası və təmizlənməsi',
      'Güzgü və şüşə səthlərinin silinməsi',
      'Zibil qutularının boşaldılması',
      'Mebel üzərlərinin silinməsi',
      'Pəncərə pervazlarının təmizlənməsi',
    ],

    // Üstünlüklər
    advantages: [
      { title: 'Ekoloji təmiz vasitələr', description: 'Uşaq və heyvan üçün təhlükəsiz təmizləyici vasitələr istifadə edirik.' },
      { title: 'Peşəkar avadanlıq', description: 'Sənaye dərəcəli tozsoran və buxar təmizləyiciləri.' },
      { title: 'Sertifikatlı komanda', description: 'Hər komanda üzvü təlim keçmiş və sertifikatlıdır.' },
      { title: 'Elastik qrafik', description: 'Sizə uyğun vaxtda gəlirik, həftə sonu da daxil.' },
      { title: 'Zəmanət', description: 'İşdən razı qalmasanız, pulsuz təkrar təmizlik edirik.' },
    ],

    // İş prosesi
    process: [
      { step: 1, title: 'Müraciət', description: 'WhatsApp və ya telefonla bizimlə əlaqə saxlayın.' },
      { step: 2, title: 'Qiymətləndirmə', description: 'Evinizin ölçüsü və ehtiyaclarınıza görə qiymət təyin edirik.' },
      { step: 3, title: 'Təmizlik', description: 'Təyin olunmuş vaxtda peşəkar komandamız gəlir.' },
      { step: 4, title: 'Yoxlama', description: 'İş bitdikdən sonra birlikdə nəticəni yoxlayırıq.' },
    ],

    // Avadanlıq
    equipment: [
      'Kärcher peşəkar tozsoran',
      'Buxar təmizləyici',
      'Mikrofiber dəstləri',
      'Ekoloji təmizləyici vasitələr',
      'Dezinfeksiya avadanlığı',
    ],

    // Müddət
    duration: '2-5 saat (evin ölçüsündən asılı olaraq)',

    // FAQ
    faq: [
      {
        question: 'Ev təmizliyi nə qədər vaxt çəkir?',
        answer: 'Standart 2 otaqlı mənzil üçün təxminən 2-3 saat, dərin təmizlik üçün 4-5 saat çəkir. Evin ölçüsü və vəziyyətindən asılı olaraq vaxt dəyişə bilər.',
      },
      {
        question: 'Hansı təmizləyici vasitələrdən istifadə edirsiniz?',
        answer: 'Biz ekoloji təmiz, uşaq və heyvan üçün təhlükəsiz peşəkar təmizləyici vasitələrdən istifadə edirik. Bütün vasitələr beynəlxalq sertifikatlara malikdir.',
      },
      {
        question: 'Təmizlik zamanı evdə olmaq lazımdırmı?',
        answer: 'Xeyr, mütləq deyil. Açarı bizə etibar edə bilərsiniz. Amma ilk dəfə olan müştərilər adətən evdə olurlar.',
      },
      {
        question: 'Nə qədər tez gələ bilərsiniz?',
        answer: 'Adətən sifarişdən 24 saat ərzində gəlirik. Təcili sifarişlər üçün eyni gün xidmət də mümkündür.',
      },
      {
        question: 'Əşyalarıma zərər dəyərsə nə olar?',
        answer: 'Komandamız sığortalıdır. Hər hansı zərər baş verərsə, tam kompensasiya təmin edirik.',
      },
    ],

    // Əlaqəli xidmətlər
    relatedServices: ['yumsaq-mebel-kimyavi-temizliyi', 'temir-sonrasi-temizlik'],

    // Calculator tipi
    calculatorType: 'ev-temizliyi',
  },

  {
    id: 'temir-sonrasi-temizlik',
    slug: 'temir-sonrasi-temizlik',
    url: '/pages/xidmetler/temir-sonrasi-temizlik.html',
    name: 'Təmir Sonrası Təmizlik',
    shortName: 'Təmir Sonrası',
    icon: '🔨',
    heroImage: '/assets/images/services/temir-sonrasi-hero.webp',
    thumbnail: '/assets/images/services/temir-sonrasi-thumb.webp',

    title: 'Təmir Sonrası Təmizlik Bakı | Tikinti Sonrası Təmizlik - Cleanin Express',
    metaDescription: 'Bakıda təmir sonrası peşəkar təmizlik xidməti. Tikinti tozu, boya ləkələri, sement qalıqları - hər şeyi təmizləyirik. Sürətli xidmət, münasib qiymət!',
    h1: 'Təmir Sonrası Peşəkar Təmizlik Xidməti',
    keywords: ['təmir sonrası təmizlik', 'tikinti sonrası təmizlik', 'təmir sonrası təmizlik Bakı'],

    description: 'Təmir və tikinti sonrası yaranan toz, boya ləkələri, sement qalıqları — hər şeyi peşəkar şəkildə təmizləyirik.',
    longDescription: `Təmir prosesi bitdikdən sonra ən çətin mərhələ — təmizlikdir. Tikinti tozu, boya ləkələri, yapışqan qalıqları, sement izləri — bunların hamısını peşəkar avadanlıqla təmizləmək lazımdır. Cleanin Express komandası təmir sonrası təmizlikdə ixtisaslaşıb və evinizi və ya ofisinizi yaşamağa hazır vəziyyətə gətirir.`,

    targetAudience: [
      'Yeni təmir etdirmiş ev sahibləri',
      'Tikinti şirkətləri',
      'Kirayə mənzil sahibləri',
      'Ofis idarəçiləri',
      'Yeni binalar və layihələr',
    ],

    includes: [
      'Tikinti tozu və qalıqlarının təmizlənməsi',
      'Boya ləkələrinin çıxarılması',
      'Sement və yapışqan qalıqlarının təmizlənməsi',
      'Pəncərə və şüşələrin yuyulması',
      'Döşəmələrin dərin təmizlənməsi',
      'Sanitar qovşaqların dezinfeksiyası',
      'Mətbəxin tam təmizlənməsi',
      'Divar və tavanların silinməsi',
      'Mebelin tozdan təmizlənməsi',
    ],

    advantages: [
      { title: 'Xüsusi avadanlıq', description: 'Tikinti tozuna qarşı sənaye dərəcəli tozsoranlar istifadə edirik.' },
      { title: 'Kimyəvi vasitələr', description: 'Boya, sement, yapışqan üçün xüsusi həlledicilər.' },
      { title: 'Tam təmizlik', description: 'Döşəmədən tavana qədər hər şeyi təmizləyirik.' },
      { title: 'Sürətli xidmət', description: 'Böyük komanda ilə qısa müddətdə bitirilir.' },
    ],

    process: [
      { step: 1, title: 'Baxış', description: 'Obyektə baxış keçirib çirklənmə səviyyəsini qiymətləndiririk.' },
      { step: 2, title: 'Qiymət', description: 'Sahə və çirklənmə dərəcəsinə görə qiymət təklifi veririk.' },
      { step: 3, title: 'Təmizlik', description: 'Peşəkar komanda ilə tam təmizlik aparırıq.' },
      { step: 4, title: 'Təhvil', description: 'Obyekti təmiz və hazır vəziyyətdə təhvil veririk.' },
    ],

    equipment: [
      'Sənaye tozsoranları',
      'Yüksək təzyiqli yuyucu',
      'Buxar təmizləyici',
      'Boya çıxarıcılar',
      'Sement həlledicilər',
      'Peşəkar şüşə təmizləyicilər',
    ],

    duration: '4-12 saat (sahə və çirklənmə dərəcəsindən asılı)',

    faq: [
      {
        question: 'Təmir sonrası təmizlik niyə vacibdir?',
        answer: 'Tikinti tozu sağlamlığa zərərlidir və adi tozsoranla tam təmizlənmir. Peşəkar avadanlıq lazımdır ki, incə toz hissəcikləri tam çıxarılsın.',
      },
      {
        question: 'Boya ləkələrini çıxara bilirsiniz?',
        answer: 'Bəli, xüsusi kimyəvi həlledicilər istifadə edərək boya, lak və yapışqan ləkələrini səthə zərər vermədən çıxarırıq.',
      },
      {
        question: 'Neçə nəfərlik komanda gəlir?',
        answer: 'Sahədən asılı olaraq 2-6 nəfərlik komanda göndəririk. Böyük obyektlər üçün daha böyük komanda ola bilər.',
      },
      {
        question: 'Təmir sonrası təmizlik bir dəfə kifayətdirmi?',
        answer: 'Əksər hallarda bəli. Amma çox ağır tikinti işlərindən sonra 2 mərhələli təmizlik tövsiyə edirik.',
      },
    ],

    relatedServices: ['ev-temizliyi', 'obyekt-temizliyi'],
    calculatorType: 'temir-sonrasi',
  },

  {
    id: 'obyekt-temizliyi',
    slug: 'obyekt-temizliyi',
    url: '/pages/xidmetler/obyekt-temizliyi.html',
    name: 'Obyekt Təmizliyi',
    shortName: 'Obyekt Təmizliyi',
    icon: '🏢',
    heroImage: '/assets/images/services/obyekt-temizliyi-hero.webp',
    thumbnail: '/assets/images/services/obyekt-temizliyi-thumb.webp',

    title: 'Obyekt Təmizliyi Bakı | Kommersiya Obyektlərinin Təmizliyi - Cleanin Express',
    metaDescription: 'Bakıda obyekt təmizliyi xidməti. Mağaza, biznes mərkəzi, anbar, showroom - hər növ kommersiya obyektinin peşəkar təmizliyi. Müqavilə əsasında!',
    h1: 'Bakıda Obyekt Təmizliyi Xidməti',
    keywords: ['obyekt təmizliyi Bakı', 'kommersiya təmizliyi', 'biznes təmizlik xidməti'],

    description: 'Mağaza, biznes mərkəzi, anbar, showroom — hər növ kommersiya obyektinin peşəkar təmizliyi.',
    longDescription: `Kommersiya obyektlərinin təmizliyi xüsusi yanaşma tələb edir. Cleanin Express hər növ obyektin — mağaza, biznes mərkəzi, anbar, showroom, klinika və digər sahələrin müntəzəm və ya birdəfəlik təmizliyini təmin edir. Müqavilə əsasında işləyirik və qrafiki sizin iş rejiminizdə uyğunlaşdırırıq.`,

    targetAudience: [
      'Mağaza və butik sahibləri',
      'Biznes mərkəzi idarəçiləri',
      'Anbar sahibləri',
      'Showroom rəhbərləri',
      'Klinika və tibb müəssisələri',
    ],

    includes: [
      'Döşəmələrin peşəkar yuyulması',
      'Vitrin və şüşə səthlərinin təmizlənməsi',
      'Sanitar qovşaqların dezinfeksiyası',
      'Ofis avadanlığının tozdan təmizlənməsi',
      'Zibil idarəetməsi',
      'Divar və tavanların silinməsi',
      'Giriş və koridor təmizliyi',
      'Xüsusi sahələrin dezinfeksiyası',
    ],

    advantages: [
      { title: 'Müqavilə sistemi', description: 'Aylıq və ya illik müqavilə ilə güzəştli qiymətlər.' },
      { title: 'Elastik qrafik', description: 'İş saatlarınıza uyğun təmizlik — gecə, səhər, həftə sonu.' },
      { title: 'Böyük komanda', description: 'Böyük obyektlər üçün 10+ nəfərlik komanda göndərə bilərik.' },
      { title: 'Hesabat sistemi', description: 'Hər təmizlikdən sonra ətraflı hesabat təqdim edirik.' },
    ],

    process: [
      { step: 1, title: 'Baxış', description: 'Obyektə yerində baxış keçiririk.' },
      { step: 2, title: 'Təklif', description: 'Xüsusi təmizlik planı və qiymət təklifi hazırlayırıq.' },
      { step: 3, title: 'Müqavilə', description: 'Razılaşma əsasında müqavilə imzalayırıq.' },
      { step: 4, title: 'Xidmət', description: 'Müntəzəm və ya birdəfəlik təmizlik xidməti göstəririk.' },
    ],

    equipment: [
      'Sənaye tozsoranları',
      'Döşəmə yuyucu maşınlar',
      'Yüksək təzyiqli yuyucu',
      'Dezinfeksiya avadanlığı',
      'Şüşə təmizləyici alətlər',
    ],

    duration: 'Sahədən asılı olaraq 3-8+ saat',

    faq: [
      {
        question: 'Müntəzəm təmizlik üçün müqavilə bağlaya bilərikmi?',
        answer: 'Bəli, aylıq və illik müqavilə seçimlərimiz var. Müqavilə əsasında xüsusi güzəştlər tətbiq edirik.',
      },
      {
        question: 'Gecə saatlarında təmizlik mümkündürmü?',
        answer: 'Bəli, iş saatlarınıza mane olmamaq üçün gecə və ya erkən səhər saatlarında təmizlik edə bilərik.',
      },
      {
        question: 'Hansı növ obyektlər üçün xidmət göstərirsiniz?',
        answer: 'Mağaza, biznes mərkəzi, anbar, showroom, klinika, fitnes zalı, otel və digər hər növ kommersiya obyekti üçün xidmət göstəririk.',
      },
    ],

    relatedServices: ['ofis-temizliyi', 'restoran-temizliyi'],
    calculatorType: 'obyekt',
  },

  {
    id: 'yumsaq-mebel-kimyavi-temizliyi',
    slug: 'yumsaq-mebel-kimyavi-temizliyi',
    url: '/pages/xidmetler/yumsaq-mebel-kimyavi-temizliyi.html',
    name: 'Yumşaq Mebellərin Kimyəvi Təmizliyi',
    shortName: 'Mebel Təmizliyi',
    icon: '🛋️',
    heroImage: '/assets/images/services/mebel-temizliyi-hero.webp',
    thumbnail: '/assets/images/services/mebel-temizliyi-thumb.webp',

    title: 'Divan Təmizliyi Bakı | Yumşaq Mebel Kimyəvi Təmizliyi - Cleanin Express',
    metaDescription: 'Bakıda divan, kreslo, stul, döşək və xalça kimyəvi təmizliyi. Ləkə çıxarma, dezinfeksiya, qoxu aradan qaldırma. Nəticə zəmanətli!',
    h1: 'Yumşaq Mebellərin Kimyəvi Təmizliyi Bakı',
    keywords: ['divan təmizliyi Bakı', 'mebel təmizliyi', 'kimyəvi təmizlik', 'yumşaq mebel təmizliyi'],

    description: 'Divan, kreslo, stul, döşək və xalçaların peşəkar kimyəvi təmizliyi. Ləkə çıxarma və dezinfeksiya.',
    longDescription: `Yumşaq mebellər zamanla toz, ləkə, allergen və bakteriya yığır. Peşəkar kimyəvi təmizlik vasitəsilə divanınız, kresilonuz və digər yumşaq mebelləriniz yeni kimi olur. Cleanin Express xüsusi ekstraksiya texnologiyası ilə mebelinizi dərinə qədər təmizləyir, ləkələri çıxarır və dezinfeksiya edir.`,

    targetAudience: [
      'Ev sahibləri',
      'Allergiyası olan insanlar',
      'Uşaqlı ailələr',
      'Ev heyvanı olanlar',
      'Otel və hostel idarəçiləri',
    ],

    includes: [
      'Divan kimyəvi təmizliyi',
      'Kreslo təmizliyi',
      'Stul örtüklərinin təmizlənməsi',
      'Döşək təmizliyi və dezinfeksiyası',
      'Xalça kimyəvi təmizliyi',
      'Ləkə çıxarma',
      'Qoxu aradan qaldırma',
      'Allergen təmizliyi',
      'Dezinfeksiya',
    ],

    advantages: [
      { title: 'Ekstraksiya texnologiyası', description: 'Dərin təmizlik üçün peşəkar ekstraksiya avadanlığı istifadə edirik.' },
      { title: 'Təhlükəsiz kimya', description: 'Parçaya zərər verməyən, uşaq və heyvan üçün təhlükəsiz vasitələr.' },
      { title: 'Sürətli quruma', description: 'Təmizlikdən 2-4 saat sonra mebel istifadəyə hazırdır.' },
      { title: 'Nəticə zəmanəti', description: 'Ləkə çıxmazsa, pul geri qaytarırıq.' },
    ],

    process: [
      { step: 1, title: 'Müraciət', description: 'Mebel növü və sayını bildirin.' },
      { step: 2, title: 'Baxış', description: 'Mebelin vəziyyətini qiymətləndiririk.' },
      { step: 3, title: 'Təmizlik', description: 'Xüsusi avadanlıqla dərin kimyəvi təmizlik.' },
      { step: 4, title: 'Quruma', description: '2-4 saat ərzində mebel quruyur və istifadəyə hazırdır.' },
    ],

    equipment: [
      'Peşəkar ekstraksiya maşını',
      'Buxar təmizləyici',
      'Xüsusi ləkə çıxarıcılar',
      'Dezinfeksiya vasitələri',
      'Qoxu neytrallaşdırıcı',
      'Qurutma ventilyatorları',
    ],

    duration: 'Mebel sayından asılı olaraq 1-4 saat',

    faq: [
      {
        question: 'Kimyəvi təmizlik mebelə zərər verirmi?',
        answer: 'Xeyr, biz parçanın növünə uyğun vasitələr seçirik. Təmizlikdən əvvəl parçanın testini aparırıq.',
      },
      {
        question: 'Təmizlikdən sonra mebel nə qədər quruyur?',
        answer: 'Adətən 2-4 saat ərzində mebel tam quruyur. Havanın rütubətindən asılı olaraq bu müddət dəyişə bilər.',
      },
      {
        question: 'Köhnə ləkələri çıxara bilirsiniz?',
        answer: 'Əksər köhnə ləkələri uğurla çıxarırıq. Amma bəzi ləkələr (rəng, marker) tam çıxmaya bilər — bu barədə əvvəlcədən məlumat veririk.',
      },
      {
        question: 'Evə gəlib təmizlik edirsiniz?',
        answer: 'Bəli, biz evinizə gəlirik. Bütün avadanlığı özümüzlə gətiririk.',
      },
    ],

    relatedServices: ['ev-temizliyi', 'ofis-temizliyi'],
    calculatorType: 'yumsaq-mebel',
  },

  {
    id: 'restoran-temizliyi',
    slug: 'restoran-temizliyi',
    url: '/pages/xidmetler/restoran-temizliyi.html',
    name: 'Restoran Təmizliyi',
    shortName: 'Restoran Təmizliyi',
    icon: '🍽️',
    heroImage: '/assets/images/services/restoran-temizliyi-hero.webp',
    thumbnail: '/assets/images/services/restoran-temizliyi-thumb.webp',

    title: 'Restoran Təmizliyi Bakı | Kafe və Restoran Təmizlik Xidməti - Cleanin Express',
    metaDescription: 'Bakıda restoran, kafe və iaşə obyektlərinin peşəkar təmizliyi. Mətbəx, zal, sanitar qovşaq - tam gigiyena standartlarına uyğun. Müqavilə əsasında!',
    h1: 'Restoran və Kafe Təmizliyi Xidməti Bakı',
    keywords: ['restoran təmizliyi Bakı', 'kafe təmizliyi', 'iaşə obyekti təmizliyi'],

    description: 'Restoran, kafe və iaşə obyektlərinin gigiyena standartlarına uyğun peşəkar təmizliyi.',
    longDescription: `İaşə sektorunda gigiyena ən vacib faktorlardan biridir. Cleanin Express restoran, kafe, bar və digər iaşə obyektlərinin peşəkar təmizliyini təmin edir. Mətbəx, zal, sanitar qovşaq — hər sahəni gigiyena standartlarına uyğun təmizləyirik. Müntəzəm müqavilə ilə restoranınızın təmizliyini təmin edin.`,

    targetAudience: [
      'Restoran sahibləri',
      'Kafe idarəçiləri',
      'Fast-food şəbəkələri',
      'Otel restoranları',
      'Katering şirkətləri',
    ],

    includes: [
      'Mətbəxin dərin təmizliyi',
      'Zalın təmizliyi',
      'Sanitar qovşağın dezinfeksiyası',
      'Yağ ləkələrinin çıxarılması',
      'Döşəmənin peşəkar yuyulması',
      'Ventilyasiya sisteminin təmizlənməsi',
      'Divar və tavanların silinməsi',
      'Avadanlığın xarici təmizliyi',
      'Vitrin və şüşələrin silinməsi',
    ],

    advantages: [
      { title: 'Gigiyena standartları', description: 'ASAN xidmət tələblərinə uyğun təmizlik.' },
      { title: 'Gecə xidməti', description: 'İş saatlarınıza mane olmadan gecə təmizlik.' },
      { title: 'Yağ təmizliyi', description: 'Xüsusi vasitələrlə mətbəx yağını tam təmizləyirik.' },
      { title: 'Müntəzəm xidmət', description: 'Gündəlik, həftəlik və ya aylıq təmizlik planı.' },
    ],

    process: [
      { step: 1, title: 'Baxış', description: 'Restoranınıza baxış keçirik.' },
      { step: 2, title: 'Plan', description: 'Təmizlik planı və qrafik hazırlayırıq.' },
      { step: 3, title: 'Müqavilə', description: 'Razılaşma və müqavilə.' },
      { step: 4, title: 'Xidmət', description: 'Müntəzəm peşəkar təmizlik xidməti.' },
    ],

    equipment: [
      'Yağ təmizləyici xüsusi vasitələr',
      'Sənaye döşəmə yuyucu',
      'Buxar dezinfeksiya avadanlığı',
      'Yüksək təzyiqli yuyucu',
      'Ventilyasiya təmizləyici',
    ],

    duration: 'Sahədən asılı olaraq 3-8 saat',

    faq: [
      {
        question: 'Restoran bağlı olanda təmizlik edə bilirsinizmi?',
        answer: 'Bəli, gecə saatlarında və ya restoranın bağlı olduğu gündə təmizlik edirik.',
      },
      {
        question: 'Mətbəx avadanlığını da təmizləyirsinizmi?',
        answer: 'Avadanlığın xarici hissəsini təmizləyirik. Daxili hissə üçün xüsusi texniki servis lazımdır.',
      },
      {
        question: 'Nə qədər tez-tez təmizlik etmək lazımdır?',
        answer: 'Restoranlar üçün həftədə 1-2 dəfə dərin təmizlik, gündəlik isə əsas təmizlik tövsiyə edirik.',
      },
    ],

    relatedServices: ['obyekt-temizliyi', 'ofis-temizliyi'],
    calculatorType: 'restoran',
  },

  {
    id: 'ofis-temizliyi',
    slug: 'ofis-temizliyi',
    url: '/pages/xidmetler/ofis-temizliyi.html',
    name: 'Ofis Təmizliyi',
    shortName: 'Ofis Təmizliyi',
    icon: '💼',
    heroImage: '/assets/images/services/ofis-temizliyi-hero.webp',
    thumbnail: '/assets/images/services/ofis-temizliyi-thumb.webp',

    title: 'Ofis Təmizliyi Bakı | Peşəkar Ofis Təmizlik Xidməti - Cleanin Express',
    metaDescription: 'Bakıda ofis təmizliyi xidməti. Müntəzəm və birdəfəlik ofis təmizliyi, dezinfeksiya, sanitar qovşaq. Elastik qrafik, münasib qiymət!',
    h1: 'Bakıda Peşəkar Ofis Təmizliyi Xidməti',
    keywords: ['ofis təmizliyi Bakı', 'ofis təmizlik xidməti', 'iş yeri təmizliyi'],

    description: 'Ofisinizin müntəzəm təmizliyi, dezinfeksiyası və sanitariya xidməti. Elastik qrafik və münasib qiymət.',
    longDescription: `Təmiz iş mühiti əməkdaşlarınızın sağlamlığı və məhsuldarlığı üçün vacibdir. Cleanin Express ofis təmizliyi xidməti ilə iş yerinizi həmişə təmiz və tərtibli saxlayın. Müntəzəm və ya birdəfəlik təmizlik, dezinfeksiya, sanitar qovşaq təmizliyi — hər şeyi öz üzərimizə götürürük.`,

    targetAudience: [
      'Şirkət rəhbərləri',
      'Ofis menecerləri',
      'HR departamentləri',
      'Coworking mərkəzləri',
      'Kiçik və orta biznes sahibləri',
    ],

    includes: [
      'Döşəmələrin süpürülməsi və yuyulması',
      'İş masalarının silinməsi',
      'Sanitar qovşağın təmizlənməsi',
      'Mətbəx/çay otağının təmizliyi',
      'Zibil qutularının boşaldılması',
      'Şüşə səthlərinin silinməsi',
      'Döşəmə xalçalarının tozsoranla təmizlənməsi',
      'Dezinfeksiya',
    ],

    advantages: [
      { title: 'İş saatı xaricində', description: 'Ofisinizdə işlər bitdikdən sonra təmizlik edirik.' },
      { title: 'Müntəzəm xidmət', description: 'Gündəlik, həftəlik, aylıq plan seçimləri.' },
      { title: 'Dezinfeksiya', description: 'Virus və bakteriyalara qarşı peşəkar dezinfeksiya.' },
      { title: 'Xüsusi şərtlər', description: 'Uzunmüddətli müqavilələr üçün xüsusi güzəştlər.' },
    ],

    process: [
      { step: 1, title: 'Müraciət', description: 'Bizimlə əlaqə saxlayın, ehtiyaclarınızı bildirin.' },
      { step: 2, title: 'Baxış', description: 'Ofisinizə baxış keçirik, plan hazırlayırıq.' },
      { step: 3, title: 'Razılaşma', description: 'Qrafik və qiymət barədə razılaşırıq.' },
      { step: 4, title: 'Başlayırıq', description: 'Müntəzəm təmizlik xidmətinə başlayırıq.' },
    ],

    equipment: [
      'Peşəkar tozsoranlar',
      'Döşəmə yuyucu maşın',
      'Dezinfeksiya avadanlığı',
      'Mikrofiber dəstlər',
      'Ekoloji təmizləyici vasitələr',
    ],

    duration: 'Ofis ölçüsünə görə 1-4 saat',

    faq: [
      {
        question: 'Ofisdə iş vaxtı təmizlik edirsiniz?',
        answer: 'Adətən iş saatlarından sonra və ya həftə sonu təmizlik edirik ki, əməkdaşlara mane olmayaq. Amma istəyinizə uyğun iş saatlarında da mümkündür.',
      },
      {
        question: 'Müqavilə minimum müddəti nə qədərdir?',
        answer: 'Minimum 1 aylıq müqavilə bağlayırıq. 6 aylıq və illik müqavilələr üçün xüsusi güzəştlər var.',
      },
      {
        question: 'Ofis avadanlıqlarına toxunursunuzmu?',
        answer: 'Kompüter, printer və digər avadanlıqların yalnız xarici səthlərini silib tozunu alırıq. Daxili hissələrə toxunmuruq.',
      },
    ],

    relatedServices: ['obyekt-temizliyi', 'ev-temizliyi'],
    calculatorType: 'ofis',
  },
];

// Xidmət tapma funksiyaları
function getServiceBySlug(slug) {
  return SERVICES.find(s => s.slug === slug);
}

function getServiceById(id) {
  return SERVICES.find(s => s.id === id);
}

function getRelatedServices(serviceId) {
  const service = getServiceById(serviceId);
  if (!service) return [];
  return service.relatedServices.map(id => getServiceById(id)).filter(Boolean);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SERVICES, getServiceBySlug, getServiceById, getRelatedServices };
}
