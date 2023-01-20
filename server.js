/*********************************************************************************
 *  WEB422 – Assignment 1
 *  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Vishal Kataria, Student ID: 123094211, Date: Jan 20, 2022
 *  Cyclic Link: 
 *
 ********************************************************************************/

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", function (req, res) {
  res.json({ message: "API Listening" });
});

app.post("/api/movies", (req, res) => {
  db.addMovie(req.body)
    .then((data) => {
      res.status(200).json("New Movie added");
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

app.get("/api/movies", (req, res) => {
  db.getAllMovies(req.query.page, req.query.perPage, req.query.title)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

app.get("/api/movies/:id", (req, res) => {
  db.getMovieById(req.params.id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

app.put("/api/movies/:id", (req, res) => {
  db.updateMovieById(req.body, req.body._id)
    .then((data) => {
      res.status(200).json("Movie updated");
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

app.delete("/api/movies/:id", (req, res) => {
  db.deleteMovieById(req.params.id)
    .then((data) => {
      res.status(200).json("Movie deleted");
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
});

// listen for requests :)
db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
