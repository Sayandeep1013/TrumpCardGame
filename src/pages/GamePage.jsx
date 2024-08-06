import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
`;

const GamePageContainer = styled.div`
  text-align: center;
`;

const GameTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const GamePage = () => {
  const location = useLocation();
  const { gameData } = location.state || {};

  if (!gameData) {
    return <div>Error: Game data not found</div>;
  }

  return (
    <PageWrapper>
      <MainContent>
        <GamePageContainer>
          <GameTitle>{gameData.title} Trump Card Game</GameTitle>
          {/* Add your game logic and components here */}
          <p>Game content for {gameData.title} goes here.</p>
          {/* You can use gameData.image to display the game's image if needed */}
        </GamePageContainer>
      </MainContent>
    </PageWrapper>
  );
};

export default GamePage;
