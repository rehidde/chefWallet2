// ==========================
// sepet.js — chefWallet
// ==========================

// --- TEMEL LOCAL STORAGE İŞLEMLERİ ---
function sepetiGetir() {
    let sepet = [];
    try {
        sepet = JSON.parse(localStorage.getItem("sepet")) || [];
    } catch (e) {
        console.warn("Sepet verisi bozuk, sıfırlanıyor.", e);
        localStorage.removeItem("sepet");
        sepet = [];
    }

    // Hatalı adet veya fiyat değerlerini düzelt
    return sepet.map(u => ({
        ...u,
        adet: isNaN(parseFloat(u.adet)) ? 0 : parseFloat(u.adet),
        fiyat: isNaN(parseFloat(u.fiyat)) ? 0 : parseFloat(u.fiyat)
    }));
}

function sepetiKaydet(sepet) {
    localStorage.setItem("sepet", JSON.stringify(sepet));
    guncelSepetSayaciniYenile();
}

// --- SEPET SAYACI ---
function guncelSepetSayaciniYenile() {
    const sepet = sepetiGetir();
    const toplamUrunAdedi = sepet.reduce((acc, u) => acc + (u.adet || 0), 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) cartCountElement.textContent = toplamUrunAdedi.toString();
}

// --- MİKTAR İŞLEMLERİ ---
function miktariGuncelle(index, yeniAdet) {
    let sepet = sepetiGetir();
    sepet[parseInt(index)].adet = parseFloat(yeniAdet);
    sepetiKaydet(sepet);
    sepetiYazdir();
}

function adetAzalt(index) {
    let sepet = sepetiGetir();
    const urunIndex = parseInt(index);
    if (sepet[urunIndex].adet > 1) {
        miktariGuncelle(urunIndex, sepet[urunIndex].adet - 1);
    } else {
        urunSil(urunIndex);
    }
}

function adetArttir(index) {
    let sepet = sepetiGetir();
    miktariGuncelle(parseInt(index), sepet[parseInt(index)].adet + 1);
}

function urunSil(index) {
    let sepet = sepetiGetir();
    sepet.splice(parseInt(index), 1);
    sepetiKaydet(sepet);
    sepetiYazdir();
}

function sepetiTemizle() {
    if (confirm("Sepetinizdeki tüm ürünleri silmek istediğinize emin misiniz?")) {
        sepetiKaydet([]);
        sepetiYazdir();
    }
}

// --- BUNDLE (TARİF) İŞLEMLERİ ---
function bundleSil(tarifAdi) {
    if (!confirm(`**${tarifAdi}** tarifine ait tüm malzemeleri sepetten silmek istediğinize emin misiniz?`)) return;
    let sepet = sepetiGetir();
    sepet = sepet.filter(urun => urun.sourceRecipe !== tarifAdi);
    sepetiKaydet(sepet);
    sepetiYazdir();
}

function bundlePorsiyonGuncelle(tarifAdi, yeniPorsiyonCarpan) {
    let sepet = sepetiGetir();
    if (yeniPorsiyonCarpan < 1) { bundleSil(tarifAdi); return; }
    sepet = sepet.map(urun => {
        if (urun.sourceRecipe === tarifAdi) {
            urun.porsiyonCarpan = yeniPorsiyonCarpan;
            if (urun.ilkAdet) urun.adet = urun.ilkAdet * yeniPorsiyonCarpan;
        }
        return urun;
    });
    sepetiKaydet(sepet);
    sepetiYazdir();
}

function bundlePorsiyonAzalt(tarifAdi) {
    const grup = sepetiGetir().find(u => u.sourceRecipe === tarifAdi);
    if (grup) {
        const mevcutPorsiyon = grup.porsiyonCarpan || 1;
        if (mevcutPorsiyon > 1) bundlePorsiyonGuncelle(tarifAdi, mevcutPorsiyon - 1);
        else bundleSil(tarifAdi);
    }
}

function bundlePorsiyonArttir(tarifAdi) {
    const grup = sepetiGetir().find(u => u.sourceRecipe === tarifAdi);
    if (grup) {
        const mevcutPorsiyon = grup.porsiyonCarpan || 1;
        bundlePorsiyonGuncelle(tarifAdi, mevcutPorsiyon + 1);
    }
}

// --- ÖZET VE FİYAT HESAPLAMA ---
function ozetiGuncelle(toplamTutar, indirimUcreti = 0) {
    const kargoUcreti = (toplamTutar >= 150 || toplamTutar === 0) ? 0 : 15;
    const genelToplam = toplamTutar + kargoUcreti - indirimUcreti;
    // ... (HTML elementlerini güncelleyen eski kodlarınız burada kalacak) ...
  const elUrun = document.getElementById("urunToplam");
    const elKargo = document.getElementById("kargoUcret");
    const elIndirim = document.getElementById("indirimMiktar");
    const elGenel = document.getElementById("genelToplam");

    // ✨ BURASI YENİ EKLEMENİZ GEREKEN SATIR:
    if(elUrun) elUrun.textContent = "₺" + toplamTutar.toFixed(2);
    if(elKargo) elKargo.textContent = kargoUcreti === 0 ? "Ücretsiz" : "₺" + kargoUcreti.toFixed(2);
    if(elIndirim) elIndirim.textContent = "₺" + indirimUcreti.toFixed(2);
    if(elGenel) elGenel.textContent = "₺" + genelToplam.toFixed(2);

    // Nihai tutarı (genelToplam) 'odemeToplamTutar' anahtarına kaydediyoruz.
    localStorage.setItem("odemeToplamTutar", genelToplam.toFixed(2));
}

