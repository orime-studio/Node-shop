// services/videoService.js

import axios from "axios";


// הפונקציה לשליפת הסרטון האחרון
const fetchLatestVideo = async () => {
  const apiKey = 'AIzaSyDkKrMwC91QDtre1-PTA8wQsdtdV_6OTKY'; // הכנס את מפתח ה-API שלך
  const channelId = 'UCShooJom3QCkrDj-skeRi2w'; // הכנס את מזהה הערוץ שלך

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
