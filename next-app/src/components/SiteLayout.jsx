import Header from './Header';
import Footer from './Footer';
import SceneBackground from './SceneBackground';
import FloatingWhatsApp from './FloatingWhatsApp';

export default function SiteLayout({ children, scene }) {
  return (
    <>
      <SceneBackground forceScene={scene} />
      <Header />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
