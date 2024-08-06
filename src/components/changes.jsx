import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import GameCard from '../components/GameCard';

// Import game data
import dragonBallData from '../data/dragonBallData.json';
import ben10Data from '../data/ben10Data.json';


const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const HomePageContainer = styled.div`
  text-align: center;
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const GameCardsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;


const HomePage = () => {
  const navigate = useNavigate();

  const handleGameSelect = (gameData) => {
    navigate('/game', { state: { gameData } });
  };

  return (
    <PageWrapper>
      <Navbar />
      <MainContent>
        <HomePageContainer>
          <Title>Welcome to TrumpCards</Title>
          <Description>
            A fun and exciting card game inspired by your favorite anime characters!
          </Description>
          <GameCardsContainer>
            <GameCard title="Dragon Ball" image="dragon-ball.jpg" onClick={() => handleGameSelect(dragonBallData)} />
            <GameCard title="Ben 10" image="ben-10.jpg" onClick={() => handleGameSelect(ben10Data)} />
            {/* Add more game cards here */}
          </GameCardsContainer>
        </HomePageContainer>
      </MainContent>
    </PageWrapper>
  );
};

export default HomePage;
