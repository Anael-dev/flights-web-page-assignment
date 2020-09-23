const mongoose = require("mongoose");

const flightsController = require("../controllers/flightsController");
const airportsController = require("../controllers/airportsController");

mongoose.connect("mongodb://localhost:27017/aviationDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.once("open", async () => {
  console.log("DB connected!");

  try {
    const airportsData = await airportsController.getAll();
    if (airportsData.length === 0) {
      const airports = await airportsController.getAirports();
      await db.collection("airports").insertMany(airports);
    }
    const flights = await flightsController.getFlights();
    await db.collection("flights").insertMany(flights);
  } catch (e) {
    console.log(e);
  }
});
