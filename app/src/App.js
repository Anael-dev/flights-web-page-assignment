import React, { useEffect, useState } from "react";
import dateUtil from "./utils/dateUtil";
import "./App.css";
import flightsAPI from "./api/flightsAPI";

function App() {
  const [localDate, setLocalDate] = useState("");
  const [airportData, setAirportData] = useState("");
  const [flights, setFlights] = useState("");

  useEffect(() => {
    flightsAPI.getAirport().then((response) => {
      console.log(response);
      setAirportData(response.data[0]);
    });

    setLocalDate({
      date: dateUtil.USLocalTime,
      time: dateUtil.getUSTime(),
    });
  }, []);

  useEffect(() => {
    if (localDate !== "") {
      flightsAPI.getMappedFlights().then((response) => {
        console.log(response);
        setFlights(response);
      });
    }
  }, [localDate]);

  return (
    <div className='App'>
      {airportData && (
        <div className='airport-info'>
          <h2>
            {airportData.airport_name} airport,
            {airportData.city_iata_code} {airportData.country_name}
          </h2>
          <h3>Local time: {localDate.time}</h3>
          <h3>Local date: {localDate.date}</h3>
        </div>
      )}
      <h3>Flights Data:</h3>
    </div>
  );
}

export default App;
