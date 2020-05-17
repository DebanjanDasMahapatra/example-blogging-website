const bcrypt = require("bcrypt");

const salt = parseInt(process.env.BCRYPT_SALT_ROUNDS);

exports.getHashedPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hashPassword) => {
      if (err) reject(err);
      resolve(hashPassword);
    });
  });
};

exports.validatePassword = (password, hashPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, hashPassword)
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};
