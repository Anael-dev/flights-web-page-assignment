import axios from "axios";
import dateUtil from "../utils/dateUtil";
const BASE_URL = "http://api.aviationstack.com/v1";

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

const getMappedFlights = async () => {
  const date = dateUtil.USLocalTime;

  ///Arriving Flight BL
  const arrFlights = await getAllArrivingFlights();
  const filteredArrFlights = arrFlights.data.filter(
    (x) =>
      x.flight_date === date &&
      x.flight_status === ("scheduled" || "active") &&
      dateUtil.checkRangeTime(x.arrival.scheduled)
  );
  const mappedArrFlights = filteredArrFlights.map((x) => {
    return {
      iataCode: x.flight.iata,
      time: dateUtil.getUSTime(x.arrival.scheduled),
    };
  });

  ///Departing Flights BL
  const depFlights = await getAllDepartingFlights();
  const filteredDepFlights = depFlights.data.filter(
    (x) =>
      x.flight_date === date &&
      x.flight_status === ("scheduled" || "active") &&
      dateUtil.checkRangeTime(x.departure.scheduled)
  );
  const mappedDepFlights = filteredDepFlights.map((x) => {
    return {
      iataCode: x.flight.iata,
      time: dateUtil.getUSTime(x.departure.scheduled),
    };
  });

  return { arriving: mappedArrFlights, departing: mappedDepFlights };
};

export default { getMappedFlights, getAirport };
