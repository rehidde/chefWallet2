
function sepeteEkle(id) {
  fetch("/api/sepet/ekle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ urun_id: id })
  })
  .then(res => {
    if (!res.ok) {
      throw new Error("HTTP Hatası: " + res.status);
    }
    return res.json();
  })
  .then(data => {
    if (data.error) {
      alert(data.error);
    } else {
      alert("Ürün sepete eklendi");
      
    }
  })
  .catch(err => {
    console.error("Sepete ekleme hatası:", err);
    alert("Sepete eklerken hata oluştu");
  });
}





document.addEventListener("DOMContentLoaded", () => {
  const catEl = document.getElementById("categories");
  if(!catEl) return;

  fetch("/api/kategoriler")
    .then(r => r.json())
    .then(kategoriler => {
      kategoriler.forEach(k => {
        let d = document.createElement("div");
        d.className = "cat-pill";
        d.innerText = k.ad;
        d.style.cursor = "pointer";
        d.onclick = () => urunleriGoster(k.key_name, k.ad);
        catEl.appendChild(d);
      });
    })
    .catch(err => {
      console.error("Kategori çekme hatası:", err);
      catEl.innerHTML = "<p>Kategori yüklenemedi</p>";
    });
});



function urunleriGoster(key, baslik){
  const productsArea = document.getElementById("productsArea");
  if(productsArea) productsArea.classList.remove("hidden");

  const title = document.getElementById("productsTitle");
  if(title) title.innerText = baslik;

  const grid = document.getElementById("productsGrid");
  if(!grid) return;

  grid.innerHTML = "";

  fetch(`/api/urunler/${key}`)
    .then(r => r.json())
    .then(urunler => {
      if(!Array.isArray(urunler) || urunler.length === 0) {
        grid.innerHTML = "<p>Bu kategoride ürün yok</p>";
        return;
      }

      urunler.forEach(u => {
  let card = document.createElement("div");
  card.className = "market-card";
  card.innerHTML = `
    <img src="${u.resim || '/images/default.jpg'}" class="thumb" alt="${u.ad}">
    <h5>${u.ad}</h5>
    <p class="desc">${u.aciklama || ""}</p>

    <div class="price-row">
      <div class="price">${u.fiyat} ₺</div>
      <button class="qty-btn" onclick="sepeteEkle(${u.id})">
        Sepete Ekle
      </button>
    </div>

    <div id="stok-${u.id}" style="margin-top:6px;font-weight:700;">
      Stok: ${u.stok}
    </div>

    <div id="bilgi-${u.id}" class="bilgi-kutusu hidden">
      Stok yok! Bu ürünü ekleyemezsiniz.
    </div>
  `;
  grid.appendChild(card);
});

    })
    .catch(err => {
      console.error("Ürün çekme hatası:", err);
      grid.innerHTML = "<p>Ürünler yüklenemedi</p>";
    });
}
