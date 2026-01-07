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
    default: "Nevşehir Yazılım Şirketi | Web Sitesi & Mobil Uygulama - HMZ Solutions",
    template: "%s | HMZ Solutions Nevşehir Yazılım"
  },
  description: "Nevşehir'in lider yazılım şirketi HMZ Solutions. Web sitesi tasarımı, mobil uygulama geliştirme, e-ticaret, kurumsal yazılım ve dijital pazarlama hizmetleri. Nevşehir, Kapadokya ve tüm Türkiye'ye profesyonel yazılım çözümleri. ☎️ Hemen arayın!",
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
  authors: [{ name: "HMZ Solutions Nevşehir" }],
  creator: "HMZ Solutions",
  publisher: "HMZ Solutions Nevşehir Yazılım Şirketi",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: 'https://hmzsolutions.com',
    languages: {
      'tr-TR': 'https://hmzsolutions.com',
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
    siteName: 'HMZ Solutions - Nevşehir Yazılım Şirketi',
    title: 'Nevşehir Yazılım Şirketi | Web Sitesi & Mobil Uygulama - HMZ Solutions',
    description: 'Nevşehir\'in lider yazılım şirketi. Web sitesi, mobil uygulama, e-ticaret ve kurumsal yazılım çözümleri. Kapadokya bölgesinin en profesyonel dijital ajansı. Hemen iletişime geçin!',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HMZ Solutions - Nevşehir Yazılım Şirketi | Web Sitesi ve Mobil Uygulama Geliştirme',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nevşehir Yazılım Şirketi | Web Sitesi & Mobil Uygulama - HMZ Solutions',
    description: 'Nevşehir\'in lider yazılım şirketi. Web sitesi, mobil uygulama, e-ticaret ve kurumsal yazılım çözümleri. Profesyonel dijital hizmetler.',
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
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#007aff" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

        {/* Structured Data - LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://hmzsolutions.com/#organization",
              "name": "HMZ Solutions",
              "alternateName": "HMZ Yazılım",
              "description": "Nevşehir'in lider yazılım şirketi. Web sitesi tasarımı, mobil uygulama geliştirme, e-ticaret ve kurumsal yazılım çözümleri.",
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
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Nevşehir"
                },
                {
                  "@type": "City",
                  "name": "Avanos"
                },
                {
                  "@type": "City",
                  "name": "Ürgüp"
                },
                {
                  "@type": "City",
                  "name": "Göreme"
                },
                {
                  "@type": "State",
                  "name": "Kapadokya"
                },
                {
                  "@type": "Country",
                  "name": "Türkiye"
                }
              ],
              "priceRange": "$$",
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
                "name": "Yazılım Hizmetleri",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Web Sitesi Tasarımı",
                      "description": "Profesyonel, modern ve SEO uyumlu web sitesi tasarımı"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Mobil Uygulama Geliştirme",
                      "description": "iOS ve Android mobil uygulama geliştirme hizmetleri"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "E-Ticaret Çözümleri",
                      "description": "Kapsamlı e-ticaret platformları ve online satış sistemleri"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Kurumsal Yazılım",
                      "description": "Özel kurumsal yazılım ve ERP çözümleri"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Dijital Pazarlama & SEO",
                      "description": "SEO, sosyal medya yönetimi ve dijital pazarlama hizmetleri"
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
              "legalName": "HMZ Solutions Yazılım Şirketi",
              "url": "https://hmzsolutions.com",
              "logo": "https://hmzsolutions.com/logo.png",
              "foundingDate": "2020",
              "founders": [
                {
                  "@type": "Person",
                  "name": "Hamza Koybasi"
                }
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nevşehir Merkez",
                "addressLocality": "Nevşehir",
                "addressRegion": "Nevşehir",
                "postalCode": "50000",
                "addressCountry": "TR"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+90-XXX-XXX-XXXX",
                "contactType": "customer service",
                "areaServed": "TR",
                "availableLanguage": ["Turkish", "English"]
              },
              "sameAs": [
                "https://www.linkedin.com/company/hmzsolutions",
                "https://twitter.com/hmzsolutions",
                "https://www.instagram.com/hmzsolutions"
              ]
            })
          }}
        />

        {/* Structured Data - WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "HMZ Solutions",
              "alternateName": "Nevşehir Yazılım Şirketi",
              "url": "https://hmzsolutions.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://hmzsolutions.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
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
                  "name": "Hakkımızda",
                  "item": "https://hmzsolutions.com/#about"
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
        {children}
      </body>
    </html>
  );
}