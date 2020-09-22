import React, { useState } from "react";

export default function Flight({ data, isArriving }) {
  const [moreInfo, setMoreInfo] = useState(false);
  return (
    <div>
      <button onClick={() => setMoreInfo(!moreInfo)}>{data.iataCode}</button>
      <span className={moreInfo ? "time show-info" : "time hide-info"}>
        {isArriving
          ? ` Arriving at ${data.time}`
          : ` Departure at ${data.time}`}
      </span>
    </div>
  );
}
