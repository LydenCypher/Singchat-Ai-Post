import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LandingPage,
  Feed,
  DiscoveryPage,
  CharacterProfile,
  ChatInterface,
  BottomNavigation,
  mockCharacters,
  mockPosts,
  mockStories
} from './components';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('feed');
  const [posts, setPosts] = useState(mockPosts);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [isInChat, setIsInChat] = useState(false);

  // Handle landing page entry
  const handleEnter = () => {
    setIsAuthenticated(true);
  };

  // Handle post like
  const handleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  // Handle post comment (placeholder)
  const handleComment = (postId) => {
    console.log('Comment on post:', postId);
  };

  // Handle character chat
  const handleChat = (character) => {
    setSelectedCharacter(character);
    setIsInChat(true);
  };

  // Handle character selection
  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    setCurrentPage('profile');
  };

  // Handle follow
  const handleFollow = (characterId, isFollowing) => {
    console.log(`${isFollowing ? 'Followed' : 'Unfollowed'} character:`, characterId);
  };

  // Close chat
  const handleCloseChat = () => {
    setIsInChat(false);
    setSelectedCharacter(null);
  };

  // Handle page navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsInChat(false);
  };

  // Landing page
  if (!isAuthenticated) {
    return <LandingPage onEnter={handleEnter} />;
  }

  // Chat interface
  if (isInChat && selectedCharacter) {
    return (
      <ChatInterface
        character={selectedCharacter}
        onClose={handleCloseChat}
      />
    );
  }

  // Main app interface
  return (
    <div className="App min-h-screen bg-gray-50">
      <div className="pb-16"> {/* Add padding for bottom navigation */}
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10">
          <div className="max-w-lg mx-auto flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              Character<span className="text-purple-600">Gram</span>
            </h1>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM21 3h-5.87l-2.12 2.12 1.76 1.76-1.06 1.06-1.76-1.76L9 9.13V15h5.87l2.12-2.12-1.76-1.76 1.06-1.06 1.76 1.76L21 9V3z" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="min-h-screen">
          {currentPage === 'feed' && (
            <Feed
              posts={posts}
              stories={mockStories}
              onLike={handleLike}
              onComment={handleComment}
              onChat={handleChat}
            />
          )}

          {currentPage === 'discover' && (
            <DiscoveryPage
              characters={mockCharacters}
              onCharacterSelect={handleCharacterSelect}
            />
          )}

          {currentPage === 'profile' && selectedCharacter && (
            <CharacterProfile
              character={selectedCharacter}
              posts={posts}
              onChat={handleChat}
              onFollow={handleFollow}
            />
          )}

          {currentPage === 'create' && (
            <div className="max-w-lg mx-auto p-8 text-center">
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Create Character</h2>
                  <p className="text-gray-600 mt-2">Design your own AI character</p>
                </div>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Start Creating
                </button>
              </div>
            </div>
          )}

          {currentPage === 'messages' && (
            <div className="max-w-lg mx-auto p-4">
              <h2 className="text-xl font-bold mb-6">Messages</h2>
              <div className="space-y-3">
                {mockCharacters.slice(0, 3).map((character) => (
                  <div
                    key={character.id}
                    onClick={() => handleChat(character)}
                    className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
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
                        <h3 className="font-semibold">{character.name}</h3>
                        <p className="text-sm text-gray-600">
                          {character.isOnline ? 'Online now' : `Last seen ${character.lastSeen}`}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400">2h</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;