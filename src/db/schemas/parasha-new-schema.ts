import { Schema } from "mongoose";
import imageSchema from "./image-schema";

const ParashPageSchema = new Schema({
    title: { type: String, required: false },
    text: { type: String, required: false },
});

// Define the schema for Parasha
const NewParashaSchema = new Schema({
    author: { type: String, required: false },
    image: { type: imageSchema, required: false },
    title: { type: String, required: false },
    miniText: { type: String, required: false },
    parashPage: { type: [ParashPageSchema], required: false },
});

export default NewParashaSchema;