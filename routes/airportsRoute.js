const express = require("express");
const airportController = require("../controllers/airportsController");
const Airport = require("../models/airportModel");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const airports = await airportController.getAll();
    res.json(airports);
  } catch (err) {
    res.send(err);
  }
});

router.route("/iata/:code").get(async (req, res) => {
  const code = req.params.code;
  try {
    const airport = await airportController.getByIataCode(code);
    res.json(airport);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const airport = await airportController.getById(id);
    res.json(airport);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  try {
    const airport = await airportController.deleteAirport(id);
    res.json(airport);
  } catch (err) {
    res.send(err);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const newAirport = await airportController.postAirport(req.body);
    res.json(newAirport);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  try {
    const updatedAirport = await airportController.editAirport(id, req.body);
    res.json(updatedAirport);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
