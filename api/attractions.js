import Attraction from "../models/model-attractions.js";

export default function attractions(server, mongoose) {
  // GET request to list all attractions with pagination and filtering
  server.get("/api/attractions", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Current page
      const pageSize = parseInt(req.query.pageSize) || 10; // Number of elements per page
      const sortField = req.query.sortField || "_id"; // Fields for sorting
      const sortOrder = req.query.sortOrder || "asc"; // Sorting direction

      const sortOptions = {};
      sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

      let query = Attraction.find();

      // Apply filtering if category is provided
      const category = req.query.category;
      if (category) {
        query = query.where('category').equals(category);
      }

      const totalAttractions = await query.countDocuments();
      const totalPages = Math.ceil(totalAttractions / pageSize);
      const skip = (page - 1) * pageSize;

      const attractions = await query
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize);

      res.status(200).json({
        attractions,
        currentPage: page,
        totalPages,
        totalAttractions
      });
    } catch (error) {
      console.error("Error while retrieving attractions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST request to create a new attraction
  server.post("/api/attractions", async (req, res) => {
    try {
      const { name, category, description } = req.body;
      if (!name || !category || !description) {
        return res.status(400).json({ message: "Name, category, and description are required fields" });
      }
      const newAttraction = new Attraction({
        name,
        category,
        description
      });
      await newAttraction.save();
      res.status(201).json({ message: "Attraction created successfully", attraction: newAttraction });
    } catch (error) {
      console.error("Error while creating attraction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PUT request to update an attraction
  server.put("/api/attractions/:id", async (req, res) => {
    try {
      const { name, category, description } = req.body;
      const attractionId = req.params.id;
      const updatedAttraction = await Attraction.findByIdAndUpdate(attractionId, { name, category, description }, { new: true });
      res.status(200).json({ message: "Attraction updated successfully", attraction: updatedAttraction });
    } catch (error) {
      console.error("Error while updating attraction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE request to delete an attraction
  server.delete("/api/attractions/:id", async (req, res) => {
    try {
      const attractionId = req.params.id;
      await Attraction.findByIdAndDelete(attractionId);
      res.status(200).json({ message: "Attraction deleted successfully" });
    } catch (error) {
      console.error("Error while deleting attraction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
