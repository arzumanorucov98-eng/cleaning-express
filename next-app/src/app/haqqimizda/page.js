import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';

export const metadata = {
  title: 'Haqqımızda — Cleaning Express Service',
  description: 'Cleaning Express Service haqqında ətraflı məlumat. Təcrübəli komandamız, avadanlıqlarımız və gigiyena standartlarımız.',
};

export default function AboutPage() {
  return (
    <SiteLayout scene="home">
      <section className="hero container service-hero">
        <div className="hero-text text-center max-w-3xl mx-auto">
          <nav className="crumbs justify-center" aria-label="Breadcrumb">
            <Link href="/">Ana səhifə</Link> / <span>Haqqımızda</span>
          </nav>
          <span className="chip">✨ Peşəkarlıq & Keyfiyyət</span>
          <h1>Cleaning Express Service Haqqında</h1>
          <p className="lead">
            Biz yalnız təmizlik etmirik, məkanınıza sağlamlıq, təravət və rahatlıq gətiririk.
          </p>
        </div>
      </section>

      <section className="section container max-w-4xl mx-auto space-y-8">
        <div className="glass p-8 rounded-2xl border border-white/10 space-y-4">
          <h2 className="text-2xl font-bold text-blue-300">Missiyamız</h2>
          <p className="text-white/80 leading-relaxed text-base">
            Məqsədimiz müştərilərimizi ən yüksək səviyyəli təmizlik xidməti ilə təmin edərək, onların dəyərli vaxtına qənaət etmək və həyat keyfiyyətini artırmaqdır. Hər bir layihəyə fərdi və xüsusi diqqət yetiririk. İstifadə etdiyimiz bütün vasitələr insan və ev heyvanlarının sağlamlığı üçün ekoloji cəhətdən tamamilə təhlükəsizdir.
          </p>
        </div>

        <div className="glass p-8 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold text-blue-300 mb-6">Niyə məhz Cleaning Express?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl p-3 bg-white/10 rounded-xl">👥</span>
              <div>
                <h3 className="text-lg font-semibold text-white">Peşəkar və Təcrübəli Heyət</h3>
                <p className="text-sm text-white/70 mt-1">İşini bilən, xüsusi təlim keçmiş və etibarlı təmizlik mütəxəssisləri.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-3xl p-3 bg-white/10 rounded-xl">🌿</span>
              <div>
                <h3 className="text-lg font-semibold text-white">Avropa Standartları</h3>
                <p className="text-sm text-white/70 mt-1">Sertifikatlaşdırılmış, hipoallergen və qoxusuz təmizlik vasitələri.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-3xl p-3 bg-white/10 rounded-xl">🛡️</span>
              <div>
                <h3 className="text-lg font-semibold text-white">100% Zəmanət</h3>
                <p className="text-sm text-white/70 mt-1">Görülən hər bir işə tam cavabdehlik və razılıq zəmanəti veririk.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-3xl p-3 bg-white/10 rounded-xl">⚡</span>
              <div>
                <h3 className="text-lg font-semibold text-white">Operativlik və Dəqiqlik</h3>
                <p className="text-sm text-white/70 mt-1">Vaxtında ünvanda olmaq və işi ən qısa müddətdə yüksək keyfiyyətlə təhvil vermək.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-8 rounded-2xl border border-white/10 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Təmizliyə ehtiyacınız var?</h2>
          <p className="text-white/70 mb-6 max-w-xl mx-auto">
            İstər gündəlik ev təmizliyi, istərsə də dərin təmir sonrası təmizlik olsun — peşəkar komandamız bir zənginizlə xidmətinizdədir.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/xidmetler" className="btn btn-primary">
              Xidmətlərə bax
            </Link>
            <Link href="/#kalkulyator" className="btn btn-wa">
              Qiyməti hesabla
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
