import Transport from "../models/model-transport.js";

export default function transport(server, mongoose) {
  // GET request to list all transportation options
  server.get("/api/transports", async (req, res) => {
    try {
      const transports = await Transport.find();
      res.status(200).json({ message: "All transportation options retrieved successfully", transports });
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

  
}
