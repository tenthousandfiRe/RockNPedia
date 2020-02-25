const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const sha1 = require("sha1");
const cors = require("cors");
let myKey = "rocknpediakey";

let bandsRouter = require('./routes/bands');
let usersRouter = require('./routes/users.js');
let albumsRouter = require('./routes/albums.js');
let reviewsRouter = require('./routes/reviews.js');
let likesRouter = require('./routes/likes.js');
let followRouter = require('./routes/followers.js');


server.use(express.json());
server.use(express.urlencoded());
server.use(express.static("public"));
server.use(cors());



server.use('/users', usersRouter, followRouter)
server.use('/bands', bandsRouter, albumsRouter, likesRouter);
server.use('/reviews', reviewsRouter);


server.listen(3003);
