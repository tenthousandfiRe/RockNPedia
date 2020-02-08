const express = require("express");


const connection = require("../config/db.js");

const reviewsController = {};

//GET query for listing all the albums reviews and the user info who posted them
reviewsController.list = ((req, res) => {
  try {
  let album_id = req.params.album_id;
    let sql = `SELECT review_id, review, review_date, review.user_id, review.album_id, album_image, username, user_image from review JOIN album JOIN user where review.album_id = ${album_id} and album.album_id = ${album_id}`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      res.send(results);
    });

  } catch {
    res.sendStatus(400);
  }
});


//Post of a new review of an album
reviewsController.save = ((req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  let review = req.body.review;
  console.log(review)
  let user_id = req.params.user_id;
  let album_id = req.params.album_id;
  let sql = `INSERT INTO review (review, user_id, album_id) values ('${review}', ${user_id}, ${album_id});`;
  console.log(sql)
  connection.query
  if (token) {
    connection.query(
      sql,
      (error, results) => {
        if (error) throw error
        res.send(results);
      }
    );
  } else {
    res.status(401).send("no puedes subir review");
  }
});



//Update the review 
reviewsController.update = (req, res) => {
const token = req.headers.authorization.replace("Bearer ", "");
  let review = req.body.review;
  let review_date = req.body.review_date;
  let user_id = req.params.user_id;
  let album_id = req.params.album_id;
  let sql = `UPDATE review SET ${review ? `review='${review}',` : ""} ${review_date ? `review_date='${review_date}',` : ""}${user_id ? `user_id=${user_id}` : ""} WHERE album_id=${album_id}`;
  if (token) {
    connection.query(
      sql,
      (error, results) => {
        if (error) throw error
        res.send(results);
      }
    );
  } else {
    res.status(401).send("no puedes actualizarla");
  }
};


module.exports = reviewsController;
