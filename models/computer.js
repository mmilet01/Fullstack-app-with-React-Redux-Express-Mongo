const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Creating Schema

const computerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  processor: {
    type: String,
    required: true
  },
  operatingSystem: {
    type: String,
    required: true
  },
  graphics: {
    type: String,
    required: true
  },
  RAM: {
    type: Number,
    required: true
  },
  SSD: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  ocjene: {
    type: Array,
    default: []
  },
  recenzije: {
    type: Array,
    default: []
  },
  date: {
    type: Date,
    default: new Date()
  }
  /* favorite: {
    type: Boolean,
    default: false
  } */
});

module.exports = computers = mongoose.model("computers", computerSchema);
