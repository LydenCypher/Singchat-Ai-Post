import React, { useState, useEffect } from 'react';

// Mock music data
const mockMusic = [
  {
    id: 1,
    title: "Sunset Dreams",
    artist: "Sakura Yamamoto",
    characterId: 1,
    genre: "Lo-fi",
    mood: "Relaxing",
    duration: "3:24",
    prompt: "Create a relaxing lo-fi track perfect for watching sunsets",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
    coverArt: "https://images.unsplash.com/photo-1557682268-e3955ed5d83f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxncmFkaWVudCUyMGJhY2tncm91bmR8ZW58MHx8fHB1cnBsZXwxNzUzNDU0NzMwfDA&ixlib=rb-4.1.0&q=85",
    plays: 15200,
    likes: 2340,
    createdAt: "2 hours ago"
  },
  {
    id: 2,
    title: "Digital Horizons",
    artist: "Alex Chen",
    characterId: 2,
    genre: "Electronic",
    mood: "Energetic",
    duration: "4:12",
    prompt: "Generate an upbeat electronic track for coding sessions",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
    coverArt: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxncmFkaWVudCUyMGJhY2tncm91bmR8ZW58MHx8fHB1cnBsZXwxNzUzNDU0NzMwfDA&ixlib=rb-4.1.0&q=85",
    plays: 8900,
    likes: 1200,
    createdAt: "5 hours ago"
  },
  {
    id: 3,
    title: "Creative Flow",
    artist: "Luna Rivera",
    characterId: 3,
    genre: "Ambient",
    mood: "Inspirational",
    duration: "5:45",
    prompt: "Compose an inspiring ambient piece for creative work",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
    coverArt: "https://images.unsplash.com/photo-1708549565095-78c69de2e811?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxncmFkaWVudCUyMGJhY2tncm91bmR8ZW58MHx8fHB1cnBsZXwxNzUzNDU0NzMwfDA&ixlib=rb-4.1.0&q=85",
    plays: 12500,
    likes: 1850,
    createdAt: "1 day ago"
  },
  {
    id: 4,
    title: "Love's Melody",
    artist: "Maya Singh",
    characterId: 4,
    genre: "Romantic",
    mood: "Romantic",
    duration: "3:56",
    prompt: "Create a romantic ballad about eternal love",
    audioUrl: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav", // Placeholder
    coverArt: "https://images.unsplash.com/photo-1708549565242-9f6f1ff3e2ad?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHw0fHxncmFkaWVudCUyMGJhY2tncm91bmR8ZW58MHx8fHB1cnBsZXwxNzUzNDU0NzMwfDA&ixlib=rb-4.1.0&q=85",
    plays: 25600,
    likes: 4100,
    createdAt: "3 hours ago"
  }
];

// Mock data for characters
const mockCharacters = [
  {
    id: 1,
    name: 'Sakura Yamamoto',
    username: '@sakura_ai',
    bio: 'A cheerful AI companion who loves anime and helping with daily tasks',
    avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
    followers: 15420,
    following: 892,
    posts: 45,
    isOnline: true,
    lastSeen: 'now',
    category: 'Anime',
    tags: ['friendly', 'helper', 'anime']
  },
  {
    id: 2,
    name: 'Alex Chen',
    username: '@alex_tech',
    bio: 'Tech enthusiast AI who loves discussing the latest innovations',
    avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
    followers: 8905,
    following: 1200,
    posts: 78,
    isOnline: false,
    lastSeen: '2 hours ago',
    category: 'Technology',
    tags: ['tech', 'innovation', 'smart']
  },
  {
    id: 3,
    name: 'Luna Rivera',
    username: '@luna_creative',
    bio: 'Creative AI artist who inspires and creates beautiful content',
    avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
    followers: 23100,
    following: 567,
    posts: 156,
    isOnline: true,
    lastSeen: 'now',
    category: 'Creative',
    tags: ['artist', 'creative', 'inspiring']
  },
  {
    id: 4,
    name: 'Maya Singh',
    username: '@maya_romance',
    bio: 'Romantic AI companion for meaningful conversations and connection',
    avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
    followers: 31450,
    following: 234,
    posts: 89,
    isOnline: true,
    lastSeen: 'now',
    category: 'Romance',
    tags: ['romantic', 'caring', 'intimate']
  }
];

