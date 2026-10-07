const fs = require('fs');
const path = require('path');

const blogs = [
  {
    slug: 'ofis-temizliyinin-faydalari',
    title: 'Ofis Təmizliyinin İşçilərin Məhsuldarlığına Təsiri',
    description: 'Təmiz bir ofis mühiti işçilərin motivasiyasını və məhsuldarlığını necə artırır? Ofis təmizliyinin faydaları haqqında ətraflı məlumat.',
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
    content: `
      <h2>Sevimli Dostlarımız və Təmiz Ev</h2>
      <p>Ev heyvanları həyatımıza sevinc qatsa da, onların tökülən tükləri və bəzən yaratdıqları ləkələr ev təmizliyini çətinləşdirə bilər. Lakin doğru strategiya ilə həm sevimli dostunuzla vaxt keçirə, həm də evinizi təmiz saxlaya bilərsiniz.</p>
      <h3>Tüklərlə Mübarizə</h3>
      <p>Tüklərin evə yayılmasının qarşısını almaq üçün ən yaxşı üsul ev heyvanınızı mütəmadi daramaqdır. Divan və xalçalardakı tükləri yığmaq üçün xüsusi rezin əlcəklərdən və ya tükyığan rulonlardan istifadə edə bilərsiniz.</p>
      <h3>Qoxuları Yox Etmək</h3>
      <p>Heyvanların yatdığı yerləri və qablarını tez-tez təmizləyin. Xalça və mebellərə hopmuş qoxuları aparmaq üçün karbonat (soda) əla təbii vasitədir. Səthə səpin, 15-20 dəqiqə gözləyin və tozsoranlayın.</p>
      <h3>Ləkələrə Anında Müdaxilə</h3>
      <p>Gözlənilməz "qəzalar" baş verdikdə ləkə qurumadan dərhal müdaxilə etmək lazımdır. Sidik ləkələri üçün sirkəli su qarışımı həm ləkəni, həm də qoxunu neytrallaşdırır.</p>
      <p><strong>Peşəkar Dəstək:</strong> Dərinə hopmuş ləkə və tüklər üçün Cleaning Express Service-in xalça və yumşaq mebel təmizliyi xidmətindən istifadə edin.</p>
    `
  },
  {
    slug: 'xalca-temizliyinde-diqqet-edilmeli-meqamlar',
    title: 'Xalça və Yumşaq Mebel Təmizliyində Diqqət Edilməli Məqamlar',
    description: 'Xalça və yumşaq mebellərin ömrünü uzatmaq, ləkələrdən düzgün xilas olmaq üçün tətbiq edilməli olan peşəkar metodlar.',
    content: `
      <h2>Evimizin Bəzəyi: Xalçalar və Mebellər</h2>
      <p>Xalçalar və yumşaq mebellər evin ən çox istifadə edilən və buna görə də ən çox çirklənən əşyalarıdır. Onların yanlış təmizlənməsi həm görünüşünü poza, həm də materialına ciddi zərər verə bilər.</p>
      <h3>Yanlış Kimyəvilərdən Qaçın</h3>
      <p>Marketlərdə satılan ləkə çıxarıcıların əksəriyyəti sərt kimyəvi maddələrdən ibarətdir. Bunlar xalçanın rəngini soldura və mebelin parçasına ziyan vura bilər. Hər hansı bir vasitəni istifadə etməzdən əvvəl həmişə görünməyən bir hissədə test edin.</p>
      <h3>Suyu Çox İstifade Etməyin</h3>
      <p>Xalça və ya divanı təmizləyərkən həddindən artıq su istifadə etmək mebelin daxilinə su sızmasına, nəticədə kif və pis qoxunun yaranmasına səbəb olur. Nəmi minimumda saxlamaq vacibdir.</p>
      <h3>Mütəmadi Peşəkar Təmizlik</h3>
      <p>Tozsoran yalnız səthdəki tozları yığır. Xalçanın dərinliklərinə hopmuş bakteriya, mikrob və kir yalnız peşəkar avadanlıqlarla təmizlənə bilər. İldə ən azı iki dəfə xalça və mebellərin peşəkar kimyəvi təmizliyini etdirmək həm sağlamlığınız, həm də əşyalarınızın uzunömürlülüyü üçün vacibdir.</p>
    `
  }
];

const templatePath = path.join(__dirname, 'bloq.html');
const templateStr = fs.readFileSync(templatePath, 'utf-8');

const headerMatch = templateStr.match(/([\s\S]*?)<main>/)[1];
const footerMatch = templateStr.match(/<\/main>([\s\S]*)/)[1];

const blogDir = path.join(__dirname, 'bloq');
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir);
}

blogs.forEach(blog => {
  let customHeader = headerMatch;
  customHeader = customHeader.replace(/<title>.*?<\/title>/, "<title>" + blog.title + " | Cleaning Express Service</title>");
  customHeader = customHeader.replace(/<meta name="description" content=".*?" \/>/, "<meta name=\"description\" content=\"" + blog.description + "\" />");
  customHeader = customHeader.replace(/<link rel="canonical" href=".*?" \/>/, "<link rel=\"canonical\" href=\"https://cleaning-express-flame.vercel.app/bloq/" + blog.slug + ".html\" />");
  customHeader = customHeader.replace(/<meta property="og:title" content=".*?" \/>/, "<meta property=\"og:title\" content=\"" + blog.title + " | Cleaning Express Service\" />");
  customHeader = customHeader.replace(/<meta property="og:description" content=".*?" \/>/, "<meta property=\"og:description\" content=\"" + blog.description + "\" />");
  customHeader = customHeader.replace(/<meta property="og:url" content=".*?" \/>/, "<meta property=\"og:url\" content=\"https://cleaning-express-flame.vercel.app/bloq/" + blog.slug + ".html\" />");
  customHeader = customHeader.replace(/data-page="blog"/, 'data-page="blog-post"');

  const mainContent = `
<main>
<section class="hero container service-hero">
  <div class="hero-text" style="max-width: 800px; margin: 0 auto; text-align: center;">
    <nav class="crumbs" aria-label="Breadcrumb" style="justify-content: center;"><a href="/">Ana səhifə</a> / <a href="/bloq.html">Bloq</a> / <span>Məqalə</span></nav>
    <h1>` + blog.title + `</h1>
  </div>
</section>
<section class="section container">
  <article class="glass" style="padding: 2rem; border-radius: 1rem; max-width: 800px; margin: 0 auto;">
    ` + blog.content + `
  </article>
</section>
</main>
`;

  const fullHtml = customHeader + mainContent + footerMatch;
  fs.writeFileSync(path.join(blogDir, blog.slug + '.html'), fullHtml);
});

// Update bloq.html cards
const cardsHtml = blogs.map(blog => {
  return '<a class="card glass" href="/bloq/' + blog.slug + '.html">' +
         '<h3>' + blog.title + '</h3>' +
         '<p>' + blog.description.substring(0, 100) + '...</p>' +
         '</a>';
}).join('\n');

const newBloqHtml = templateStr.replace(/<div class="cards">[\s\S]*?<\/div>/, '<div class="cards">\n' + cardsHtml + '\n  </div>');
fs.writeFileSync(templatePath, newBloqHtml);

console.log('Blogs generated successfully.');
