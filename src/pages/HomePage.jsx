import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import GameCard from '../components/GameCard';

const HomePageContainer = styled.div`
  text-align: center;
  padding: 2rem;
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
  return (
    <>
      <Navbar />
      <HomePageContainer>
        <Title>Welcome to TrumpCards</Title>
        <Description>
          A fun and exciting card game inspired by your favorite anime characters!
        </Description>
        <GameCardsContainer>
          <GameCard title="Dragon Ball" image="dragon-ball.jpg" />
          <GameCard title="Ben 10" image="ben-10.jpg" />
          {/* Add more game cards here */}
        </GameCardsContainer>
      </HomePageContainer>
    </>
  );
};

export default HomePage;
