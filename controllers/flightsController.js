const flightsDAL = require("../DAL/flightsDAL");
const Flight = require("../models/flightModel");
const dateUtil = require("../utils/dateUtil");

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    Flight.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.getFlights = async () => {
  const date = dateUtil.USLocalTime;

  ///Arriving Flight BL
  const arrFlights = await flightsDAL.getAllArrivingFlights();
  const filteredArrFlights = arrFlights.data.filter(
    (x) =>
      x.flight_date === date &&
      x.flight_status === ("scheduled" || "active") &&
      dateUtil.checkRangeTime(x.arrival.scheduled)
  );
  const mappedArrFlights = filteredArrFlights.map((x) => {
    return {
      iataCode: x.flight.iata,
      time: dateUtil.getUSLocalTime(x.arrival.scheduled),
      isArriving: true,
    };
  });

  ///Departing Flights BL
  const depFlights = await flightsDAL.getAllDepartingFlights();
  const filteredDepFlights = depFlights.data.filter(
    (x) =>
      x.flight_date === date &&
      x.flight_status === ("scheduled" || "active") &&
      dateUtil.checkRangeTime(x.departure.scheduled)
  );
  const mappedDepFlights = filteredDepFlights.map((x) => {
    return {
      iataCode: x.flight.iata,
      time: dateUtil.getUSLocalTime(x.departure.scheduled),
      isArriving: false,
    };
  });
  return [...mappedArrFlights, ...mappedDepFlights];
};

exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    Flight.findById(id, function (err, flight) {
      if (err) {
        reject(err);
      } else {
        resolve(flight);
      }
    });
  });
};

exports.deleteFlight = (id) => {
  return new Promise((resolve, reject) => {
    Flight.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("deleted");
      }
    });
  });
};

exports.postFlight = (reqBody) => {
  const newFlight = new Flight(reqBody);
  return new Promise((resolve, reject) => {
    newFlight.save(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.editFlight = (id, reqBody) => {
  return new Promise((resolve, reject) => {
    Flight.findByIdAndUpdate(id, reqBody, function (err, flight) {
      if (err) {
        reject(err);
      } else {
        resolve(flight);
      }
    });
  });
};