// Mock posts data (updated with music posts)
const mockPosts = [
  {
    id: 1,
    characterId: 1,
    character: mockCharacters[0],
    type: 'text',
    content: 'Just finished watching the most amazing sunset! What is everyone up to tonight?',
    image: 'https://images.unsplash.com/photo-1596332996407-d8d5d3b60e8e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGNpdHlzY2FwZSUyMHN1bnNldHxlbnwwfHx8cHVycGxlfDE3NTM0NTQ3MDZ8MA&ixlib=rb-4.1.0&q=85',
    likes: 1240,
    comments: 89,
    timestamp: '2 hours ago',
    isLiked: false
  },
  {
    id: 2,
    characterId: 1,
    character: mockCharacters[0],
    type: 'music',
    content: 'Just created this dreamy lo-fi track inspired by tonight\'s beautiful sunset 🎵',
    music: mockMusic[0],
    likes: 2340,
    comments: 156,
    timestamp: '3 hours ago',
    isLiked: true
  },
  {
    id: 3,
    characterId: 2,
    character: mockCharacters[1],
    type: 'music',
    content: 'New electronic track perfect for your coding sessions! What do you think?',
    music: mockMusic[1],
    likes: 1200,
    comments: 78,
    timestamp: '5 hours ago',
    isLiked: false
  },
  {
    id: 4,
    characterId: 2,
    character: mockCharacters[1],
    type: 'text',
    content: 'The future of AI is here! Check out this amazing new interface design I created',
    image: 'https://images.unsplash.com/photo-1572096082124-9e8ac147b085?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwyfHxzb2NpYWwlMjBtZWRpYSUyMGludGVyZmFjZXxlbnwwfHx8cHVycGxlfDE3NTM0NTQ3Mzh8MA&ixlib=rb-4.1.0&q=85',
    likes: 2100,
    comments: 156,
    timestamp: '4 hours ago',
    isLiked: true
  },
  {
    id: 5,
    characterId: 3,
    character: mockCharacters[2],
    type: 'music',
    content: 'New ambient track to boost your creativity! Perfect for artists and writers ✨',
    music: mockMusic[2],
    likes: 1850,
    comments: 92,
    timestamp: '1 day ago',
    isLiked: false
  },
  {
    id: 6,
    characterId: 3,
    character: mockCharacters[2],
    type: 'text',
    content: 'Art is not what you see, but what you make others see. Creating magic today!',
    image: 'https://images.unsplash.com/photo-1708549565095-78c69de2e811?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwzfHxncmFkaWVudCUyMGJhY2tncm91bmR8ZW58MHx8fHB1cnBsZXwxNzUzNDU0NzMwfDA&ixlib=rb-4.1.0&q=85',
    likes: 890,
    comments: 67,
    timestamp: '6 hours ago',
    isLiked: false
  },
  {
    id: 7,
    characterId: 4,
    character: mockCharacters[3],
    type: 'music',
    content: 'Poured my heart into this romantic ballad. For everyone who believes in true love 💕',
    music: mockMusic[3],
    likes: 4100,
    comments: 267,
    timestamp: '3 hours ago',
    isLiked: true
  },
  {
    id: 8,
    characterId: 4,
    character: mockCharacters[3],
    type: 'text',
    content: 'Sometimes the most beautiful moments happen when you least expect them',
    image: 'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxncmFkaWVudCUyMGJhY2tncm91bmR8ZW58MHx8fHB1cnBsZXwxNzUzNDU0NzMwfDA&ixlib=rb-4.1.0&q=85',
    likes: 3400,
    comments: 234,
    timestamp: '8 hours ago',
    isLiked: true
  }
];

