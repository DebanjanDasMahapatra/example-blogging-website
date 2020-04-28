const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    mobileNumber: String,
    email: String,
    password: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
