const User = require("../models/UserModel");

exports.create = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "User Data cannot be empty"
    });
  }

  const user = new User({
    ...req.body
  });

  user
    .save()
    .then(data => {
      res.send(data);
      console.log("User Saved Successfully");
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Internal Server Error"
      });
    });
};

exports.findAll = (req, res) => {
  User.find()
    .then(users => res.send(users))
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving notes."
      });
    });
};

exports.findOne = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "Note not found with id " + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.userId
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.userId
      });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty"
    });
  }

  //   User.findByIdAndUpdate(
  //     req.params.userId,
  //     {
  //       title: req.body.title || "Untitled Note",
  //       content: req.body.content
  //     },
  //     { new: true }
  //   )
  //     .then(note => {
  //       if (!note) {
  //         return res.status(404).send({
  //           message: "Note not found with id " + req.params.noteId
  //         });
  //       }
  //       res.send(note);
  //     })
  //     .catch(err => {
  //       if (err.kind === "ObjectId") {
  //         return res.status(404).send({
  //           message: "Note not found with id " + req.params.noteId
  //         });
  //       }
  //       return res.status(500).send({
  //         message: "Error updating note with id " + req.params.noteId
  //       });
  //     });
};

exports.delete = (req, res) => {
  //   Note.findByIdAndRemove(req.params.noteId)
  //     .then(note => {
  //       if (!note) {
  //         return res.status(404).send({
  //           message: "Note not found with id " + req.params.noteId
  //         });
  //       }
  //       res.send({ message: "Note deleted successfully!" });
  //     })
  //     .catch(err => {
  //       if (err.kind === "ObjectId" || err.name === "NotFound") {
  //         return res.status(404).send({
  //           message: "Note not found with id " + req.params.noteId
  //         });
  //       }
  //       return res.status(500).send({
  //         message: "Could not delete note with id " + req.params.noteId
  //       });
  //     });
};
