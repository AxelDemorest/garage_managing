import React, {useState} from 'react';
import styled from "styled-components";
import ImportModal from "../../components/Modals/ImportModal/ImportModal";

const Header = ({ title }) => {
    return (
        <div>
            <Container>
                <Wrapper>
                    <Title>{title}</Title>
                </Wrapper>
            </Container>
        </div>
    );
};

const Container = styled.div`
  height: 100px;
  background-color: #fff;
  border-bottom: 1.5px solid #eaeaea;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 40px;
  align-items: center;
`;

const Title = styled.h1`
  font-family: 'AvenirRoman', sans-serif;
  font-size: 24px;
  margin: 0;
`;

export default Header;
