import moment from "moment-timezone";

const localDate = moment().tz("America/New_York").format("YYYY-MM-DD");

const localTime = moment().tz("America/New_York").format("hh:mm a");

export default { localDate, localTime };
