import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ArrowLeft } from "lucide-react";
import { gameData } from "../data/games";
import RulesModal from "../components/RulesModal";
import GameBoard from "../components/GameBoard";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  padding: 8rem 2rem 2rem;
  background-color: #0d1117;
  color: #fff;

  @media (max-width: 768px) {
    padding: 6rem 1rem 1rem;
  }
`;

const GameTitle = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #58a6ff;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const CardContainer = styled.div`
  width: 350px;
  height: 570px;
  perspective: 1000px;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    width: 280px;
    height: 456px;
  }
`;

const Card = styled.div`
  width: 300px;
  height: 450px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-out;
  position: absolute;
  top: 10px;
  left: 25px;
  border: 1px solid #fff;

  @media (max-width: 768px) {
    width: 240px;
    height: 360px;
    top: 8px;
    left: 20px;
  }
`;

const PlayButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  background-color: #238636;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2ea043;
    transform: translateX(-50%) scale(1.05);
  }

  @media (max-width: 768px) {
    bottom: 10px;
    padding: 10px 20px;
    font-size: 16px;
  }
`;

const RulesButton = styled.button`
  position: absolute;
  top: 40%;
  right: ${(props) => (props.gameStarted ? "10px" : "calc(50% - 400px)")};
  transform: translateY(-50%);
  padding: 10px 20px;
  background-color: #000000;
  color: white;
  border: 1px solid #000000;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: #ffffff;
    color: #000000;
    border: 1px solid #000000;
    transition: all 0.3s ease-in-out;
  }

  @media (max-width: 768px) {
    position: static;
    transform: none;
    margin-top: 20px;
    right: auto;
    font-size: 0.9rem;
    padding: 8px 16px;
  }
`;

const GameBoardWrapper = styled.div`
  width: 100%;
  
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const GamePage = () => {
  const { gameId } = useParams();
  const game = gameData.find((g) => g.id === parseInt(gameId));
  const [showRules, setShowRules] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const cardRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cardRef.current && containerRef.current && !gameStarted && window.innerWidth > 768) {
        const { left, top, width, height } =
          containerRef.current.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;

        if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
          const centerX = width / 2;
          const centerY = height / 2;
          const moveX = (mouseX - centerX) / 25;
          const moveY = (mouseY - centerY) / 25;
          cardRef.current.style.transform = `rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        } else {
          cardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [gameStarted]);

  if (!game) {
    return (
      <PageWrapper>
        <h2>Game not found</h2>
      </PageWrapper>
    );
  }

  const handlePlayNow = () => {
    setGameStarted(true);
  };

  const toggleRules = (e) => {
    e.preventDefault();
    setShowRules(!showRules);
  };

  return (
    <PageWrapper>
      <GameTitle>{game.title} Trump Card Game</GameTitle>
      <GameContainer>
        {!gameStarted ? (
          <>
            <CardContainer ref={containerRef}>
              <Card ref={cardRef} image={game.image} />
            </CardContainer>
            <PlayButton onClick={handlePlayNow}>Play Now</PlayButton>
            <RulesButton gameStarted={gameStarted} onClick={toggleRules}>
              Show Rules
            </RulesButton>
          </>
        ) : (
          <>
            <GameBoardWrapper>
              <GameBoard gameData={game} />
            </GameBoardWrapper>
            <RulesButton gameStarted={gameStarted} onClick={toggleRules}>
              <ArrowLeft size={24} />
            </RulesButton>
          </>
        )}
      </GameContainer>
      <RulesModal
        isOpen={showRules}
        onClose={() => setShowRules(false)}
        gameRules={game.rules || []}
      />
    </PageWrapper>
  );
};

export default GamePage;