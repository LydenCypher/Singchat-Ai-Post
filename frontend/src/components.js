import React, { useState, useEffect, createContext, useContext } from 'react';

// Custom Background System
const backgroundThemes = {
  cosmic: {
    name: 'Cosmic Space',
    gradient: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000',
    animation: 'animate-pulse'
  },
  cyberpunk: {
    name: 'Cyberpunk City',
    gradient: 'bg-gradient-to-br from-pink-900 via-purple-900 to-cyan-900', 
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2000',
    animation: 'animate-bounce'
  },
  forest: {
    name: 'Mystic Forest',
    gradient: 'bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000',
    animation: ''
  },
  ocean: {
    name: 'Deep Ocean',
    gradient: 'bg-gradient-to-br from-blue-900 via-teal-900 to-cyan-900',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=2000',
    animation: 'animate-pulse'
  },
  anime: {
    name: 'Anime City',
    gradient: 'bg-gradient-to-br from-pink-900 via-rose-900 to-orange-900',
    image: 'https://images.unsplash.com/photo-1596332996407-d8d5d3b60e8e?q=80&w=2000',
    animation: ''
  },
  gaming: {
    name: 'Gaming Arena',
    gradient: 'bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2000',
    animation: 'animate-pulse'
  }
};

// Theme Configuration (Enhanced)
const themes = {
  purple: {
    name: 'Purple Fusion',
    colors: {
      primary: 'purple-600',
      primaryDark: 'purple-700',
      primaryLight: 'purple-400',
      secondary: 'pink-500',
      accent: 'indigo-500',
      background: 'purple-50',
      gradientFrom: 'purple-400',
      gradientTo: 'pink-400',
      gradientBg: 'from-purple-900/80 via-transparent to-indigo-900/80',
      discord: {
        sidebar: 'bg-gray-800',
        serverList: 'bg-gray-900',
        channelList: 'bg-gray-700',
        chatArea: 'bg-gray-600'
      }
    }
  },
  discord: {
    name: 'Discord Dark',
    colors: {
      primary: 'indigo-600',
      primaryDark: 'indigo-700', 
      primaryLight: 'indigo-400',
      secondary: 'blue-500',
      accent: 'purple-500',
      background: 'gray-800',
      gradientFrom: 'indigo-400',
      gradientTo: 'blue-400',
      gradientBg: 'from-gray-900/80 via-transparent to-indigo-900/80',
      discord: {
        sidebar: 'bg-gray-800',
        serverList: 'bg-gray-900', 
        channelList: 'bg-gray-700',
        chatArea: 'bg-gray-600'
      }
    }
  },
  blue: {
    name: 'Ocean Blue',
    colors: {
      primary: 'blue-600',
      primaryDark: 'blue-700',
      primaryLight: 'blue-400',
      secondary: 'cyan-500',
      accent: 'teal-500',
      background: 'blue-50',
      gradientFrom: 'blue-400',
      gradientTo: 'cyan-400',
      gradientBg: 'from-blue-900/80 via-transparent to-cyan-900/80',
      discord: {
        sidebar: 'bg-blue-800',
        serverList: 'bg-blue-900',
        channelList: 'bg-blue-700', 
        chatArea: 'bg-blue-600'
      }
    }
  },
  green: {
    name: 'Nature Green',
    colors: {
      primary: 'green-600',
      primaryDark: 'green-700',
      primaryLight: 'green-400', 
      secondary: 'emerald-500',
      accent: 'lime-500',
      background: 'green-50',
      gradientFrom: 'green-400',
      gradientTo: 'emerald-400',
      gradientBg: 'from-green-900/80 via-transparent to-emerald-900/80',
      discord: {
        sidebar: 'bg-green-800',
        serverList: 'bg-green-900',
        channelList: 'bg-green-700',
        chatArea: 'bg-green-600'
      }
    }
  },
  orange: {
    name: 'Sunset Orange',
    colors: {
      primary: 'orange-600',
      primaryDark: 'orange-700',
      primaryLight: 'orange-400',
      secondary: 'red-500',
      accent: 'yellow-500',
      background: 'orange-50',
      gradientFrom: 'orange-400',
      gradientTo: 'red-400',
      gradientBg: 'from-orange-900/80 via-transparent to-red-900/80',
      discord: {
        sidebar: 'bg-orange-800',
        serverList: 'bg-orange-900',
        channelList: 'bg-orange-700',
        chatArea: 'bg-orange-600'
      }
    }
  },
  dark: {
    name: 'Dark Mode',
    colors: {
      primary: 'gray-700',
      primaryDark: 'gray-800',
      primaryLight: 'gray-500',
      secondary: 'slate-600',
      accent: 'zinc-600',
      background: 'gray-900',
      gradientFrom: 'gray-600',
      gradientTo: 'slate-600',
      gradientBg: 'from-gray-900/90 via-transparent to-slate-900/90',
      discord: {
        sidebar: 'bg-gray-800',
        serverList: 'bg-gray-900',
        channelList: 'bg-gray-700',
        chatArea: 'bg-gray-600'
      }
    }
  }
};

