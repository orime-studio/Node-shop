import express, { Request, Response, Router } from "express";
import { parashaService } from "../services/new-parasha-service";
import { isAdmin } from "../middleware/is-admin";
import upload from "../middleware/uploads";

const router = Router();

// POST /parasha - Create a new Parasha
// Add new parasha
router.post("/", isAdmin, upload.single("image"), async (req, res, next) => {
  try {
    console.log("Payload:", req.payload); // דיבאג - מציג את ה-payload של המשתמש
    if (!req.payload) {
      throw new Error("Invalid token");
    }

    // יצירת URL לתמונה
    const imageUrl = `https://node-tandt-shop.onrender.com/uploads/${req.file.filename}`;
    console.log("Uploaded image URL:", imageUrl);  // דיבאג - מציג את ה-URL של התמונה שהועלתה

    // יצירת אובייקט פרשה עם הנתונים שנשלחו בבקשה
    const parashaData = { 
      ...req.body, 
      image: { url: imageUrl, alt: req.body.alt }  // הוספת URL לתמונה וה-alt
    };
    console.log("Parasha Data:", parashaData);  // דיבאג - מציג את הנתונים שהתקבלו ליצירת הפרשה

    // יצירת פרשה בבסיס הנתונים
    const result = await parashaService.createParasha(parashaData);
    console.log("Created Parasha:", result);  // דיבאג - מציג את התוצאה שהתקבלה לאחר יצירת הפרשה

    // החזרת תוצאה מוצלחת ללקוח
    res.status(201).json(result);
  } catch (e) {
    console.error("Error:", e);  // דיבאג - מציג את השגיאה במידה ויש
    next(e);  // טיפול בשגיאות
  }
});
//get all parashot
router.get("/", async (req, res, next) => {
  try {
    console.log("Incoming request to fetch all parashot"); // לוג כדי לציין שהבקשה התקבלה
    const parashot = await parashaService.getParashot();
    console.log("Fetched parashot:", parashot); // לוג כדי להציג את התשובה מהשירות
    res.json(parashot);
  } catch (e) {
    console.error("Error fetching parashot:", e.message); // לוג לשגיאה עם ההודעה
    next(e);
  }
});

 //get last parasha
 router.get("/", async (req, res, next) => {
  try {
    // בודק אם יש פרמטר בקשה של "last", אם כן שולף את הפרשה האחרונה
    const getLast = req.query.last === "true"; 
    console.log("Fetching parashot, getLast:", getLast); // לוג של הפרמטר

    const parashot = await parashaService.getParashot(getLast);
    console.log("Fetched parashot:", parashot); // לוג של התשובה שהתקבלה מה-DB

    if (!parashot || (Array.isArray(parashot) && parashot.length === 0)) {
      return res.status(404).json({ message: "No parashot found" });
    }

    res.json(parashot); // שולח את התשובה ללקוח
  } catch (error) {
    next(error); // מעביר שגיאות לניהול
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
