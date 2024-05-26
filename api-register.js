import attractions from "./api/attractions.js";
import accommodations from "./api/accommodation.js";
import transports from "./api/transport.js";
import weather from "./api/weather.js";
import cuisines from "./api/cuisine.js";

export default function (server, mongoose) {
  attractions(server, mongoose);
  accommodations(server, mongoose);
  transports(server, mongoose);
  weather(server, mongoose);
  cuisines(server, mongoose);
}


