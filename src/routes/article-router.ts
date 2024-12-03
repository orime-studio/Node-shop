// routes/article-router.ts

import express, { Request, Response, Router, NextFunction } from "express";
import { articleService } from "../services/article-service";
import { isAdmin } from "../middleware/is-admin";
import upload from "../middleware/uploads";

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
    // לוג: בדיקת תוקף טוקן
    if (!req.payload) {
      console.error("Invalid token.");
      throw new Error("Invalid token.");
    }
    console.log("Token is valid:", req.payload);

    // לוג: קבלת הקבצים מהבקשה
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    console.log("Received files:", files);

    // טיפול בתמונה הראשית
    const mainImage = files.mainImage && files.mainImage.length > 0
      ? {
          url: `https://node-tandt-shop.onrender.com/uploads/${files.mainImage[0].filename}`,
          alt: req.body.alt || "",
        }
      : JSON.parse(req.body.mainImage); // במידה ואין קובץ, נשתמש בנתון קיים
    console.log("Main image data:", mainImage);

    // טיפול בתמונות הנוספות
    const images = files.images && files.images.length > 0
      ? files.images.map((file) => ({
          url: `https://node-tandt-shop.onrender.com/uploads/${file.filename}`,
          alt: req.body.alt || "",
        }))
      : JSON.parse(req.body.images); // במידה ואין קבצים, נשתמש בנתון קיים
    console.log("Additional images data:", images);

    // יצירת אובייקט הנתונים לעדכון
    const articleData = {
      ...req.body,
      mainImage,
      images,
    };
    console.log("Article data to update:", articleData);

    // קריאה לשירות לעדכון המאמר
    const updatedArticle = await articleService.editArticle(req.params.id, articleData);

    // לוג אם המאמר לא נמצא
    if (!updatedArticle) {
      console.error("Article not found for ID:", req.params.id);
      return res.status(404).json({ message: "Article not found." });
    }

    // לוג אם המאמר עודכן בהצלחה
    console.log("Article updated successfully:", updatedArticle);

    // החזרת המאמר המעודכן (ההמרה ל-JSON מתבצעת כאן)
    res.json(updatedArticle);
  } catch (error) {
    // לוג של שגיאות
    console.error("Error occurred:", error);
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
