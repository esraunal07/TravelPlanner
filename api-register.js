import attractions from "./api/attractions.js";
import accommodation from "./api/accommodation.js";
import transport from "./api/transport.js";
import weather from "./api/weather.js";
import cuisine from "./api/cuisine.js";

export default function (server, mongoose) {
  attractions(server, mongoose);
  accommodation(server, mongoose);
  transport(server, mongoose);
  weather(server, mongoose);
  cuisine(server, mongoose);
}
