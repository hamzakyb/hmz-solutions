# MongoDB Kurulum Rehberi

## Option 1: MongoDB Atlas (Cloud) - ÖNERİLEN
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)'a git
2. Ücretsiz hesap oluştur
3. Cluster oluştur (M0 Sandbox - Free)
4. Database User oluştur
5. Network Access'te IP whitelist ekle (0.0.0.0/0 veya kendi IP'n)
6. Connection string'i al
7. .env.local'de MONGODB_URI'yi güncelle:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hmz-solutions
   ```

## Option 2: Yerel MongoDB
1. MongoDB Community Server'ı indir ve kur
2. MongoDB Compass'ı kur (GUI)
3. Servisi başlat:
   ```bash
   # macOS (Homebrew)
   brew services start mongodb-community
   
   # Windows
   net start MongoDB
   
   # Linux
   sudo systemctl start mongod
   ```

## Test Et
1. Sunucuyu başlat: `npm run dev`
2. Contact formunu test et
3. Admin paneline git: `http://localhost:3004/admin`
4. Login: admin@hmzsolutions.com / admin123

## Veritabanı Yapısı
```
hmz-solutions/
├── contact_messages
│   ├── _id (ObjectId)
│   ├── name (string)
│   ├── email (string)
│   ├── company (string)
│   ├── message (string)
│   ├── createdAt (Date)
│   ├── status (string: 'new'|'read'|'replied')
│   └── ip (string)
```

## Admin Panel Özellikleri
- ✅ Güvenli JWT authentication
- ✅ Real-time mesaj listesi
- ✅ Arama ve filtreleme
- ✅ Mesaj detayları modal
- ✅ Email yanıt linki
- ✅ Responsive design
- ✅ Status takibi

## API Endpoints
- POST /api/contact - Yeni mesaj gönder
- GET /api/contact - Mesajları listele (admin only)
- POST /api/admin/login - Admin girişi

## Güvenlik
- JWT token authentication
- Environment variables ile config
- Input validation
- Rate limiting (ileride eklenebilir)