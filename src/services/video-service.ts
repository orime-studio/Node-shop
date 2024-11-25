import axios from "axios";

const fetchLatestVideo = async () => {
    const apiKey = 'AIzaSyDkKrMwC91QDtre1-PTA8wQsdtdV_6OTKY'; // הכנס את מפתח ה-API שלך
    const channelId = 'UCbyXmN-mZAQ2SlBX-Rze_bw'; // הכנס את מזהה הערוץ שלך
  
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&type=video`;
  
    try {
      const response = await axios.get(url);
  
      // בדוק אם יש תוצאות בתגובה
      if (response.data.items && response.data.items.length > 0) {
        const latestVideoId = response.data.items[0]?.id?.videoId;
  
        // בדוק אם קיים מזהה וידאו
        if (latestVideoId) {
          console.log("Latest video ID:", latestVideoId);
          return `https://www.youtube.com/watch?v=${latestVideoId}`;
        } else {
          console.error("Video ID is undefined.");
          return null;
        }
      } else {
        console.error("No videos found for the channel.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching video:", error.message);
      throw error;
    }
  };
  
  export default fetchLatestVideo;