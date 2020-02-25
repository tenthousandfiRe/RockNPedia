const express = require("express");
const connection = require("../config/db.js");
const likesController = {};


//query for adding a band to user favourites
likesController.like = ((req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    let band_id = req.params.band_id;
    let user_id = req.params.user_id;
    let sql = `INSERT INTO user_likes (band_id, user_id) values (${band_id}, ${user_id});`;
    connection.query
    if (token) {
        connection.query(
            sql,
            (results) => {
                res.send(results);
                console.log(results)
            }
        );
    } else {
        res.status(401);
    }
});

//query for getting results and send the response in order to get the likes of an user;
likesController.get = ((req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    let user_id = req.params.user_id;
    let band_id = req.params.band_id;
    let sql = `SELECT band_id, user_id FROM user_likes WHERE user_likes.band_id = ${band_id} and user_likes.user_id = ${user_id};`;
    console.log(sql)
    connection.query
    if (token) {
        connection.query(
            sql,
            (__, results) => {
                res.send(results);
                console.log(results)
            }
        );
    } else {
        res.status(401);
    }
});

//query for getting the bands indo that an user clicked like;
likesController.getBands = ((req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    let user_id = req.params.user_id;
    let sql = `SELECT band.band_id, band_image, name FROM band join user_likes WHERE band.band_id = user_likes.band_id and user_likes.user_id = ${user_id};`;
    connection.query
    if (token) {
        connection.query(
            sql,
            (__, results) => {
                res.send(results);
                console.log(results)
            }
        );
    } else {
        res.status(401);
    }
});

//query for removing a band from user favourites
likesController.unlike = ((req, res) => {
    let band_id = req.params.band_id;
    let user_id = req.params.user_id;
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        let sql = `DELETE FROM user_likes WHERE band_id = ${band_id} and user_id = ${user_id};`;
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

module.exports = likesController;
