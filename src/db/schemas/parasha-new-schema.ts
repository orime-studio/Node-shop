import { Schema } from "mongoose";
import imageSchema from "./image-schema";

const ParashPageSchema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
});

// Define the schema for Parasha
const NewParashaSchema = new Schema({
    author: { type: String, required: true },
    image: { type: imageSchema, required: true },
    alt: { type: String, required: false },
    title: { type: String, required: true },
    miniText: { type: String, required: true },
    parashPage: { type: [ParashPageSchema], required: true },
    createdAt: { type: Date, default: Date.now },

});

export default NewParashaSchema;