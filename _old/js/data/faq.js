// =============================================
// FAQ DATA - Ümumi FAQ məlumatları
// =============================================
// Xidmət-spesifik FAQ-lar services.js faylındadır.
// Bu fayl ümumi FAQ-lar üçündür (FAQ səhifəsi).

const GENERAL_FAQ = [
  {
    category: 'Ümumi',
    items: [
      {
        question: 'Cleanin Express hansı xidmətlər göstərir?',
        answer: 'Biz ev təmizliyi, ofis təmizliyi, restoran təmizliyi, obyekt təmizliyi, təmir sonrası təmizlik və yumşaq mebellərin kimyəvi təmizliyi xidmətlərini göstəririk.',
      },
      {
        question: 'Hansı ərazilərə xidmət göstərirsiniz?',
        answer: 'Biz Bakı, Sumqayıt, Xırdalan və Abşeron yarımadasında xidmət göstəririk.',
      },
      {
        question: 'İş saatlarınız necədir?',
        answer: 'Bazar ertəsi - Şənbə: 09:00-19:00, Şənbə: 09:00-17:00. Bazar günləri bağlıyıq. Təcili sifarişlər üçün əlaqə saxlayın.',
      },
      {
        question: 'Sifarişi necə verə bilərəm?',
        answer: 'WhatsApp, telefon və ya saytımızdakı əlaqə formu vasitəsilə sifariş verə bilərsiniz. Ən sürətli yol WhatsApp-dır.',
      },
    ],
  },
  {
    category: 'Qiymət və Ödəniş',
    items: [
      {
        question: 'Qiymətlər necə müəyyənləşdirilir?',
        answer: 'Qiymətlər sahə (m²), xidmət növü, çirklənmə dərəcəsi və əlavə xidmətlərə görə hesablanır. Saytımızdakı kalkulyatordan təxmini qiyməti öyrənə bilərsiniz.',
      },
      {
        question: 'Ödəniş necə edilir?',
        answer: 'Nağd və ya bank köçürməsi ilə ödəniş edə bilərsiniz. Ödəniş iş bitdikdən sonra həyata keçirilir.',
      },
      {
        question: 'Əvvəlcədən ödəniş tələb edirsiniz?',
        answer: 'Standart sifarişlər üçün əvvəlcədən ödəniş tələb etmirik. Böyük layihələr üçün 30% əvvəlcədən ödəniş ola bilər.',
      },
    ],
  },
  {
    category: 'Xidmət Prosesi',
    items: [
      {
        question: 'Təmizlik nə qədər vaxt çəkir?',
        answer: 'Sahə və xidmət növündən asılıdır. Standart ev təmizliyi 2-4 saat, dərin təmizlik 4-6 saat, təmir sonrası 4-12 saat çəkə bilər.',
      },
      {
        question: 'Hansı avadanlıq və vasitələr istifadə edirsiniz?',
        answer: 'Kärcher, buxar təmizləyici, ekstraksiya maşını kimi peşəkar avadanlıqlar və ekoloji təmiz vasitələr istifadə edirik.',
      },
      {
        question: 'Nə qədər tez gələ bilərsiniz?',
        answer: 'Adətən 24 saat ərzində xidmət göstəririk. Təcili sifarişlər üçün eyni gün xidmət mümkündür.',
      },
      {
        question: 'Avadanlığı siz gətirirsiniz?',
        answer: 'Bəli, bütün avadanlıq və təmizləyici vasitələri özümüz gətiririk.',
      },
    ],
  },
  {
    category: 'Zəmanət və Keyfiyyət',
    items: [
      {
        question: 'İşinizə zəmanət verirsiniz?',
        answer: 'Bəli, bütün xidmətlərimizə zəmanət veririk. Razı qalmasanız, 24 saat ərzində pulsuz təkrar təmizlik edirik.',
      },
      {
        question: 'Əşyalarıma zərər gəlsə nə baş verəcək?',
        answer: 'Komandamız sığortalıdır. Hər hansı zərər halında tam kompensasiya təmin edirik.',
      },
      {
        question: 'Komandanız təlim keçibmi?',
        answer: 'Bəli, hər komanda üzvü peşəkar təlim proqramından keçir və sertifikat alır.',
      },
    ],
  },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GENERAL_FAQ };
}
