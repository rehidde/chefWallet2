
const express = require("express");
const path = require("path");
const session = require("express-session");
const bcrypt = require("bcrypt");
const multer = require("multer");
const sequelize = require("./config/sequelize");
const User = require("./models/user");
const Comment = require("./models/comments");
const Urun = require("./models/Urun");
const Kategori = require("./models/Kategori");
const Sepet = require("./models/Sepet");


User.hasMany(Comment, { foreignKey: "user_id"});
Comment.belongsTo(User, { foreignKey: "user_id"});

User.hasMany(Sepet, { foreignKey: "user_id" });
Sepet.belongsTo(User, { foreignKey: "user_id" });

Urun.hasMany(Sepet, { foreignKey: "urun_id" });
Sepet.belongsTo(Urun, { foreignKey: "urun_id" });

Kategori.hasMany(Urun, { foreignKey: "key_name" });
Urun.belongsTo(Kategori, { foreignKey: "key_name" });





sequelize.authenticate()
  .then(() => console.log("Sequelize MySQL bağlantısı kuruldu."))
  .catch(err => console.error("Sequelize bağlantı hatası:", err));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); 
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });



const app = express();



app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname, "public")));


app.use(
  session({
    secret: "gizli-anahtar",
    resave: false,
    saveUninitialized: true,
  })
);


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/giris");
  }
  next();
}

async function kuponKontrol(req) {
  if (!req.session.indirim || req.session.indirim === 0) return;

  const sepet = await Sepet.findAll({
    where: { user_id: req.session.user.id },
    include: Urun
  });

  let toplam = 0;
  sepet.forEach(item => {
    toplam += item.adet * item.Urun.fiyat;
  });

  if (toplam < 500) {
    req.session.indirim = 0;
  }
}



app.get("/", (req, res) => {
  res.render("index", {
    user: req.session.user || null
  });
});


app.get("/giris", (req, res) => {
  res.render("giris", {
    user: req.session.user || null
  });
});
app.get("/cikis", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Çıkış hatası:", err);
      return res.redirect("/");
    }
    res.redirect("/giris");
  });
});


app.post("/giris", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Kullanıcı bulunamadı"
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        success: false,
        message: "Şifre hatalı"
      });
    }

    
    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email
    };

    res.json({
      success: true,
      message: "Giriş başarılı",
      user: req.session.user
    });

  } catch (err) {
    console.error("LOGIN HATA:", err);
    res.status(500).json({
      success: false,
      message: "Sunucu hatası"
    });
  }
});


app.get("/kayit", (req, res) => {
  res.render("kayit");
});
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({ success: false, message: "Eksik bilgi" });
  }

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.json({ success: false, message: "Email zaten kayıtlı" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashed,
      profile_image: "/images/default-avatar.png"
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error("REGISTER HATA:", err);
    res.json({ success: false, message: "Sunucu hatası" });
  }
});



app.get("/market", requireLogin, async (req, res) => {
  try {
    const kategoriler = await Kategori.findAll({
      include: [{
        model: Urun
      }]
    });

    res.render("market", {
      user: req.session.user,
      kategoriler
    });
  } catch (err) {
    console.error("MARKET HATASI:", err);
    res.status(500).send("Market yüklenemedi");
  }
});




app.get("/sepet", requireLogin, async (req, res) => {
  const sepet = await Sepet.findAll({
    where: { user_id: req.session.user.id },
    include: Urun
  });

  let toplamFiyat = 0;

  sepet.forEach(item => {
    toplamFiyat += item.adet * item.Urun.fiyat;
  });

  
  const indirim = req.session.indirim || 0;
  const araToplam = Math.max(toplamFiyat - indirim, 0);

  
let kargoUcreti = 0;
let kargoYazi = "-";

if (araToplam > 0 && araToplam <= 150) {
  kargoUcreti = 30;
  kargoYazi = "30 ₺";
}

if (araToplam > 150) {
  kargoUcreti = 0;
  kargoYazi = "Ücretsiz";
}


  
  const odenecekTutar = araToplam > 0 ? araToplam + kargoUcreti : 0;


  res.render("sepet", {
    user: req.session.user,
    sepet,
    toplamFiyat,
    indirim,
    kargoUcreti,
    kargoYazi,
    odenecekTutar
  });
});



app.post("/api/sepet/kaydet", async (req, res) => {
  try {
    const { sepet, user_id } = req.body;

    if (!user_id || !Array.isArray(sepet)) {
      return res.json({ success: false });
    }

    
    await Sepet.destroy({
      where: { user_id }
    });

    
    for (let item of sepet) {
      await Sepet.create({
        user_id,
        urun_id: item.id || item.urun_id,
        adet: item.adet
      });
    }

    res.json({ success: true });

  } catch (err) {
    console.error("SEPET KAYDET HATA:", err);
    res.status(500).json({ success: false });
  }
});


app.get("/tarifler",requireLogin, (req, res) => {
  res.render("tarifler", {
    user: req.session.user || null
  });
});

app.get("/hakkimizda",requireLogin, (req, res) => {
  res.render("hakkimizda", {
    user: req.session.user || null
  });
});

app.get("/iletisim",requireLogin, (req, res) => {
  res.render("iletisim", {
    user: req.session.user || null
  });
});

app.get("/odeme",requireLogin, (req, res) => {
  res.render("odeme", {
    user: req.session.user || null
  });
});

app.get("/profil", requireLogin, async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id, {
      attributes: ["id","username","email","phone","address","profile_image"]
    });

    if (!user) return res.send("Kullanıcı bulunamadı");

    const comments = await Comment.findAll({
      where: { user_id: user.id },
      
    });

    res.render("profil", {
      user,
      comments
    });
  } catch (err) {
    console.error("PROFIL HATA:", err);
    res.send("Profil yüklenemedi");
  }
});


