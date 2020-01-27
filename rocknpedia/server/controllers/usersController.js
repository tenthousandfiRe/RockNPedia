const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const sha1 = require("sha1");
const cors = require("cors");
let myKey = "myprivatekey";
const connection = require("./config/db.js");


server.post("/auth", (request, response) => {
    const { username, password } = request.body;
    connection.query(
      `SELECT *
        FROM user
        WHERE username = '${username}'
        AND password = sha1('${password}');`,
      function(error, results) {
        if (error) console.log(error);
        else if (results.length) {
          const { isAdmin, id } = results[0]
          // const [{ isAdmin }] = results = esto es igual que results[0]
          const token = jwt.sign({ id, username, isAdmin: isAdmin ? true : false }, myKey); // otra opción más corta (y mejor) para validar isAdmin: Boolean(isAdmin)
          response.send({
            token
          });
        } else {
          response.sendStatus(400);
        }
      }
    );
  });


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
