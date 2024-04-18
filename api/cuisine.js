import Cuisine from "../models/model-cuisine.js";

export default function cuisine(server, mongoose) {
  // GET request to list all cuisines
  server.get("/api/cuisines", async (req, res) => {
    try {
      const cuisines = await Cuisine.find();
      res.status(200).json({ message: "All cuisines retrieved successfully", cuisines });
    } catch (error) {
      console.error("Error while retrieving cuisines:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST request to create a new cuisine
  server.post("/api/cuisines", async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        return res.status(400).json({ message: "Name and description are required fields" });
      }
      const newCuisine = new Cuisine({
        name,
        description
      });
      await newCuisine.save();
      res.status(201).json({ message: "Cuisine created successfully", cuisine: newCuisine });
    } catch (error) {
      console.error("Error while creating cuisine:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  
}
