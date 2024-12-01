// routes/article-router.ts

import express, { Request, Response, Router } from "express";
import { articleService } from "../services/article-service";
import { isAdmin } from "../middleware/is-admin";
import multiUpload from "../middleware/multy-uploads";

const router = Router();

// POST /article - יצירת מאמר חדש
router.post("/", isAdmin, multiUpload.array("images", 5), async (req, res, next) => {
  try {
    if (!req.payload) {
      throw new Error("Invalid token");
    }

    // יצירת מערך של URLs לתמונות
    const images = req.files?.map((file) => ({
      url: `https://node-tandt-shop.onrender.com/uploads/${file.filename}`,
      alt: req.body.alt,
    })) || [];

    const articleData = {
      ...req.body,
      images,
    };

    const result = await articleService.createArticle(articleData);
    res.status(201).json(result);
  } catch (e) {
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
    res.json(article);
  } catch (e) {
    next(e);
  }
});

// PUT /article/:id - עדכון מאמר לפי מזהה
router.put("/:id", isAdmin, multiUpload.array("images", 5), async (req, res, next) => {
  try {
    if (!req.payload) {
      throw new Error("Invalid token");
    }

    // קביעת ה-URLs של התמונות
    const images = req.files?.map((file) => ({
      url: `https://node-tandt-shop.onrender.com/uploads/${file.filename}`,
      alt: req.body.alt,
    })) || JSON.parse(req.body.images);

    const articleData = {
      ...req.body,
      images,
    };

    const updatedArticle = await articleService.editArticle(req.params.id, articleData);

    res.json(updatedArticle);
  } catch (e) {
    next(e);
  }
});

// DELETE /article/:id - מחיקת מאמר לפי מזהה
router.delete("/:id", isAdmin, async (req, res, next) => {
  try {
    const article = await articleService.deleteArticle(req.params.id);
    res.json(article);
  } catch (e) {
    next(e);
  }
});

export { router as articleRouter };
