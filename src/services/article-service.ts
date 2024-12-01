import { ArticleInput } from "../@types/@types";
import Article from "../db/models/article-model";


export const articleService = {
  // פונקציה לקבלת כל המאמרים או מאמר אחרון
  getArticles: async (getLast: boolean) => {
    if (getLast) {
      const lastArticle = await Article.findOne().sort({ createdAt: -1 }).exec();
      return lastArticle;
    }
    const allArticles = await Article.find().exec();
    return allArticles;
  },
  // יצירת מאמר חדש
  createArticle: async (data: ArticleInput) => {
    const article = new Article(data);
    return article.save();
  },
  // שליפת מאמר לפי מזהה
  getArticle: async (id: string) => {
    return Article.findById(id);
  },
  // עדכון מאמר
  editArticle: async (id: string, data: ArticleInput) => {
    const article = await Article.findByIdAndUpdate(id, data, { new: true });
    if (!article) throw new Error("Article not found");
    return article;
  },
  // מחיקת מאמר
  deleteArticle: async (id: string) => {
    const article = await Article.findByIdAndDelete(id);
    return article;
  },
};
