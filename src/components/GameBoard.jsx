import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

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

const CardStack = styled(motion.div)`
  width: 120px;
  height: 180px;
  background-color: #30363d;
  border: 2px solid white;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #58a6ff;
  position: relative;
`;

const ActiveCard = styled(motion.div)`
  width: 200px;
  height: 300px;
  background-image: ${(props) => `url(${props.image})`};
  background-size: cover;
  background-position: center;
  border: 2px solid white;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const CardFront = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`;

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  background-color: #30363d;
  border-radius: 10px;
`;

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px;
  background-color: rgba(255, 255, 255, 0);
  border-radius: 5px;
  margin-right: 10px;
`;

const StatText = styled.span`
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px black;
`;

const StatButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: ${(props) =>
    props.isWinner ? "lime" : props.isLoser ? "red" : "white"};
  text-shadow: 1px 1px 2px black;
`;

const GameControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ControlButton = styled.button`
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

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  z-index: 1000;
`;

const GameBoard = ({ gameData }) => {
  const [playerCards, setPlayerCards] = useState([]);
  const [botCards, setBotCards] = useState([]);
  const [currentPlayerCard, setCurrentPlayerCard] = useState(null);
  const [currentBotCard, setCurrentBotCard] = useState(null);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedStat, setSelectedStat] = useState(null);
  const [isComparing, setIsComparing] = useState(false);

  useEffect(() => {
    // Initialize the game
    const shuffledCards = shuffleCards(gameData.cards);
    setPlayerCards(shuffledCards.slice(0, 26));
    setBotCards(shuffledCards.slice(26));
  }, [gameData]);

  const shuffleCards = (cards) => {
    // Fisher-Yates shuffle algorithm
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentPlayerCard(playerCards[0]);
    setCurrentBotCard(botCards[0]);
  };

  const getValidStats = (card) => {
    return Object.keys(card).filter(
      (key) => key !== "image" && key !== "id" && key !== "name"
    );
  };

  const handleStatSelection = (stat) => {
    if (isComparing) return;
    setIsComparing(true);
    setSelectedStat(stat);

    const playerWins =
      stat === "rank"
        ? currentPlayerCard[stat] < currentBotCard[stat]
        : currentPlayerCard[stat] > currentBotCard[stat];

    setTimeout(() => {
      const winningCards = [currentPlayerCard, currentBotCard];

      if (playerWins) {
        setPlayerCards((prevCards) => [...prevCards.slice(1), ...winningCards]);
        setBotCards((prevCards) => prevCards.slice(1));
        setPlayerTurn(true);
      } else {
        setBotCards((prevCards) => [...prevCards.slice(1), ...winningCards]);
        setPlayerCards((prevCards) => prevCards.slice(1));
        setPlayerTurn(false);
      }

      setTimeout(() => {
        // Update current cards for next round
        setCurrentPlayerCard(playerCards[1]);
        setCurrentBotCard(botCards[1]);
        setSelectedStat(null);
        setIsComparing(false);

        // Check for game end
        if (playerCards.length <= 1 || botCards.length <= 1) {
          endGame();
        } else if (!playerWins) {
          // Bot's turn to select a stat
          botSelectStat();
        }
      }, 2000);
    }, 2000);
  };

  const botSelectStat = () => {
    if (isComparing) return;
    const validStats = getValidStats(currentBotCard);
    const randomStat =
      validStats[Math.floor(Math.random() * validStats.length)];
    handleStatSelection(randomStat);
  };

  useEffect(() => {
    if (gameStarted && !playerTurn && !isComparing) {
      const timer = setTimeout(botSelectStat, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameStarted, playerTurn, isComparing]);

  const endGame = () => {
    const playerWins = botCards.length <= 1;
    setShowConfetti(playerWins);
    setModalMessage(
      playerWins ? "Congratulations! You won!" : "Better luck next time!"
    );
    setShowModal(true);
  };

  return (
    <GameBoardContainer>
      <CardArea>
        <PlayerArea>
          <CardStack
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            {playerCards.length}
          </CardStack>
          <AnimatePresence>
            {currentPlayerCard && (
              <ActiveCard
                key="player-card"
                image={currentPlayerCard.image}
                initial={{ x: -1000, rotateY: -90 }}
                animate={{ x: 0, rotateY: 0 }}
                exit={{ x: 1000, rotateY: 90 }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                <CardFront>
                  {getValidStats(currentPlayerCard).map((stat) => (
                    <StatContainer key={stat}>
                      <StatText>{stat}</StatText>
                      <StatButton
                        onClick={() =>
                          playerTurn &&
                          !isComparing &&
                          handleStatSelection(stat)
                        }
                        disabled={!playerTurn || isComparing}
                        isWinner={selectedStat === stat && playerTurn}
                        isLoser={selectedStat === stat && !playerTurn}
                      >
                        {currentPlayerCard[stat]}
                      </StatButton>
                    </StatContainer>
                  ))}
                </CardFront>
              </ActiveCard>
            )}
          </AnimatePresence>
        </PlayerArea>
        <PlayerArea>
          <CardStack
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            {botCards.length}
          </CardStack>
          <AnimatePresence>
            {currentBotCard && (
              <ActiveCard
                key="bot-card"
                image={selectedStat ? currentBotCard.image : ""}
                initial={{ x: 1000, rotateY: 90 }}
                animate={{ x: 0, rotateY: selectedStat ? 0 : 180 }}
                exit={{ x: -1000, rotateY: -90 }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                {selectedStat ? (
                  <CardFront>
                    {getValidStats(currentBotCard).map((stat) => (
                      <StatContainer key={stat}>
                        <StatText>{stat}</StatText>
                        <StatButton
                          isWinner={selectedStat === stat && !playerTurn}
                          isLoser={selectedStat === stat && playerTurn}
                        >
                          {currentBotCard[stat]}
                        </StatButton>
                      </StatContainer>
                    ))}
                  </CardFront>
                ) : (
                  <CardBack />
                )}
              </ActiveCard>
            )}
          </AnimatePresence>
        </PlayerArea>
      </CardArea>
      <GameControls>
        {!gameStarted ? (
          <ControlButton onClick={startGame}>Start Game</ControlButton>
        ) : null}
      </GameControls>
      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <h2>{modalMessage}</h2>
          <p>Click anywhere to close</p>
        </Modal>
      )}
      {showConfetti && <Confetti />}
    </GameBoardContainer>
  );
};

export default GameBoard;
