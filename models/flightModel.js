const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let FlightSchema = new Schema({
  iataCode: String,
  time: String,
  isArriving: Boolean,
});

module.exports = mongoose.model("flights", FlightSchema);
