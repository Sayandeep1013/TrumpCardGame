import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FaUser, FaRobot, FaCog, FaSignOutAlt } from 'react-icons/fa';
import UserProfileForm from './UserProfileForm';

const ProfileContainer = styled.div`
  position: relative;
`;

const AvatarButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: none;
  padding: 0;
  background: none;
  position: relative;
  z-index: 2;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #202123;
  border-radius: 10px;
  padding: 8px 0;
  margin-top: 8px;
  width: 220px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 2;
`;

const UserGreeting = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;

  img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 12px;
  }

  span {
    color: #fff;
    font-size: 14px;
  }
`;

const Separator = styled.div`
  height: 1px;
  background-color: #4d4d4f;
  margin: 8px 16px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #2a2b32;
    border-radius: 10px;
  }

  svg {
    margin-right: 12px;
    font-size: 16px;
  }
`;

const LogoutItem = styled(MenuItem)`
  color: #ec5e5e;
`;


const UserProfile = () => {
  // ... rest of the code ...

  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <ProfileContainer ref={dropdownRef}>
      <AvatarButton onClick={toggleMenu}>
        <AvatarImage src={avatar || '/public/UserPfp.jpg'} alt="User" />
      </AvatarButton>
      {isOpen && (
        <DropdownMenu>
          {username && avatar ? (
            <>
              {/* ... rest of the code ... */}
            </>
          ) : (
            <MenuItem onClick={openForm}>
              <FaUser />
              Set User Profile
            </MenuItem>
          )}
        </DropdownMenu>
      )}
      <UserProfileForm isOpen={isFormOpen} onRequestClose={closeForm} />
    </ProfileContainer>
  );
};

export default UserProfile;
