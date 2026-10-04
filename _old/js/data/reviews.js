// =============================================
// REVIEWS DATA - Müştəri rəyləri
// =============================================
// YALNIZ REAL müştəri rəyləri əlavə edin.
// Saxta review yaratmayın.
// Schema markup yalnız real rəylər üçün istifadə olunacaq.

const REVIEWS = [
  {
    id: 'r1',
    name: 'Aynur Məmmədova',
    service: 'Ev Təmizliyi',
    serviceSlug: 'ev-temizliyi',
    text: 'Cleanin Express komandası evimizdə əla iş gördü. Hər künc diqqətlə təmizləndi. Xüsusilə mətbəx və hamamın təmizliyi çox yaxşı idi. Mütləq tövsiyə edirəm!',
    date: '2024-08-15',
    location: 'Bakı, Nəsimi',
  },
  {
    id: 'r2',
    name: 'Rəşad Əliyev',
    service: 'Təmir Sonrası Təmizlik',
    serviceSlug: 'temir-sonrasi-temizlik',
    text: 'Təmir bitdikdən sonra mənzil çox pis vəziyyətdə idi. Cleanin Express komandası bir gündə hər şeyi təmizlədi. Tikinti tozu, boya ləkələri — heç nə qalmadı. Çox razıyam!',
    date: '2024-09-02',
    location: 'Bakı, Yasamal',
  },
  {
    id: 'r3',
    name: 'Leyla Hüseynova',
    service: 'Yumşaq Mebel Təmizliyi',
    serviceSlug: 'yumsaq-mebel-kimyavi-temizliyi',
    text: 'Divanımız uşaqlardan çox ləkə olmuşdu. Kimyəvi təmizlikdən sonra yeni kimi oldu! Heç inanmırdım bu qədər fərq edəcəyini.',
    date: '2024-07-20',
    location: 'Bakı, Xətai',
  },
  {
    id: 'r4',
    name: 'Tural Qasımov',
    service: 'Ofis Təmizliyi',
    serviceSlug: 'ofis-temizliyi',
    text: 'Hər həftə ofisimizin təmizliyini edirlər. Peşəkar yanaşma, vaxtında gəlirlər və iş keyfiyyəti əladır. 6 aydır müqaviləmiz var.',
    date: '2024-06-10',
    location: 'Bakı, Səbail',
  },
  {
    id: 'r5',
    name: 'Nigar İbrahimova',
    service: 'Restoran Təmizliyi',
    serviceSlug: 'restoran-temizliyi',
    text: 'Restoranımızın mətbəxini dərindən təmizlədilər. Yağ ləkələri, ventilyasiya — hər şey parıldayır. ASAN yoxlamasından problemsiz keçdik.',
    date: '2024-10-05',
    location: 'Bakı, Nizami',
  },
  {
    id: 'r6',
    name: 'Elçin Nəsirov',
    service: 'Obyekt Təmizliyi',
    serviceSlug: 'obyekt-temizliyi',
    text: 'Yeni açdığımız mağazanın tam təmizliyini etdilər. Vitrinlər, döşəmə, anbar hissəsi — hər yer mükəmməl təmiz idi. Açılışa hazır vəziyyətdə təhvil aldıq.',
    date: '2024-09-28',
    location: 'Bakı, Binəqədi',
  },
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { REVIEWS };
}
