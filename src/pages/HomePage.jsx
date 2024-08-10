import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Link } from "react-router-dom";
import GameCard from "../components/GameCard";
import { gameData } from "../data/games";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #0d1117;
    color: white;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    
    /* Custom scrollbar styles */
    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-track {
      background: #0d1117;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #30363d;
      border-radius: 6px;
      border: 3px solid #0d1117;
    }
    scrollbar-width: thin;
    scrollbar-color: #30363d #0d1117;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;

  
`;

const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
  width: 100%;
  @media (max-width: 768px) {
    height: 500px;
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  text-align: center;
  font-family: "Playfair Display", serif;
  color: #58a6ff;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  text-align: center;
  font-family: "Merriweather", serif;
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ScrollableSection = styled.div`
  width: 100%;
  max-width: 1500px;
  padding: 1rem;
  box-sizing: border-box;
  border: 1px solid #30363d;
  border-radius: 10px;
  background: linear-gradient(to bottom, #161b22, #0d1117);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  height: 600px;
  overflow-y: auto;

  /* Custom scrollbar styles for the scrollable section */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #0d1117;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #30363d;
    border-radius: 4px;
  }
  scrollbar-width: thin;
  scrollbar-color: #30363d #0d1117;

  @media (max-width: 768px) {
    height: 500px;
    margin-top: 0px;
  }
`;

const GameCardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const StorySection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-bottom: 6rem;
  margin-top: 6rem;
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 2rem;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: #30363d;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2rem;
  &::before {
    content: "";
    position: absolute;
    left: -2.5rem;
    top: 0.5rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #58a6ff;
  }
`;

const TimelineIcon = styled.span`
  position: absolute;
  left: -3rem;
  top: 0;
  font-size: 1.5rem;
`;

const Footer = styled.footer`
  background-color: #0d1117;
  padding: 2rem;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterColumn = styled.div`
  flex: 1;
  text-align: center;

  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const FooterTitle = styled.h3`
  color: #58a6ff;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: #8b949e;
  text-decoration: none;
  display: block;
  margin-bottom: 0.5rem;
  &:hover {
    color: #58a6ff;
  }
`;

const Separator = styled.hr`
  border: none;
  height: 1px;
  background-color: #30363d;
  margin: 2rem 10% 0;
`;

// const gameData = [
//   { id: 1, title: "Dragon Ball", image: "/images/dragon-ball.jpg" },
//   { id: 2, title: "Ben 10", image: "/images/ben-10.jpg" },
//   { id: 3, title: "Power Rangers", image: "/images/power-rangers.jpg" },
//   { id: 4, title: "Naruto", image: "/images/naruto.jpg" },
//   { id: 5, title: "Pokemon", image: "/images/pokemon.jpg" },
//   { id: 6, title: "Yu-Gi-Oh!", image: "/images/yugioh.jpg" },
//   { id: 7, title: "Digimon", image: "/images/digimon.jpg" },
//   { id: 8, title: "One Piece", image: "/images/one-piece.jpg" },
//   { id: 9, title: "Dragon Ball", image: "/images/dragon-ball.jpg" },
//   { id: 10, title: "Ben 10", image: "/images/ben-10.jpg" },
//   { id: 11, title: "Power Rangers", image: "/images/power-rangers.jpg" },
//   { id: 12, title: "Naruto", image: "/images/naruto.jpg" },
//   { id: 13, title: "Pokemon", image: "/images/pokemon.jpg" },
//   { id: 14, title: "Yu-Gi-Oh!", image: "/images/yugioh.jpg" },
//   { id: 15, title: "Digimon", image: "/images/digimon.jpg" },
//   { id: 16, title: "One Piece", image: "/images/one-piece.jpg" },
// ];

const HomePage = () => {
  return (
    <>
      <GlobalStyle />
      <PageWrapper>
        <MainContent>
          <HeaderSection>
            <Title>Welcome to TrumpCards</Title>
            <Description>
              Dive into the world of anime-inspired card battles! Choose your
              favorite series and challenge your friends in exciting trump card
              duels.
            </Description>
          </HeaderSection>
          <ScrollableSection>
            <GameCardsContainer>
              {gameData.map((game) => (
                <Link
                  key={game.id}
                  to={`/game/${game.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <GameCard title={game.title} image={game.image} />
                </Link>
              ))}
            </GameCardsContainer>
          </ScrollableSection>
          <StorySection>
            <h2>Our Journey</h2>
            <Timeline>
              <TimelineItem>
                <TimelineIcon>🚀</TimelineIcon>
                <h3>2023: The Beginning</h3>
                <p>
                  TrumpCards was born from a passion for anime and card games.
                </p>
              </TimelineItem>
              <TimelineItem>
                <TimelineIcon>🌟</TimelineIcon>
                <h3>2024: Expanding Universe</h3>
                <p>We added more series and improved game mechanics.</p>
              </TimelineItem>
              <TimelineItem>
                <TimelineIcon>🔮</TimelineIcon>
                <h3>2025: Future Plans</h3>
                <p>Introduce Multiplayer mode and Tournament systems.</p>
              </TimelineItem>
            </Timeline>
          </StorySection>
        </MainContent>
        <Separator />
        <Footer>
          <FooterContent>
            <FooterColumn>
              <FooterTitle>About</FooterTitle>
              <FooterLink href="#">Our Story</FooterLink>
              <FooterLink href="#">Team</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterTitle>Resources</FooterTitle>
              <FooterLink href="#">How to Play</FooterLink>
              <FooterLink href="#">FAQs</FooterLink>
              <FooterLink href="#">Support</FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterTitle>Legal</FooterTitle>
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Cookie Policy</FooterLink>
            </FooterColumn>
          </FooterContent>
        </Footer>
      </PageWrapper>
    </>
  );
};

export default HomePage;
