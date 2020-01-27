const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const sha1 = require("sha1");
const cors = require("cors");
let myKey = "rocknpediakey";

var bandsRouter = require('./routes/bands');
var usersRouter = require('./routes/users');
const connection = require("./config/db.js")


server.use(express.json());
server.use(express.urlencoded());
server.use(cors());

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






server.listen(3003);
