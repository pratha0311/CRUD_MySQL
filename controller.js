const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sql = require("./connection").con;
require('dotenv').config()
let asecretkey= process.env.ACCESS_SECRET_KEY
let rsecretkey=process.env.REFRESH_SECRET_KEY

exports.index= (req, res) => {
    res.render("index");
  }

exports.add= (req, res) => {
    res.render("add");
  }

exports.search= (req, res) => {
    res.render("search");
  }

exports.update= (req, res) => {
    res.render("update");
  }
exports.delete=(req, res) => {
    res.render("delete");
  }
  
exports.addstudent= async (req, res) => {
    const {username, phone, emailid, password, gender } = req.body;
    let hashedpass = await bcrypt.hash(password, 8);
    let qr1 = " select * from users where emailid=? or phone=?";
    sql.query(qr1, [emailid, phone], (err, results) => {
      if (err) res.send(err);
      else {
        if (results.length > 0) {
          res.send("User already exists..");
        } else {
          sql.query("insert into users set ?", {username:username, phone:phone, emailid:emailid, userpass: hashedpass, gender: gender},
            (err, result) => {
              if (err) {
                console.log(err);
              }
              if (result.affectedRows > 0) {
                res.send("USER SAVED!!");
                // res.render("add", {msg: true})
              }
            }
          );
        }
      }
    });
  }

exports.searchstudent=(req, res) => {
    const { emailid, password } = req.body;
    let qr = "select * from users where emailid=?";
    sql.query(qr, [emailid], async(err, result) => {
      if (err) {
        res.send(err);
      } 
      else {
          if (result.length > 0){
              let matchpass = await bcrypt.compare(password, result[0].userpass);
              if(!matchpass){
                  res.send("PASSWORD INCORRECT!!")
          }
          else{
            const atoken=jwt.sign({emailid:result[0].emailid.toString()},asecretkey)
            const rtoken=jwt.sign({emailid:result[0].emailid.toString()},rsecretkey)

            return res.status(200).send({
              msg:"logged in successfully",
              user:result[0],
              token
           })
          }}
      }
    });
  }

exports.updatestudent=(req, res) => {
  v
    const { name, phone, emailid, password, gender } = req.params;
    let qr1 = " select * from users where emailid=?";
    sql.query(qr1, [emailid], async(err, results) => {
      if (err) res.send(err);
      else {
        if (results.length > 0) {
          if(await bcrypt.compare(password,results[0].userpass)){
          sql.query("update users set username= ?, phone=?, gender=? where emailid=?",[name,phone,gender,emailid] , (err, result) => {
            if (err) res.send(err);
            if (result.affectedRows > 0) {
              res.send("USER UPDATED!!");
            } else {
              res.send("USER NOT FOUND!!");
            }
          });
        }
        else{
          res.send("PASSWORD DOES NOT MATCH")
        }
      }
    };
  });
}

exports.deletestudent=(req, res) => {
    const { emailid,password } = req.body;
    sql.query("select * from users where emailid=?",[emailid],async(err,result)=>{
      if(err){
          res.send(err)
      }
      else{
          if(result.length!=0){
              if(await bcrypt.compare(password,result[0].userpass)){
                  let qr1 = "delete from users where emailid=?";
                  sql.query(qr1, [emailid], (err) => {
                      if (err) res.send(err);
                      else {
                          res.send("USER DELETED!!");
                      }})}
              else{
                  res.send("PASSWORD INCORRECT!")
              }}
          else {
          res.send("USER NOT FOUND!!");
        }
      }
    });
  }