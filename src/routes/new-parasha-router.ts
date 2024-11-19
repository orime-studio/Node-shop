import express, { Request, Response } from "express";
import { parashaService } from "../services/new-parasha-service";


const router = express.Router();

// POST /parasha - Create a new Parasha
router.post("/", async (req: Request, res: Response) => {
  try {
    const data = req.body;

    // בדיקת שדות נדרשים
    if (!data.author || !data.image || !data.title || !data.miniText || !data.parashPage) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // קריאה לשירות ליצירת פרשה חדשה
    const newParasha = await parashaService.createParasha(data);
    return res.status(201).json(newParasha);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export { router as parashaRouter };
