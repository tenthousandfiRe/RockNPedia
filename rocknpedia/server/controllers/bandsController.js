const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const sha1 = require("sha1");
const cors = require("cors");
let myKey = "rocknpediakey";
let router = express.Router();

const connection = require("../config/db.js");

const bandsController = {};

//GET query for listing all the bands info
bandsController.list = ((__, res) => {
  try {
    let sql = "SELECT band_id, name, foundation_year, band_image FROM band";
    connection.query(sql, (error, results) => {
      if (error) console.log(error);
      res.send(results);
    });

  } catch {
    res.sendStatus(400);
  }
});


//Post of a new band and an image using multer module
bandsController.save = ((req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  let name = req.body.name;
  let foundation_year = req.body.foundation_year;
  let band_image = req.file.filename;
  let created_by = req.body.created_by;
  let sql = `INSERT INTO band (name, foundation_year, band_image, created_by) values ('${name}', ${foundation_year}, '${band_image}', ${created_by})`;
  connection.query
  if (token) {
    connection.query(
      sql,
      (results) => {
        res.send(results);
      }
    );
  } else {
    res.status(401).send("no puedes subir imágenes");
  }
});




//Listing one band details 
bandsController.getBand = (req, res) => {
  const { band_id } = req.params;
  let sql = `SELECT band_id, name, foundation_year, band_image FROM band WHERE band_id = ${band_id}`;
  try {
    connection.query(sql, (error, results) => {
      if (error) console.log(error);
      res.send(results);
    });

  } catch {
    res.sendStatus(401);
  }
};

//Update the band 
bandsController.update = (req, res) => {
  const { band_id } = req.params;
  const token = req.headers.authorization.replace("Bearer ", "");
  let name = req.body.name;
  let foundation_year = req.body.foundation_year;
  let band_image = req.file.filename;
    let sql = `UPDATE band SET? name = '${name}', foundation_year = ${foundation_year}, band_image = '${band_image}' WHERE (band_id = ${band_id})`;
    let sqlSelect = `SELECT album_id, name, record_label, album_image
    FROM album 
    WHERE album.band_id = ${band_id}`;
    connection.query(sql, { name, foundation_year, band_image }, (error) => {
      if (error) console.log(error);
      else if (token) {
        connection.query(sqlSelect, results => {
          response.send(results)
          console.log(results)
        })
      } else {
        res.send("No ze puede")
      }
    });
}


//Deleting one band
bandsController.delete = ((req, res) => {
  const { band_id } = req.params;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let sql = `DELETE from band WHERE band_id = ${band_id}`;
    if (token) {
      connection.query(sql, (error, results) => {
        if (error) console.log(error);
        res.send('/bands');
      });
    }
  } catch {
    res.sendStatus(401);
  }
});

module.exports = bandsController;
