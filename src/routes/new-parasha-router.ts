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

    // יצירת URL לתמונה
    const imageUrl = `https://node-tandt-shop.onrender.com/uploads/${req.file.filename}`;
    
    // שליחת התמונה ונתונים נוספים כתגובה לפני היצירה
    res.json({ imageUrl });

    // יצירת אובייקט פרשה עם הנתונים שנשלחו בבקשה
    const parashaData = { 
      ...req.body, 
      images: [{ url: imageUrl, alt: req.body.alt }],  // הוספת URL לתמונה וה-alt
     
    };

    // יצירת פרשה בבסיס הנתונים
    const result = await parashaService.createParasha(parashaData);

    // החזרת תוצאה מוצלחת ללקוח
    res.status(201).json(result);
  } catch (e) {
    next(e);  // טיפול בשגיאות
  }
});

export { router as newParashaRouter };
