const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const sha1 = require("sha1");
const cors = require("cors");
let myKey = "rocknpediakey";
let router = express.Router();

const connection = require("../config/db.js");

const albumsController = {};

//GET query for listing all the band albums info
albumsController.list = ((req, res) => {
  const { band_id } = req.params
  let sql = `SELECT name ,album_id, record_label, album_image FROM album where band_id = ${band_id}`
  try {
    connection.query(sql, (error, results) => {
      if (error) console.log(error);
      res.send(results);
    });

  } catch {
    res.sendStatus(400);
  }
});



//POST query for inserting a new album
albumsController.save = ((req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  let name = req.body.name;
  let record_label = req.body.record_label;
  let album_image = req.file.filename;
  let sql = `INSERT INTO album (name, record_label, album_image) VALUES ('${name}', '${record_label}', '${album_image}');
  `;
  connection.query
  if (token) {
    connection.query(
      sql,
      (results) => {
        res.send(results);
      }
    );
  } else {
    res.status(401).send("no puedes");
  }
});




// //Update the band 
// bandsController.update = (req, res) => {
//   const { band_id } = req.params;
//   let name = req.body.name;
//   let foundation_year = req.body.foundation_year;
//   let band_image = req.body.band_image;
//   try {
//     const token = req.headers.authorization.replace("Bearer ", "");
//     // const Admin = jwt.verify(token, myKey).isAdmin;
//     // const idUser = jwt.verify (token, myKey).id;
//     let sql = `UPDATE band SET name = '${name}', foundation_year = ${foundation_year}, band_image = '${band_image}' WHERE (band_id = ${band_id})`;
//     console.log(sql)
//     if (token) {
//       connection.query(sql, (error, results) => {
//         if (error) console.log(error);
//         res.send('banda actualizada');
//       });
//     }
//     else {
//       res.send(error)
//     }

//   } catch {
//     res.sendStatus(401);
//   }
// };


// //Deleting one band
// bandsController.delete = ((req, res) => {
//   const { band_id } = req.params;
//   try {
//     const token = req.headers.authorization.replace("Bearer ", "");
//     let sql = `DELETE from band WHERE band_id = ${band_id}`;
//     if (token) {
//       connection.query(sql, (error, results) => {
//         if (error) console.log(error);
//         res.send('/bands');
//       });
//     }
//   } catch {
//     res.sendStatus(401);
//   }
// });

module.exports = albumsController;
