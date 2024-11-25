
import { Router } from "express";
import fetchLatestVideo from "../services/video-service";

const router = Router();

router.get('/latest-video', async (req, res) => {
    try {
      const videoUrl = await fetchLatestVideo();
  
      if (videoUrl) {
        res.status(200).json({
          success: true,
          videoUrl,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "No valid video found for the channel.",
        });
      }
    } catch (error) {
      console.error("Error in /latest-video route:", error.message);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the video.",
        error: error.message,
      });
    }
  });
  
  export { router as videoRouter };