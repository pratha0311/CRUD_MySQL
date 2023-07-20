const mysql = require("mysql2");

var con = mysql.createConnection({
    host: "0.0.0.0",
    user: "root",
    password: "MySQL@123",
    database: "userdatabase",
    port: 3306
  });
  
con.connect((err) =>{
      if(err) throw err;
      con.query("CREATE DATABASE HEHEHEH", () =>{
        console.log("DATABASE CREATED!!")
      })
  })

con.connect()

module.exports.con=con;