import Weather from "../models/model-weather.js";

export default function weather(server, mongoose) {
  // GET request to get current weather information for a specific location
  server.get("/api/weather/:location", async (req, res) => {
    try {
      const location = req.params.location;
      const weather = await Weather.findOne({ location });
      if (!weather) {
        return res.status(404).json({ message: "Weather information not found for the specified location" });
      }
      res.status(200).json({ message: "Weather information retrieved successfully", weather });
    } catch (error) {
      console.error("Error while retrieving weather information:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

}
