import { Schema } from "mongoose";
import multyImageSchema from "./multy-images-schema";

const longTextSchema = new Schema({
    title: { type: String, required: false },
    text: { type: String, required: true },
});

// הגדרת הסכמה עבור מאמרים
const ArticleSchema = new Schema({
    source: { type: String, required: true },
    images: [{ type: multyImageSchema, required: true }],  // מערך של תמונות
    alt: { type: String, required: false },
    title: { type: String, required: true },
    miniText: { type: String, required: true },
    longText: { type: [longTextSchema], required: true },
    createdAt: { type: Date, default: Date.now },
});

export default ArticleSchema;
