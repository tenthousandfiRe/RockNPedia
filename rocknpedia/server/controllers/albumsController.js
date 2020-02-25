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
  let sql = `SELECT album_name ,album_id, record_label, album_image FROM album where band_id = ${band_id}`
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
  let album_name = req.body.album_name;
  let record_label = req.body.record_label;
  let album_image = req.file.filename;
  let band_id = req.params.band_id;
  let sql = `INSERT INTO album (album_name, record_label, album_image, band_id) VALUES ('${album_name}', '${record_label}', '${album_image}', ${band_id} )`;
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





//Deleting one band
albumsController.delete = ((req, res) => {
  const { album_id } = req.params;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let sql = `DELETE from album WHERE album_id = ${album_id}`;
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

module.exports = albumsController;
