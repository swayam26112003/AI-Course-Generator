const axios = require('axios');

const YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 *
 * @param {string} query 
 */
const getVideos = async (query) => {
  try {
    const params = {
      part: 'snippet',
      q: query,
      key: process.env.NODE_YOUTUBE_API_KEY,
      type: 'video',          
      maxResults: 4,         
      videoDuration: 'medium' 
    };


    const resp = await axios.get(`${YOUTUBE_BASE_URL}/search`, { params });

    return resp.data.items;

  } catch (error) {
    console.error("Error fetching YouTube videos:", error.response?.data || error.message);
    throw new Error("Failed to fetch videos from YouTube.");
  }
};

module.exports = { getVideos };