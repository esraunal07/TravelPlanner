import mongoose from "mongoose";

const accommodationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String, required: true },
    
});

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

export default Accommodation;
