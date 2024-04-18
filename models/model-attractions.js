import mongoose from "mongoose";

const attractionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    
});

const Attraction = mongoose.model("Attraction", attractionSchema);

export default Attraction;
