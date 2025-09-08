import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Teknoloji Blog | HMZ Solutions Nevşehir - Dijital İnovasyon Yazıları',
  description: 'Nevşehir merkezli HMZ Solutions teknoloji blogu. Web geliştirme, dijital dönüşüm, AI, yazılım trendleri ve Kapadokya bölgesinden teknoloji hikayeleri. Güncel teknoloji içerikleri.',
  keywords: [
    'nevşehir teknoloji blog',
    'kapadokya dijital dönüşüm',
    'nevşehir web geliştirme blog',
    'türkiye teknoloji yazıları',
    'yazılım geliştirme blog',
    'ai teknolojileri',
    'web tasarım trendleri',
    'dijital pazarlama',
    'e-ticaret çözümleri',
    'mobil uygulama geliştirme',
    'avanos yazılım',
    'göreme web tasarım',
    'üchisar dijital çözümler',
    'kayseri teknoloji',
    'niğde web geliştirme'
  ],
  openGraph: {
    title: 'Teknoloji Blog | HMZ Solutions Nevşehir',
    description: 'Nevşehir merkezli teknoloji blogu. Web geliştirme, dijital dönüşüm ve yazılım trendleri hakkında güncel içerikler.',
    type: 'website',
    locale: 'tr_TR',
    url: 'https://hmzsolutions.com/blog'
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}