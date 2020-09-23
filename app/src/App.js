import React, { useEffect, useState } from "react";
import dateUtil from "./utils/dateUtil";
import "./App.css";
import flightsAPI from "./api/flightsAPI";
import airportsAPI from "./api/airportsAPI";
import Flight from "./Flight";

function App() {
  const [airportData, setAirportData] = useState("");
  const [localDate, setLocalDate] = useState("");
  const [localTime, setLocalTime] = useState("");

  const [flights, setFlights] = useState("");

  useEffect(() => {
    airportsAPI.getAirportByCode("JFK").then((response) => {
      setAirportData(response);
    });
    flightsAPI.getAllFlights().then((response) => {
      setFlights(response);
    });
  }, []);

  useEffect(() => {
    setLocalDate(dateUtil.localDate);
    setLocalTime(dateUtil.localTime);
  }, [airportData]);

  return (
    <div className='container'>
      {airportData && (
        <div className='airport-data'>
          <h2>
            {airportData.airport} Airport,
            <span className='info'>
              {airportData.iataCode} {airportData.country}
            </span>
          </h2>
          <div className='airport-details'>
            <h4>
              <i className='fas fa-calendar-day'></i>
              Local time: {localDate}
            </h4>
            <h4>
              <i className='far fa-clock'></i>
              Local date: {localTime}
            </h4>
          </div>
        </div>
      )}

      {flights && (
        <>
          <h2>Flights:</h2>

          <div className='flights'>
            <div className='arrivals'>
              <h3 className='category-title'>
                <i className='fas fa-plane-arrival'></i>
                Arrivals:
              </h3>
              <ul>
                {flights.map((x) => {
                  if (x.isArriving)
                    return (
                      <li key={x._id}>
                        <Flight key={x._id} data={x} />
                      </li>
                    );
                  return null;
                })}
              </ul>
            </div>
            <div className='departures'>
              <h3 className='category-title'>
                <i className='fas fa-plane-departure'></i>
                Departures:
              </h3>
              <ul>
                {flights.map((x) => {
                  if (!x.isArriving)
                    return (
                      <li key={x._id}>
                        <Flight key={x._id} data={x} />
                      </li>
                    );
                  return null;
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
