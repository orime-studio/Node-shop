// routes/carousel-router.ts

import express, { Request, Response, NextFunction } from "express";
import { isAdmin } from "../middleware/is-admin";
import upload from "../middleware/uploads";
import { carouselService } from "../services/carousela-service";
import { CarouselImageUpdateInput } from "../@types/@types";

const router = express.Router();

// POST /carousel - הוספת תמונה חדשה לקרוסלה
router.post("/", isAdmin, upload.single("image"), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.payload) {
      throw new Error("Invalid token.");
    }

    const file = req.file;

    if (!file) {
      throw new Error("Image file is required.");
    }

    const imageUrl = `https://your-domain.com/uploads/${file.filename}`;

    const imageData = {
      url: imageUrl,
      alt: req.body.alt || "",
      description: req.body.description || "",
    };

    const result = await carouselService.createCarouselImage(imageData);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

// GET /carousel - קבלת כל התמונות של הקרוסלה
router.get("/", async (req, res, next) => {
  try {
    const images = await carouselService.getCarouselImages();
    res.json(images);
  } catch (error) {
    next(error);
  }
});

// GET /carousel/:id - קבלת תמונה לפי מזהה
router.get("/:id", async (req, res, next) => {
  try {
    const image = await carouselService.getCarouselImage(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Carousel image not found" });
    }
    res.json(image);
  } catch (error) {
    next(error);
  }
});

// PUT /carousel/:id - עדכון תמונה בקרוסלה
// routes/carousel-router.ts

router.put("/:id", isAdmin, upload.single("image"), async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.payload) {
        throw new Error("Invalid token.");
      }
  
      const file = req.file;
  
      // אם הקובץ קיים, ניצור URL חדש
      let imageUrl;
      if (file) {
        imageUrl = `https://your-domain.com/uploads/${file.filename}`;
      }
  
      // יצירת אובייקט הנתונים לעדכון
      const imageData: CarouselImageUpdateInput = {
        ...(imageUrl && { url: imageUrl }), // נוסיף את ה-URL רק אם הוא קיים
        ...(req.body.alt && { alt: req.body.alt }),
        ...(req.body.description && { description: req.body.description }),
      };
  
      // קריאה לשירות לעדכון התמונה
      const updatedImage = await carouselService.updateCarouselImage(req.params.id, imageData);
  
      if (!updatedImage) {
        return res.status(404).json({ message: "Carousel image not found" });
      }
  
      res.json(updatedImage);
    } catch (error) {
      next(error);
    }
  });
  

// DELETE /carousel/:id - מחיקת תמונה מהקרוסלה
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const image = await carouselService.deleteCarouselImage(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Carousel image not found" });
    }
    res.json(image);
  } catch (error) {
    next(error);
  }
});

export { router as carouselRouter };
