import mongoose from "mongoose";

const transportSchema = new mongoose.Schema({
    mode: { type: String, required: true },
    description: { type: String, required: true },
    
});

const Transport = mongoose.model("Transport", transportSchema);

export default Transport;
