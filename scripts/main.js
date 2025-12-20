// scripts/main.js

const rezervasyonButonu = document.getElementById('rezervasyonu'); // ID düzeltildi
const anaIcerikAlani = document.querySelector('main');
let anaSayfaHTML = anaIcerikAlani.innerHTML;

// ----------------------------
// Header yüksekliğini ölç -> main padding-top düzelsin
// ----------------------------
function setHeaderHeightVar(){
  const header = document.getElementById('navbar');
  if(!header) return;
  const h = header.offsetHeight;
  document.documentElement.style.setProperty('--header-h', `${h}px`);
}
window.addEventListener('load', setHeaderHeightVar);
window.addEventListener('resize', setHeaderHeightVar);

// ----------------------------
// Basit slider (ana sayfa için)
// ----------------------------
let sliderTimer = null;

function initSlider(){
  // Önce varsa eski timer'ı kapat
  if (sliderTimer) {
    clearInterval(sliderTimer);
    sliderTimer = null;
  }

  const slides = document.querySelectorAll('#hero .slide');
  if (!slides || slides.length === 0) return;

  let index = 0;
  slides.forEach((s, i) => s.classList.toggle('active', i === 0));

  sliderTimer = setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 4500);
}

// İlk açılışta slider başlat
initSlider();

// ----------------------------
// Rezervasyon ekranı HTML (template)
// ----------------------------
function rezervasyonSayfasiHTML(){
  // Bugünden önce seçilmesin diye min tarih
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const minDate = `${yyyy}-${mm}-${dd}`;

  // max tarih özelliği eklendi
  const maxYear = yyyy + 1; 
  const maxDate = `${maxYear}-${mm}-${dd}`; 

  return `
  <section class="rezervasyon-page">
    <div class="container">
      <div class="rez-card">
        <div class="rez-header">
          <h1>Online Rezervasyon</h1>
          <button id="anaSayfaButonu" class="btn-geri" type="button">
            <i class="fa-solid fa-arrow-left"></i> Ana Sayfaya Dön
          </button>
        </div>

        <div class="rez-body">
          <div class="rez-info">
            <h3>Bilgilendirme</h3>
            <ul>
              <li>Rezervasyon talebiniz alındığında ekranda onay mesajı göreceksiniz.</li>
              <li>Lütfen bilgilerinizi doğru giriniz. (TC: 11 haneli)</li>
              <li>Yoğunluk durumunda telefonla dönüş yapılabilir.</li>
            </ul>
          </div>

          <form id="rezervasyonFormu" class="rez-form">
  <div class="form-row">
    <div>
      <label for="name">Ad Soyad</label>
      <input id="name" name="name" type="text" placeholder="Örn: Esma Vural" required />
    </div>

    <div>
      <label for="tel">Telefon Numarası</label>
      <input id="tel" name="tel" type="tel" placeholder="Örn: 05xx xxx xx xx" required />
    </div>
  </div>

  <div class="form-row">
    <div>
      <label for="tc">TC Kimlik No</label>
      <input id="tc" name="tc" type="text" maxlength="11" pattern="\\d{11}" placeholder="11 haneli" required />
    </div>

    <div>
      <label for="per">Kişi Sayısı</label>
      <input id="per" name="per" type="number" min="1" max="20" placeholder="Örn: 4" required />
    </div>
  </div>

  <div class="form-row">
    <div>
      <label for="date">Tarih</label>
      <input id="date" name="date" type="date" min="${minDate}" max="${maxDate}" required />
    </div>

    <div>
      <label for="cause">Rezervasyon Amacı</label>
      <input id="cause" name="cause" type="text" placeholder="Örn: Doğum günü, iş yemeği..." required />
    </div>
  </div>

  <label for="note">Ek Not</label>
  <textarea id="note" name="note" rows="4" placeholder="Pencere kenarı..."></textarea>

  <div class="rez-actions">
    <button class="rez-submit" type="submit">Rezervasyonu Gönder</button>
    <span id="rezervasyonDurum" class="rez-status"></span>
  </div>
</form>

        </div>
      </div>
    </div>
  </section>
  `;
}

