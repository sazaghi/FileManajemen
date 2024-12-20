require('dotenv').config();  // Import dotenv to load .env variables

const { Sequelize } = require('sequelize');

// Konfigurasi koneksi Sequelize dengan environment variables
const sequelize = new Sequelize(
    process.env.DB_NAME,      // Database name
    process.env.DB_USER,      // Database user
    process.env.DB_PASSWORD,  // Database password
    {
        host: process.env.DB_HOST,   // Database host
        port: process.env.DB_PORT,   // Database port
        dialect: process.env.DB_DIALECT,  // Database dialect (mysql)
    }
);

// Uji koneksi
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Ekspor instance sequelize untuk digunakan di tempat lain
module.exports = sequelize;
