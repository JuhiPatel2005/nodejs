const mysql = require('mysql2');

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Juhi@2005",
  database: "airbnb"
});

module.exports = pool.promise();