// Music API service for Suno AI integration
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const musicAPI = {
  // Generate music using Suno AI
  generateMusic: async (musicData) => {
    const response = await fetch(`${API_BASE_URL}/api/music/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: musicData.prompt,
        title: musicData.title,
        tags: musicData.genre, // Using genre as tags for now
        make_instrumental: musicData.instrumental || false,
        user_id: musicData.userId || 'default_user'
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to generate music');
    }

    return response.json();
  },

  // Check music generation status
  checkMusicStatus: async (musicId) => {
    const response = await fetch(`${API_BASE_URL}/api/music/status/${musicId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to check music status');
    }

    return response.json();
  },

  // Get user's music
  getUserMusic: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/api/music/user/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to fetch user music');
    }

    return response.json();
  },
};

// Utility function to poll music status until completion
export const pollMusicStatus = async (musicId, onProgress, maxAttempts = 30) => {
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const status = await musicAPI.checkMusicStatus(musicId);
      
      if (onProgress) {
        onProgress(status);
      }
      
      if (status.status === 'completed') {
        return status;
      } else if (status.status === 'failed') {
        throw new Error('Music generation failed');
      }
      
      // Wait 5 seconds before next poll
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    } catch (error) {
      console.error('Error polling music status:', error);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  throw new Error('Music generation timed out');
};