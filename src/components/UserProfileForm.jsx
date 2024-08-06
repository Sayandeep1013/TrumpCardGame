import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import { useDropzone } from "react-dropzone";

const UserProfileFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #202123;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
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
  background-color: #ec5e5e;
  color: #fff;
  cursor: pointer;
`;

const DropzoneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  margin-bottom: 16px;
  border: 2px dashed #4d4d4f;
  border-radius: 5px;
  cursor: pointer;
`;

const DropzoneText = styled.p`
  color: #fff;
`;

const UserProfileForm = ({ isOpen, onRequestClose }) => {
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setAvatar(acceptedFiles[0]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    localStorage.setItem("avatar", URL.createObjectURL(avatar));
    window.location.reload();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User Profile Form"
    >
      <UserProfileFormContainer>
        <form onSubmit={handleSubmit}>
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
                Drag 'n' drop an image here, or click to select an image
              </DropzoneText>
            )}
          </DropzoneContainer>
          <Button type="submit">Save</Button>
        </form>
      </UserProfileFormContainer>
    </Modal>
  );
};

export default UserProfileForm;