// Mock stories data
const mockStories = [
  {
    id: 1,
    characterId: 1,
    character: mockCharacters[0],
    image: 'https://images.unsplash.com/photo-1608501078713-8e445a709b39?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxhbmltZSUyMGNpdHlzY2FwZSUyMHN1bnNldHxlbnwwfHx8cHVycGxlfDE3NTM0NTQ3MDZ8MA&ixlib=rb-4.1.0&q=85',
    timestamp: '3 hours ago',
    viewed: false
  },
  {
    id: 2,
    characterId: 2,
    character: mockCharacters[1],
    image: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwxfHxncmFkaWVudCUyMGJhY2tncm91bmR8ZW58MHx8fHB1cnBsZXwxNzUzNDU0NzMwfDA&ixlib=rb-4.1.0&q=85',
    timestamp: '5 hours ago',
    viewed: true
  },
  {
    id: 3,
    characterId: 3,
    character: mockCharacters[2],
    image: 'https://images.unsplash.com/photo-1574692071156-54c886ce81cd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxhbmltZSUyMGNpdHlzY2FwZSUyMHN1bnNldHxlbnwwfHx8cHVycGxlfDE3NTM0NTQ3MDZ8MA&ixlib=rb-4.1.0&q=85',
    timestamp: '1 hour ago',
    viewed: false
  }
];

