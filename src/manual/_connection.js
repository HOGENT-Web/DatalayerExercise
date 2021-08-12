const mysql = require('mysql2/promise'); // use the Promise wrapper
const config = require('../config');

const getConnection = () => mysql.createPool({
  ...config,
  connectionLimit: 10,
});

module.exports = getConnection;
