import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: '.env.local' });

const uri = 'mongodb+srv://eddiemorraa1_db_user:PRDeuB1PXkCZlifp@cluster0.efk3rqp.mongodb.net/hmz-solutions?retryWrites=true&w=majority';

const posts = [
    {
        title: "Nevşehir'de İşletmenizi Dijital Zirveye Taşıyın: Profesyonel Web Tasarım Rehberi",
        slug: "nevsehir-profesyonel-web-tasarim-rehberi",
        excerpt: "Nevşehir ve Kapadokya bölgesindeki işletmeler için dijital dünyada fark yaratmanın yolları. Web tasarımından SEO'ya, kurumsal kimliğinizi nasıl güçlendirebilirsiniz?",
        content: `
# Nevşehir'de İşletmenizi Dijital Zirveye Taşıyın: Profesyonel Web Tasarım Rehberi

Nevşehir ve Kapadokya bölgesi, hem turizm hem de yerel ticaret açısından Türkiye'nin en dinamik bölgelerinden biridir. Ancak günümüzde sadece "var olmak" yetmiyor; dijital dünyada "fark edilmek" gerekiyor. Bir işletme sahibi olarak, web siteniz sizin 7/24 açık olan dijital mağazanızdır.

## Neden Profesyonel Web Tasarım?

Birçok işletme sahibi "hazır şablonlar" veya "ücretsiz araçlar" ile yola çıkmaya çalışıyor. Ancak **Nevşehir web tasarım** pazarında rekabet her geçen gün artıyor. Profesyonel bir tasarımın size kazandıracakları:

1. **Hız ve Performans:** Google, hızlı açılan siteleri sever. Özellikle mobil kullanıcıların arttığı günümüzde, sitenizin saniyeler içinde yüklenmesi kritiktir.
2. **Kullanıcı Deneyimi (UX):** Ziyaretçiler aradıklarını kolayca bulabilmeli. Karmaşık olmayan, modern ve şık bir arayüz güven verir.
3. **Mobil Uyumluluk (Responsive):** Kapadokya'yı gezen turistler telefonlarından arama yapıyor. Sitenizin her ekranda kusursuz görünmesi şart.

## Lokal SEO'nun Gücü

Nevşehir'de bir hizmet sunuyorsanız, Google aramalarında ilk sayfada çıkmanız gerekir. "Nevşehir yazılım" veya "Nevşehir web sitesi" aramalarında üst sıralarda yer almak için:

- Bölgesel anahtar kelimeleri stratejik kullanın.
- Google İşletme profilinizi web sitenizle entegre edin.
- Yerel içerikler üreterek otoritenizi artırın.

HMZ Solutions olarak biz, sadece kod yazmıyoruz; işletmenizin dijital kimliğini bir sanat eseri titizliğiyle inşa ediyoruz. Siz de Nevşehir'in dijital dönüşümünde yerinizi almak için bizimle iletişime geçebilirsiniz.
        `,
        featuredImage: "/blog_web_tasarim_nevsehir_1767823929531.png",
        tags: ["Web Tasarım", "Nevşehir", "Dijital Pazarlama", "SEO"],
        published: true,
        seoTitle: "Nevşehir Web Tasarım ve SEO Rehberi | HMZ Solutions",
        seoDescription: "Nevşehir'de profesyonel web tasarım ve SEO hizmetleri ile işletmenizi büyütün. Kapadokya bölgesine özel dijital çözümler için hemen tıklayın.",
        author: "admin@hmzsolutions.com",
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0
    },
    {
        title: "Nevşehir Yazılım Şirketleri Arasında Neden Yerel Çözüm Ortağı Seçmelisiniz?",
        slug: "nevsehir-yazilim-sirketleri-yerel-cozum-ortagi",
        excerpt: "Yerel bir yazılım ortağıyla çalışmanın avantajları nelerdir? Nevşehir'deki işletmeler için hızlı destek, yüz yüze iletişim ve bölgesel pazar hakimiyeti neden önemlidir?",
        content: `
# Nevşehir Yazılım Şirketleri Arasında Neden Yerel Çözüm Ortağı Seçmelisiniz?

Yazılım dünyası küresel olsa da, iş birliği yerel olduğunda başarı çok daha yakındır. Nevşehir gibi butik hizmetin ve güvenin ön planda olduğu bir şehirde, bir yazılım projesine başlarken "uzak" çözüm ortakları yerine yanınızdaki uzmanları tercih etmenin birçok avantajı vardır.

## 1. Hızlı Destek ve Yüz Yüze İletişim

Dijital projelerde bazen bir telefon yetmez. Ofisimize gelip çayımızı içerken projenizin detaylarını tartışabilmek, sorun yaşadığınızda anında müdahale edebilecek bir ekibe sahip olmak paha biçilemezdir. **Nevşehir yazılım şirketleri** arasında HMZ Solutions olarak biz, müşterilerimizle "ortaklık" seviyesinde bir bağ kuruyoruz.

## 2. Bölgesel Pazar Hakimiyeti

Kapadokya bölgesinin turizm dinamiklerini, Nevşehir esnafının beklentilerini ve yerel halkın kullanıcı alışkanlıklarını biliyoruz. Bu sayede ürettiğimiz yazılımlar sadece teknik olarak kusursuz değil, aynı zamanda pazarla uyumlu oluyor.

## 3. Maliyet ve Zaman Tasarrufu

Ulaşım, zaman farkı veya iletişim kopuklukları nedeniyle projenin uzaması maliyetleri artırır. Yerel bir ekip, süreçleri çok daha verimli yönetir.

### Neler Sunuyoruz?
- Özel ERP ve CRM yazılımları
- Mobil uygulama geliştirme
- Otomasyon sistemleri
- Teknik danışmanlık

Üretkenliğinizi artırmak ve işletmenizi geleceğe hazırlamak için Nevşehir'deki yerel gücünüz olmaya hazırız.
        `,
        featuredImage: "/blog_yazilim_sirketi_nevsehir_1767823949118.png",
        tags: ["Yazılım", "Nevşehir Girişim", "Yerel Destek"],
        published: true,
        seoTitle: "Nevşehir Yazılım Çözüm Ortağı | Özel Yazılım Hizmetleri",
        seoDescription: "Nevşehir'deki işletmeniz için özel yazılım ve otomasyon çözümleri. Neden yerel bir yazılım şirketiyle çalışmalısınız? Avantajları keşfedin.",
        author: "admin@hmzsolutions.com",
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0
    },
    {
        title: "2026'da Nevşehir'de SEO ve Dijital Pazarlama: Google'da Nasıl Üst Sıralara Çıkılır?",
        slug: "nevsehir-seo-dijital-pazarlama-rehberi-2026",
        excerpt: "Arama motoru optimizasyonu (SEO) ile Nevşehir'deki müşterilerinize doğrudan ulaşın. Yerel SEO stratejileri ve 2026 dijital pazarlama trendleri.",
        content: `
# 2026'da SEO ve Dijital Pazarlama: Nevşehir İçin Yeni Kurallar

Arama motorları her geçen gün daha akıllı hale geliyor. Eskiden sadece anahtar kelime doldurmak (keyword stuffing) yeterliyken, şimdi kullanıcı niyeti ve içerik kalitesi her şeyin önünde. Peki, **Nevşehir SEO** çalışmalarında 2026'da nelere dikkat etmeliyiz?

## AI Destekli Arama Dönemi

Google artık sorulara yapay zeka ile yanıt veriyor (SGE). Bu da demek oluyor ki, içeriğiniz sadece bilgi vermemeli, aynı zamanda bir problemleri çözmeli. Nevşehir'deki işletmeler için "nasıl yapılır" veya "nerede bulunur" odaklı içerikler üretmek SEO başarısının anahtarıdır.

## Yerel Otorite ve Güven

Google, yerel aramaları (Local Pack) daha fazla önemsiyor. "Nevşehir'de web tasarım yapan yerler" diye aratıldığında haritalarda ve arama sonuçlarında en üstte yer almak için:
- Düzenli blog içerikleri paylaşın.
- Site içi teknik SEO'nuzu optimize edin.
- Güçlü ve yerel backlinkler edinin.

## Video ve Görsel SEO

Sosyal medya ile web siteniz arasındaki bağ hiç olmadığı kadar güçlü. Kapadokya'nın büyüleyici görsellerini SEO uyumlu etiketlerle web sitenizde kullanmak, Google Görsel aramalarından ciddi trafik çekmenizi sağlar.

**Uzmanın Notu:** SEO bir sprint değil, bir maratondur. Doğru stratejiyle atılan her adım, işletmenizin geleceğine yapılan en sağlam yatırımdır. HMZ Solutions olarak bu süreçte rehberiniz olmaya adayız.
        `,
        featuredImage: "/blog_seo_nevsehir_2026_1767823968006.png",
        tags: ["SEO", "Google", "Pazarlama", "2026 Trendleri"],
        published: true,
        seoTitle: "2026 Nevşehir SEO ve Dijital Pazarlama Stratejileri",
        seoDescription: "Google'da üst sıralara çıkmak için Nevşehir'e özel SEO ipuçları. 2026 dijital pazarlama trendleri ve yerel SEO başarısı için yapılması gerekenler.",
        author: "admin@hmzsolutions.com",
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0
    }
];

async function seed() {
    console.log('Connecting to:', uri);
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db('hmz-solutions');
        const collection = db.collection('blog_posts');

        // Mevcut slugları kontrol et ve sadece olmayanları ekle
        for (const post of posts) {
            const exists = await collection.findOne({ slug: post.slug });
            if (!exists) {
                await collection.insertOne(post);
                console.log(`Added: ${post.title}`);
            } else {
                console.log(`Skipped (already exists): ${post.title}`);
            }
        }

        console.log('Seeding completed successfully!');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await client.close();
    }
}

seed();
