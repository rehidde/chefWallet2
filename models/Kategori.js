const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");


const Kategori = sequelize.define("Kategori", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key_name: DataTypes.STRING,
  ad: DataTypes.STRING
}, {
  tableName: "kategoriler",
  timestamps: false,
  underscored: true
});


module.exports = Kategori;
