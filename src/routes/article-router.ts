import { NextFunction, Request, Response, Router } from "express";
import { isAdmin } from "../middleware/is-admin";
import upload from "../middleware/uploads";
import { articleService } from "../services/article-service";

const router = Router();

// Helper function to construct image URLs with alt text
const constructImageUrls = (files: Express.Multer.File[] | undefined, alts: string[] = []) => {
  return files?.map((file, index) => ({
    url: `https://node-tandt-shop.onrender.com/uploads/${file.filename}`,
    alt: alts[index] || "", // Use provided alt or fallback to an empty string
  })) || [];
};

// POST /article - Create a new article
router.post(
  "/",
  isAdmin,
  upload.fields([
    { name: "image", maxCount: 1 }, // Main image
    { name: "images", maxCount: 5 }, // Additional images
  ]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.payload) {
        throw new Error("Unauthorized access: Missing valid token");
      }

      // Extract files
      const mainImage = req.files && (req.files["image"] as Express.Multer.File[])[0];
      const additionalImages = req.files && (req.files["images"] as Express.Multer.File[]);

      // Extract alt texts from the request body
      const altTexts: string[] = Array.isArray(req.body.alt) ? req.body.alt : [req.body.alt];
      
      // Construct image URLs
      const mainImageUrl = mainImage
        ? `https://node-tandt-shop.onrender.com/uploads/${mainImage.filename}`
        : null;
      const additionalImagesUrls = constructImageUrls(additionalImages, altTexts);

      // Create article data
      const articleData = {
        ...req.body,
        mainImage: mainImageUrl,
        images: additionalImagesUrls,
      };

      // Save the article
      const result = await articleService.createArticle(articleData);
      res.status(201).json(result);
    } catch (e) {
      console.error("Error creating article:", e);
      next(e);
    }
  }
);

// GET /article - Retrieve all articles or the latest article
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getLast = req.query.last === "true";
    const articles = await articleService.getArticles(getLast);

    if (!articles || (Array.isArray(articles) && articles.length === 0)) {
      return res.status(200).json({ message: "No articles found" });
    }

    res.json(articles);
  } catch (e) {
    console.error("Error retrieving articles:", e);
    next(e);
  }
});

// GET /article/:id - Retrieve an article by ID
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await articleService.getArticle(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (e) {
    console.error("Error retrieving article:", e);
    next(e);
  }
});

// PUT /article/:id - Update an article by ID
router.put(
  "/:id",
  isAdmin,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.payload) {
        return res.status(401).json({ message: "Unauthorized access: Missing valid token" });
      }

      const mainImage = req.files && (req.files["image"] as Express.Multer.File[])[0];
      const additionalImages = req.files && (req.files["images"] as Express.Multer.File[]);

      const altTexts: string[] = Array.isArray(req.body.alt) ? req.body.alt : [req.body.alt];

      const mainImageUrl = mainImage
        ? `https://node-tandt-shop.onrender.com/uploads/${mainImage.filename}`
        : req.body.mainImage; // Keep existing image if not updated

      const additionalImagesUrls = constructImageUrls(additionalImages, altTexts);

      const articleData = {
        ...req.body,
        mainImage: mainImageUrl,
        images: additionalImagesUrls,
      };

      const updatedArticle = await articleService.editArticle(req.params.id, articleData);

      if (!updatedArticle) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.json(updatedArticle);
    } catch (e) {
      console.error("Error updating article:", e);
      next(e);
    }
  }
);

// DELETE /article/:id - Delete an article by ID
router.delete("/:id", isAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const article = await articleService.deleteArticle(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted successfully", article });
  } catch (e) {
    console.error("Error deleting article:", e);
    next(e);
  }
});

export { router as articleRouter };
