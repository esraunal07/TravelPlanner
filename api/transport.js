import Transport from "../models/model-transport.js";

export default function transport(server, mongoose) {
  // GET request to list all transportation options with pagination and filtering
  server.get("/api/transports", async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Current page
      const pageSize = parseInt(req.query.pageSize) || 10; // Number of elements per page
      const sortField = req.query.sortField || "_id"; // Fields for sorting
      const sortOrder = req.query.sortOrder || "asc"; // Sorting direction

      const sortOptions = {};
      sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

      let query = Transport.find();

      // Apply filtering if mode is provided
      const mode = req.query.mode;
      if (mode) {
        query = query.where('mode').equals(mode);
      }

      const totalTransports = await query.countDocuments();
      const totalPages = Math.ceil(totalTransports / pageSize);
      const skip = (page - 1) * pageSize;

      const transports = await query
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize);

      res.status(200).json({
        transports,
        currentPage: page,
        totalPages,
        totalTransports
      });
    } catch (error) {
      console.error("Error while retrieving transportation options:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // POST request to create a new transportation option
  server.post("/api/transports", async (req, res) => {
    try {
      const { mode, description } = req.body;
      if (!mode || !description) {
        return res.status(400).json({ message: "Mode and description are required fields" });
      }
      const newTransport = new Transport({
        mode,
        description
      });
      await newTransport.save();
      res.status(201).json({ message: "Transportation option created successfully", transport: newTransport });
    } catch (error) {
      console.error("Error while creating transportation option:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // PUT request to update a transportation option
  server.put("/api/transports/:id", async (req, res) => {
    try {
      const { mode, description } = req.body;
      const transportId = req.params.id;
      const updatedTransport = await Transport.findByIdAndUpdate(transportId, { mode, description }, { new: true });
      res.status(200).json({ message: "Transportation option updated successfully", transport: updatedTransport });
    } catch (error) {
      console.error("Error while updating transportation option:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE request to delete a transportation option
  server.delete("/api/transports/:id", async (req, res) => {
    try {
      const transportId = req.params.id;
      await Transport.findByIdAndDelete(transportId);
      res.status(200).json({ message: "Transportation option deleted successfully" });
    } catch (error) {
      console.error("Error while deleting transportation option:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
