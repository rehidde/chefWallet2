const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./user");

const Comment = sequelize.define("Comment", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: DataTypes.INTEGER,
  comment_text: DataTypes.TEXT
}, {
  tableName: "comments",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
  underscored: true
});

Comment.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = Comment;
