import { fetchLatestVideo } from "../services/video-service";
import { Router } from "express";

const router = Router();

router.get('/latest-video', async (req, res) => {
  try {
    const videoUrl = await fetchLatestVideo();

    if (videoUrl) {
      res.status(200).json({
        success: true,
        message: "Latest video fetched successfully.",
        videoUrl,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No videos found for the specified channel.",
      });
    }
  } catch (error) {
    console.error("Error fetching latest video:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch the latest video. Please try again later.",
      error: error.message,
    });
  }
});

export { router as videoRouter };
