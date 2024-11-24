import { fetchLatestVideo } from "../services/video-service";
import router from "./users-router";

router.get('/latest-video', async (req, res) => {
    try {
      const video = await fetchLatestVideo();
      res.status(200).json(video);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch the latest video.' });
    }
  });


export { router as videoRouter };