var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");
var cors = require("cors");
require("dotenv").config();

require("./config/passport");

var app = express();
app.set("port", process.env.port || 3000);
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());
// parse application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//get all routes for User
require("./routes/users")(app);
require("./routes/index")(app);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.log("ERR", err);
  res.locals.message = err.message;

  res.status(err.status || 500);
  res.send({ err });
});

module.exports = app;
