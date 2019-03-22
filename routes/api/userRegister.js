const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

router.post("/", (req, res) => {
  const { email, password, username } = req.body;
  console.log(req.body);
  if (!email || !password || !username) {
    return res.status(400).json({ msg: "All fields required" });
  }

  User.findOne({ email }).then(isFound => {
    if (isFound) {
      res.status(400).json({ msg: "Email already in use" });
    } else {
      const newUser = new User({
        email,
        password,
        username
      });

      bcrypt.genSalt(10).then(salt => {
        bcrypt.hash(password, salt).then(hashedPW => {
          newUser.password = hashedPW;
          newUser.save().then(user =>
            jwt.sign(
              { user },
              "mySecret",
              { expiresIn: "10h" },
              (err, token) => {
                if (err) throw err;
                res.json({ token, user });
              }
            )
          );
        });
      });
    }
  });
});

module.exports = router;
