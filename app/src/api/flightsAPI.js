import axios from "axios";
const BASE_URL = "http://api.aviationstack.com/v1";

const getAllArrivingFlights = async () => {
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

const getAllDepartingFlights = async () => {
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

const getAllFlights = async (date, time) => {
  console.log(date);
  console.log(time);
  const arrFlights = await getAllArrivingFlights();
  const filteredFlights = arrFlights.data.filter((x) => x.flight_date === date);
  console.log(filteredFlights.length);
  const depFlights = await getAllDepartingFlights();
  return { arrFlights, depFlights };
};
const getAirport = async () => {
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

export default { getAllFlights, getAirport };
