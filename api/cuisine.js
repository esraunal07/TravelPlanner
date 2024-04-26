//import express from "express";
import Cuisine from "../models/model-cuisine.js";

//const router = express.Router();
export default function cuisine(server, mongoose) {
// GET request to list all cuisines with pagination and filtering
server.get("/api/cuisines", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page
    const pageSize = parseInt(req.query.pageSize) || 10; // Number of elements per page
    const cuisineType = req.query.cuisineType; // Cuisine type filter

    // Query to fetch cuisines
    let query = Cuisine.find();

    // Apply cuisine type filter if provided
    if (cuisineType) {
      query = query.where('type').equals(cuisineType);
    }

    // Pagination
    const totalCuisines = await query.countDocuments();
    const totalPages = Math.ceil(totalCuisines / pageSize);
    const cuisines = await query.skip((page - 1) * pageSize).limit(pageSize);

    // Send response
    res.status(200).json({
      cuisines,
      currentPage: page,
      totalPages,
      totalCuisines
    });
  } catch (error) {
    console.error("Error while retrieving cuisines:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST request to create a new cuisine
server.post("/api/cuisines", async (req, res) => {
  try {
    const { name, type } = req.body;
    if (!name || !type) {
      return res.status(400).json({ message: "Name and type are required fields" });
    }
    const newCuisine = new Cuisine({
      name,
      type
    });
    await newCuisine.save();
    res.status(201).json({ message: "Cuisine created successfully", cuisine: newCuisine });
  } catch (error) {
    console.error("Error while creating cuisine:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

}


