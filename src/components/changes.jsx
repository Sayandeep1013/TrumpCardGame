import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import Explore from "./pages/Explore";
import GamePage from "./pages/GamePage";
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #0d1117;
    color: white;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  }

  /* Custom scrollbar styles for the entire page */
  html {
    scrollbar-width: thin;
    scrollbar-color: #30363d #0d1117;
  }

  /* WebKit browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: #0d1117;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #30363d;
    border-radius: 6px;
    border: 3px solid #0d1117;
  }
`;

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/game/:gameId" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;