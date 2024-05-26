import Accommodation from "../models/model-accomodation.js";

export default function accommodation(server, mongoose) {
  // GET request to list all accommodations with pagination and filtering
  server.get('/api/accommodations', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Geçerli sayfa
      const pageSize = parseInt(req.query.pageSize) || 10; // Sayfa başına öğe sayısı
      
      // Filtreleme için gerekli parametreler
      const city = req.query.city; // Şehir filtresi

      // Veritabanı sorgusu oluşturma
      let query = Accommodation.find();

      // Şehir filtresini uygulama
      if (city) {
     query = query.where('city').equals(city);
      }

// Verileri sayfalama ve belirli sayfa boyutuna göre alma
const accommodations = await query.skip((page - 1) * pageSize).limit(pageSize);

// Toplam sayfa sayısını hesaplama (countDocuments fonksiyonunu buraya taşıdık)
const totalAccommodations = await Accommodation.countDocuments(query);

// Toplam sayfa sayısını hesaplama
const totalPages = Math.ceil(totalAccommodations / pageSize);

      // Sonuçları döndürme
      res.status(200).json({
        accommodations,
        currentPage: page,
        totalPages,
        totalAccommodations
      });
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

  // PUT request to update an existing accommodation
  server.put("/api/accommodations/:id", async (req, res) => {
    try {
      const { name, city, address, description } = req.body;
      const accommodationId = req.params.id;
      const updatedAccommodation = await Accommodation.findByIdAndUpdate(accommodationId, { name, city, address, description }, { new: true });
      res.status(200).json({ message: "Accommodation updated successfully", accommodation: updatedAccommodation });
    } catch (error) {
      console.error("Error while updating accommodation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // DELETE request to delete an existing accommodation
  server.delete("/api/accommodations/:id", async (req, res) => {
    try {
      const accommodationId = req.params.id;
      await Accommodation.findByIdAndDelete(accommodationId);
      res.status(200).json({ message: "Accommodation deleted successfully" });
    } catch (error) {
      console.error("Error while deleting accommodation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
