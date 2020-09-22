import React, { useEffect, useState } from "react";
import "./App.css";
import flightsAPI from "./api/flightsAPI";

function App() {
  const [localDate, setLocalDate] = useState("");
  const [airportData, setAirportData] = useState("");

  useEffect(() => {
    flightsAPI.getAirport().then((response) => {
      console.log(response);
      setAirportData(response.data[0]);
    });

    const usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    console.log("USA time: " + usaTime);
    setLocalDate({
      date: new Date(usaTime).toISOString().slice(0, 10),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/New_York",
      }),
    });
    // console.log("USA time: " + new Date(usaTime).toISOString().slice(0, 10));
    // var string = new Date().toLocaleTimeString([], {
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   timeZone: "America/New_York",
    // });
    // console.log(string);
  }, []);

  useEffect(() => {
    if (localDate !== "") {
      flightsAPI
        .getAllFlights(localDate.date, localDate.time)
        .then((response) => {
          console.log(response);
        });
    }
  }, [localDate]);
  // useEffect(() => {
  //   const formattedDate = new Date(localDate.usaTime.toISOString());
  //   let year = formattedDate.getFullYear();
  //   let month = formattedDate.getMonth() + 1;
  //   let dt = formattedDate.getDate();
  //   if (dt < 10) {
  //     dt = "0" + dt;
  //   }
  //   if (month < 10) {
  //     month = "0" + month;
  //   }
  //   console.log(year + "-" + month + "-" + dt);
  // }, [localDate]);

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
