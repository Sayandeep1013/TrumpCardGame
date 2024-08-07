import React, { useState, useEffect } from "react";
import styled from "styled-components";

const BoardContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 600px;
  border: 2px solid #333;
  border-radius: 10px;
  padding: 1rem;
  position: relative;
`;

const RulesButton = styled.button`
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  padding: 0.5rem;
  cursor: pointer;
`;

const GameBoard = ({ gameData, onShowRules }) => {
  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);

  useEffect(() => {
    // Initialize the game
    const shuffledCards = shuffleArray(gameData.cards);
    setPlayerCards(shuffledCards.slice(0, shuffledCards.length / 2));
    setComputerCards(shuffledCards.slice(shuffledCards.length / 2));
  }, [gameData]);

  // Implement game logic here

  return (
    <BoardContainer>
      {/* Implement your game board UI here */}
      <RulesButton onClick={onShowRules}>←</RulesButton>
    </BoardContainer>
  );
};

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default GameBoard;
