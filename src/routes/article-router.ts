import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import { isAdmin } from "../middleware/is-admin";
import { articleService } from "../services/article-service";



const router = express.Router();

// הגדרת Multer לאחסון קבצים
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "multi_uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const multiUploadMiddleware = multer({ storage }).array("images");

router.put(
  "/:id",
  isAdmin,
  multiUploadMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // וידוא טוקן
      if (!req.payload) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // לוגים לבדיקה
      console.log("Body data:", req.body);
      console.log("Files data:", req.files);

      // טיפול בקבצים
      const files = req.files as Express.Multer.File[];
      const images =
        files.length > 0
          ? files.map((file) => ({
              url: `https://node-tandt-shop.onrender.com/multi_uploads/${file.filename}`,
              alt: req.body.alt || "Image description",
            }))
          : JSON.parse(req.body.images || "[]");

      // יצירת אובייקט עדכון למאמר
      const articleData = {
        ...req.body,
        images,
      };

      // עדכון המאמר
      const updatedArticle = await articleService.editArticle(
        req.params.id,
        articleData
      );

      if (!updatedArticle) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json(updatedArticle);
    } catch (e: any) {
      console.error("Error updating article:", e.message || e);
      next(e);
    }
  }
);



export { router as articleRouter };
