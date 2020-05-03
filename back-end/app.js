var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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

// parse application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose
  .connect("mongodb://localhost:27017/newDb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

//get all routes for User
require("./routes/users")(app);

app.post("/register", (req, res, next) => {
  passport.authenticate("register", (err, user, info) => {
    console.log("Request User", user);

    res.status(200).send({ message: "User is registered" });
  })(req, res, next);
});
const secret = "Secret1234";

app.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    console.log("Logged in ", user);
    const token = jwt.sign({ id: user.username }, secret, {
      expiresIn: 60 * 60
    });

    res
      .status(200)
      .send({ auth: true, token, message: "User Found and logged in" });
  })(req, res, next);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log(err.message);
  res.locals.message = err.message;
  //res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log("Starting server at ..localhost:" + app.get("port"));
});
module.exports = app;
