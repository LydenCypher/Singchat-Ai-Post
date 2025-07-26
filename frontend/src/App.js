import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LandingPage,
  DiscordApp,
  ThemeProvider,
  useTheme,
  FreeBadge,
  mockCharacters,
  mockPosts,
  mockStories,
  mockMusic,
  mockDiscordServers,
  mockDiscordMessages
} from './components';

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [music, setMusic] = useState(mockMusic);
  const [playingMusic, setPlayingMusic] = useState(null);
  const { theme, background } = useTheme();

  // Handle landing page entry
  const handleEnter = () => {
    setIsAuthenticated(true);
  };

  // Handle music playback
  const handlePlayMusic = (musicTrack) => {
    if (playingMusic && playingMusic.id === musicTrack.id) {
      // Pause current track
      setPlayingMusic(null);
      
      // Stop actual audio if exists
      const audioElement = document.getElementById(`audio-${musicTrack.id}`);
      if (audioElement) {
        audioElement.pause();
      }
    } else {
      // Stop current playing music
      if (playingMusic) {
        const currentAudio = document.getElementById(`audio-${playingMusic.id}`);
        if (currentAudio) {
          currentAudio.pause();
        }
      }
      
      // Play new track
      setPlayingMusic({
        ...musicTrack,
        currentTime: 0,
        isPlaying: true
      });
      
      // Start actual audio playback
      setTimeout(() => {
        const audioElement = document.getElementById(`audio-${musicTrack.id}`);
        if (audioElement && musicTrack.audioUrl) {
          audioElement.play().catch(console.error);
        }
      }, 100);
    }
  };

  // Handle music creation
  const handleCreateMusic = (newMusic) => {
    // Add to music library
    setMusic(prev => [newMusic, ...prev]);
  };

  // Landing page
  if (!isAuthenticated) {
    return <LandingPage onEnter={handleEnter} />;
  }

  // Main Discord-style app
  return (
    <div className="App h-screen overflow-hidden">
      <DiscordApp
        onMusicCreate={handleCreateMusic}
        playingMusic={playingMusic}
        onPlayMusic={handlePlayMusic}
      />

      {/* Global Music Player (if music is playing) */}
      {playingMusic && (
        <div className={`fixed bottom-4 left-4 right-4 bg-${theme.colors.primary} text-white px-4 py-2 shadow-lg rounded-lg z-50`}>
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <button
              onClick={() => handlePlayMusic(playingMusic)}
              className="text-white hover:text-purple-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{playingMusic.title}</p>
              <p className="text-xs text-purple-200 truncate">{playingMusic.artist}</p>
            </div>
            <div className="text-xs flex items-center gap-2">
              <span>♪ Playing</span>
              {playingMusic.audioUrl && (
                <a
                  href={playingMusic.audioUrl}
                  download={`${playingMusic.title}.mp3`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-200 hover:text-white underline"
                >
                  Download
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;