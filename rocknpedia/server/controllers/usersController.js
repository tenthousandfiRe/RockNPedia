const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const sha1 = require("sha1");
const cors = require("cors");
let myKey = "myprivatekey";




server.get("/users", (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { isAdmin } = jwt.verify(token, myKey);
    let sql = "SELECT user_id, username, isAdmin, userImage FROM user";
    let sql2 = "SELECT user_id, username, isAdmin, userImage FROM user";
    if (isAdmin) {
      connection.query(sql, (error, results) => {
        if (error) console.log(error);

        res.send(
          results.map(user => ({ ...user, isAdmin: Boolean(user.isAdmin) }))
        );
      });
    } else {
      connection.query(sql2, (error, results) => {
        if (error) console.log(error);

        res.send(results);
      });
    }
  } catch {
    res.sendStatus(401);
  }
});
