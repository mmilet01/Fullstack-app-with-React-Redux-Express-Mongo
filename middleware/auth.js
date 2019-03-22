// na temelju tokena, vracamo usera iz baze podataka
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  jwt.verify(token, "mySecret", (err, decoded) => {
    if (err) {
      return res.status(400).json({ error: "error jwt verify" });
    } else {
      req.user = decoded;
      next();
    }
  });
}

module.exports = auth;
