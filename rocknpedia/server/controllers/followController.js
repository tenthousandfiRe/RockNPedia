const express = require("express");
const connection = require("../config/db.js");
const followController = {};


//query for adding a band to user favourites
followController.add = ((req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    const user_id = req.params.user_id
    const follow_id = req.params.follow_id    
    let sql = `INSERT INTO followers (user_id, follow_id) values (${user_id}, ${follow_id});`;
    console.log(sql);
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
followController.get = ((req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    let user_id = req.params.user_id;
    let sql = `SELECT username, user.user_id, user_image FROM user JOIN followers WHERE followers.follow_id = user.user_id and followers.user_id = ${user_id};`;
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

//query for removing a follow 
followController.unfollow = ((req, res) => {
    let { follow_id, user_id } = req.params;
    try {
        const token = req.headers.authorization.replace("Bearer ", "");
        let sql = `DELETE FROM followers WHERE user_id = ${user_id} and follow_id = ${follow_id};`;
        
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


followController.getFollows = ((req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    let user_id = req.params.user_id;
    let sql = `SELECT user.user_id FROM user JOIN followers WHERE followers.follow_id = user.user_id and followers.user_id = ${user_id};`;

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

module.exports = followController;
