const express = require("express");


const connection = require("../config/db.js");

const bandsController = {};

//GET query for listing all the bands info
bandsController.list = ((__, res) => {
  try {
    let sql = "SELECT band_id, name, foundation_year, band_image FROM band";
    connection.query(sql, (error, results) => {
      if (error) throw error;
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
      if (error) throw error;
      res.send(results);
    });

  } catch {
    res.sendStatus(401);
  }
};

bandsController.delete = ((req, res) => {
  const { band_id } = req.params;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let sql = `DELETE from band WHERE band_id = ${band_id}`;
    console.log(sql)
    if (token) {
      connection.query(sql, (error, results) => {
        if (error) console.log(error);
        res.send(results);
      });
    }
  } catch {
    res.sendStatus(401);
  }
});

//Update the band 
bandsController.update = (req, res) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  let band_id = req.params.band_id
  let name = req.body.name;
  let foundation_year = req.body.foundation_year;
  let band_image = req.file.filename;
  let sql = `UPDATE band SET ${name ? `name='${name}',` : ""} ${foundation_year ? `foundation_year='${foundation_year}',` : ""}${band_image ? `band_image='${band_image}'` : ""} WHERE band_id=${band_id}`;
  console.log(sql)
  if (token) {
    connection.query(
      sql,
      (error, results) => {
        if (error) throw error
        res.send(results);
      }
    );
  } else {
    res.status(401).send("no puedes actualizarlo");
  }
};





// //Deleting one band
// bandsController.delete2 = ((req, res) => {
//   const { band_id } = req.params;
//   try {
//     const token = req.headers.authorization.replace("Bearer ", "");
//     let sql = `DELETE from band WHERE band_id = ${band_id}`;
//     if (token) {
//       connection.query(sql, (error, results) => {
//         if (error) console.log(error);
//         res.send(results);
//       });
//     }
//   } catch {
//     res.sendStatus(401);
//   }
// });

module.exports = bandsController;
