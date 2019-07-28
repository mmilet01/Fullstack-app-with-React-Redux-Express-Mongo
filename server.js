const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 5000;

const Computer = require("./models/computer");
/// ????
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);
// to here
app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://Mario:'password'@cluster0-mdyho.mongodb.net/ReactRedux?retryWrites=true"
  )
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

app.get("/", function(req, res) {
  Computer.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

app.post("/", (req, res) => {
  /* const newComputer = new Computer({
    name: req.body.name,
    processor: req.body.processor,
    operatingSystem: req.body.operatingSystem,
    graphics: req.body.graphics,
    RAM: req.body.RAM,
    SSD: req.body.SSD,
    price: req.body.price
  }); */
  console.log(req.body);
  let newComputer = new Computer(req.body);
  newComputer.save().then(item => res.json(item));
});

app.put("/edit/:id", (req, res) => {
  Computer.findByIdAndUpdate({ _id: req.params.id }, req.body).then(item => {
    item.save();
    /*     res.send(item);
     */
  });
});

app.post(`/addGrade/:id`, (req, res) => {
  Computer.findById(req.params.id).then(item => {
    item.ocjene.push(req.body.number);
    item.save();
  });
});

app.delete("/:id", (req, res) => {
  Computer.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

app.listen(port, () => console.log(`listening on port ${port}`));
