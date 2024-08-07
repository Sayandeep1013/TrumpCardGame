import React, { useState } from "react";
import styled from "styled-components";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #1f2937;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 80%;
  max-height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const RuleImage = styled.img`
  max-width: 90%;
  max-height: 60vh;
  border-radius: 10px;
  object-fit: contain;
  margin-bottom: 20px;
  border: 1px solid #000;
`;

const RuleText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #fff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #3b82f6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #2563eb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SkipButton = styled(Button)`
  background-color: #4b5563;

  &:hover {
    background-color: #6b7280;
  }
`;

const RulesModal = ({ isOpen, onClose, gameRules }) => {
  const [currentRuleIndex, setCurrentRuleIndex] = useState(0);

  if (!isOpen) return null;

  const currentRule = gameRules[currentRuleIndex];

  const handleNext = () => {
    if (currentRuleIndex < gameRules.length - 1) {
      setCurrentRuleIndex(currentRuleIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentRuleIndex > 0) {
      setCurrentRuleIndex(currentRuleIndex - 1);
    }
  };

  const handleSkipAll = () => {
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <RuleImage
          src={currentRule.image}
          alt={`Rule ${currentRuleIndex + 1}`}
        />
        <RuleText>{currentRule.description}</RuleText>
        <ButtonContainer>
          <SkipButton onClick={handleSkipAll}>
            Skip All <ArrowRight size={16} />
          </SkipButton>
          {currentRuleIndex > 0 && (
            <Button onClick={handlePrevious}>
              <ArrowLeft size={16} /> Previous
            </Button>
          )}
          <Button onClick={handleNext}>
            {currentRuleIndex < gameRules.length - 1 ? (
              <>
                Next Rule <ArrowRight size={16} />
              </>
            ) : (
              <>
                Start Game <Check size={16} />
              </>
            )}
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default RulesModal;