// --- MİNİ SEPET ---
function miniSepetDoldur() {
    const sepet = sepetiGetir();
    const itemsContainer = document.getElementById("miniCartItems");
    let total = 0;
    itemsContainer.innerHTML = "";

    const cartBtn = document.getElementById("cartBtn");
if (window.location.pathname !== "/sepet") {
    document.getElementById("cartBtn")?.addEventListener("click", e => {
        e.preventDefault();
        miniSepetGoster();
    });
}

    if (sepet.length === 0) {
        itemsContainer.innerHTML = "<div class='bilgi-kutusu'>Sepetiniz boş.</div>";
        document.getElementById("miniCartTotal").innerText = '₺0.00';
        return;
    }

    sepet.forEach(u => {
        const urunToplam = (u.fiyat || 0) * (u.adet || 0);
        total += urunToplam;
        itemsContainer.innerHTML += `
            <div class='cart-item'>
                <div class="item-info">
                    <span class="item-name">${u.ad}</span>
                    <span class="item-quantity"> x ${u.adet} ${u.birim || ''}</span>
                </div>
                <div class="item-price">₺${urunToplam.toFixed(2)}</div>
            </div>
        `;
    });

    document.getElementById("miniCartTotal").innerText = `₺${total.toFixed(2)}`;
}

function miniSepetGoster() {
    const mini = document.getElementById("miniCart");
    if (!mini) return;
    if (mini.style.display === "block") { mini.style.display = "none"; return; }
    miniSepetDoldur();
    mini.style.display = "block";
}

// --- SEPET YAZDIRMA (Ana sayfa / sepet sayfası) ---
function sepetiYazdir() {
    const sepetAlani = document.getElementById("sepetAlani");
    if (!sepetAlani) {
        console.log("Hata: sepetAlani ID'si bulunamadı!");
        return;
    }

    const sepet = sepetiGetir();
    
    // تنظيف المحتوى القديم مع الحفاظ على العنوان
    sepetAlani.innerHTML = `
        <h1><i class="fas fa-shopping-cart"></i> Sepetim</h1>
        <p>₺150 üzeri ücretsiz kargo</p>
    `;

    if (sepet.length === 0) {
        sepetAlani.innerHTML += `
            <div style="padding:40px; text-align:center;">
                <p>Sepetiniz boş.</p>
                <a href="/market">Market'e Git</a>
            </div>`;
        ozetiGuncelle(0);
        return;
    }

    let toplamTutar = 0;
    sepet.forEach((urun, index) => {
        const urunToplam = (urun.fiyat || 0) * (urun.adet || 0);
        toplamTutar += urunToplam;

        const kart = document.createElement("div");
        kart.className = "product-card";
        kart.innerHTML = `
            <div class="product-info">
                <h5 class="product-name">${urun.ad}</h5>
                <p class="product-quantity">x ${urun.adet} ${urun.birim || ''}</p>
            </div>
            <div class="product-price">₺${urunToplam.toFixed(2)}</div>
            <div class="quantity-controls">
                <button onclick="adetAzalt(${index})">-</button>
                <span>${urun.adet}</span>
                <button onclick="adetArttir(${index})">+</button>
                <button onclick="urunSil(${index})">Sil</button>
            </div>`;
        sepetAlani.appendChild(kart);
    });

    ozetiGuncelle(toplamTutar);
}

// --- SAYFA YÜKLENDİĞİNDE ---
document.addEventListener('DOMContentLoaded', () => {
    // Eski hatalı verileri temizle ve sepeti güvenli şekilde başlat
    const eskiSepet = sepetiGetir();
    const temizSepet = eskiSepet.map(u => ({
        ...u,
        adet: parseFloat(u.adet) || 0,
        fiyat: parseFloat(u.fiyat) || 0
    }));
    sepetiKaydet(temizSepet);

    sepetiYazdir();
    guncelSepetSayaciniYenile();
});

// --- ÖDEME SAYFASI ---
function odemeSayfasi() {
    const sepet = sepetiGetir();
    if (sepet.length === 0) {
        alert("Sepetiniz boş olduğu için ödeme sayfasına gidemezsiniz!");
        return;
    }
    sepetiVeritabaniKaydet();
    window.location.href = "/odeme";
}
let uygulananIndirim = 0; // sayfanın üstünde tanımla

function kuponUygula() {
    let kod = document.getElementById("kuponGiris").value.toUpperCase();
    let mesaj = document.getElementById("kuponMesaj");
    
    // Sepeti al
    let sepet = sepetiGetir();
    let urunToplam = sepet.reduce((t, u) => t + u.adet * u.fiyat, 0); 

    // Önce indirimi sıfırla
    uygulananIndirim = 0; 
    mesaj.style.color = 'red';
    
    if (kod === "CHEFWALLET100") {
        if (urunToplam >= 100) { 
            uygulananIndirim = 100; 
            mesaj.textContent = "Kupon başarıyla uygulandı! (₺100 İndirim)";
            mesaj.style.color = 'green';
        } else {
            mesaj.textContent = "Bu kupon için sepet tutarı ₺100 ve üzeri olmalıdır.";
        }
    } else { 
        mesaj.textContent = "Geçersiz kupon kodu."; 
    }

    // Sepet özeti güncelle
    ozetiGuncelle(urunToplam, uygulananIndirim);
}
function sepetiVeritabaniKaydet() {
    const sepet = sepetiGetir();
    const user_id = window.USER_ID; // نستخدم المتغير المعرف في الـ HTML

    if (!user_id) return; // إذا لم يكن هناك مستخدم لا تفعل شيئاً

    fetch("/api/sepet/kaydet", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ sepet, user_id })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) console.log("Sepet kaydedildi!");
    })
    .catch(err => console.error("Hata:", err));
}

