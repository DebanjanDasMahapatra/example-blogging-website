const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    _id: Number,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    active: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
