import Accommodation from "../models/model-accomodation.js";

export default function accommodation(server, mongoose) {
  // GET request to list all accommodations
  server.get("/api/accommodations", async (req, res) => {
    try {
      const accommodations = await Accommodation.find();
      res.status(200).json({ message: "All accommodations retrieved successfully", accommodations });
    } catch (error) {
      console.error("Error while retrieving accommodations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST request to create a new accommodation
  server.post("/api/accommodations", async (req, res) => {
    try {
      const { name, city, address, description } = req.body;
      if (!name || !city || !address || !description) {
        return res.status(400).json({ message: "Name, city, address, and description are required fields" });
      }
      const newAccommodation = new Accommodation({
        name,
        city,
        address,
        description
      });
      await newAccommodation.save();
      res.status(201).json({ message: "Accommodation created successfully", accommodation: newAccommodation });
    } catch (error) {
      console.error("Error while creating accommodation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

}
