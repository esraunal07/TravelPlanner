import express from "express";
import mongoose from "mongoose";
import apiRegister from "./api-register.js";


const server = express();
const port = 3000;

server.use(express.json());

mongoose.connect("mongodb+srv://gesraunal:esra0789@cluster0.qz4pl3b.mongodb.net/TravelPlanner", {
 
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

apiRegister(server, mongoose);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

