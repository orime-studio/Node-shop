import express, { Request, Response, Router } from "express";
import { parashaService } from "../services/new-parasha-service";
import { isAdmin } from "../middleware/is-admin";
import upload from "../middleware/uploads";


const router = Router();

// POST /parasha - Create a new Parasha
// Add new parasha
router.post("/", isAdmin, upload.single("image"), async (req, res, next) => {
    try {
      console.log("Payload:", req.payload); // הוספת דיבאג
      if (!req.payload) {
        throw new Error("Invalid token");
      }
  
      // אם יש קובץ תמונה
      const imageUrl = req.file ? `https://node-tandt-shop.onrender.com/uploads/${req.file.filename}` : null;
  
      // נתונים של הפרשה
      const parashaData = { 
        ...req.body, 
        images: imageUrl ? [{ url: imageUrl, alt: req.body.alt }] : [],  // אם יש תמונה, הוסף אותה
        userId: req.payload._id,  // הוספת מזהה המשתמש
      };
  
      // יצירת הפרשה והחיסול
      const result = await parashaService.createParasha(parashaData);
      
      // החזרת תוצאה ללקוח
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  });
  

export { router as newParashaRouter };
