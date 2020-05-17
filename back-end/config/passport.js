const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const User = require("../src/models/UserModel");
const UserService = require("../src/services/UserService");
const bcryptService = require("../src/services/bcryptServices");

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    (req, username, password, done) => {
      const query = { email: username };

      try {
        User.find(query).then(async (result) => {
          if (result.length == 0) {
            const hashedPassword = await bcryptService.getHashedPassword(
              password
            );
            const success = await UserService.create(req.body, hashedPassword);
            return success === "success"
              ? done(null, { message: "User saved Successfully" })
              : done(null, {}, { message: "Some error Occurred" });
          } else {
            return done(
              null,
              {},
              { message: "User already Exists in the system" }
            );
          }
        });
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    (req, username, password, done) => {
      const query = { email: username };

      try {
        User.find(query)
          .then(async (result) => {
            if (result.length == 0) {
              return done(
                null,
                {},
                { message: "User not found active in the system" }
              );
            } else {
              const hashedPassword = result[0]._doc.password;
              const validUser = await bcryptService.validatePassword(
                password,
                hashedPassword
              );

              if (validUser) {
                const token = jwt.sign(
                  { id: result[0].email },
                  process.env.JWT_SECRET
                );

                return done(null, { token });
              } else {
                return done(null, {}, { message: "Incorrect Password" });
              }
            }
          })
          .catch((err) => done(err));
      } catch (err) {
        done(err);
      }
    }
  )
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    const query = { email: jwt_payload.id };
    try {
      User.find(query).then((user) => {
        if (user.length != 0) {
          console.log("user found in db ");
          done(null, user[0]);
        } else {
          console.log("user not found in db");
          done(null, false);
        }
      });
    } catch (err) {
      done(err);
    }
  })
);
