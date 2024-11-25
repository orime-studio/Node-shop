import express, { Request, Response, Router } from "express";
import { parashaService } from "../services/new-parasha-service";
import { isAdmin } from "../middleware/is-admin";
import upload from "../middleware/uploads";



const router = Router();

// POST /parasha - Create a new Parasha
// Add new parasha
router.post("/", isAdmin, upload.single("image"), async (req, res, next) => {
  try {
    if (!req.payload) {
      throw new Error("Invalid token");
    }

    // יצירת URL לתמונה
    const imageUrl = `https://node-tandt-shop.onrender.com/uploads/${req.file.filename}`;

    // יצירת אובייקט פרשה עם הנתונים שנשלחו בבקשה
    const parashaData = {
      ...req.body,
      image: { url: imageUrl, alt: req.body.alt }  // הוספת URL לתמונה וה-alt
    };

    // יצירת פרשה בבסיס הנתונים
    const result = await parashaService.createParasha(parashaData);

    // החזרת תוצאה מוצלחת ללקוח
    res.status(201).json(result);
  } catch (e) {
    next(e);  // טיפול בשגיאות
  }
});


//get last parasha
router.get("/", async (req, res, next) => {
  try {
    const getLast = req.query.last === "true";

    const parashot = await parashaService.getParashot(getLast);

    // אם אין פרשות או שהן ריקות, מחזירים תשובה ללא שגיאה
    if (!parashot || (Array.isArray(parashot) && parashot.length === 0)) {
      return res.status(200).json({ message: "No parashot found" });
    }

    res.json(parashot);
  } catch (error) {
    next(error);
  }
});


//get parasha by id

router.get("/:id", async (req, res, next) => {
  try {
    const parasha = await parashaService.getParasha(req.params.id);
    res.json(parasha);
  } catch (e) {
    next(e);
  }
})
export { router as newParashaRouter };
