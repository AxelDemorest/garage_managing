import React from 'react';
import styled from "styled-components";

const Dropzone = ({ handleDrop, handleInputChange, files }) => {
    return (
        <DropZoneContainer
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <p>Cliquez pour upload ou cliquez sur le bouton d'import</p>
        </DropZoneContainer>
    );
};

const DropZoneContainer = styled.div`
  width: 100%;
  height: 200px;
  margin: 0;
  border: 2px dashed #0B5ED5;
  border-radius: 10px;
  background-color: #F5F9FC;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  p {
    font-weight: 500;
  }
`;

export default Dropzone;
