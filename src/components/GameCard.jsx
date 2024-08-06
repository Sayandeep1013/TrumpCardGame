import React from "react";
import styled from "styled-components";

const GameCardContainer = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  border: 1px solid #30363d;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.05);
  }
`;

const GameCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const GameCardTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(13, 17, 23, 0.8);
  color: #58a6ff;
  padding: 0.5rem;
  text-align: center;
  font-size: 1.2rem;
`;

const GameCard = ({ title, image }) => {
  return (
    <GameCardContainer>
      <GameCardImage src={image} alt={title} />
      <GameCardTitle>{title}</GameCardTitle>
    </GameCardContainer>
  );
};

export default GameCard;
