// schemas/article-image-schema.ts

import { Schema } from "mongoose";

// הגדרת הסכמה עבור תמונה של מאמר
const multyImageSchema = new Schema({
    url: { type: String, required: true },   // URL של התמונה
    alt: { type: String, required: true },   // תיאור התמונה (alt)
    description: { type: String, required: false }, // תיאור נוסף או כיתוב עבור התמונה
});

export default multyImageSchema;
