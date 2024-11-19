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
    title: { type: String, required: true },
    miniText: { type: String, required: true },
    parashPage: { type: [ParashPageSchema], required: true },
});

export default NewParashaSchema;