const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/user");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Enter all fields");
  }
  User.findOne({ email }).then(user => {
    if (!user) {
      return res
        .status(400)
        .json({ msg: "User with that email does not exist" });
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid email or password" });
        } else {
          jwt.sign({ user }, "mySecret", { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;
            res.json({ user, token });
          });
        }
      });
    }
  });
});

router.get("/", auth, (req, res) => {
  const { email } = req.user.user;
  User.findOne({ email })
    .then(user => {
      const { username, email } = user;
      const existingUser = { username, email };
      res.json(existingUser);
    })
    .catch(err =>
      res.status(400).json({ err: "something went terribly wrong" })
    );
});

module.exports = router;
