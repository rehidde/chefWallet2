CREATE DATABASE IF NOT EXISTS chefwallet CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE chefwallet;



CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(40) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users
MODIFY profile_image VARCHAR(255)
DEFAULT '/images/default.png';





CREATE TABLE IF NOT EXISTS comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    rating INT DEFAULT 0,
    comment_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
DROP TABLE IF EXISTS kategoriler;

CREATE TABLE IF NOT EXISTS kategoriler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(50) NOT NULL,
    ad VARCHAR(100) NOT NULL
);

DROP TABLE IF EXISTS urunler;

CREATE TABLE IF NOT EXISTS urunler (
  id INT AUTO_INCREMENT PRIMARY KEY,
  key_name VARCHAR(50) NOT NULL,
  urun_id VARCHAR(50) NOT NULL,
  ad VARCHAR(100) NOT NULL,
  fiyat DECIMAL(10,2) NOT NULL,
  aciklama TEXT,
  stok INT NOT NULL,
  resim VARCHAR(255),
  indirim INT DEFAULT NULL
);


INSERT INTO kategoriler (key_name, ad) VALUES
('meyve', 'Meyve & Sebze'),
('sut', 'Süt Ürünleri'),
('kahvalti', 'Kahvaltılık'),
('temel', 'Temel Gıda'),
('et', 'Et-Balık-Tavuk'),
('baharat', 'Baharatlar'),
('atıstırmalık', 'Atıştırmalık'),
('icecek', 'İçecek'),
('pratik', 'Pratik Yemek'),
('ev', 'Ev Ürünleri');
-- Ev Ürünleri
INSERT INTO urunler (key_name, urun_id, ad, fiyat, aciklama, stok, resim, indirim) VALUES
('ev','bulasik-deterjani','Bulaşık Deterjanı',60,'Limon kokulu deterjan',25,'images/bd.jpg',NULL),
('ev','camasir-suyu','Çamaşır Suyu',35,'Güçlü dezenfektan',30,'images/cs.jpg',NULL),
('ev','yumusatici','Yumuşatıcı',50,'Mis kokulu yumuşatıcı',20,'images/y.jpg',NULL),
('ev','camasir-deterjani2','Çamaşır Deterjanı',75,'Renkli ve beyazlar için',18,'images/deterjan.jpg',NULL),
('ev','temizlik-bezi','Temizlik Bezi',15,'Mikrofiber bez',40,'images/bez.jpg',NULL),
('ev','cop-poseti','Çöp Poşeti',22,'Büyük boy çöp poşeti',35,'images/poset.jpg',20),
('ev','sunger','Sünger',10,'Çift taraflı sünger',50,'images/sun.jpg',NULL),
('ev','kagit-havlu','Kağıt Havlu',28,'Çift katlı havlu',45,'images/havlu.jpg',NULL);


-- Atıştırmalık
INSERT INTO urunler (key_name, urun_id, ad, fiyat, aciklama, stok, resim, indirim) VALUES
('atıstırmalık','cips','Cips',25,'Patates cipsi',40,'images/ac.jpg',NULL),
('atıstırmalık','cikolata','Çikolata',18,'Sütlü çikolata',50,'images/ciko.jpg',NULL),
('atıstırmalık','biskuvi','Bisküvi',12,'Kakaolu bisküvi',60,'images/bis.jpg',NULL),
('atıstırmalık','kraker','Kraker',10,'Tuzlu kraker',45,'images/kra.jpg',NULL),
('atıstırmalık','findik','Fındık',75,'Taze iç fındık',25,'images/fındık.jpg',NULL),
('atıstırmalık','badem','Badem',80,'Kavrulmuş badem',20,'images/badem.jpg',NULL),
('atıstırmalık','kuru-uzum','Kuru Üzüm',35,'Tatlı kuru üzüm',30,'images/uzum.jpg',20),
('atıstırmalık','cerez-karisik','Çerez Karışık',60,'Fındık, fıstık ve kaju',15,'images/cerez.jpg',NULL);

