const passport = require("passport");
const UserService = require("../src/services/UserService");

module.exports = (app) => {
  // Update a Note with noteId
  app.put("/users", (req, res, next) => {
    passport.authenticate("jwt", async (err, user, info) => {
      if (!user) res.status(400).send({ message: "No user found" });
      const updateRequest = {
        _id: user._id,
        email: user.email,
        password: user.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      };
      const response = await UserService.update(updateRequest);
      if (response.message === "success") {
        res.status(200).send({ message: "User updated Successfully" });
      } else {
        res.status(200).send({ response });
      }
    })(req, res, next);
  });

  // Delete a Note with noteId
  app.delete("/users", (req, res) => {});
};

// module.exports = router;
