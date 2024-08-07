import React, { useState, useEffect } from "react";
import styled from "styled-components";

const GameBoardContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 80vh;
  background-color: #1c2128;
  border-radius: 15px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CardArea = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70%;
`;

const PlayerArea = styled.div`
  width: 45%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardStack = styled.div`
  width: 120px;
  height: 180px;
  background-color: #30363d;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #58a6ff;
  position: relative;
`;

const ActiveCard = styled.div`
  width: 200px;
  height: 300px;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  margin-top: 20px;
`;

const GameControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const StatButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #238636;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2ea043;
  }
`;

const GameBoard = ({ gameData }) => {
  const [playerCards, setPlayerCards] = useState([]);
  const [botCards, setBotCards] = useState([]);
  const [currentPlayerCard, setCurrentPlayerCard] = useState(null);
  const [currentBotCard, setCurrentBotCard] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(true);

  useEffect(() => {
    // Initialize the game
    const shuffledCards = shuffleCards(gameData.cards);
    setPlayerCards(shuffledCards.slice(0, 26));
    setBotCards(shuffledCards.slice(26));
    setCurrentPlayerCard(shuffledCards[0]);
    setCurrentBotCard(shuffledCards[26]);
  }, [gameData]);

  const shuffleCards = (cards) => {
    // Fisher-Yates shuffle algorithm
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const handleStatSelection = (stat) => {
    if (!playerTurn) return;

    const playerWins = currentPlayerCard[stat] > currentBotCard[stat];
    const winningCards = [currentPlayerCard, currentBotCard];

    if (playerWins) {
      setPlayerCards([...playerCards, ...winningCards]);
      setBotCards(botCards.slice(1));
    } else {
      setBotCards([...botCards, ...winningCards]);
      setPlayerCards(playerCards.slice(1));
    }

    // Update current cards
    setCurrentPlayerCard(playerCards[1]);
    setCurrentBotCard(botCards[1]);

    setPlayerTurn(!playerWins);
  };

  const botTurn = () => {
    if (playerTurn) return;

    // Bot randomly selects a stat
    const stats = Object.keys(currentBotCard).filter((key) => key !== "image");
    const randomStat = stats[Math.floor(Math.random() * stats.length)];

    handleStatSelection(randomStat);
  };

  useEffect(() => {
    if (!playerTurn) {
      const timer = setTimeout(botTurn, 2000);
      return () => clearTimeout(timer);
    }
  }, [playerTurn]);

  return (
    <GameBoardContainer>
      <CardArea>
        <PlayerArea>
          <CardStack>{playerCards.length}</CardStack>
          {currentPlayerCard && <ActiveCard image={currentPlayerCard.image} />}
        </PlayerArea>
        <PlayerArea>
          <CardStack>{botCards.length}</CardStack>
          {currentBotCard && <ActiveCard image={currentBotCard.image} />}
        </PlayerArea>
      </CardArea>
      <GameControls>
        {Object.keys(currentPlayerCard || {})
          .filter((key) => key !== "image")
          .map((stat) => (
            <StatButton
              key={stat}
              onClick={() => handleStatSelection(stat)}
              disabled={!playerTurn}
            >
              {stat}
            </StatButton>
          ))}
      </GameControls>
    </GameBoardContainer>
  );
};

export default GameBoard;
