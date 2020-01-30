const express = require("express");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const sha1 = require("sha1");
const cors = require("cors");
let myKey = "rocknpediakey";
let router = express.Router();
const multer = require("multer");

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
// const storage = multer.diskStorage({
//   destination: "public/avatars",
//   filename: (_req, file, cb) => {
//     const extension = file.originalname.slice(
//       file.originalname.lastIndexOf(".")
//     );
//     cb(null, new Date().valueOf() + extension);
//   }
// });
// const upload = multer({ storage });

bandsController.save = ((req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  let name = req.body.name;
  let foundation_year = req.body.foundation_year;
  console.log(req.body)
  console.log(req.file)
  let band_image = req.file.originalname;
  let sql = `INSERT INTO band (name, foundation_year, band_image) values ('${name}', ${foundation_year}, '${band_image}')`;
  console.log(sql)
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
  let name = req.body.name;
  let foundation_year = req.body.foundation_year;
  let band_image = req.body.band_image;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    // const Admin = jwt.verify(token, myKey).isAdmin;
    // const idUser = jwt.verify (token, myKey).id;
    let sql = `UPDATE band SET name = '${name}', foundation_year = ${foundation_year}, band_image = '${band_image}' WHERE (band_id = ${band_id})`;
    console.log(sql)
    if (token) {
      connection.query(sql, (error, results) => {
        if (error) console.log(error);
        res.send('banda actualizada');
      });
    }
    else {
      res.send(error)
    }

  } catch {
    res.sendStatus(401);
  }
};


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