-- Meyve & Sebze
INSERT INTO urunler (key_name, urun_id, ad, fiyat, aciklama, stok, resim, indirim) VALUES
('meyve','kabak','Kabak',18,'Taze kabak',30,'images/kabak.jpg',NULL),
('meyve','havuc','Havuç',12,'Taze havuç',40,'images/havuç.jpg',20),
('meyve','sogan','Soğan',10,'Kuru soğan',50,'images/kurusogan.jpg',NULL),
('meyve','mor-sogan','Mor Soğan',14,'Taze mor soğan',35,'images/morsogan.jpg',20),
('meyve','kapya-biber','Kapya Biber',22,'Lezzetli kapya biber',25,'images/kapyabiber.jpg',NULL),
('meyve','patlican','Patlıcan',25,'Bostan patlıcan',20,'images/patlıcan.jpg',NULL),
('meyve','karnabahar','Karnabahar',30,'Taze karnabahar',15,'images/karnabahar.jpg',NULL),
('meyve','mantar','Mantar',28,'Kültür mantarı',20,'images/mantar.jpg',NULL),
('meyve','domates','Domates',15,'Taze domates',45,'images/domates.jpg',NULL),
('meyve','patates','Patates',13,'Taze patates',60,'images/patates.jpg',NULL),
('meyve','bezelye','Bezelye',20,'Dondurulmuş bezelye',30,'images/bezelye.jpg',NULL),
('meyve','enginar','Enginar',35,'Taze enginar',18,'images/enginar.jpg',NULL),
('meyve','limon','Limon',5,'Sulu limon',70,'images/limon.jpg',NULL),
('meyve','elma','Elma',14,'Tatlı elma',40,'images/elma.jpg',NULL),
('meyve','turna-yemisi','Turna Yemişi',55,'Kurutulmuş turna yemişi',15,'images/turna.jpg',20),
('meyve','maydanoz','Maydanoz',6,'Taze maydanoz',50,'images/maydanoz.jpg',NULL),
('meyve','dereotu','Dereotu',7,'Taze dereotu',40,'images/dereotu.jpg',NULL),
('meyve','taze-nane','Taze Nane',8,'Ferahlık veren nane',35,'images/tazenane.jpg',NULL),
('meyve','reyhan','Reyhan Otu',9,'Taze reyhan',20,'images/reyhan.jpg',NULL),
('meyve','feslegen','Fesleğen',9,'Taze fesleğen',20,'images/feslegen.jpg',NULL);

-- Süt Ürünleri
INSERT INTO urunler (key_name, urun_id, ad, fiyat, aciklama, stok, resim, indirim) VALUES
('sut','sut','Süt',30,'Günlük taze süt',40,'images/süt.jpg',NULL),
('sut','peynir','Peynir',85,'Tam yağlı beyaz peynir',20,'images/peynir.jpg',20),
('sut','tereyagi','Tereyağı',120,'Doğal köy tereyağı',15,'images/tereyag.jpg',NULL),
('sut','krema','Krema',55,'Pastalar için süt kreması',18,'images/krema.jpg',NULL),
('sut','kaymak','Kaymak',70,'Geleneksel manda kaymağı',10,'images/kaymak.jpg',20),
('sut','labne','Labne',45,'Yumuşak labne peyniri',22,'images/labne.jpg',NULL),
('sut','kefir','Kefir',38,'Probiyotik içecek',30,'images/kefir.jpg',NULL),
('sut','suzme-yogurt','Süzme Yoğurt',50,'250gr Süzme Yoğurt',35,'images/yogurt.jpg',NULL),
('sut','krem','Krem Peynir',6,'Ağızda ipeksi tat',53,'images/krem.jpg',NULL);

-- Et-Balık-Tavuk
INSERT INTO urunler (key_name, urun_id, ad, fiyat, aciklama, stok, resim, indirim) VALUES
('et','palamut','Palamut',95,'Taze Karadeniz palamudu',15,'images/palamut.jpg',20),
('et','somon','Somon',180,'Izgaralık taze somon',10,'images/somon.jpg',NULL),
('et','hamsi','Hamsi',75,'Karadeniz hamsisi',25,'images/hamsi.jpg',NULL),
('et','tavuk_gogus','Tavuk Göğsü',110,'Kemiksiz tavuk göğsü',20,'images/tavukg.jpg',NULL),
('et','tavuk_kanat','Tavuk Kanat',95,'Marine edilmiş kanat',18,'images/tavukk.jpg',NULL),
('et','kirmizi_et','Kırmızı Et',260,'Dana kuşbaşı',12,'images/et.jpg',NULL),
('et','antrikot','Antrikot',320,'Izgaralık antrikot',8,'images/ant.jpg',NULL),
('et','sucuk','Sucuk',140,'Doğal fermente sucuk',14,'images/sucuk.jpg',NULL);

-- Temel Gıda
INSERT INTO urunler (key_name, urun_id, ad, fiyat, aciklama, stok, resim, indirim) VALUES
('temel','zeytinyagi','Zeytinyağı',150,'Soğuk sıkım',10,'images/zeytinyag.jpg',NULL),
('temel','domates-puresi','Domates Püresi',25,'Hazır domates püresi',20,'images/domatesp.jpg',NULL),
('temel','limon-suyu','Limon Suyu',18,'Doğal limon suyu',30,'images/limons.jpg',NULL),
('temel','toz-seker','Toz Şeker',40,'Kristal şeker',50,'images/tozseker.jpg',20),
('temel','un','Un',60,'Çok amaçlı beyaz un',40,'images/bugday.jpg',NULL),
('temel','ekmek','Ekmek',12,'Taze ekmek',60,'images/ekmek.jpg',NULL),
('temel','pirinc','Pirinç',55,'Baldo pirinç',35,'images/pirnc.jpg',NULL),
('temel','makarna','Makarna',22,'Burgulu makarna',45,'images/makarna.jpg',20);

