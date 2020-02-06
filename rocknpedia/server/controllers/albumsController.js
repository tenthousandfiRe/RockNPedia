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
albumsController.list = (req, res) => {
  const { band_id } = req.params;
  let sql = `SELECT album_name ,album_id, record_label, album_image FROM album where band_id = ${band_id}`;
  try {
    connection.query(sql, (error, results) => {
      if (error) console.log(error);
      res.send(results);
    });
  } catch {
    res.sendStatus(400);
  }
};

//POST query for inserting a new album
albumsController.save = (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  let album_name = req.body.album_name;
  let record_label = req.body.record_label;
  let album_image = req.file.filename;
  let band_id = req.params.band_id;
  let sql = `INSERT INTO album (album_name, record_label, album_image, band_id) VALUES ('${album_name}', '${record_label}', '${album_image}', ${band_id} )`;
  console.log(sql);
  connection.query;
  if (token) {
    connection.query(sql, results => {
      res.send(results);
    });
  } else {
    res.status(401).send("no puedes");
  }
};

albumsController.updt = (req, res) => {
  console.log("entroo");
  const { album_id } = req.params;
  let { album_name, record_label, } = req.body;
  let album_image = req.file.filename;
  console.log(req.file.filename);
  try {
    connection.query(
      `UPDATE album SET? WHERE album_id = ${album_id};`,
      { album_name, album_image, record_label },
      (error, results) => {
        if (error) console.log(error);
        else {
          connection.query(
            `SELECT * FROM  album  WHERE album_id = ${album_id};`,
            { album_name, album_image, record_label, band_id },
            (error, results) => {
              if (error) {
                res.send(error);
              } else {
                res.send(results);
              }
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

//Deleting one band
albumsController.delete = (req, res) => {
  const { album_id } = req.params;
  console.log("aaaaaaaaaaaaaaaaaaaaaaa");
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let sql = `DELETE from album WHERE album_id = ${album_id}`;
    console.log(sql);
    if (token) {
      connection.query(sql, (error, results) => {
        if (error) console.log(error);
        res.send("/bands");
      });
    }
  } catch {
    res.sendStatus(401);
  }
};

module.exports = albumsController;
