import moment from "moment-timezone";

const USLocalTime = moment().tz("America/New_York").format("YYYY-MM-DD");

const getUSTime = (time = null) => {
  if (time) {
    return moment(time).tz("America/New_York").format("hh:mm a");
  }
  return moment().tz("America/New_York").format("hh:mm a");
};

const checkRangeTime = (flight) => {
  const start_time = moment().tz("America/New_York").add(1, "hours");
  const end_time = moment().tz("America/New_York").add(3, "hours");
  const formattedFlight = moment(flight).tz("America/New_York");

  return formattedFlight.isBetween(start_time, end_time);
};

export default { USLocalTime, checkRangeTime, getUSTime };
