# SeaTalya – Deniz Ürünleri Restoranı Web Sitesi

SeaTalya, deniz ürünleri temalı bir restoran için geliştirilen modern ve kullanıcı odaklı bir web sitesi projesidir. Proje, restoranın kurumsal tanıtımını yapmak, menü ve içerik sunmak, kullanıcıların rezervasyon talebi oluşturmasını sağlamak amacıyla hazırlanmıştır.

## Proje Amacı

Bu projenin amacı, bir restoranın dijital ortamda daha profesyonel şekilde temsil edilmesini sağlamak ve kullanıcıların rezervasyon işlemlerini kolaylaştırmaktır. Projede hem kullanıcı arayüzü tasarımı hem de backend-veri tabanı bağlantısı üzerine çalışılmıştır.

## Özellikler

- Modern ve kullanıcı dostu arayüz
- Ana sayfa, hakkımızda ve menü bölümleri
- Dinamik rezervasyon sayfası geçişi
- Rezervasyon formu
- Form verilerinin backend tarafına gönderilmesi
- Veri tabanına rezervasyon bilgilerinin kaydedilmesi
- Responsive tasarım mantığına uygun yapı
- Geliştirilebilir tam proje altyapısı

## Kullanılan Teknolojiler

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Veri Tabanı
- MySQL

## Veri Tabanı Kullanımı

Proje içerisinde kullanıcıların rezervasyon formu üzerinden girdiği bilgiler veri tabanına kaydedilmektedir. Bu sayede rezervasyon verileri kalıcı olarak saklanabilir ve daha sonra yönetilebilir hale gelir.

Kaydedilen örnek bilgiler:
- Ad Soyad
- Telefon Numarası
- T.C. Kimlik Numarası
- Kişi Sayısı
- Rezervasyon Tarihi
- Rezervasyon Amacı
- Ek Notlar

Bu yapı sayesinde proje yalnızca görsel bir restoran sitesi değil, aynı zamanda veri işleyebilen temel bir web uygulaması haline getirilmiştir.

## Proje Yapısı

- `index.html` → Ana sayfa yapısı
- `style.css` → Tasarım ve görünüm ayarları
- `main.js` → Sayfa geçişleri ve form işlemleri
- `server.js` / backend dosyaları → Form verilerinin alınması ve veri tabanı işlemleri
- MySQL tablo yapısı → Rezervasyon bilgilerinin saklanması

## Çalışma Mantığı

1. Kullanıcı web sitesine giriş yapar.
2. Rezervasyon bölümüne geçiş yapar.
3. Form alanlarını doldurur.
4. Form verileri backend tarafına gönderilir.
5. Backend, bu verileri MySQL veri tabanına kaydeder.
6. Böylece rezervasyon bilgileri saklanmış olur.

## Geliştirme Durumu

SeaTalya projesinin temel frontend yapısı tamamlanmıştır. Backend ve veri tabanı entegrasyonu kurulmuş olup proje geliştirilmeye açıktır. İlerleyen aşamalarda aşağıdaki özelliklerin eklenmesi planlanmaktadır:

- Yönetici paneli
- Rezervasyon listeleme ekranı
- Rezervasyon güncelleme ve silme işlemleri
- Kullanıcı doğrulama sistemi
- Daha gelişmiş mobil uyumluluk
- Gerçek zamanlı rezervasyon kontrolü

## Kazanımlar

Bu proje ile aşağıdaki alanlarda deneyim kazanılmıştır:

- Web arayüz geliştirme
- JavaScript ile dinamik sayfa yönetimi
- Node.js ve Express ile backend geliştirme
- MySQL veri tabanı bağlantısı
- Form verisi işleme ve kayıt mantığı
- Frontend ve backend entegrasyonu

## Not

Bu proje eğitim ve geliştirme amacıyla hazırlanmıştır. Gerçek bir restoran rezervasyon sistemi mantığına uygun şekilde tasarlanmış olup geliştirilmeye devam edilebilir.

## Geliştirici

Esma Vural  
Bilişim Sistemleri Mühendisliği Öğrencisi