app.post("/profil/guncelle", requireLogin, async (req, res) => {
  const { phone, address } = req.body;

  await User.update(
    { phone, address },
    { where: { id: req.session.user.id } }
  );

  res.redirect("/profil");
});


app.post("/profil/resim-yukle", requireLogin, upload.single("profileImage"), async (req, res) => {
  const imagePath = "/uploads/" + req.file.filename;

  await User.update(
    { profile_image: imagePath },
    { where: { id: req.session.user.id } }
  );

  res.redirect("/profil");
});

app.post("/profil/sifre-degistir", requireLogin, async (req, res) => {
  const { oldPassword, newPassword, newPassword2 } = req.body;

  if (newPassword !== newPassword2) {
    return res.send("Şifreler uyuşmuyor");
  }

  const user = await User.findByPk(req.session.user.id);
  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) return res.send("Mevcut şifre yanlış");

  const hashed = await bcrypt.hash(newPassword, 10);

  await User.update(
    { password: hashed },
    { where: { id: user.id } }
  );

  res.redirect("/profil");
});




app.get("/comments", requireLogin, async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [{
        model: User,
        as: "user",
        attributes: ["username","profile_image"]
      }],
      order: [["created_at", "DESC"]]
    });

    res.json({ success: true, comments });
  } catch (err) {
    console.error("COMMENTS HATA:", err);
    res.status(500).json({ success: false });
  }
});



app.post("/comments", requireLogin, async (req, res) => {
  const { rating, comment_text } = req.body;

  if (!rating || !comment_text) {
    return res.json({ success: false, message: "Eksik veri" });
  }

  try {
    await Comment.create({
      user_id: req.session.user.id,
      rating,
      comment_text,
      created_at: new Date()
    });

    res.json({ success: true });
  } catch (err) {
    console.error("COMMENT CREATE HATA:", err);
    res.status(500).json({ success: false });
  }
});




app.get("/api/kategoriler", async (req, res) => {
  try {
    const kategoriler = await Kategori.findAll();
    res.json(kategoriler);
  } catch (err) {
    console.error("Kategori hatası:", err);
    res.status(500).json({ error: "Kategori alınamadı" });
  }
});



app.get("/api/urunler/:key", async (req, res) => {
  try {
    const urunler = await Urun.findAll({
      where: {
        key_name: req.params.key
      }
    });

    res.json(urunler);
  } catch (err) {
    console.error("ÜRÜN ÇEKME HATASI:", err);
    res.status(500).json({ error: "Ürünler alınamadı" });
  }
});




app.post("/api/sepet/ekle", requireLogin, async (req, res) => {
  try {
    const { urun_id } = req.body;
    const user_id = req.session.user.id;

    let sepetUrun = await Sepet.findOne({ where: { user_id, urun_id } });

    if (sepetUrun) {
      sepetUrun.adet += 1;
      await sepetUrun.save();
    } else {
      await Sepet.create({ user_id, urun_id, adet: 1 });
    }
    res.json({
      success: true,
      message: "Ürün sepete eklendi"
    });

  } catch (err) {
    console.error("SEPET EKLE HATA:", err);
    res.status(500).json({
      error: "Sepete ekleme başarısız"
    });
  }

   await kuponKontrol(req);
   
   
});



app.post("/api/sepet/sil", requireLogin, async (req, res) => {
  const { urun_id } = req.body;
  const user_id = req.session.user.id;

  await Sepet.destroy({ where: { user_id, urun_id } });

  await kuponKontrol(req);
  res.redirect("/sepet");
});


app.post("/api/sepet/arttir", requireLogin, async (req, res) => {
  const { urun_id } = req.body;

  const urun = await Urun.findByPk(urun_id);
  if (urun.stok < 1) {
    return res.json({ success: false, message: "Stok yok" });
  }

  const kayit = await Sepet.findOne({
    where: { user_id: req.session.user.id, urun_id }
  });

  kayit.adet += 1;
  await kayit.save();

  urun.stok -= 1;
  await urun.save();

  res.redirect("/sepet");
});
app.post("/api/sepet/azalt", requireLogin, async (req, res) => {
  const { urun_id } = req.body;
  const user_id = req.session.user.id;

  const sepetUrun = await Sepet.findOne({ where: { user_id, urun_id } });

  if (sepetUrun) {
    sepetUrun.adet -= 1;
    if (sepetUrun.adet <= 0) {
      await sepetUrun.destroy();
    } else {
      await sepetUrun.save();
    }
  }
  await kuponKontrol(req);
  res.redirect("/sepet");
});


app.post("/api/sepet/kupon", requireLogin, async (req, res) => {
  const { kod } = req.body;
  const user_id = req.session.user.id;

  const sepet = await Sepet.findAll({
    where: { user_id },
    include: Urun
  });

  let toplamFiyat = 0;
  sepet.forEach(item => {
    toplamFiyat += item.adet * item.Urun.fiyat;
  });

  // varsayılan
  req.session.indirim = 0;

  if (kod === "CHEFWALLET100") {
    if (toplamFiyat >= 500) {
      req.session.indirim = 100;

      return res.json({
        success: true,
        indirim: 100,
        yeniToplam: toplamFiyat - 100,
        mesaj: "Kupon uygulandı! ₺100 indirim kazandınız 🎉"
      });
    } else {
      return res.json({
        error: "Bu kupon için sepet tutarı en az ₺500 olmalıdır."
      });
    }
  }

  return res.json({ error: "Geçersiz kupon kodu." });
});
const PORT = 27655;


app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
