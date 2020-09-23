const airportsDAL = require("../DAL/airportsDAL");
const Airport = require("../models/airportModel");
const dateUtil = require("../utils/dateUtil");

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    Airport.find({}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.getAirports = async () => {
  const response = await airportsDAL.getAllAirports();
  const mappedAirports = response.data.map((x) => {
    return {
      airport: x.airport_name,
      iataCode: x.iata_code,
      country: x.country_name,
      timeZone: x.timezone,
    };
  });
  return mappedAirports;
};

exports.getByIataCode = (code) => {
  return new Promise((resolve, reject) => {
    Airport.findOne({ iataCode: code }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    Airport.findById(id, function (err, airport) {
      if (err) {
        reject(err);
      } else {
        resolve(airport);
      }
    });
  });
};

exports.deleteAirport = (id) => {
  return new Promise((resolve, reject) => {
    Airport.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("deleted");
      }
    });
  });
};

exports.postAirport = (reqBody) => {
  const newAirport = new Airport(reqBody);
  return new Promise((resolve, reject) => {
    newAirport.save(function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.editAirport = (id, reqBody) => {
  return new Promise((resolve, reject) => {
    Airport.findByIdAndUpdate(id, reqBody, function (err, airport) {
      if (err) {
        reject(err);
      } else {
        resolve(airport);
      }
    });
  });
};
