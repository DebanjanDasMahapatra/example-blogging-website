// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = app => {
  const users = require("../src/services/UserService");

  // Create a new User
  app.post("/users", users.create);

  // // Retrieve all Users
  app.get("/users", users.findAll);

  // Retrieve a single User with userId
  app.get("/users/:userId", users.findOne);

  // // Update a Note with noteId
  // app.put('/notes/:noteId', notes.update);

  // // Delete a Note with noteId
  // app.delete('/notes/:noteId', notes.delete);
};

// module.exports = router;
