import Attraction from "../models/model-attractions.js";

export default function attractions(server, mongoose) {
    // GET request to list all attractions
    server.get("/api/attractions", async (req, res) => {
        try {
            // Retrieve all attractions from the database
            const attractions = await Attraction.find();
            res.status(200).json({ message: "All attractions retrieved successfully", data: attractions });
        } catch (error) {
            console.error("Error while retrieving attractions:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

      // POST request to create a new attraction
  server.post("/api/attractions", async (req, res) => {
    try {
      const { name, city, location, description } = req.body;
      if (!name || !city || !location || !description) {
        return res.status(400).json({ message: "Name, city, location, and description are required fields" });
      }
      const newAttraction = new Attraction({
        name,
        city,
        location,
        description
      });
      await newAttraction.save();
      res.status(201).json({ message: "Attraction created successfully", attraction: newAttraction });
    } catch (error) {
      console.error("Error while creating attraction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

    // PUT request to update an existing attraction
    server.put("/api/attractions/:id", async (req, res) => {
        try {
            // Update the existing attraction with the given ID
            const updatedAttraction = await Attraction.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedAttraction) {
                return res.status(404).json({ error: "Attraction not found" });
            }
            res.status(200).json({ message: "Attraction updated successfully", data: updatedAttraction });
        } catch (error) {
            console.error("Error while updating attraction:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });

    // DELETE request to delete an existing attraction
    server.delete("/api/attractions/:id", async (req, res) => {
        try {
            // Delete the existing attraction with the given ID
            const deletedAttraction = await Attraction.findByIdAndDelete(req.params.id);
            if (!deletedAttraction) {
                return res.status(404).json({ error: "Attraction not found" });
            }
            res.status(204).json({ message: "Attraction deleted successfully" });
        } catch (error) {
            console.error("Error while deleting attraction:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
