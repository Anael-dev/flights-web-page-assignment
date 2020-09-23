const express = require("express");
const flightsController = require("../controllers/flightsController");
const Flight = require("../models/flightModel");

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const flights = await flightsController.getAll();
    res.json(flights);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const flight = await flightsController.getById(id);
    res.json(flight);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").delete(async (req, res) => {
  const id = req.params.id;
  try {
    const flight = await flightsController.deleteFlight(id);
    res.json(flight);
  } catch (err) {
    res.send(err);
  }
});

router.route("/").post(async (req, res) => {
  try {
    const newFlight = await flightsController.postFlight(req.body);
    res.json(newFlight);
  } catch (err) {
    res.send(err);
  }
});

router.route("/:id").put(async (req, res) => {
  const id = req.params.id;
  try {
    const updatedFlight = await flightsController.editFlight(id, req.body);
    res.json(updatedFlight);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