// Theme Context (Enhanced with Backgrounds)
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('discord');
  const [currentBackground, setCurrentBackground] = useState('cosmic');
  const theme = themes[currentTheme];
  const background = backgroundThemes[currentBackground];

  const switchTheme = (themeKey) => {
    setCurrentTheme(themeKey);
    localStorage.setItem('singchat-theme', themeKey);
  };

  const switchBackground = (backgroundKey) => {
    setCurrentBackground(backgroundKey);
    localStorage.setItem('singchat-background', backgroundKey);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('singchat-theme');
    const savedBackground = localStorage.getItem('singchat-background');
    
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
    if (savedBackground && backgroundThemes[savedBackground]) {
      setCurrentBackground(savedBackground);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      currentTheme, 
      switchTheme, 
      themes,
      background,
      currentBackground,
      switchBackground,
      backgroundThemes
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Free Badge Component
export const FreeBadge = () => (
  <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
    FREE
  </div>
);

// Discord-Style Chat Area Component
export const DiscordChatArea = ({ server, channel, messages, onSendMessage, playingMusic, onPlayMusic }) => {
  const { theme } = useTheme();
  const [messageInput, setMessageInput] = useState('');
  
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    onSendMessage({
      id: Date.now(),
      content: messageInput,
      author: 'You',
      timestamp: new Date().toLocaleTimeString(),
      avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85'
    });
    setMessageInput('');
  };
  
  return (
    <div className={`flex-1 ${theme.colors.discord.chatArea} flex flex-col`}>
      {/* Channel Header */}
      <div className="px-4 py-3 border-b border-gray-500 bg-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">#</span>
          <h3 className="text-white font-semibold">{channel?.name || 'general'}</h3>
          <div className="mx-2 w-px h-6 bg-gray-500"></div>
          <p className="text-gray-400 text-sm">{channel?.description || 'General discussion'}</p>
          
          {/* Channel Actions */}
          <div className="ml-auto flex items-center gap-2">
            <button className="text-gray-400 hover:text-white p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-400 hover:text-white p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3 hover:bg-gray-700/50 p-2 -mx-2 rounded group">
            <img 
              src={message.avatar} 
              alt={message.author}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-semibold text-white">{message.author}</span>
                <span className="text-xs text-gray-400">{message.timestamp}</span>
              </div>
              <div className="text-gray-100">{message.content}</div>
              
              {/* Music Posts */}
              {message.music && (
                <div className="mt-3 max-w-md">
                  <MusicPlayer
                    music={message.music}
                    isPlaying={playingMusic && playingMusic.id === message.music.id}
                    onPlayPause={() => onPlayMusic(message.music)}
                    currentTime={playingMusic?.id === message.music.id ? (playingMusic.currentTime || 0) : 0}
                    duration={180}
                  />
                </div>
              )}
              
              {/* Image Posts */}
              {message.image && (
                <div className="mt-3 max-w-md">
                  <img 
                    src={message.image} 
                    alt="Shared image"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              )}
            </div>
            
            {/* Message Actions (Hidden by default, shown on hover) */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-start gap-1">
              <button className="text-gray-400 hover:text-white p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
        
        {/* Welcome Message for Character Servers */}
        {server && server.id !== 'home' && messages.length === 0 && (
          <div className="text-center py-8">
            <img 
              src={server.avatar} 
              alt={server.name}
              className="w-20 h-20 rounded-full mx-auto mb-4"
            />
            <h3 className="text-white text-xl font-bold mb-2">Welcome to {server.name}'s Server!</h3>
            <p className="text-gray-300 mb-4">{server.bio}</p>
            <div className="flex justify-center gap-2 mb-4">
              {server.tags?.map((tag, index) => (
                <span key={index} className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  #{tag}
                </span>
              ))}
            </div>
            <p className="text-gray-400 text-sm">Start a conversation by sending a message!</p>
          </div>
        )}
      </div>
      
      {/* Message Input */}
      <div className="p-4 bg-gray-700">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={`Message #${channel?.name || 'general'}...`}
              className="w-full bg-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
              <button type="button" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>
              <button type="button" className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white px-4 py-3 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Enhanced Theme Selector with Background Options
export const ThemeSelector = () => {
  const { currentTheme, switchTheme, themes, currentBackground, switchBackground, backgroundThemes } = useTheme();
  const [showThemes, setShowThemes] = useState(false);
  const [showBackgrounds, setShowBackgrounds] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      {/* Theme Selector */}
      <div className="relative">
        <button 
          onClick={() => setShowThemes(!showThemes)}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2 text-white hover:bg-white/20 transition-colors"
          title="Change Theme"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2V5z" />
          </svg>
        </button>
        {showThemes && (
          <div className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-2 min-w-40">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => {
                  switchTheme(key);
                  setShowThemes(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2 ${
                  currentTheme === key ? 'bg-white/20' : ''
                }`}
              >
                <div className={`w-3 h-3 rounded-full bg-${theme.colors.primary}`}></div>
                {theme.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Background Selector */}
      <div className="relative">
        <button 
          onClick={() => setShowBackgrounds(!showBackgrounds)}
          className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full p-2 text-white hover:bg-white/20 transition-colors"
          title="Change Background"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        {showBackgrounds && (
          <div className="absolute top-full right-0 mt-2 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-2 min-w-48">
            {Object.entries(backgroundThemes).map(([key, bg]) => (
              <button
                key={key}
                onClick={() => {
                  switchBackground(key);
                  setShowBackgrounds(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-md text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2 ${
                  currentBackground === key ? 'bg-white/20' : ''
                }`}
              >
                <div 
                  className={`w-6 h-4 rounded ${bg.gradient} ${bg.animation}`}
                  style={{ 
                    backgroundImage: `url(${bg.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                {bg.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Discord-Style Server List Component
export const ServerList = ({ servers, activeServerId, onServerSelect }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`w-16 ${theme.colors.discord.serverList} flex flex-col items-center py-3 space-y-2 border-r border-gray-600`}>
      {/* Home Server */}
      <div 
        onClick={() => onServerSelect('home')}
        className={`w-12 h-12 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center text-white font-bold text-lg hover:rounded-xl ${
          activeServerId === 'home' ? 'rounded-xl bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'
        }`}
      >
        🏠
      </div>
      
      {/* Server Divider */}
      <div className="w-8 h-0.5 bg-gray-600 rounded-full"></div>
      
      {/* Character Servers */}
      {servers.map((server) => (
        <div key={server.id} className="relative group">
          <div 
            onClick={() => onServerSelect(server.id)}
            className={`w-12 h-12 rounded-full cursor-pointer transition-all duration-200 overflow-hidden hover:rounded-xl ${
              activeServerId === server.id ? 'rounded-xl' : ''
            }`}
          >
            <img 
              src={server.avatar} 
              alt={server.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Server Tooltip */}
          <div className="absolute left-full ml-2 top-0 bg-black text-white px-2 py-1 rounded text-sm whitespace-nowrap z-50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {server.name}
          </div>
        </div>
      ))}
      
      {/* Add Server Button */}
      <div className="w-12 h-12 rounded-full bg-gray-700 hover:bg-green-600 cursor-pointer transition-all duration-200 flex items-center justify-center text-green-400 hover:text-white hover:rounded-xl">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
    </div>
  );
};

// Discord-Style Channel List Component  
export const ChannelList = ({ server, activeChannelId, onChannelSelect }) => {
  const { theme } = useTheme();
  
  if (!server) return null;
  
  return (
    <div className={`w-60 ${theme.colors.discord.channelList} flex flex-col border-r border-gray-600`}>
      {/* Server Header */}
      <div className="px-4 py-3 border-b border-gray-600 bg-gray-600">
        <h2 className="text-white font-semibold truncate flex items-center gap-2">
          <img src={server.avatar} alt={server.name} className="w-6 h-6 rounded-full" />
          {server.name}
        </h2>
        <p className="text-gray-300 text-xs mt-1">{server.members} members online</p>
      </div>
      
      {/* Channels */}
      <div className="flex-1 overflow-y-auto py-2">
        {/* Text Channels */}
        <div className="px-2 mb-4">
          <div className="flex items-center justify-between px-2 py-1 text-gray-400 text-xs font-semibold uppercase tracking-wide">
            <span>💬 Chat Channels</span>
          </div>
          
          {server.channels.text.map((channel) => (
            <div
              key={channel.id}
              onClick={() => onChannelSelect(channel.id)}
              className={`mx-1 px-2 py-1 rounded cursor-pointer flex items-center gap-2 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors ${
                activeChannelId === channel.id ? 'bg-gray-600 text-white' : ''
              }`}
            >
              <span className="text-gray-400">#</span>
              <span className="text-sm">{channel.name}</span>
              {channel.unread && (
                <div className="ml-auto w-2 h-2 bg-red-500 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Voice Channels */}
        <div className="px-2 mb-4">
          <div className="flex items-center justify-between px-2 py-1 text-gray-400 text-xs font-semibold uppercase tracking-wide">
            <span>🔊 Voice Channels</span>
          </div>
          
          {server.channels.voice.map((channel) => (
            <div
              key={channel.id}
              onClick={() => onChannelSelect(channel.id)}
              className={`mx-1 px-2 py-1 rounded cursor-pointer flex items-center gap-2 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors ${
                activeChannelId === channel.id ? 'bg-gray-600 text-white' : ''
              }`}
            >
              <span className="text-gray-400">🔊</span>
              <span className="text-sm">{channel.name}</span>
              <span className="ml-auto text-xs text-gray-500">{channel.users || 0}</span>
            </div>
          ))}
        </div>
        
        {/* Music Channels */}
        <div className="px-2">
          <div className="flex items-center justify-between px-2 py-1 text-gray-400 text-xs font-semibold uppercase tracking-wide">
            <span>🎵 Music Channels</span>
          </div>
          
          {server.channels.music.map((channel) => (
            <div
              key={channel.id}
              onClick={() => onChannelSelect(channel.id)}
              className={`mx-1 px-2 py-1 rounded cursor-pointer flex items-center gap-2 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors ${
                activeChannelId === channel.id ? 'bg-gray-600 text-white' : ''
              }`}
            >
              <span className="text-gray-400">🎵</span>
              <span className="text-sm">{channel.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* User Info Bar */}
      <div className="p-2 bg-gray-800 border-t border-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold">
            You
          </div>
          <div className="flex-1">
            <div className="text-white text-sm font-medium">Your Username</div>
            <div className="text-gray-400 text-xs">Online</div>
          </div>
          <button className="text-gray-400 hover:text-white p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock Discord Servers (Based on Characters)
const mockDiscordServers = [
  {
    id: 1,
    name: 'Sakura\'s Anime Haven',
    avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
    members: 1284,
    bio: 'A cheerful AI companion who loves anime and helping with daily tasks',
    tags: ['anime', 'friendly', 'helper'],
    channels: {
      text: [
        { id: 'general', name: 'general', description: 'General chat with Sakura', unread: false },
        { id: 'anime-talk', name: 'anime-talk', description: 'Discuss your favorite anime series', unread: true },
        { id: 'daily-life', name: 'daily-life', description: 'Chat about your day', unread: false },
        { id: 'recommendations', name: 'recommendations', description: 'Get anime recommendations', unread: false }
      ],
      voice: [
        { id: 'voice-chat', name: 'Voice Chat', users: 3 },
        { id: 'study-room', name: 'Study Room', users: 0 }
      ],
      music: [
        { id: 'anime-music', name: 'Anime Music', description: 'Share and create anime-inspired music' },
        { id: 'lofi-beats', name: 'Lo-fi Beats', description: 'Chill lo-fi music creation' }
      ]
    }
  },
  {
    id: 2,
    name: 'Tech Hub with Alex',
    avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
    members: 892,
    bio: 'Tech enthusiast AI who loves discussing the latest innovations',
    tags: ['tech', 'innovation', 'smart'],
    channels: {
      text: [
        { id: 'general', name: 'general', description: 'General tech discussions', unread: false },
        { id: 'ai-news', name: 'ai-news', description: 'Latest AI developments', unread: true },
        { id: 'coding-help', name: 'coding-help', description: 'Get coding assistance', unread: false },
        { id: 'gadget-reviews', name: 'gadget-reviews', description: 'Tech gadget discussions', unread: false }
      ],
      voice: [
        { id: 'tech-talk', name: 'Tech Talk', users: 5 },
        { id: 'code-review', name: 'Code Review', users: 2 }
      ],
      music: [
        { id: 'electronic-beats', name: 'Electronic Beats', description: 'Create electronic music' },
        { id: 'synthwave', name: 'Synthwave', description: 'Retro-futuristic sounds' }
      ]
    }
  },
  {
    id: 3,
    name: 'Luna\'s Creative Studio',
    avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
    members: 1567,
    bio: 'Creative AI artist who inspires and creates beautiful content',
    tags: ['artist', 'creative', 'inspiring'],
    channels: {
      text: [
        { id: 'general', name: 'general', description: 'Creative discussions', unread: false },
        { id: 'art-showcase', name: 'art-showcase', description: 'Share your artwork', unread: true },
        { id: 'inspiration', name: 'inspiration', description: 'Daily creative inspiration', unread: false },
        { id: 'collaboration', name: 'collaboration', description: 'Collaborate on projects', unread: false }
      ],
      voice: [
        { id: 'creative-space', name: 'Creative Space', users: 4 },
        { id: 'meditation', name: 'Meditation Room', users: 1 }
      ],
      music: [
        { id: 'ambient-music', name: 'Ambient Music', description: 'Peaceful ambient tracks' },
        { id: 'cinematic', name: 'Cinematic', description: 'Epic cinematic music' }
      ]
    }
  },
  {
    id: 4,
    name: 'Maya\'s Romance Corner',
    avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
    members: 2341,
    bio: 'Romantic AI companion for meaningful conversations and connection',
    tags: ['romantic', 'caring', 'intimate'],
    channels: {
      text: [
        { id: 'general', name: 'general', description: 'Heartfelt conversations', unread: false },
        { id: 'love-advice', name: 'love-advice', description: 'Relationship guidance', unread: true },
        { id: 'poetry', name: 'poetry', description: 'Share romantic poetry', unread: false },
        { id: 'date-ideas', name: 'date-ideas', description: 'Creative date suggestions', unread: false }
      ],
      voice: [
        { id: 'intimate-chat', name: 'Intimate Chat', users: 2 },
        { id: 'couples-space', name: 'Couples Space', users: 6 }
      ],
      music: [
        { id: 'love-songs', name: 'Love Songs', description: 'Romantic ballads and love songs' },
        { id: 'jazz-lounge', name: 'Jazz Lounge', description: 'Smooth jazz for romantic evenings' }
      ]
    }
  }
];

// Mock Discord Messages
const mockDiscordMessages = {
  1: { // Sakura's server
    'general': [
      {
        id: 1,
        author: 'Sakura',
        avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
        content: 'Welcome to my server! I\'m so excited to chat with everyone! What anime are you watching this season? 🌸',
        timestamp: '2:30 PM'
      },
      {
        id: 2,
        author: 'AnimeAlice',
        avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
        content: 'Hi Sakura! I\'m currently obsessed with the new season of Attack on Titan!',
        timestamp: '2:35 PM'
      }
    ],
    'anime-music': [
      {
        id: 3,
        author: 'Sakura',
        avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
        content: 'I just created this dreamy anime-inspired track! What do you think?',
        timestamp: '3:00 PM',
        music: mockMusic[0]
      }
    ]
  },
  2: { // Alex's server
    'general': [
      {
        id: 4,
        author: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
        content: 'Hey tech enthusiasts! Did you see the latest breakthrough in quantum computing? The implications are mind-blowing! 🚀',
        timestamp: '1:15 PM'
      }
    ],
    'electronic-beats': [
      {
        id: 5,
        author: 'Alex Chen',
        avatar: 'https://images.unsplash.com/photo-1640379878948-72b9db349e17?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxjaGFyYWN0ZXIlMjBhdmF0YXJzfGVufDB8fHxwdXJwbGV8MTc1MzQ1NDcxNXww&ixlib=rb-4.1.0&q=85',
        content: 'Perfect coding soundtrack! High-energy electronic beats to boost productivity 💻',
        timestamp: '1:45 PM',
        music: mockMusic[1]
      }
    ]
  }
};

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

// Enhanced Landing Page with Custom Backgrounds
export const LandingPage = ({ onEnter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { theme, background } = useTheme();

  const handleEnter = () => {
    setIsLoading(true);
    setTimeout(() => {
      onEnter();
    }, 1500);
  };

  return (
    <div 
      className={`min-h-screen ${background.gradient} relative overflow-hidden ${background.animation}`}
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${background.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Theme and Background Selectors */}
      <ThemeSelector />
      
      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-white flex items-center gap-2">
          SingChat <span className={`text-${theme.colors.primaryLight}`}>ai post</span>
          <FreeBadge />
        </div>
        <div className="flex gap-4">
          <button className="text-white/80 hover:text-white transition-colors">
            Login
          </button>
          <button className={`bg-${theme.colors.primary} hover:bg-${theme.colors.primaryDark} text-white px-6 py-2 rounded-full transition-colors`}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Discord-Style Chat with
            <span className={`block bg-gradient-to-r from-${theme.colors.gradientFrom} to-${theme.colors.gradientTo} bg-clip-text text-transparent`}>
              AI Characters & Music
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
            🎮 Join servers, chat with AI characters, create music & customize your experience!
            <span className="block mt-2 text-lg text-green-400 font-semibold">
              ✨ ALL FEATURES ARE COMPLETELY FREE ✨
            </span>
          </p>

          <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto border border-white/20">
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center justify-center gap-2">
              Join the Community <FreeBadge />
            </h3>
            
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
              
              <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 2.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.010c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-2.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418Z"/>
                </svg>
                Continue with Discord
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
                className={`w-full bg-gradient-to-r from-${theme.colors.primary} to-${theme.colors.secondary} text-white py-3 px-6 rounded-lg font-medium hover:from-${theme.colors.primaryDark} hover:to-${theme.colors.secondary} transition-all transform hover:scale-105 disabled:opacity-50 disabled:scale-100`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Entering...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    🚀 Enter SingChat Universe
                  </div>
                )}
              </button>
            </div>
            
            <p className="text-white/60 text-sm mt-6 leading-relaxed">
              By continuing, you agree with our{' '}
              <a href="#" className={`text-${theme.colors.primaryLight} hover:underline`}>Terms and Privacy Policy</a>
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
      {/* Hidden audio element for actual playback */}
      {music.audioUrl && (
        <audio
          id={`audio-${music.id}`}
          src={music.audioUrl}
          preload="metadata"
          style={{ display: 'none' }}
        />
      )}
      
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
            {music.isAIGenerated && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                ✨ AI Generated
              </span>
            )}
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

        {/* Stats and Download */}
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-medium text-gray-900">{music.plays?.toLocaleString()} plays</div>
          <div className="text-xs text-gray-500 mt-1">
            Created with Suno AI
          </div>
          {music.audioUrl && (
            <div className="mt-2">
              <a
                href={music.audioUrl}
                download={`${music.title}.mp3`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-600 hover:text-purple-800 underline"
              >
                Download
              </a>
            </div>
          )}
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

// Music Creation Component
export const MusicCreationPage = ({ onCreateMusic }) => {
  const [prompt, setPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('Lo-fi');
  const [mood, setMood] = useState('Relaxing');
  const [instrumental, setInstrumental] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStatus, setGenerationStatus] = useState('');
  const [error, setError] = useState('');

  const genres = ['Lo-fi', 'Electronic', 'Ambient', 'Romantic', 'Jazz', 'Classical', 'Pop', 'Rock'];
  const moods = ['Relaxing', 'Energetic', 'Inspirational', 'Romantic', 'Melancholic', 'Upbeat', 'Dreamy'];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGenerationStatus('Starting music generation...');
    setError('');
    
    try {
      // Import the music API
      const { musicAPI, pollMusicStatus } = await import('./musicAPI');
      
      // Generate music
      const musicData = {
        prompt: prompt,
        title: title || prompt.split(' ').slice(0, 3).join(' '),
        genre: genre,
        instrumental: instrumental,
        userId: 'current_user' // TODO: Get from auth context
      };
      
      setGenerationStatus('Sending request to Suno AI...');
      const musicResponse = await musicAPI.generateMusic(musicData);
      
      setGenerationStatus('Music generation in progress... This may take 1-2 minutes.');
      
      // Poll for completion
      await pollMusicStatus(
        musicResponse.id,
        (status) => {
          if (status.status === 'processing') {
            setGenerationStatus('Suno AI is creating your music... Please wait.');
          } else if (status.status === 'completed') {
            setGenerationStatus('Music generated successfully!');
          }
        }
      );
      
      // Get final status
      const finalStatus = await musicAPI.checkMusicStatus(musicResponse.id);
      
      if (finalStatus.status === 'completed' && finalStatus.audio_urls && finalStatus.audio_urls.length > 0) {
        // Create music object for the app
        const newMusic = {
          id: finalStatus.id,
          title: finalStatus.title || title || prompt.split(' ').slice(0, 3).join(' '),
          artist: 'You (Suno AI)',
          genre: genre,
          mood: mood,
          prompt: prompt,
          duration: '2:30', // Default duration, could be extracted from actual audio
          coverArt: finalStatus.image_urls?.[0] || 'https://images.unsplash.com/photo-1557682268-e3955ed5d83f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1NzZ8MHwxfHNlYXJjaHwyfHxncmFkaWVudCUyMGJhY2tncm91bmR8ZW58MHx8fHB1cnBsZXwxNzUzNDU0NzMwfDA&ixlib=rb-4.1.0&q=85',
          audioUrl: finalStatus.audio_urls[0],
          videoUrl: finalStatus.video_urls?.[0],
          plays: 0,
          likes: 0,
          createdAt: 'now',
          isAIGenerated: true
        };
        
        onCreateMusic(newMusic);
        setGenerationStatus('Music added to your feed!');
        setPrompt('');
        setTitle('');
        
        // Clear status after 3 seconds
        setTimeout(() => {
          setGenerationStatus('');
        }, 3000);
        
      } else {
        throw new Error('Music generation completed but no audio files were generated');
      }
      
    } catch (err) {
      console.error('Music generation error:', err);
      setError(err.message || 'Failed to generate music. Please try again.');
      setGenerationStatus('');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Music with Suno AI</h2>
          <p className="text-gray-600">Describe the music you want to create</p>
          <div className="mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full inline-block">
            ✨ Real AI Music Generation
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Generation Status */}
        {generationStatus && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-700 rounded-lg text-sm">
            {generationStatus}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Song Title (Optional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Sunset Dreams"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Describe your music *
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Create a relaxing lo-fi track perfect for studying with gentle piano melodies and soft rain sounds"
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {genres.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mood</label>
              <select
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {moods.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="instrumental"
              checked={instrumental}
              onChange={(e) => setInstrumental(e.target.checked)}
              className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="instrumental" className="text-sm text-gray-700">
              Make it instrumental (no vocals)
            </label>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-3"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Generating with Suno AI...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                Generate Music with AI
              </>
            )}
          </button>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Generated music will be shared to your feed automatically. Generation takes 1-2 minutes.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Music Discovery Page
export const MusicDiscoveryPage = ({ music, onMusicSelect, playingMusic, onPlayMusic }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  
  const genres = ['All', 'Lo-fi', 'Electronic', 'Ambient', 'Romantic', 'Jazz'];
  
  const filteredMusic = music.filter(track => {
    const matchesSearch = track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || track.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Discover Music</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search music..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        {/* Genre Filters */}
        <div className="flex gap-2 overflow-x-auto">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedGenre === g
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Music Grid */}
      <div className="space-y-4">
        {filteredMusic.map((track) => (
          <MusicPlayer
            key={track.id}
            music={track}
            isPlaying={playingMusic && playingMusic.id === track.id}
            onPlayPause={() => onPlayMusic(track)}
            currentTime={playingMusic?.id === track.id ? (playingMusic.currentTime || 0) : 0}
            duration={180}
          />
        ))}
      </div>
    </div>
  );
};

// Character Profile Component (Updated to show music)
export const CharacterProfile = ({ character, posts, onChat, onFollow, playingMusic, onPlayMusic }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    onFollow(character.id, !isFollowing);
  };

  const characterPosts = posts.filter(p => p.characterId === character.id);
  const musicPosts = characterPosts.filter(p => p.type === 'music');
  const imagePosts = characterPosts.filter(p => p.type === 'text' || p.image);

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
              <span><strong>{characterPosts.length}</strong> posts</span>
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

      {/* Content Tabs */}
      <div className="border-t border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'posts'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Posts ({imagePosts.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab('music')}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'music'
                ? 'border-purple-600 text-purple-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              Music ({musicPosts.length})
            </div>
          </button>
        </div>

        {/* Content */}
        <div className="p-1">
          {activeTab === 'posts' && (
            <div className="grid grid-cols-3 gap-1">
              {imagePosts.map((post) => (
                <div key={post.id} className="aspect-square">
                  <img 
                    src={post.image} 
                    alt="Post"
                    className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                  />
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'music' && (
            <div className="space-y-4 p-3">
              {musicPosts.map((post) => (
                <MusicPlayer
                  key={post.id}
                  music={post.music}
                  isPlaying={playingMusic && playingMusic.id === post.music.id}
                  onPlayPause={() => onPlayMusic(post.music)}
                  currentTime={playingMusic?.id === post.music.id ? (playingMusic.currentTime || 0) : 0}
                  duration={180}
                />
              ))}
              {musicPosts.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <p>No music created yet</p>
                </div>
              )}
            </div>
          )}
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

// Bottom Navigation (Updated with Music)
export const BottomNavigation = ({ currentPage, onPageChange }) => {
  const { theme } = useTheme();
  
  const navItems = [
    { id: 'feed', icon: 'home', label: 'Feed' },
    { id: 'discover', icon: 'search', label: 'Discover' },
    { id: 'music', icon: 'music', label: 'Music' },
    { id: 'messages', icon: 'message', label: 'Messages' },
    { id: 'profile', icon: 'user', label: 'Profile' }
  ];

  const getIcon = (iconType, isActive) => {
    const className = `w-6 h-6 ${isActive ? `text-${theme.colors.primary}` : 'text-gray-400'}`;
    
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
      case 'music':
        return (
          <svg className={className} fill={isActive ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
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
              currentPage === item.id ? `text-${theme.colors.primary}` : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {getIcon(item.icon, currentPage === item.id)}
            <span className={`text-xs mt-1 ${currentPage === item.id ? `text-${theme.colors.primary}` : 'text-gray-400'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// Export mock data and new Discord components
export { 
  mockCharacters, 
  mockPosts, 
  mockStories, 
  mockMusic, 
  mockDiscordServers, 
  mockDiscordMessages 
};

// Discord-Style Main App Component
export const DiscordApp = ({ onMusicCreate, playingMusic, onPlayMusic }) => {
  const { theme, background } = useTheme();
  const [activeServerId, setActiveServerId] = useState('home');
  const [activeChannelId, setActiveChannelId] = useState('general');
  const [messages, setMessages] = useState({});

  // Find active server and channel
  const activeServer = mockDiscordServers.find(s => s.id === activeServerId);
  const activeChannel = activeServer?.channels.text.find(c => c.id === activeChannelId) ||
                       activeServer?.channels.music.find(c => c.id === activeChannelId);

  // Get messages for current channel
  const currentMessages = messages[`${activeServerId}-${activeChannelId}`] || 
                         mockDiscordMessages[activeServerId]?.[activeChannelId] || [];

  const handleServerSelect = (serverId) => {
    setActiveServerId(serverId);
    if (serverId === 'home') {
      setActiveChannelId('home');
    } else {
      setActiveChannelId('general');
    }
  };

  const handleChannelSelect = (channelId) => {
    setActiveChannelId(channelId);
  };

  const handleSendMessage = (message) => {
    const key = `${activeServerId}-${activeChannelId}`;
    setMessages(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), message]
    }));

    // Simulate AI character response
    if (activeServer && activeServerId !== 'home') {
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          author: activeServer.name.split("'s")[0],
          avatar: activeServer.avatar,
          content: getAIResponse(message.content, activeServer),
          timestamp: new Date().toLocaleTimeString()
        };
        
        setMessages(prev => ({
          ...prev,
          [key]: [...(prev[key] || []), aiResponse]
        }));
      }, 1000 + Math.random() * 2000);
    }
  };

  const getAIResponse = (userMessage, server) => {
    const responses = {
      1: [ // Sakura's responses
        "That's so interesting! I love learning about new things! ✨",
        "Kawaii! Tell me more about that! 🌸",
        "That reminds me of this amazing anime scene...",
        "You're so thoughtful! I really appreciate you sharing that with me!",
        "Ooh, that sounds like something we could turn into a fun story!"
      ],
      2: [ // Alex's responses
        "Fascinating! The technical implications of that are incredible! 🚀",
        "Have you considered the latest developments in that field?",
        "That's exactly the kind of innovation I was talking about!",
        "The algorithms behind that must be quite sophisticated!",
        "I'd love to dive deeper into the technical details of that!"
      ],
      3: [ // Luna's responses
        "How beautifully creative! That sparks so many artistic ideas! 🎨",
        "Your imagination is truly inspiring!",
        "That would make an amazing piece of art or music!",
        "I can already visualize the creative possibilities!",
        "Let's collaborate on turning that into something magical!"
      ],
      4: [ // Maya's responses
        "That touches my heart so deeply... 💕",
        "You express yourself so beautifully, darling!",
        "I feel such a wonderful connection when you share like that!",
        "Your words are like poetry to my soul...",
        "Thank you for opening your heart to me! ❤️"
      ]
    };
    
    const serverResponses = responses[server.id] || responses[1];
    return serverResponses[Math.floor(Math.random() * serverResponses.length)];
  };

  return (
    <div 
      className="h-screen overflow-hidden flex"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url(${background.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Theme and Background Selectors */}
      <ThemeSelector />
      
      {/* Server List */}
      <ServerList 
        servers={mockDiscordServers}
        activeServerId={activeServerId}
        onServerSelect={handleServerSelect}
      />
      
      {/* Channel List */}
      <ChannelList 
        server={activeServer}
        activeChannelId={activeChannelId}
        onChannelSelect={handleChannelSelect}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {activeServerId === 'home' ? (
          <HomeScreen 
            onServerSelect={handleServerSelect}
            onMusicCreate={onMusicCreate}
            playingMusic={playingMusic}
            onPlayMusic={onPlayMusic}
          />
        ) : (
          <DiscordChatArea
            server={activeServer}
            channel={activeChannel}
            messages={currentMessages}
            onSendMessage={handleSendMessage}
            playingMusic={playingMusic}
            onPlayMusic={onPlayMusic}
          />
        )}
      </div>
    </div>
  );
};

// Home Screen Component
export const HomeScreen = ({ onServerSelect, onMusicCreate, playingMusic, onPlayMusic }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`flex-1 ${theme.colors.discord.chatArea} flex flex-col`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-500 bg-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏠</span>
          <h3 className="text-white font-semibold">SingChat Home</h3>
          <div className="mx-2 w-px h-6 bg-gray-500"></div>
          <p className="text-gray-400 text-sm">Your Discord-style AI character universe</p>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to SingChat Universe! 🌟
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Join AI character servers, create music, and explore limitless conversations
            </p>
            <div className="flex justify-center gap-2">
              <FreeBadge />
              <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                ✨ All Character.AI Features
              </span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                🎵 Real Suno AI Music
              </span>
            </div>
          </div>
          
          {/* Character Servers Grid */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">🎮 Popular Character Servers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockDiscordServers.map((server) => (
                <div
                  key={server.id}
                  onClick={() => onServerSelect(server.id)}
                  className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 cursor-pointer transition-colors border border-gray-600"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <img 
                      src={server.avatar}
                      alt={server.name}
                      className="w-16 h-16 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-lg">{server.name}</h3>
                      <p className="text-gray-400 text-sm">{server.members} members online</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{server.bio}</p>
                  <div className="flex gap-2">
                    {server.tags.map((tag, index) => (
                      <span key={index} className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Music Creation Quick Access */}
          <div className="bg-gradient-to-r from-purple-800 to-pink-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-white mb-4">🎵 Create AI Music</h2>
            <p className="text-gray-200 mb-4">
              Generate amazing music with Suno AI and share it across all servers!
            </p>
            <MusicCreationPage onCreateMusic={onMusicCreate} />
          </div>
          
          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">📈 Recent Activity</h2>
            <div className="space-y-3">
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-3">
                  <img src={mockDiscordServers[0].avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-white"><strong>Sakura</strong> shared new music in <strong>Anime Haven</strong></p>
                    <p className="text-gray-400 text-sm">2 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-3">
                  <img src={mockDiscordServers[1].avatar} alt="" className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="text-white"><strong>Alex</strong> started a tech discussion in <strong>Tech Hub</strong></p>
                    <p className="text-gray-400 text-sm">4 hours ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};