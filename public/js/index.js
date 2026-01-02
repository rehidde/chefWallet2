document.addEventListener('DOMContentLoaded', function() {
   
    
    let mevcutPuan = 0;
    const yildizlar = document.querySelectorAll('.star');
    const puanYazi = document.querySelector('.rating-text');
    
    function yildizlariGuncelle(puan) {
        yildizlar.forEach(yildiz => {
            const yildizPuan = parseInt(yildiz.getAttribute('data-rating'));
            if (yildizPuan <= puan) {
                yildiz.classList.add('active');
                yildiz.style.color = 'var(--gold-accent)';
            } else {
                yildiz.classList.remove('active');
                yildiz.style.color = '#ddd';
            }
        });
    }
    
    function yildizlariVurgula(puan) {
        yildizlar.forEach(yildiz => {
            const yildizPuan = parseInt(yildiz.getAttribute('data-rating'));
            yildiz.style.color = (yildizPuan <= puan) ? 'var(--gold-accent)' : '#ddd';
        });
    }
    
    yildizlar.forEach(yildiz => {
        yildiz.addEventListener('click', function() {
            mevcutPuan = parseInt(this.dataset.rating);
            yildizlariGuncelle(mevcutPuan);
            if(puanYazi) puanYazi.textContent = `${mevcutPuan}/5`;
        });
        
        yildiz.addEventListener('mouseover', function() {
            yildizlariVurgula(parseInt(this.dataset.rating));
        });
        
        yildiz.addEventListener('mouseout', function() {
            yildizlariGuncelle(mevcutPuan);
        });
    });

   
    const yorumForm = document.getElementById('commentForm');
    if(yorumForm){
        yorumForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            
            
            if(mevcutPuan === 0){
                alert("Lütfen yıldızla puan verin!");
                return;
            }
            
            const yorumMetni = document.getElementById('commentText').value.trim();
            if(!yorumMetni){
                alert("Yorum boş olamaz.");
                return;
            }

            try {
                const res = await fetch("http://localhost:27655/comments", {
    method: "POST",
    credentials: "include", 
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        rating: mevcutPuan,
        comment_text: yorumMetni
    })
});

                
                const data = await res.json();
                if(data.success){
                    
                    yorumForm.reset();
                    mevcutPuan = 0;
                    yildizlariGuncelle(0);
                    if(puanYazi) puanYazi.textContent = "0/5";
                    await loadComments();
                } else {
                    alert(data.message || "Yorum kaydedilemedi.");
                }
            } catch(err){
                console.error(err);
                alert("Sunucuya bağlanılamıyor.");
            }
        });
    }

    
    const yorumListesi = document.getElementById('commentsList');
    
    async function loadComments(){
        try {
            const res = await fetch("http://localhost:27655/comments");
            const data = await res.json();
            
            if(!data.success){ 
                console.error("Yorumlar alınamadı"); 
                return; 
            }
            
            yorumListesi.innerHTML = "";
            data.comments.forEach(c => {
                const yorumKart = document.createElement('div');
                yorumKart.className = 'comment-card';
                
                // yıldız html
                let yildizHTML = "";
                for(let i=1;i<=5;i++) yildizHTML += (i<=c.rating) ? "★" : "☆";
                
                yorumKart.innerHTML = `
                    <div class="comment-header">
                        <div class="comment-user">
                    <img 
                        src="${c.user?.profile_image || '/images/default-avatar.png'}" 
                        class="comment-avatar"
                        alt="Profil"
                        />
                        <span class="user-name">
                            ${escapeHtml(c.user?.username || "Anonim")}
                        </span>
                    </div>
                        <div class="comment-date">${new Date(c.created_at).toLocaleDateString('tr-TR')}</div>
                    </div>
                    <div class="comment-rating">${yildizHTML}</div>
                    <p class="comment-text">${escapeHtml(c.comment_text)}</p>
                `;
                yorumListesi.prepend(yorumKart);
            });
        } catch(err){
            console.error(err);
        }
    }

    // basit XSS koruması
    function escapeHtml(text){
        if(!text) return "";
        return text.replace(/[&<>"']/g, function(m){ 
            return {
                '&':'&amp;',
                '<':'&lt;',
                '>':'&gt;',
                '"':'&quot;',
                "'":'&#39;'
            }[m]; 
        });
    }

    
    if(yorumListesi){
        loadComments();
    }
});