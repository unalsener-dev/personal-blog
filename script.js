// Scroll spy (kaydırma izleme) - Navbar linklerini aktif yapar
// Tüm bölümleri ve hero'yu seç
const sections = Array.from(document.querySelectorAll('section[id], header#hero'));
// Tüm menü linklerini seç
const links    = Array.from(document.querySelectorAll('.menu a'));


// Scroll konumuna göre aktif linki belirleme fonksiyonu
function spy(){
  // Navbar yüksekliğini CSS değişkeninden al (veya varsayılan 64px)
  const NAV_H = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 64;
  // Hangi bölümün aktif sayılacağını belirleyen tetik çizgisi: scrollY + navbar + viewport'un %35'i
  const triggerY = window.scrollY + NAV_H + window.innerHeight * 0.35;

  // Varsayılan aktif bölüm 'hero'
  let current = 'hero';
  // Tüm bölümleri döngüye al
  for (const s of sections){
    // Bölümün üst ve alt sınırlarını hesapla
    const top = s.offsetTop;
    const bottom = top + s.offsetHeight;
    // Tetik çizgisi bu bölümün içindeyse, bu bölümü aktif yap ve döngüden çık
    if (triggerY >= top && triggerY < bottom){
      current = s.id || 'hero';
      break;
    }
  }
  // Tüm linklerde, hash'i aktif bölümün id'sine eşit olana 'active' sınıfını ekle/kaldır
  links.forEach(l => l.classList.toggle('active', l.hash === ('#' + current)));
}


// Intersection Observer - Elementler viewport'a girdiğinde animasyonu tetikler
// Gözlemciyi oluştur: Eşik %12, yani elementin %12'si görünür olduğunda tetikle
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    // Element görünür olduysa, 'show' sınıfını ekle ve gözlemi durdur
    if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
  });
},{threshold:.12});


// DOM içeriği yüklendiğinde çalışacak kod
document.addEventListener('DOMContentLoaded', () => {
  // Sayfa yüklendiğinde scroll spy'ı bir kere çalıştır
  spy();
  // Her scroll olduğunda scroll spy fonksiyonunu çalıştır
  window.addEventListener('scroll', spy);

  // '.reveal' sınıflı tüm elementleri Intersection Observer'a ekle
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // Footer'daki yıl bilgisini otomatik olarak güncel yıl ile doldur
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Alıntı (quote) metinlerindeki son kelimeden önceki boşluğu kaldırmaz boşluğa (&nbsp;) çevir (görsel iyileştirme)
  document.querySelectorAll('.quote').forEach(el=>{
    const txt = el.innerHTML.trim();
    el.innerHTML = txt.replace(/\s+([^\s]+)\s*$/, '&nbsp;$1');
  });
});