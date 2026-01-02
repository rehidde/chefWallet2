const fs = require('fs');
require('dotenv').config();
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,     
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 27655),
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    logging: false,
    pool: { max: Number(process.env.DB_CONN_LIMIT || 10), min: 0, acquire: 30000, idle: 10000 },

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: true,
        ca: fs.readFileSync("./certs/ca.pem"),
      },
      connectTimeout: 20000
    }

  }
);


module.exports = sequelize;


