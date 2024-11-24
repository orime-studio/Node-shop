// services/videoService.js

import axios from "axios";


// הפונקציה לשליפת הסרטון האחרון
const fetchLatestVideo = async () => {
  const apiKey = 'AIzaSyDrMB3ATfjH8BoiFdxcMn_S32TwY_Vnol4'; // הכנס את מפתח ה-API שלך
  const channelId = 'UCbyXmN-mZAQ2SlBX-Rze_bw'; // הכנס את מזהה הערוץ שלך

  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&type=video`;

  try {
    const response = await axios.get(url);
    const latestVideoId = response.data.items[0].id.videoId;
    
    return `https://www.youtube.com/watch?v=${latestVideoId}`;
  } catch (error) {
    console.error("Error fetching video:", error);
    throw error; // נזרוק את השגיאה כך שה-router יוכל לטפל בה
  }
};

export { fetchLatestVideo };
