import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://hmzsolutions.com'),
  title: {
    default: "HMZ Solutions | Nevşehir Yazılım Şirketi - Dijital Çözümler",
    template: "%s | HMZ Solutions Nevşehir"
  },
  description: "Nevşehir merkezli HMZ Solutions ile modern web teknolojileri, mobil uygulamalar ve özel yazılım çözümleri. Kapadokya bölgesinden tüm Türkiye'ye profesyonel dijital dönüşüm hizmetleri. React, Next.js, TypeScript uzmanları.",
  keywords: [
    "nevşehir yazılım şirketi",
    "kapadokya web tasarım",
    "nevşehir dijital çözümler",
    "avu015fanos yazılım",
    "göreme web sitesi",
    "üchisar mobil uygulama",
    "ortahisar e-ticaret",
    "mustafapaşa web tasarım",
    "ak tepe yazılım",
    "kayseri yazılım",
    "niğde web tasarım",
    "kırşehir dijital pazarlama",
    "yozgat e-ticaret",
    "ankara yazılım geliştirme",
    "türkiye yazılım şirketi",
    "web tasarım türkiye",
    "mobil uygulama geliştirme",
    "React",
    "Next.js",
    "TypeScript",
    "dijital dönüşüm",
    "e-ticaret",
    "kurumsal yazılım",
    "seo nevşehir",
    "dijital pazarlama kapadokya"
  ],
  authors: [{ name: "HMZ Solutions" }],
  creator: "HMZ Solutions",
  publisher: "HMZ Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://hmzsolutions.com',
    siteName: 'HMZ Solutions Nevşehir',
    title: 'HMZ Solutions | Nevşehir Yazılım Şirketi - Dijital Çözümler',
    description: 'Nevşehir merkezli modern web teknolojileri, mobil uygulamalar ve özel yazılım çözümleri. Kapadokya bölgesinden tüm Türkiye\'ye profesyonel dijital dönüşüm hizmetleri.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HMZ Solutions - Nevşehir Yazılım Geliştirme Şirketi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HMZ Solutions | Nevşehir Yazılım Şirketi - Dijital Çözümler',
    description: 'Nevşehir merkezli modern web teknolojileri, mobil uygulamalar ve özel yazılım çözümleri. Kapadokya bölgesinden tüm Türkiye\'ye profesyonel dijital dönüşüm hizmetleri.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#007aff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}