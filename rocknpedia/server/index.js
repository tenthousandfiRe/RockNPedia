const express = require("express");
const server = express();
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
const sha1 = require("sha1");
const cors = require("cors");
let myKey = "rocknpediakey";

var bandsRouter = require('./routes/bands');
var usersRouter = require('./routes/users');
const connection = require("./config/db.js");


server.use(express.json());
server.use(express.urlencoded());
server.use(cors());

server.post("/auth", (request, response) => {
  const { username, password } = request.body;
  connection.query(
    `SELECT *
      FROM user
      WHERE username = '${username}'
      AND password = sha1('${password}');`,
    function(error, results) {
      if (error) console.log(error);
      else if (results.length) {
        const { isAdmin, id } = results[0]
        // const [{ isAdmin }] = results = esto es igual que results[0]
        const token = jwt.sign({ id, username, isAdmin: isAdmin ? true : false }, myKey); // otra opción más corta (y mejor) para validar isAdmin: Boolean(isAdmin)
        response.send({
          token
        });
      } else {
        response.sendStatus(400);
      }
    }
  );
});





//METIENDO UN NUEVO USUARIO Y CONTROLANDO QUE NO EXISTA
server.post("/users", (req, res, next) => {
  let username = req.body.username;
  let password = sha1(req.body.password);
  connection.query(
    "INSERT INTO usuarios SET?",
    {
      username,
      password
    },
    (err, results) => {
      if (err) {
        res.status(400).send("El usuario ya existe");
      } else {
        connection.query(
          `SELECT id, username FROM usuarios WHERE username = '${username}'`,
          (err, results) => {
            res.send(results[0]);
          }
        );
      }
    }
  );
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const { isAdmin } = jwt.verify(token, myKey);
    let sql = "SELECT id, username, isAdmin FROM usuarios WHERE id = " + id;
    let sql2 = "SELECT id, username FROM usuarios WHERE id = " + id;
    if (isAdmin) {
      connection.query(sql, (error, results) => {
        if (error) console.log(error);
        res.send(results.map (user => ({ ...user, isAdmin: Boolean(user.isAdmin)})));
      });
    }
    else {
      connection.query(sql2, (error, results) => {
        if (error) console.log(error);
        res.send(results);
      });
    }
    
  } catch {
    res.sendStatus(401);
  }
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  let password = sha1(req.body.password);
  let isAdmin = req.body.isAdmin;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const Admin = jwt.verify(token, myKey).isAdmin;
    let sql = "UPDATE usuarios SET? WHERE id = " + id;
    if (Admin) {
      connection.query(sql, { password, isAdmin }, (error, results) => {
        if (error) console.log(error);
        res.send("/users");
      });
    }
    else {
      connection.query(sql, { password }, (error, results) => {
        if (error) console.log(error);
        res.send("/users");
      });
    }
    
  } catch {
    res.sendStatus(401);
  }
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  let password = sha1(req.body.password);
  let isAdmin = req.body.isAdmin;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const Admin = jwt.verify(token, myKey).isAdmin;
    const idUser = jwt.verify(token, myKey).id;
    let sql = "DELETE from usuarios WHERE id = " + id;
    if (Admin) {
      connection.query(sql, { password, isAdmin }, (error, results) => {
        if (error) console.log(error);
        res.send("/users");
      });
    }
    else if (idUser == id) {
      connection.query(sql, { password }, (error, results) => {
        if (error) console.log(error);
        res.send("tu user ha sido borrado");
      });
    }
    else {
      res.send("no eres admin, no puedes borrarlo")
    }
    
  } catch {
    res.sendStatus(401);
  }
});

// books 

server.get("/books", (req, res) => {
  try {
    let sql = "SELECT idBook, title, year from books";
      connection.query(sql, (error, results) => {
        if (error) console.log(error);
        res.send(results);
      });   
  } catch {
    res.sendStatus(401);
  }
});

server.get("/books/:idBook", (req, res) => {
  const { idBook } = req.params;
  console.log(idBook)
  try {
    let sql = "SELECT idBook, title, year FROM books WHERE idBook = " + idBook;
    connection.query(sql, (error, results) => {
      if (error) console.log(error);
      res.send(results);
    });   
} catch {
  res.sendStatus(401);
}
});


server.post("/books", (req, res, next) => {
  let { title, year } = req.body;
  connection.query(
    "INSERT INTO books SET?",
    {
      title,
      year
    },
    (err, results) => {
      if (err) {
        res.status(400).send("libro ya en stock");
      } else {
        connection.query(
          `SELECT idBook, title, year FROM books WHERE title = '${title}'`,
          (err, results) => {
            res.send(results[0]);
          }
        );
      }
    }
  );
});

server.put("/books/:idBook", (req, res, next) => {
  const { idBook } = req.params;
  let title = req.body.title;
  let year = req.body.year;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const Admin = jwt.verify(token, myKey).isAdmin;
    const idUser = jwt.verify (token, myKey).id;
    let sql = "UPDATE books SET? WHERE idBook = " + idBook;
    if (Admin || idUser) {// es redundante pero es para verlo más claro
      connection.query(sql, { title, year }, (error, results) => {
        if (error) console.log(error);
        res.send("tu libro ha sido actualizado");
      });
    }
    else {
      res.send("no puedes actualizarlo primo")
    }
    
  } catch {
    res.sendStatus(401);
  }
});

server.delete("/books/:idBook", (req, res) => {
  const { idBook } = req.params;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    let sql = "DELETE from books WHERE idBook = " + idBook;
    if (token) {
      connection.query(sql, (error, results) => {
        if (error) console.log(error);
        res.send("/books");
      });
    }
    else if (idBook == id) {
      connection.query(sql, { password }, (error, results) => {
        if (error) console.log(error);
        res.send("tu libro ha sido borrado");
      });
    }
    else {
      res.send("no eres admin, no puedes borrarlo")
    }
    
  } catch {
    res.sendStatus(401);
  }
});

// get de los libros del usuario a través de la tabla intermedia
server.get("/userBooks/:id", (req, res) => {
  const { id } = req.params;
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const idUser = jwt.verify(token, myKey).id;
    let sql = "SELECT idBook, title, year FROM books JOIN user_books ON user_books.id_book = books.idBook WHERE user_books.id_user =" + id;
    if (idUser) {
      connection.query(sql, (error, results) => {
        if (error) console.log(error);
        res.send(results);
      });
    }
    else {
      res.send("no puedes acceder primo")
    }
    
  } catch {
    res.sendStatus(401);
  }
});





server.listen(3003);
