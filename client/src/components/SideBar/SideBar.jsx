import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { TfiStatsUp, TfiHome, TfiServer, TfiUser } from 'react-icons/tfi';
import './SideBar.css';

const SideBar = ({ showSideBar, toggleSideBar }) => {
    return (
        <div>
            <SideBarContainer showSideBar={showSideBar}>
                <StickyContainer>
                    <Header>
                        <img src={logo} alt={'logo'} width={'80%'} />
                    </Header>
                    <NavItems className='navItems' onClick={toggleSideBar}>
                        <NavLink to={'/'}>
                            <TfiHome className="sideBarIcon" /> Accueil
                        </NavLink>
                        <NavLink to={'/dashboard'}>
                            <TfiStatsUp className="sideBarIcon" /> Tableau de bord
                        </NavLink>
                        <NavLink to={'/sandbox'}>
                            <TfiServer className="sideBarIcon" /> Toutes les données
                        </NavLink>
                        <NavLink to={'/users'}>
                            <TfiUser className="sideBarIcon" /> Gérer les utilisateurs
                        </NavLink>
                        <NavLink to={'/users'}>
                            <TfiUser className="sideBarIcon" /> Se déconnecter
                        </NavLink>
                    </NavItems>
                </StickyContainer>
            </SideBarContainer>
        </div>
    );
};

const SideBarContainer = styled.div`
  font-family: 'AvenirBook', sans-serif;
  width: 270px;
  z-index: 0;
  background-color: #E8E5DD;
  position: fixed;
  left: 0;
  height: 100%;
  @media (max-width: 992px) {
    left: ${({ showSideBar }) => (showSideBar ? "0" : "-100%")};
    transition: ${({ showSideBar }) => (showSideBar ? "450ms" : "850ms")};
  }
`;

const StickyContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  align-items: center;
  top: 0;
  height: 100%;
`;

const Header = styled.div`
  height: 100px;
  border-bottom: 1.5px solid #c9c9c9;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
    margin-top: 30px;
    border-radius: 5px;
`;

const NavItems = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; 
    padding: 0;
    height: 75%;
    width: 100%;
    margin-top: 40px;
`

const NavLink = styled(Link)`
  &:hover {
    background-color: #e3dfd3;
  }

  cursor: pointer;
  font-size: 16.5px;
  width: 100%;
  padding: 28px 25px;
  text-align: center;
  color: #000000;
  font-weight: 500;
  text-decoration: none;
  display: flex;
  align-items: center;
`;

export default SideBar;
