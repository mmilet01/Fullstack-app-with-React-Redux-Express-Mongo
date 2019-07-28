const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 5000;

/// ????
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-auth-token");
  /*  res.header("Access-Control-Allow-Headers", "x-auth-token");
  res.header("Access-Control-Allow-Headers", "content-type"); */

  next();
};

app.use(allowCrossDomain);
// to here
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Mario:'password'@cluster0-mdyho.mongodb.net/ReactRedux?retryWrites=true",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to mongoDB"))
  .catch(err => console.log(err));

const items = require("./routes/api/items");
const userRegister = require("./routes/api/userRegister");
const userLogin = require("./routes/api/userLogin");
app.use("/api/userRegister", userRegister);
app.use("/api/items", items);
app.use("/api/userLogin", userLogin);

app.listen(port, () => console.log(`listening on port ${port}`));

/* app.get("/", function(req, res) {
  Computer.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

app.post("/", (req, res) => {
  
  console.log(req.body);
  let newComputer = new Computer(req.body);
  newComputer.save().then(item => res.json(item));
});

app.put("/edit/:id", (req, res) => {
  Computer.findByIdAndUpdate({ _id: req.params.id }, req.body).then(item => {
    item.save();
        res.send(item);
     
  });
});

app.delete("/:id", (req, res) => {
  Computer.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
}); */
