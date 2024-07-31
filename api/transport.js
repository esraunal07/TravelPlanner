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

      // Toplam sayıyı ve sayfaları hesapla
      const totalTransports = await Transport.countDocuments(query.getQuery());
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

// Gerekli kütüphanelerin içe aktarılması
const express = require('express');
const mongoose = require('mongoose');
const Transport = require('./models/Transport'); // Transport modelinizin doğru yolu

const server = express();
server.use(express.json());

// MongoDB'ye bağlantı
mongoose.connect('mongodb://localhost:27017/travelplanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// POST isteği ile yeni bir taşıma seçeneği oluşturma
server.post('/api/transports', async (req, res) => {
  try {
    const { mode, description } = req.body;

    // Alanların doğrulanması
    if (!mode || !description) {
      return res.status(400).json({ message: 'Mode and description are required fields' });
    }

    // Yeni bir ObjectId oluşturulması
    const newTransport = new Transport({
      _id: new mongoose.Types.ObjectId(),
      mode,
      description,
    });

    // Veritabanına kaydetme
    await newTransport.save();

    // Başarılı yanıt
    res.status(201).json({ message: 'Transportation option created successfully', transport: newTransport });
  } catch (error) {
    console.error('Error while creating transportation option:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sunucuyu dinleme
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});


  // PUT request to update an existing transportation option
server.put("/api/transports/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { mode, description } = req.body;

    // Validate input
    if (!mode || !description) {
      return res.status(400).json({ message: "Mode and description are required fields." });
    }

    // Update the transportation option in the database
    const updatedTransport = await Transport.findByIdAndUpdate(
      id,
      { mode, description },
      { new: true } // Returns the updated document
    );

    if (!updatedTransport) {
      return res.status(404).json({ message: "Transport not found." });
    }

    // Success response
    res.status(200).json({
      message: "Transportation option updated successfully.",
      transport: updatedTransport
    });
  } catch (error) {
    console.error("Error while updating transportation option:", error);
    res.status(500).json({ message: "Internal server error." });
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