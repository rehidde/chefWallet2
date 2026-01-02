
const allRecipesIngredients = {
    // 1. Kabak Kavurma Tarifi (Tarifi Göster butonu recipe1 açıyor)
    'recipe1': {
        name: 'Kabak Kavurma Tarifi',
        ingredients: [
            { name: 'kabak', quantity: 2, unit: 'adet' },
            { name: 'orta boy havuç', quantity: 1, unit: 'adet' },
            { name: 'soğan', quantity: 1, unit: 'adet' },
            // ZEYTİNYAĞI: (5 yemek kaşığı) + (Sosu için 4 yemek kaşığı) = 9 yemek kaşığı
            { name: 'zeytinyağı', quantity: 9, unit: 'yemek kaşığı' }, 
            { name: 'karabiber', quantity: 0.25, unit: 'çay kaşığı' },
            
            { name: 'tuz', quantity: 1, unit: 'çay kaşığı' }, 
            { name: 'yoğurt', quantity: 1, unit: 'su bardağı' },
            { name: 'dereotu', quantity: 4, unit: 'dal' }, 
            { name: 'sarımsak', quantity: 1, unit: 'diş' },
            { name: 'ceviz içi', quantity: 3.5, unit: 'adet' }, 
            { name: 'toz kırmızı biber', quantity: 1, unit: 'çay kaşığı' }
        ]
    },
    // 2. Mantar Yemeği (Tarifi Göster butonu recipe2 açıyor)
    'recipe2': {
        name: 'Mantar Yemeği',
        ingredients: [
            { name: 'mantar', quantity: 500, unit: 'gram' },
            { name: 'tereyağ', quantity: 1, unit: 'yemek kaşığı' },
            { name: 'zeytinyağı', quantity: 2, unit: 'yemek kaşığı' },
            { name: 'sarımsak', quantity: 2, unit: 'diş' },
            { name: 'tuz', quantity: 1, unit: 'çay kaşığı' },
            { name: 'karabiber', quantity: 1, unit: 'çay kaşığı' }
        ]
    },
    
    // 3. Fırında Bütün Karnabahar (Tarifi Göster butonu recipe3 açıyor)
    'recipe3': {
        name: 'Fırında Bütün Karnabahar',
        ingredients: [
            { name: 'karnabahar', quantity: 1, unit: 'adet' },
            { name: 'hardal', quantity: 1, unit: 'yemek kaşığı' },
            { name: 'köri', quantity: 0.5, unit: 'çay kaşığı' },
            { name: 'toz kırmızı biber', quantity: 1, unit: 'çay kaşığı' },
            { name: 'karabiber', quantity: 1, unit: 'çay kaşığı' },
            { name: 'toz sarımsak', quantity: 1, unit: 'çay kaşığı' },
            { name: 'tuz', quantity: 1, unit: 'tatlı kaşığı' },
            { name: 'tereyağı', quantity: 2, unit: 'yemek kaşığı' },
            { name: 'maydanoz', quantity: 1, unit: 'tutam' }
        ]
    },
    
    // 4. Palamut Buğulama (Tarifi Göster butonu recipe4 açıyor)
    'recipe4': {
        name: 'Palamut Buğulama',
        ingredients: [
            { name: 'palamut balığı', quantity: 2, unit: 'adet (orta boy)' },
            { name: 'mor soğan', quantity: 2, unit: 'adet' },
            { name: 'beyaz soğan', quantity: 1, unit: 'adet' },
            { name: 'yeşil biber', quantity: 3, unit: 'adet' },
            { name: 'sarımsak', quantity: 2, unit: 'diş' },
            { name: 'domates', quantity: 2, unit: 'adet (büyük boy)' },
            { name: 'limon', quantity: 1.25, unit: 'adet (suyu ve dilimi)' },
            { name: 'zeytinyağı', quantity: 4, unit: 'yemek kaşığı' },
            { name: 'karabiber', quantity: 1, unit: 'çay kaşığı' },
            { name: 'tuz', quantity: 2, unit: 'çay kaşığı' },
            { name: 'su', quantity: 1, unit: 'çay bardağı' },
            { name: 'defne yaprağı', quantity: 3, unit: 'adet' },
            { name: 'tereyağı', quantity: 1, unit: 'yemek kaşığı' }
        ]
    },
    
    // 5. Fırında Kabak (Tarifi Göster butonu recipe5 açıyor)
    'recipe5': {
        name: 'Fırında Kabak',
        ingredients: [
            { name: 'kabak', quantity: 1, unit: 'adet' },
            { name: 'zeytinyağı', quantity: 2, unit: 'yemek kaşığı' },
            { name: 'pul biber', quantity: 1, unit: 'tatlı kaşığı' },
            { name: 'tuz', quantity: 0.5, unit: 'çay kaşığı' },
            { name: 'karabiber', quantity: 0.25, unit: 'çay kaşığı' },
            { name: 'dereotlu yoğurt', quantity: 1, unit: 'kase' }
        ]
    },

    // 6. Ratatouille Tarifi (Tarifi Göster butonu recipe6 açıyor)
    'recipe6': {
        name: 'Ratatouille Tarifi',
        ingredients: [
            { name: 'zeytinyağı', quantity: 9, unit: 'yemek kaşığı' }, 
            { name: 'soğan', quantity: 0.5, unit: 'adet' },
            { name: 'kapya biber', quantity: 1, unit: 'adet' },
            { name: 'domates', quantity: 3, unit: 'adet' }, 
            { name: 'taze kekik', quantity: 4, unit: 'dal' }, 
            { name: 'toz şeker', quantity: 1, unit: 'tatlı kaşığı' },
            { name: 'tuz', quantity: 2, unit: 'tatlı kaşığı' }, 
            { name: 'karabiber', quantity: 1.5, unit: 'çay kaşığı' }, 
            { name: 'sarımsak', quantity: 2, unit: 'diş' },
            { name: 'orta boy kabak', quantity: 2, unit: 'adet' },
            { name: 'orta boy patlıcan', quantity: 2, unit: 'adet' }
        ]
    },
    
    // 7. Zeytinyağlı Enginar (Tarifi Göster butonu recipe7 açıyor)
    'recipe7': {
        name: 'Zeytinyağlı Enginar',
        ingredients: [
            { name: 'zeytinyağı', quantity: 10, unit: 'yemek kaşığı' }, 
            { name: 'kuru soğan', quantity: 1, unit: 'adet (orta boy)' },
            { name: 'patates', quantity: 1, unit: 'adet' },
            { name: 'havuç', quantity: 1, unit: 'adet (büyük boy)' },
            { name: 'dondurulmuş bezelye', quantity: 1, unit: 'su bardağı' },
            { name: 'ayıklanmış enginar', quantity: 8, unit: 'adet' },
            { name: 'limon suyu (taze sıkılmış)', quantity: 2, unit: 'adet' },
            { name: 'su', quantity: 1, unit: 'su bardağı' },
            { name: 'toz şeker', quantity: 1, unit: 'tatlı kaşığı' },
            { name: 'tuz', quantity: 1, unit: 'çay kaşığı' },
            { name: 'dereotu', quantity: 0.25, unit: 'demet' }
        ]
    },

    // 8. Elma Cacığı ve Közlenmiş Patlıcan (Tarifi Göster butonu recipe8 açıyor)
    'recipe8': {
        name: 'Elma Cacığı ve Közlenmiş Patlıcan',
        ingredients: [
            { name: 'zeytinyağı', quantity: 5, unit: 'yemek kaşığı' }, 
            { name: 'sarımsak tozu', quantity: 0.5, unit: 'çay kaşığı' },
            { name: 'soğan tozu', quantity: 0.5, unit: 'çay kaşığı' },
            { name: 'bostan patlıcanı', quantity: 1, unit: 'adet' },
            { name: 'taze nane', quantity: 1, unit: 'tutam' },
            { name: 'taze reyhan otu', quantity: 1, unit: 'tutam' },
            { name: 'dereotu', quantity: 1, unit: 'tutam' },
            { name: 'taze fesleğen', quantity: 1, unit: 'tutam' },
            { name: 'sarımsak', quantity: 1, unit: 'diş' },
            { name: 'dolmalık fıstık', quantity: 1, unit: 'yemek kaşığı' },
            { name: 'kırmızı toz biber', quantity: 1, unit: 'çay kaşığı' },
            { name: 'domates püresi', quantity: 0.5, unit: 'su bardağı' },
            { name: 'kurutulmuş domates', quantity: 5, unit: 'adet' },
            { name: 'tuz', quantity: 0.5, unit: 'çay kaşığı' },
            { name: 'yeşil elma', quantity: 2, unit: 'adet' },
            { name: 'süzme yoğurt', quantity: 250, unit: 'gram' },
            { name: 'turna yemişi (cranberry)', quantity: 4, unit: 'yemek kaşığı' }
        ]
    }
};




