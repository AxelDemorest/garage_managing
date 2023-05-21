import React from 'react';
import * as styled from './Home.styled';
import Container from "../../components/Container/Container";

const Home = () => {
    return (
        <Container title={'Accueil'}>
            <styled.Header>
                <styled.Title>L'outil de gestion des garages H00 de Paris Gare De Lyon.</styled.Title>
            </styled.Header>
        </Container>
    );
};

export default Home;