// ----------------------------
// Navigasyon (SPA gibi ekran değişimi)
// ----------------------------
function yukleRezervasyonSayfasi(pushToHistory = true) {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant" // ani geçiş
  });

  if (pushToHistory) {
    history.pushState({ page: 'rezervasyon' }, 'Rezervasyon', '#rezervasyon');
  }

  // Ana içerik değişince slider timer'ını durdur (home yok çünkü)
  if (sliderTimer) {
    clearInterval(sliderTimer);
    sliderTimer = null;
  }

  anaIcerikAlani.innerHTML = rezervasyonSayfasiHTML();
  setupRezervasyonListeners();
  setHeaderHeightVar();
  
  // Rezervasyon arka planını, o anki aktif slide'dan alıp, CSS değişkeni olarak ayarla.
  const activeSlide = document.querySelector('#hero .slide.active');
  const rezPage = document.querySelector('.rezervasyon-page');
  if (activeSlide && rezPage) {
    const bgImage = activeSlide.style.backgroundImage;
    // main.css dosyasındaki --bg-img değişkenini dinamik olarak ayarla
    document.documentElement.style.setProperty('--bg-img', bgImage); 
  }
}

function geriDonAnaSayfa(pushToHistory = true) {
  if (pushToHistory) {
    history.pushState({ page: 'home' }, 'Ana Sayfa', '#');
  }
  anaIcerikAlani.innerHTML = anaSayfaHTML;
  initSlider();
  setHeaderHeightVar();
}

function setupRezervasyonListeners(){
  const anaSayfaButton = document.getElementById('anaSayfaButonu');
  const form = document.getElementById('rezervasyonFormu');

  if (anaSayfaButton) {
    anaSayfaButton.addEventListener('click', () => {
      history.back();
    });
  }

  if (form) {
    form.addEventListener('submit', handleRezervasyonSubmit);
  }
}

// Buton tıklaması
if (rezervasyonButonu) {
  rezervasyonButonu.addEventListener('click', function (e) {
    e.preventDefault();
    yukleRezervasyonSayfasi(true);
  });
}

// Geri/ileri
window.addEventListener('popstate', function () {
  // Hash üzerinden yönetiyoruz
  if (window.location.hash === '#rezervasyon') {
    yukleRezervasyonSayfasi(false);
  } else {
    geriDonAnaSayfa(false);
  }
});

// Direkt URL hash ile açılırsa
if (window.location.hash === '#rezervasyon') {
  yukleRezervasyonSayfasi(false);
}

// ----------------------------
// Form submit (API çağrısı dahil)
// ----------------------------
async function handleRezervasyonSubmit(e){
  e.preventDefault();
  const form = e.target;
  const durum = document.getElementById('rezervasyonDurum');
  const submitBtn = form.querySelector('.rez-submit');

  // Basit TC kontrolü (11 hane)
  const tcInput = form.querySelector('#tc');
  if (!/^\d{11}$/.test(tcInput.value.trim())) {
    durum.style.color = 'crimson';
    durum.textContent = 'TC Kimlik No 11 haneli olmalı.';
    return;
  }
  
  // Form verilerini topla
  const name = document.getElementById('name').value;
  const tel = document.getElementById('tel').value;
  const per = document.getElementById('per').value;
  const date = document.getElementById('date').value;
  const cause = document.getElementById('cause').value;
  const note = document.getElementById('note').value;
  
  // "Profesyonel" his için küçük loading
  submitBtn.disabled = true;
  submitBtn.textContent = "Gönderiliyor...";
  durum.style.color = '#1f4bff';
  durum.textContent = 'Rezervasyon kaydediliyor...';

  try {
    // API'ye POST çağrısı
    const response = await fetch('http://localhost:3000/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name, tel: tel, per: per, date: date, cause: cause, note: note
      })
    });

    if (response.ok) {
      durum.style.color = 'green';
      durum.textContent = 'Rezervasyon talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.';
      form.reset();
    } else {
      const errorText = await response.text();
      durum.style.color = 'crimson';
      durum.textContent = `Hata oluştu: ${errorText}`;
    }
  } catch (error) {
    console.error('API İletişim Hatası:', error);
    durum.style.color = 'crimson';
    durum.textContent = 'Sunucuya bağlanılamadı. Lütfen Node.js sunucusunun (sql.js) çalıştığından emin olun.';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Rezervasyonu Gönder";
  }
}