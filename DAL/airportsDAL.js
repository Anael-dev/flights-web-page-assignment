const axios = require("axios");
const BASE_URL = "http://api.aviationstack.com/v1";

exports.getAllAirports = async () => {
  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    iata_code: "JFK",
  };
  try {
    const response = await axios.get(`${BASE_URL}/airports`, {
      params,
    });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
