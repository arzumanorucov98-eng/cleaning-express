import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import "./site.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL('https://cleaningexpress.az'),
  title: "Cleaning Express Service — Peşəkar təmizlik xidməti",
  description: "Ev, ofis, restoran, obyekt, təmir sonrası və yumşaq mebel təmizliyi. Onlayn kalkulyator ilə qiyməti dərhal öyrən, sifarişi WhatsApp ilə təsdiqlə.",
  icons: {
    icon: "/assets/images/logo_v3.png",
  },
  openGraph: {
    title: "Cleaning Express Service — Peşəkar təmizlik xidməti",
    description: "Ev, ofis, restoran, obyekt, təmir sonrası və yumşaq mebel təmizliyi. Onlayn kalkulyator ilə qiyməti dərhal öyrən, sifarişi WhatsApp ilə təsdiqlə.",
    images: ["/assets/images/og-banner.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="az"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
