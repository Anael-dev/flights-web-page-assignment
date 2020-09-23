const moment = require("moment-timezone");
const timeZone="America/New_York";

exports.USLocalTime = moment().tz(timeZone).format("YYYY-MM-DD");

exports.getUSLocalTime = (time = null) => {
  if (time) {
    return moment(time).tz(timeZone).format("hh:mm a");
  }
  return moment().tz(timeZone).format("hh:mm a");
};

exports.checkRangeTime = (flight) => {
  const start_time = moment().tz(timeZone).add(1, "hours");
  const end_time = moment().tz(timeZone).add(3, "hours");
  const formattedFlight = moment(flight).tz(timeZone);

  return formattedFlight.isBetween(start_time, end_time);
};
