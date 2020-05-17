const passport = require("passport");
var multer = require("multer");
const fs = require("fs");

module.exports = (app) => {
  app.post("/register", (req, res, next) => {
    passport.authenticate("register", (err, user, info) => {
      if (err) res.status(200).send({ err: err });
      if (!info) res.status(200).send({ message: user.message });
      else res.status(200).send({ message: info.message });
    })(req, res, next);
  });

  app.post("/login", (req, res, next) => {
    passport.authenticate("login", (err, user, info) => {
      if (err) res.status(500).send({ err });

      if (info) res.status(500).send({ message: info.message });

      res.status(200).send({
        auth: req.body.username,
        token: user.token,
        message: "User Found and logged in",
      });
    })(req, res, next);
  });

  app.get("/token", (req, res, next) => {
    passport.authenticate("jwt", (err, user, info) => {
      if (!user) res.status(400).send({ message: "Error Occured" });
      res.status(200).send({ user });
    })(req, res, next);
  });

  const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      const ext = file.originalname.split(".")[1];
      const name = file.originalname.split(".")[0];
      cb(null, `${name}.${ext}`);
    },
  });
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Not an image! Please upload an image.", false);
    }
  };
  var upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
  });

  app.post("/", upload.single("file"), (req, res, next) => {
    res.status(200).send({
      files: [req.file.originalname],
      baseUrl: "http://localhost:3030/",
      path: "uploads/",
    });
  });

  app.get("/uploads/:image", upload.single("file"), (req, res, next) => {
    let filePath = "uploads/" + req.params.image;
    let contentType = req.params.image.split(".")[1];
    fs.readFile(filePath, function (err, data) {
      if (err) res.status(500).send({ message: "Some error occured" });
      res.setHeader("Content-type", contentType || "text/plain");
      res.end(data);
    });
  });
};
