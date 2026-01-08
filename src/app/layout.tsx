import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { ChatbotProvider } from '@/context/ChatbotContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://hmzsolutions.com'),
  title: {
    default: "HMZ Solutions | Global Teknoloji ve Yazılım Şirketi - Nevşehir",
    template: "%s | HMZ Solutions Teknoloji"
  },
  description: "İşletmenizi geleceğe taşıyan profesyonel yazılım çözümleri. Web Tasarım, Mobil Uygulama, Yapay Zeka, Bulut Sistemleri ve E-Ticaret ile dijital dönüşümünüze liderlik ediyoruz. Hemen keşfedin!",
  keywords: [
    "nevşehir yazılım şirketi",
    "profesyonel web tasarım",
    "mobil uygulama geliştirme",
    "yapay zeka çözümleri",
    "bulut bilişim sistemleri",
    "e-ticaret altyapısı",
    "kurumsal seo danışmanlığı",
    "ui/ux tasarım ajansı",
    "özel yazılım geliştirme",
    "devops hizmetleri",
    "kapadokya dijital ajans",
    "türkiye yazılım ihracatı",
    "React Native",
    "Next.js Uzmanı",
    "Full Stack Development",
    "SaaS Geliştirme",
    "dijital pazarlama stratejileri"
  ],
  authors: [{ name: "HMZ Solutions Team" }],
  creator: "HMZ Solutions",
  publisher: "HMZ Solutions Technology Inc.",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: 'https://hmzsolutions.com',
    languages: {
      'tr-TR': 'https://hmzsolutions.com',
      'en-US': 'https://hmzsolutions.com/en',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
    siteName: 'HMZ Solutions - Global Teknoloji Ortağınız',
    title: 'HMZ Solutions | Geleceğin Teknolojilerini Bugünden Kullanın',
    description: 'Web, Mobil, AI ve Bulut çözümleriyle işinizi dijitalleştirin. Nevşehir merkezli global yazılım şirketi.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HMZ Solutions - Teknoloji ve Yazılım Çözümleri',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HMZ Solutions | Teknoloji ve İnovasyon',
    description: 'Yenilikçi yazılım çözümleri ile işinizi büyütün. Web, Mobil, AI ve daha fazlası.',
    images: ['/og-image.jpg'],
    creator: '@hmzsolutions',
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  other: {
    'geo.region': 'TR-50',
    'geo.placename': 'Nevşehir',
    'geo.position': '38.6244;34.7239',
    'ICBM': '38.6244, 34.7239',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#black" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Structured Data - LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://hmzsolutions.com/#organization",
              "name": "HMZ Solutions - Teknoloji ve Yazılım",
              "alternateName": "HMZ Solutions",
              "description": "Nevşehir merkezli global yazılım ve teknoloji şirketi. Web, mobil, yapay zeka ve bulut çözümleri sunuyoruz.",
              "url": "https://hmzsolutions.com",
              "logo": "https://hmzsolutions.com/logo.png",
              "image": "https://hmzsolutions.com/og-image.jpg",
              "telephone": "+90-505-095-9950",
              "email": "info@hmzsolutions.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nevşehir Merkez",
                "addressLocality": "Nevşehir",
                "addressRegion": "Nevşehir",
                "postalCode": "50000",
                "addressCountry": "TR"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "38.6244",
                "longitude": "34.7239"
              },
              "areaServed": ["Türkiye", "Global"],
              "priceRange": "$$$",
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ],
              "sameAs": [
                "https://www.linkedin.com/company/hmzsolutions",
                "https://twitter.com/hmzsolutions",
                "https://www.instagram.com/hmz_solutions"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Dijital Hizmetler",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Web Geliştirme",
                      "description": "Modern, hızlı ve SEO uyumlu web uygulamaları."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mobil Uygulama",
                      "description": "iOS ve Android için native ve cross-platform çözümler."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Yapay Zeka Çözümleri",
                      "description": "İş süreçleri için AI entegrasyonu ve veri analitiği."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "E-Ticaret Sistemleri",
                      "description": "Ölçeklenebilir, güvenli B2B ve B2C e-ticaret altyapıları."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "UI/UX Tasarım",
                      "description": "Kullanıcı odaklı arayüz ve deneyim tasarımı."
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Bulut & DevOps",
                      "description": "AWS, Azure ve Google Cloud üzerinde ölçeklenebilir mimariler."
                    }
                  }
                ]
              }
            })
          }}
        />

        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "HMZ Solutions",
              "legalName": "HMZ Solutions Teknoloji A.Ş.",
              "url": "https://hmzsolutions.com",
              "logo": "https://hmzsolutions.com/logo.png",
              "foundingDate": "2020",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Hamza Koybasi"
                }
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+90-505-095-9950",
                "contactType": "sales",
                "areaServed": ["TR", "US", "EU"],
                "availableLanguage": ["Turkish", "English"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/hmzsolutions",
                "https://twitter.com/hmzsolutions",
                "https://www.instagram.com/hmz_solutions"
              ]
            })
          }}
        />

        {/* Structured Data - BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Ana Sayfa",
                  "item": "https://hmzsolutions.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Hizmetler",
                  "item": "https://hmzsolutions.com/#services"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Blog",
                  "item": "https://hmzsolutions.com/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "İletişim",
                  "item": "https://hmzsolutions.com/#contact"
                }
              ]
            })
          }}
        />
      </head>
      <body className="antialiased">
        <ChatbotProvider>
          {children}
        </ChatbotProvider>
      </body>
    </html>
  );
}