import { fetchLatestVideo } from "../services/video-service";
import { Router } from "express";

const router = Router();

router.get('/latest-video', async (req, res) => {
    try {
      const video = await fetchLatestVideo();
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


export { router as videoRouter };