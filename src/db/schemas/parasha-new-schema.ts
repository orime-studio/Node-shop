import { Schema } from "mongoose";
import imageSchema from "./image-schema";

const longTextSchema = new Schema({
    title: { type: String, required: false },
    text: { type: String, required: true },
});

// Define the schema for Parasha
const NewParashaSchema = new Schema({
    source: { type: String, required: true },
    image: { type: imageSchema, required: true },
    alt: { type: String, required: false },
    title: { type: String, required: true },
    miniText: { type: String, required: true },
    longText: { type: [longTextSchema], required: true },
    createdAt: { type: Date, default: Date.now },

});

export default NewParashaSchema;