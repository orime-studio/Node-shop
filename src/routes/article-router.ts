// routes/article-router.ts

import express, { Request, Response, Router, NextFunction } from "express";
import { articleService } from "../services/article-service";
import { isAdmin } from "../middleware/is-admin";
import multiUpload from "../middleware/multy-uploads";
import upload from "../middleware/uploads";

const router = Router();

// עטיפת multer כפונקציה שתעבוד נכון עם TypeScript
//const multiUploadMiddleware = multiUpload.array("images");

// POST /article - יצירת מאמר חדש
router.post("/", ...isAdmin, upload.single('image'), multiUpload.array('images', 5), async (req: Request, res: Response, next) => {
  try {
    if (!req.payload) {
      throw new Error("Invalid token");
    }

    // טיפול בתמונה הראשית
    const mainImage = req.file;  // זו התמונה הראשית (תמונה בודדת)
    console.log('Main Image:', mainImage);  // הדפסת התמונה הראשית

    // טיפול בתמונות נוספות
    const additionalImages = req.files as Express.Multer.File[];  // מערך של תמונות נוספות
    console.log('Additional Images:', additionalImages);  // הדפסת התמונות הנוספות

    // אם יש מערך של alt לכל תמונה
    const altTexts = req.body.alt; // אם הלקוח שלח מערך alt עבור כל תמונה
    console.log('Alt Texts:', altTexts);  // הדפסת טקסט ה-Alt

    // יצירת מערך של URLs לתמונות נוספות (עם alt אם יש)
    const additionalImagesUrls = additionalImages.map((file, index) => ({
      url: `https://node-tandt-shop.onrender.com/uploads/${file.filename}`,
      alt: altTexts && altTexts[index] ? altTexts[index] : '', // אם יש alt לכל תמונה, אם לא, נשאיר ריק
    }));
    console.log('Additional Images URLs:', additionalImagesUrls);  // הדפסת ה-URLs של התמונות הנוספות

    // אם יש תמונה ראשית, נוסיף אותה לנתונים של המאמר
    const mainImageUrl = mainImage ? `https://node-tandt-shop.onrender.com/uploads/${mainImage.filename}` : '';
    console.log('Main Image URL:', mainImageUrl);  // הדפסת ה-URL של התמונה הראשית

    // יצירת הנתונים למאמר
    const articleData = {
      ...req.body,
      mainImage: mainImageUrl, // התמונה הראשית
      images: additionalImagesUrls, // התמונות הנוספות
    };
    console.log('Article Data:', articleData);  // הדפסת הנתונים של המאמר

    // יצירת המאמר
    const result = await articleService.createArticle(articleData);
    res.status(201).json(result);
  } catch (e) {
    console.error('Error:', e);  // הדפסת שגיאות במקרה של בעיה
    next(e);
  }
});



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
router.put("/:id", ...isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.payload) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    console.log('Body data:', req.body);
    console.log('Files data:', req.files);

    const files = req.files as Express.Multer.File[];
    const images =
      files.length > 0
        ? files.map((file) => ({
          url: `https://node-tandt-shop.onrender.com/multi_uploads/${file.filename}`,
          alt: req.body.alt || 'Image description',
        }))
        : JSON.parse(req.body.images || '[]');

    const articleData = { ...req.body, images };
    const updatedArticle = await articleService.editArticle(req.params.id, articleData);

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json(updatedArticle);
  } catch (e: any) {
    console.error('Error updating article:', e.message || e);
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
