import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserProfile from "./UserProfile";
import { FaGamepad, FaBars, FaTimes } from "react-icons/fa";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const LogoIcon = styled(FaGamepad)`
  font-size: 2rem;
  margin-right: 0.5rem;
`;

const LogoText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  margin: 50px auto;
//   padding-top: 1 rem;

  @media (max-width: 1024px) {
    // background-color: rgba(0, 0, 0, 1);
    position: fixed;
    top: 60px; // Adjust this value to move items down
    height: 200px;
    left: ${({ isOpen }) => (isOpen ? "0" : "-150%")};
    right: 0;
    bottom: 0;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    
    transition: left 0.3s ease-in-out;
    padding-top: 2 rem;
  }
`;

const NavItem = styled.li`
  margin: -1rem 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 1024px) {
    margin: 1rem 0;
    font-size: 1.5rem;
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 1024px) {
    display: block;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const NavItemsContainer = styled.div`
  margin-right: 2rem;
`;

const UserProfileContainer = styled.div`
  margin-left: 1rem;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <NavbarContainer>
      {windowWidth <= 1024 && (
        <MenuIcon onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuIcon>
      )}
      <LogoContainer onClick={() => navigate("/")}>
        <LogoIcon />
        <LogoText>TrumpCardGames</LogoText>
      </LogoContainer>
      <RightSection>
        <NavItemsContainer>
          <NavItems isOpen={isMenuOpen}>
            <NavItem
              onClick={() => {
                navigate("/about");
                closeMenu();
              }}
            >
              About
            </NavItem>
            <NavItem
              onClick={() => {
                navigate("/explore");
                closeMenu();
              }}
            >
              Explore
            </NavItem>
            <NavItem
              onClick={() => {
                navigate("/leaderboard");
                closeMenu();
              }}
            >
              Leaderboard
            </NavItem>
          </NavItems>
        </NavItemsContainer>
        <UserProfileContainer>
          <UserProfile />
        </UserProfileContainer>
      </RightSection>
    </NavbarContainer>
  );
};

export default Navbar;
