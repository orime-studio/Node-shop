// routes/article-router.ts

import express, { Request, Response, Router, NextFunction } from "express";
import { articleService } from "../services/article-service";
import { isAdmin } from "../middleware/is-admin";
import upload from "../middleware/uploads";

const router = Router();

// עטיפת multer כפונקציה שתעבוד נכון עם TypeScript
//const multiUploadMiddleware = multiUpload.array("images", 5);

// POST /article - יצירת מאמר חדש
router.post(
  "/",
  isAdmin,
  upload.fields([
    { name: 'mainImage', maxCount: 1 },  // תמונה ראשית
    { name: 'additionalImages', maxCount: 5 },  // עד 5 תמונות נוספות
  ]), // שימוש במידלוואר להעלאת תמונות
  async (req: Request, res: Response, next) => {
    try {
      if (!req.payload) {
        throw new Error("Invalid token");
      }

      // יצירת מערך של URLs לתמונות
      const files = req.files as Express.Multer.File[];
      
      // יצירת URL לתמונה הראשית
      const mainImage = files.find((file) => file.fieldname === 'mainImage');

      if (!mainImage) {
        throw new Error("Main image is required");
      }

      // יצירת מערך של תמונות נוספות
      const additionalImages = files
        .filter((file) => file.fieldname === 'additionalImages')
        .map((file) => ({
          url: `https://node-tandt-shop.onrender.com/uploads/${file.filename}`,
          alt: req.body.alt || '',  // אם יש alt או לא
        }));

      const articleData = {
        ...req.body,
        mainImage: {
          url: `https://node-tandt-shop.onrender.com/uploads/${mainImage.filename}`,
          alt: req.body.alt || '',  // אפשר להוסיף alt אם יש
        },
        additionalImages,
      };

      const result = await articleService.createArticle(articleData);
      res.status(201).json(result);
    } catch (e) {
      next(e);
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
router.put(
  "/:id",
  isAdmin,
   // שימוש במידלוואר להעלאת תמונות
  async (req: Request, res: Response, next) => {
    try {
      if (!req.payload) {
        throw new Error("Invalid token");
      }

      // קביעת ה-URLs של התמונות
      const files = req.files as Express.Multer.File[];
      const images = files.length > 0
        ? files.map((file) => ({
            url: `https://node-tandt-shop.onrender.com/multi_uploads/${file.filename}`,
            alt: req.body.alt,
          }))
        : JSON.parse(req.body.images);

      const articleData = {
        ...req.body,
        images,
      };

      const updatedArticle = await articleService.editArticle(req.params.id, articleData);

      if (!updatedArticle) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json(updatedArticle);
    } catch (e) {
      next(e);
    }
  }
);

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
