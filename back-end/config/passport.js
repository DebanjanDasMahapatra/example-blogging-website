const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const BCRYPT_SALT_ROUNDS = 12;

const User = require("../src/services/UserService");

const users = [];

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: false
    },
    (req, username, password, done) => {
      console.log("username", username);
      console.log("password", password);
      const user = users.find(user => user.username === username);
      console.log("user", user);
      if (user !== undefined) {
        return done(null, false, { message: "User already exists" });
      }

      users.push({
        ...req.body
      });

      return done(null, users);
    }
  )
);

// passport.serializeUser((users, done) => done(null, users));
// passport.deserializeUser((users, done) => {
//   return done(null, users);
// });

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: false
    },
    (req, username, password, done) => {
      try {
        console.log("Users  ", users);
        const user = users.find(user => user.username === username);
        //   .then(user => {
        //     if (user.password !== password) {
        //       return done(null, false, { message: "incorrect Password" });
        //     }
        //     console.log("User Found  ", user);
        //     return done(null, user);
        //   });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);
