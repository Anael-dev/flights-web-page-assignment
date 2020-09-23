const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const airportsRoute = require("./routes/airportsRoute");
const flightsRoute = require("./routes/flightsRoute");

let app = express();
app.use(cors());

require("./configs/database");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/airports", airportsRoute);
app.use("/api/flights", flightsRoute);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static("app/build"));

  // Handle React routing, return all requests to React app
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "app/build", "index.html"));
  });
}

const port = process.env.PORT || 8000;

app.listen(port, console.log(`Server is running at ${port}`));
