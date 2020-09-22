import React, { useEffect, useState } from "react";
import dateUtil from "./utils/dateUtil";
import "./App.css";
import flightsAPI from "./api/flightsAPI";
import Flight from "./Flight";

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
    <div className='container'>
      {airportData && (
        <div className='airport-data'>
          <h2>
            {airportData.airport_name} Airport,
            <span className='info'>
              {airportData.city_iata_code} {airportData.country_name}
            </span>
          </h2>
          <div className='airport-details'>
            <h4>Local time: {localDate.time}</h4>
            <h4>Local date: {localDate.date}</h4>
          </div>
        </div>
      )}

      {flights && (
        <>
          <h2>Flights:</h2>

          <div className='flights'>
            <div className='arrivals'>
              <h3 className='category-title'>Arrivals:</h3>
              <ul>
                {flights.arriving.map((x, i) => {
                  return (
                    <li key={i}>
                      <li key={i}>
                        <Flight key={i} data={x} isArriving={true} />
                      </li>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className='departures'>
              <h3 className='category-title'>Departures:</h3>
              <ul>
                {flights.departing.map((x, i) => {
                  return (
                    <li key={i}>
                      <Flight key={i} data={x} isArriving={false} />
                    </li>
                  );
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