const CART_KEY = "sepet"; 


const DEFAULT_UNIT_PRICES = {
    'adet': 20.00,
    'kg': 45.00,
    'litre': 35.00,
    'paket': 15.00,
    'demet': 7.00,
    'rulo': 25.00,
    'şişe': 12.00,
    'yemek kaşığı': 0.00, 
    'çay kaşığı': 0.00,
    'tatlı kaşığı': 0.00,
    'tutam': 0.00,
    'su bardağı': 0.00,
    'gram': 0.20, 
    'diş': 0.00,
    'dal': 0.00,
    'kase': 0.00,
    'çay bardağı': 0.00,
    'adet (orta boy)': 20.00,
    'adet (büyük boy)': 25.00,
    'adet (suyu ve dilimi)': 20.00,
};



function getCartItems() {
    const cartJson = localStorage.getItem(CART_KEY);
    try {
        return cartJson ? JSON.parse(cartJson) : [];
    } catch (e) {
        console.error("Sepet verisi bozuk, sıfırlanıyor: ", e);
        return [];
    }
}


function saveCartItems(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    guncelSepetSayaciniYenile(); 
}


function guncelSepetSayaciniYenile() {
    const sepet = getCartItems();
    const toplamUrunAdedi = sepet.length;
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = toplamUrunAdedi.toString();
    }
}



