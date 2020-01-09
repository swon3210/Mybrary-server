const mysql = require('mysql2');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('bookdatabase', 'root', 'thddnjs12!', {
  dialect: 'mysql',
  host: 'localhost'
});

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'thddnjs12!',
//   database: 'bookdatabase'
// })

module.exports = sequelize;