# 📧 EmailJS Setup - Müşteri Mesajlarını Email'e Alma

Bu rehber, contact form'dan gelen mesajları direkt email'inize almak için EmailJS kurulumunu anlatır.

## 🚀 1. EmailJS Hesabı Oluşturma

1. [EmailJS.com](https://www.emailjs.com/) adresine git
2. **Sign Up** butonuna tıkla
3. Email ve şifre ile hesap oluştur
4. Email doğrulaması yap

## ⚙️ 2. Email Servisini Bağlama

1. Dashboard'a gir
2. **Email Services** sekmesine git
3. **Add New Service** butonuna tıkla
4. **Gmail** veya kullandığın email sağlayıcısını seç
5. Hesabını bağla ve **Service ID**'yi kopyala

## 📝 3. Email Template Oluşturma

1. **Email Templates** sekmesine git
2. **Create New Template** butonuna tıkla
3. Şu template'i kullan:

```
Subject: 🚀 Yeni Proje Teklifi - {{from_name}}

Merhaba,

Sitenizden yeni bir proje teklifi geldi:

👤 İsim: {{from_name}}
📧 Email: {{from_email}}
🏢 Şirket: {{company}}

📋 Proje Detayları:
{{message}}

---
Bu mesaj HMZ Solutions contact formundan gönderilmiştir.
```

4. **Template ID**'yi kopyala

## 🔑 4. Public Key Alma

1. **Account** sekmesine git
2. **API Keys** bölümünden **Public Key**'i kopyala

## 🔧 5. Environment Variables Ayarlama

`.env.local` dosyasını aç ve şu bilgileri gir:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here  
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_TO_EMAIL=info@hmzsolutions.com
```

## ✅ 6. Test Etme

1. Sunucuyu yeniden başlat: `npm run dev`
2. Contact form'u doldur ve gönder
3. Email'ini kontrol et!

## 🎯 Diğer Çözümler

### Option 2: 📊 Google Sheets Integration
- Form verileri direkt Google Sheets'e kaydedilir
- Kolay analiz ve takip imkanı

### Option 3: 🗄️ Database + Admin Panel
- MongoDB/PostgreSQL veritabanı
- Admin paneli ile mesaj yönetimi
- Daha gelişmiş özellikler

### Option 4: 🔗 Webhook Integration
- Slack, Discord, Telegram'a bildirim
- Multiple channels'a mesaj gönderimi

## 📞 Destek

Kurulum sırasında sorun yaşarsan:
- EmailJS documentation'ı kontrol et
- Console'da hata mesajlarını incele
- Environment variables'ların doğru olduğundan emin ol

---

💡 **İpucu:** EmailJS free plan'da ayda 200 email limiti var. Bu küçük işler için yeterli!