function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}


function closeNotificationModal() {
    document.getElementById('notificationModal').style.display = "none";
}


window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}


function addToCartByRecipeId(recipeId) {
    const recipeData = allRecipesIngredients[recipeId];
    const tarifAdi = recipeData.name;

    if (!recipeData) {
        alert("Hata: Seçilen tarife ait malzeme bilgisi bulunamadı!");
        return;
    }

    let cart = getCartItems();
    
    const existingRecipeItem = cart.find(item => item.sourceRecipe === tarifAdi);
    
    if (existingRecipeItem) {
        
        
        let newPorsiyonCarpan = (existingRecipeItem.porsiyonCarpan || 1) + 1;
        
        const updatedCart = cart.map(item => {
            if (item.sourceRecipe === tarifAdi) {
                
                item.porsiyonCarpan = newPorsiyonCarpan; 
                
                
                if (item.ilkAdet) {
                    item.adet = item.ilkAdet * newPorsiyonCarpan;
                }
            }
            return item;
        });

        saveCartItems(updatedCart);
        
       
        document.getElementById('notificationRecipeName').innerText = `${tarifAdi} Porsiyonu ${newPorsiyonCarpan}'e yükseltildi!`;
    
    } else {
        
        
        recipeData.ingredients.forEach(item => {
            const itemName = item.name.trim(); 
            const itemUnit = item.unit.trim();
            
            
            const defaultPrice = DEFAULT_UNIT_PRICES[itemUnit.toLowerCase()] || DEFAULT_UNIT_PRICES['adet'];
            
            
            cart.push({ 
                ad: itemName, 
                adet: parseFloat(item.quantity) || 1, 
                birim: itemUnit,
                fiyat: defaultPrice, 
                sourceRecipe: tarifAdi, 
                ilkAdet: parseFloat(item.quantity) || 1, 
                porsiyonCarpan: 1, 
                miktarsalAdet: parseFloat(item.quantity) || 1, 
                resim: 'images/placeholder.jpg',
                aciklama: `${tarifAdi} tarifinden eklendi.`,
            });
        });

        saveCartItems(cart);
        
        
        document.getElementById('notificationRecipeName').innerText = `${tarifAdi} Malzemeleri Sepete Eklendi.`;
    }

    document.getElementById('notificationModal').style.display = "block";
}


function scrollToRecipes() {
    const recipesSection = document.getElementById('recipes-list');
    
    if (recipesSection) {
        recipesSection.scrollIntoView({
            behavior: 'smooth', 
            block: 'start'      
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    
    guncelSepetSayaciniYenile(); 
});


document.addEventListener('DOMContentLoaded', function() {
    const marquee = document.querySelector('.campaign-marquee');

    if (marquee) {
        
        const speedFactor = 0.03; 

        const contentWidth = marquee.scrollWidth;

        const durationSeconds = contentWidth * speedFactor; 

     
        marquee.style.animationDuration = `${durationSeconds}s`;

        
    }
});