import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://hmzsolutions.com'),
  title: {
    default: "HMZ Solutions | Yazılım Çözümleri ve Dijital Dönüşüm",
    template: "%s | HMZ Solutions"
  },
  description: "HMZ Solutions olarak modern web teknolojileri, mobil uygulamalar ve özel yazılım çözümleri ile işletmenizin dijital dönüşümünde güvenilir ortağınızız. React, Next.js, React Native ile profesyonel projeler.",
  keywords: [
    "yazılım geliştirme",
    "web tasarım",
    "mobil uygulama",
    "React",
    "Next.js",
    "TypeScript",
    "dijital dönüşüm",
    "e-ticaret",
    "kurumsal yazılım",
    "İstanbul yazılım şirketi"
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
    siteName: 'HMZ Solutions',
    title: 'HMZ Solutions | Yazılım Çözümleri ve Dijital Dönüşüm',
    description: 'Modern web teknolojileri, mobil uygulamalar ve özel yazılım çözümleri ile işletmenizin dijital dönüşümünde güvenilir ortağınızız.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HMZ Solutions - Yazılım Geliştirme Şirketi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HMZ Solutions | Yazılım Çözümleri ve Dijital Dönüşüm',
    description: 'Modern web teknolojileri, mobil uygulamalar ve özel yazılım çözümleri ile işletmenizin dijital dönüşümünde güvenilir ortağınızız.',
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#007aff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