-- Kahvaltılık
INSERT INTO urunler (key_name, urun_id, ad, fiyat, aciklama, stok, resim, indirim) VALUES
('kahvalti','ceviz-ici','Ceviz İçi',120,'Taze ceviz',10,'images/ceviz.jpg',NULL),
('kahvalti','dolmalik-fistik','Dolmalık Fıstık',90,'Çam fıstığı',8,'images/fıstık.jpg',NULL),
('kahvalti','hardal','Hardal',30,'Sarı hardal sos',15,'images/hardal.jpg',NULL),
('kahvalti','bal','Bal',95,'Doğal çiçek balı',12,'images/bal.jpg',NULL),
('kahvalti','recel','Reçel',45,'Çilek reçeli',18,'images/recel.jpg',NULL),
('kahvalti','zeytin','Zeytin',55,'Siyah sele zeytin',25,'images/zeytin.jpg',NULL),
('kahvalti','salam','Salam',75,'Dilimlenmiş dana salam',20,'images/salam.jpg',NULL),
('kahvalti','tahin','Tahin',70,'Doğal susam tahini',14,'images/tahin.jpg',NULL);

-- Baharatlar
INSERT INTO urunler (key_name, urun_id, ad, fiyat, aciklama, stok, resim, indirim) VALUES
('baharat','karabiber','Karabiber',18,'Toz karabiber',40,'images/kbiber.jpg',20),
('baharat','pul-biber','Pul Biber',15,'Acı pul biber',35,'images/pbiber.jpg',NULL),
('baharat','kekik','Kekik',14,'Dağ kekiği',25,'images/kekik.jpg',NULL),
('baharat','kori','Köri',22,'Aromalı köri',20,'images/kori.jpg',NULL),
('baharat','kirmizi-biber','Kırmızı Biber',16,'Toz biber',30,'images/tbiber.jpg',20),
('baharat','sarmisak-tozu','Sarımsak Tozu',20,'Toz sarımsak',20,'images/stozu.jpg',NULL),
('baharat','sogan-tozu','Soğan Tozu',18,'Toz soğan',25,'images/toz.jpg',20),
('baharat','defne','Defne Yaprağı',10,'Kurutulmuş',30,'images/defne.jpg',NULL),
('baharat','tuz','Tuz',5,'Kaya tuzu',24,'images/tuz.jpg',NULL);

-- İçecekler
INSERT INTO urunler (key_name, urun_id, ad, fiyat, aciklama, stok, resim, indirim) VALUES
('icecek','su','Su',5,'Doğal kaynak suyu',100,'images/su.jpg',NULL),
('icecek','maden-suyu','Maden Suyu',10,'Doğal mineralli',60,'images/msu.jpg',NULL),
('icecek','soda-limon','Limonlu Soda',12,'Ferahlık veren soda',50,'images/lsoda.jpg',NULL),
('icecek','cola','Kola',18,'Soğuk içim kola',40,'images/kola.jpg',NULL),
('icecek','portakal-suyu','Portakal Suyu',22,'Taze sıkım portakal suyu',30,'images/psuyu.jpg',NULL),
('icecek','soguk-cay','Soğuk Çay',20,'Şeftalili soğuk çay',35,'images/scay.jpg',NULL),
('icecek','kahve','Kahve',25,'Hazır granül kahve',45,'images/kahve.jpg',NULL),
('icecek','yesil-cay','Yeşil Çay',18,'Poşet yeşil çay',55,'images/ycay.jpg',NULL);

-- Tarifler tablosu
CREATE TABLE IF NOT EXISTS tarifler (
  id INT AUTO_INCREMENT PRIMARY KEY,
  baslik VARCHAR(255) NOT NULL,
  malzemeler TEXT,
  aciklama TEXT,
  resim VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Sepet tablosu (user_id ile ilişki)
CREATE TABLE IF NOT EXISTS sepet (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  urun_id VARCHAR(100) NOT NULL,
  adet INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
ALTER TABLE sepet
ADD CONSTRAINT fk_sepet_urun
FOREIGN KEY (urun_id) REFERENCES urunler(id)
ON DELETE CASCADE;
DESCRIBE sepet;

ALTER TABLE users ADD COLUMN phone VARCHAR(11);
ALTER TABLE users ADD COLUMN address TEXT;
ALTER TABLE users ADD COLUMN profile_image VARCHAR(255);

SELECT * FROM sepet;
















