import React from 'react';
import styled from 'styled-components';
import UserProfile from './UserProfile';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
`;

const NavItem = styled.li`
  margin-left: 1rem;
  cursor: pointer;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>TrumpCards</Logo>
      <NavItems>
        <NavItem>Home</NavItem>
        <NavItem>About</NavItem>
        <NavItem>Games</NavItem>
        <NavItem>Leaderboard</NavItem>
      </NavItems>
      <UserProfile />
    </NavbarContainer>
  );
};

export default Navbar;
