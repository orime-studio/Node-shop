import { fetchLatestVideo } from "../services/video-service";
import { Router } from "express";

const router = Router();

router.get('/latest-video', async (req, res) => {
    try {
      const videoId = await fetchLatestVideo();
      res.json({ videoUrl: `https://www.youtube.com/watch?v=${videoId}` });
    } catch (error) {
      console.error('Error fetching video:', error);
      res.status(500).json({ error: 'Unable to fetch the latest video' });
    }
  });
  


export { router as videoRouter };