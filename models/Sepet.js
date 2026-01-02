const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Urun = require("./Urun");

const Sepet = sequelize.define("Sepet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  urun_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  adet: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {
  tableName: "sepet", 
  timestamps: false,
  underscored: true
});

Sepet.belongsTo(Urun, {
  foreignKey: "urun_id"
});

module.exports = Sepet;