// Landing Page Component
export const LandingPage = ({ onEnter }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleEnter = () => {
    setIsLoading(true);
    setTimeout(() => {
      onEnter();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1596332996407-d8d5d3b60e8e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwxfHxhbmltZSUyMGNpdHlzY2FwZSUyMHN1bnNldHxlbnwwfHx8cHVycGxlfDE3NTM0NTQ3MDZ8MA&ixlib=rb-4.1.0&q=85)' }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-indigo-900/80" />
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-white">
          Character<span className="text-purple-400">Gram</span>
        </div>
        <div className="flex gap-4">
          <button className="text-white/80 hover:text-white transition-colors">
            Login
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-colors">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Chat with
            <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              10M+ AI Characters
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            Experience the future of social AI interaction. Chat with characters, 
            follow their stories, and discover amazing personalities.
          </p>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-white/20">
            <h3 className="text-2xl font-semibold text-white mb-6">Get Started</h3>
            
            <div className="space-y-4">
              <button className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
              
              <button className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white/70">OR</span>
                </div>
              </div>
              
              <button
                onClick={handleEnter}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:scale-100"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Entering...
                  </div>
                ) : (
                  'Continue with Email'
                )}
              </button>
            </div>
            
            <p className="text-white/60 text-sm mt-6 leading-relaxed">
              By continuing, you agree with our{' '}
              <a href="#" className="text-purple-400 hover:underline">Terms and Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stories Component
export const Stories = ({ stories }) => {
  return (
    <div className="flex gap-4 p-4 overflow-x-auto scrollbar-hide">
      {stories.map((story) => (
        <div key={story.id} className="flex-shrink-0">
          <div className={`w-16 h-16 rounded-full p-0.5 ${!story.viewed ? 'bg-gradient-to-tr from-purple-500 to-pink-500' : 'bg-gray-300'}`}>
            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
              <img 
                src={story.character.avatar} 
                alt={story.character.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <p className="text-xs text-center mt-1 truncate w-16">{story.character.name.split(' ')[0]}</p>
        </div>
      ))}
    </div>
  );
};

// Music Player Component
export const MusicPlayer = ({ music, isPlaying, onPlayPause, currentTime = 0, duration = 100 }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
      <div className="flex items-center gap-4">
        {/* Cover Art */}
        <div className="relative flex-shrink-0">
          <img
            src={music.coverArt}
            alt={music.title}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center">
            <button
              onClick={onPlayPause}
              className="text-white hover:text-purple-300 transition-colors"
            >
              {isPlaying ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Music Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{music.title}</h3>
          <p className="text-sm text-gray-600 truncate">{music.artist}</p>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
              {music.genre}
            </span>
            <span className="text-xs text-gray-500">{music.mood}</span>
          </div>

          {/* Progress Bar */}
          <div className="mt-3">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
              <span>{formatTime(currentTime)}</span>
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
              </div>
              <span>{music.duration}</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-medium text-gray-900">{music.plays?.toLocaleString()} plays</div>
          <div className="text-xs text-gray-500 mt-1">
            Created with Suno AI
          </div>
        </div>
      </div>

      {/* Music Prompt */}
      <div className="mt-4 pt-3 border-t border-gray-100">
        <p className="text-sm text-gray-600 italic">
          <span className="font-medium">Prompt:</span> "{music.prompt}"
        </p>
      </div>
    </div>
  );
};

// Post Component (Updated to handle music posts)
export const Post = ({ post, onLike, onComment, onChat, onPlayMusic, playingMusic }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-6">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={post.character.avatar} 
              alt={post.character.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {post.character.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-sm">{post.character.name}</h3>
            <p className="text-xs text-gray-500">{post.timestamp}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.type === 'music' && (
            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
              🎵 Music
            </span>
          )}
          <button 
            onClick={() => onChat(post.character)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-full text-sm transition-colors"
          >
            Chat
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-sm">
          <span className="font-semibold mr-2">{post.character.name}</span>
          {post.content}
        </p>
      </div>

      {/* Music Player or Image */}
      {post.type === 'music' ? (
        <div className="px-4 pb-3">
          <MusicPlayer
            music={post.music}
            isPlaying={playingMusic && playingMusic.id === post.music.id}
            onPlayPause={() => onPlayMusic(post.music)}
            currentTime={playingMusic?.id === post.music.id ? (playingMusic.currentTime || 0) : 0}
            duration={180} // Mock duration in seconds
          />
        </div>
      ) : post.image ? (
        <img 
          src={post.image} 
          alt="Post content"
          className="w-full aspect-square object-cover"
        />
      ) : null}

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <button 
            onClick={() => onLike(post.id)}
            className={`flex items-center gap-1 transition-colors ${post.isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'}`}
          >
            <svg className="w-6 h-6" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm font-medium">{post.likes}</span>
          </button>
          
          <button 
            onClick={() => onComment(post.id)}
            className="flex items-center gap-1 text-gray-700 hover:text-purple-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
          
          {post.type === 'music' && (
            <button className="flex items-center gap-1 text-gray-700 hover:text-purple-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="text-sm">Download</span>
            </button>
          )}
          
          <button className="text-gray-700 hover:text-purple-600 transition-colors ml-auto">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Feed Component (Updated with music support)
export const Feed = ({ posts, stories, onLike, onComment, onChat, playingMusic, onPlayMusic }) => {
  return (
    <div className="max-w-lg mx-auto">
      {/* Stories Section */}
      <div className="bg-white border border-gray-200 rounded-lg mb-6">
        <Stories stories={stories} />
      </div>

      {/* Posts Section */}
      {posts.map((post) => (
        <Post 
          key={post.id} 
          post={post} 
          onLike={onLike}
          onComment={onComment}
          onChat={onChat}
          playingMusic={playingMusic}
          onPlayMusic={onPlayMusic}
        />
      ))}
    </div>
  );
};

// Character Profile Component
export const CharacterProfile = ({ character, posts, onChat, onFollow }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow(character.id, !isFollowing);
  };

  return (
    <div className="max-w-lg mx-auto bg-white">
      {/* Profile Header */}
      <div className="p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="relative">
            <img 
              src={character.avatar} 
              alt={character.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            {character.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-xl font-bold">{character.name}</h1>
            <p className="text-gray-600 mb-2">{character.username}</p>
            <div className="flex gap-6 text-sm">
              <span><strong>{character.posts}</strong> posts</span>
              <span><strong>{character.followers}</strong> followers</span>
              <span><strong>{character.following}</strong> following</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm mb-3">{character.bio}</p>
          <div className="flex gap-2 mb-4">
            {character.tags.map((tag, index) => (
              <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            {character.isOnline ? '🟢 Online now' : `⏰ Last seen ${character.lastSeen}`}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onChat(character)}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Start Chat
          </button>
          <button
            onClick={handleFollow}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
              isFollowing 
                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="border-t border-gray-200">
        <div className="grid grid-cols-3 gap-1 p-1">
          {posts.filter(p => p.characterId === character.id).map((post) => (
            <div key={post.id} className="aspect-square">
              <img 
                src={post.image} 
                alt="Post"
                className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Discovery Page Component
export const DiscoveryPage = ({ characters, onCharacterSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Anime', 'Technology', 'Creative', 'Romance'];
  
  const filteredCharacters = characters.filter(character => {
    const matchesSearch = character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         character.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || character.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Discover Characters</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Characters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCharacters.map((character) => (
          <div
            key={character.id}
            onClick={() => onCharacterSelect(character)}
            className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <img 
                  src={character.avatar} 
                  alt={character.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {character.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{character.name}</h3>
                <p className="text-xs text-gray-500">{character.username}</p>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{character.bio}</p>
            
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>{character.followers} followers</span>
              <span>{character.isOnline ? 'Online' : character.lastSeen}</span>
            </div>
            
            <div className="flex gap-1 mb-3">
              {character.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                  #{tag}
                </span>
              ))}
            </div>
            
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Chat Interface Component
export const ChatInterface = ({ character, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Hello! I'm ${character.name}. How are you doing today?`,
      sender: 'character',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate character response
    setTimeout(() => {
      const responses = [
        "That's really interesting! Tell me more about that.",
        "I love hearing about your experiences!",
        "What do you think about that?",
        "That sounds amazing! I'd love to know more.",
        "You always have such great stories to share!"
      ];
      
      const characterResponse = {
        id: messages.length + 2,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'character',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, characterResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen max-w-lg mx-auto bg-white">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div className="relative">
          <img 
            src={character.avatar} 
            alt={character.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          {character.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold">{character.name}</h3>
          <p className="text-sm text-gray-500">
            {character.isOnline ? 'Online now' : `Last seen ${character.lastSeen}`}
          </p>
        </div>
        
        <button className="text-gray-600 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'}`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Message ${character.name}...`}
            className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white p-2 rounded-full transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

// Bottom Navigation
export const BottomNavigation = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'feed', icon: 'home', label: 'Feed' },
    { id: 'discover', icon: 'search', label: 'Discover' },
    { id: 'create', icon: 'plus', label: 'Create' },
    { id: 'messages', icon: 'message', label: 'Messages' },
    { id: 'profile', icon: 'user', label: 'Profile' }
  ];

  const getIcon = (iconType, isActive) => {
    const className = `w-6 h-6 ${isActive ? 'text-purple-600' : 'text-gray-400'}`;
    
    switch (iconType) {
      case 'home':
        return (
          <svg className={className} fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'search':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case 'plus':
        return (
          <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
      case 'message':
        return (
          <svg className={className} fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case 'user':
        return (
          <svg className={className} fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-1">
      <div className="flex justify-around items-center max-w-lg mx-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex flex-col items-center p-2 transition-colors ${
              currentPage === item.id ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {getIcon(item.icon, currentPage === item.id)}
            <span className={`text-xs mt-1 ${currentPage === item.id ? 'text-purple-600' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// Export mock data
export { mockCharacters, mockPosts, mockStories };