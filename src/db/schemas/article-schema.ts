import { Schema } from "mongoose";


const longTextSchema = new Schema({
    title: { type: String, required: false },
    text: { type: String, required: true },
});

const multyImageSchema = new Schema({
    url: { type: String, required: true },   // URL של התמונה
    alt: { type: String, required: true },   // תיאור התמונה (alt)
    description: { type: String, required: false }, // תיאור נוסף או כיתוב עבור התמונה
});

// הגדרת הסכמה עבור מאמרים
const ArticleSchema = new Schema({
    source: { type: String, required: true },
    mainImage: { 
        type: multyImageSchema, 
        required: true // התמונה הראשית היא חובה
    },
    additionalImages: [{ 
        type: multyImageSchema, 
        required: false // התמונות הנוספות אינן חובה
    }],
    title: { type: String, required: true },
    miniText: { type: String, required: true },
    longText: { type: [longTextSchema], required: true },
    createdAt: { type: Date, default: Date.now },
});

export default ArticleSchema;
