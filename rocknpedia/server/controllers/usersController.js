const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const sha1 = require("sha1");
const cors = require("cors");
let myKey = "rocknpediakey";
const multer = require("multer");

const usersController = {};

const connection = require("../config/db.js");
server.use(express.static("public"));

//HERE WE GET THE AUTHENTICATION WITH THE TOKEN TO LOG IN.
usersController.auth = (request, response) => {
  const { username, password } = request.body;
  connection.query(
    `SELECT *
        FROM user
        WHERE username = '${username}'
        AND password = sha1('${password}');`,
    function(error, results) {
      if (error) console.log(error);
      else if (results.length) {
        const { is_admin, user_id, rol, user_image } = results[0];

        const token = jwt.sign(
          {
            user_id,
            username,
            rol,
            user_image,
            is_admin: is_admin ? true : false
          },
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
};

// //FIRST GET OF THE USERS
usersController.list = (req, res) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { is_admin } = jwt.verify(token, myKey);
    const { user_id } = jwt.decode(token);
    let sql = "SELECT user_id, username, is_admin, user_image FROM user"; //USER QUERY: IT BRINGS ALL THE FIELDS.
    let sql2 = `SELECT * FROM user WHERE user_id != ${user_id} ORDER BY username asc`;
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
};

usersController.save = (req, res, next) => {
  let username = req.body.username;
  let password = sha1(req.body.password);
  let is_admin = req.body.is_admin;
  let user_image = req.body.user_image;
  let rol = req.body.rol;
  connection.query(
    "INSERT INTO user SET?",
    {
      username,
      password,
      is_admin,
      user_image,
      rol
    },
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        connection.query(
          `SELECT user_id, username FROM user WHERE username = '${username}'`,
          (err, results) => {
            res.send(results[0]);
          }
        );
      }
    }
  );
};
//HERE WE LIST USERS BY ID
usersController.listId = (req, res) => {
  const { id } = req.params;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { is_admin } = jwt.verify(token, myKey);
    let sql = `SELECT user_id, username, is_admin, user_image, rol FROM user WHERE user_id = ${id} `;
    let sql2 = `SELECT user_id, username, is_admin, user_image, rol FROM user WHERE user_id = ${id} `;
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
};
//HERE WE UPDATE USERS BY ID
usersController.update = (req, res) => {
  const { user_id } = req.params;
  let { is_admin, username, rol } = req.body;
  
  let user_image = req.file.filename;
  console.log(req.file.filename);
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { user_id } = jwt.verify(token, myKey)
    connection.query(
      `UPDATE user SET? WHERE user_id = ${user_id};`,
      { is_admin, username, user_image, rol },
      (error, results) => {
        if (error) console.log(error);
        else {
          connection.query(
            `SELECT * FROM  user  WHERE user_id = ${user_id};`,
            { is_admin, username, user_image, rol, user_id },
            (error, results) => {
              const token = jwt.sign(
                {
                  user_id,
                  username,
                  rol,
                  user_image,
                  is_admin: is_admin ? true : false
                },
                myKey
              );
              res.send({
                token
              });
            }
          );
        }
      }
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(401);
  }
};
//HERE DELETE USERS
usersController.delete = (req, res) => {
  const { id } = req.params;
  let password = sha1(req.body.password);

  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const Admin = jwt.verify(token, myKey).is_admin;
    const aidi = jwt.verify(token, myKey).user_id;

    if (Admin) {
      connection.query(
        `DELETE from user WHERE user_id = ${id};`,
        (error, results) => {
          if (error) console.log(error);
          res.send("tu user ha sido borrado");
        }
      );
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
};

module.exports = usersController;
