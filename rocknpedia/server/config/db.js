const mysql = require('mysql');


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "rocknpedia"
  });
  
  connection.connect(function(error) {
    if (error) {
      throw error;
    } else {
      console.log("conexión correcta");
    }
  });

  module.exports = connection;
