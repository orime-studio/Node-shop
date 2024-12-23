// routes/article-router.ts

import express, { Request, Response, Router, NextFunction } from "express";
import { articleService } from "../services/article-service";
import { isAdmin } from "../middleware/is-admin";
import upload from "../middleware/uploads";
import BizCardsError from "../errors/BizCardsError";

const router = Router();

// עטיפת multer כפונקציה שתעבוד נכון עם TypeScript
//const multiUploadMiddleware = multiUpload.array("images", 5);

// POST /article - יצירת מאמר חדש
router.post("/", isAdmin, upload.fields([
  { name: "mainImage", maxCount: 1 }, // תמונה ראשית
  { name: "images", maxCount: 5 }, // עד 5 תמונות נוספות
]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // בדיקת תוקף טוקן
      if (!req.payload) {
        throw new Error("Invalid token.");
      }

      // קבלת הקבצים מהבקשה
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // בדיקת תמונה ראשית
      if (!files.mainImage || files.mainImage.length === 0) {
        throw new Error("Main image is required.");
      }

      // יצירת URL לתמונה הראשית
      const mainImage = {
        url: `https://node-tandt-shop.onrender.com/uploads/${files.mainImage[0].filename}`,
        alt: req.body.alt || "", // תיאור התמונה (alt)
      };

      // יצירת מערך של תמונות נוספות
      const images = files.images
        ? files.images.map((file) => ({
          url: `https://node-tandt-shop.onrender.com/uploads/${file.filename}`,
          alt: req.body.alt || "", // תיאור התמונה (alt)
        }))
        : [];

      // יצירת אובייקט הנתונים של המאמר
      const articleData = {
        ...req.body,
        mainImage,
        images,
      };

      // שמירת המאמר
      const result = await articleService.createArticle(articleData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);



// GET /article - שליפת כל המאמרים או המאמר האחרון
router.get("/", async (req, res, next) => {
  try {
    const getLast = req.query.last === "true";

    const articles = await articleService.getArticles(getLast);

    if (!articles || (Array.isArray(articles) && articles.length === 0)) {
      return res.status(200).json({ message: "No articles found" });
    }

    res.json(articles);
  } catch (error) {
    next(error);
  }
});

// GET /article/:id - שליפת מאמר לפי מזהה
router.get("/:id", async (req, res, next) => {
  try {
    const article = await articleService.getArticle(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (e) {
    next(e);
  }
});

// PUT /article/:id - עדכון מאמר לפי מזהה
router.put("/:id", ...isAdmin, upload.fields([
  { name: "mainImage", maxCount: 1 }, // תמונה ראשית
  { name: "images", maxCount: 5 }, // עד 5 תמונות נוספות
]), async (req: Request, res: Response, next: NextFunction) => {
  try {
    // לוג: בדיקת תוקן
    if (!req.payload) {
      throw new BizCardsError( 400, "Invalid token.");
    }

    // לוג: קבלת הקבצים מהבקשה
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // טיפול בתמונה ראשית
    const mainImage = files.mainImage && files.mainImage.length > 0
      ? {
          url: `https://node-tandt-shop.onrender.com/uploads/${files.mainImage[0].filename}`,
          alt: req.body.alt || "",
        }
      : {
          url: req.body.mainImageUrl || '', // אם לא הועלתה תמונה, נשתמש ב-URL קיים מה-body
          alt: req.body.alt || "",
        };

    // טיפול בתמונות הנוספות (ללא JSON.parse)
    const images = files.images && files.images.length > 0
      ? files.images.map((file) => ({
          url: `https://node-tandt-shop.onrender.com/uploads/${file.filename}`,
          alt: req.body.alt || "",
        }))
      : req.body.images && Array.isArray(req.body.images) 
        ? req.body.images.map((image: string) => ({
            url: image, // הפוך את המיתרים לאובייקטים עם URL
            alt: req.body.alt || "",
        }))
        : []; // אם אין תמונות ב-body, נשאיר כ-array ריק

    // יצירת אובייקט הנתונים לעדכון
    const articleData = {
      ...req.body,
      mainImage,
      images,
    };

    // קריאה לשירות לעדכון המאמר
    const updatedArticle = await articleService.editArticle(req.params.id, articleData);

    // לוג אם המאמר לא נמצא
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found." });
    }

    // לוג אם המאמר עודכן בהצלחה

    // החזרת המאמר המעודכן
    res.json(updatedArticle);
  } catch (error) {
    // לוג של שגיאות
    next(error);
  }
});




// DELETE /article/:id - מחיקת מאמר לפי מזהה
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const article = await articleService.deleteArticle(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (e) {
    next(e);
  }
});

export { router as articleRouter };
