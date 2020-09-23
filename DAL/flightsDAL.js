const axios = require("axios");
const BASE_URL = "http://api.aviationstack.com/v1";

exports.getAllArrivingFlights = async () => {
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    arr_iata: "JFK",
  };
  try {
    const response = await axios.get(`${BASE_URL}/flights`, {
      params,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

exports.getAllDepartingFlights = async () => {
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    dep_iata: "JFK",
  };
  try {
    const response = await axios.get(`${BASE_URL}/flights`, {
      params,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
