const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const sha1 = require("sha1");
const cors = require("cors");
let myKey = "rocknpediakey";


const usersController = {};

const connection = require("../config/db.js");

//HERE WE GET THE AUTHENTICATION WITH THE TOKEN TO LOG IN.
usersController.auth = ((request, response) => {
  const { username, password } = request.body;
  connection.query(
    `SELECT *
        FROM user
        WHERE username = '${username}'
        AND password = sha1('${password}');`,
    function(error, results) {
      if (error) console.log(error);
      else if (results.length) {
        const { is_admin, user_id } = results[0];

        const token = jwt.sign(
          { user_id, username, is_admin: is_admin ? true : false },
          myKey
        );
        response.send({
          token
        });
      } else {
        response.sendStatus(400);
      }
    }
  );
});


// //FIRST GET OF THE USERS
usersController.list = ((req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { is_admin } = jwt.verify(token, myKey);
    let sql = "SELECT user_id, username, is_admin, user_image FROM user"; //USER QUERY: IT BRINGS ALL THE FIELDS.
    let sql2 = "SELECT * FROM user";
    if (is_admin) {
      connection.query(sql, (error, results) => {
        if (error) console.log(error);

        res.send(
          results.map(user => ({ ...user, is_admin: Boolean(user.is_admin) }))
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

usersController.save = ((req, res, next) => {
    console.log(req.body)
    console.log("entro a la query")
  let username = req.body.username;
  let password = sha1(req.body.password);
  let is_admin = req.body.is_admin;
  let user_image = req.body.user_image;
  connection.query(
    "INSERT INTO user SET?",
    {
      username,
      password,
      is_admin,
      user_image

    },
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        connection.query(
          `SELECT user_id, username FROM user WHERE username = '${username}'`,
          (err, results) => {
              console.log(results);
            res.send(results[0]);
          }
        );
      }
    }
  );
});

usersController.listId = ((req, res) => {
  const { user_id } = req.params;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { is_admin } = jwt.verify(token, myKey);
    let sql = "SELECT user_id, username, is_admin FROM usuarios WHERE user_id = " + id;
    let sql2 = "SELECT user_id, username FROM usuarios WHERE user_id = " + id;
    if (is_admin) {
      connection.query(sql, (error, results) => {
        if (error) console.log(error);
        res.send(
          results.map(user => ({ ...user, is_admin: Boolean(user.is_admin) }))
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

usersController.update = ((req, res) => {
  const { user_id } = req.params;
  let password = sha1(req.body.password);
  let is_admin = req.body.is_admin;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const Admin = jwt.verify(token, myKey).is_admin;
    let sql = "UPDATE user SET? WHERE user_id = " + user_id;
    if (Admin) {
      connection.query(sql, { password, is_admin }, (error, results) => {
        if (error) console.log(error);
        res.send("/users");
      });
    } else {
      connection.query(sql, { password }, (error, results) => {
        if (error) console.log(error);
        res.send("/users");
      });
    }
  } catch {
    res.sendStatus(401);
  }
});

usersController.delete = ((req, res) => {
  const { user_id } = req.params;
  let password = sha1(req.body.password);
  let is_admin = req.body.is_admin;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const Admin = jwt.verify(token, myKey).is_admin;
    const aidi = jwt.verify(token, myKey).user_id;
    let sql = "DELETE from user WHERE user_id = " + user_id;
    if (Admin) {
      connection.query(sql, { password,   }, (error, results) => {
        if (error) console.log(error);
        res.send("/users");
      });
    } else if (aidi == user_id) {
      connection.query(sql, { password }, (error, results) => {
        if (error) console.log(error);
        res.send("tu user ha sido borrado");
      });
    } else {
      res.send("no eres admin, no puedes borrarlo");
    }
  } catch {
    res.sendStatus(401);
  }
});


module.exports = usersController;
