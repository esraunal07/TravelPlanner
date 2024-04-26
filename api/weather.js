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

  // POST request to create new weather data
  server.post("/api/weather", async (req, res) => {
    try {
      const { city, temperature, condition } = req.body;
      if (!city || !temperature || !condition) {
        return res.status(400).json({ message: "City, temperature, and condition are required fields" });
      }
      const newWeatherData = new Weather({
        city,
        temperature,
        condition,
      });
      await newWeatherData.save();
      res.status(201).json({ message: "Weather data created successfully", weatherData: newWeatherData });
    } catch (error) {
      console.error("Error while creating weather data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PUT request to update existing weather data
  server.put("/api/weather/:id", async (req, res) => {
    try {
      const weatherDataId = req.params.id;
      const { city, temperature, condition } = req.body;
      const updatedWeatherData = await Weather.findByIdAndUpdate(weatherDataId, {
        city,
        temperature,
        condition,
      }, { new: true });
      if (!updatedWeatherData) {
        return res.status(404).json({ message: "Weather data not found" });
      }
      res.status(200).json({ message: "Weather data updated successfully", weatherData: updatedWeatherData });
    } catch (error) {
      console.error("Error while updating weather data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE request to delete existing weather data
  server.delete("/api/weather/:id", async (req, res) => {
    try {
      const weatherDataId = req.params.id;
      const deletedWeatherData = await Weather.findByIdAndDelete(weatherDataId);
      if (!deletedWeatherData) {
        return res.status(404).json({ message: "Weather data not found" });
      }
      res.status(200).json({ message: "Weather data deleted successfully", weatherData: deletedWeatherData });
    } catch (error) {
      console.error("Error while deleting weather data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
