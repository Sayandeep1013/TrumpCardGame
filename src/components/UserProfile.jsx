import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaUser, FaRobot, FaCog, FaSignOutAlt, FaCamera } from "react-icons/fa";
import { useDropzone } from "react-dropzone";

const ProfileContainer = styled.div`
  position: relative;
  font-family: Arial, sans-serif;
`;

const AvatarButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: none;
  padding: 0;
  background: #4d4d4f;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
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
  background-color: #30363d;
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 50vh;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  background-color: #010409;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px; 
  margin-bottom: 16px;
  border: 1px solid #4d4d4f;
  border-radius: 5px;
  background-color: #2a2b32;
  color: #fff;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.primary ? "#ec5e5e" : "#4d4d4f")};
  color: #fff;
  cursor: pointer;
  margin: 0 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const DropzoneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 120px;
  margin-bottom: 16px;
  border: 2px dashed #4d4d4f;
  border-radius: 5px;
  cursor: pointer;
`;

const DropzoneText = styled.p`
  color: #fff;
  text-align: center;
`;

const AvatarPreview = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 16px;
  background-color: #4d4d4f;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
`;

const UserProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedAvatar = localStorage.getItem("avatar");
    if (storedUsername) setUsername(storedUsername);
    if (storedAvatar) setAvatar(storedAvatar);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
    setIsOpen(false);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const handleSave = () => {
    localStorage.setItem("username", username);
    if (avatar) {
      localStorage.setItem("avatar", avatar);
    }
    closeModal();
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    setUsername("");
    setAvatar(null);
    closeLogoutModal();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    },
  });

  return (
    <ProfileContainer ref={dropdownRef}>
      <AvatarButton onClick={toggleMenu}>
        {avatar ? (
          <AvatarImage src={avatar} alt="User" />
        ) : (
          <FaUser size={20} />
        )}
      </AvatarButton>
      {isOpen && (
        <DropdownMenu>
          {username && avatar ? (
            <>
              <UserGreeting>
                <img src={avatar} alt="User" />
                <span>Hello {username}!</span>
              </UserGreeting>
              <Separator />
              <MenuItem onClick={openModal}>
                <FaUser />
                User Profile
              </MenuItem>
              <MenuItem>
                <FaRobot />
                AI
              </MenuItem>
              <MenuItem>
                <FaCog />
                Settings
              </MenuItem>
              <Separator />
              <LogoutItem onClick={openLogoutModal}>
                <FaSignOutAlt />
                Log out
              </LogoutItem>
            </>
          ) : (
            <MenuItem onClick={openModal}>
              <FaUser />
              Set User Profile
            </MenuItem>
          )}
        </DropdownMenu>
      )}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>User Profile</h2>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <DropzoneContainer {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <DropzoneText>Drop the image here...</DropzoneText>
              ) : (
                <DropzoneText>
                  Drag and drop an image here, or click to select an image
                </DropzoneText>
              )}
            </DropzoneContainer>
            <AvatarPreview>
              {avatar ? (
                <AvatarImage src={avatar} alt="Preview" />
              ) : (
                <FaCamera size={40} />
              )}
            </AvatarPreview>
            <ButtonContainer>
              <Button onClick={closeModal}>Close</Button>
              <Button primary onClick={handleSave}>
                Save
              </Button>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
      {isLogoutModalOpen && (
        <ModalOverlay onClick={closeLogoutModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <ButtonContainer>
              <Button onClick={closeLogoutModal}>Cancel</Button>
              <Button primary onClick={handleLogout}>
                Logout
              </Button>
            </ButtonContainer>
          </ModalContent>
        </ModalOverlay>
      )}
    </ProfileContainer>
  );
};

export default UserProfile;
