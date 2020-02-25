const connection = require("../config/db.js");

const reviewsController = {};

//GET query for listing all the albums reviews and the user info who posted them
reviewsController.list = ((req, res) => {
  try {
  let album_id = req.params.album_id;
    let sql = `SELECT review.review_id, review.review, review.review_date, review.user_id, review.album_id, rating,
    album.album_image, album.album_name, user.username, album.record_label, user.user_image from review 
    INNER JOIN album ON review.album_id = album.album_id and album.album_id = ${album_id}
    INNER JOIN user ON review.user_id = user.user_id order by review_date desc`;
    let sqlNoReview = `SELECT album_id, album_name, record_label, album_image FROM album WHERE album_id = ${album_id}`
    connection.query(sql, (error, results) => {
      if (error) throw error;
      else if (results.length === 0) {
        connection.query(sqlNoReview, (__, results2) => {
          res.send(results2);
        })
      } else {
        res.send(results);

      }
      
    });

  } catch {
    res.sendStatus(400);
  }
});

//GET query for listing all the reviews for a single user
reviewsController.list2 = ((req, res) => {
  try {
  let user_id = req.params.user_id;
    let sql = `SELECT review.review_id, review.review, review.review_date, review.user_id, review.album_id, rating,
    album.album_image, album.album_name, user.username, user.user_image from review 
    INNER JOIN album ON review.album_id = album.album_id
    INNER JOIN user ON review.user_id = ${user_id} and user.user_id = ${user_id}`;
    // let sqlNoReview = `SELECT album_id, album_name, record_label, album_image FROM album WHERE album_id = ${album_id}`
    connection.query(sql, (error, results) => {
      if (error) throw error;
      else {
        res.send(results);
      }      
    });
  } catch {
    res.sendStatus(400);
  }
});

//GET query for the latest review, to be shown on the landing page (feature added at the very end of the project)
reviewsController.list3 = ((__, res) => {
  try {
    let sql = `SELECT review.review_id, review.review, review.review_date, review.user_id, review.album_id, 
    album.album_image, album.album_name, user.username, user.user_image from review 
    INNER JOIN album ON review.album_id = album.album_id and album.album_id = review.album_id
    INNER JOIN user ON review.user_id = user.user_id order by review_date desc limit 1`;
    connection.query(sql, (error, results) => {
      if (error) throw error;
      else {
        res.send(results);
      }
      
    });

  } catch {
    res.sendStatus(400);
  }
});


//Post of a new review of an album
reviewsController.save = ((req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  let review = req.body.review;
  let user_id = req.params.user_id;
  let album_id = req.params.album_id;
  let rating = req.body.rating
  let sql = `INSERT INTO review (review, user_id, album_id, rating) values ('${review}', ${user_id}, ${album_id}, ${rating});`;
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



//Update the review; TODO if possible
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
