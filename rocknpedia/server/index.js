const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const sha1 = require("sha1");
const cors = require("cors");
let myKey = "rocknpediakey";

var bandsRouter = require('./routes/bands');
var usersRouter = require('./routes/users.js');
var albumsRouter = require('./routes/albums.js');
const connection = require("./config/db.js");


server.use(express.json());
server.use(express.urlencoded());
server.use(express.static("public"));
server.use(cors());



server.use('/users', usersRouter)
server.use('/bands', bandsRouter, albumsRouter);


server.listen(3003);
