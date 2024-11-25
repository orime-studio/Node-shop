// services/videoService.js
import axios from "axios";

// הפונקציה לשליפת הסרטון האחרון
const fetchLatestVideo = async () => {
  const apiKey = 'AIzaSyDkKrMwC91QDtre1-PTA8wQsdtdV_6OTKY'; // הכנס את מפתח ה-API שלך
  const channelId = 'UCbyXmN-mZAQ2SlBX-Rze_bw'; // הכנס את מזהה הערוץ שלך

  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&type=video`;

  try {
    const response = await axios.get(url);

    // בדיקת תקינות התגובה והאם קיימים סרטונים
    if (response.data.items && response.data.items.length > 0) {
      const latestVideoId = response.data.items[0]?.id?.videoId;

      if (latestVideoId) {
        console.log("Latest video ID:", latestVideoId);
        return `https://www.youtube.com/watch?v=${latestVideoId}`;
      } else {
        console.error("Video ID not found in response.");
        return null;
      }
    } else {
      console.error("No videos found for this channel.");
      return null; // נחזיר null אם לא נמצא סרטון
    }
  } catch (error) {
    console.error("Error fetching video:", error.message);
    throw new Error("Failed to fetch the latest video. Please try again later.");
  }
};

export { fetchLatestVideo };
