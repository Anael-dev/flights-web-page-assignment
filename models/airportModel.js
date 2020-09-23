const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let AirportSchema = new Schema({
  airport: String,
  iataCode: String,
  country: String,
  timeZone: String,
});

module.exports = mongoose.model("airports", AirportSchema);
