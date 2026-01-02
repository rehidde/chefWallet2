const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Urun = sequelize.define("Urun", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key_name: DataTypes.STRING,
  urun_id: DataTypes.STRING,
  ad: DataTypes.STRING,
  fiyat: DataTypes.DECIMAL(10,2),
  aciklama: DataTypes.TEXT,
  stok: DataTypes.INTEGER,
  resim: DataTypes.STRING,
  indirim: DataTypes.INTEGER
}, {
  tableName: "urunler",
  timestamps: false
});

module.exports = Urun;
