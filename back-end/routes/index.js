const passport = require("passport");

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

  app.get("/user", (req, res, next) => {
    passport.authenticate("jwt", (err, user, info) => {
      if (!user) res.status(400).send({ message: "Error Occured" });
      res.status(200).send({ user });
    })(req, res, next);
  });
};
