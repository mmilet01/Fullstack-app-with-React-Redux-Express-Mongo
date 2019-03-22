const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Computer = require("../../models/computer");

router.get("/", (req, res) => {
  Computer.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

router.post("/", (req, res) => {
  const newComputer = new Computer(req.body);
  newComputer.save();
});

router.delete("/delete/:id", auth, (req, res) => {
  const { username } = req.user.user;
  console.log(username);
  if (username == "mmilet") {
    Computer.findById(req.params.id)
      .then(item => item.remove())
      .then(() => res.json("success"))
      .catch(err => res.status(404).json(err));
  } else {
    res.status(400).json({ err: "you cant do that" });
  }
});

router.put("/edit/:id", (req, res) => {
  Computer.findOneAndUpdate({ _id: req.params.id }, req.body).then(item =>
    item.save()
  );
});

router.post(`/addGrade/:id`, (req, res) => {
  Computer.findById(req.params.id).then(item => {
    item.ocjene.push(req.body.number);
    item.save();
  });
});

module.exports = router;
